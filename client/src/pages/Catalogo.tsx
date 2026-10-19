/*
 * Catalogo.tsx — catálogo do Ninho do Dragão (/catalogo; /brindes continua a funcionar)
 *
 * Percurso do cliente: ocasiões (Natal, Até 1 €, Ecológicos…) ou categorias → artigos com filtros → detalhe →
 * "Juntar ao orçamento" (lista guardada no dispositivo) → um só pedido pelo WhatsApp.
 *
 * Fontes (juntas numa só lista, sem nunca mostrar o fornecedor):
 *   /.netlify/functions/catalogo-cifra    brindes (stock e preço em tempo real)
 *   /.netlify/functions/catalogo-valento  têxtil (fotos, cores, tamanhos, stock em tempo real)
 *   /catalogo/pubeivil.json               têxtil, roupa de trabalho e brindes (por encomenda)
 *
 * As categorias do site são as de GRUPOS (abaixo): cada produto entra no primeiro grupo cujas
 * palavras aparecem no nome/categoria do fornecedor. Para mudar categorias, edita só GRUPOS.
 */

import { useEffect, useMemo, useState } from "react";
import { traduzirNome } from "@/lib/traducao";

const WA = "https://wa.me/351935852703";
const WA_MSG = (msg: string) => `${WA}?text=${encodeURIComponent(msg)}`;
const POR_PAGINA = 48;
const font = "Montserrat, sans-serif";
const AZUL = "#2B4EAF";

type Variante = { ref: string; cor: string; imagem: string; stock: number; hex?: string };
type Produto = {
  ref: string;
  nome: string;
  descricao: string;
  categoria: string;
  categoriaPrincipal: string;
  imagem: string;
  preco: number;
  stock: number;
  multiplos: number;
  material: string;
  gravacao: string;
  variantes: Variante[];
  tamanhos?: string;
  grupo?: string;
};

// Ordem = ordem no ecrã. As palavras são procuradas sem acentos, em PT e ES (alguns fornecedores são espanhóis).
const GRUPOS: { id: string; nome: string; icone: string; palavras: string[] }[] = [
  { id: "textil", nome: "T-shirts, polos e sweats", icone: "👕", palavras: ["blusao", "leggin", "malha", "sweatshirt", "t-shirt", "tshirt", "camiseta", "polo", "sweat", "sudadera", "hoodie", "camisola", "camisa", " top ", "regata", " body", "babygrow", "pijama"] },
  { id: "casacos", nome: "Casacos e coletes", icone: "🧥", palavras: ["casaco", "parka", "colete", "chaleco", "chaqueta", "soft-shell", "softshell", "anorak", "impermeavel", "cortavientos"] },
  { id: "trabalho", nome: "Roupa de trabalho", icone: "🦺", palavras: ["roupa de trabalho", "workwear", "bata", "jaleca", "farda", "calca", "pantalon", "calcoes", "bermuda", "macacao", "alta visibilidade", "botas", "sapato", "zapato", "sapatilha", "avental", "delantal"] },
  { id: "bones", nome: "Bonés e chapéus", icone: "🧢", palavras: ["braga", "tubular", "bone", "gorra", "chapeu", "sombrero", "gorro", "viseira", "bandana", "cachecol", "bufanda", "luvas", "guantes"] },
  { id: "sacos", nome: "Sacos e mochilas", icone: "🎒", palavras: ["bolso", "rinonera", "bolsa de cintura", "bandolera", "monedero", "cartera", "fiambrera", "portatodo", "porta-documentos", "saco", "mochila", "bolsa", "mala", "trolley", "necessaire", "neceser", "tote", "pasta ", "carteira", "estojo", "lancheira", "nevera", "isotermic"] },
  { id: "bebidas", nome: "Canecas, copos e garrafas", icone: "☕", palavras: ["caneca", "chavena", "copo", "garrafa", "termo", "cantil", "taza", "botella", "vaso", "bidon", "thermo", "jarra", "mug"] },
  { id: "escrita", nome: "Canetas e escritório", icone: "🖊️", palavras: ["estuche", "carpeta", "portadocumentos", "portanotas", "lapicero", "lapices", "calendario", "sobre", "caneta", "esferografica", "lapis", "lapiseira", "marcador", "boligrafo", "lapiz", "roller", "caderno", "bloco", "agenda", "notas", "libreta", "bloc", "regua", "escritorio", "oficina", "post-it", "clip", "porta-cartoes", "tarjetero"] },
  { id: "tecnologia", nome: "Tecnologia", icone: "🔌", palavras: ["soporte", "portamovil", "suporte", "alfombrilla", "localizador", "adaptador", "lampara", "candeeiro", "estacion", "ventilador", "cascos", "usb", "carregador", "cargador", "power bank", "powerbank", "bateria", "coluna", "altavoz", "auricular", "headphone", "cabo", "cable", " rato ", "webcam", "tecnolog", "relogio", "reloj", "smart", "wireless", "bluetooth", " led "] },
  { id: "festas", nome: "Festas, eventos e Natal", icone: "🎉", palavras: ["pulsera", "festa", "evento", "natal", "navid", "leque", "abanico", "pulseira", "lanyard", "fita", "bandeira", "adorno", "trofeu", "trofeo", "medalha", "medalla", "casamento", "boda"] },
  { id: "casa", nome: "Casa, cozinha e decoração", icone: "🏠", palavras: ["tabla", "posavasos", "caja", "caixa", "maceta", "vaso de planta", "cubo", "organizador", "cenicero", "bascula", "cortador", "zapatillero", "manopla", "silla", "cadeira", "cozinha", "cocina", "tabua", "vela", "decora", "moldura", "marco", "saca-rolhas", "sacacorchos", "vinho", "vino", "abre-cap", "abrebotellas", " bar ", "queijo", "manta", "almofada", "toalha", "toalla", "casa"] },
  { id: "pequenos", nome: "Porta-chaves e pequenos brindes", icone: "🔑", palavras: ["porta-chaves", "porta chaves", "llavero", "iman", "cracha", " pin ", "anti-stress", "antiestres", "chapa", "abridor"] },
  { id: "crianca", nome: "Criança e jogos", icone: "🧸", palavras: ["domino", "parchis", "frisbee", "balon", "bola", "crianca", "infantil", "nino", "kid", "jogo", "juego", "brinquedo", "juguete", "peluche", "colorir", "desenho", "lapis de cor", "puzzle"] },
  { id: "lazer", nome: "Desporto, praia e lazer", icone: "⛱️", palavras: ["poncho", "chanclas", "chinelos", "pareo", "esterilla", "colchoneta", "silla de playa", "desport", "sport", "praia", "playa", "guarda-chuva", "paraguas", "oculos", "gafas", "verao", "verano", "fitness", "ginasio", "bicicleta", "piquenique", "picnic"] },
  { id: "pessoal", nome: "Cuidado pessoal", icone: "🧴", palavras: ["peine", "pente", "cepillo", "escova", "pastillero", "farmacia", "balsamo", " gel ", "espelho", "espejo", "manicure", "higiene", "massag", "beleza", "cosmetic", "protetor"] },
  { id: "ferramentas", nome: "Ferramentas e automóvel", icone: "🔧", palavras: ["multiherramienta", "multi-ferramenta", "multiferramenta", "navaja", "canivete", "flexometro", "fita metrica", "cutter", "x-acto", "nivel", "linterna", "lanterna", "rascador", "raspador", "baliza", "parasol", "para-sol", "auto", "carro", "coche", "ferramenta", "herramienta"] },
  { id: "outros", nome: "Outros brindes", icone: "🎁", palavras: [] },
];

// 🎄 Destaque de Natal: artigos de Natal primeiro, depois boas ideias de presente.
// Para mudar a seleção, edita estas duas listas (ou NATAL_ATIVO para desligar o destaque depois do Natal).
const NATAL_ATIVO = true;
const NATAL_PRAZO = "Encomendas para o Natal até 30 de novembro";
const NATAL_TEMA = ["natal", "navid", "noel", "christmas", "xmas", "arvore", "advento", "rena", "presepio", "bola de natal"];
const NATAL_PRESENTES = ["manta", "caneca", "taza", "chavena", "vela", "gorro", "meia", "calcetin", "luvas", "guantes", "cachecol", "bufanda",
  "termo", "garrafa termica", "conjunto de vinho", "set de vino", "vinho", "peluche", "moldura", "portafotos", "almofada", "pantufa",
  "chocolate", "caixa de oferta", "caja regalo", "saco de oferta", "bolsa de regalo", "difusor", "aroma", "relogio", "coluna", "auricular", "power bank"];

const semAcentos = (s: string) => s.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();
const grupoDe = (p: Produto) => {
  // "Marca – Tipo" (alguns fornecedores): a marca/nome do modelo não conta, só o tipo
  const nome = p.nome.includes(" – ") ? p.nome.split(" – ").slice(1).join(" ") : p.nome;
  const t = " " + semAcentos(`${nome} ${p.categoria} ${p.categoriaPrincipal}`).replace(/[^a-z0-9-]+/g, " ") + " ";
  // cada palavra tem de começar uma palavra do texto (ex.: "desport" apanha "desportivo", mas "bone" não apanha "boney")
  return (GRUPOS.find(g => g.palavras.some(w => t.includes(" " + semAcentos(w).trim().replace(/[^a-z0-9-]+/g, " ")))) || GRUPOS[GRUPOS.length - 1]).id;
};

const textoDe = (p: Produto) => " " + semAcentos(`${p.nome} ${p.categoria} ${p.material}`).replace(/[^a-z0-9-]+/g, " ") + " ";
const temPalavra = (t: string, ws: string[]) => ws.some(w => t.includes(" " + semAcentos(w)));
// 2 = artigo de Natal, 1 = boa ideia de presente, 0 = não entra
const pontosNatal = (p: Produto) => (temPalavra(textoDe(p), NATAL_TEMA) ? 2 : temPalavra(textoDe(p), NATAL_PRESENTES) ? 1 : 0);
const ECO = ["rpet", "reciclad", "recycled", "bambu", "bamboo", "cortica", "corcho", "cork", "organico", "organic", "juta", "yute", "jute",
  "eco", "palha de trigo", "trigo", "semente", "fsc", "canhamo", "cañamo", "algodao reciclado", "papel reciclado", "kraft"];
const eEco = (p: Produto) => temPalavra(textoDe(p), ECO);

// Ocasiões / coleções (barra do topo). Para acrescentar uma, junta aqui um id, nome, ícone e regra.
const OCASIOES: { id: string; nome: string; icone: string; descricao: string; regra: (p: Produto) => boolean }[] = [
  ...(NATAL_ATIVO ? [{ id: "natal", nome: "Natal", icone: "🎄", descricao: "Enfeites, canecas, mantas e presentes com nome ou foto", regra: (p: Produto) => pontosNatal(p) > 0 }] : []),
  { id: "ate1", nome: "Até 1 €", icone: "💶", descricao: "Lembranças baratas para eventos, escolas e empresas", regra: p => p.preco <= 1 },
  { id: "eco", nome: "Ecológicos", icone: "🌱", descricao: "Bambu, cortiça, algodão orgânico e materiais reciclados", regra: eEco },
  { id: "premium", nome: "Premium", icone: "⭐", descricao: "Presentes especiais para clientes e colaboradores", regra: p => p.preco >= 15 },
  { id: "trabalho", nome: "Vestuário de trabalho", icone: "🦺", descricao: "Fardas, polos, aventais e roupa de trabalho", regra: p => p.grupo === "trabalho" },
];

const ORDENS = [
  { id: "relevancia", nome: "Mais relevantes" },
  { id: "preco-asc", nome: "Preço: mais baixo" },
  { id: "preco-desc", nome: "Preço: mais alto" },
  { id: "nome", nome: "Nome (A–Z)" },
];
const FAIXAS_PRECO = [
  { id: "", nome: "Qualquer preço", min: 0, max: Infinity },
  { id: "0-1", nome: "Até 1 €", min: 0, max: 1 },
  { id: "1-5", nome: "1 € – 5 €", min: 1, max: 5 },
  { id: "5-15", nome: "5 € – 15 €", min: 5, max: 15 },
  { id: "15+", nome: "Mais de 15 €", min: 15, max: Infinity },
];

const euro = (v: number) =>
  v.toLocaleString("pt-PT", { style: "currency", currency: "EUR", minimumFractionDigits: 2, maximumFractionDigits: 2 });

const lerSelecaoDoEndereco = () => new URLSearchParams(window.location.search).get("categoria");

// ── Lista de orçamento (fica guardada neste dispositivo) ──────────────────────
type ItemOrcamento = { ref: string; nome: string; imagem: string; preco: number; cor: string; tamanho: string; quantidade: number };
const CHAVE_ORC = "ninho-orcamento";
const lerOrcamento = (): ItemOrcamento[] => {
  try { return JSON.parse(localStorage.getItem(CHAVE_ORC) || "[]"); } catch { return []; }
};
const guardarOrcamento = (itens: ItemOrcamento[]) => {
  try { localStorage.setItem(CHAVE_ORC, JSON.stringify(itens)); } catch { /* modo privado: a lista fica só nesta visita */ }
};

const botaoChip = (ativo: boolean): React.CSSProperties => ({
  padding: "8px 14px", borderRadius: "999px", border: ativo ? `2px solid ${AZUL}` : "2px solid #e5e7eb",
  background: ativo ? AZUL : "white", color: ativo ? "white" : "#374151", fontWeight: 600, fontSize: "13px",
  fontFamily: font, cursor: "pointer", whiteSpace: "nowrap",
});

export default function Catalogo() {
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [estado, setEstado] = useState<"a-carregar" | "ok" | "erro">("a-carregar");
  const [sel, setSel] = useState<string | null>(lerSelecaoDoEndereco);
  const [pesquisa, setPesquisa] = useState("");
  const [soStock, setSoStock] = useState(false);
  const [ordem, setOrdem] = useState("relevancia");
  const [faixa, setFaixa] = useState("");
  const [filtrosAbertos, setFiltrosAbertos] = useState(false);
  const [limite, setLimite] = useState(POR_PAGINA);
  const [aberto, setAberto] = useState<Produto | null>(null);
  const [orcamento, setOrcamento] = useState<ItemOrcamento[]>(lerOrcamento);
  const [orcAberto, setOrcAberto] = useState(false);
  const [aviso, setAviso] = useState("");

  useEffect(() => {
    document.title = "Catálogo de produtos personalizados | Ninho do Dragão";
    const carregar = (url: string) =>
      fetch(url)
        .then(r => (r.ok ? r.json() : Promise.reject(r.status)))
        .then(d => (d.produtos || []) as Produto[])
        .catch(() => null);
    Promise.all([
      carregar("/.netlify/functions/catalogo-valento"),
      carregar("/.netlify/functions/catalogo-cifra"),
      carregar("/catalogo/pubeivil.json"),
    ]).then(listas => {
      if (listas.every(l => !l)) return setEstado("erro");
      const vistos = new Set<string>();
      const todos = listas
        .flatMap(l => l || [])
        .filter(p => p.imagem && p.preco > 0)
        .filter(p => (vistos.has(p.ref) ? false : (vistos.add(p.ref), true)))
        .map(p => ({ ...p, nome: traduzirNome(p.nome) }))
        .map(p => ({ ...p, grupo: grupoDe(p) }));
      setProdutos(todos);
      setEstado("ok");
    });
    const voltar = () => { setSel(lerSelecaoDoEndereco()); setAberto(null); };
    const tecla = (e: KeyboardEvent) => { if (e.key === "Escape") { setAberto(null); setOrcAberto(false); } };
    window.addEventListener("popstate", voltar);
    window.addEventListener("keydown", tecla);
    return () => { window.removeEventListener("popstate", voltar); window.removeEventListener("keydown", tecla); };
  }, []);

  useEffect(() => guardarOrcamento(orcamento), [orcamento]);
  useEffect(() => { if (!aviso) return; const t = setTimeout(() => setAviso(""), 2500); return () => clearTimeout(t); }, [aviso]);

  const irPara = (id: string | null) => {
    window.history.pushState({}, "", id ? `${window.location.pathname}?categoria=${id}` : window.location.pathname);
    setSel(id); setPesquisa(""); setFaixa(""); setOrdem("relevancia"); setLimite(POR_PAGINA); setFiltrosAbertos(false);
    window.scrollTo({ top: 0 });
  };

  const resumo = useMemo(
    () =>
      GRUPOS.map(g => {
        const lista = produtos.filter(p => p.grupo === g.id);
        const capa = lista.find(p => p.stock > 0) || lista[0];
        return { ...g, total: lista.length, capa: capa?.imagem || "" };
      }).filter(g => g.total > 0),
    [produtos]
  );
  const ocasioes = useMemo(
    () =>
      OCASIOES.map(o => {
        const lista = produtos.filter(o.regra);
        const capa = (o.id === "natal" ? lista.find(p => pontosNatal(p) === 2) : null) || lista.find(p => p.stock > 0) || lista[0];
        return { ...o, total: lista.length, capa: capa?.imagem || "" };
      }).filter(o => o.total > 0),
    [produtos]
  );

  const ocasiaoAtual = OCASIOES.find(o => o.id === sel);
  const grupoAtual = GRUPOS.find(g => g.id === sel);
  const titulo = ocasiaoAtual ? { icone: ocasiaoAtual.icone, nome: ocasiaoAtual.nome } : grupoAtual ? { icone: grupoAtual.icone, nome: grupoAtual.nome } : null;

  const q = semAcentos(pesquisa.trim());
  const mostrarLista = !!sel || !!q;
  const fx = FAIXAS_PRECO.find(f => f.id === faixa) || FAIXAS_PRECO[0];

  const lista = useMemo(() => {
    if (!mostrarLista) return [];
    let r = produtos.filter(p => {
      if (ocasiaoAtual && !ocasiaoAtual.regra(p)) return false;
      if (grupoAtual && p.grupo !== grupoAtual.id) return false;
      if (soStock && p.stock === 0) return false;
      if (p.preco < fx.min || p.preco > fx.max) return false;
      if (q && !semAcentos(`${p.nome} ${p.ref} ${p.categoria} ${p.material}`).includes(q)) return false;
      return true;
    });
    if (ordem === "preco-asc") r = [...r].sort((a, b) => a.preco - b.preco);
    else if (ordem === "preco-desc") r = [...r].sort((a, b) => b.preco - a.preco);
    else if (ordem === "nome") r = [...r].sort((a, b) => a.nome.localeCompare(b.nome, "pt"));
    else if (sel === "natal") r = [...r].sort((a, b) => pontosNatal(b) - pontosNatal(a) || Number(b.stock !== 0) - Number(a.stock !== 0));
    else r = [...r].sort((a, b) => Number(b.stock !== 0) - Number(a.stock !== 0));
    return r;
  }, [produtos, mostrarLista, ocasiaoAtual, grupoAtual, soStock, fx, q, ordem, sel]);

  const natalDestaque = useMemo(
    () => (NATAL_ATIVO ? produtos.filter(p => pontosNatal(p) === 2).sort((a, b) => Number(b.stock !== 0) - Number(a.stock !== 0)).slice(0, 12) : []),
    [produtos]
  );

  // ── orçamento ──
  const totalItens = orcamento.reduce((s, i) => s + 1, 0);
  const adicionar = (p: Produto, cor = "", tamanho = "", quantidade = 1) => {
    setOrcamento(o => {
      const i = o.findIndex(x => x.ref === p.ref && x.cor === cor && x.tamanho === tamanho);
      if (i >= 0) return o.map((x, k) => (k === i ? { ...x, quantidade: x.quantidade + quantidade } : x));
      return [...o, { ref: p.ref, nome: p.nome, imagem: p.imagem, preco: p.preco, cor, tamanho, quantidade }];
    });
    setAviso(`«${p.nome}» juntado ao orçamento`);
  };
  const [notas, setNotas] = useState("");
  const mensagemOrcamento = () =>
    "Olá! Gostava de pedir orçamento para:\n" +
    orcamento.map(i => `• ${i.quantidade} × ${i.nome} (ref. ${i.ref}${i.cor ? `, cor ${i.cor}` : ""}${i.tamanho ? `, tam. ${i.tamanho}` : ""})`).join("\n") +
    `\n\nPersonalização / notas: ${notas || ""}`;

  const pedirSo = (p: Produto, cor?: string) =>
    WA_MSG(
      `Olá! Gostava de pedir orçamento para:\n• ${p.nome} (ref. ${p.ref}${cor ? `, cor ${cor}` : ""})\n` +
        (p.tamanhos ? `• Tamanho(s): \n` : "") + `• Quantidade: \n• Personalização (logótipo/texto/foto): `
    );

  // ── peças de interface ──
  const Etiquetas = ({ p }: { p: Produto }) => (
    <div style={{ position: "absolute", top: "8px", left: "8px", display: "flex", gap: "4px", flexWrap: "wrap", zIndex: 1 }}>
      {NATAL_ATIVO && pontosNatal(p) === 2 && <span style={{ background: "#991b1b", color: "white", fontSize: "11px", fontWeight: 700, padding: "3px 7px", borderRadius: "6px" }}>🎄 Natal</span>}
      {eEco(p) && <span style={{ background: "#166534", color: "white", fontSize: "11px", fontWeight: 700, padding: "3px 7px", borderRadius: "6px" }}>🌱 Eco</span>}
      {p.preco <= 1 && <span style={{ background: "#C9A227", color: "white", fontSize: "11px", fontWeight: 700, padding: "3px 7px", borderRadius: "6px" }}>Até 1 €</span>}
    </div>
  );

  const Cartao = ({ p }: { p: Produto }) => (
    <article style={{ background: "white", borderRadius: "12px", border: "1px solid #e5e7eb", overflow: "hidden", display: "flex", flexDirection: "column" }}>
      <button onClick={() => setAberto(p)} aria-label={`Ver ${p.nome}`}
        style={{ position: "relative", aspectRatio: "1 / 1", width: "100%", background: "white", border: "none", padding: "10px", cursor: "pointer" }}>
        <Etiquetas p={p} />
        <img src={p.imagem} alt={p.nome} loading="lazy" style={{ width: "100%", height: "100%", objectFit: "contain" }} />
      </button>
      <div style={{ padding: "10px 12px 12px", display: "flex", flexDirection: "column", gap: "3px", flex: 1, borderTop: "1px solid #f3f4f6" }}>
        <button onClick={() => setAberto(p)} style={{ background: "none", border: "none", padding: 0, textAlign: "left", cursor: "pointer", fontFamily: font, fontSize: "13.5px", fontWeight: 700, color: "#1a1a2e", lineHeight: 1.35 }}>
          {p.nome}
        </button>
        <span style={{ fontSize: "11px", color: "#9ca3af" }}>{p.ref}{p.variantes.length > 1 ? ` · ${p.variantes.length} cores` : ""}</span>
        <div style={{ marginTop: "auto", paddingTop: "6px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "6px" }}>
          <span style={{ fontSize: "12px", color: "#6b7280" }}>desde <strong style={{ fontSize: "16px", color: AZUL, fontFamily: font }}>{euro(p.preco)}</strong></span>
          <button onClick={() => adicionar(p)} title="Juntar ao orçamento"
            style={{ border: `1.5px solid ${AZUL}`, color: AZUL, background: "white", borderRadius: "8px", padding: "5px 8px", fontSize: "12px", fontWeight: 700, cursor: "pointer", whiteSpace: "nowrap" }}>
            + Orçamento
          </button>
        </div>
      </div>
    </article>
  );

  const Filtros = () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
      <div>
        <div style={{ fontFamily: font, fontWeight: 800, fontSize: "13px", color: "#1a1a2e", marginBottom: "8px", textTransform: "uppercase", letterSpacing: "0.04em" }}>Preço</div>
        {FAIXAS_PRECO.map(f => (
          <label key={f.id} style={{ display: "flex", gap: "8px", alignItems: "center", fontSize: "14px", color: "#374151", padding: "3px 0", cursor: "pointer" }}>
            <input type="radio" name="faixa" checked={faixa === f.id} onChange={() => { setFaixa(f.id); setLimite(POR_PAGINA); }} /> {f.nome}
          </label>
        ))}
      </div>
      <label style={{ display: "flex", gap: "8px", alignItems: "center", fontSize: "14px", color: "#374151", cursor: "pointer" }}>
        <input type="checkbox" checked={soStock} onChange={e => setSoStock(e.target.checked)} /> Só com stock imediato
      </label>
      <div>
        <div style={{ fontFamily: font, fontWeight: 800, fontSize: "13px", color: "#1a1a2e", marginBottom: "8px", textTransform: "uppercase", letterSpacing: "0.04em" }}>Categorias</div>
        {resumo.map(g => (
          <button key={g.id} onClick={() => irPara(g.id)}
            style={{ display: "flex", justifyContent: "space-between", width: "100%", background: sel === g.id ? "#eef2ff" : "none", border: "none", borderRadius: "6px", padding: "6px 8px", cursor: "pointer", fontSize: "13.5px", color: sel === g.id ? AZUL : "#374151", fontWeight: sel === g.id ? 700 : 500, textAlign: "left" }}>
            <span>{g.icone} {g.nome}</span><span style={{ color: "#9ca3af" }}>{g.total}</span>
          </button>
        ))}
      </div>
    </div>
  );

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#f6f7fb" }}>
      <style>{`
        .cat-layout { display: grid; grid-template-columns: 240px 1fr; gap: 28px; align-items: start; }
        .cat-filtros-btn { display: none; }
        @media (max-width: 860px) {
          .cat-layout { grid-template-columns: 1fr; }
          .cat-aside { display: none; }
          .cat-aside.aberto { display: block; }
          .cat-filtros-btn { display: inline-flex; }
          .cat-pesquisa-topo { display: none; }
        }
      `}</style>

      {/* Cabeçalho */}
      <header style={{ background: "white", borderBottom: "1px solid #e5e7eb", position: "sticky", top: 0, zIndex: 30 }}>
        <div style={{ maxWidth: "1240px", margin: "0 auto", padding: "12px 16px", display: "flex", alignItems: "center", gap: "16px" }}>
          <a href="/" style={{ textDecoration: "none", fontFamily: "'Dancing Script', cursive", fontSize: "26px", fontWeight: 700, color: AZUL, whiteSpace: "nowrap" }}>Ninho do Dragão</a>
          <input className="cat-pesquisa-topo" type="search" value={pesquisa} onChange={e => { setPesquisa(e.target.value); setLimite(POR_PAGINA); }}
            placeholder="O que procuras? (caneca, polo, mochila, Natal…)"
            style={{ flex: 1, padding: "10px 14px", borderRadius: "10px", border: "2px solid #e5e7eb", fontSize: "14px", outline: "none", minWidth: 0 }} />
          <button onClick={() => setOrcAberto(true)}
            style={{ marginLeft: "auto", display: "inline-flex", alignItems: "center", gap: "6px", background: AZUL, color: "white", border: "none", borderRadius: "10px", padding: "9px 14px", fontWeight: 700, fontFamily: font, fontSize: "13px", cursor: "pointer", whiteSpace: "nowrap" }}>
            📋 Orçamento {totalItens > 0 && <span style={{ background: "#C9A227", borderRadius: "999px", padding: "1px 7px" }}>{totalItens}</span>}
          </button>
        </div>
        {/* Ocasiões */}
        <div style={{ borderTop: "1px solid #f0f0f0" }}>
          <div style={{ maxWidth: "1240px", margin: "0 auto", padding: "8px 16px", display: "flex", gap: "8px", overflowX: "auto" }}>
            <button style={botaoChip(!sel && !q)} onClick={() => irPara(null)}>🏠 Início do catálogo</button>
            {ocasioes.map(o => (
              <button key={o.id} style={botaoChip(sel === o.id)} onClick={() => irPara(o.id)}>{o.icone} {o.nome}</button>
            ))}
          </div>
        </div>
      </header>

      <main style={{ maxWidth: "1240px", margin: "0 auto", padding: "20px 16px 100px" }}>
        {/* pesquisa no telemóvel */}
        <input type="search" value={pesquisa} onChange={e => { setPesquisa(e.target.value); setLimite(POR_PAGINA); }} className="cat-filtros-btn"
          placeholder="O que procuras?" style={{ width: "100%", padding: "11px 14px", borderRadius: "10px", border: "2px solid #e5e7eb", fontSize: "15px", outline: "none", marginBottom: "14px", boxSizing: "border-box" }} />

        {estado === "a-carregar" && <p style={{ textAlign: "center", color: "#6b7280", padding: "60px 0" }}>A carregar catálogo…</p>}
        {estado === "erro" && (
          <div style={{ textAlign: "center", padding: "60px 0" }}>
            <p style={{ color: "#374151", marginBottom: "16px" }}>Não foi possível carregar o catálogo neste momento.</p>
            <a href={WA_MSG("Olá! Gostava de pedir orçamento para um artigo personalizado.")} target="_blank" rel="noopener noreferrer" className="btn-whatsapp"
              style={{ padding: "12px 22px", borderRadius: "10px", textDecoration: "none", fontWeight: 600 }}>Pedir orçamento no WhatsApp</a>
          </div>
        )}

        {/* ── Início do catálogo: Natal + ocasiões + categorias ── */}
        {estado === "ok" && !mostrarLista && (
          <>
            {natalDestaque.length > 0 && (
              <section style={{ background: "linear-gradient(135deg, #14532d, #166534 55%, #991b1b)", borderRadius: "16px", padding: "20px 16px", marginBottom: "28px", color: "white" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", gap: "12px", flexWrap: "wrap", marginBottom: "14px" }}>
                  <div>
                    <h2 style={{ fontFamily: font, fontSize: "22px", fontWeight: 800, margin: 0 }}>🎄 Natal personalizado</h2>
                    <p style={{ margin: "4px 0 0", fontSize: "14px", opacity: 0.9 }}>Presentes com nome, foto ou logótipo · {NATAL_PRAZO}</p>
                  </div>
                  <button onClick={() => irPara("natal")} style={{ background: "white", color: "#14532d", border: "none", borderRadius: "999px", padding: "10px 18px", fontWeight: 700, fontFamily: font, cursor: "pointer" }}>
                    Ver tudo para o Natal →
                  </button>
                </div>
                <div style={{ display: "flex", gap: "12px", overflowX: "auto", paddingBottom: "6px" }}>
                  {natalDestaque.map(p => (
                    <button key={p.ref} onClick={() => setAberto(p)} style={{ flex: "0 0 150px", background: "white", border: "none", borderRadius: "12px", padding: 0, overflow: "hidden", cursor: "pointer", textAlign: "left" }}>
                      <div style={{ aspectRatio: "1 / 1", padding: "8px" }}><img src={p.imagem} alt={p.nome} loading="lazy" style={{ width: "100%", height: "100%", objectFit: "contain" }} /></div>
                      <div style={{ padding: "8px 10px" }}>
                        <div style={{ fontSize: "13px", fontWeight: 700, color: "#1a1a2e", fontFamily: font, lineHeight: 1.3, height: "34px", overflow: "hidden" }}>{p.nome}</div>
                        <div style={{ fontSize: "12px", color: "#6b7280", marginTop: "4px" }}>desde <strong style={{ color: "#991b1b" }}>{euro(p.preco)}</strong></div>
                      </div>
                    </button>
                  ))}
                </div>
              </section>
            )}

            <h2 style={{ fontFamily: font, fontSize: "20px", fontWeight: 800, color: "#1a1a2e", margin: "0 0 12px" }}>Ocasiões</h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 220px), 1fr))", gap: "14px", marginBottom: "32px" }}>
              {ocasioes.map(o => (
                <button key={o.id} onClick={() => irPara(o.id)}
                  style={{ display: "flex", gap: "12px", alignItems: "center", background: "white", border: "1px solid #e5e7eb", borderRadius: "14px", padding: "10px", cursor: "pointer", textAlign: "left" }}>
                  <div style={{ width: "64px", height: "64px", flex: "0 0 64px", borderRadius: "10px", background: "#f6f7fb", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
                    {o.capa ? <img src={o.capa} alt="" loading="lazy" style={{ width: "100%", height: "100%", objectFit: "contain" }} /> : <span style={{ fontSize: "28px" }}>{o.icone}</span>}
                  </div>
                  <div>
                    <div style={{ fontFamily: font, fontWeight: 800, fontSize: "15px", color: "#1a1a2e" }}>{o.icone} {o.nome}</div>
                    <div style={{ fontSize: "12px", color: "#6b7280", lineHeight: 1.4 }}>{o.descricao}</div>
                    <div style={{ fontSize: "12px", color: AZUL, fontWeight: 700, marginTop: "2px" }}>{o.total} artigos →</div>
                  </div>
                </button>
              ))}
            </div>

            <h2 style={{ fontFamily: font, fontSize: "20px", fontWeight: 800, color: "#1a1a2e", margin: "0 0 12px" }}>Categorias</h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 170px), 1fr))", gap: "14px" }}>
              {resumo.map(g => (
                <button key={g.id} onClick={() => irPara(g.id)}
                  style={{ border: "1px solid #e5e7eb", borderRadius: "14px", background: "white", padding: 0, cursor: "pointer", overflow: "hidden", textAlign: "left", display: "flex", flexDirection: "column" }}>
                  <div style={{ aspectRatio: "4 / 3", width: "100%", background: "white", padding: "10px", boxSizing: "border-box" }}>
                    {g.capa ? <img src={g.capa} alt="" loading="lazy" style={{ width: "100%", height: "100%", objectFit: "contain" }} /> : <span style={{ fontSize: "40px" }}>{g.icone}</span>}
                  </div>
                  <div style={{ padding: "10px 12px", borderTop: "1px solid #f3f4f6", width: "100%", boxSizing: "border-box" }}>
                    <div style={{ fontFamily: font, fontWeight: 700, fontSize: "14px", color: "#1a1a2e", lineHeight: 1.3 }}>{g.icone} {g.nome}</div>
                    <div style={{ fontSize: "12px", color: "#6b7280", marginTop: "3px" }}>{g.total} artigos →</div>
                  </div>
                </button>
              ))}
            </div>
          </>
        )}

        {/* ── Lista de artigos com filtros ── */}
        {estado === "ok" && mostrarLista && (
          <>
            <nav style={{ fontSize: "13px", color: "#6b7280", fontFamily: font, marginBottom: "10px" }}>
              <a href="/" style={{ color: "#6b7280", textDecoration: "none" }}>Início</a>{" › "}
              <button onClick={() => irPara(null)} style={{ background: "none", border: "none", padding: 0, color: AZUL, cursor: "pointer", font: "inherit", fontWeight: 600 }}>Catálogo</button>
              {titulo && <>{" › "}<span style={{ color: "#1a1a2e", fontWeight: 600 }}>{titulo.nome}</span></>}
            </nav>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", gap: "12px", flexWrap: "wrap", marginBottom: "16px" }}>
              <div>
                <h1 style={{ fontFamily: font, fontSize: "clamp(22px, 4vw, 30px)", fontWeight: 800, color: "#1a1a2e", margin: 0 }}>
                  {titulo ? `${titulo.icone} ${titulo.nome}` : `Resultados para «${pesquisa.trim()}»`}
                </h1>
                <div style={{ fontSize: "13px", color: "#6b7280", marginTop: "4px" }}>
                  {lista.length} {lista.length === 1 ? "artigo" : "artigos"}{sel === "natal" ? ` · ${NATAL_PRAZO}` : ""}
                </div>
              </div>
              <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
                <button className="cat-filtros-btn" onClick={() => setFiltrosAbertos(f => !f)} style={{ ...botaoChip(filtrosAbertos), borderRadius: "10px" }}>⚙️ Filtros</button>
                <select value={ordem} onChange={e => setOrdem(e.target.value)}
                  style={{ padding: "9px 10px", borderRadius: "10px", border: "2px solid #e5e7eb", fontSize: "13px", fontFamily: font, background: "white" }}>
                  {ORDENS.map(o => <option key={o.id} value={o.id}>{o.nome}</option>)}
                </select>
              </div>
            </div>

            <div className="cat-layout">
              <aside className={`cat-aside${filtrosAbertos ? " aberto" : ""}`} style={{ background: "white", border: "1px solid #e5e7eb", borderRadius: "14px", padding: "16px", position: "sticky", top: "120px" }}>
                <Filtros />
              </aside>
              <div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 170px), 1fr))", gap: "14px" }}>
                  {lista.slice(0, limite).map(p => <Cartao key={p.ref} p={p} />)}
                </div>
                {lista.length > limite && (
                  <div style={{ textAlign: "center", marginTop: "24px" }}>
                    <button onClick={() => setLimite(l => l + POR_PAGINA)} style={{ ...botaoChip(false), padding: "12px 28px", borderRadius: "10px" }}>
                      Ver mais artigos ({lista.length - limite})
                    </button>
                  </div>
                )}
                {lista.length === 0 && (
                  <p style={{ textAlign: "center", color: "#6b7280", padding: "40px 0" }}>Não encontrámos esse artigo. Fala connosco no WhatsApp — temos muitos mais!</p>
                )}
              </div>
            </div>
          </>
        )}

        <p style={{ textAlign: "center", fontSize: "12px", color: "#9ca3af", marginTop: "40px", lineHeight: 1.6 }}>
          Preços por unidade, sem personalização. O valor final depende da quantidade e da personalização — enviamos o orçamento pelo WhatsApp.
        </p>
      </main>

      {/* Aviso "juntado ao orçamento" */}
      {aviso && (
        <div style={{ position: "fixed", bottom: "20px", left: "50%", transform: "translateX(-50%)", background: "#1a1a2e", color: "white", padding: "10px 16px", borderRadius: "10px", fontSize: "14px", zIndex: 70, display: "flex", gap: "12px", alignItems: "center", maxWidth: "92vw" }}>
          ✓ {aviso}
          <button onClick={() => { setAviso(""); setOrcAberto(true); }} style={{ background: "none", border: "none", color: "#fcd34d", fontWeight: 700, cursor: "pointer" }}>Ver</button>
        </div>
      )}

      {/* Detalhe do artigo */}
      {aberto && <Detalhe p={aberto} fechar={() => setAberto(null)} adicionar={adicionar} pedirSo={pedirSo} />}

      {/* Lista de orçamento */}
      {orcAberto && (
        <div onClick={() => setOrcAberto(false)} style={{ position: "fixed", inset: 0, background: "rgba(17,24,39,0.5)", zIndex: 60, display: "flex", justifyContent: "flex-end" }}>
          <div onClick={e => e.stopPropagation()} role="dialog" aria-modal="true"
            style={{ width: "min(420px, 100%)", height: "100%", background: "white", display: "flex", flexDirection: "column" }}>
            <div style={{ padding: "16px", borderBottom: "1px solid #e5e7eb", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <h2 style={{ fontFamily: font, fontSize: "18px", fontWeight: 800, margin: 0 }}>📋 O meu orçamento</h2>
              <button onClick={() => setOrcAberto(false)} aria-label="Fechar" style={{ border: "none", background: "none", fontSize: "26px", cursor: "pointer", color: "#6b7280" }}>×</button>
            </div>
            <div style={{ flex: 1, overflowY: "auto", padding: "12px 16px" }}>
              {orcamento.length === 0 && <p style={{ color: "#6b7280", fontSize: "14px" }}>Ainda não juntaste artigos. Carrega em <strong>+ Orçamento</strong> nos artigos que te interessam e envia tudo de uma vez.</p>}
              {orcamento.map((i, k) => (
                <div key={k} style={{ display: "flex", gap: "10px", padding: "10px 0", borderBottom: "1px solid #f3f4f6" }}>
                  <img src={i.imagem} alt="" style={{ width: "56px", height: "56px", objectFit: "contain", flex: "0 0 56px" }} />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: "13.5px", fontWeight: 700, color: "#1a1a2e" }}>{i.nome}</div>
                    <div style={{ fontSize: "12px", color: "#6b7280" }}>{i.ref}{i.cor ? ` · ${i.cor}` : ""}{i.tamanho ? ` · tam. ${i.tamanho}` : ""}</div>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px", marginTop: "6px" }}>
                      <label style={{ fontSize: "12px", color: "#374151" }}>Qtd.</label>
                      <input type="number" min={1} value={i.quantidade}
                        onChange={e => { const v = Math.max(1, parseInt(e.target.value) || 1); setOrcamento(o => o.map((x, j) => (j === k ? { ...x, quantidade: v } : x))); }}
                        style={{ width: "72px", padding: "5px 6px", border: "1px solid #d1d5db", borderRadius: "6px" }} />
                      <button onClick={() => setOrcamento(o => o.filter((_, j) => j !== k))} style={{ marginLeft: "auto", border: "none", background: "none", color: "#b91c1c", fontSize: "12px", cursor: "pointer" }}>Remover</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {orcamento.length > 0 && (
              <div style={{ padding: "14px 16px", borderTop: "1px solid #e5e7eb", display: "flex", flexDirection: "column", gap: "10px" }}>
                <textarea value={notas} onChange={e => setNotas(e.target.value)} rows={3}
                  placeholder="Personalização: nome, frase, logótipo, cores, data de entrega…"
                  style={{ width: "100%", boxSizing: "border-box", padding: "10px", border: "1px solid #d1d5db", borderRadius: "8px", fontSize: "14px", fontFamily: "inherit", resize: "vertical" }} />
                <a href={WA_MSG(mensagemOrcamento())} target="_blank" rel="noopener noreferrer" className="btn-whatsapp"
                  style={{ padding: "14px", borderRadius: "10px", textAlign: "center", textDecoration: "none", fontWeight: 700, fontSize: "15px" }}>
                  Enviar pedido de orçamento pelo WhatsApp
                </a>
                <button onClick={() => setOrcamento([])} style={{ border: "none", background: "none", color: "#6b7280", fontSize: "12px", cursor: "pointer" }}>Esvaziar lista</button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

// ── Janela de detalhe do artigo ──────────────────────────────────────────────
function Detalhe({ p, fechar, adicionar, pedirSo }: {
  p: Produto;
  fechar: () => void;
  adicionar: (p: Produto, cor?: string, tamanho?: string, quantidade?: number) => void;
  pedirSo: (p: Produto, cor?: string) => string;
}) {
  const [cor, setCor] = useState(p.variantes.length === 1 ? p.variantes[0].cor : "");
  const [imagem, setImagem] = useState(p.imagem);
  const [tamanho, setTamanho] = useState("");
  const [qtd, setQtd] = useState(p.multiplos > 1 ? p.multiplos : 1);
  const tamanhos = (p.tamanhos || "").split(/[,;]\s*/).filter(Boolean);
  return (
    <div onClick={fechar} style={{ position: "fixed", inset: 0, backgroundColor: "rgba(17,24,39,0.6)", zIndex: 50, display: "flex", alignItems: "center", justifyContent: "center", padding: "16px" }}>
      <div onClick={e => e.stopPropagation()} role="dialog" aria-modal="true"
        style={{ backgroundColor: "white", borderRadius: "14px", maxWidth: "780px", width: "100%", maxHeight: "92vh", overflowY: "auto", padding: "20px", position: "relative" }}>
        <button onClick={fechar} aria-label="Fechar" style={{ position: "absolute", top: "8px", right: "12px", border: "none", background: "none", fontSize: "28px", cursor: "pointer", color: "#6b7280" }}>×</button>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "22px" }}>
          <div>
            <img src={imagem} alt={p.nome} style={{ width: "100%", aspectRatio: "1 / 1", objectFit: "contain" }} />
            {p.variantes.length > 1 && (
              <div style={{ display: "flex", gap: "6px", flexWrap: "wrap", marginTop: "8px" }}>
                {p.variantes.map(v => (
                  <button key={v.ref} onClick={() => { setCor(v.cor || v.ref.split("-").pop() || ""); if (v.imagem) setImagem(v.imagem); }}
                    title={`${v.cor || "Cor " + v.ref.split("-").pop()}${v.stock === 0 ? " (sem stock)" : ""}`}
                    style={{ width: "46px", height: "46px", padding: 0, border: (cor && (cor === v.cor || cor === v.ref.split("-").pop())) ? `2px solid ${AZUL}` : "1px solid #e5e7eb", borderRadius: "8px", overflow: "hidden", opacity: v.stock !== 0 ? 1 : 0.4, background: !v.imagem && v.hex ? v.hex : "white", cursor: "pointer" }}>
                    {v.imagem && <img src={v.imagem} alt={v.cor || v.ref} loading="lazy" style={{ width: "100%", height: "100%", objectFit: "contain" }} />}
                  </button>
                ))}
              </div>
            )}
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            <h2 style={{ fontFamily: font, fontSize: "20px", fontWeight: 800, color: "#1a1a2e", margin: 0, paddingRight: "24px" }}>{p.nome}</h2>
            <span style={{ fontSize: "12px", color: "#9ca3af" }}>Ref. {p.ref}</span>
            <div>
              <span style={{ fontSize: "13px", color: "#6b7280" }}>desde </span>
              <span style={{ fontSize: "24px", fontWeight: 800, color: AZUL, fontFamily: font }}>{euro(p.preco)}</span>
              <span style={{ fontSize: "13px", color: "#6b7280" }}>/un. · sem personalização</span>
            </div>
            {p.descricao && <p style={{ fontSize: "14px", color: "#374151", lineHeight: 1.6, whiteSpace: "pre-line", margin: 0 }}>{p.descricao}</p>}
            <ul style={{ fontSize: "13px", color: "#374151", margin: 0, paddingLeft: "18px", lineHeight: 1.7 }}>
              {p.material && <li>Material: {p.material}</li>}
              {p.gravacao && <li>Área de personalização: {p.gravacao}</li>}
              {p.multiplos > 1 && <li>Vendido em múltiplos de {p.multiplos} unidades</li>}
              <li>{p.stock > 0 ? "Em stock" : p.stock < 0 ? "Por encomenda" : "Sob consulta"}</li>
            </ul>
            {p.variantes.length > 1 && <div style={{ fontSize: "13px", color: "#374151" }}>Cor: <strong>{cor || "escolhe na foto"}</strong></div>}
            {tamanhos.length > 0 && (
              <label style={{ fontSize: "13px", color: "#374151", display: "flex", gap: "8px", alignItems: "center" }}>
                Tamanho:
                <select value={tamanho} onChange={e => setTamanho(e.target.value)} style={{ padding: "6px 8px", borderRadius: "8px", border: "1px solid #d1d5db" }}>
                  <option value="">vários / a definir</option>
                  {tamanhos.map(t => <option key={t} value={t}>{t}</option>)}
                </select>
              </label>
            )}
            <label style={{ fontSize: "13px", color: "#374151", display: "flex", gap: "8px", alignItems: "center" }}>
              Quantidade:
              <input type="number" min={1} value={qtd} onChange={e => setQtd(Math.max(1, parseInt(e.target.value) || 1))}
                style={{ width: "90px", padding: "6px 8px", borderRadius: "8px", border: "1px solid #d1d5db" }} />
            </label>
            <button onClick={() => { adicionar(p, cor, tamanho, qtd); fechar(); }}
              style={{ padding: "13px", borderRadius: "10px", background: AZUL, color: "white", border: "none", fontWeight: 700, fontSize: "15px", fontFamily: font, cursor: "pointer", marginTop: "4px" }}>
              + Juntar ao orçamento
            </button>
            <a href={pedirSo(p, cor)} target="_blank" rel="noopener noreferrer" className="btn-whatsapp"
              style={{ padding: "12px", borderRadius: "10px", fontSize: "14px", textDecoration: "none", textAlign: "center", fontWeight: 700 }}>
              Pedir só este no WhatsApp
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
