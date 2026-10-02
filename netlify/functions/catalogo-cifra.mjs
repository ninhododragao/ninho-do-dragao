/**
 * Catálogo do fornecedor Cifra (cifra.es) → site Ninho do Dragão
 *
 * O token NUNCA fica no código (o repositório é público).
 * Configurar no Netlify: Site configuration → Environment variables
 *   CIFRA_TOKEN   (obrigatório)  token da API da Cifra
 *   CIFRA_MARGEM  (opcional)     margem em % sobre o preço confidencial (custo). Ex.: 100 = dobro do custo. Por defeito 100.
 *   CIFRA_IVA     (opcional)     IVA em %. Por defeito 23.
 *
 * Preço mostrado = preço confidencial × (1 + margem) × (1 + IVA)  — a mesma regra do Excel.
 * O preço confidencial (custo) NUNCA sai desta função: o site só recebe o preço de venda já calculado.
 *
 * Endpoint público: /.netlify/functions/catalogo-cifra
 * A resposta fica em cache na CDN do Netlify durante 6 horas.
 */

const API = "https://api.cifrashop.com/tariff";
const CATEGORIAS_EXCLUIDAS = ["covid-19", "outlet"];

const num = (v) => {
  if (v === null || v === undefined || v === "") return 0;
  const n = parseFloat(String(v).replace(",", "."));
  return Number.isFinite(n) ? n : 0;
};

const texto = (v) =>
  String(v ?? "")
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<\/(p|li|div)>/gi, "\n")
    .replace(/<[^>]*>/g, "")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/[ \t]+/g, " ")
    .replace(/\n\s*\n+/g, "\n")
    .trim();

const imagens = (p) => {
  const lista = [];
  if (p.image) lista.push(p.image);
  if (Array.isArray(p.images)) {
    for (const i of p.images) {
      const url = typeof i === "string" ? i : i?.url || i?.image;
      if (url && !lista.includes(url)) lista.push(url);
    }
  }
  return lista;
};

export function transformar(raw, fator = 1) {
  const grupos = new Map();

  for (const p of Array.isArray(raw) ? raw : []) {
    const preco = num(p.confidential_price);
    const nome = texto(p.name);
    const categoria = texto(p.category) || "Outros";
    if (!preco || !nome) continue;
    if (CATEGORIAS_EXCLUIDAS.includes(categoria.toLowerCase())) continue;

    const id = String(p.rootmodel || p.model).trim();
    const stock = num(p.quantity);
    const imgs = imagens(p);

    let g = grupos.get(id);
    if (!g) {
      g = {
        ref: id,
        nome,
        descricao: texto(p.description),
        categoria,
        categoriaPrincipal: texto(p.parent_category) || categoria,
        imagem: imgs[0] || "",
        preco: Infinity,
        stock: 0,
        multiplos: num(p.multiples) || 1,
        material: texto(p.material),
        gravacao: texto(p.mgrabacion),
        variantes: [],
      };
      grupos.set(id, g);
    }

    g.preco = Math.min(g.preco, preco * fator);
    g.stock += stock;
    if (!g.imagem && imgs[0]) g.imagem = imgs[0];
    g.variantes.push({
      ref: String(p.model).trim(),
      cor: texto(p.color),
      imagem: imgs[0] || "",
      stock,
    });
  }

  return [...grupos.values()]
    .map((g) => ({ ...g, preco: Math.round(g.preco * 100) / 100 }))
    .sort((a, b) => a.categoriaPrincipal.localeCompare(b.categoriaPrincipal, "pt") || a.nome.localeCompare(b.nome, "pt"));
}

export default async () => {
  const token = process.env.CIFRA_TOKEN;
  if (!token) {
    return Response.json({ erro: "CIFRA_TOKEN não está configurado no Netlify." }, { status: 500 });
  }
  const margem = process.env.CIFRA_MARGEM ? num(process.env.CIFRA_MARGEM) : 100;
  const iva = process.env.CIFRA_IVA ? num(process.env.CIFRA_IVA) : 23;
  const fator = (1 + margem / 100) * (1 + iva / 100);

  try {
    const r = await fetch(`${API}/${encodeURIComponent(token)}/pt`, { headers: { Accept: "application/json" } });
    if (!r.ok) throw new Error(`A Cifra respondeu com o estado ${r.status}`);
    const produtos = transformar(await r.json(), fator);

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
    console.error("Erro ao carregar catálogo Cifra:", e);
    return Response.json({ erro: "Não foi possível carregar o catálogo neste momento." }, { status: 502 });
  }
};
