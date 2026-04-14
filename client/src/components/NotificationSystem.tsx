/*
 * Sistema de Notificações Personalizadas - Ninho do Dragão
 * Inclui: Newsletter, Toast Notifications, Banner de Promoção
 */

import { useState, useEffect } from "react";
import { toast } from "sonner";

// ─── Types ─────────────────────────────────────────────────────────────────────
interface Subscriber {
  email: string;
  code: string;
  subscribedAt: string;
}

// ─── Notification System ────────────────────────────────────────────────────────

// Gerar código de desconto único
function generateDiscountCode(): string {
  return `NINHO${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
}

// Guardar subscriber no localStorage
function saveSubscriber(email: string, code: string) {
  const subscribers = JSON.parse(localStorage.getItem("ninho_subscribers") || "[]");
  subscribers.push({
    email,
    code,
    subscribedAt: new Date().toISOString(),
  });
  localStorage.setItem("ninho_subscribers", JSON.stringify(subscribers));
}

// Verificar se email já está subscrito
function isEmailSubscribed(email: string): boolean {
  const subscribers = JSON.parse(localStorage.getItem("ninho_subscribers") || "[]");
  return subscribers.some((s: Subscriber) => s.email === email);
}

// Obter código de desconto do email
function getDiscountCode(email: string): string | null {
  const subscribers = JSON.parse(localStorage.getItem("ninho_subscribers") || "[]");
  const subscriber = subscribers.find((s: Subscriber) => s.email === email);
  return subscriber?.code || null;
}

// ─── Newsletter Form Component ──────────────────────────────────────────────────
export function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !email.includes("@")) {
      toast.error("Por favor, insere um email válido");
      return;
    }

    if (isEmailSubscribed(email)) {
      toast.info("Este email já está subscrito! 📧");
      return;
    }

    setLoading(true);

    // Simular envio para servidor
    setTimeout(() => {
      const code = generateDiscountCode();
      saveSubscriber(email, code);

      // Toast de boas-vindas
      toast.success("Bem-vindo ao Ninho do Dragão! 🎉", {
        description: `Código de desconto 10%: ${code}`,
        duration: 5000,
      });

      // Toast de confirmação
      setTimeout(() => {
        toast.info("Verifica o teu email para mais detalhes 📧", {
          duration: 4000,
        });
      }, 1500);

      setEmail("");
      setLoading(false);
    }, 1000);
  };

  return (
    <form onSubmit={handleSubscribe} style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
      <input
        type="email"
        placeholder="O teu email..."
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        disabled={loading}
        style={{
          flex: 1,
          minWidth: "200px",
          padding: "10px 16px",
          borderRadius: "8px",
          border: "2px solid #e2e8f0",
          fontSize: "14px",
          fontFamily: "Open Sans, sans-serif",
          transition: "all 0.2s ease",
        }}
        onFocus={(e) => (e.currentTarget.style.borderColor = "#2B4EAF")}
        onBlur={(e) => (e.currentTarget.style.borderColor = "#e2e8f0")}
      />
      <button
        type="submit"
        disabled={loading}
        style={{
          backgroundColor: "#2B4EAF",
          color: "white",
          padding: "10px 24px",
          borderRadius: "8px",
          border: "none",
          fontSize: "14px",
          fontWeight: 700,
          fontFamily: "Montserrat, sans-serif",
          cursor: loading ? "not-allowed" : "pointer",
          opacity: loading ? 0.7 : 1,
          transition: "all 0.2s ease",
        }}
        onMouseEnter={(e) => {
          if (!loading) {
            e.currentTarget.style.backgroundColor = "#1e3a8a";
          }
        }}
        onMouseLeave={(e) => {
          if (!loading) {
            e.currentTarget.style.backgroundColor = "#2B4EAF";
          }
        }}
      >
        {loading ? "A subscrever..." : "Subscrever"}
      </button>
    </form>
  );
}

// ─── Promotion Banner ──────────────────────────────────────────────────────────
export function PromotionBanner() {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  return (
    <div
      style={{
        backgroundColor: "#FEF3C7",
        borderBottom: "3px solid #C9A227",
        padding: "12px 24px",
        textAlign: "center",
        position: "relative",
        animation: "slideDown 0.3s ease",
      }}
    >
      <div style={{ maxWidth: "1200px", margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "16px", flexWrap: "wrap" }}>
        <div style={{ flex: 1, minWidth: "250px" }}>
          <p style={{
            fontSize: "15px",
            fontWeight: 700,
            color: "#92400e",
            fontFamily: "Montserrat, sans-serif",
            margin: 0,
          }}>
            🎉 <strong>Promoção Dia da Mãe!</strong> Subscreve à newsletter e recebe 10% de desconto na tua primeira encomenda
          </p>
        </div>
        <button
          onClick={() => setVisible(false)}
          aria-label="Fechar banner de promoção"
          style={{
            background: "none",
            border: "none",
            fontSize: "20px",
            cursor: "pointer",
            padding: "8px 12px",
            minWidth: "44px",
            minHeight: "44px",
            color: "#92400e",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          ✕
        </button>
      </div>

      <style>{`
        @keyframes slideDown {
          from {
            transform: translateY(-100%);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
}

// ─── Order Confirmation Toast ──────────────────────────────────────────────────
export function showOrderConfirmation() {
  toast.success("Encomenda recebida! 🎉", {
    description: "Obrigado! Entraremos em contacto em breve com mais detalhes.",
    duration: 5000,
  });

  setTimeout(() => {
    toast.info("Contactaremos dentro de 24h 📞", {
      description: "Estamos a processar a tua encomenda com cuidado.",
      duration: 4000,
    });
  }, 1500);
}

// ─── Promotion Toast ───────────────────────────────────────────────────────────
export function showPromotionNotification(title: string, description: string) {
  toast.info(title, {
    description,
    duration: 5000,
  });
}

// ─── Welcome Toast ─────────────────────────────────────────────────────────────
export function showWelcomeNotification(email: string) {
  const code = getDiscountCode(email);
  
  if (code) {
    toast.success(`Bem-vindo, ${email.split("@")[0]}! 👋`, {
      description: `Código de desconto: ${code} (10% de desconto)`,
      duration: 5000,
    });
  }
}
