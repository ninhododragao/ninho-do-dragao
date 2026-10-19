/**
 * Portes de envio (AllExpress → CTT / DPD) para a lista de orçamento do site.
 *
 *   GET /.netlify/functions/portes?cp=1000-001
 *
 * Devolve uma tabela de escalões de peso (como no site da AllExpress): para cada escalão, o preço
 * de cada transportadora/serviço (entrega em casa e em ponto de recolha).
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

const ESCALOES = [1, 2, 5, 10, 15, 20, 30]; // kg

export default async (req) => {
  const key = process.env.ALLEXPRESS_KEY;
  if (!key) return json({ erro: "ALLEXPRESS_KEY não está configurada no Netlify." }, 500);

  const url = new URL(req.url);
  const cp = (url.searchParams.get("cp") || "").trim().replace(/\s+/g, "");
  if (!/^\d{4}-\d{3}$/.test(cp)) return json({ erro: "Código postal inválido. Usa o formato 0000-000." }, 400);

  try {
    const pedidos = ESCALOES.flatMap((peso) => [false, true].map((ponto) => opcoes(key, cp, peso, ponto).then((l) => l.map((o) => ({ ...o, peso })))));
    const res = await Promise.allSettled(pedidos);
    const todas = res.flatMap((r) => (r.status === "fulfilled" ? r.value : []));
    if (!todas.length) {
      const erro = res.find((r) => r.status === "rejected");
      throw erro ? erro.reason : new Error("Sem opções de envio");
    }
    // colunas: cada transportadora + serviço + tipo de entrega
    const nomeCol = (o) => `${o.transportadora} · ${o.servico} (${o.entrega})`;
    const colunas = [...new Set(todas.map(nomeCol))];
    const escaloes = ESCALOES.map((peso) => ({
      peso,
      precos: Object.fromEntries(colunas.map((c) => {
        const ps = todas.filter((o) => o.peso === peso && nomeCol(o) === c).map((o) => o.preco);
        return [c, ps.length ? Math.min(...ps) : null];
      })),
    }));
    // colunas ordenadas pelo preço no escalão de 1 kg
    colunas.sort((a, b) => (escaloes[0].precos[a] ?? 999) - (escaloes[0].precos[b] ?? 999));
    return json({ cp, colunas, escaloes }, 200, true);
  } catch (e) {
    console.error("Erro ao calcular portes:", e);
    return json({ erro: "Não foi possível calcular os portes agora. Indicamos o valor no orçamento." }, 502);
  }
};
