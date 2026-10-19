/**
 * Seguimento de encomendas (AllExpress) para a página /seguimento do site.
 *
 *   GET /.netlify/functions/seguimento?g=<id da guia>&e=<nº da etiqueta>
 *
 * Pede os dois números (id da guia + nº da etiqueta) para que ninguém consiga ver encomendas de outros
 * só a adivinhar números. Devolve só os eventos (sem o nome de quem recebeu).
 */

const API = "https://ae.allexpress.pt/api/v2";

export default async (req) => {
  const key = process.env.ALLEXPRESS_KEY;
  if (!key) return Response.json({ erro: "Seguimento indisponível." }, { status: 500 });

  const url = new URL(req.url);
  const g = (url.searchParams.get("g") || "").trim();
  const e = (url.searchParams.get("e") || "").trim();
  if (!/^\d{1,12}$/.test(g) || !/^[A-Za-z0-9-]{4,40}$/.test(e)) {
    return Response.json({ erro: "Link de seguimento incompleto." }, { status: 400 });
  }

  try {
    const r = await fetch(`${API}/guias-transporte/${g}/tracking/${encodeURIComponent(e)}`, {
      headers: { Authorization: `Bearer ${key}`, Accept: "application/json" },
    });
    if (r.status === 404 || r.status === 422) return Response.json({ erro: "Encomenda não encontrada." }, { status: 404 });
    if (!r.ok) throw new Error(`AllExpress respondeu ${r.status}`);
    const t = await r.json();
    const eventos = (t.eventos || []).map((ev) => ({
      data: ev.data_evento,
      evento: ev.evento,
      descricao: ev.descricao || "",
      local: ev.localizacao || "",
      estado: ev.status || "",
      transportadora: ev.transportadora || "",
    }));
    return Response.json({ etiqueta: t.etiqueta || e, eventos }, { headers: { "Cache-Control": "public, max-age=600" } });
  } catch (err) {
    console.error("Erro no seguimento:", err);
    return Response.json({ erro: "Não foi possível consultar a encomenda agora. Tenta daqui a pouco." }, { status: 502 });
  }
};
