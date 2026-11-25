/*
 * Página de uma área (/loja/:area): produtos dessa área + pedido.
 */
import { useEffect } from "react";
import Layout, { AZUL, FONTE, Imagem } from "@/components/Layout";
import { AREAS, PRODUTOS, areaPorId, euro } from "@/data/loja";

export default function Area({ id }: { id: string }) {
  const area = areaPorId(id);
  useEffect(() => { document.title = `${area ? area.nome : "Loja"} | Ninho do Dragão`; window.scrollTo(0, 0); }, [area]);

  if (!area) {
    return (
      <Layout>
        <div style={{ textAlign: "center", padding: "80px 16px" }}>
          <p style={{ marginBottom: "16px" }}>Esta página não existe.</p>
          <a href="/" style={{ color: AZUL, fontWeight: 700 }}>Voltar ao início</a>
        </div>
      </Layout>
    );
  }

  const produtos = PRODUTOS.filter(p => p.area === area.id);

  return (
    <Layout>
      <section style={{ background: area.cor, padding: "26px 16px 22px", borderBottom: "1px solid #e5e7eb" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <a href="/" style={{ color: AZUL, fontSize: "14px", fontWeight: 600, textDecoration: "none" }}>← Início</a>
          <h1 style={{ fontFamily: FONTE, fontSize: "28px", fontWeight: 800, color: "#1a1a2e", margin: "8px 0 4px" }}>{area.icone} {area.nome}</h1>
          <p style={{ fontSize: "15px", color: "#4b5563", margin: 0 }}>{area.frase}. Toca num produto para pedir orçamento.</p>
        </div>
      </section>

      {/* Outras áreas */}
      <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "12px 16px 0", display: "flex", gap: "8px", overflowX: "auto" }}>
        {AREAS.filter(a => a.id !== area.id).map(a => (
          <a key={a.id} href={`/loja/${a.id}`} style={{ flex: "0 0 auto", padding: "8px 14px", borderRadius: "999px", border: "1px solid #e5e7eb", background: "white", color: "#374151", fontSize: "13px", fontWeight: 600, textDecoration: "none", whiteSpace: "nowrap" }}>{a.icone} {a.nome}</a>
        ))}
      </div>

      <section style={{ maxWidth: "1100px", margin: "0 auto", padding: "18px 16px 0" }}>
        <div className="grelha-produtos">
          {produtos.map(p => (
            <article key={p.codigo} className="cartao" style={{ background: "white", border: "1px solid #e5e7eb", borderRadius: "14px", overflow: "hidden", display: "flex", flexDirection: "column" }}>
              <a href={`/pedido?produto=${p.codigo}`} aria-label={`Pedir ${p.nome}`}><Imagem src={p.imagem} icone={p.icone} alt={p.nome} /></a>
              <div style={{ padding: "10px 12px 12px", display: "flex", flexDirection: "column", gap: "4px", flex: 1 }}>
                <h2 style={{ fontFamily: FONTE, fontWeight: 700, fontSize: "14.5px", color: "#1a1a2e", lineHeight: 1.3, margin: 0 }}>{p.nome}</h2>
                <p style={{ fontSize: "12.5px", color: "#6b7280", lineHeight: 1.45, margin: 0 }}>{p.descricao}</p>
                <div style={{ marginTop: "auto", paddingTop: "8px", fontSize: "13px", color: "#6b7280" }}>
                  {p.precoDesde
                    ? <>a partir de <strong style={{ color: AZUL, fontSize: "16px", fontFamily: FONTE }}>{euro(p.precoDesde)}</strong>{p.nota ? ` · ${p.nota}` : ""}</>
                    : <strong style={{ color: "#374151" }}>Preço sob orçamento</strong>}
                </div>
                <a href={`/pedido?produto=${p.codigo}`} className="btn-primary"
                  style={{ marginTop: "8px", padding: "10px", borderRadius: "8px", fontSize: "13px", textDecoration: "none", textAlign: "center" }}>Pedir orçamento</a>
              </div>
            </article>
          ))}
        </div>

        <div style={{ marginTop: "28px", background: "#f9fafb", border: "1px dashed #d1d5db", borderRadius: "14px", padding: "18px", textAlign: "center" }}>
          <p style={{ margin: "0 0 10px", color: "#374151", fontSize: "14.5px" }}>Procuras outro artigo? Temos centenas de opções dos nossos fornecedores.</p>
          <div style={{ display: "flex", gap: "10px", justifyContent: "center", flexWrap: "wrap" }}>
            <a href="/catalogo" style={{ padding: "10px 18px", borderRadius: "8px", border: `2px solid ${AZUL}`, color: AZUL, fontWeight: 700, textDecoration: "none", fontSize: "14px" }}>Ver mais artigos</a>
            <a href={`/pedido?area=${area.id}`} className="btn-primary" style={{ padding: "10px 18px", borderRadius: "8px", textDecoration: "none", fontSize: "14px" }}>Descrever a minha ideia</a>
          </div>
        </div>
      </section>
    </Layout>
  );
}
