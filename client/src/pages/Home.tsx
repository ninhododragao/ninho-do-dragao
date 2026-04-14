/**
 * Home.tsx — Ninho do Dragão
 * Design: "Artesanal Digital Moderno"
 * Cores: Azul principal (#2B4EAF), Azul claro (#5B8FD4), Dourado (#C9A227)
 * Fontes: Montserrat (títulos) + Open Sans (corpo) + Playfair Display (acentos emocionais)
 * Inspiração: personalize.pt — limpo, moderno, emocional, produto em destaque
 */

import { useState, useEffect, useRef } from "react";

// ─── Asset URLs ────────────────────────────────────────────────────────────────
const LOGO_URL = "https://d2xsxph8kpxj0f.cloudfront.net/310519663520925403/RjrWWnoYWZdN4j9NAk9t4j/logo-ninho_09b37153.jpg";
const HERO_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663520925403/RjrWWnoYWZdN4j9NAk9t4j/hero_banner-dYQSG76aMLoWZJpuLTVnAk.webp";
const DIA_MAE_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663520925403/RjrWWnoYWZdN4j9NAk9t4j/dia_mae_banner-YvbiDkor3vrwTmbrEi2u4W.webp";
const OVIBEJA_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663520925403/RjrWWnoYWZdN4j9NAk9t4j/ovibeja_banner-3dgetAgkAWqkMetB8yCNSu.webp";
const PRODUCTS_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663520925403/RjrWWnoYWZdN4j9NAk9t4j/products_grid-Wt7Eh36m8TrZkDgm8XEFMH.webp";

const WHATSAPP_NUMBER = "351912345678"; // Substituir pelo número real
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=Olá!%20Gostaria%20de%20encomendar%20um%20produto%20personalizado.`;
const INSTAGRAM_URL = "https://instagram.com/ninhododragao.pt";
const FACEBOOK_URL = "https://facebook.com/ninhododragao.pt";

// ─── Types ─────────────────────────────────────────────────────────────────────
interface Product {
  id: number;
  name: string;
  category: string;
  description: string;
  icon: string;
  badge?: string;
  badgeColor?: string;
}

// ─── Data ──────────────────────────────────────────────────────────────────────
const products: Product[] = [
  {
    id: 1,
    name: "Caneca Personalizada",
    category: "Sublimação",
    description: "Caneca branca com sublimação de alta qualidade. Foto, nome ou frase à tua escolha.",
    icon: "☕",
    badge: "Mais vendido",
    badgeColor: "#C9A227",
  },
  {
    id: 2,
    name: "T-shirt com Vinil",
    category: "Vinil",
    description: "T-shirt personalizada com vinil termocolante. Texto, logótipo ou design exclusivo.",
    icon: "👕",
    badge: "Novidade",
    badgeColor: "#2B4EAF",
  },
  {
    id: 3,
    name: "Garrafa Térmica",
    category: "Sublimação",
    description: "Garrafa inox com sublimação. Mantém a temperatura e tem o teu estilo único.",
    icon: "🍶",
  },
  {
    id: 4,
    name: "Saco de Pano",
    category: "Vinil",
    description: "Saco de algodão personalizado com vinil. Ecológico, resistente e com o teu design.",
    icon: "🛍️",
  },
  {
    id: 5,
    name: "Almofada Personalizada",
    category: "Sublimação",
    description: "Almofada com sublimação de foto ou arte. Perfeita para presentes especiais.",
    icon: "🛋️",
    badge: "Dia da Mãe",
    badgeColor: "#e91e8c",
  },
  {
    id: 6,
    name: "Sweatshirt Personalizada",
    category: "Vinil",
    description: "Sweatshirt com vinil de alta qualidade. Conforto e personalização num só produto.",
    icon: "🧥",
  },
];

const diaMAeProducts = [
  { icon: "☕", name: "Caneca Especial Mãe", desc: "Com foto ou frase personalizada" },
  { icon: "🛋️", name: "Almofada Personalizada", desc: "Com foto ou mensagem especial" },
  { icon: "👕", name: "T-shirt Mãe & Filha", desc: "Conjunto combinado personalizado" },
  { icon: "🍶", name: "Garrafa Térmica", desc: "Com nome e design exclusivo" },
  { icon: "🛍️", name: "Saco de Pano", desc: "Com frase ou arte personalizada" },
  { icon: "🎁", name: "Kit Presente", desc: "Conjunto de produtos personalizados" },
];

// ─── Intersection Observer Hook ────────────────────────────────────────────────
function useInView(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, inView };
}

// ─── Navbar ────────────────────────────────────────────────────────────────────
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "#produtos", label: "Produtos" },
    { href: "#dia-da-mae", label: "Dia da Mãe 💝" },
    { href: "#ovibeja", label: "Ovibeja 2026" },
    { href: "#sobre", label: "Sobre" },
    { href: "#contacto", label: "Contacto" },
  ];

  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        backgroundColor: scrolled ? "rgba(255,255,255,0.97)" : "rgba(255,255,255,0.95)",
        boxShadow: scrolled ? "0 2px 20px rgba(43,78,175,0.12)" : "0 1px 0 rgba(0,0,0,0.06)",
        backdropFilter: "blur(10px)",
        transition: "all 0.3s ease",
      }}
    >
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 24px" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: "70px", position: "relative" }}>
          {/* Placeholder esquerdo para equilibrar o layout */}
          <div style={{ width: "160px" }} />

          {/* Nome centrado absolutamente */}
          <a
            href="#"
            style={{
              position: "absolute",
              left: "50%",
              transform: "translateX(-50%)",
              textDecoration: "none",
              whiteSpace: "nowrap",
            }}
          >
            <span style={{
              fontFamily: "'Pacifico', cursive",
              fontSize: "26px",
              color: "#2B4EAF",
              letterSpacing: "0.02em",
              lineHeight: 1,
            }}>
              Ninho do Dragão
            </span>
          </a>

          {/* Desktop Nav — escondido no mobile */}
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }} className="hidden md:flex" />

          {/* Nav links — invisivel, apenas para acessibilidade */}
          <div style={{ display: "none" }}>
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="nav-link"
                style={{
                  padding: "6px 14px",
                  fontSize: "14px",
                  fontWeight: 600,
                  color: "#2D3748",
                  textDecoration: "none",
                  fontFamily: "Montserrat, sans-serif",
                  letterSpacing: "0.01em",
                  transition: "color 0.2s ease",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#2B4EAF")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "#2D3748")}
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* WhatsApp CTA */}
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              backgroundColor: "#25D366",
              color: "white",
              padding: "8px 18px",
              borderRadius: "25px",
              textDecoration: "none",
              fontSize: "14px",
              fontWeight: 700,
              fontFamily: "Montserrat, sans-serif",
              transition: "all 0.2s ease",
              boxShadow: "0 2px 8px rgba(37,211,102,0.3)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "#1ea855";
              e.currentTarget.style.transform = "translateY(-1px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "#25D366";
              e.currentTarget.style.transform = "translateY(0)";
            }}
            className="hidden md:flex"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            Encomendar
          </a>

          {/* Mobile menu button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "5px",
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: "4px",
            }}
            className="flex md:hidden"
          >
            <span style={{ width: "22px", height: "2px", backgroundColor: "#2B4EAF", display: "block", transition: "all 0.3s" }} />
            <span style={{ width: "22px", height: "2px", backgroundColor: "#2B4EAF", display: "block", transition: "all 0.3s" }} />
            <span style={{ width: "22px", height: "2px", backgroundColor: "#2B4EAF", display: "block", transition: "all 0.3s" }} />
          </button>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div style={{
            borderTop: "1px solid #e2e8f0",
            paddingBottom: "16px",
          }}>
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                style={{
                  display: "block",
                  padding: "12px 0",
                  fontSize: "15px",
                  fontWeight: 600,
                  color: "#2D3748",
                  textDecoration: "none",
                  fontFamily: "Montserrat, sans-serif",
                  borderBottom: "1px solid #f0f0f0",
                }}
              >
                {link.label}
              </a>
            ))}
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                marginTop: "12px",
                backgroundColor: "#25D366",
                color: "white",
                padding: "10px 20px",
                borderRadius: "25px",
                textDecoration: "none",
                fontSize: "14px",
                fontWeight: 700,
                fontFamily: "Montserrat, sans-serif",
              }}
            >
              Encomendar via WhatsApp
            </a>
          </div>
        )}
      </div>
    </nav>
  );
}

// ─── Hero Section ──────────────────────────────────────────────────────────────
function HeroSection() {
  return (
    <section
      id="inicio"
      style={{
        paddingTop: "70px",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        background: "linear-gradient(135deg, #EEF4FF 0%, #ffffff 50%, #F8F7F4 100%)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background decoration */}
      <div style={{
        position: "absolute",
        top: "-100px",
        right: "-100px",
        width: "500px",
        height: "500px",
        borderRadius: "50%",
        background: "radial-gradient(circle, rgba(43,78,175,0.06) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />
      <div style={{
        position: "absolute",
        bottom: "-50px",
        left: "-50px",
        width: "300px",
        height: "300px",
        borderRadius: "50%",
        background: "radial-gradient(circle, rgba(201,162,39,0.08) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />

      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "60px 24px", width: "100%" }}>
        <div style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "60px",
          alignItems: "center",
        }}
          className="grid-cols-1 md:grid-cols-2"
        >
          {/* Text */}
          <div style={{ animation: "fadeInUp 0.8s ease-out" }}>
            <div style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              backgroundColor: "#EEF4FF",
              border: "1px solid rgba(43,78,175,0.2)",
              borderRadius: "20px",
              padding: "6px 16px",
              marginBottom: "24px",
            }}>
              <span style={{ width: "8px", height: "8px", borderRadius: "50%", backgroundColor: "#2B4EAF", display: "inline-block" }} />
              <span style={{ fontSize: "13px", fontWeight: 600, color: "#2B4EAF", fontFamily: "Montserrat, sans-serif" }}>
                Personalização ao vivo na Ovibeja 2026
              </span>
            </div>

            <h1 style={{
              fontFamily: "Montserrat, sans-serif",
              fontSize: "clamp(2rem, 5vw, 3.5rem)",
              fontWeight: 800,
              color: "#1a2744",
              lineHeight: 1.15,
              marginBottom: "20px",
            }}>
              Damos forma<br />
              <span style={{ color: "#2B4EAF" }}>aos teus</span>{" "}
              <span style={{
                fontFamily: "Playfair Display, serif",
                fontStyle: "italic",
                color: "#C9A227",
              }}>momentos</span>
            </h1>

            <p style={{
              fontSize: "17px",
              color: "#4a5568",
              lineHeight: 1.7,
              marginBottom: "36px",
              fontFamily: "Open Sans, sans-serif",
              maxWidth: "480px",
            }}>
              Produtos personalizados únicos com sublimação e vinil. Canecas, t-shirts, garrafas e muito mais — feitos com amor para as tuas memórias especiais.
            </p>

            <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "10px",
                  backgroundColor: "#2B4EAF",
                  color: "white",
                  padding: "14px 28px",
                  borderRadius: "8px",
                  textDecoration: "none",
                  fontSize: "15px",
                  fontWeight: 700,
                  fontFamily: "Montserrat, sans-serif",
                  transition: "all 0.2s ease",
                  boxShadow: "0 4px 15px rgba(43,78,175,0.3)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "#1e3a8a";
                  e.currentTarget.style.transform = "translateY(-2px)";
                  e.currentTarget.style.boxShadow = "0 6px 20px rgba(43,78,175,0.4)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "#2B4EAF";
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "0 4px 15px rgba(43,78,175,0.3)";
                }}
              >
                Encomendar agora
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </a>
              <a
                href="#produtos"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  backgroundColor: "transparent",
                  color: "#2B4EAF",
                  padding: "14px 28px",
                  borderRadius: "8px",
                  textDecoration: "none",
                  fontSize: "15px",
                  fontWeight: 700,
                  fontFamily: "Montserrat, sans-serif",
                  border: "2px solid #2B4EAF",
                  transition: "all 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "#EEF4FF";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "transparent";
                }}
              >
                Ver produtos
              </a>
            </div>


          </div>

          {/* Hero Image */}
          <div style={{
            position: "relative",
            animation: "fadeIn 1s ease-out 0.3s both",
          }}>
            <div style={{
              borderRadius: "20px",
              overflow: "hidden",
              boxShadow: "0 25px 60px rgba(43,78,175,0.2)",
              position: "relative",
            }}>
              <img
                src={HERO_IMG}
                alt="Produtos personalizados Ninho do Dragão"
                style={{
                  width: "100%",
                  height: "420px",
                  objectFit: "cover",
                  display: "block",
                }}
              />
              {/* Overlay badge */}
              <div style={{
                position: "absolute",
                bottom: "20px",
                left: "20px",
                backgroundColor: "white",
                borderRadius: "12px",
                padding: "12px 18px",
                boxShadow: "0 4px 20px rgba(0,0,0,0.15)",
                display: "flex",
                alignItems: "center",
                gap: "10px",
              }}>
                <span style={{ fontSize: "24px" }}>⭐</span>
                <div>
                  <div style={{ fontSize: "13px", fontWeight: 700, color: "#1a2744", fontFamily: "Montserrat, sans-serif" }}>
                    100% Personalizado
                  </div>
                  <div style={{ fontSize: "11px", color: "#718096" }}>Feito especialmente para ti</div>
                </div>
              </div>
            </div>

            {/* Floating badge */}
            <div style={{
              position: "absolute",
              top: "-15px",
              right: "-15px",
              backgroundColor: "#C9A227",
              color: "white",
              borderRadius: "50%",
              width: "80px",
              height: "80px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 4px 15px rgba(201,162,39,0.4)",
              fontFamily: "Montserrat, sans-serif",
            }}>
              <span style={{ fontSize: "11px", fontWeight: 700, textAlign: "center", lineHeight: 1.2 }}>
                Ovibeja<br />2026
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Dia da Mãe Banner ─────────────────────────────────────────────────────────
function DiaMaeBanner() {
  const { ref, inView } = useInView();

  return (
    <section id="dia-da-mae" ref={ref} style={{ backgroundColor: "#FFF0F3", padding: "80px 24px" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        {/* Header */}
        <div style={{
          textAlign: "center",
          marginBottom: "50px",
          opacity: inView ? 1 : 0,
          transform: inView ? "translateY(0)" : "translateY(20px)",
          transition: "all 0.6s ease",
        }}>
          <div style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            backgroundColor: "rgba(233,30,140,0.1)",
            borderRadius: "20px",
            padding: "6px 16px",
            marginBottom: "16px",
          }}>
            <span style={{ fontSize: "16px" }}>💝</span>
            <span style={{ fontSize: "13px", fontWeight: 600, color: "#c2185b", fontFamily: "Montserrat, sans-serif" }}>
              3 de Maio de 2026
            </span>
          </div>
          <h2 style={{
            fontFamily: "Montserrat, sans-serif",
            fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
            fontWeight: 800,
            color: "#1a2744",
            marginBottom: "12px",
          }}>
            Dia da Mãe
          </h2>
          <p style={{
            fontFamily: "Playfair Display, serif",
            fontStyle: "italic",
            fontSize: "1.2rem",
            color: "#c2185b",
          }}>
            "Surpreende a tua mãe com algo único e especial"
          </p>
        </div>

        {/* Layout: imagem + produtos */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "50px",
          alignItems: "center",
        }}
          className="grid-cols-1 md:grid-cols-2"
        >
          {/* Image */}
          <div style={{
            borderRadius: "20px",
            overflow: "hidden",
            boxShadow: "0 20px 50px rgba(194,24,91,0.15)",
            opacity: inView ? 1 : 0,
            transform: inView ? "translateX(0)" : "translateX(-30px)",
            transition: "all 0.7s ease 0.2s",
          }}>
            <img
              src={DIA_MAE_IMG}
              alt="Dia da Mãe - Produtos Personalizados"
              style={{ width: "100%", height: "380px", objectFit: "cover", display: "block" }}
            />
          </div>

          {/* Products grid */}
          <div style={{
            opacity: inView ? 1 : 0,
            transform: inView ? "translateX(0)" : "translateX(30px)",
            transition: "all 0.7s ease 0.3s",
          }}>
            <div style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "16px",
              marginBottom: "28px",
            }}>
              {diaMAeProducts.map((p, i) => (
                <div
                  key={i}
                  style={{
                    backgroundColor: "white",
                    borderRadius: "12px",
                    padding: "16px",
                    boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
                    transition: "all 0.3s ease",
                    cursor: "pointer",
                    border: "1px solid rgba(194,24,91,0.1)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-3px)";
                    e.currentTarget.style.boxShadow = "0 8px 20px rgba(194,24,91,0.15)";
                    e.currentTarget.style.borderColor = "rgba(194,24,91,0.3)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow = "0 2px 12px rgba(0,0,0,0.06)";
                    e.currentTarget.style.borderColor = "rgba(194,24,91,0.1)";
                  }}
                >
                  <div style={{ fontSize: "28px", marginBottom: "8px" }}>{p.icon}</div>
                  <div style={{ fontSize: "13px", fontWeight: 700, color: "#1a2744", fontFamily: "Montserrat, sans-serif", marginBottom: "4px" }}>
                    {p.name}
                  </div>
                  <div style={{ fontSize: "12px", color: "#718096", fontFamily: "Open Sans, sans-serif" }}>
                    {p.desc}
                  </div>
                </div>
              ))}
            </div>

            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "10px",
                backgroundColor: "#c2185b",
                color: "white",
                padding: "14px 28px",
                borderRadius: "8px",
                textDecoration: "none",
                fontSize: "15px",
                fontWeight: 700,
                fontFamily: "Montserrat, sans-serif",
                transition: "all 0.2s ease",
                boxShadow: "0 4px 15px rgba(194,24,91,0.3)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "#ad1457";
                e.currentTarget.style.transform = "translateY(-2px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "#c2185b";
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              💝 Encomendar para o Dia da Mãe
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Products Section ──────────────────────────────────────────────────────────
function ProductsSection() {
  const { ref, inView } = useInView();

  return (
    <section id="produtos" ref={ref} style={{ backgroundColor: "#ffffff", padding: "80px 24px" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <div style={{
          textAlign: "center",
          marginBottom: "50px",
          opacity: inView ? 1 : 0,
          transform: inView ? "translateY(0)" : "translateY(20px)",
          transition: "all 0.6s ease",
        }}>
          <h2 style={{
            fontFamily: "Montserrat, sans-serif",
            fontSize: "clamp(1.8rem, 4vw, 2.6rem)",
            fontWeight: 800,
            color: "#1a2744",
            marginBottom: "12px",
          }}>
            Os nossos produtos
          </h2>
          <p style={{
            fontSize: "16px",
            color: "#718096",
            fontFamily: "Open Sans, sans-serif",
            maxWidth: "500px",
            margin: "0 auto",
          }}>
            Sublimação e vinil de alta qualidade para todos os momentos especiais
          </p>
        </div>

        {/* Techniques badges */}
        <div style={{
          display: "flex",
          justifyContent: "center",
          gap: "16px",
          marginBottom: "40px",
          flexWrap: "wrap",
          opacity: inView ? 1 : 0,
          transition: "all 0.6s ease 0.1s",
        }}>
          {[
            { label: "Sublimação", desc: "Canecas, garrafas, almofadas", color: "#2B4EAF" },
            { label: "Vinil", desc: "T-shirts, sacos, superfícies", color: "#C9A227" },
          ].map((tech) => (
            <div
              key={tech.label}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                backgroundColor: "#F8F9FF",
                border: `2px solid ${tech.color}20`,
                borderRadius: "12px",
                padding: "12px 20px",
              }}
            >
              <div style={{
                width: "10px",
                height: "10px",
                borderRadius: "50%",
                backgroundColor: tech.color,
              }} />
              <div>
                <div style={{ fontSize: "14px", fontWeight: 700, color: "#1a2744", fontFamily: "Montserrat, sans-serif" }}>
                  {tech.label}
                </div>
                <div style={{ fontSize: "12px", color: "#718096" }}>{tech.desc}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Products Grid */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "24px",
        }}
          className="grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
        >
          {products.map((product, i) => (
            <div
              key={product.id}
              className="product-card"
              style={{
                backgroundColor: "white",
                borderRadius: "16px",
                padding: "28px 24px",
                border: "1px solid #e2e8f0",
                position: "relative",
                opacity: inView ? 1 : 0,
                transform: inView ? "translateY(0)" : "translateY(20px)",
                transition: `all 0.5s ease ${0.1 + i * 0.07}s`,
                cursor: "pointer",
              }}
            >
              {/* Badge */}
              {product.badge && (
                <div style={{
                  position: "absolute",
                  top: "16px",
                  right: "16px",
                  backgroundColor: product.badgeColor,
                  color: "white",
                  fontSize: "11px",
                  fontWeight: 700,
                  padding: "4px 10px",
                  borderRadius: "20px",
                  fontFamily: "Montserrat, sans-serif",
                }}>
                  {product.badge}
                </div>
              )}

              {/* Icon */}
              <div style={{
                fontSize: "40px",
                marginBottom: "16px",
                width: "64px",
                height: "64px",
                backgroundColor: "#EEF4FF",
                borderRadius: "16px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}>
                {product.icon}
              </div>

              {/* Category */}
              <div style={{
                fontSize: "11px",
                fontWeight: 700,
                color: product.category === "Sublimação" ? "#2B4EAF" : "#C9A227",
                textTransform: "uppercase",
                letterSpacing: "0.08em",
                marginBottom: "8px",
                fontFamily: "Montserrat, sans-serif",
              }}>
                {product.category}
              </div>

              {/* Name */}
              <h3 style={{
                fontFamily: "Montserrat, sans-serif",
                fontSize: "17px",
                fontWeight: 700,
                color: "#1a2744",
                marginBottom: "10px",
              }}>
                {product.name}
              </h3>

              {/* Description */}
              <p style={{
                fontSize: "14px",
                color: "#718096",
                lineHeight: 1.6,
                fontFamily: "Open Sans, sans-serif",
                marginBottom: "20px",
              }}>
                {product.description}
              </p>

              {/* CTA */}
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                  color: "#2B4EAF",
                  fontSize: "14px",
                  fontWeight: 700,
                  textDecoration: "none",
                  fontFamily: "Montserrat, sans-serif",
                  transition: "gap 0.2s ease",
                }}
                onMouseEnter={(e) => { e.currentTarget.style.gap = "10px"; }}
                onMouseLeave={(e) => { e.currentTarget.style.gap = "6px"; }}
              >
                Encomendar
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </a>
            </div>
          ))}
        </div>

        {/* Products image */}
        <div style={{
          marginTop: "50px",
          borderRadius: "20px",
          overflow: "hidden",
          boxShadow: "0 10px 40px rgba(43,78,175,0.1)",
          opacity: inView ? 1 : 0,
          transition: "all 0.8s ease 0.4s",
        }}>
          <img
            src={PRODUCTS_IMG}
            alt="Catálogo de produtos personalizados"
            style={{ width: "100%", height: "300px", objectFit: "cover", display: "block" }}
          />
        </div>
      </div>
    </section>
  );
}

// ─── Ovibeja Section ───────────────────────────────────────────────────────────
function OvibejaSection() {
  const { ref, inView } = useInView();

  return (
    <section id="ovibeja" ref={ref} style={{ backgroundColor: "#EEF4FF", padding: "80px 24px" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <div style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "60px",
          alignItems: "center",
        }}
          className="grid-cols-1 md:grid-cols-2"
        >
          {/* Text */}
          <div style={{
            opacity: inView ? 1 : 0,
            transform: inView ? "translateX(0)" : "translateX(-30px)",
            transition: "all 0.7s ease",
          }}>
            <div style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              backgroundColor: "rgba(43,78,175,0.1)",
              borderRadius: "20px",
              padding: "6px 16px",
              marginBottom: "20px",
            }}>
              <span style={{ fontSize: "14px" }}>📍</span>
              <span style={{ fontSize: "13px", fontWeight: 600, color: "#2B4EAF", fontFamily: "Montserrat, sans-serif" }}>
                Beja, Alentejo
              </span>
            </div>

            <h2 style={{
              fontFamily: "Montserrat, sans-serif",
              fontSize: "clamp(1.8rem, 4vw, 2.6rem)",
              fontWeight: 800,
              color: "#1a2744",
              marginBottom: "16px",
            }}>
              Ovibeja 2026
            </h2>

            <p style={{
              fontFamily: "Playfair Display, serif",
              fontStyle: "italic",
              fontSize: "1.1rem",
              color: "#2B4EAF",
              marginBottom: "20px",
            }}>
              "Personalização ao vivo na maior feira agropecuária do Alentejo"
            </p>

            <p style={{
              fontSize: "16px",
              color: "#4a5568",
              lineHeight: 1.7,
              fontFamily: "Open Sans, sans-serif",
              marginBottom: "28px",
            }}>
              Visita o nosso stand na Ovibeja 2026 e personaliza os teus produtos em tempo real. Escolhe o design, adiciona o teu nome ou foto, e leva para casa uma lembrança única do Alentejo.
            </p>

            {/* Info cards */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "28px" }}>
              {[
                { icon: "📅", label: "Data", value: "Maio 2026" },
                { icon: "📍", label: "Local", value: "Beja, Alentejo" },
                { icon: "🎨", label: "Serviço", value: "Personalização ao vivo" },
                { icon: "⚡", label: "Entrega", value: "Na hora" },
              ].map((info) => (
                <div
                  key={info.label}
                  style={{
                    backgroundColor: "white",
                    borderRadius: "12px",
                    padding: "14px",
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    boxShadow: "0 2px 8px rgba(43,78,175,0.08)",
                  }}
                >
                  <span style={{ fontSize: "20px" }}>{info.icon}</span>
                  <div>
                    <div style={{ fontSize: "11px", color: "#718096", fontFamily: "Open Sans, sans-serif" }}>{info.label}</div>
                    <div style={{ fontSize: "13px", fontWeight: 700, color: "#1a2744", fontFamily: "Montserrat, sans-serif" }}>{info.value}</div>
                  </div>
                </div>
              ))}
            </div>

            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "10px",
                backgroundColor: "#2B4EAF",
                color: "white",
                padding: "14px 28px",
                borderRadius: "8px",
                textDecoration: "none",
                fontSize: "15px",
                fontWeight: 700,
                fontFamily: "Montserrat, sans-serif",
                transition: "all 0.2s ease",
                boxShadow: "0 4px 15px rgba(43,78,175,0.3)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "#1e3a8a";
                e.currentTarget.style.transform = "translateY(-2px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "#2B4EAF";
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              Saber mais sobre a Ovibeja
            </a>
          </div>

          {/* Image */}
          <div style={{
            borderRadius: "20px",
            overflow: "hidden",
            boxShadow: "0 20px 50px rgba(43,78,175,0.2)",
            opacity: inView ? 1 : 0,
            transform: inView ? "translateX(0)" : "translateX(30px)",
            transition: "all 0.7s ease 0.2s",
          }}>
            <img
              src={OVIBEJA_IMG}
              alt="Stand Ninho do Dragão na Ovibeja 2026"
              style={{ width: "100%", height: "420px", objectFit: "cover", display: "block" }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── About Section ─────────────────────────────────────────────────────────────
function AboutSection() {
  const { ref, inView } = useInView();

  return (
    <section id="sobre" ref={ref} style={{ backgroundColor: "#ffffff", padding: "80px 24px" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <div style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "60px",
          alignItems: "center",
        }}
          className="grid-cols-1 md:grid-cols-2"
        >
          {/* Logo & Brand */}
          <div style={{
            textAlign: "center",
            opacity: inView ? 1 : 0,
            transform: inView ? "translateY(0)" : "translateY(20px)",
            transition: "all 0.6s ease",
          }}>
            <div style={{
              backgroundColor: "#EEF4FF",
              borderRadius: "24px",
              padding: "50px",
              display: "inline-flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "20px",
            }}>
              <img
                src={LOGO_URL}
                alt="Ninho do Dragão"
                style={{ width: "180px", height: "auto", objectFit: "contain" }}
              />
              <div style={{
                display: "flex",
                gap: "12px",
              }}>
                <a
                  href={INSTAGRAM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                    backgroundColor: "#2B4EAF",
                    color: "white",
                    padding: "8px 16px",
                    borderRadius: "8px",
                    textDecoration: "none",
                    fontSize: "13px",
                    fontWeight: 600,
                    fontFamily: "Montserrat, sans-serif",
                  }}
                >
                  Instagram
                </a>
                <a
                  href={FACEBOOK_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                    backgroundColor: "#1877F2",
                    color: "white",
                    padding: "8px 16px",
                    borderRadius: "8px",
                    textDecoration: "none",
                    fontSize: "13px",
                    fontWeight: 600,
                    fontFamily: "Montserrat, sans-serif",
                  }}
                >
                  Facebook
                </a>
              </div>
            </div>
          </div>

          {/* Text */}
          <div style={{
            opacity: inView ? 1 : 0,
            transform: inView ? "translateX(0)" : "translateX(30px)",
            transition: "all 0.7s ease 0.2s",
          }}>
            <h2 style={{
              fontFamily: "Montserrat, sans-serif",
              fontSize: "clamp(1.8rem, 4vw, 2.4rem)",
              fontWeight: 800,
              color: "#1a2744",
              marginBottom: "16px",
            }}>
              Sobre o Ninho do Dragão
            </h2>

            <p style={{
              fontFamily: "Playfair Display, serif",
              fontStyle: "italic",
              fontSize: "1.1rem",
              color: "#C9A227",
              marginBottom: "20px",
            }}>
              "Damos forma aos teus momentos"
            </p>

            <p style={{
              fontSize: "16px",
              color: "#4a5568",
              lineHeight: 1.8,
              fontFamily: "Open Sans, sans-serif",
              marginBottom: "20px",
            }}>
              Somos uma empresa portuguesa especializada em personalização de produtos através de sublimação e vinil. Cada produto que criamos é único — feito com dedicação para transformar os teus momentos especiais em memórias duradouras.
            </p>

            <p style={{
              fontSize: "16px",
              color: "#4a5568",
              lineHeight: 1.8,
              fontFamily: "Open Sans, sans-serif",
              marginBottom: "28px",
            }}>
              Da caneca do dia a dia ao presente perfeito para o Dia da Mãe, passando pela lembrança exclusiva da Ovibeja — estamos aqui para dar vida às tuas ideias.
            </p>

            {/* Techniques */}
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              {[
                {
                  title: "Sublimação",
                  desc: "Impressão de alta qualidade em cerâmica, inox e têxteis sintéticos. Cores vibrantes e duradouras.",
                  color: "#2B4EAF",
                },
                {
                  title: "Vinil Termocolante",
                  desc: "Corte de vinil para t-shirts, sacos e superfícies rígidas. Acabamento profissional e resistente.",
                  color: "#C9A227",
                },
              ].map((tech) => (
                <div
                  key={tech.title}
                  style={{
                    display: "flex",
                    gap: "14px",
                    alignItems: "flex-start",
                    padding: "16px",
                    backgroundColor: "#F8F9FF",
                    borderRadius: "12px",
                    borderLeft: `4px solid ${tech.color}`,
                  }}
                >
                  <div>
                    <div style={{ fontSize: "14px", fontWeight: 700, color: "#1a2744", fontFamily: "Montserrat, sans-serif", marginBottom: "4px" }}>
                      {tech.title}
                    </div>
                    <div style={{ fontSize: "13px", color: "#718096", fontFamily: "Open Sans, sans-serif", lineHeight: 1.5 }}>
                      {tech.desc}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Contact Section ───────────────────────────────────────────────────────────
function ContactSection() {
  const { ref, inView } = useInView();

  return (
    <section id="contacto" ref={ref} style={{ backgroundColor: "#1a2744", padding: "80px 24px" }}>
      <div style={{ maxWidth: "900px", margin: "0 auto", textAlign: "center" }}>
        <div style={{
          opacity: inView ? 1 : 0,
          transform: inView ? "translateY(0)" : "translateY(20px)",
          transition: "all 0.6s ease",
        }}>
          <h2 style={{
            fontFamily: "Montserrat, sans-serif",
            fontSize: "clamp(1.8rem, 4vw, 2.6rem)",
            fontWeight: 800,
            color: "white",
            marginBottom: "16px",
          }}>
            Vamos criar algo especial?
          </h2>

          <p style={{
            fontFamily: "Playfair Display, serif",
            fontStyle: "italic",
            fontSize: "1.2rem",
            color: "#C9A227",
            marginBottom: "20px",
          }}>
            "Cada encomenda é única, tal como tu"
          </p>

          <p style={{
            fontSize: "16px",
            color: "rgba(255,255,255,0.75)",
            lineHeight: 1.7,
            fontFamily: "Open Sans, sans-serif",
            marginBottom: "40px",
            maxWidth: "600px",
            margin: "0 auto 40px",
          }}>
            Fala connosco pelo WhatsApp para fazer a tua encomenda, tirar dúvidas ou pedir um orçamento personalizado. Respondemos rapidamente!
          </p>

          <div style={{ display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap" }}>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="whatsapp-pulse"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "12px",
                backgroundColor: "#25D366",
                color: "white",
                padding: "16px 32px",
                borderRadius: "8px",
                textDecoration: "none",
                fontSize: "16px",
                fontWeight: 700,
                fontFamily: "Montserrat, sans-serif",
                transition: "all 0.2s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "#1ea855";
                e.currentTarget.style.transform = "translateY(-2px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "#25D366";
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              Encomendar pelo WhatsApp
            </a>

            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "10px",
                backgroundColor: "transparent",
                color: "white",
                padding: "16px 28px",
                borderRadius: "8px",
                textDecoration: "none",
                fontSize: "15px",
                fontWeight: 700,
                fontFamily: "Montserrat, sans-serif",
                border: "2px solid rgba(255,255,255,0.3)",
                transition: "all 0.2s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.7)";
                e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.1)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.3)";
                e.currentTarget.style.backgroundColor = "transparent";
              }}
            >
              @ninhododragao.pt
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Footer ────────────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer style={{
      backgroundColor: "#111827",
      color: "rgba(255,255,255,0.6)",
      padding: "32px 24px",
      textAlign: "center",
    }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <div style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "16px",
          marginBottom: "20px",
        }}>
          <img
            src={LOGO_URL}
            alt="Ninho do Dragão"
            style={{ height: "36px", width: "auto", objectFit: "contain", opacity: 0.85 }}
          />
          <div style={{ display: "flex", gap: "24px" }}>
            {[
              { href: "#produtos", label: "Produtos" },
              { href: "#dia-da-mae", label: "Dia da Mãe" },
              { href: "#ovibeja", label: "Ovibeja 2026" },
              { href: "#contacto", label: "Contacto" },
            ].map((link) => (
              <a
                key={link.href}
                href={link.href}
                style={{
                  color: "rgba(255,255,255,0.6)",
                  textDecoration: "none",
                  fontSize: "13px",
                  fontFamily: "Open Sans, sans-serif",
                  transition: "color 0.2s ease",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "white")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.6)")}
              >
                {link.label}
              </a>
            ))}
          </div>
          <div style={{ display: "flex", gap: "12px" }}>
            <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" style={{ color: "rgba(255,255,255,0.6)", textDecoration: "none", fontSize: "13px" }}>Instagram</a>
            <a href={FACEBOOK_URL} target="_blank" rel="noopener noreferrer" style={{ color: "rgba(255,255,255,0.6)", textDecoration: "none", fontSize: "13px" }}>Facebook</a>
          </div>
        </div>
        <div style={{ borderTop: "1px solid rgba(255,255,255,0.1)", paddingTop: "20px", fontSize: "13px", fontFamily: "Open Sans, sans-serif" }}>
          © 2026 Ninho do Dragão. Todos os direitos reservados. | Sublimação & Vinil | Portugal
        </div>
      </div>
    </footer>
  );
}

// ─── WhatsApp Float Button ─────────────────────────────────────────────────────
function WhatsAppFloat() {
  return (
    <a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      className="whatsapp-pulse"
      style={{
        position: "fixed",
        bottom: "28px",
        right: "28px",
        zIndex: 999,
        backgroundColor: "#25D366",
        color: "white",
        width: "58px",
        height: "58px",
        borderRadius: "50%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        textDecoration: "none",
        boxShadow: "0 4px 20px rgba(37,211,102,0.4)",
        transition: "all 0.3s ease",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "scale(1.1)";
        e.currentTarget.style.boxShadow = "0 6px 25px rgba(37,211,102,0.5)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "scale(1)";
        e.currentTarget.style.boxShadow = "0 4px 20px rgba(37,211,102,0.4)";
      }}
      title="Encomendar pelo WhatsApp"
    >
      <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
      </svg>
    </a>
  );
}

// ─── Main Home Page ────────────────────────────────────────────────────────────
export default function Home() {
  return (
    <div style={{ fontFamily: "Open Sans, sans-serif", backgroundColor: "#ffffff" }}>
      <Navbar />
      <HeroSection />
      <DiaMaeBanner />
      <ProductsSection />
      <OvibejaSection />
      <AboutSection />
      <ContactSection />
      <Footer />
      <WhatsAppFloat />
    </div>
  );
}
