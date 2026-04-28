import { useState } from "react";
import productsData from "../data/products.json";

const WA = "https://wa.me/351935852703";
const WA_MSG = (msg: string) => `${WA}?text=${encodeURIComponent(msg)}`;

export default function Products() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const categories = Array.from(new Set(productsData.products.map(p => p.category)));
  const filteredProducts = selectedCategory
    ? productsData.products.filter(p => p.category === selectedCategory)
    : productsData.products;

  return (
    <section id="produtos" style={{
      padding: "80px 24px",
      maxWidth: "1200px",
      margin: "0 auto",
    }}>
      <div style={{ textAlign: "center", marginBottom: "48px" }}>
        <h2 style={{
          fontFamily: "Montserrat, sans-serif",
          fontSize: "36px",
          fontWeight: 800,
          color: "#1a1a2e",
          marginBottom: "12px",
        }}>
          Catálogo Completo
        </h2>
        <p style={{
          fontSize: "16px",
          color: "#6b7280",
          maxWidth: "500px",
          margin: "0 auto",
        }}>
          Descobre a nossa seleção de produtos personalizados
        </p>
      </div>

      {/* Category Filter */}
      <div style={{
        display: "flex",
        gap: "12px",
        justifyContent: "center",
        flexWrap: "wrap",
        marginBottom: "40px",
      }}>
        <button
          onClick={() => setSelectedCategory(null)}
          style={{
            padding: "10px 20px",
            borderRadius: "8px",
            border: selectedCategory === null ? "2px solid #2B4EAF" : "2px solid #e5e7eb",
            backgroundColor: selectedCategory === null ? "#2B4EAF" : "white",
            color: selectedCategory === null ? "white" : "#374151",
            fontWeight: 600,
            cursor: "pointer",
            fontSize: "14px",
            fontFamily: "Montserrat, sans-serif",
            transition: "all 0.2s ease",
          }}
        >
          Todos
        </button>
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            style={{
              padding: "10px 20px",
              borderRadius: "8px",
              border: selectedCategory === cat ? "2px solid #2B4EAF" : "2px solid #e5e7eb",
              backgroundColor: selectedCategory === cat ? "#2B4EAF" : "white",
              color: selectedCategory === cat ? "white" : "#374151",
              fontWeight: 600,
              cursor: "pointer",
              fontSize: "14px",
              fontFamily: "Montserrat, sans-serif",
              transition: "all 0.2s ease",
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Products Grid */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
        gap: "24px",
      }}>
        {filteredProducts.map(product => (
          <div
            key={product.id}
            style={{
              backgroundColor: "white",
              borderRadius: "12px",
              border: "1px solid #e5e7eb",
              overflow: "hidden",
              transition: "all 0.3s ease",
              boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
            }}
            onMouseEnter={e => {
              e.currentTarget.style.boxShadow = "0 10px 25px rgba(0,0,0,0.15)";
              e.currentTarget.style.transform = "translateY(-4px)";
            }}
            onMouseLeave={e => {
              e.currentTarget.style.boxShadow = "0 1px 3px rgba(0,0,0,0.1)";
              e.currentTarget.style.transform = "translateY(0)";
            }}
          >
            {/* Image */}
            <div style={{
              width: "100%",
              height: "200px",
              backgroundColor: "#f3f4f6",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              overflow: "hidden",
            }}>
              <img
                src={product.image}
                alt={product.name}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />
            </div>

            {/* Content */}
            <div style={{ padding: "16px" }}>
              <div style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "start",
                marginBottom: "8px",
              }}>
                <h3 style={{
                  fontFamily: "Montserrat, sans-serif",
                  fontSize: "15px",
                  fontWeight: 700,
                  color: "#1a1a2e",
                  margin: 0,
                  flex: 1,
                }}>
                  {product.name}
                </h3>
              </div>

              <p style={{
                fontSize: "13px",
                color: "#9ca3af",
                margin: "0 0 8px 0",
                fontFamily: "Montserrat, sans-serif",
              }}>
                {product.category}
              </p>

              <p style={{
                fontSize: "13px",
                color: "#6b7280",
                margin: "0 0 12px 0",
                lineHeight: 1.5,
              }}>
                {product.description}
              </p>

              <div style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}>
                <span style={{
                  fontSize: "20px",
                  fontWeight: 800,
                  color: "#2B4EAF",
                  fontFamily: "Montserrat, sans-serif",
                }}>
                  €{product.price.toFixed(2)}
                </span>
                <a
                  href={WA_MSG(`Olá! Gostava de encomendar: ${product.name} (${product.id}) - €${product.price.toFixed(2)}`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    padding: "8px 12px",
                    backgroundColor: "#25D366",
                    color: "white",
                    borderRadius: "6px",
                    textDecoration: "none",
                    fontSize: "12px",
                    fontWeight: 700,
                    fontFamily: "Montserrat, sans-serif",
                    transition: "all 0.2s ease",
                    display: "inline-block",
                  }}
                  onMouseEnter={e => e.currentTarget.style.backgroundColor = "#1fa857"}
                  onMouseLeave={e => e.currentTarget.style.backgroundColor = "#25D366"}
                >
                  Encomendar
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
