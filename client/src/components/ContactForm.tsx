import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Send, CheckCircle, AlertCircle } from "lucide-react";

/**
 * Design: Artesanal Mágico
 * Componente de formulário de contacto reutilizável
 */

interface ContactFormProps {
  title?: string;
  subtitle?: string;
}

export default function ContactForm({ 
  title = "Entra em Contacto",
  subtitle = "Estamos aqui para ajudar. Envia-nos uma mensagem!"
}: ContactFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setError("");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validação básica
    if (
      !formData.name ||
      !formData.email ||
      !formData.subject ||
      !formData.message
    ) {
      setError("Por favor, preenche todos os campos obrigatórios.");
      return;
    }

    // Criar mensagem para WhatsApp
    const whatsappMessage = encodeURIComponent(
      `Olá! Tenho uma mensagem para vós:\n\nNome: ${formData.name}\nEmail: ${formData.email}\nTelefone: ${formData.phone || "Não fornecido"}\nAssunto: ${formData.subject}\n\nMensagem:\n${formData.message}`
    );

    // Abrir WhatsApp
    window.open(
      `https://wa.me/351XXXXXXXXX?text=${whatsappMessage}`,
      "_blank"
    );

    // Mostrar mensagem de sucesso
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      });
    }, 3000);
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* Header */}
      <div className="text-center mb-8 space-y-2">
        <h2 className="text-3xl font-bold text-primary">{title}</h2>
        <p className="text-muted-foreground">{subtitle}</p>
      </div>

      {/* Form */}
      {!submitted ? (
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Error Message */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex gap-3">
              <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-red-700">{error}</p>
            </div>
          )}

          {/* Name and Email */}
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-primary">
                Nome *
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg border border-border bg-white focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all"
                placeholder="O teu nome"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-semibold text-primary">
                Email *
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg border border-border bg-white focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all"
                placeholder="teu@email.com"
              />
            </div>
          </div>

          {/* Phone and Subject */}
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-primary">
                Telefone
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg border border-border bg-white focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all"
                placeholder="+351 9XX XXX XXX"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-semibold text-primary">
                Assunto *
              </label>
              <select
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg border border-border bg-white focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all"
              >
                <option value="">Seleciona um assunto</option>
                <option value="Dúvida sobre produtos">
                  Dúvida sobre produtos
                </option>
                <option value="Encomenda personalizada">
                  Encomenda personalizada
                </option>
                <option value="Sugestão">Sugestão</option>
                <option value="Reclamação">Reclamação</option>
                <option value="Outro">Outro</option>
              </select>
            </div>
          </div>

          {/* Message */}
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-primary">
              Mensagem *
            </label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows={6}
              className="w-full px-4 py-3 rounded-lg border border-border bg-white focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all resize-none"
              placeholder="Escreve a tua mensagem aqui..."
            />
          </div>

          {/* Info */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p className="text-xs text-muted-foreground">
              <span className="font-semibold text-primary">Nota:</span> Após submeter este formulário, serás redirecionado para WhatsApp onde poderemos continuar a conversa. Responderemos o mais breve possível.
            </p>
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            className="btn-magical w-full gap-2 py-3 text-base"
          >
            <Send className="w-4 h-4" />
            Enviar Mensagem
          </Button>
        </form>
      ) : (
        /* Success Message */
        <div className="card-magical p-12 text-center space-y-6">
          <div className="flex justify-center">
            <CheckCircle className="w-20 h-20 text-green-500" />
          </div>
          <div className="space-y-3">
            <h3 className="text-3xl font-bold text-primary">Obrigado!</h3>
            <p className="text-lg text-muted-foreground">
              A tua mensagem foi enviada com sucesso.
            </p>
            <p className="text-muted-foreground">
              Serás redirecionado para WhatsApp onde poderemos continuar a conversa.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
