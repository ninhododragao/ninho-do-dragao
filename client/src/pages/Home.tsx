import { Button } from "@/components/ui/button";
import { Mail, MapPin, Phone, Instagram, Facebook, Heart } from "lucide-react";
import { useState } from "react";

/**
 * Design Philosophy: Artesanato Alentejano Contemporâneo
 * - Warm Alentejo colors (ocre, terracota, olive green)
 * - Playfair Display for headers (serif, elegant)
 * - Poppins for body (clean, readable)
 * - Asymmetric layouts with generous whitespace
 * - Focus on craftsmanship and personalization
 * - Destaque: Dia da Mãe, Ovibeja 2026, Redes Sociais
 */

const playfairStyle = { fontFamily: '"Playfair Display", serif' };
const poppinsStyle = { fontFamily: '"Poppins", sans-serif' };

export default function Home() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  const mothersDayProducts = [
    { name: "Caneca Personalizada", price: "12,99€", emoji: "☕" },
    { name: "Garrafa Térmica", price: "16,99€", emoji: "🌡️" },
    { name: "Almofada Decorativa", price: "19,99€", emoji: "🛋️" },
    { name: "Manta Personalizada", price: "29,99€", emoji: "🧶" },
    { name: "T-shirt Especial", price: "19,99€", emoji: "👕" },
    { name: "Caixa Lembrança", price: "desde 2€", emoji: "🎁" }
  ];

  const socialPosts = [
    { platform: "Instagram", likes: "245", comments: "18", content: "Kit Peregrino - Tradição Alentejana" },
    { platform: "Facebook", likes: "156", comments: "12", content: "Sondagem: Qual o estilo da tua mãe?" },
    { platform: "Instagram", likes: "389", comments: "34", content: "Caneca Dia da Mãe - Personalizada" },
    { platform: "Facebook", likes: "201", comments: "15", content: "Bastidores: Cada detalhe conta" }
  ];

  return (
    <div className="min-h-screen bg-background text-foreground" style={poppinsStyle}>
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur border-b border-border">
        <div className="container flex items-center justify-between py-4">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
              <span className="text-primary-foreground text-lg">🐉</span>
            </div>
            <h1 className="font-bold text-xl text-foreground" style={playfairStyle}>Ninho do Dragão</h1>
          </div>
          <div className="hidden md:flex gap-8">
            <a href="#mae" className="text-sm font-medium hover:text-primary transition">Dia da Mãe</a>
            <a href="#produtos" className="text-sm font-medium hover:text-primary transition">Produtos</a>
            <a href="#ovibeja" className="text-sm font-medium hover:text-primary transition">Ovibeja 2026</a>
            <a href="#redes" className="text-sm font-medium hover:text-primary transition">Redes Sociais</a>
            <a href="#contacto" className="text-sm font-medium hover:text-primary transition">Contacto</a>
          </div>
        </div>
      </nav>

      {/* Hero Section - Assimétrico */}
      <section className="py-20 md:py-32 bg-gradient-to-br from-background via-background to-muted/30">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Texto à esquerda */}
            <div className="space-y-6">
              <div className="space-y-2">
                <p className="text-primary font-semibold tracking-wide uppercase text-sm">Bem-vindo ao Ninho do Dragão</p>
                <h1 className="text-5xl md:text-6xl font-bold leading-tight" style={playfairStyle}>
                  Personalização Artesanal que Conta Histórias
                </h1>
              </div>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Transformamos produtos simples em peças únicas através de sublimação e vinil. Cada criação é feita com precisão, cuidado e paixão pela tradição alentejana.
              </p>
              <div className="flex gap-4 pt-4">
                <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
                  Visita-nos na Ovibeja
                </Button>
                <Button size="lg" variant="outline" className="border-primary text-primary hover:bg-primary/10">
                  Saiba Mais
                </Button>
              </div>
            </div>
            {/* Imagem à direita */}
            <div className="relative h-96 md:h-full rounded-lg overflow-hidden shadow-2xl">
              <img
                src="https://d2xsxph8kpxj0f.cloudfront.net/310519663520925403/RjrWWnoYWZdN4j9NAk9t4j/hero_ovibeja_personalizacao-3aBoVaSkdwxUsbqrZFNJPg.webp"
                alt="Personalização ao vivo na Ovibeja"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/20 to-transparent"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Divisor Geométrico */}
      <div className="h-1 bg-gradient-to-r from-transparent via-primary to-transparent"></div>

      {/* DIA DA MÃE - DESTAQUE PRINCIPAL */}
      <section id="mae" className="py-20 md:py-32 bg-gradient-to-br from-red-50/50 via-background to-pink-50/30">
        <div className="container">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Heart className="w-8 h-8 text-red-500 fill-red-500" />
              <p className="text-red-600 font-semibold tracking-wide uppercase text-sm">Celebração Especial</p>
              <Heart className="w-8 h-8 text-red-500 fill-red-500" />
            </div>
            <h2 className="text-5xl md:text-6xl font-bold mb-4" style={playfairStyle}>
              Dia da Mãe 🌸
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Presenteia a melhor mãe do mundo com algo único e personalizado. Cada produto é feito com amor e dedicação.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {mothersDayProducts.map((product, idx) => (
              <div key={idx} className="p-6 bg-background rounded-lg border border-border hover:border-primary/50 hover:shadow-lg transition">
                <div className="text-5xl mb-4">{product.emoji}</div>
                <h3 className="font-bold text-lg mb-2" style={playfairStyle}>{product.name}</h3>
                <p className="text-primary font-semibold text-lg">{product.price}</p>
              </div>
            ))}
          </div>

          <div className="bg-gradient-to-r from-primary/10 to-secondary/10 p-8 rounded-lg border border-primary/20 text-center">
            <p className="text-lg font-semibold mb-4">Encomendas para o Dia da Mãe (5 de Maio)</p>
            <p className="text-muted-foreground mb-6">Aproveita os nossos designs exclusivos e personalizações especiais. Entrega rápida garantida!</p>
            <Button size="lg" className="bg-red-600 hover:bg-red-700 text-white">
              Encomendar Agora
            </Button>
          </div>
        </div>
      </section>

      {/* Divisor */}
      <div className="h-1 bg-gradient-to-r from-transparent via-secondary to-transparent"></div>

      {/* Sobre Section */}
      <section id="sobre" className="py-20 md:py-32">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center space-y-8">
            <div>
              <p className="text-primary font-semibold tracking-wide uppercase text-sm mb-2">Quem Somos</p>
              <h2 className="text-4xl md:text-5xl font-bold" style={playfairStyle}>Criadores de Momentos Únicos</h2>
            </div>
            <p className="text-lg text-muted-foreground leading-relaxed">
              O Ninho do Dragão nasceu da paixão pela criatividade e pela tradição alentejana. Especializamo-nos em transformar ideias em realidade através de técnicas modernas de personalização: sublimação térmica e corte em vinil.
            </p>
            <div className="grid md:grid-cols-2 gap-8 pt-8">
              <div className="p-6 bg-muted/50 rounded-lg border border-border">
                <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center mb-4">
                  <span className="text-2xl">🎨</span>
                </div>
                <h3 className="font-bold text-xl mb-2" style={playfairStyle}>Sublimação Térmica</h3>
                <p className="text-muted-foreground">Cores vibrantes e duráveis em canecas, garrafas e têxteis de poliéster.</p>
              </div>
              <div className="p-6 bg-muted/50 rounded-lg border border-border">
                <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center mb-4">
                  <span className="text-2xl">✂️</span>
                </div>
                <h3 className="font-bold text-xl mb-2" style={playfairStyle}>Corte em Vinil</h3>
                <p className="text-muted-foreground">Designs precisos e elegantes em t-shirts, sacos e superfícies rígidas.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Produtos Section */}
      <section id="produtos" className="py-20 md:py-32 bg-muted/20">
        <div className="container">
          <div className="text-center mb-16">
            <p className="text-primary font-semibold tracking-wide uppercase text-sm mb-2">Catálogo</p>
            <h2 className="text-4xl md:text-5xl font-bold" style={playfairStyle}>Produtos Personalizáveis</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Imagem à esquerda */}
            <div className="relative h-96 rounded-lg overflow-hidden shadow-lg">
              <img
                src="https://d2xsxph8kpxj0f.cloudfront.net/310519663520925403/RjrWWnoYWZdN4j9NAk9t4j/produtos_sublimacao_vinil-jnGNnN6D3uz3qZvoBKR689.webp"
                alt="Produtos personalizados"
                className="w-full h-full object-cover"
              />
            </div>
            {/* Texto à direita */}
            <div className="space-y-6">
              <div>
                <h3 className="text-3xl font-bold mb-4" style={playfairStyle}>Sublimação</h3>
                <ul className="space-y-3 text-muted-foreground">
                  <li className="flex items-start gap-3">
                    <span className="text-primary mt-1">•</span>
                    <span><strong>Canecas Esmaltadas</strong> - Perfeitas para presentes e merchandising</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-primary mt-1">•</span>
                    <span><strong>Garrafas Térmicas</strong> - Designs que aquecem o coração</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-primary mt-1">•</span>
                    <span><strong>Têxteis de Poliéster</strong> - Cores vibrantes que duram</span>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-3xl font-bold mb-4" style={playfairStyle}>Vinil</h3>
                <ul className="space-y-3 text-muted-foreground">
                  <li className="flex items-start gap-3">
                    <span className="text-primary mt-1">•</span>
                    <span><strong>T-shirts Personalizadas</strong> - Designs únicos e exclusivos</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-primary mt-1">•</span>
                    <span><strong>Sacos de Pano</strong> - Eco-friendly e elegantes</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-primary mt-1">•</span>
                    <span><strong>Acessórios Rígidos</strong> - Personalizações sem limites</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Divisor */}
      <div className="h-1 bg-gradient-to-r from-transparent via-primary to-transparent"></div>

      {/* Ovibeja 2026 Section - Destaque */}
      <section id="ovibeja" className="py-20 md:py-32 bg-gradient-to-br from-primary/10 via-background to-secondary/10">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Imagem à esquerda */}
            <div className="relative h-96 rounded-lg overflow-hidden shadow-2xl">
              <img
                src="https://d2xsxph8kpxj0f.cloudfront.net/310519663520925403/RjrWWnoYWZdN4j9NAk9t4j/stand_ovibeja_ambiente-2BoGUEZT3qH9iobGzHFLY8.webp"
                alt="Stand Ninho do Dragão na Ovibeja 2026"
                className="w-full h-full object-cover"
              />
            </div>
            {/* Texto à direita */}
            <div className="space-y-6">
              <div>
                <p className="text-primary font-semibold tracking-wide uppercase text-sm mb-2">Evento Especial</p>
                <h2 className="text-4xl md:text-5xl font-bold" style={playfairStyle}>Ovibeja 2026</h2>
              </div>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Visita-nos no maior evento agrícola e de artesanato de Portugal! No nosso stand, podes personalizar produtos ao vivo e levar para casa uma criação única, feita especialmente para ti.
              </p>
              <div className="space-y-4 pt-4">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-1">
                    <MapPin className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold">Localização do Stand</p>
                    <p className="text-muted-foreground text-sm">Pavilhão de Artesanato - Ovibeja 2026</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-lg">⏰</span>
                  </div>
                  <div>
                    <p className="font-semibold">Horário</p>
                    <p className="text-muted-foreground text-sm">Todos os dias da Ovibeja - 10h às 19h</p>
                  </div>
                </div>
              </div>
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground w-full md:w-auto">
                Saiba Mais Sobre a Ovibeja
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Redes Sociais Section */}
      <section id="redes" className="py-20 md:py-32 bg-muted/20">
        <div className="container">
          <div className="text-center mb-16">
            <p className="text-primary font-semibold tracking-wide uppercase text-sm mb-2">Segue-nos</p>
            <h2 className="text-4xl md:text-5xl font-bold mb-4" style={playfairStyle}>Redes Sociais</h2>
            <p className="text-lg text-muted-foreground">Acompanha as nossas criações, novidades e promoções exclusivas</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {socialPosts.map((post, idx) => (
              <div key={idx} className="p-6 bg-background rounded-lg border border-border hover:border-primary/50 transition">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    {post.platform === "Instagram" ? (
                      <Instagram className="w-5 h-5 text-pink-600" />
                    ) : (
                      <Facebook className="w-5 h-5 text-blue-600" />
                    )}
                    <span className="font-semibold">{post.platform}</span>
                  </div>
                </div>
                <p className="text-foreground font-medium mb-4">{post.content}</p>
                <div className="flex gap-6 text-sm text-muted-foreground">
                  <span>❤️ {post.likes} gostos</span>
                  <span>💬 {post.comments} comentários</span>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center">
            <p className="text-lg font-semibold mb-6">Segue-nos para mais inspiração!</p>
            <div className="flex gap-4 justify-center">
              <a href="https://instagram.com/ninhododragao.pt" target="_blank" rel="noopener noreferrer">
                <Button size="lg" variant="outline" className="border-pink-600 text-pink-600 hover:bg-pink-50">
                  <Instagram className="w-5 h-5 mr-2" />
                  Instagram
                </Button>
              </a>
              <a href="https://facebook.com/ninhododragao.pt" target="_blank" rel="noopener noreferrer">
                <Button size="lg" variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-50">
                  <Facebook className="w-5 h-5 mr-2" />
                  Facebook
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Processo Section */}
      <section className="py-20 md:py-32">
        <div className="container">
          <div className="text-center mb-16">
            <p className="text-primary font-semibold tracking-wide uppercase text-sm mb-2">Como Funciona</p>
            <h2 className="text-4xl md:text-5xl font-bold" style={playfairStyle}>O Processo Criativo</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { num: "01", title: "Escolhe o Design", desc: "Seleciona entre designs pré-definidos ou traz a tua própria criação" },
              { num: "02", title: "Personaliza", desc: "Adiciona nomes, datas, mensagens ou qualquer detalhe especial" },
              { num: "03", title: "Recebe", desc: "Em minutos, a tua peça única está pronta para levar para casa" }
            ].map((step, idx) => (
              <div key={idx} className="relative">
                <div className="p-6 bg-muted/50 rounded-lg border border-border h-full">
                  <div className="text-5xl font-bold text-primary/30 mb-4" style={playfairStyle}>{step.num}</div>
                  <h3 className="font-bold text-xl mb-2" style={playfairStyle}>{step.title}</h3>
                  <p className="text-muted-foreground">{step.desc}</p>
                </div>
                {idx < 2 && (
                  <div className="hidden md:block absolute top-1/2 -right-4 w-8 h-0.5 bg-primary/20 transform -translate-y-1/2"></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Divisor */}
      <div className="h-1 bg-gradient-to-r from-transparent via-primary to-transparent"></div>

      {/* Contacto Section */}
      <section id="contacto" className="py-20 md:py-32 bg-muted/20">
        <div className="container">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-12">
              <p className="text-primary font-semibold tracking-wide uppercase text-sm mb-2">Fale Connosco</p>
              <h2 className="text-4xl md:text-5xl font-bold" style={playfairStyle}>Contacto</h2>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                  <Phone className="w-6 h-6 text-primary-foreground" />
                </div>
                <div>
                  <p className="font-semibold mb-1">Telefone</p>
                  <p className="text-muted-foreground">+351 935 852 703</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                  <Mail className="w-6 h-6 text-primary-foreground" />
                </div>
                <div>
                  <p className="font-semibold mb-1">Email</p>
                  <p className="text-muted-foreground">info@ninhododragao.pt</p>
                </div>
              </div>
            </div>

            {/* Newsletter Form */}
            <form onSubmit={handleSubmit} className="bg-background p-8 rounded-lg border border-border">
              <h3 className="font-bold text-xl mb-4" style={playfairStyle}>Subscreve a Nossa Newsletter</h3>
              <div className="flex gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="O teu email"
                  className="flex-1 px-4 py-2 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                />
                <Button type="submit" className="bg-primary hover:bg-primary/90 text-primary-foreground">
                  Subscrever
                </Button>
              </div>
              {submitted && <p className="text-primary text-sm mt-2">Obrigado pela subscrição! 🎉</p>}
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-foreground text-background py-12">
        <div className="container">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
                  <span className="text-xl">🐉</span>
                </div>
                <h3 className="font-bold text-lg" style={playfairStyle}>Ninho do Dragão</h3>
              </div>
              <p className="text-background/80 text-sm">Personalização artesanal com tradição alentejana.</p>
            </div>
            <div>
              <p className="font-semibold mb-4">Links Rápidos</p>
              <ul className="space-y-2 text-sm text-background/80">
                <li><a href="#mae" className="hover:text-background transition">Dia da Mãe</a></li>
                <li><a href="#produtos" className="hover:text-background transition">Produtos</a></li>
                <li><a href="#ovibeja" className="hover:text-background transition">Ovibeja 2026</a></li>
                <li><a href="#redes" className="hover:text-background transition">Redes Sociais</a></li>
              </ul>
            </div>
            <div>
              <p className="font-semibold mb-4">Redes Sociais</p>
              <div className="flex gap-4">
                <a href="https://instagram.com/ninhododragao.pt" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-primary flex items-center justify-center hover:bg-primary/80 transition">
                  <Instagram className="w-5 h-5 text-primary-foreground" />
                </a>
                <a href="https://facebook.com/ninhododragao.pt" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-primary flex items-center justify-center hover:bg-primary/80 transition">
                  <Facebook className="w-5 h-5 text-primary-foreground" />
                </a>
              </div>
            </div>
          </div>
          <div className="border-t border-background/20 pt-8 text-center text-sm text-background/80">
            <p>&copy; 2026 Ninho do Dragão. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
