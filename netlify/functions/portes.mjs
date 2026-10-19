/**
 * Portes de envio (AllExpress → CTT / DPD) para a lista de orçamento do site.
 *
 *   GET /.netlify/functions/portes?cp=1000-001[&peso=1]
 *
 * Devolve as opções de envio (entrega em casa e em ponto de recolha), do mais barato para o mais caro.
 * Chave em ALLEXPRESS_KEY (variável do Netlify, nunca no código).
 * Origem: Vila Azedo, Beja (ENVIOS_CP_ORIGEM para mudar). O peso vem da lista de orçamento (estimado por artigo).
 */

const API = "https://ae.allexpress.pt/api/v2";
const CP_ORIGEM = process.env.ENVIOS_CP_ORIGEM || "7800-655";

const json = (dados, status = 200, cache = false) =>
  Response.json(dados, {
    status,
    headers: cache
      ? { "Cache-Control": "public, max-age=3600", "Netlify-CDN-Cache-Control": "public, durable, s-maxage=86400" }
      : { "Cache-Control": "no-store" },
  });

async function opcoes(key, cp, peso, ponto) {
  const r = await fetch(`${API}/guias-transporte/opcoes-envio`, {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify({
      peso,
      quantidade: 1,
      ponto_recolha: ponto,
      origem: { pais: "PT", codigo_postal: CP_ORIGEM },
      destino: { pais: "PT", codigo_postal: cp },
    }),
  });
  if (!r.ok) throw new Error(`AllExpress respondeu ${r.status}: ${(await r.text()).slice(0, 200)}`);
  const lista = await r.json();
  return (Array.isArray(lista) ? lista : []).map((o) => ({
    transportadora: String(o.fornecedor || "").toUpperCase(),
    servico: String(o.produto || ""),
    entrega: ponto ? "ponto de recolha" : "em casa",
    preco: Math.round(Number(o.total) * 100) / 100,
  }));
}

export default async (req) => {
  const key = process.env.ALLEXPRESS_KEY;
  if (!key) return json({ erro: "ALLEXPRESS_KEY não está configurada no Netlify." }, 500);

  const url = new URL(req.url);
  const cp = (url.searchParams.get("cp") || "").trim().replace(/\s+/g, "");
  if (!/^\d{4}-\d{3}$/.test(cp)) return json({ erro: "Código postal inválido. Usa o formato 0000-000." }, 400);
  const peso = Math.min(Math.max(parseFloat(url.searchParams.get("peso") || "1") || 1, 0.1), 30);

  try {
    const [casa, ponto] = await Promise.allSettled([opcoes(key, cp, peso, false), opcoes(key, cp, peso, true)]);
    const lista = [casa, ponto].flatMap((r) => (r.status === "fulfilled" ? r.value : []));
    if (!lista.length) {
      const erro = [casa, ponto].find((r) => r.status === "rejected");
      throw erro ? erro.reason : new Error("Sem opções de envio");
    }
    lista.sort((a, b) => a.preco - b.preco);
    return json({ cp, peso, opcoes: lista }, 200, true);
  } catch (e) {
    console.error("Erro ao calcular portes:", e);
    return json({ erro: "Não foi possível calcular os portes agora. Indicamos o valor no orçamento." }, 502);
  }
};
