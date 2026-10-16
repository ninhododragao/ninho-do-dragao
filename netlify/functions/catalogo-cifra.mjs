/**
 * Catálogo do fornecedor Cifra (cifra.es) → site Ninho do Dragão
 *
 * O token NUNCA fica no código (o repositório é público).
 * Configurar no Netlify: Site configuration → Environment variables
 *   CIFRA_TOKEN   (obrigatório)  token da API da Cifra
 *   CIFRA_IVA     (opcional)     IVA em %. Por defeito 23.
 *
 * Preço mostrado = custo com IVA × multiplicador por escalões (igual para todos os fornecedores):
 *   até 5 € ×2,5 · 5–20 € ×2 · 20–50 € ×1,6 · mais de 50 € ×1,4
 * O preço confidencial (custo) NUNCA sai desta função: o site só recebe o preço de venda já calculado.
 *
 * Referências: o site mostra só códigos do Ninho do Dragão (ND-XXXXXX), nunca a referência da Cifra.
 * O mesmo código está na folha Produtos_Fornecedores do Sistema de gestão (coluna "Código ND").
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

// Código ND: sempre o mesmo para cada produto e não revela o fornecedor (igual ao do Excel)
const ND_LETRAS = "23456789ABCDEFGHJKLMNPQRSTUVWXYZ";
export function codigoND(chave) {
  let h = 0x811c9dc5;
  for (const b of new TextEncoder().encode(chave)) {
    h ^= b;
    h = Math.imul(h, 0x01000193) >>> 0;
  }
  let s = "";
  for (let i = 0; i < 6; i++) {
    s = ND_LETRAS[h % 32] + s;
    h = Math.floor(h / 32);
  }
  return "ND-" + s;
}

const ACENTOS = { acute: "\u0301", grave: "\u0300", tilde: "\u0303", circ: "\u0302", uml: "\u0308", cedil: "\u0327" };
const ENTIDADES = { nbsp: " ", amp: "&", quot: '"', apos: "'", lt: "<", gt: ">", ordm: "º", ordf: "ª", deg: "°", euro: "€", laquo: "«", raquo: "»", ndash: "–", mdash: "—", rsquo: "’", lsquo: "‘", ldquo: "“", rdquo: "”", hellip: "…", middot: "·", reg: "®", copy: "©", trade: "™", times: "×", frac12: "½", sup2: "²", sup3: "³" };
const entidades = (s) =>
  s
    .replace(/&([a-zA-Z])(acute|grave|tilde|circ|uml|cedil);/g, (_, l, a) => (l + ACENTOS[a]).normalize("NFC"))
    .replace(/&#x([0-9a-f]+);/gi, (_, n) => String.fromCodePoint(parseInt(n, 16)))
    .replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(Number(n)))
    .replace(/&([a-z0-9]+);/gi, (m, n) => ENTIDADES[n.toLowerCase()] ?? m);

const texto = (v) =>
  entidades(String(v ?? "")
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<\/(p|li|div)>/gi, "\n")
    .replace(/<[^>]*>/g, "")
    .replace(/[ \t]+/g, " ")
    .replace(/\n\s*\n+/g, "\n")
    .trim()
  );

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

// Margem por escalões, sobre o custo já com IVA
// A Cifra devolve o catálogo em CSV (separador ";", aspas duplas). Converte para objetos.
export function lerCSV(txt) {
  const linhas = [];
  let campo = "", linha = [], aspas = false;
  const t = txt.replace(/^\uFEFF/, "");
  for (let i = 0; i < t.length; i++) {
    const c = t[i];
    if (aspas) {
      if (c === '"') {
        if (t[i + 1] === '"') { campo += '"'; i++; } else aspas = false;
      } else campo += c;
    } else if (c === '"') aspas = true;
    else if (c === ";") { linha.push(campo); campo = ""; }
    else if (c === "\n" || c === "\r") {
      if (c === "\r" && t[i + 1] === "\n") i++;
      linha.push(campo); campo = "";
      if (linha.length > 1 || linha[0] !== "") linhas.push(linha);
      linha = [];
    } else campo += c;
  }
  if (campo !== "" || linha.length) { linha.push(campo); linhas.push(linha); }
  const [cab, ...dados] = linhas;
  const k = (n) => cab.indexOf(n);
  const v = (l, n) => (k(n) >= 0 ? l[k(n)] : "");
  return dados.map((l) => ({
    model: v(l, "Model"),
    rootmodel: v(l, "Root model"),
    name: ((n) => n.charAt(0).toUpperCase() + n.slice(1).toLowerCase())(v(l, "Name").trim()),
    description: v(l, "Description"),
    category: v(l, "Subcategory") || v(l, "Category"),
    parent_category: v(l, "Category"),
    image: v(l, "Picture"),
    quantity: v(l, "Stock"),
    confidential_price: v(l, "Confidential Price"),
    material: v(l, "Material"),
    mgrabacion: [v(l, "Printing technique"), v(l, "Printing measurements")].filter((x) => x && x.trim()).join(" · "),
    color: v(l, "Color"),
    multiples: v(l, "Multiples"),
  }));
}

export const multiplicador = (custoComIva) =>
  custoComIva <= 5 ? 2.5 : custoComIva <= 20 ? 2 : custoComIva <= 50 ? 1.6 : 1.4;

export function transformar(raw, iva = 23) {
  const venda = (custo) => {
    const c = custo * (1 + iva / 100);
    return c * multiplicador(c);
  };

  const grupos = new Map();

  for (const p of Array.isArray(raw) ? raw : []) {
    const preco = num(p.confidential_price);
    const nome = texto(p.name);
    const categoria = texto(p.category) || "Outros";
    if (!preco || !nome) continue;
    if (CATEGORIAS_EXCLUIDAS.includes(categoria.toLowerCase())) continue;
    if (CATEGORIAS_EXCLUIDAS.includes(texto(p.parent_category).toLowerCase())) continue;

    const id = String(p.rootmodel || p.model).trim();
    const nd = codigoND("C:" + id);
    const stock = num(p.quantity);
    const imgs = imagens(p);

    let g = grupos.get(id);
    if (!g) {
      g = {
        ref: nd,
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

    g.preco = Math.min(g.preco, venda(preco));
    g.stock += stock;
    if (!g.imagem && imgs[0]) g.imagem = imgs[0];
    g.variantes.push({
      ref: nd + "-" + (String(p.model).trim().slice(id.length).replace(/^[-_.]/, "") || g.variantes.length + 1),
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
  const iva = process.env.CIFRA_IVA ? num(process.env.CIFRA_IVA) : 23;

  try {
    const r = await fetch(`${API}/${encodeURIComponent(token)}/pt`);
    if (!r.ok) throw new Error(`A Cifra respondeu com o estado ${r.status}`);
    const txt = await r.text();
    const raw = /^\s*[\[{]/.test(txt) ? JSON.parse(txt) : lerCSV(txt);
    const produtos = transformar(raw, iva);

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
