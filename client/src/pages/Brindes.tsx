/*
 * Brindes.tsx — catálogo de brindes e artigos promocionais
 * Os produtos vêm automaticamente do fornecedor (função Netlify catalogo-cifra).
 * Stock e preços atualizam sozinhos (cache de 6 horas).
 */

import { useEffect, useMemo, useState } from "react";

const WA = "https://wa.me/351935852703";
const WA_MSG = (msg: string) => `${WA}?text=${encodeURIComponent(msg)}`;
const POR_PAGINA = 48;

type Variante = { ref: string; cor: string; imagem: string; stock: number };
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
};

const euro = (v: number) =>
  v.toLocaleString("pt-PT", { style: "currency", currency: "EUR", minimumFractionDigits: 2, maximumFractionDigits: 2 });

const semAcentos = (s: string) => s.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();

const font = "Montserrat, sans-serif";

export default function Brindes() {
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [estado, setEstado] = useState<"a-carregar" | "ok" | "erro">("a-carregar");
  const [pesquisa, setPesquisa] = useState("");
  const [categoria, setCategoria] = useState<string | null>(null);
  const [soStock, setSoStock] = useState(true);
  const [limite, setLimite] = useState(POR_PAGINA);
  const [aberto, setAberto] = useState<Produto | null>(null);

  useEffect(() => {
    document.title = "Brindes e artigos promocionais personalizados | Ninho do Dragão";
    fetch("/.netlify/functions/catalogo-cifra")
      .then(r => (r.ok ? r.json() : Promise.reject(r.status)))
      .then(d => {
        setProdutos(d.produtos || []);
        setEstado("ok");
      })
      .catch(() => setEstado("erro"));
  }, []);

  const categorias = useMemo(
    () => Array.from(new Set(produtos.map(p => p.categoriaPrincipal))).sort((a, b) => a.localeCompare(b, "pt")),
    [produtos]
  );

  const filtrados = useMemo(() => {
    const q = semAcentos(pesquisa.trim());
    return produtos.filter(p => {
      if (categoria && p.categoriaPrincipal !== categoria) return false;
      if (soStock && p.stock <= 0) return false;
      if (q && !semAcentos(`${p.nome} ${p.ref} ${p.categoria} ${p.material}`).includes(q)) return false;
      return true;
    });
  }, [produtos, pesquisa, categoria, soStock]);

  useEffect(() => setLimite(POR_PAGINA), [pesquisa, categoria, soStock]);

  const pedir = (p: Produto, cor?: string) =>
    WA_MSG(
      `Olá! Gostava de pedir orçamento para este brinde personalizado:\n` +
        `• ${p.nome} (ref. ${p.ref}${cor ? `, cor ${cor}` : ""})\n` +
        `• Quantidade: \n• Personalização (logótipo/texto): `
    );

  const chip = (ativo: boolean): React.CSSProperties => ({
    padding: "8px 16px",
    borderRadius: "999px",
    border: ativo ? "2px solid #2B4EAF" : "2px solid #e5e7eb",
    backgroundColor: ativo ? "#2B4EAF" : "white",
    color: ativo ? "white" : "#374151",
    fontWeight: 600,
    cursor: "pointer",
    fontSize: "13px",
    fontFamily: font,
    whiteSpace: "nowrap",
  });

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#f9fafb" }}>
      {/* Topo */}
      <header style={{ backgroundColor: "white", borderBottom: "1px solid #e5e7eb", position: "sticky", top: 0, zIndex: 20 }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "14px 20px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "12px" }}>
          <a href="/" style={{ textDecoration: "none", fontFamily: "'Dancing Script', cursive", fontSize: "26px", fontWeight: 700, color: "#2B4EAF" }}>
            Ninho do Dragão
          </a>
          <a href="/" style={{ color: "#374151", fontSize: "14px", fontWeight: 600, fontFamily: font, textDecoration: "none" }}>
            ← Voltar ao início
          </a>
        </div>
      </header>

      <main style={{ maxWidth: "1200px", margin: "0 auto", padding: "40px 16px 80px" }}>
        <div style={{ textAlign: "center", marginBottom: "32px" }}>
          <h1 style={{ fontFamily: font, fontSize: "clamp(26px, 5vw, 36px)", fontWeight: 800, color: "#1a1a2e", margin: "0 0 12px" }}>
            Brindes e artigos promocionais
          </h1>
          <p style={{ fontSize: "16px", color: "#6b7280", maxWidth: "620px", margin: "0 auto", lineHeight: 1.6 }}>
            Canetas, sacos, garrafas, cadernos e muito mais — personalizados com o teu logótipo ou mensagem.
            Ideal para empresas, eventos, casamentos, batizados e escolas.
          </p>
        </div>

        {/* Filtros */}
        <div style={{ display: "flex", flexDirection: "column", gap: "14px", marginBottom: "28px" }}>
          <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", alignItems: "center" }}>
            <input
              type="search"
              value={pesquisa}
              onChange={e => setPesquisa(e.target.value)}
              placeholder="Procurar (ex.: caneta, garrafa, saco…)"
              style={{ flex: "1 1 260px", padding: "12px 16px", borderRadius: "10px", border: "2px solid #e5e7eb", fontSize: "15px", outline: "none" }}
            />
            <label style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "14px", color: "#374151", fontFamily: font, fontWeight: 600, cursor: "pointer" }}>
              <input type="checkbox" checked={soStock} onChange={e => setSoStock(e.target.checked)} />
              Só com stock
            </label>
          </div>
          {categorias.length > 0 && (
            <div style={{ display: "flex", gap: "8px", overflowX: "auto", paddingBottom: "4px" }}>
              <button style={chip(categoria === null)} onClick={() => setCategoria(null)}>Todos</button>
              {categorias.map(c => (
                <button key={c} style={chip(categoria === c)} onClick={() => setCategoria(c)}>{c}</button>
              ))}
            </div>
          )}
        </div>

        {estado === "a-carregar" && <p style={{ textAlign: "center", color: "#6b7280", padding: "60px 0" }}>A carregar catálogo…</p>}

        {estado === "erro" && (
          <div style={{ textAlign: "center", padding: "60px 0" }}>
            <p style={{ color: "#374151", marginBottom: "16px" }}>Não foi possível carregar o catálogo neste momento.</p>
            <a href={WA_MSG("Olá! Gostava de pedir orçamento para brindes personalizados.")} target="_blank" rel="noopener noreferrer"
              className="btn-whatsapp" style={{ padding: "12px 22px", borderRadius: "10px", textDecoration: "none", fontWeight: 600 }}>
              Pedir orçamento no WhatsApp
            </a>
          </div>
        )}

        {estado === "ok" && (
          <>
            <p style={{ fontSize: "13px", color: "#6b7280", marginBottom: "16px", fontFamily: font }}>
              {filtrados.length} {filtrados.length === 1 ? "produto" : "produtos"}
            </p>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 160px), 1fr))", gap: "18px" }}>
              {filtrados.slice(0, limite).map(p => (
                <article key={p.ref} style={{ backgroundColor: "white", borderRadius: "12px", border: "1px solid #e5e7eb", overflow: "hidden", display: "flex", flexDirection: "column" }}>
                  <button onClick={() => setAberto(p)} style={{ border: "none", padding: 0, background: "white", cursor: "pointer", aspectRatio: "1 / 1" }} aria-label={`Ver ${p.nome}`}>
                    {p.imagem && <img src={p.imagem} alt={p.nome} loading="lazy" style={{ width: "100%", height: "100%", objectFit: "contain" }} />}
                  </button>
                  <div style={{ padding: "14px", display: "flex", flexDirection: "column", gap: "6px", flex: 1 }}>
                    <span style={{ fontSize: "11px", color: "#9ca3af", fontFamily: font, textTransform: "uppercase", letterSpacing: "0.04em" }}>{p.categoria}</span>
                    <h2 style={{ fontFamily: font, fontSize: "14px", fontWeight: 700, color: "#1a1a2e", margin: 0, lineHeight: 1.35 }}>{p.nome}</h2>
                    <span style={{ fontSize: "12px", color: "#6b7280" }}>
                      Ref. {p.ref}
                      {p.variantes.length > 1 ? ` · ${p.variantes.length} cores` : ""}
                    </span>
                    <div style={{ marginTop: "auto", paddingTop: "8px" }}>
                      <span style={{ fontSize: "12px", color: "#6b7280" }}>desde </span>
                      <span style={{ fontSize: "18px", fontWeight: 800, color: "#2B4EAF", fontFamily: font }}>{euro(p.preco)}</span>
                      <span style={{ fontSize: "12px", color: "#6b7280" }}>/un.</span>
                      <div style={{ fontSize: "11px", color: "#9ca3af" }}>IVA incluído · sem personalização</div>
                    </div>
                    <a href={pedir(p)} target="_blank" rel="noopener noreferrer" className="btn-whatsapp"
                      style={{ marginTop: "8px", padding: "10px", borderRadius: "8px", fontSize: "13px", textDecoration: "none", textAlign: "center", fontWeight: 600 }}>
                      Pedir orçamento
                    </a>
                  </div>
                </article>
              ))}
            </div>

            {filtrados.length > limite && (
              <div style={{ textAlign: "center", marginTop: "32px" }}>
                <button onClick={() => setLimite(l => l + POR_PAGINA)} style={{ ...chip(false), padding: "12px 28px", borderRadius: "10px" }}>
                  Ver mais produtos
                </button>
              </div>
            )}

            {filtrados.length === 0 && (
              <p style={{ textAlign: "center", color: "#6b7280", padding: "40px 0" }}>
                Não encontrámos nada com esses filtros. Fala connosco no WhatsApp — temos muitos mais artigos!
              </p>
            )}
          </>
        )}
      </main>

      {/* Detalhe do produto */}
      {aberto && (
        <div onClick={() => setAberto(null)} style={{ position: "fixed", inset: 0, backgroundColor: "rgba(17,24,39,0.6)", zIndex: 50, display: "flex", alignItems: "center", justifyContent: "center", padding: "16px" }}>
          <div onClick={e => e.stopPropagation()} role="dialog" aria-modal="true"
            style={{ backgroundColor: "white", borderRadius: "14px", maxWidth: "720px", width: "100%", maxHeight: "90vh", overflowY: "auto", padding: "20px", position: "relative" }}>
            <button onClick={() => setAberto(null)} aria-label="Fechar"
              style={{ position: "absolute", top: "10px", right: "12px", border: "none", background: "none", fontSize: "26px", cursor: "pointer", color: "#6b7280" }}>×</button>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "20px" }}>
              <img src={aberto.imagem} alt={aberto.nome} style={{ width: "100%", aspectRatio: "1 / 1", objectFit: "contain" }} />
              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                <h2 style={{ fontFamily: font, fontSize: "20px", fontWeight: 800, color: "#1a1a2e", margin: 0 }}>{aberto.nome}</h2>
                <span style={{ fontSize: "13px", color: "#6b7280" }}>Ref. {aberto.ref} · {aberto.categoria}</span>
                <div>
                  <span style={{ fontSize: "13px", color: "#6b7280" }}>desde </span>
                  <span style={{ fontSize: "22px", fontWeight: 800, color: "#2B4EAF", fontFamily: font }}>{euro(aberto.preco)}</span>
                  <span style={{ fontSize: "13px", color: "#6b7280" }}>/un. · IVA incluído · sem personalização</span>
                </div>
                {aberto.descricao && <p style={{ fontSize: "14px", color: "#374151", lineHeight: 1.6, whiteSpace: "pre-line", margin: 0 }}>{aberto.descricao}</p>}
                <ul style={{ fontSize: "13px", color: "#374151", margin: 0, paddingLeft: "18px", lineHeight: 1.7 }}>
                  {aberto.material && <li>Material: {aberto.material}</li>}
                  {aberto.gravacao && <li>Área de personalização: {aberto.gravacao}</li>}
                  {aberto.multiplos > 1 && <li>Vendido em múltiplos de {aberto.multiplos} unidades</li>}
                  <li>{aberto.stock > 0 ? `Em stock (${aberto.stock.toLocaleString("pt-PT")} un.)` : "Sob consulta"}</li>
                </ul>
                {aberto.variantes.length > 1 && (
                  <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                    {aberto.variantes.map(v => (
                      <a key={v.ref} href={pedir(aberto, v.cor || v.ref)} target="_blank" rel="noopener noreferrer" title={`${v.cor || v.ref}${v.stock > 0 ? "" : " (sem stock)"}`}
                        style={{ width: "52px", height: "52px", border: "1px solid #e5e7eb", borderRadius: "8px", overflow: "hidden", opacity: v.stock > 0 ? 1 : 0.4, display: "block" }}>
                        {v.imagem && <img src={v.imagem} alt={v.cor || v.ref} loading="lazy" style={{ width: "100%", height: "100%", objectFit: "contain" }} />}
                      </a>
                    ))}
                  </div>
                )}
                <a href={pedir(aberto)} target="_blank" rel="noopener noreferrer" className="btn-whatsapp"
                  style={{ padding: "12px", borderRadius: "10px", fontSize: "14px", textDecoration: "none", textAlign: "center", fontWeight: 600 }}>
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
