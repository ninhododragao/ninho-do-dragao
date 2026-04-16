import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Send, CheckCircle } from "lucide-react";
import { Link } from "wouter";
import { getWhatsAppCustomOrderLink } from "@/lib/contact";

/**
 * Design: Artesanal Mágico
 * Página de compra personalizada com formulário de ideias
 */

export default function CustomOrder() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    productType: "",
    description: "",
    quantity: "1",
    budget: "",
    deadline: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);

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
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Criar mensagem para WhatsApp
    const whatsappLink = getWhatsAppCustomOrderLink({
      name: formData.name,
      productType: formData.productType,
      description: formData.description,
    });

    // Abrir WhatsApp
    window.open(whatsappLink, "_blank");
    
    // Mostrar mensagem de sucesso
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({
        name: "",
        email: "",
        phone: "",
        productType: "",
        description: "",
        quantity: "1",
        budget: "",
        deadline: "",
      });
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-background paper-texture">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-border shadow-sm">
        <div className="container flex items-center justify-between py-4">
          <Link href="/">
            <Button variant="ghost" size="sm" className="gap-2">
              <ArrowLeft className="w-4 h-4" />
              Voltar
            </Button>
          </Link>
          <h1 className="text-xl font-bold text-primary">Compra Personalizada</h1>
          <div className="w-10" />
        </div>
      </header>

      {/* Main Content */}
      <section className="container py-12">
        <div className="max-w-3xl mx-auto">
          {/* Intro */}
          <div className="text-center mb-12 space-y-3">
            <h2 className="text-4xl font-bold text-primary">
              Cria o Teu Artigo Personalizado
            </h2>
            <p className="text-lg text-muted-foreground">
              Descreve a tua ideia e entra em contacto connosco. Faremos um orçamento personalizado para o teu projeto.
            </p>
          </div>

          {/* Form */}
          {!submitted ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Personal Info */}
              <div className="card-magical p-8 space-y-6">
                <h3 className="text-2xl font-bold text-primary">Informações Pessoais</h3>

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
                      required
                      className="w-full px-4 py-3 rounded-lg border border-border bg-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                      placeholder="O teu nome completo"
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
                      required
                      className="w-full px-4 py-3 rounded-lg border border-border bg-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                      placeholder="teu@email.com"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-primary">
                      Telefone/WhatsApp *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-lg border border-border bg-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                      placeholder="+351 9XX XXX XXX"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-primary">
                      Tipo de Produto *
                    </label>
                    <select
                      name="productType"
                      value={formData.productType}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-lg border border-border bg-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                    >
                      <option value="">Seleciona um tipo</option>
                      <option value="textil">Têxtil (T-shirt, Hoodie, Sweat)</option>
                      <option value="presente">Presente (Caneca, Almofada, etc)</option>
                      <option value="festa">Kit Festa</option>
                      <option value="papelaria">Papelaria</option>
                      <option value="outro">Outro</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Project Details */}
              <div className="card-magical p-8 space-y-6">
                <h3 className="text-2xl font-bold text-primary">Detalhes do Projeto</h3>

                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-primary">
                    Descreve a Tua Ideia *
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 rounded-lg border border-border bg-white focus:outline-none focus:ring-2 focus:ring-orange-500 resize-none"
                    placeholder="Descreve detalhadamente o que desejas: cores, design, tamanho, quantidade, ocasião, etc. Quanto mais detalhe, melhor!"
                  />
                  <p className="text-xs text-muted-foreground">
                    Podes incluir referências, links, imagens ou qualquer informação que ajude a entender a tua visão.
                  </p>
                </div>

                <div className="grid md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-primary">
                      Quantidade *
                    </label>
                    <input
                      type="number"
                      name="quantity"
                      value={formData.quantity}
                      onChange={handleChange}
                      min="1"
                      required
                      className="w-full px-4 py-3 rounded-lg border border-border bg-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                      placeholder="1"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-primary">
                      Orçamento Estimado
                    </label>
                    <input
                      type="text"
                      name="budget"
                      value={formData.budget}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg border border-border bg-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                      placeholder="Ex: 50€ - 100€"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-primary">
                      Data Desejada
                    </label>
                    <input
                      type="date"
                      name="deadline"
                      value={formData.deadline}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg border border-border bg-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                  </div>
                </div>
              </div>

              {/* Privacy Notice */}
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-6 space-y-3">
                <p className="text-xs text-muted-foreground">
                  <span className="font-semibold text-primary">Privacidade:</span> Os teus dados pessoais serão utilizados apenas para processar a tua encomenda e comunicação relacionada. Consulta a nossa <a href="/privacidade" target="_blank" className="text-blue-600 underline">Política de Privacidade</a> para mais informações.
                </p>
              </div>

              {/* Terms Acceptance */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 space-y-4">
                <div className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    id="termsAccepted"
                    checked={termsAccepted}
                    onChange={(e) => setTermsAccepted(e.target.checked)}
                    required
                    className="mt-1 w-4 h-4 rounded border-border focus:ring-2 focus:ring-orange-500"
                  />
                  <label htmlFor="termsAccepted" className="text-sm text-muted-foreground">
                    Concordo com os <a href="/termos" target="_blank" className="text-blue-600 underline font-semibold">Termos e Condições</a> e <a href="/devolucoes" target="_blank" className="text-blue-600 underline font-semibold">Política de Devoluções</a>. Entendo que produtos personalizados não podem ser devolvidos por arrependimento. *
                  </label>
                </div>
                <p className="text-xs text-muted-foreground">
                  <span className="font-semibold text-primary">Próximos passos:</span> Após submeter este formulário, serás redirecionado para WhatsApp onde poderemos discutir os detalhes, design e enviar um orçamento personalizado.
                </p>
              </div>

              {/* Submit Button */}
              <div className="flex gap-4">
                <Button
                  type="submit"
                  disabled={!termsAccepted}
                  className="btn-magical flex-1 gap-2 py-6 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send className="w-5 h-5" />
                  Enviar Ideia
                </Button>
                <Link href="/">
                  <Button variant="outline" className="px-8 py-6">
                    Cancelar
                  </Button>
                </Link>
              </div>
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
                  A tua ideia foi recebida com sucesso!
                </p>
                <p className="text-muted-foreground">
                  Entraremos em contacto contigo em breve para discutir os detalhes e enviar um orçamento personalizado.
                </p>
              </div>
              <Link href="/">
                <Button className="btn-magical">Voltar ao Catálogo</Button>
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Info Section */}
      <section className="bg-gradient-to-r from-blue-900 to-purple-900 text-white py-16 mt-16">
        <div className="container">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="space-y-3">
              <h4 className="text-xl font-bold">Rápido</h4>
              <p className="text-blue-100">
                Resposta em até 24 horas com orçamento personalizado.
              </p>
            </div>
            <div className="space-y-3">
              <h4 className="text-xl font-bold">Personalizado</h4>
              <p className="text-blue-100">
                Cada projeto é único e desenvolvido especialmente para ti.
              </p>
            </div>
            <div className="space-y-3">
              <h4 className="text-xl font-bold">Qualidade</h4>
              <p className="text-blue-100">
                Materiais premium e acabamento artesanal em cada detalhe.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-8 mb-8 text-sm">
            <div className="space-y-2">
              <h4 className="font-bold text-base">Ninho do Dragão - by Makiwa</h4>
              <p className="text-gray-300">Laila Fernandes Chreim | NIF: 254047750</p>
              <p className="text-gray-300">Rua das Parreiras 4, 7800-655 Vila Azedo, Beja</p>
            </div>
            <div className="space-y-2">
              <h4 className="font-bold text-base">Contacto</h4>
              <p className="text-gray-300">Telefone: 925 865 347</p>
              <p className="text-gray-300">Email: makiwa.arts@gmail.com</p>
            </div>
          </div>
          <div className="border-t border-gray-700 pt-6 text-center text-gray-400 text-xs space-y-2">
            <div className="flex flex-wrap justify-center gap-4">
              <a href="/termos" className="hover:text-white">Termos</a>
              <span>•</span>
              <a href="/privacidade" className="hover:text-white">Privacidade</a>
              <span>•</span>
              <a href="/devolucoes" className="hover:text-white">Devoluções</a>
              <span>•</span>
              <a href="/livro-reclamacoes" className="hover:text-white">Reclamações</a>
            </div>
            <p>&copy; 2026 Ninho do Dragão. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
