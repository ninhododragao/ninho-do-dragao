/*
 * Natal.tsx — Coleção Natal 2026
 * Página sazonal em /natal. Sem preços: encomendas e orçamentos pelo WhatsApp.
 * Produtos e prazos em src/data/natal.ts
 */

import { useEffect, useState } from "react";
import { siteConfig } from "@/lib/site";
import { NATAL_GRUPOS, NATAL_PRODUTOS, NATAL_PRAZO, type NatalGrupo, type NatalProduto } from "@/data/natal";

const waLink = (msg: string) =>
  `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(msg)}`;

const WaIcon = () => (
  <svg className="nt-wa-ico" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2Zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1l-.8 1c-.1.2-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.3-.4.2-.4.7-1.3.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.8 11.8 11.8 0 0 0 4.6 4c1.7.7 2.3.8 3.2.6.5-.1 1.5-.6 1.7-1.2.2-.6.2-1.1.2-1.2-.1-.1-.3-.2-.5-.3Z" />
  </svg>
);

function Card({ p }: { p: NatalProduto }) {
  const msg = `Olá! Quero encomendar: ${p.nome} (${p.ref}). Vou enviar a foto/texto para personalizar.`;
  return (
    <article className="nt-card">
      <div className="nt-ph">
        {p.novo && <span className="nt-tag">Novidade</span>}
        <img src={p.img} alt={`${p.nome} personalizado`} loading="lazy" referrerPolicy="no-referrer" />
      </div>
      <div className="nt-body">
        <h3>{p.nome}</h3>
        <p>{p.desc}</p>
        <ul className="nt-opts">
          {p.opcoes.map((o) => (
            <li key={o}>{o}</li>
          ))}
        </ul>
        <a className="nt-btn nt-btn-wa" href={waLink(msg)} target="_blank" rel="noopener noreferrer">
          <WaIcon /> Quero este
        </a>
      </div>
    </article>
  );
}

export default function Natal() {
  const [filtro, setFiltro] = useState<NatalGrupo | "todos">("todos");
  const img = (ref: string) => NATAL_PRODUTOS.find((p) => p.ref === ref)?.img ?? "";

  useEffect(() => {
    document.title = "Natal Personalizado | Ninho do Dragão";
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="nt">
      <style>{CSS}</style>

      <div className="nt-top">
        <div className="nt-wrap">
          <a href="/" className="nt-brand">Ninho do Dragão</a>
          <a href="/" className="nt-back">← Voltar ao site</a>
        </div>
      </div>

      <header className="nt-hero">
        <div className="nt-wrap">
          <div>
            <span className="nt-eyebrow">✦ Coleção Natal 2026</span>
            <h1>
              Um Natal com <em>a vossa</em> história
            </h1>
            <p>
              Enfeites, molduras, calendários do Advento e meias com as vossas fotos, nomes e datas. Envia-nos a
              imagem pelo WhatsApp e nós tratamos do resto.
            </p>
            <div className="nt-hero-cta">
              <a className="nt-btn nt-btn-wa" href={waLink("Olá! Quero saber mais sobre a coleção de Natal 🎄")} target="_blank" rel="noopener noreferrer">
                <WaIcon /> Encomendar pelo WhatsApp
              </a>
              <a className="nt-btn nt-btn-ghost" href="#nt-produtos">
                Ver a coleção
              </a>
            </div>
          </div>
          <div className="nt-hero-art" aria-hidden="true">
            <div className="nt-bauble b1"><img src={img("ND-NAT-07")} alt="" referrerPolicy="no-referrer" /></div>
            <div className="nt-bauble b2"><img src={img("ND-NAT-09")} alt="" referrerPolicy="no-referrer" /></div>
            <div className="nt-bauble b3"><img src={img("ND-NAT-06")} alt="" referrerPolicy="no-referrer" /></div>
          </div>
        </div>
      </header>

      <div className="nt-wrap">
        <div className="nt-steps">
          <div className="nt-step"><b>1</b><h3>Escolhe a peça</h3><p>Vê a coleção e carrega em «Quero este» na peça de que gostares.</p></div>
          <div className="nt-step"><b>2</b><h3>Envia a foto ou o texto</h3><p>Pelo WhatsApp mandas a imagem, os nomes ou a data. Antes de produzir, enviamos-te uma prova.</p></div>
          <div className="nt-step"><b>3</b><h3>Recebe a tua encomenda</h3><p>Entregamos em Beja e nos concelhos à volta. Encomendas de Natal até {NATAL_PRAZO}.</p></div>
        </div>
      </div>

      <nav className="nt-filters" id="nt-produtos" aria-label="Filtrar produtos">
        <div className="nt-wrap">
          <div className="nt-chips">
            {[{ id: "todos" as const, titulo: "Tudo" }, ...NATAL_GRUPOS].map((g) => (
              <button key={g.id} className="nt-chip" aria-pressed={filtro === g.id} onClick={() => setFiltro(g.id)}>
                {g.titulo}
              </button>
            ))}
          </div>
        </div>
      </nav>

      <main>
        {NATAL_GRUPOS.filter((g) => filtro === "todos" || filtro === g.id).map((g) => (
          <section className="nt-grp" key={g.id}>
            <div className="nt-wrap">
              <h2>{g.titulo}</h2>
              <p>{g.texto}</p>
              <div className="nt-grid">
                {NATAL_PRODUTOS.filter((p) => p.grupo === g.id).map((p) => (
                  <Card key={p.ref} p={p} />
                ))}
              </div>
            </div>
          </section>
        ))}
      </main>

      <section className="nt-cta">
        <div className="nt-wrap">
          <div>
            <h2>Precisas de lembranças para muitas pessoas?</h2>
            <p>Para empresas, escolas, turmas e equipas, fazemos orçamento por quantidade. Encomendas até {NATAL_PRAZO}.</p>
          </div>
          <a className="nt-btn nt-btn-light" href={waLink("Olá! Gostava de um orçamento para lembranças de Natal em quantidade.")} target="_blank" rel="noopener noreferrer">
            <WaIcon /> Pedir orçamento
          </a>
        </div>
      </section>

      <footer className="nt-foot">
        <div className="nt-wrap">
          <span>© Ninho do Dragão · ninhododragao.pt</span>
          <a href="/catalogo-natal.html" target="_blank" rel="noopener">Catálogo de Natal para imprimir</a>
        </div>
      </footer>
    </div>
  );
}

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,700&family=Nunito:wght@400;600;700&display=swap');
.nt{--pine:#163a2c;--berry:#b3262f;--berry-d:#8f1d25;--gold:#c9a24a;--cream:#fbf6ec;--paper:#fffdf8;--ink:#1d1b18;--muted:#6b6459;--line:#e7dfcf;--wa:#1fa855;
  background:var(--cream);color:var(--ink);font:16px/1.55 Nunito,system-ui,sans-serif;min-height:100vh}
.nt *{box-sizing:border-box}
.nt img{max-width:100%;display:block}
.nt-wrap{max-width:1160px;margin:0 auto;padding:0 16px}
.nt-top{background:var(--pine);border-bottom:1px solid rgba(255,255,255,.08)}
.nt-top .nt-wrap{display:flex;justify-content:space-between;align-items:center;padding-top:12px;padding-bottom:12px}
.nt-brand{font-family:'Dancing Script',cursive;font-size:26px;font-weight:700;color:var(--cream);text-decoration:none}
.nt-back{color:#d9d1bf;font-size:14px;font-weight:600;text-decoration:none}
.nt-back:hover{color:#fff}
.nt-hero{background:radial-gradient(1200px 400px at 80% -10%,#2a6049 0,transparent 60%),var(--pine);color:var(--cream);position:relative;overflow:hidden}
.nt-hero::after{content:"";position:absolute;inset:auto 0 0 0;height:28px;background:radial-gradient(circle at 14px 0,transparent 14px,var(--cream) 15px) 0 0/28px 28px repeat-x}
.nt-hero .nt-wrap{padding-top:48px;padding-bottom:84px;display:grid;gap:28px;grid-template-columns:1.15fr .85fr;align-items:center}
.nt-eyebrow{font-weight:700;letter-spacing:.14em;text-transform:uppercase;font-size:12px;color:var(--gold)}
.nt-hero h1{font-family:Fraunces,serif;font-weight:700;font-size:clamp(34px,5.4vw,60px);line-height:1.04;margin:12px 0 16px;color:var(--cream)}
.nt-hero h1 em{font-style:normal;color:var(--gold)}
.nt-hero p{font-size:18px;max-width:34em;color:#e9e2d2;margin:0 0 24px}
.nt-btn{display:inline-flex;align-items:center;justify-content:center;gap:10px;border:0;border-radius:999px;padding:13px 22px;font:700 15px Nunito,sans-serif;text-decoration:none;cursor:pointer;transition:transform .15s,background .15s}
.nt-btn:hover{transform:translateY(-1px)}
.nt-btn-wa{background:var(--wa);color:#fff}
.nt-btn-wa:hover{background:#178a45}
.nt-btn-ghost{background:transparent;color:var(--cream);box-shadow:inset 0 0 0 1.5px rgba(251,246,236,.5)}
.nt-btn-light{background:#fff;color:var(--berry-d)}
.nt-hero-cta{display:flex;flex-wrap:wrap;gap:12px}
.nt-hero-art{position:relative;aspect-ratio:1;max-width:400px;justify-self:end;width:100%}
.nt-bauble{position:absolute;aspect-ratio:1;border-radius:50%;overflow:hidden;background:#fff;box-shadow:0 18px 40px rgba(0,0,0,.35);border:5px solid var(--gold)}
.nt-bauble img{width:100%;height:100%;object-fit:cover}
.nt-bauble.b1{width:64%;left:4%;top:12%}
.nt-bauble.b2{width:42%;right:0;top:0;border-color:var(--berry)}
.nt-bauble.b3{width:38%;right:6%;bottom:2%;border-color:#fff}
.nt-steps{display:grid;grid-template-columns:repeat(3,1fr);gap:16px;margin:40px auto 8px}
.nt-step{background:var(--paper);border:1px solid var(--line);border-radius:18px;padding:20px}
.nt-step b{display:inline-grid;place-items:center;width:32px;height:32px;border-radius:50%;background:var(--berry);color:#fff;font-family:Fraunces,serif;margin-bottom:8px}
.nt-step h3{margin:0 0 4px;font-size:17px;font-weight:700}
.nt-step p{margin:0;color:var(--muted);font-size:15px}
.nt-filters{position:sticky;top:0;z-index:5;background:rgba(251,246,236,.94);backdrop-filter:blur(6px);padding:14px 0;margin-top:28px;border-bottom:1px solid var(--line)}
.nt-chips{display:flex;gap:8px;overflow-x:auto;scrollbar-width:none}
.nt-chips::-webkit-scrollbar{display:none}
.nt-chip{flex:none;border:1.5px solid var(--line);background:var(--paper);border-radius:999px;padding:8px 16px;font:700 14px Nunito,sans-serif;cursor:pointer;color:var(--ink)}
.nt-chip[aria-pressed=true]{background:var(--pine);border-color:var(--pine);color:var(--cream)}
.nt-grp{padding:36px 0 8px}
.nt-grp h2{font-family:Fraunces,serif;font-size:clamp(26px,3.4vw,36px);margin:0 0 4px;color:var(--pine);font-weight:700}
.nt-grp .nt-wrap > p{margin:0 0 20px;color:var(--muted)}
.nt-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(250px,1fr));gap:20px}
.nt-card{background:var(--paper);border:1px solid var(--line);border-radius:20px;overflow:hidden;display:flex;flex-direction:column;transition:box-shadow .2s,transform .2s}
.nt-card:hover{box-shadow:0 14px 34px rgba(22,58,44,.12);transform:translateY(-2px)}
.nt-ph{position:relative;aspect-ratio:1;background:#f1ebde}
.nt-ph img{width:100%;height:100%;object-fit:cover}
.nt-tag{position:absolute;left:12px;top:12px;background:var(--berry);color:#fff;font-size:12px;font-weight:700;padding:4px 10px;border-radius:999px}
.nt-body{padding:16px 18px 18px;display:flex;flex-direction:column;gap:10px;flex:1}
.nt-card h3{font-family:Fraunces,serif;font-size:20px;line-height:1.2;margin:0;font-weight:700}
.nt-card p{margin:0;color:var(--muted);font-size:15px}
.nt-opts{display:flex;flex-wrap:wrap;gap:6px;margin:0;padding:0;list-style:none}
.nt-opts li{font-size:12.5px;font-weight:600;background:#efe8d8;color:#4f483d;border-radius:8px;padding:3px 9px}
.nt-card .nt-btn{margin-top:auto;padding:11px 16px;font-size:14.5px}
.nt-wa-ico{width:20px;height:20px;flex:none}
.nt-cta{margin-top:48px;background:var(--berry);color:#fff}
.nt-cta .nt-wrap{padding-top:40px;padding-bottom:40px;display:flex;flex-wrap:wrap;gap:20px;align-items:center;justify-content:space-between}
.nt-cta h2{font-family:Fraunces,serif;margin:0 0 6px;font-size:clamp(24px,3vw,32px);color:#fff}
.nt-cta p{margin:0;opacity:.9}
.nt-foot{background:var(--pine);color:#cfc6b4;font-size:14px}
.nt-foot .nt-wrap{padding-top:22px;padding-bottom:22px;display:flex;flex-wrap:wrap;gap:8px 24px;justify-content:space-between}
.nt-foot a{color:var(--gold)}
@media (max-width:820px){
  .nt-hero .nt-wrap{grid-template-columns:1fr;padding-top:32px;padding-bottom:70px}
  .nt-hero-art{max-width:280px;justify-self:center;order:-1}
  .nt-steps{grid-template-columns:1fr}
}
`;
