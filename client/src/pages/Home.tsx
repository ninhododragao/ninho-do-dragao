/*
 * Home.tsx — Ninho do Dragão v2
 * Design limpo, profissional, emocional. Conversão via WhatsApp.
 * Mobile first. Sem imagens externas (exceto Ovibeja fornecida).
 */

import { useState, useEffect, useRef } from "react";
import { Toaster, toast } from "sonner";

const WA = "https://wa.me/351935852703";
const WA_MSG = (msg: string) => `${WA}?text=${encodeURIComponent(msg)}`;
const OVIBEJA_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663520925403/RjrWWnoYWZdN4j9NAk9t4j/ovibeja_2026_ninho_9ef92953.png";
const IG = "https://www.instagram.com/ninhododragao.pt";
const FB = "https://www.facebook.com/ninhododragao.pt";

/* ─── Hook: Intersection Observer ─────────────────────────────── */
function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setInView(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
}

/* ─── Navbar ──────────────────────────────────────────────────── */
function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
  }, []);

  const links = [
    { label: "Produtos", href: "#produtos" },
    { label: "Dia da Mãe", href: "#dia-mae" },
    { label: "Ovibeja", href: "#ovibeja" },
    { label: "Contacto", href: "#contacto" },
  ];

  return (
    <nav
      style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 50,
        backgroundColor: scrolled ? "rgba(255,255,255,0.97)" : "rgba(255,255,255,0.92)",
        backdropFilter: "blur(12px)",
        borderBottom: scrolled ? "1px solid #e5e7eb" : "1px solid transparent",
        transition: "all 0.3s ease",
      }}
    >
      <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "14px 20px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        {/* Brand */}
        <a href="#" style={{ textDecoration: "none" }}>
          <span style={{
            fontFamily: "'Dancing Script', cursive",
            fontSize: "28px",
            fontWeight: 700,
            color: "#2B4EAF",
          }}>
            Ninho do Dragão
          </span>
        </a>

        {/* Desktop links */}
        <div className="nav-desktop" style={{ display: "flex", alignItems: "center", gap: "28px" }}>
          {links.map(l => (
            <a key={l.href} href={l.href} className="nav-link" style={{
              textDecoration: "none", color: "#374151", fontSize: "14px",
              fontWeight: 600, fontFamily: "Montserrat, sans-serif",
            }}>
              {l.label}
            </a>
          ))}
          <a href={WA_MSG("Olá! Gostava de fazer uma encomenda.")} target="_blank" rel="noopener noreferrer"
            className="btn-whatsapp"
            style={{ padding: "10px 20px", borderRadius: "8px", fontSize: "13px", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "6px" }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.625.846 5.059 2.284 7.034L.789 23.492a.5.5 0 00.611.611l4.458-1.495A11.952 11.952 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-2.387 0-4.592-.826-6.326-2.207l-.442-.362-3.248 1.089 1.089-3.248-.362-.442A9.96 9.96 0 012 12C2 6.486 6.486 2 12 2s10 4.486 10 10-4.486 10-10 10z"/></svg>
            WhatsApp
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          className="nav-mobile-btn"
          onClick={() => setOpen(!open)}
          aria-label="Abrir menu"
          style={{
            display: "none", background: "none", border: "none", cursor: "pointer",
            padding: "8px", minWidth: "44px", minHeight: "44px",
            alignItems: "center", justifyContent: "center",
          }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#2B4EAF" strokeWidth="2.5" strokeLinecap="round">
            {open ? <><line x1="6" y1="6" x2="18" y2="18"/><line x1="6" y1="18" x2="18" y2="6"/></> : <><line x1="3" y1="7" x2="21" y2="7"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="17" x2="21" y2="17"/></>}
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div style={{
          backgroundColor: "white", borderTop: "1px solid #e5e7eb",
          padding: "16px 20px", display: "flex", flexDirection: "column", gap: "12px",
        }}>
          {links.map(l => (
            <a key={l.href} href={l.href} onClick={() => setOpen(false)} style={{
              textDecoration: "none", color: "#374151", fontSize: "15px",
              fontWeight: 600, fontFamily: "Montserrat, sans-serif", padding: "8px 0",
            }}>
              {l.label}
            </a>
          ))}
          <a href={WA_MSG("Olá! Gostava de fazer uma encomenda.")} target="_blank" rel="noopener noreferrer"
            className="btn-whatsapp"
            style={{ padding: "12px", borderRadius: "8px", fontSize: "14px", textDecoration: "none", textAlign: "center" }}>
            Encomendar no WhatsApp
          </a>
        </div>
      )}
    </nav>
  );
}

/* ─── Placeholder Image Component ─────────────────────────────── */
function PlaceholderImg({ icon, label, h = "200px" }: { icon: string; label: string; h?: string }) {
  return (
    <div className="placeholder-img" style={{
      height: h, borderRadius: "12px", flexDirection: "column", gap: "8px",
    }}>
      <span style={{ fontSize: "3rem" }}>{icon}</span>
      <span style={{ fontSize: "12px", fontWeight: 600, fontFamily: "Montserrat, sans-serif", color: "#6b7280", letterSpacing: "0.05em", textTransform: "uppercase" }}>
        {label}
      </span>
    </div>
  );
}

/* ─── Section Wrapper ─────────────────────────────────────────── */
function Section({ id, children, bg = "white", pad = true }: { id?: string; children: React.ReactNode; bg?: string; pad?: boolean }) {
  const { ref, inView } = useInView(0.1);
  return (
    <section
      id={id}
      ref={ref}
      className={`section-reveal ${inView ? "visible" : ""} ${pad ? "section-pad" : ""}`}
      style={{ backgroundColor: bg, padding: pad ? "80px 24px" : undefined }}
    >
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        {children}
      </div>
    </section>
  );
}

/* ─── Products Data ───────────────────────────────────────────── */
const PRODUCTS = [
  { icon: "👕", name: "T-shirts personalizadas", desc: "Com vinil ou sublimação. O teu design, a tua mensagem." },
  { icon: "☕", name: "Canecas", desc: "Personalizadas com foto, nome ou frase especial." },
  { icon: "🛋️", name: "Almofadas", desc: "Com imagem ou mensagem — perfeitas para presente." },
  { icon: "🖼️", name: "Azulejos personalizados", desc: "Arte portuguesa com o teu toque pessoal." },
  { icon: "🎁", name: "Kits presente", desc: "Conjuntos personalizados para surpreender." },
];

const DIA_MAE_ITEMS = [
  "Kits personalizados",
  "Canecas",
  "Copos personalizados",
  "Caixas com fotografias",
];

const DIFERENCIAIS = [
  { icon: "❤️", text: "Feito com carinho" },
  { icon: "🎨", text: "Design único" },
  { icon: "⚡", text: "Produção rápida" },
  { icon: "🤝", text: "Atendimento próximo" },
  { icon: "✨", text: "Personalização total" },
];

/* ─── Newsletter ──────────────────────────────────────────────── */
function NewsletterInline() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.includes("@")) { toast.error("Email inválido"); return; }
    const code = `NINHO${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
    toast.success(`Código de 10% desconto: ${code}`, { duration: 8000 });
    setDone(true);
  };

  if (done) return (
    <p style={{ color: "#25D366", fontWeight: 600, fontFamily: "Montserrat, sans-serif", fontSize: "14px" }}>
      Obrigado! Verifica o teu email.
    </p>
  );

  return (
    <form onSubmit={submit} style={{ display: "flex", gap: "8px", flexWrap: "wrap", maxWidth: "420px" }}>
      <input type="email" placeholder="O teu email..." value={email} onChange={e => setEmail(e.target.value)}
        style={{
          flex: 1, minWidth: "180px", padding: "10px 14px", borderRadius: "8px",
          border: "2px solid #e5e7eb", fontSize: "14px", fontFamily: "Open Sans, sans-serif",
          outline: "none", transition: "border-color 0.2s",
        }}
        onFocus={e => e.currentTarget.style.borderColor = "#2B4EAF"}
        onBlur={e => e.currentTarget.style.borderColor = "#e5e7eb"}
      />
      <button type="submit" className="btn-primary" style={{ padding: "10px 20px", borderRadius: "8px", fontSize: "13px" }}>
        Subscrever
      </button>
    </form>
  );
}

/* ═══════════════════════════════════════════════════════════════ */
/*                          HOME PAGE                             */
/* ═══════════════════════════════════════════════════════════════ */
export default function Home() {
  return (
    <>
      <Toaster position="top-center" richColors />
      <Navbar />

      <main style={{ paddingTop: "64px" }}>

        {/* ─── 1. HERO ─────────────────────────────────────────── */}
        <section style={{
          padding: "80px 24px 60px",
          background: "linear-gradient(180deg, #f8faff 0%, #ffffff 100%)",
          textAlign: "center",
        }}>
          <div style={{ maxWidth: "720px", margin: "0 auto" }}>
            <h1 className="hero-title" style={{
              fontFamily: "Montserrat, sans-serif",
              fontSize: "42px",
              fontWeight: 800,
              color: "#1a1a2e",
              lineHeight: 1.15,
              marginBottom: "20px",
            }}>
              Peças personalizadas que guardam{" "}
              <span style={{ color: "#C9A227" }}>momentos únicos</span>
            </h1>
            <p style={{
              fontSize: "17px",
              color: "#6b7280",
              lineHeight: 1.7,
              maxWidth: "560px",
              margin: "0 auto 32px",
            }}>
              Criamos presentes com significado — feitos à tua medida para surpreender quem mais importa.
            </p>

            <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap", marginBottom: "20px" }}>
              <a href={WA_MSG("Olá! Gostava de fazer uma encomenda.")} target="_blank" rel="noopener noreferrer"
                className="btn-whatsapp"
                style={{ padding: "14px 28px", borderRadius: "10px", fontSize: "15px", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "8px" }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.625.846 5.059 2.284 7.034L.789 23.492a.5.5 0 00.611.611l4.458-1.495A11.952 11.952 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-2.387 0-4.592-.826-6.326-2.207l-.442-.362-3.248 1.089 1.089-3.248-.362-.442A9.96 9.96 0 012 12C2 6.486 6.486 2 12 2s10 4.486 10 10-4.486 10-10 10z"/></svg>
                Encomendar no WhatsApp
              </a>
              <a href="#produtos" style={{
                padding: "14px 28px", borderRadius: "10px", fontSize: "15px",
                textDecoration: "none", color: "#2B4EAF", fontWeight: 700,
                fontFamily: "Montserrat, sans-serif",
                border: "2px solid #2B4EAF", display: "inline-block",
                transition: "all 0.2s ease",
              }}
                onMouseEnter={e => { e.currentTarget.style.backgroundColor = "#2B4EAF"; e.currentTarget.style.color = "white"; }}
                onMouseLeave={e => { e.currentTarget.style.backgroundColor = "transparent"; e.currentTarget.style.color = "#2B4EAF"; }}
              >
                Ver produtos
              </a>
            </div>

            <p style={{ fontSize: "13px", color: "#9ca3af", fontWeight: 500 }}>
              ✔ Resposta rápida no WhatsApp
            </p>
          </div>
        </section>

        {/* ─── 2. DESTAQUE OVIBEJA ─────────────────────────────── */}
        <Section id="ovibeja" bg="#fafafa">
          <div style={{ textAlign: "center", marginBottom: "32px" }}>
            <span style={{
              display: "inline-block", backgroundColor: "#FEF3C7", color: "#92400e",
              padding: "6px 16px", borderRadius: "20px", fontSize: "13px", fontWeight: 700,
              fontFamily: "Montserrat, sans-serif", marginBottom: "12px",
            }}>
              Edição limitada
            </span>
            <h2 className="text-responsive-lg" style={{
              fontFamily: "Montserrat, sans-serif", fontSize: "32px", fontWeight: 800,
              color: "#1a1a2e", marginBottom: "8px",
            }}>
              Destaque Ovibeja 2026
            </h2>
            <p style={{ fontSize: "16px", color: "#6b7280", maxWidth: "500px", margin: "0 auto" }}>
              Peça exclusiva personalizada — criada especialmente para este momento
            </p>
          </div>

          <div className="grid-responsive" style={{
            display: "grid", gridTemplateColumns: "1fr 1fr", gap: "40px", alignItems: "center",
          }}>
            <div style={{ borderRadius: "16px", overflow: "hidden", boxShadow: "0 12px 40px rgba(0,0,0,0.1)" }}>
              <img
                src={OVIBEJA_IMG}
                alt="Edição Especial Ovibeja 2026 — Moldura com azulejos Feito em Portugal"
                className="ovibeja-img"
                style={{ width: "100%", height: "auto", display: "block" }}
              />
            </div>
            <div>
              <p style={{
                fontSize: "17px", color: "#374151", lineHeight: 1.8, marginBottom: "24px",
              }}>
                Perfeito para oferecer ou guardar uma memória única. Uma peça com azulejos portugueses, feita com alma alentejana.
              </p>
              <a href={WA_MSG("Olá! Quero a peça especial Ovibeja 2026!")} target="_blank" rel="noopener noreferrer"
                className="btn-whatsapp"
                style={{ padding: "14px 28px", borderRadius: "10px", fontSize: "15px", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "8px" }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.625.846 5.059 2.284 7.034L.789 23.492a.5.5 0 00.611.611l4.458-1.495A11.952 11.952 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-2.387 0-4.592-.826-6.326-2.207l-.442-.362-3.248 1.089 1.089-3.248-.362-.442A9.96 9.96 0 012 12C2 6.486 6.486 2 12 2s10 4.486 10 10-4.486 10-10 10z"/></svg>
                Quero este
              </a>
            </div>
          </div>
        </Section>

        {/* ─── 3. PRODUTOS ─────────────────────────────────────── */}
        <Section id="produtos">
          <div style={{ textAlign: "center", marginBottom: "48px" }}>
            <h2 className="text-responsive-lg" style={{
              fontFamily: "Montserrat, sans-serif", fontSize: "32px", fontWeight: 800,
              color: "#1a1a2e", marginBottom: "8px",
            }}>
              Os nossos produtos
            </h2>
            <p style={{ fontSize: "16px", color: "#6b7280" }}>
              Tudo personalizado, tudo feito para ti
            </p>
          </div>

          <div className="grid-responsive-2" style={{
            display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "24px",
          }}>
            {PRODUCTS.map((p, i) => (
              <div key={i} className="product-card" style={{
                backgroundColor: "white", borderRadius: "14px", overflow: "hidden",
                border: "1px solid #f0f0f0",
              }}>
                <PlaceholderImg icon={p.icon} label="Em breve" h="180px" />
                <div style={{ padding: "20px" }}>
                  <h3 style={{
                    fontFamily: "Montserrat, sans-serif", fontSize: "16px", fontWeight: 700,
                    color: "#1a1a2e", marginBottom: "6px",
                  }}>
                    {p.name}
                  </h3>
                  <p style={{ fontSize: "14px", color: "#6b7280", lineHeight: 1.5, marginBottom: "16px" }}>
                    {p.desc}
                  </p>
                  <a href={WA_MSG(`Olá! Quero saber mais sobre: ${p.name}`)} target="_blank" rel="noopener noreferrer"
                    className="btn-whatsapp"
                    style={{
                      padding: "10px 18px", borderRadius: "8px", fontSize: "13px",
                      textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "6px",
                      width: "100%", justifyContent: "center",
                    }}>
                    Pedir no WhatsApp
                  </a>
                </div>
              </div>
            ))}
          </div>
        </Section>

        {/* ─── 4. DIA DA MÃE ──────────────────────────────────── */}
        <Section id="dia-mae" bg="#FFF7F9">
          <div className="grid-responsive" style={{
            display: "grid", gridTemplateColumns: "1fr 1fr", gap: "48px", alignItems: "center",
          }}>
            <div>
              <span style={{
                display: "inline-block", backgroundColor: "#fce7f3", color: "#be185d",
                padding: "6px 16px", borderRadius: "20px", fontSize: "13px", fontWeight: 700,
                fontFamily: "Montserrat, sans-serif", marginBottom: "16px",
              }}>
                💝 Dia da Mãe — 4 de Maio
              </span>
              <h2 className="text-responsive-lg" style={{
                fontFamily: "Montserrat, sans-serif", fontSize: "30px", fontWeight: 800,
                color: "#1a1a2e", lineHeight: 1.2, marginBottom: "16px",
              }}>
                Tens presentes que dizem tudo sem uma palavra.
              </h2>
              <p style={{ fontSize: "16px", color: "#6b7280", lineHeight: 1.7, marginBottom: "8px" }}>
                Neste Dia da Mãe, cria algo único:
              </p>
              <p style={{ fontSize: "16px", color: "#374151", lineHeight: 1.7, marginBottom: "20px", fontStyle: "italic" }}>
                com nome,<br />com fotografia,<br />com mensagem especial.
              </p>

              <ul style={{ listStyle: "none", padding: 0, marginBottom: "20px" }}>
                {DIA_MAE_ITEMS.map((item, i) => (
                  <li key={i} style={{
                    padding: "8px 0", fontSize: "15px", color: "#374151", fontWeight: 500,
                    display: "flex", alignItems: "center", gap: "10px",
                  }}>
                    <span style={{ color: "#C9A227", fontSize: "16px" }}>✦</span> {item}
                  </li>
                ))}
              </ul>

              <p style={{
                fontSize: "14px", fontWeight: 700, color: "#be185d",
                fontFamily: "Montserrat, sans-serif", marginBottom: "20px",
                backgroundColor: "#fce7f3", display: "inline-block", padding: "8px 16px", borderRadius: "8px",
              }}>
                Encomendas até 28 de abril
              </p>

              <div>
                <a href={WA_MSG("Olá! Quero encomendar para o Dia da Mãe!")} target="_blank" rel="noopener noreferrer"
                  className="btn-whatsapp"
                  style={{ padding: "14px 24px", borderRadius: "10px", fontSize: "15px", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "8px" }}>
                  Encomendar antes que esgote
                </a>
              </div>
            </div>

            <div>
              <PlaceholderImg icon="💝" label="Dia da Mãe" h="380px" />
            </div>
          </div>
        </Section>

        {/* ─── 5. PERSONALIZAÇÃO ───────────────────────────────── */}
        <Section bg="white">
          <div style={{ textAlign: "center", maxWidth: "600px", margin: "0 auto" }}>
            <h2 className="text-responsive-lg" style={{
              fontFamily: "Montserrat, sans-serif", fontSize: "32px", fontWeight: 800,
              color: "#1a1a2e", marginBottom: "12px",
            }}>
              Personalizamos qualquer ideia
            </h2>
            <p style={{ fontSize: "17px", color: "#6b7280", lineHeight: 1.7 }}>
              Desde frases emotivas até designs únicos — criamos exatamente como imaginas.
            </p>
          </div>
        </Section>

        {/* ─── 6. DIFERENCIAÇÃO ────────────────────────────────── */}
        <Section bg="#f9fafb">
          <div style={{
            display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "20px",
          }}>
            {DIFERENCIAIS.map((d, i) => (
              <div key={i} style={{
                backgroundColor: "white", borderRadius: "12px", padding: "24px 28px",
                textAlign: "center", minWidth: "160px", flex: "1 1 160px", maxWidth: "200px",
                border: "1px solid #f0f0f0",
                transition: "transform 0.3s ease, box-shadow 0.3s ease",
              }}
                onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = "0 8px 24px rgba(0,0,0,0.06)"; }}
                onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; }}
              >
                <div style={{ fontSize: "28px", marginBottom: "8px" }}>{d.icon}</div>
                <p style={{ fontSize: "14px", fontWeight: 700, color: "#1a1a2e", fontFamily: "Montserrat, sans-serif" }}>
                  {d.text}
                </p>
              </div>
            ))}
          </div>
        </Section>

        {/* ─── 7. CTA FINAL ────────────────────────────────────── */}
        <Section id="contacto" bg="#2B4EAF">
          <div style={{ textAlign: "center" }}>
            <h2 style={{
              fontFamily: "Montserrat, sans-serif", fontSize: "32px", fontWeight: 800,
              color: "white", marginBottom: "12px",
            }}>
              Tens uma ideia? Nós damos-lhe vida.
            </h2>
            <p style={{ fontSize: "16px", color: "rgba(255,255,255,0.8)", marginBottom: "32px" }}>
              Fala connosco e transforma a tua ideia num produto único.
            </p>
            <a href={WA_MSG("Olá! Tenho uma ideia para personalizar!")} target="_blank" rel="noopener noreferrer"
              className="btn-whatsapp"
              style={{
                padding: "18px 40px", borderRadius: "12px", fontSize: "17px",
                textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "10px",
              }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.625.846 5.059 2.284 7.034L.789 23.492a.5.5 0 00.611.611l4.458-1.495A11.952 11.952 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-2.387 0-4.592-.826-6.326-2.207l-.442-.362-3.248 1.089 1.089-3.248-.362-.442A9.96 9.96 0 012 12C2 6.486 6.486 2 12 2s10 4.486 10 10-4.486 10-10 10z"/></svg>
              Falar no WhatsApp agora
            </a>

            <div style={{ marginTop: "32px" }}>
              <p style={{ color: "rgba(255,255,255,0.7)", fontSize: "13px", marginBottom: "8px" }}>
                Subscreve e recebe 10% de desconto na primeira encomenda
              </p>
              <div style={{ display: "flex", justifyContent: "center" }}>
                <NewsletterInline />
              </div>
            </div>
          </div>
        </Section>

      </main>

      {/* ─── 8. FOOTER ─────────────────────────────────────────── */}
      <footer style={{ backgroundColor: "#111827", padding: "48px 24px 32px" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <div className="footer-grid" style={{
            display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "32px", marginBottom: "32px",
          }}>
            <div>
              <span style={{
                fontFamily: "'Dancing Script', cursive", fontSize: "24px", fontWeight: 700,
                color: "white", display: "block", marginBottom: "8px",
              }}>
                Ninho do Dragão
              </span>
              <p style={{ fontSize: "14px", color: "#9ca3af", lineHeight: 1.6 }}>
                Damos forma aos teus momentos
              </p>
            </div>
            <div>
              <p style={{ fontSize: "13px", fontWeight: 700, color: "white", fontFamily: "Montserrat, sans-serif", marginBottom: "12px", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                Redes sociais
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                <a href={IG} target="_blank" rel="noopener noreferrer" style={{ color: "#9ca3af", fontSize: "14px", textDecoration: "none", transition: "color 0.2s" }}
                  onMouseEnter={e => e.currentTarget.style.color = "white"}
                  onMouseLeave={e => e.currentTarget.style.color = "#9ca3af"}>
                  Instagram — @ninhododragao.pt
                </a>
                <a href={FB} target="_blank" rel="noopener noreferrer" style={{ color: "#9ca3af", fontSize: "14px", textDecoration: "none", transition: "color 0.2s" }}
                  onMouseEnter={e => e.currentTarget.style.color = "white"}
                  onMouseLeave={e => e.currentTarget.style.color = "#9ca3af"}>
                  Facebook — Ninho do Dragão
                </a>
              </div>
            </div>
            <div>
              <p style={{ fontSize: "13px", fontWeight: 700, color: "white", fontFamily: "Montserrat, sans-serif", marginBottom: "12px", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                Contacto
              </p>
              <a href={WA} target="_blank" rel="noopener noreferrer" style={{ color: "#25D366", fontSize: "14px", textDecoration: "none", fontWeight: 600 }}>
                +351 935 852 703
              </a>
            </div>
          </div>

          <div style={{ borderTop: "1px solid #1f2937", paddingTop: "20px", textAlign: "center" }}>
            <p style={{ fontSize: "12px", color: "#6b7280" }}>
              Ninho do Dragão — damos forma aos teus momentos
            </p>
          </div>
        </div>
      </footer>

      {/* ─── WhatsApp Floating Button ──────────────────────────── */}
      <a
        href={WA_MSG("Olá! Gostava de saber mais sobre os vossos produtos.")}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Contactar pelo WhatsApp"
        className="whatsapp-pulse"
        style={{
          position: "fixed", bottom: "24px", right: "24px", zIndex: 40,
          width: "56px", height: "56px", borderRadius: "50%",
          backgroundColor: "#25D366", display: "flex", alignItems: "center", justifyContent: "center",
          boxShadow: "0 4px 16px rgba(37,211,102,0.4)",
          transition: "transform 0.2s ease",
        }}
        onMouseEnter={e => e.currentTarget.style.transform = "scale(1.1)"}
        onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
      >
        <svg width="28" height="28" viewBox="0 0 24 24" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.625.846 5.059 2.284 7.034L.789 23.492a.5.5 0 00.611.611l4.458-1.495A11.952 11.952 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-2.387 0-4.592-.826-6.326-2.207l-.442-.362-3.248 1.089 1.089-3.248-.362-.442A9.96 9.96 0 012 12C2 6.486 6.486 2 12 2s10 4.486 10 10-4.486 10-10 10z"/></svg>
      </a>
    </>
  );
}
