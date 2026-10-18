/**
 * Catálogo do fornecedor Valento (valento.es) → site Ninho do Dragão
 *
 * A chave NUNCA fica no código (o repositório é público).
 * Configurar no Netlify: Site configuration → Environment variables
 *   VALENTO_KEY   (obrigatório)  chave do catalog_feed da Valento (vem no email "A tua integração já está ativa")
 *   VALENTO_IVA   (opcional)     IVA em %. Por defeito 23.
 *
 * Preço mostrado = custo (net_price) com IVA × multiplicador por escalões — a MESMA regra da Cifra
 * (função `multiplicador` em catalogo-cifra.mjs). O custo nunca sai desta função.
 * Referências: só códigos ND-XXXXXX (nunca a referência Valento).
 *
 * Endpoint público: /.netlify/functions/catalogo-valento  (cache de 6 h na CDN do Netlify)
 */

import { codigoND, multiplicador } from "./catalogo-cifra.mjs";

const API = "https://www.valento.es/rest/catalog_feed.php";
const ORDEM_TAMANHOS = ["XXS", "XS", "S", "M", "L", "XL", "XXL", "2XL", "XXXL", "3XL", "4XL", "XXXXL", "5XL", "XXXXXL"];

const num = (v) => {
  const n = parseFloat(String(v ?? "").replace(",", "."));
  return Number.isFinite(n) ? n : 0;
};
const cap = (s) => String(s ?? "").trim().replace(/^\p{L}/u, (c) => c.toUpperCase());
const titulo = (s) => String(s ?? "").trim().toLowerCase().replace(/(^|\s)\p{L}/gu, (c) => c.toUpperCase());

// A composição vem em espanhol (ex.: "50_algodon_50_poliester")
const FIBRAS = { algodon: "algodão", poliester: "poliéster", elastano: "elastano", viscosa: "viscose", lana: "lã", acrilico: "acrílico", nylon: "nylon", poliamida: "poliamida", lino: "linho", bambu: "bambu", organico: "orgânico", reciclado: "reciclado" };
const composicao = (s) =>
  String(s || "")
    .split("_")
    .filter(Boolean)
    .map((w) => (/^\d+$/.test(w) ? w + "%" : FIBRAS[w.toLowerCase()] || w.toLowerCase()))
    .join(" ")
    .replace(/(\D) (\d+%)/g, "$1, $2");

const ordemTamanho = (t) => {
  const i = ORDEM_TAMANHOS.indexOf(String(t).toUpperCase());
  if (i >= 0) return 100 + i;
  const n = parseFloat(t); // tamanhos de criança: 1/2, 3/4, 5/6…
  return Number.isFinite(n) ? n : 999;
};

export function transformar(produtosValento, iva = 23) {
  const venda = (custo) => {
    const c = custo * (1 + iva / 100);
    return c * multiplicador(c);
  };
  const out = [];

  for (const p of produtosValento || []) {
    const variantes = Array.isArray(p.variants) ? p.variants : [];
    const precos = variantes.map((v) => num(v.net_price)).filter((x) => x > 0);
    if (!p.article_ref || !p.name || !precos.length) continue;

    const nd = codigoND("V:" + p.article_ref);
    const ch = p.characteristics || {};
    const categoria = cap((p.category_path || [])[0] || "Têxtil");

    const cores = new Map();
    const tamanhos = new Set();
    let stock = 0;
    for (const v of variantes) {
      const s = Math.max(0, num(v.stock));
      stock += s;
      if (v.size) tamanhos.add(String(v.size));
      const k = v.color_ref || v.color || "";
      const c = cores.get(k) || { ref: `${nd}-${k || cores.size + 1}`, cor: cap(v.color), imagem: v.image_web || "", stock: 0 };
      c.stock += s;
      if (!c.imagem && v.image_web) c.imagem = v.image_web;
      cores.set(k, c);
    }

    out.push({
      ref: nd,
      nome: titulo(p.name), // o tipo (t-shirt, polo…) aparece na categoria; "prenombre" vem em espanhol
      descricao: cap(p.description || ch.descripcion_tecnica || ""),
      categoria,
      categoriaPrincipal: "Têxtil",
      imagem: (p.images_web || [])[0] || [...cores.values()][0]?.imagem || "",
      preco: Math.round(venda(Math.min(...precos)) * 100) / 100,
      stock,
      multiplos: num(p.units_per_package) || 1,
      material: [composicao(ch.composicion), ch.densidad ? `${ch.densidad} g/m²` : ""]
        .filter(Boolean)
        .join(" · "),
      gravacao: "",
      tamanhos: [...tamanhos].sort((a, b) => ordemTamanho(a) - ordemTamanho(b)).join(", "),
      variantes: [...cores.values()],
    });
  }
  return out.sort((a, b) => a.categoria.localeCompare(b.categoria, "pt") || a.nome.localeCompare(b.nome, "pt"));
}

async function pagina(key, n) {
  const r = await fetch(`${API}?idioma=pt&key=${encodeURIComponent(key)}&page=${n}`, { headers: { Accept: "application/json" } });
  if (!r.ok) throw new Error(`A Valento respondeu com o estado ${r.status}`);
  return r.json();
}

export default async () => {
  const key = process.env.VALENTO_KEY;
  if (!key) return Response.json({ erro: "VALENTO_KEY não está configurada no Netlify." }, { status: 500 });
  const iva = process.env.VALENTO_IVA ? num(process.env.VALENTO_IVA) : 23;

  try {
    const primeira = await pagina(key, 1);
    const total = num(primeira.total), tam = num(primeira.page_size) || 100;
    const nPaginas = Math.min(Math.ceil(total / tam) || 1, 50);
    const resto = await Promise.all(Array.from({ length: nPaginas - 1 }, (_, i) => pagina(key, i + 2)));
    const todos = [primeira, ...resto].flatMap((pg) => pg.products || []);
    const produtos = transformar(todos, iva);

    return Response.json(
      { atualizado: new Date().toISOString(), total: produtos.length, produtos },
      {
        headers: {
          "Cache-Control": "public, max-age=300",
          "Netlify-CDN-Cache-Control": "public, durable, s-maxage=21600, stale-while-revalidate=86400",
        },
      }
    );
  } catch (e) {
    console.error("Erro ao carregar catálogo Valento:", e);
    return Response.json({ erro: "Não foi possível carregar o catálogo neste momento." }, { status: 502 });
  }
};
