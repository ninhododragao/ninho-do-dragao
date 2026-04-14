/*
 * Home.tsx — Ninho do Dragão
 * Design: "Artesanal Digital Moderno"
 * Cores: Azul principal (#2B4EAF), Azul claro (#5B8FD4), Dourado (#C9A227)
 * Fontes: Montserrat (títulos) + Open Sans (corpo) + Playfair Display (acentos emocionais)
 * Inspiração: personalize.pt — limpo, moderno, emocional, produto em destaque
 */

import { useState, useEffect, useRef } from "react";

// ─── Asset URLs ────────────────────────────────────────────────────────────────
const LOGO_URL = "https://d2xsxph8kpxj0f.cloudfront.net/310519663520925403/RjrWWnoYWZdN4j9NAk9t4j/logo-ninho_09b37153.jpg";
const HERO_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663520925403/RjrWWnoYWZdN4j9NAk9t4j/ovibeja_2026_ninho_9ef92953.png";
const DIA_MAE_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663520925403/RjrWWnoYWZdN4j9NAk9t4j/dia_mae_banner-YvbiDkor3vrwTmbrEi2u4W.webp";
const OVIBEJA_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663520925403/RjrWWnoYWZdN4j9NAk9t4j/ovibeja_banner-3dgetAgkAWqkMetB8yCNSu.webp";
const PRODUCTS_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663520925403/RjrWWnoYWZdN4j9NAk9t4j/products_grid-Wt7Eh36m8TrZkDgm8XEFMH.webp";

const WHATSAPP_NUMBER = "351935852703"; // +351 935 852 703
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=Olá!%20Gostaria%20de%20encomendar%20um%20produto%20personalizado.`;
const INSTAGRAM_URL = "https://instagram.com/ninhododragao.pt";
const FACEBOOK_URL = "https://facebook.com/ninhododragao.pt";

// ─── Types ─────────────────────────────────────────────────────────────────────
interface Product {
  id: number;
  name: string;
  description: string;
  icon: string;
}

// ─── Catálogo Completo por Categorias ──────────────────────────────────────────
const productCategories = {
  texteis: [
    { id: 1, name: "T-shirt", description: "Personalizada com vinil", icon: "👕" },
    { id: 2, name: "Sweatshirt", description: "Com vinil de alta qualidade", icon: "🧥" },
    { id: 3, name: "Hoodie", description: "Conforto premium personalizado", icon: "🧥" },
  ],
  presentes: [
    { id: 4, name: "Caneca", description: "Sublimação de alta qualidade", icon: "☕" },
    { id: 5, name: "Almofada", description: "Com sublimação de foto ou arte", icon: "🛋️" },
    { id: 6, name: "Garrafa Térmica", description: "Inox com sublimação", icon: "🍶" },
    { id: 7, name: "Copo Térmico", description: "Personalizado com vinil", icon: "☕" },
    { id: 8, name: "Azulejo", description: "Com sublimação de foto", icon: "🎨" },
    { id: 9, name: "Manta", description: "Premium personalizada", icon: "🧣" },
    { id: 10, name: "Saco de Pano", description: "Ecológico com vinil", icon: "🛍️" },
    { id: 11, name: "Porta-chaves", description: "Personalizado", icon: "🔑" },
    { id: 12, name: "Ímã", description: "Micro-presente", icon: "🧲" },
  ],
  festas: [
    { id: 13, name: "Saquinhos Festa", description: "Personalizados por unidade", icon: "🎉" },
    { id: 14, name: "Caixas Lembrança", description: "Personalizadas", icon: "📦" },
    { id: 15, name: "Topo de Bolo", description: "Personalizado", icon: "🎂" },
    { id: 16, name: "Bandeirolas", description: "Decoração personalizada", icon: "🚩" },
    { id: 17, name: "Toppers Cupcake", description: "Personalizados", icon: "🧁" },
    { id: 18, name: "Convite Digital", description: "Personalizado", icon: "📧" },
    { id: 19, name: "Convite Impresso", description: "Personalizado", icon: "📮" },
  ],
  kits: [
    { id: 20, name: "Kit Essencial", description: "Entrada para eventos pequenos", icon: "🎁" },
    { id: 21, name: "Kit Plus", description: "Solução completa", icon: "🎀" },
    { id: 22, name: "Festa Completa", description: "Personalização total sob orçamento", icon: "🎊" },
  ],
  papelaria: [
    { id: 23, name: "Cartões", description: "Personalizados", icon: "📇" },
    { id: 24, name: "Etiquetas", description: "Personalizadas", icon: "🏷️" },
    { id: 25, name: "Autocolantes", description: "Personalizados", icon: "✨" },
    { id: 26, name: "Marcadores", description: "Personalizados", icon: "🖍️" },
    { id: 27, name: "Caderno", description: "Premium personalizado", icon: "📓" },
    { id: 28, name: "Calendário", description: "Personalizado", icon: "📅" },
    { id: 29, name: "Agenda", description: "Premium personalizada", icon: "📔" },
  ],
  grupo: [
    { id: 30, name: "T-shirt em Grupo", description: "Desconto em quantidade", icon: "👕" },
    { id: 31, name: "Sweatshirt em Grupo", description: "Preço especial", icon: "🧥" },
    { id: 32, name: "Orçamento Personalizado", description: "Consulte-nos", icon: "💬" },
  ],
};

const categoryLabels = {
  texteis: "Têxteis",
  presentes: "Presentes",
  festas: "Festas",
  kits: "Kits",
  papelaria: "Papelaria",
  grupo: "Grupos",
};

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

// ─── Catálogo com Abas ─────────────────────────────────────────────────────────
function ProductCatalog() {
  const [activeTab, setActiveTab] = useState<keyof typeof productCategories>("texteis");
  const { ref, inView } = useInView(0.2);

  return (
    <section
      id="produtos"
      ref={ref}
      style={{
        padding: "80px 24px",
        backgroundColor: "#f9fafb",
      }}
    >
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        {/* Título */}
        <div style={{ textAlign: "center", marginBottom: "48px" }}>
          <h2 style={{
            fontSize: "36px",
            fontWeight: 800,
            color: "#1a202c",
            fontFamily: "Montserrat, sans-serif",
            marginBottom: "12px",
          }}>
            Os nossos produtos
          </h2>
          <p style={{
            fontSize: "16px",
            color: "#718096",
            fontFamily: "Open Sans, sans-serif",
          }}>
            Sublimação e vinil de alta qualidade para todos os momentos especiais
          </p>
        </div>

        {/* Abas */}
        <div style={{
          display: "flex",
          gap: "8px",
          marginBottom: "40px",
          flexWrap: "wrap",
          justifyContent: "center",
        }}>
          {Object.entries(categoryLabels).map(([key, label]) => (
            <button
              key={key}
              onClick={() => setActiveTab(key as keyof typeof productCategories)}
              style={{
                padding: "10px 20px",
                fontSize: "14px",
                fontWeight: 600,
                fontFamily: "Montserrat, sans-serif",
                border: activeTab === key ? "2px solid #2B4EAF" : "2px solid #e2e8f0",
                backgroundColor: activeTab === key ? "#2B4EAF" : "white",
                color: activeTab === key ? "white" : "#2D3748",
                borderRadius: "8px",
                cursor: "pointer",
                transition: "all 0.2s ease",
              }}
              onMouseEnter={(e) => {
                if (activeTab !== key) {
                  e.currentTarget.style.borderColor = "#2B4EAF";
                  e.currentTarget.style.backgroundColor = "#f0f4ff";
                }
              }}
              onMouseLeave={(e) => {
                if (activeTab !== key) {
                  e.currentTarget.style.borderColor = "#e2e8f0";
                  e.currentTarget.style.backgroundColor = "white";
                }
              }}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Grid de Produtos */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
          gap: "24px",
        }}>
          {productCategories[activeTab].map((product) => (
            <div
              key={product.id}
              style={{
                backgroundColor: "white",
                borderRadius: "12px",
                padding: "24px",
                boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
                transition: "all 0.3s ease",
                cursor: "pointer",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = "0 8px 24px rgba(43,78,175,0.15)";
                e.currentTarget.style.transform = "translateY(-4px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = "0 2px 8px rgba(0,0,0,0.06)";
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              <div style={{ fontSize: "48px", marginBottom: "16px" }}>{product.icon}</div>
              <h3 style={{
                fontSize: "18px",
                fontWeight: 700,
                color: "#1a202c",
                fontFamily: "Montserrat, sans-serif",
                marginBottom: "8px",
              }}>
                {product.name}
              </h3>
              <p style={{
                fontSize: "14px",
                color: "#718096",
                fontFamily: "Open Sans, sans-serif",
                marginBottom: "16px",
              }}>
                {product.description}
              </p>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                  color: "#2B4EAF",
                  textDecoration: "none",
                  fontSize: "14px",
                  fontWeight: 600,
                  fontFamily: "Montserrat, sans-serif",
                  transition: "all 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = "#C9A227";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = "#2B4EAF";
                }}
              >
                Encomendar →
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Main Home Component ───────────────────────────────────────────────────────
export default function Home() {
  const { ref: heroRef, inView: heroInView } = useInView(0.3);

  return (
    <div style={{ backgroundColor: "white", minHeight: "100vh" }}>
      <Navbar />

      {/* Hero Section */}
      <section
        ref={heroRef}
        style={{
          paddingTop: "70px",
          paddingBottom: "60px",
          backgroundColor: "#f0f4ff",
          backgroundImage: `linear-gradient(135deg, rgba(43,78,175,0.08) 0%, rgba(201,162,39,0.05) 100%)`,
        }}
      >
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 24px" }}>
          <div style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "48px",
            alignItems: "center",
            gridAutoFlow: "dense",
          }} className="md:grid-cols-1">
            {/* Left: Text */}
            <div>
              <div style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                backgroundColor: "#e6f0ff",
                padding: "8px 16px",
                borderRadius: "24px",
                marginBottom: "24px",
              }}>
                <span style={{ fontSize: "12px", fontWeight: 600, color: "#2B4EAF", fontFamily: "Montserrat, sans-serif" }}>
                  ● Personalização ao vivo na Ovibeja 2026
                </span>
              </div>

              <h1 style={{
                fontSize: "48px",
                fontWeight: 800,
                lineHeight: 1.2,
                marginBottom: "24px",
                fontFamily: "Montserrat, sans-serif",
                color: "#1a202c",
              }}>
                Damos forma <br />
                <span style={{ color: "#2B4EAF" }}>aos teus</span> <span style={{ fontStyle: "italic", color: "#C9A227" }}>momentos</span>
              </h1>

              <p style={{
                fontSize: "16px",
                lineHeight: 1.6,
                color: "#4a5568",
                marginBottom: "32px",
                fontFamily: "Open Sans, sans-serif",
              }}>
                Produtos personalizados únicos com sublimação e vinil. Canecas, t-shirts, garrafas e muito mais — feitos com amor para as tuas memórias especiais.
              </p>

              <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
                <a
                  href="#produtos"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "8px",
                    backgroundColor: "#2B4EAF",
                    color: "white",
                    padding: "12px 28px",
                    borderRadius: "8px",
                    textDecoration: "none",
                    fontSize: "15px",
                    fontWeight: 700,
                    fontFamily: "Montserrat, sans-serif",
                    transition: "all 0.3s ease",
                    boxShadow: "0 4px 12px rgba(43,78,175,0.3)",
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
                  Encomendar agora →
                </a>
                <a
                  href="#produtos"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "8px",
                    backgroundColor: "white",
                    color: "#2B4EAF",
                    padding: "12px 28px",
                    borderRadius: "8px",
                    textDecoration: "none",
                    fontSize: "15px",
                    fontWeight: 700,
                    fontFamily: "Montserrat, sans-serif",
                    border: "2px solid #2B4EAF",
                    transition: "all 0.3s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = "#f0f4ff";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = "white";
                  }}
                >
                  Ver produtos
                </a>
              </div>
            </div>

            {/* Right: Image */}
            <div style={{
              position: "relative",
              height: "400px",
              borderRadius: "16px",
              overflow: "hidden",
              boxShadow: "0 20px 40px rgba(43,78,175,0.15)",
            }}>
              <img
                src={HERO_IMG}
                alt="Produtos Ninho do Dragão"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  opacity: heroInView ? 1 : 0.8,
                  transition: "opacity 0.6s ease",
                }}
              />
              <div style={{
                position: "absolute",
                bottom: "20px",
                right: "20px",
                backgroundColor: "#C9A227",
                color: "white",
                padding: "16px 20px",
                borderRadius: "12px",
                fontSize: "14px",
                fontWeight: 700,
                fontFamily: "Montserrat, sans-serif",
                boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
              }}>
                ⭐ 100% Personalizado<br />
                <span style={{ fontSize: "12px", fontWeight: 500 }}>Feito especialmente para ti</span>
              </div>
              <div style={{
                position: "absolute",
                top: "20px",
                right: "20px",
                backgroundColor: "#C9A227",
                color: "white",
                padding: "12px 16px",
                borderRadius: "50%",
                fontSize: "24px",
                width: "60px",
                height: "60px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: 700,
                boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
              }}>
                Ovibeja<br />2026
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Dia da Mãe Section */}
      <section
        id="dia-da-mae"
        style={{
          padding: "80px 24px",
          backgroundColor: "#fdf2f8",
        }}
      >
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "16px" }}>
            <span style={{
              display: "inline-block",
              fontSize: "14px",
              fontWeight: 600,
              color: "#e91e8c",
              fontFamily: "Montserrat, sans-serif",
              marginBottom: "12px",
            }}>
              💝 3 de Maio de 2026
            </span>
          </div>
          <h2 style={{
            fontSize: "36px",
            fontWeight: 800,
            textAlign: "center",
            color: "#1a202c",
            fontFamily: "Montserrat, sans-serif",
            marginBottom: "12px",
          }}>
            Dia da Mãe
          </h2>
          <p style={{
            fontSize: "16px",
            textAlign: "center",
            color: "#718096",
            fontFamily: "Playfair Display, serif",
            fontStyle: "italic",
            marginBottom: "48px",
          }}>
            "Surpreende a tua mãe com algo único e especial"
          </p>

          <div style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "40px",
            alignItems: "center",
          }} className="md:grid-cols-1">
            {/* Image */}
            <div style={{
              borderRadius: "16px",
              overflow: "hidden",
              boxShadow: "0 20px 40px rgba(233,30,140,0.15)",
            }}>
              <img
                src={DIA_MAE_IMG}
                alt="Dia da Mãe"
                style={{
                  width: "100%",
                  height: "auto",
                  objectFit: "cover",
                }}
              />
            </div>

            {/* Products Grid */}
            <div>
              <div style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "16px",
              }}>
                {diaMAeProducts.map((product, idx) => (
                  <div
                    key={idx}
                    style={{
                      backgroundColor: "white",
                      padding: "16px",
                      borderRadius: "12px",
                      boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
                    }}
                  >
                    <div style={{ fontSize: "32px", marginBottom: "8px" }}>{product.icon}</div>
                    <h4 style={{
                      fontSize: "14px",
                      fontWeight: 700,
                      color: "#1a202c",
                      fontFamily: "Montserrat, sans-serif",
                      marginBottom: "4px",
                    }}>
                      {product.name}
                    </h4>
                    <p style={{
                      fontSize: "12px",
                      color: "#718096",
                      fontFamily: "Open Sans, sans-serif",
                    }}>
                      {product.desc}
                    </p>
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
                  gap: "8px",
                  marginTop: "24px",
                  backgroundColor: "#e91e8c",
                  color: "white",
                  padding: "12px 28px",
                  borderRadius: "8px",
                  textDecoration: "none",
                  fontSize: "15px",
                  fontWeight: 700,
                  fontFamily: "Montserrat, sans-serif",
                  transition: "all 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "#c71670";
                  e.currentTarget.style.transform = "translateY(-2px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "#e91e8c";
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                💝 Encomendar para o Dia da Mãe
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Catálogo com Abas */}
      <ProductCatalog />

      {/* Ovibeja Section */}
      <section
        id="ovibeja"
        style={{
          padding: "80px 24px",
          backgroundColor: "white",
        }}
      >
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <div style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "48px",
            alignItems: "center",
          }} className="md:grid-cols-1">
            {/* Left: Content */}
            <div>
              <div style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                backgroundColor: "#fef3c7",
                padding: "8px 16px",
                borderRadius: "24px",
                marginBottom: "24px",
              }}>
                <span style={{ fontSize: "14px", fontWeight: 600, color: "#92400e", fontFamily: "Montserrat, sans-serif" }}>
                  📍 Beja, Alentejo
                </span>
              </div>

              <h2 style={{
                fontSize: "36px",
                fontWeight: 800,
                marginBottom: "12px",
                fontFamily: "Montserrat, sans-serif",
                color: "#1a202c",
              }}>
                Ovibeja 2026
              </h2>

              <p style={{
                fontSize: "16px",
                color: "#718096",
                fontFamily: "Playfair Display, serif",
                fontStyle: "italic",
                marginBottom: "24px",
              }}>
                "Personalização ao vivo na maior feira agropecuária do Alentejo"
              </p>

              <p style={{
                fontSize: "15px",
                lineHeight: 1.7,
                color: "#4a5568",
                fontFamily: "Open Sans, sans-serif",
                marginBottom: "32px",
              }}>
                Visita o nosso stand na Ovibeja 2026 e personaliza os teus produtos em tempo real. Escolhe o design, adiciona o teu nome ou foto, e leva para casa uma lembrança única do Alentejo.
              </p>

              <div style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "24px",
                marginBottom: "32px",
              }}>
                <div>
                  <div style={{ fontSize: "14px", fontWeight: 600, color: "#718096", fontFamily: "Montserrat, sans-serif", marginBottom: "4px" }}>📅 Data</div>
                  <div style={{ fontSize: "18px", fontWeight: 700, color: "#1a202c", fontFamily: "Montserrat, sans-serif" }}>Maio 2026</div>
                </div>
                <div>
                  <div style={{ fontSize: "14px", fontWeight: 600, color: "#718096", fontFamily: "Montserrat, sans-serif", marginBottom: "4px" }}>📍 Local</div>
                  <div style={{ fontSize: "18px", fontWeight: 700, color: "#1a202c", fontFamily: "Montserrat, sans-serif" }}>Beja, Alentejo</div>
                </div>
                <div>
                  <div style={{ fontSize: "14px", fontWeight: 600, color: "#718096", fontFamily: "Montserrat, sans-serif", marginBottom: "4px" }}>🎨 Serviço</div>
                  <div style={{ fontSize: "18px", fontWeight: 700, color: "#1a202c", fontFamily: "Montserrat, sans-serif" }}>Personalização ao vivo</div>
                </div>
                <div>
                  <div style={{ fontSize: "14px", fontWeight: 600, color: "#718096", fontFamily: "Montserrat, sans-serif", marginBottom: "4px" }}>⚡ Entrega</div>
                  <div style={{ fontSize: "18px", fontWeight: 700, color: "#1a202c", fontFamily: "Montserrat, sans-serif" }}>Na hora</div>
                </div>
              </div>

              <a
                href="https://www.ovibeja.com"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  backgroundColor: "#2B4EAF",
                  color: "white",
                  padding: "12px 28px",
                  borderRadius: "8px",
                  textDecoration: "none",
                  fontSize: "15px",
                  fontWeight: 700,
                  fontFamily: "Montserrat, sans-serif",
                  transition: "all 0.3s ease",
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

            {/* Right: Image */}
            <div style={{
              borderRadius: "16px",
              overflow: "hidden",
              boxShadow: "0 20px 40px rgba(43,78,175,0.15)",
            }}>
              <img
                src={OVIBEJA_IMG}
                alt="Ovibeja 2026"
                style={{
                  width: "100%",
                  height: "auto",
                  objectFit: "cover",
                }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Sobre Section */}
      <section
        id="sobre"
        style={{
          padding: "80px 24px",
          backgroundColor: "#f9fafb",
        }}
      >
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <h2 style={{
            fontSize: "36px",
            fontWeight: 800,
            textAlign: "center",
            marginBottom: "48px",
            fontFamily: "Montserrat, sans-serif",
            color: "#1a202c",
          }}>
            Sobre o Ninho do Dragão
          </h2>

          <div style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "48px",
            alignItems: "center",
          }} className="md:grid-cols-1">
            {/* Left: Quote */}
            <div>
              <p style={{
                fontSize: "24px",
                fontStyle: "italic",
                color: "#2B4EAF",
                fontFamily: "Playfair Display, serif",
                marginBottom: "24px",
                lineHeight: 1.6,
              }}>
                "Damos forma aos teus momentos"
              </p>

              <p style={{
                fontSize: "15px",
                lineHeight: 1.8,
                color: "#4a5568",
                fontFamily: "Open Sans, sans-serif",
                marginBottom: "24px",
              }}>
                Somos uma empresa portuguesa especializada em personalização de produtos através de sublimação e vinil. Cada produto que criamos é único — feito com dedicação para transformar os teus momentos especiais em memórias duradouras.
              </p>

              <p style={{
                fontSize: "15px",
                lineHeight: 1.8,
                color: "#4a5568",
                fontFamily: "Open Sans, sans-serif",
              }}>
                Da caneca do dia a dia ao presente perfeito para o Dia da Mãe, passando pela lembrança exclusiva da Ovibeja — estamos aqui para dar vida às tuas ideias.
              </p>
            </div>

            {/* Right: Services */}
            <div style={{
              display: "grid",
              gridTemplateColumns: "1fr",
              gap: "24px",
            }}>
              <div style={{
                backgroundColor: "white",
                padding: "24px",
                borderRadius: "12px",
                boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
              }}>
                <h3 style={{
                  fontSize: "18px",
                  fontWeight: 700,
                  color: "#2B4EAF",
                  fontFamily: "Montserrat, sans-serif",
                  marginBottom: "12px",
                }}>
                  Sublimação
                </h3>
                <p style={{
                  fontSize: "14px",
                  color: "#718096",
                  fontFamily: "Open Sans, sans-serif",
                  lineHeight: 1.6,
                }}>
                  Impressão de alta qualidade em cerâmica, inox e têxteis sintéticos. Cores vibrantes e duradouras.
                </p>
              </div>

              <div style={{
                backgroundColor: "white",
                padding: "24px",
                borderRadius: "12px",
                boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
              }}>
                <h3 style={{
                  fontSize: "18px",
                  fontWeight: 700,
                  color: "#2B4EAF",
                  fontFamily: "Montserrat, sans-serif",
                  marginBottom: "12px",
                }}>
                  Vinil Termocolante
                </h3>
                <p style={{
                  fontSize: "14px",
                  color: "#718096",
                  fontFamily: "Open Sans, sans-serif",
                  lineHeight: 1.6,
                }}>
                  Corte de vinil para t-shirts, sacos e superfícies rígidas. Acabamento profissional e resistente.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section
        id="contacto"
        style={{
          padding: "80px 24px",
          backgroundColor: "#f0f4ff",
          backgroundImage: `linear-gradient(135deg, rgba(43,78,175,0.08) 0%, rgba(201,162,39,0.05) 100%)`,
        }}
      >
        <div style={{ maxWidth: "800px", margin: "0 auto", textAlign: "center" }}>
          <h2 style={{
            fontSize: "36px",
            fontWeight: 800,
            marginBottom: "12px",
            fontFamily: "Montserrat, sans-serif",
            color: "#1a202c",
          }}>
            Vamos criar algo especial?
          </h2>

          <p style={{
            fontSize: "16px",
            color: "#718096",
            fontFamily: "Playfair Display, serif",
            fontStyle: "italic",
            marginBottom: "32px",
          }}>
            "Cada encomenda é única, tal como tu"
          </p>

          <p style={{
            fontSize: "15px",
            lineHeight: 1.8,
            color: "#4a5568",
            fontFamily: "Open Sans, sans-serif",
            marginBottom: "32px",
          }}>
            Fala connosco pelo WhatsApp para fazer a tua encomenda, tirar dúvidas ou pedir um orçamento personalizado. Respondemos rapidamente!
          </p>

          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              backgroundColor: "#25D366",
              color: "white",
              padding: "14px 32px",
              borderRadius: "8px",
              textDecoration: "none",
              fontSize: "16px",
              fontWeight: 700,
              fontFamily: "Montserrat, sans-serif",
              transition: "all 0.3s ease",
              boxShadow: "0 4px 12px rgba(37,211,102,0.3)",
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
        </div>
      </section>

      {/* Footer */}
      <footer style={{
        backgroundColor: "#1a202c",
        color: "white",
        padding: "40px 24px",
        textAlign: "center",
      }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <div style={{
            display: "flex",
            gap: "24px",
            justifyContent: "center",
            marginBottom: "24px",
            flexWrap: "wrap",
          }}>
            <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" style={{ color: "white", textDecoration: "none", fontSize: "14px", fontFamily: "Montserrat, sans-serif" }}>
              Instagram
            </a>
            <a href={FACEBOOK_URL} target="_blank" rel="noopener noreferrer" style={{ color: "white", textDecoration: "none", fontSize: "14px", fontFamily: "Montserrat, sans-serif" }}>
              Facebook
            </a>
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" style={{ color: "white", textDecoration: "none", fontSize: "14px", fontFamily: "Montserrat, sans-serif" }}>
              Encomendar pelo WhatsApp
            </a>
          </div>
          <p style={{ fontSize: "13px", color: "#a0aec0", fontFamily: "Open Sans, sans-serif" }}>
            © 2026 Ninho do Dragão. Todos os direitos reservados.
          </p>
        </div>
      </footer>

      {/* WhatsApp Floating Button */}
      <a
        href={WHATSAPP_URL}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          position: "fixed",
          bottom: "24px",
          right: "24px",
          backgroundColor: "#25D366",
          color: "white",
          width: "56px",
          height: "56px",
          borderRadius: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          textDecoration: "none",
          boxShadow: "0 4px 12px rgba(37,211,102,0.4)",
          zIndex: 999,
          animation: "pulse 2s infinite",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "scale(1.1)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "scale(1)";
        }}
      >
        <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
      </a>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.7; }
        }
      `}</style>
    </div>
  );
}
