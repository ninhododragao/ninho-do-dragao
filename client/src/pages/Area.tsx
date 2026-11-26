/*
 * Página de uma área (/loja/:area): produtos dessa área + pedido.
 */
import { useEffect, useMemo, useState } from "react";
import Layout, { AZUL, FONTE, Imagem } from "@/components/Layout";
import { AREAS, GRUPOS_POR_AREA, PRODUTOS, areaPorId, euro } from "@/data/loja";
import { GRUPOS, NATAL_ATIVO, carregarCatalogo, pontosNatal, type Produto } from "@/pages/Catalogo";

const POR_FILA = 10;

export default function Area({ id }: { id: string }) {
  const area = areaPorId(id);
  const [catalogo, setCatalogo] = useState<Produto[] | null>(null);
  useEffect(() => { carregarCatalogo(setCatalogo); }, []);
  const filas = useMemo(() => {
    if (!area || !catalogo) return [];
    const natal = NATAL_ATIVO && (area.id === "natal" || area.id === "festas" || area.id === "presentes")
      ? [{ grupo: { id: "natal", nome: area.id === "natal" ? "Mais artigos de Natal dos nossos fornecedores" : "Natal", icone: "🎄", palavras: [] }, itens: catalogo.filter(p => pontosNatal(p) > 0).sort((a, b) => pontosNatal(b) - pontosNatal(a)) }]
      : [];
    return [...natal, ...GRUPOS_POR_AREA[area.id]
      .map(g => ({ grupo: GRUPOS.find(x => x.id === g)!, itens: catalogo.filter(p => p.grupo === g) }))]
      .filter(f => f.grupo && f.itens.length)
      .map(f => ({ ...f, total: f.itens.length, itens: (f.grupo.id === "natal" ? f.itens : [...f.itens].sort((a, b) => (b.stock > 0 ? 1 : 0) - (a.stock > 0 ? 1 : 0))).slice(0, POR_FILA) }));
  }, [area, catalogo]);
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

        <h2 style={{ fontFamily: FONTE, fontSize: "22px", fontWeight: 800, color: "#1a1a2e", margin: "36px 0 4px" }}>Mais artigos para personalizar</h2>
        <p style={{ fontSize: "14px", color: "#6b7280", margin: "0 0 14px" }}>Preços por unidade, com personalização a combinar no orçamento.</p>
        {catalogo === null && <p style={{ color: "#6b7280" }}>A carregar artigos…</p>}
        {filas.map(f => (
          <div key={f.grupo.id} style={{ marginBottom: "22px" }}>
            <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: "10px", marginBottom: "8px" }}>
              <h3 style={{ fontFamily: FONTE, fontSize: "16px", fontWeight: 700, color: "#1a1a2e", margin: 0 }}>{f.grupo.icone} {f.grupo.nome}</h3>
              <a href={`/catalogo?categoria=${f.grupo.id}`} style={{ color: AZUL, fontWeight: 700, fontSize: "13px", textDecoration: "none", whiteSpace: "nowrap" }}>Ver todos ({f.total}) →</a>
            </div>
            <div style={{ display: "flex", gap: "10px", overflowX: "auto", paddingBottom: "6px", scrollSnapType: "x mandatory" }}>
              {f.itens.map(p => (
                <a key={p.ref} href={`/catalogo?categoria=${f.grupo.id}&artigo=${encodeURIComponent(p.ref)}`} className="cartao"
                  style={{ flex: "0 0 150px", scrollSnapAlign: "start", textDecoration: "none", background: "white", border: "1px solid #e5e7eb", borderRadius: "12px", overflow: "hidden" }}>
                  <div style={{ aspectRatio: "1 / 1", background: "white", padding: "6px" }}>
                    <img src={p.imagem} alt={p.nome} loading="lazy" style={{ width: "100%", height: "100%", objectFit: "contain" }} />
                  </div>
                  <div style={{ padding: "6px 9px 10px" }}>
                    <div style={{ fontSize: "12.5px", fontWeight: 600, color: "#1a1a2e", lineHeight: 1.3, height: "33px", overflow: "hidden" }}>{p.nome}</div>
                    <div style={{ fontSize: "13px", color: AZUL, fontWeight: 800, marginTop: "4px" }}>{euro(p.preco)}</div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        ))}

        <div style={{ marginTop: "28px", background: "#f9fafb", border: "1px dashed #d1d5db", borderRadius: "14px", padding: "18px", textAlign: "center" }}>
          <p style={{ margin: "0 0 10px", color: "#374151", fontSize: "14.5px" }}>Não encontraste o que procuras? Pesquisa em todos os artigos ou descreve-nos a ideia.</p>
          <div style={{ display: "flex", gap: "10px", justifyContent: "center", flexWrap: "wrap" }}>
            <a href="/catalogo" style={{ padding: "10px 18px", borderRadius: "8px", border: `2px solid ${AZUL}`, color: AZUL, fontWeight: 700, textDecoration: "none", fontSize: "14px" }}>Pesquisar todos os artigos</a>
            <a href={`/pedido?area=${area.id}`} className="btn-primary" style={{ padding: "10px 18px", borderRadius: "8px", textDecoration: "none", fontSize: "14px" }}>Descrever a minha ideia</a>
          </div>
        </div>
      </section>
    </Layout>
  );
}
