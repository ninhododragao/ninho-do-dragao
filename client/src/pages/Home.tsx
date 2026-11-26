/*
 * Página inicial — simples: escolher a área → ver produtos → pedir.
 */
import { useEffect } from "react";
import Layout, { AZUL, DOURADO, FONTE, Imagem, WA_MSG } from "@/components/Layout";
import { AREAS, PRODUTOS, euro } from "@/data/loja";
import { NATAL_ATIVO, NATAL_PRAZO } from "@/pages/Catalogo";

const DESTAQUES = ["ND-PR-01", "ND-BB-01", "ND-EM-01", "ND-PR-05", "ND-FE-01", "ND-CA-03"];

export default function Home() {
  useEffect(() => { document.title = "Ninho do Dragão | Personalizados em Beja"; }, []);
  const destaques = DESTAQUES.map(c => PRODUTOS.find(p => p.codigo === c)!).filter(Boolean);

  return (
    <Layout>
      {/* Topo */}
      <section style={{ background: "linear-gradient(180deg, #f3f6ff 0%, #ffffff 100%)", padding: "40px 16px 28px", textAlign: "center" }}>
        <h1 className="hero-title" style={{ fontFamily: FONTE, fontSize: "38px", fontWeight: 800, color: "#1a1a2e", lineHeight: 1.15, margin: "0 auto 12px", maxWidth: "720px" }}>
          Personalizados com <span style={{ color: DOURADO }}>nome, foto ou logótipo</span>
        </h1>
        <p style={{ fontSize: "16px", color: "#4b5563", maxWidth: "560px", margin: "0 auto 8px", lineHeight: 1.6 }}>
          Feitos em Beja, com envio para todo o país. Escolhe o que procuras:
        </p>
      </section>

      {/* Natal (aparece sozinho de 1 de novembro a 24 de dezembro) */}
      {NATAL_ATIVO && (
        <section style={{ maxWidth: "1100px", margin: "0 auto 18px", padding: "0 16px" }}>
          <a href="/catalogo?categoria=natal" className="cartao natal-destaque"
            style={{ display: "grid", gridTemplateColumns: "1.3fr 1fr", alignItems: "stretch", textDecoration: "none", background: "#7f1d1d", color: "white", borderRadius: "18px", overflow: "hidden" }}>
            <img src="/loja/natal.webp" alt="Meia de Natal com nome, caneca e manta personalizadas" style={{ width: "100%", height: "100%", minHeight: "200px", objectFit: "cover" }} />
            <div style={{ padding: "22px 20px", display: "flex", flexDirection: "column", justifyContent: "center", gap: "8px" }}>
              <span style={{ fontSize: "12px", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "#fcd34d" }}>🎄 Especial Natal</span>
              <span style={{ fontFamily: FONTE, fontSize: "26px", fontWeight: 800, lineHeight: 1.15 }}>Presentes de Natal com nome</span>
              <span style={{ fontSize: "14.5px", opacity: 0.92, lineHeight: 1.5 }}>Meias para pendurar, canecas, mantas, enfeites e muito mais. {NATAL_PRAZO}.</span>
              <span style={{ marginTop: "6px", alignSelf: "flex-start", background: "white", color: "#7f1d1d", fontWeight: 800, fontFamily: FONTE, padding: "11px 18px", borderRadius: "10px", fontSize: "14px" }}>Ver ideias de Natal →</span>
            </div>
          </a>
        </section>
      )}

      {/* As 5 áreas */}
      <section style={{ maxWidth: "1100px", margin: "0 auto", padding: "0 16px" }}>
        <div className="grelha-areas">
          {AREAS.map(a => (
            <a key={a.id} href={`/loja/${a.id}`} className="cartao"
              style={{ display: "flex", flexDirection: "column", textDecoration: "none", background: a.cor, borderRadius: "16px", overflow: "hidden", border: "1px solid #e5e7eb" }}>
              <Imagem src={a.imagem} icone={a.icone} alt={a.nome} fundo={a.cor} proporcao="4 / 3" />
              <div style={{ padding: "12px 12px 14px" }}>
                <div style={{ fontFamily: FONTE, fontWeight: 800, fontSize: "16px", color: "#1a1a2e", lineHeight: 1.25 }}>{a.nome}</div>
                <div style={{ fontSize: "12.5px", color: "#4b5563", marginTop: "4px", lineHeight: 1.4 }}>{a.frase}</div>
                <div style={{ fontSize: "13px", color: AZUL, fontWeight: 700, marginTop: "8px" }}>Ver produtos →</div>
              </div>
            </a>
          ))}
          <a href="/pedido" className="cartao"
            style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", textAlign: "center", textDecoration: "none", background: AZUL, color: "white", borderRadius: "16px", padding: "20px 14px", minHeight: "160px" }}>
            <span style={{ fontSize: "40px" }} aria-hidden>💡</span>
            <span style={{ fontFamily: FONTE, fontWeight: 800, fontSize: "16px", marginTop: "8px" }}>Tens outra ideia?</span>
            <span style={{ fontSize: "13px", opacity: 0.9, marginTop: "4px" }}>Descreve-a e enviamos orçamento</span>
          </a>
        </div>
      </section>

      {/* Como funciona */}
      <section style={{ maxWidth: "1100px", margin: "0 auto", padding: "44px 16px 8px" }}>
        <h2 className="text-responsive-lg" style={{ fontFamily: FONTE, fontSize: "26px", fontWeight: 800, color: "#1a1a2e", textAlign: "center", margin: "0 0 20px" }}>Como funciona</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "14px" }}>
          {[
            { n: "1", t: "Escolhes e pedes", d: "Escolhe o produto e conta-nos a ideia (nome, foto, logótipo, quantidade)." },
            { n: "2", t: "Recebes o orçamento", d: "Respondemos em menos de 24 horas com o preço final e uma prova do design." },
            { n: "3", t: "Sinal de 50% e produção", d: "Com o sinal começamos. Fica pronto em 5 a 8 dias. Levantas em Beja ou enviamos." },
          ].map(p => (
            <div key={p.n} style={{ background: "white", border: "1px solid #e5e7eb", borderRadius: "14px", padding: "18px" }}>
              <div style={{ width: "34px", height: "34px", borderRadius: "50%", background: AZUL, color: "white", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontFamily: FONTE, marginBottom: "10px" }}>{p.n}</div>
              <div style={{ fontFamily: FONTE, fontWeight: 700, fontSize: "16px", color: "#1a1a2e", marginBottom: "4px" }}>{p.t}</div>
              <div style={{ fontSize: "14px", color: "#4b5563", lineHeight: 1.5 }}>{p.d}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Mais pedidos */}
      <section style={{ maxWidth: "1100px", margin: "0 auto", padding: "40px 16px 0" }}>
        <h2 className="text-responsive-lg" style={{ fontFamily: FONTE, fontSize: "26px", fontWeight: 800, color: "#1a1a2e", textAlign: "center", margin: "0 0 20px" }}>Os mais pedidos</h2>
        <div className="grelha-produtos">
          {destaques.map(p => (
            <a key={p.codigo} href={`/pedido?produto=${p.codigo}`} className="cartao"
              style={{ textDecoration: "none", background: "white", border: "1px solid #e5e7eb", borderRadius: "14px", overflow: "hidden", display: "flex", flexDirection: "column" }}>
              <Imagem src={p.imagem} icone={p.icone} alt={p.nome} />
              <div style={{ padding: "10px 12px 14px" }}>
                <div style={{ fontFamily: FONTE, fontWeight: 700, fontSize: "14px", color: "#1a1a2e", lineHeight: 1.3 }}>{p.nome}</div>
                <div style={{ fontSize: "13px", color: "#6b7280", marginTop: "4px" }}>
                  {p.precoDesde ? <>a partir de <strong style={{ color: AZUL, fontSize: "15px" }}>{euro(p.precoDesde)}</strong></> : "Preço sob orçamento"}
                </div>
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* Final */}
      <section style={{ maxWidth: "1100px", margin: "44px auto 0", padding: "0 16px" }}>
        <div style={{ background: AZUL, borderRadius: "18px", padding: "30px 20px", textAlign: "center", color: "white" }}>
          <h2 style={{ fontFamily: FONTE, fontSize: "24px", fontWeight: 800, margin: "0 0 8px" }}>Não encontras o que procuras?</h2>
          <p style={{ fontSize: "15px", opacity: 0.9, margin: "0 0 18px" }}>Trabalhamos com centenas de artigos. Diz-nos a ideia e encontramos a melhor opção.</p>
          <div style={{ display: "flex", gap: "10px", justifyContent: "center", flexWrap: "wrap" }}>
            <a href="/pedido" style={{ background: "white", color: AZUL, padding: "13px 22px", borderRadius: "10px", fontWeight: 800, fontFamily: FONTE, textDecoration: "none" }}>Fazer pedido</a>
            <a href={WA_MSG("Olá! Tenho uma ideia para personalizar.")} target="_blank" rel="noopener noreferrer" className="btn-whatsapp"
              style={{ padding: "13px 22px", borderRadius: "10px", textDecoration: "none" }}>Falar no WhatsApp</a>
          </div>
        </div>
      </section>
    </Layout>
  );
}
