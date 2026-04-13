import { Heart, MessageCircle, Palette, ShieldCheck, Sparkles, Instagram, Facebook } from "lucide-react";
import { Link } from "wouter";
import { siteConfig } from "@/lib/site";

export default function About() {
  const openWhatsApp = (message = siteConfig.whatsappDefaultMessage) => {
    const encoded = encodeURIComponent(message);
    window.open(`https://wa.me/${siteConfig.whatsappNumber}?text=${encoded}`, "_blank");
  };

  return (
    <div className="min-h-screen bg-[#fffaf6] text-[#2f3640]">
      <header className="border-b border-black/5 bg-white/90 backdrop-blur">
        <div className="container flex items-center justify-between py-4 gap-4">
          <Link href="/" className="flex items-center gap-3">
            <img src="/logo-ninho.jpg" alt="Ninho do Dragão" className="h-14 w-14 rounded-full object-cover shadow-md" />
            <div>
              <p className="font-semibold text-sm text-[#d17c26] uppercase tracking-[0.2em]">Ninho do Dragão</p>
              <p className="text-sm text-gray-500">Damos forma aos teus momentos</p>
            </div>
          </Link>
          <div className="flex items-center gap-3">
            <a href={siteConfig.instagram} target="_blank" rel="noreferrer" className="inline-flex items-center justify-center h-11 w-11 rounded-full border border-[#ecdcc7] text-[#3d4a57] hover:text-[#d17c26] hover:border-[#d17c26] transition" aria-label="Instagram">
              <Instagram className="w-5 h-5" />
            </a>
            <a href={siteConfig.facebook} target="_blank" rel="noreferrer" className="inline-flex items-center justify-center h-11 w-11 rounded-full border border-[#ecdcc7] text-[#3d4a57] hover:text-[#d17c26] hover:border-[#d17c26] transition" aria-label="Facebook">
              <Facebook className="w-5 h-5" />
            </a>
            <Link href="/" className="text-sm font-medium text-[#3d4a57] hover:text-[#d17c26]">Voltar ao início</Link>
          </div>
        </div>
      </header>

      <section className="bg-[radial-gradient(circle_at_top,_rgba(255,176,73,0.20),_transparent_38%),linear-gradient(135deg,#1f2732_0%,#283446_55%,#131921_100%)] text-white">
        <div className="container py-18 md:py-24 grid lg:grid-cols-2 gap-10 items-center">
          <div className="space-y-5">
            <p className="text-[#ffb649] font-semibold uppercase tracking-[0.25em] text-sm">Sobre nós</p>
            <h1 className="text-5xl md:text-6xl font-bold leading-tight text-white">
              Uma marca feita de afeto, criatividade e intenção.
            </h1>
            <p className="text-lg text-white/80 leading-relaxed max-w-2xl">
              A Ninho do Dragão nasce da vontade de criar artigos personalizados com significado. Não fazemos apenas peças bonitas — criamos detalhes que celebram pessoas, histórias e momentos especiais.
            </p>
            <button
              onClick={() => openWhatsApp("Olá! Quero conhecer melhor a Ninho do Dragão e fazer uma encomenda.")}
              className="btn-primary flex items-center gap-2"
            >
              <MessageCircle className="w-4 h-4" />
              Falar connosco
            </button>
          </div>

          <div className="rounded-[2rem] border border-white/10 bg-white/8 p-4 shadow-2xl backdrop-blur-sm">
            <img src="/logo-ninho.jpg" alt="Logótipo Ninho do Dragão" className="w-full rounded-[1.5rem] object-cover max-h-[560px]" />
          </div>
        </div>
      </section>

      <section className="section-py bg-white">
        <div className="container grid lg:grid-cols-2 gap-10 items-start">
          <div className="space-y-5">
            <p className="text-[#d17c26] font-semibold uppercase tracking-[0.25em] text-sm">A nossa essência</p>
            <h2 className="heading-lg">Cada encomenda é tratada como se fosse para alguém da nossa casa</h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              Gostamos de ouvir a ideia por trás de cada pedido, perceber a emoção do momento e transformar tudo isso num artigo que faça sentido. Seja uma t-shirt para a escola, uma caneca para oferecer, um kit de festa ou um presente de família, o objetivo é sempre o mesmo: criar algo especial.
            </p>
            <p className="text-lg text-gray-600 leading-relaxed">
              Trabalhamos com personalização para crianças e adultos, sempre com atenção ao detalhe, ao acabamento e ao carinho em cada fase do processo.
            </p>
          </div>

          <div className="grid gap-5">
            {[
              {
                icon: Heart,
                title: "Atendimento próximo",
                text: "Falamos contigo de forma humana, simples e sem respostas frias. Queremos perceber exatamente o que imaginas.",
              },
              {
                icon: Palette,
                title: "Criatividade com identidade",
                text: "Cada peça é adaptada ao tema, à pessoa e à ocasião para que o resultado tenha personalidade própria.",
              },
              {
                icon: ShieldCheck,
                title: "Cuidado no acabamento",
                text: "Privilegiamos apresentação bonita, materiais adequados e um resultado digno de ser oferecido.",
              },
            ].map((item) => (
              <div key={item.title} className="card-premium flex gap-4 items-start">
                <div className="icon-box"><item.icon className="w-6 h-6 text-white" /></div>
                <div>
                  <h3 className="text-xl font-semibold text-[#3d4a57] mb-2">{item.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{item.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-py bg-gradient-soft">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center space-y-4 mb-12">
            <p className="text-[#d17c26] font-semibold uppercase tracking-[0.25em] text-sm">O que nos move</p>
            <h2 className="heading-lg">Mais do que vender, queremos marcar presença nos teus momentos</h2>
            <p className="text-lg text-gray-600">
              Há peças que ficam guardadas. Outras são usadas todos os dias. As melhores conseguem fazer as duas coisas ao mesmo tempo.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              "Celebrar pessoas com detalhes feitos à medida.",
              "Ajudar marcas, famílias e festas a terem identidade própria.",
              "Criar artigos que emocionam, surpreendem e permanecem na memória.",
            ].map((text, index) => (
              <div key={index} className="rounded-3xl bg-white p-8 shadow-sm border border-[#f3e2d1]">
                <Sparkles className="w-8 h-8 text-[#d17c26] mb-5" />
                <p className="text-lg text-gray-700 leading-relaxed">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
