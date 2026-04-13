import { Heart, MessageCircle, Gift, Sparkles, Shirt, Package, Star, Instagram, Facebook, CheckCircle2, Clock3, ArrowRight, ShieldCheck } from "lucide-react";
import { Link } from "wouter";
import { featuredCategories, priceHighlights, textileCatalog, mothersDayHighlights, siteConfig } from "@/lib/site";

export default function Home() {
  return (
    <div
      style={{
        padding: "20px",
        maxWidth: "900px",
        margin: "0 auto",
        textAlign: "center",
      }}
    >
      <h1 style={{ fontSize: "32px", fontWeight: "bold" }}>
        Peças personalizadas que guardam momentos únicos
      </h1>

      <p style={{ marginTop: "10px" }}>
        Criamos presentes com significado — feitos à tua medida para surpreender
        quem mais importa.
      </p>

      <p style={{ color: "green", marginTop: "10px" }}>
        ✔️ Resposta rápida no WhatsApp
      </p>

      <a href="https://wa.me/351935852703">
        <button
          style={{
            marginTop: "20px",
            padding: "15px 30px",
            backgroundColor: "#25D366",
            color: "white",
            border: "none",
            borderRadius: "8px",
            fontSize: "16px",
            cursor: "pointer",
          }}
        >
          Encomendar no WhatsApp
        </button>
      </a>

      <h2 style={{ marginTop: "60px" }}>“Damos forma aos teus momentos.”</h2>

      <h3 style={{ marginTop: "60px" }}>Personalização sem limites</h3>

      <p>T-shirts • Canecas • Almofadas • Presentes únicos</p>

      <h3 style={{ marginTop: "60px" }}>Porque escolher o Ninho do Dragão?</h3>

      <p>
        Feito com carinho • Design único • Entrega rápida • Atendimento próximo
      </p>

      <h3 style={{ marginTop: "60px", color: "red" }}>
        Encomendas abertas — vagas limitadas esta semana
      </h3>

      <h2 style={{ marginTop: "60px" }}>Tens uma ideia? Nós damos-lhe vida.</h2>

      <a href="https://wa.me/351935852703">
        <button
          style={{
            marginTop: "20px",
            padding: "15px 30px",
            backgroundColor: "#25D366",
            color: "white",
            border: "none",
            borderRadius: "8px",
            fontSize: "16px",
            cursor: "pointer",
          }}
        >
          Falar no WhatsApp agora
        </button>
      </a>
    </div>
  );
}
