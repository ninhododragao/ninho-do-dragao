import { Heart, MessageCircle, Gift, Sparkles, Shirt, Package, Star, Instagram, Facebook, CheckCircle2, Clock3, ArrowRight, ShieldHeart } from "lucide-react";
import { Link } from "wouter";
import { featuredCategories, priceHighlights, textileCatalog, mothersDayHighlights, siteConfig } from "@/lib/site";

export default function Home() {
  const openWhatsApp = (message = siteConfig.whatsappDefaultMessage) => {
    const encoded = encodeURIComponent(message);
    window.open(`https://wa.me/${siteConfig.whatsappNumber}?text=${encoded}`, "_blank");
  };

  return (
    <div className="min-h-screen bg-[#fffaf6] text-[#2f3640]">
      <header className="sticky top-0 z-50 border-b border-black/5 bg-white/90 backdrop-blur">
        <div className="container flex items-center justify-between py-4 gap-4">
          <Link href="/" className="flex items-center gap-3 min-w-0">
            <img src="/logo-ninho.jpg" alt="Ninho do Dragão" className="h-14 w-14 rounded-full object-cover shadow-md" />
            <div className="min-w-0">
              <p className="font-semibold text-sm text-[#d17c26] uppercase tracking-[0.2em]">Ninho do Dragão</p>
              <p className="text-sm text-gray-500 truncate">Damos forma aos teus momentos</p>
            </div>
          </Link>

          <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-[#3d4a57]">
            <a href="#dia-da-mae" className="hover:text-[#d17c26] transition">Dia da Mãe</a>
            <a href="#catalogo" className="hover:text-[#d17c26] transition">Catálogo</a>
            <a href="#tamanhos" className="hover:text-[#d17c26] transition">Tamanhos</a>
            <a href="#redes" className="hover:text-[#d17c26] transition">Redes</a>
            <Link href="/sobre-nos" className="hover:text-[#d17c26] transition">Sobre nós</Link>
          </nav>

          <div className="flex items-center gap-2 sm:gap-3">
            <a href={siteConfig.instagram} target="_blank" rel="noreferrer" className="hidden sm:inline-flex items-center justify-center h-11 w-11 rounded-full border border-[#ecdcc7] text-[#3d4a57] hover:text-[#d17c26] hover:border-[#d17c26] transition" aria-label="Instagram">
              <Instagram className="w-5 h-5" />
            </a>
            <a href={siteConfig.facebook} target="_blank" rel="noreferrer" className="hidden sm:inline-flex items-center justify-center h-11 w-11 rounded-full border border-[#ecdcc7] text-[#3d4a57] hover:text-[#d17c26] hover:border-[#d17c26] transition" aria-label="Facebook">
              <Facebook className="w-5 h-5" />
            </a>
            <button onClick={() => openWhatsApp()} className="btn-primary flex items-center gap-2">
              <MessageCircle className="w-4 h-4" />
              <span className="hidden sm:inline">Encomendar</span>
            </button>
          </div>
        </div>
      </header>

      <section className="relative overflow-hidden bg-[radial-gradient(circle_at_top,_rgba(255,176,73,0.28),_transparent_35%),linear-gradient(135deg,#1d2430_0%,#283446_50%,#10151d_100%)] text-white">
        <div className="absolute inset-0 opacity-20 [background-image:radial-gradient(circle_at_20%_20%,white_0,transparent_2px),radial-gradient(circle_at_80%_30%,white_0,transparent_2px),radial-gradient(circle_at_60%_80%,white_0,transparent_2px)]"></div>
        <div className="container py-18 md:py-24 grid md:grid-cols-2 gap-10 items-center relative">
          <div className="space-y-7">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-medium border border-white/10">
              <Heart className="w-4 h-4 text-[#ffb649]" />
              Personalizados criados com sentimento
            </span>

            <div className="space-y-4">
              <h1 className="text-5xl md:text-6xl font-bold leading-tight text-white">
                Transformamos momentos em memórias únicas.
              </h1>
              <p className="text-lg md:text-xl text-white/80 max-w-xl leading-relaxed">
                Presentes personalizados feitos com carinho para quem mais importa. Cada peça nasce com intenção, detalhe e emoção — para oferecer, guardar e recordar.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => openWhatsApp("Olá! Vi o site da Ninho do Dragão e quero encomendar um presente personalizado 💛")}
                className="btn-primary flex items-center justify-center gap-2 text-base"
              >
                <MessageCircle className="w-5 h-5" />
                Encomendar no WhatsApp
              </button>
              <a href="#dia-da-mae" className="btn-outline flex items-center justify-center gap-2 text-base">
                <Gift className="w-5 h-5" />
                Ver presentes Dia da Mãe
              </a>
            </div>

            <div className="grid sm:grid-cols-3 gap-4 pt-4">
              {[
                "Adulto e infantil",
                "Atendimento próximo e humano",
                `Encomendas até ${siteConfig.mothersDayOrderDeadline}`,
              ].map((item) => (
                <div key={item} className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-white/85">
                  {item}
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="absolute inset-0 rounded-[2rem] bg-[#ffb649]/20 blur-3xl"></div>
            <div className="relative rounded-[2rem] border border-white/10 bg-white/8 p-4 shadow-2xl backdrop-blur-sm">
              <img src="/logo-ninho.jpg" alt="Logótipo Ninho do Dragão" className="w-full rounded-[1.5rem] object-cover max-h-[560px]" />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white border-b border-[#f3e2d1]">
        <div className="container py-5 grid md:grid-cols-3 gap-4">
          {[
            { icon: ShieldHeart, text: "Peças pensadas para emocionar" },
            { icon: CheckCircle2, text: "Valores claros e encomenda simples" },
            { icon: Clock3, text: "Resposta rápida pelo WhatsApp" },
          ].map((item) => (
            <div key={item.text} className="flex items-center gap-3 rounded-2xl bg-[#fff7ef] px-4 py-4 border border-[#f3e2d1]">
              <item.icon className="w-5 h-5 text-[#d17c26]" />
              <p className="text-sm md:text-base text-[#3d4a57] font-medium">{item.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="dia-da-mae" className="section-py bg-[linear-gradient(135deg,#fff8f1_0%,#fff0e1_50%,#fffaf6_100%)]">
        <div className="container">
          <div className="rounded-[2rem] bg-white border border-[#f2dfcb] shadow-sm p-8 md:p-10 mb-10">
            <div className="grid lg:grid-cols-[1.35fr_0.9fr] gap-8 items-center">
              <div className="space-y-5">
                <p className="text-[#d17c26] font-semibold uppercase tracking-[0.25em] text-sm">Campanha Dia da Mãe</p>
                <h2 className="heading-lg">Há presentes que dizem tudo sem uma palavra.</h2>
                <p className="text-lg text-gray-600 leading-relaxed max-w-2xl">
                  Neste Dia da Mãe, cria uma peça única com nome, fotografia ou mensagem especial. Escolhe um presente pensado para emocionar e encomenda com tempo para o dia {siteConfig.mothersDayDate}.
                </p>
                <div className="flex flex-wrap gap-3">
                  <span className="inline-flex rounded-full bg-[#fff4e8] px-4 py-2 text-sm font-medium text-[#a9661f] border border-[#f3dcc0]">Encomendas até {siteConfig.mothersDayOrderDeadline}</span>
                  <span className="inline-flex rounded-full bg-[#fff4e8] px-4 py-2 text-sm font-medium text-[#a9661f] border border-[#f3dcc0]">Personalizado ao teu gosto</span>
                </div>
                <div className="flex flex-col sm:flex-row gap-4 pt-2">
                  <button onClick={() => openWhatsApp("Olá! Vi a campanha do Dia da Mãe no site e quero encomendar uma prenda especial 💐")}
                    className="btn-primary flex items-center justify-center gap-2 text-base">
                    <MessageCircle className="w-5 h-5" />
                    Encomendar prenda da mãe
                  </button>
                  <a href="#catalogo" className="btn-secondary flex items-center justify-center gap-2 text-base">
                    <Gift className="w-5 h-5" />
                    Ver restantes produtos
                  </a>
                </div>
              </div>
              <div className="rounded-[1.75rem] bg-[#24303d] text-white p-6 md:p-8">
                <p className="text-[#ffb649] font-semibold uppercase tracking-[0.2em] text-sm mb-4">Sugestões com mais procura</p>
                <div className="space-y-4">
                  {mothersDayHighlights.map((item) => (
                    <div key={item.label} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <p className="font-semibold text-lg">{item.label}</p>
                          <p className="text-white/75 text-sm mt-1 leading-relaxed">{item.description}</p>
                        </div>
                        <span className="text-[#ffcf86] font-semibold whitespace-nowrap">{item.value}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-py bg-white">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center space-y-4 mb-12">
            <p className="text-[#d17c26] font-semibold uppercase tracking-[0.25em] text-sm">Porque escolhem a Ninho do Dragão</p>
            <h2 className="heading-lg">Um catálogo com alma, pensado para vender sem perder o coração</h2>
            <p className="text-lg text-gray-600">
              Aqui o cliente percebe rapidamente o que fazes, quanto custa e como encomendar — mas sem sentir que está num site frio ou genérico.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            {[
              { icon: Shirt, title: "Têxteis", text: "Modelos para adulto e infantil, com uma ou duas estampas." },
              { icon: Gift, title: "Presentes", text: "Peças úteis e emocionais para oferecer em qualquer ocasião." },
              { icon: Package, title: "Festas", text: "Detalhes personalizados para tornar cada evento inesquecível." },
              { icon: Sparkles, title: "Personalização", text: "Cada encomenda é adaptada à ideia, nome, tema ou mensagem." },
            ].map((item) => (
              <div key={item.title} className="card-premium text-center space-y-4">
                <div className="icon-box mx-auto"><item.icon className="w-6 h-6 text-white" /></div>
                <h3 className="text-xl font-semibold text-[#3d4a57]">{item.title}</h3>
                <p className="text-gray-600 leading-relaxed">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="catalogo" className="section-py bg-gradient-soft">
        <div className="container">
          <div className="max-w-3xl space-y-4 mb-10">
            <p className="text-[#d17c26] font-semibold uppercase tracking-[0.25em] text-sm">Catálogo principal</p>
            <h2 className="heading-lg">Artigos personalizados para oferecer, usar e guardar na memória</h2>
            <p className="text-lg text-gray-600">
              Escolhe a categoria certa para a ocasião. Tudo foi pensado para simplificar a tua decisão e ajudar-te a vender melhor.
            </p>
          </div>

          <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6 mb-12">
            {featuredCategories.map((category) => (
              <div key={category.title} className="rounded-[1.75rem] bg-white p-6 shadow-sm border border-[#f3e2d1]">
                <p className="text-sm uppercase tracking-[0.2em] text-[#d17c26] font-semibold mb-3">Categoria</p>
                <h3 className="text-2xl font-semibold text-[#3d4a57] mb-3">{category.title}</h3>
                <p className="text-gray-600 leading-relaxed">{category.description}</p>
              </div>
            ))}
          </div>

          <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">
            {priceHighlights.map((item) => (
              <div key={item.label} className="rounded-[1.75rem] bg-white p-6 shadow-sm border border-[#f3e2d1]">
                <p className="text-sm uppercase tracking-[0.2em] text-gray-500 mb-3">{item.label}</p>
                <p className="text-3xl font-semibold text-[#d17c26]">{item.value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="tamanhos" className="section-py bg-white">
        <div className="container">
          <div className="max-w-3xl space-y-4 mb-10">
            <p className="text-[#d17c26] font-semibold uppercase tracking-[0.25em] text-sm">Tamanhos e preços</p>
            <h2 className="heading-lg">Adulto e infantil no mesmo catálogo</h2>
            <p className="text-lg text-gray-600">
              Assim o cliente percebe logo que há opções para toda a família, com valores organizados de forma clara e fácil de consultar.
            </p>
          </div>

          <div className="space-y-6">
            {textileCatalog.map((item) => (
              <div key={item.name} className="rounded-[2rem] border border-[#f3e2d1] bg-[#fffaf6] p-6 md:p-8 shadow-sm">
                <div className="grid lg:grid-cols-[1.1fr_1fr_1fr] gap-6">
                  <div>
                    <h3 className="text-2xl font-semibold text-[#3d4a57]">{item.name}</h3>
                    <p className="text-gray-600 mt-3 leading-relaxed">{item.note}</p>
                    <button
                      onClick={() => openWhatsApp(`Olá! Quero informações sobre ${item.name.toLowerCase()} 😊`)}
                      className="mt-5 inline-flex items-center gap-2 text-[#d17c26] font-semibold hover:gap-3 transition-all"
                    >
                      Pedir este artigo
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="rounded-2xl bg-white p-5 border border-[#f4e8dc]">
                    <p className="text-sm font-semibold uppercase tracking-wide text-[#d17c26] mb-3">Adulto</p>
                    <p className="text-gray-700"><strong>Tamanhos:</strong> {item.adultSizes}</p>
                    <p className="text-gray-700 mt-2"><strong>1 estampa:</strong> {item.adultOnePrint}</p>
                    <p className="text-gray-700 mt-2"><strong>2 estampas:</strong> {item.adultTwoPrints}</p>
                  </div>

                  <div className="rounded-2xl bg-white p-5 border border-[#f4e8dc]">
                    <p className="text-sm font-semibold uppercase tracking-wide text-[#d17c26] mb-3">Infantil</p>
                    <p className="text-gray-700"><strong>Tamanhos:</strong> {item.childSizes}</p>
                    <p className="text-gray-700 mt-2"><strong>Preço:</strong> {item.childPrice}</p>
                    <p className="text-sm text-gray-500 mt-3">Ideal para escola, família, visitas de estudo e presentes personalizados.</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-py bg-[linear-gradient(135deg,#fff4e8_0%,#ffffff_50%,#fff8f1_100%)]">
        <div className="container grid lg:grid-cols-2 gap-8 items-center">
          <div className="space-y-4">
            <p className="text-[#d17c26] font-semibold uppercase tracking-[0.25em] text-sm">Como funciona</p>
            <h2 className="heading-lg">Tu imaginas. Nós damos forma.</h2>
            <div className="space-y-4 text-lg text-gray-600">
              <p><strong>1.</strong> Envias a tua ideia, tema, nome ou fotografia.</p>
              <p><strong>2.</strong> Recebes orientação e proposta adaptada ao artigo.</p>
              <p><strong>3.</strong> A peça é criada com cuidado e preparada para te surpreender.</p>
            </div>
          </div>

          <div className="rounded-[2rem] bg-[#24303d] text-white p-8 shadow-xl">
            <Star className="w-8 h-8 text-[#ffb649] mb-5" />
            <h3 className="text-3xl font-semibold mb-4">Segue-nos e acompanha novidades, campanhas e inspirações</h3>
            <p className="text-white/80 text-lg leading-relaxed mb-6">
              O site já ficou ligado ao WhatsApp, Instagram e Facebook para facilitar o contacto e transformar visitas em encomendas.
            </p>
            <div className="flex flex-wrap gap-3 mb-6">
              <a href={siteConfig.instagram} target="_blank" rel="noreferrer" className="btn-outline flex items-center gap-2">
                <Instagram className="w-4 h-4" />
                Instagram
              </a>
              <a href={siteConfig.facebook} target="_blank" rel="noreferrer" className="btn-outline flex items-center gap-2">
                <Facebook className="w-4 h-4" />
                Facebook
              </a>
            </div>
            <button
              onClick={() => openWhatsApp("Olá! Quero avançar com uma encomenda na Ninho do Dragão. 😊")}
              className="btn-primary flex items-center gap-2"
            >
              <MessageCircle className="w-4 h-4" />
              Encomendar agora
            </button>
          </div>
        </div>
      </section>

      <section className="section-py bg-white">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center space-y-4 mb-10">
            <p className="text-[#d17c26] font-semibold uppercase tracking-[0.25em] text-sm">Confiança</p>
            <h2 className="heading-lg">Criado para aproximar, emocionar e vender</h2>
            <p className="text-lg text-gray-600">
              Uma marca pequena pode ter presença forte quando comunica com verdade. Este site foi pensado exatamente para isso.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              "Textos mais emocionais e mais claros para venda.",
              "Campanha Dia da Mãe em destaque logo na entrada.",
              "Botões de contacto sempre visíveis para converter melhor.",
            ].map((text, index) => (
              <div key={index} className="testimonial-card">
                <p className="text-lg text-[#3d4a57] leading-relaxed">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer id="redes" className="bg-[#1d2430] text-white py-10">
        <div className="container flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div>
            <p className="font-semibold uppercase tracking-[0.2em] text-[#ffb649] text-sm">Ninho do Dragão</p>
            <p className="text-white/70 mt-2 max-w-xl">Personalizados com alma para celebrar pessoas, momentos e memórias.</p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <a href={siteConfig.instagram} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-2 text-white/85 hover:text-white hover:border-[#ffb649] transition">
              <Instagram className="w-4 h-4" />
              {siteConfig.instagramHandle}
            </a>
            <a href={siteConfig.facebook} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-2 text-white/85 hover:text-white hover:border-[#ffb649] transition">
              <Facebook className="w-4 h-4" />
              Facebook
            </a>
            <button onClick={() => openWhatsApp()} className="btn-primary flex items-center gap-2">
              <MessageCircle className="w-4 h-4" />
              WhatsApp
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
