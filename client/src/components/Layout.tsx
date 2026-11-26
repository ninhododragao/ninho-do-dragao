/*
 * Layout comum: barra de cima, rodapé e botão de WhatsApp.
 */
import { useState } from "react";
import { AREAS } from "@/data/loja";

export const WA_NUM = "351935852703";
export const WA = `https://wa.me/${WA_NUM}`;
export const WA_MSG = (msg: string) => `${WA}?text=${encodeURIComponent(msg)}`;
export const AZUL = "#2B4EAF";
export const DOURADO = "#C9A227";
export const FONTE = "Montserrat, sans-serif";
const IG = "https://www.instagram.com/ninhododragao.pt";
const FB = "https://www.facebook.com/ninhododragao.pt";

function Navbar() {
  const [aberto, setAberto] = useState(false);
  return (
    <nav style={{ position: "sticky", top: 0, zIndex: 50, background: "rgba(255,255,255,0.97)", borderBottom: "1px solid #e5e7eb", backdropFilter: "blur(10px)" }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "10px 16px", display: "flex", alignItems: "center", gap: "12px" }}>
        <a href="/" style={{ display: "flex", alignItems: "center", gap: "8px", textDecoration: "none" }}>
          <img src="/logo-ninho.jpg" alt="" width={36} height={36} style={{ borderRadius: "50%", objectFit: "cover" }} />
          <span style={{ fontFamily: "'Dancing Script', cursive", fontSize: "26px", fontWeight: 700, color: AZUL, whiteSpace: "nowrap" }}>Ninho do Dragão</span>
        </a>
        <div className="nav-desktop" style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: "20px" }}>
          {AREAS.map(a => (
            <a key={a.id} href={`/loja/${a.id}`} style={{ textDecoration: "none", color: "#374151", fontSize: "13px", fontWeight: 600, fontFamily: FONTE }}>{a.nome}</a>
          ))}
          <a href="/pedido" className="btn-primary" style={{ padding: "9px 16px", borderRadius: "8px", fontSize: "13px", textDecoration: "none" }}>Fazer pedido</a>
        </div>
        <button className="nav-mobile-btn" onClick={() => setAberto(!aberto)} aria-label="Abrir menu"
          style={{ marginLeft: "auto", display: "none", background: "none", border: "none", padding: "8px", minWidth: "44px", minHeight: "44px", cursor: "pointer" }}>
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke={AZUL} strokeWidth="2.5" strokeLinecap="round">
            {aberto ? <><line x1="6" y1="6" x2="18" y2="18" /><line x1="6" y1="18" x2="18" y2="6" /></> : <><line x1="3" y1="7" x2="21" y2="7" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="17" x2="21" y2="17" /></>}
          </svg>
        </button>
      </div>
      <form action="/catalogo" method="get" style={{ maxWidth: "1100px", margin: "0 auto", padding: "0 16px 10px", display: "flex", gap: "8px" }}>
        <input name="q" type="search" placeholder="Procurar: caneca, meia de Natal, t-shirt, caneta…" aria-label="Procurar artigos"
          style={{ flex: 1, minWidth: 0, padding: "11px 14px", borderRadius: "10px", border: "2px solid #e5e7eb", fontSize: "16px", fontFamily: "inherit" }} />
        <button type="submit" className="btn-primary" style={{ padding: "0 16px", borderRadius: "10px", border: "none", fontSize: "14px", cursor: "pointer" }}>Procurar</button>
      </form>
      {aberto && (
        <div style={{ background: "white", borderTop: "1px solid #e5e7eb", padding: "8px 16px 16px", display: "flex", flexDirection: "column" }}>
          {AREAS.map(a => (
            <a key={a.id} href={`/loja/${a.id}`} style={{ textDecoration: "none", color: "#1a1a2e", fontSize: "16px", fontWeight: 600, fontFamily: FONTE, padding: "12px 0", borderBottom: "1px solid #f3f4f6" }}>{a.icone} {a.nome}</a>
          ))}
          <a href="/catalogo" style={{ textDecoration: "none", color: "#1a1a2e", fontSize: "16px", fontWeight: 600, fontFamily: FONTE, padding: "12px 0" }}>🔎 Mais artigos</a>
          <a href="/pedido" className="btn-primary" style={{ marginTop: "8px", padding: "14px", borderRadius: "10px", fontSize: "15px", textDecoration: "none", textAlign: "center" }}>Fazer pedido</a>
        </div>
      )}
    </nav>
  );
}

function Rodape() {
  const link = { color: "#9ca3af", textDecoration: "none", fontSize: "13px" } as const;
  return (
    <footer style={{ background: "#111827", color: "#9ca3af", padding: "40px 20px 28px", marginTop: "48px" }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        <div className="footer-grid" style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr 1fr", gap: "28px", marginBottom: "28px" }}>
          <div>
            <div style={{ fontFamily: "'Dancing Script', cursive", fontSize: "24px", fontWeight: 700, color: "white", marginBottom: "6px" }}>Ninho do Dragão</div>
            <p style={{ fontSize: "13px", lineHeight: 1.6, margin: 0 }}>Personalizados feitos em Beja, com envio para todo o país.</p>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
            <strong style={{ color: "white", fontSize: "13px", fontFamily: FONTE }}>Loja</strong>
            {AREAS.map(a => <a key={a.id} href={`/loja/${a.id}`} style={link}>{a.nome}</a>)}
            <a href="/catalogo" style={link}>Mais artigos</a>
            <a href="/seguimento" style={link}>Seguir encomenda</a>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
            <strong style={{ color: "white", fontSize: "13px", fontFamily: FONTE }}>Contacto</strong>
            <a href={WA} target="_blank" rel="noopener noreferrer" style={{ ...link, color: "#25D366", fontWeight: 600 }}>WhatsApp +351 935 852 703</a>
            <a href="mailto:geral.ninhododragao@outlook.com" style={link}>geral.ninhododragao@outlook.com</a>
            <a href={IG} target="_blank" rel="noopener noreferrer" style={link}>Instagram @ninhododragao.pt</a>
            <a href={FB} target="_blank" rel="noopener noreferrer" style={link}>Facebook</a>
          </div>
        </div>
        <div style={{ borderTop: "1px solid #1f2937", paddingTop: "18px", fontSize: "11px", lineHeight: 1.7, textAlign: "center" }}>
          Ninho do Dragão – by Makiwa · Laila Fernandes Chreim · NIF 254047750 · Rua das Parreiras 4, 7800-655 Vila Azedo, Beja · Telefone 925 865 347 · IVA — regime de isenção (art. 53.º CIVA)
          <div style={{ marginTop: "8px", display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "6px 14px" }}>
            <a href="/termos" style={link}>Termos</a><a href="/privacidade" style={link}>Privacidade</a><a href="/devolucoes" style={link}>Devoluções</a>
            <a href="/garantia" style={link}>Garantia</a><a href="/livro-reclamacoes" style={link}>Reclamações</a><a href="/ral" style={link}>RAL</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

function BotaoWhatsApp() {
  return (
    <a href={WA_MSG("Olá! Gostava de saber mais sobre os vossos produtos.")} target="_blank" rel="noopener noreferrer" aria-label="Falar no WhatsApp"
      style={{ position: "fixed", bottom: "20px", right: "20px", zIndex: 40, width: "56px", height: "56px", borderRadius: "50%", background: "#25D366", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 4px 16px rgba(37,211,102,0.4)" }}>
      <svg width="28" height="28" viewBox="0 0 24 24" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" /><path d="M12 0C5.373 0 0 5.373 0 12c0 2.625.846 5.059 2.284 7.034L.789 23.492a.5.5 0 00.611.611l4.458-1.495A11.952 11.952 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-2.387 0-4.592-.826-6.326-2.207l-.442-.362-3.248 1.089 1.089-3.248-.362-.442A9.96 9.96 0 012 12C2 6.486 6.486 2 12 2s10 4.486 10 10-4.486 10-10 10z" /></svg>
    </a>
  );
}

/** Imagem própria do produto; se ainda não existir, mostra o ícone. */
export function Imagem({ src, icone, alt, fundo = "#f6f7fb", proporcao = "1 / 1" }: { src?: string; icone: string; alt: string; fundo?: string; proporcao?: string }) {
  const [falhou, setFalhou] = useState(false);
  return (
    <div style={{ width: "100%", aspectRatio: proporcao, background: fundo, display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
      {src && !falhou
        ? <img src={src} alt={alt} loading="lazy" onError={() => setFalhou(true)} style={{ width: "100%", height: "100%", objectFit: src.startsWith("http") ? "contain" : "cover", background: src.startsWith("http") ? "white" : undefined }} />
        : <span style={{ fontSize: "56px" }} aria-hidden>{icone}</span>}
    </div>
  );
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <main style={{ minHeight: "60vh" }}>{children}</main>
      <Rodape />
      <BotaoWhatsApp />
    </>
  );
}
