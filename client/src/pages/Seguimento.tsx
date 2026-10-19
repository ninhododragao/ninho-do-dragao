/*
 * Seguimento.tsx — página para o cliente acompanhar a encomenda (/seguimento?g=ID&e=ETIQUETA)
 * O link é enviado pela Laila no WhatsApp depois de criar a guia na AllExpress.
 */

import { useEffect, useState } from "react";

const font = "Montserrat, sans-serif";
const AZUL = "#2B4EAF";
const WA = "https://wa.me/351935852703";

type Evento = { data: string; evento: string; descricao: string; local: string; estado: string; transportadora: string };

const quando = (d: string) => {
  const x = new Date(d);
  return isNaN(x.getTime()) ? d : x.toLocaleString("pt-PT", { day: "2-digit", month: "2-digit", year: "numeric", hour: "2-digit", minute: "2-digit" });
};

export default function Seguimento() {
  const params = new URLSearchParams(window.location.search);
  const [g, setG] = useState(params.get("g") || "");
  const [e, setE] = useState(params.get("e") || "");
  const [estado, setEstado] = useState<"" | "a-carregar" | "ok" | "erro">("");
  const [msg, setMsg] = useState("");
  const [eventos, setEventos] = useState<Evento[]>([]);

  const consultar = (gg = g, ee = e) => {
    if (!gg || !ee) return;
    setEstado("a-carregar");
    fetch(`/.netlify/functions/seguimento?g=${encodeURIComponent(gg)}&e=${encodeURIComponent(ee)}`)
      .then(r => r.json().then(d => ({ ok: r.ok, d })))
      .then(({ ok, d }) => {
        if (!ok) { setEstado("erro"); setMsg(d.erro || "Não foi possível consultar a encomenda."); return; }
        setEventos(d.eventos || []); setEstado("ok");
      })
      .catch(() => { setEstado("erro"); setMsg("Não foi possível consultar a encomenda agora."); });
  };

  useEffect(() => {
    document.title = "Seguimento da encomenda | Ninho do Dragão";
    if (g && e) consultar();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div style={{ minHeight: "100vh", background: "#f6f7fb" }}>
      <header style={{ background: "white", borderBottom: "1px solid #e5e7eb" }}>
        <div style={{ maxWidth: "720px", margin: "0 auto", padding: "14px 16px" }}>
          <a href="/" style={{ textDecoration: "none", fontFamily: "'Dancing Script', cursive", fontSize: "26px", fontWeight: 700, color: AZUL }}>Ninho do Dragão</a>
        </div>
      </header>
      <main style={{ maxWidth: "720px", margin: "0 auto", padding: "28px 16px 80px" }}>
        <h1 style={{ fontFamily: font, fontSize: "26px", fontWeight: 800, color: "#1a1a2e", margin: "0 0 6px" }}>🚚 Onde está a minha encomenda?</h1>
        <p style={{ color: "#6b7280", fontSize: "14px", margin: "0 0 20px" }}>Usa o link que te enviámos pelo WhatsApp, ou escreve os dois números abaixo.</p>

        <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginBottom: "22px" }}>
          <input value={g} onChange={x => setG(x.target.value)} placeholder="Nº da guia" inputMode="numeric"
            style={{ flex: "1 1 140px", padding: "10px 12px", border: "2px solid #e5e7eb", borderRadius: "10px", fontSize: "15px" }} />
          <input value={e} onChange={x => setE(x.target.value)} placeholder="Nº de seguimento"
            style={{ flex: "2 1 200px", padding: "10px 12px", border: "2px solid #e5e7eb", borderRadius: "10px", fontSize: "15px" }} />
          <button onClick={() => consultar()} style={{ padding: "10px 18px", borderRadius: "10px", border: "none", background: AZUL, color: "white", fontWeight: 700, fontFamily: font, cursor: "pointer" }}>Ver</button>
        </div>

        {estado === "a-carregar" && <p style={{ color: "#6b7280" }}>A consultar…</p>}
        {estado === "erro" && (
          <p style={{ color: "#b91c1c" }}>{msg} Se precisares, fala connosco no <a href={WA} target="_blank" rel="noopener noreferrer">WhatsApp</a>.</p>
        )}
        {estado === "ok" && eventos.length === 0 && <p style={{ color: "#374151" }}>A encomenda já foi registada e ainda não tem movimentos. Volta a ver mais tarde.</p>}
        {estado === "ok" && eventos.length > 0 && (
          <ol style={{ listStyle: "none", padding: 0, margin: 0, borderLeft: `3px solid ${AZUL}` }}>
            {eventos.map((ev, k) => (
              <li key={k} style={{ position: "relative", padding: "0 0 18px 18px" }}>
                <span style={{ position: "absolute", left: "-8px", top: "3px", width: "13px", height: "13px", borderRadius: "50%", background: k === 0 ? AZUL : "white", border: `3px solid ${AZUL}` }} />
                <div style={{ fontFamily: font, fontWeight: 700, color: "#1a1a2e", fontSize: "15px" }}>{ev.evento}</div>
                {ev.descricao && <div style={{ fontSize: "14px", color: "#374151" }}>{ev.descricao}</div>}
                <div style={{ fontSize: "12px", color: "#6b7280" }}>{quando(ev.data)}{ev.local ? ` · ${ev.local}` : ""}{ev.transportadora ? ` · ${ev.transportadora}` : ""}</div>
              </li>
            ))}
          </ol>
        )}
      </main>
    </div>
  );
}
