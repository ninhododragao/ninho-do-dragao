/*
 * Catalogo.tsx — catálogo do Ninho do Dragão (/catalogo; /brindes continua a funcionar)
 *
 * Percurso do cliente: 1) escolhe uma categoria  2) vê os produtos  3) abre um produto e pede orçamento.
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

const textoDe = (p: Produto) => " " + semAcentos(`${p.nome} ${p.categoria}`).replace(/[^a-z0-9-]+/g, " ") + " ";
const temPalavra = (t: string, ws: string[]) => ws.some(w => t.includes(" " + semAcentos(w)));
// 2 = artigo de Natal, 1 = boa ideia de presente, 0 = não entra
const pontosNatal = (p: Produto) => (temPalavra(textoDe(p), NATAL_TEMA) ? 2 : temPalavra(textoDe(p), NATAL_PRESENTES) ? 1 : 0);

const euro = (v: number) =>
  v.toLocaleString("pt-PT", { style: "currency", currency: "EUR", minimumFractionDigits: 2, maximumFractionDigits: 2 });

const lerCategoriaDoEndereco = () => new URLSearchParams(window.location.search).get("categoria");

export default function Catalogo() {
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [estado, setEstado] = useState<"a-carregar" | "ok" | "erro">("a-carregar");
  const [grupo, setGrupo] = useState<string | null>(lerCategoriaDoEndereco);
  const [pesquisa, setPesquisa] = useState("");
  const [soStock, setSoStock] = useState(false);
  const [limite, setLimite] = useState(POR_PAGINA);
  const [aberto, setAberto] = useState<Produto | null>(null);

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
    // botão "voltar" do browser/telemóvel
    const voltar = () => { setGrupo(lerCategoriaDoEndereco()); setAberto(null); };
    const tecla = (e: KeyboardEvent) => { if (e.key === "Escape") setAberto(null); };
    window.addEventListener("popstate", voltar);
    window.addEventListener("keydown", tecla);
    return () => { window.removeEventListener("popstate", voltar); window.removeEventListener("keydown", tecla); };
  }, []);

  const irPara = (g: string | null) => {
    const url = g ? `${window.location.pathname}?categoria=${g}` : window.location.pathname;
    window.history.pushState({}, "", url);
    setGrupo(g);
    setPesquisa("");
    setLimite(POR_PAGINA);
    window.scrollTo({ top: 0 });
  };

  // Categorias com nº de produtos e uma foto de capa (um produto com stock, se houver)
  const resumo = useMemo(() => {
    return GRUPOS.map(g => {
      const lista = produtos.filter(p => p.grupo === g.id);
      const capa = lista.find(p => p.stock > 0) || lista[0];
      return { ...g, total: lista.length, capa: capa?.imagem || "" };
    }).filter(g => g.total > 0);
  }, [produtos]);

  const natal = useMemo(
    () =>
      !NATAL_ATIVO
        ? []
        : produtos
            .map(p => ({ p, n: pontosNatal(p) }))
            .filter(x => x.n > 0)
            .sort((a, b) => b.n - a.n || Number(b.p.stock !== 0) - Number(a.p.stock !== 0))
            .map(x => x.p),
    [produtos]
  );
  const natalRefs = useMemo(() => new Set(natal.map(p => p.ref)), [natal]);

  const q = semAcentos(pesquisa.trim());
  const filtrados = useMemo(
    () =>
      produtos.filter(p => {
        if (grupo === "natal") { if (!natalRefs.has(p.ref)) return false; }
        else if (grupo && p.grupo !== grupo) return false;
        if (!grupo && !q) return false; // na página inicial do catálogo só mostramos produtos se houver pesquisa
        if (soStock && p.stock === 0) return false;
        if (q && !semAcentos(`${p.nome} ${p.ref} ${p.categoria} ${p.material}`).includes(q)) return false;
        return true;
      }),
    [produtos, grupo, q, soStock, natalRefs]
  );
  // na categoria Natal mantém a ordem do destaque (artigos de Natal primeiro)
  const ordenados = useMemo(
    () => (grupo === "natal" ? [...filtrados].sort((a, b) => natal.indexOf(a) - natal.indexOf(b)) : filtrados),
    [filtrados, grupo, natal]
  );

  const GRUPO_NATAL = { id: "natal", nome: "Ideias para o Natal", icone: "🎄", palavras: [] as string[] };
  const grupoAtual = grupo === "natal" ? GRUPO_NATAL : GRUPOS.find(g => g.id === grupo);

  const pedir = (p: Produto, cor?: string) =>
    WA_MSG(
      `Olá! Gostava de pedir orçamento para:\n` +
        `• ${p.nome} (ref. ${p.ref}${cor ? `, cor ${cor}` : ""})\n` +
        (p.tamanhos ? `• Tamanho(s): \n` : "") +
        `• Quantidade: \n• Personalização (logótipo/texto/foto): `
    );

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#f9fafb" }}>
      <header style={{ backgroundColor: "white", borderBottom: "1px solid #e5e7eb", position: "sticky", top: 0, zIndex: 20 }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "14px 20px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "12px" }}>
          <a href="/" style={{ textDecoration: "none", fontFamily: "'Dancing Script', cursive", fontSize: "26px", fontWeight: 700, color: AZUL }}>
            Ninho do Dragão
          </a>
          <a href={WA_MSG("Olá! Tenho uma dúvida sobre um produto do catálogo.")} target="_blank" rel="noopener noreferrer" className="btn-whatsapp"
            style={{ padding: "8px 14px", borderRadius: "8px", fontSize: "13px", textDecoration: "none", fontWeight: 600 }}>
            WhatsApp
          </a>
        </div>
      </header>

      <main style={{ maxWidth: "1200px", margin: "0 auto", padding: "28px 16px 80px" }}>
        {/* Caminho: Início › Catálogo › Categoria */}
        <nav style={{ fontSize: "13px", color: "#6b7280", fontFamily: font, marginBottom: "18px" }}>
          <a href="/" style={{ color: "#6b7280", textDecoration: "none" }}>Início</a>
          {" › "}
          {grupo ? (
            <button onClick={() => irPara(null)} style={{ background: "none", border: "none", padding: 0, color: AZUL, cursor: "pointer", font: "inherit", fontWeight: 600 }}>Catálogo</button>
          ) : (
            <span style={{ color: "#1a1a2e", fontWeight: 600 }}>Catálogo</span>
          )}
          {grupoAtual && <> {" › "}<span style={{ color: "#1a1a2e", fontWeight: 600 }}>{grupoAtual.nome}</span></>}
        </nav>

        <div style={{ textAlign: "center", marginBottom: "24px" }}>
          <h1 style={{ fontFamily: font, fontSize: "clamp(24px, 5vw, 34px)", fontWeight: 800, color: "#1a1a2e", margin: "0 0 10px" }}>
            {grupoAtual ? `${grupoAtual.icone} ${grupoAtual.nome}` : "O nosso catálogo"}
          </h1>
          <p style={{ fontSize: "15px", color: "#6b7280", maxWidth: "620px", margin: "0 auto", lineHeight: 1.6 }}>
            {grupoAtual
              ? "Escolhe o artigo e pede orçamento — personalizamos com o teu nome, logótipo, frase ou foto."
              : "Escolhe uma categoria. Todos os artigos são personalizados à tua medida — para ti, para oferecer, para a tua empresa ou evento."}
          </p>
        </div>

        <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", alignItems: "center", marginBottom: "24px" }}>
          <input
            type="search"
            value={pesquisa}
            onChange={e => { setPesquisa(e.target.value); setLimite(POR_PAGINA); }}
            placeholder={grupoAtual ? `Procurar em ${grupoAtual.nome.toLowerCase()}…` : "Procurar em todo o catálogo (ex.: caneca, polo, mochila…)"}
            style={{ flex: "1 1 260px", padding: "12px 16px", borderRadius: "10px", border: "2px solid #e5e7eb", fontSize: "15px", outline: "none" }}
          />
          {(grupo || q) && (
            <label style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "14px", color: "#374151", fontFamily: font, fontWeight: 600, cursor: "pointer" }}>
              <input type="checkbox" checked={soStock} onChange={e => setSoStock(e.target.checked)} />
              Só com stock imediato
            </label>
          )}
        </div>

        {estado === "a-carregar" && <p style={{ textAlign: "center", color: "#6b7280", padding: "60px 0" }}>A carregar catálogo…</p>}

        {estado === "erro" && (
          <div style={{ textAlign: "center", padding: "60px 0" }}>
            <p style={{ color: "#374151", marginBottom: "16px" }}>Não foi possível carregar o catálogo neste momento.</p>
            <a href={WA_MSG("Olá! Gostava de pedir orçamento para um artigo personalizado.")} target="_blank" rel="noopener noreferrer"
              className="btn-whatsapp" style={{ padding: "12px 22px", borderRadius: "10px", textDecoration: "none", fontWeight: 600 }}>
              Pedir orçamento no WhatsApp
            </a>
          </div>
        )}

        {/* 🎄 Destaque de Natal (só na página das categorias) */}
        {estado === "ok" && !grupo && !q && natal.length > 0 && (
          <section style={{ background: "linear-gradient(135deg, #14532d, #166534 55%, #991b1b)", borderRadius: "16px", padding: "20px 16px", marginBottom: "28px", color: "white" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", gap: "12px", flexWrap: "wrap", marginBottom: "14px" }}>
              <div>
                <h2 style={{ fontFamily: font, fontSize: "22px", fontWeight: 800, margin: 0 }}>🎄 Ideias para o Natal</h2>
                <p style={{ margin: "4px 0 0", fontSize: "14px", opacity: 0.9 }}>Presentes personalizados com nome, foto ou logótipo · {NATAL_PRAZO}</p>
              </div>
              <button onClick={() => irPara("natal")}
                style={{ background: "white", color: "#14532d", border: "none", borderRadius: "999px", padding: "10px 18px", fontWeight: 700, fontFamily: font, cursor: "pointer", whiteSpace: "nowrap" }}>
                Ver todas as ideias ({natal.length}) →
              </button>
            </div>
            <div style={{ display: "flex", gap: "12px", overflowX: "auto", paddingBottom: "6px", scrollSnapType: "x mandatory" }}>
              {natal.slice(0, 12).map(p => (
                <button key={p.ref} onClick={() => setAberto(p)}
                  style={{ flex: "0 0 150px", scrollSnapAlign: "start", background: "white", border: "none", borderRadius: "12px", padding: 0, overflow: "hidden", cursor: "pointer", textAlign: "left" }}>
                  <div style={{ aspectRatio: "1 / 1" }}><img src={p.imagem} alt={p.nome} loading="lazy" style={{ width: "100%", height: "100%", objectFit: "contain" }} /></div>
                  <div style={{ padding: "8px 10px" }}>
                    <div style={{ fontSize: "13px", fontWeight: 700, color: "#1a1a2e", fontFamily: font, lineHeight: 1.3, height: "34px", overflow: "hidden" }}>{p.nome}</div>
                    <div style={{ fontSize: "12px", color: "#6b7280", marginTop: "4px" }}>desde <strong style={{ color: "#991b1b" }}>{euro(p.preco)}</strong></div>
                  </div>
                </button>
              ))}
            </div>
          </section>
        )}

        {/* 1) Categorias */}
        {estado === "ok" && !grupo && !q && (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 170px), 1fr))", gap: "16px" }}>
            {resumo.map(g => (
              <button key={g.id} onClick={() => irPara(g.id)}
                style={{ border: "1px solid #e5e7eb", borderRadius: "14px", background: "white", padding: 0, cursor: "pointer", overflow: "hidden", textAlign: "left", display: "flex", flexDirection: "column" }}>
                <div style={{ aspectRatio: "4 / 3", width: "100%", background: "#f3f4f6", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  {g.capa ? <img src={g.capa} alt="" loading="lazy" style={{ width: "100%", height: "100%", objectFit: "contain" }} /> : <span style={{ fontSize: "40px" }}>{g.icone}</span>}
                </div>
                <div style={{ padding: "12px 14px" }}>
                  <div style={{ fontFamily: font, fontWeight: 700, fontSize: "15px", color: "#1a1a2e", lineHeight: 1.3 }}>{g.icone} {g.nome}</div>
                  <div style={{ fontSize: "12px", color: "#6b7280", marginTop: "4px" }}>{g.total} {g.total === 1 ? "artigo" : "artigos"} →</div>
                </div>
              </button>
            ))}
          </div>
        )}

        {/* 2) Produtos */}
        {estado === "ok" && (grupo || q) && (
          <>
            <p style={{ fontSize: "13px", color: "#6b7280", marginBottom: "16px", fontFamily: font }}>
              {filtrados.length} {filtrados.length === 1 ? "artigo" : "artigos"}
              {grupo && <> · <button onClick={() => irPara(null)} style={{ background: "none", border: "none", padding: 0, color: AZUL, cursor: "pointer", font: "inherit", fontWeight: 600 }}>← todas as categorias</button></>}
            </p>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 160px), 1fr))", gap: "16px" }}>
              {ordenados.slice(0, limite).map(p => (
                <button key={p.ref} onClick={() => setAberto(p)}
                  style={{ backgroundColor: "white", borderRadius: "12px", border: "1px solid #e5e7eb", overflow: "hidden", display: "flex", flexDirection: "column", padding: 0, cursor: "pointer", textAlign: "left" }}>
                  <div style={{ aspectRatio: "1 / 1", width: "100%", background: "white" }}>
                    <img src={p.imagem} alt={p.nome} loading="lazy" style={{ width: "100%", height: "100%", objectFit: "contain" }} />
                  </div>
                  <div style={{ padding: "12px 14px", display: "flex", flexDirection: "column", gap: "4px", flex: 1, width: "100%" }}>
                    <span style={{ fontFamily: font, fontSize: "14px", fontWeight: 700, color: "#1a1a2e", lineHeight: 1.35 }}>{p.nome}</span>
                    {p.variantes.length > 1 && <span style={{ fontSize: "12px", color: "#6b7280" }}>{p.variantes.length} cores</span>}
                    <span style={{ marginTop: "auto", paddingTop: "6px", fontSize: "12px", color: "#6b7280" }}>
                      desde <strong style={{ fontSize: "17px", color: AZUL, fontFamily: font }}>{euro(p.preco)}</strong>/un.
                    </span>
                  </div>
                </button>
              ))}
            </div>

            {filtrados.length > limite && (
              <div style={{ textAlign: "center", marginTop: "28px" }}>
                <button onClick={() => setLimite(l => l + POR_PAGINA)}
                  style={{ padding: "12px 28px", borderRadius: "10px", border: "2px solid #e5e7eb", background: "white", fontWeight: 600, fontFamily: font, cursor: "pointer" }}>
                  Ver mais artigos
                </button>
              </div>
            )}

            {filtrados.length === 0 && (
              <p style={{ textAlign: "center", color: "#6b7280", padding: "40px 0" }}>
                Não encontrámos esse artigo. Fala connosco no WhatsApp — temos muitos mais!
              </p>
            )}
          </>
        )}

        <p style={{ textAlign: "center", fontSize: "12px", color: "#9ca3af", marginTop: "40px", lineHeight: 1.6 }}>
          Preços por unidade, sem personalização. O valor final depende da quantidade e da personalização — enviamos o orçamento pelo WhatsApp.
        </p>
      </main>

      {/* 3) Detalhe do produto + pedido de orçamento */}
      {aberto && (
        <div onClick={() => setAberto(null)} style={{ position: "fixed", inset: 0, backgroundColor: "rgba(17,24,39,0.6)", zIndex: 50, display: "flex", alignItems: "center", justifyContent: "center", padding: "16px" }}>
          <div onClick={e => e.stopPropagation()} role="dialog" aria-modal="true"
            style={{ backgroundColor: "white", borderRadius: "14px", maxWidth: "720px", width: "100%", maxHeight: "90vh", overflowY: "auto", padding: "20px", position: "relative" }}>
            <button onClick={() => setAberto(null)} aria-label="Fechar"
              style={{ position: "absolute", top: "8px", right: "12px", border: "none", background: "none", fontSize: "28px", cursor: "pointer", color: "#6b7280" }}>×</button>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "20px" }}>
              <img src={aberto.imagem} alt={aberto.nome} style={{ width: "100%", aspectRatio: "1 / 1", objectFit: "contain" }} />
              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                <h2 style={{ fontFamily: font, fontSize: "20px", fontWeight: 800, color: "#1a1a2e", margin: 0, paddingRight: "24px" }}>{aberto.nome}</h2>
                <span style={{ fontSize: "12px", color: "#9ca3af" }}>Ref. {aberto.ref}</span>
                <div>
                  <span style={{ fontSize: "13px", color: "#6b7280" }}>desde </span>
                  <span style={{ fontSize: "22px", fontWeight: 800, color: AZUL, fontFamily: font }}>{euro(aberto.preco)}</span>
                  <span style={{ fontSize: "13px", color: "#6b7280" }}>/un. · sem personalização</span>
                </div>
                {aberto.descricao && <p style={{ fontSize: "14px", color: "#374151", lineHeight: 1.6, whiteSpace: "pre-line", margin: 0 }}>{aberto.descricao}</p>}
                <ul style={{ fontSize: "13px", color: "#374151", margin: 0, paddingLeft: "18px", lineHeight: 1.7 }}>
                  {aberto.tamanhos && <li>Tamanhos: {aberto.tamanhos}</li>}
                  {aberto.material && <li>Material: {aberto.material}</li>}
                  {aberto.gravacao && <li>Área de personalização: {aberto.gravacao}</li>}
                  {aberto.multiplos > 1 && <li>Vendido em múltiplos de {aberto.multiplos} unidades</li>}
                  <li>{aberto.stock > 0 ? "Em stock" : aberto.stock < 0 ? "Por encomenda" : "Sob consulta"}</li>
                </ul>
                {aberto.variantes.length > 1 && (
                  <div>
                    <div style={{ fontSize: "13px", color: "#374151", fontWeight: 600, marginBottom: "6px" }}>Cores disponíveis (toca para pedir nessa cor):</div>
                    <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                      {aberto.variantes.map(v => (
                        <a key={v.ref} href={pedir(aberto, v.cor || v.ref)} target="_blank" rel="noopener noreferrer" title={`${v.cor || "Cor " + v.ref.split("-").pop()}${v.stock === 0 ? " (sem stock)" : ""}`}
                          style={{ width: "52px", height: "52px", border: "1px solid #e5e7eb", borderRadius: "8px", overflow: "hidden", opacity: v.stock !== 0 ? 1 : 0.4, display: "block", backgroundColor: !v.imagem && v.hex ? v.hex : undefined }}>
                          {v.imagem && <img src={v.imagem} alt={v.cor || v.ref} loading="lazy" style={{ width: "100%", height: "100%", objectFit: "contain" }} />}
                        </a>
                      ))}
                    </div>
                  </div>
                )}
                <a href={pedir(aberto)} target="_blank" rel="noopener noreferrer" className="btn-whatsapp"
                  style={{ padding: "14px", borderRadius: "10px", fontSize: "15px", textDecoration: "none", textAlign: "center", fontWeight: 700, marginTop: "4px" }}>
                  Pedir orçamento no WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
