/*
 * Formulário de pedido (/pedido).
 * Cada pedido fica guardado no Netlify (Forms) e chega por email à Laila.
 * Depois o cliente pode, se quiser, continuar a conversa no WhatsApp.
 * Se o envio falhar, abre o WhatsApp com o pedido já escrito — nenhum pedido se perde.
 */
import { useEffect, useMemo, useState } from "react";
import Layout, { AZUL, FONTE, WA_MSG } from "@/components/Layout";
import { AREAS, PRODUTOS, areaPorId, produtoPorCodigo } from "@/data/loja";

const MAX_MB = 8;

const campo = { width: "100%", padding: "12px 14px", borderRadius: "10px", border: "2px solid #e5e7eb", fontSize: "16px", fontFamily: "inherit", boxSizing: "border-box" as const, background: "white" };
const rotulo = { display: "block", fontFamily: FONTE, fontWeight: 700, fontSize: "14px", color: "#1a1a2e", marginBottom: "6px" };

export default function Pedido() {
  const params = useMemo(() => new URLSearchParams(window.location.search), []);
  const inicial = produtoPorCodigo(params.get("produto") || "");
  const areaInicial = areaPorId(params.get("area") || "");

  const [f, setF] = useState({
    nome: "", telefone: "", email: "",
    produto: inicial ? `${inicial.nome} (${inicial.codigo})` : "",
    quantidade: "1", data: "", ideia: "", entrega: "Levantar em Beja", codigoPostal: "",
  });
  const [foto, setFoto] = useState<File | null>(null);
  const [aceito, setAceito] = useState(false);
  const [estado, setEstado] = useState<"" | "a-enviar" | "enviado" | "falhou">("");
  const [erro, setErro] = useState("");

  useEffect(() => { document.title = "Fazer pedido | Ninho do Dragão"; }, []);

  const mudar = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setF(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const resumo = () =>
    `Olá! Fiz um pedido no site:\n\nNome: ${f.nome}\nTelefone: ${f.telefone}` +
    (f.email ? `\nEmail: ${f.email}` : "") +
    `\nProduto: ${f.produto || "A minha ideia"}\nQuantidade: ${f.quantidade}` +
    (f.data ? `\nPara quando: ${f.data.split("-").reverse().join("/")}` : "") +
    `\nEntrega: ${f.entrega}${f.entrega !== "Levantar em Beja" && f.codigoPostal ? ` (${f.codigoPostal})` : ""}` +
    `\n\nIdeia:\n${f.ideia}` + (foto ? "\n\n(Envio a imagem a seguir.)" : "");

  const enviar = async (e: React.FormEvent) => {
    e.preventDefault();
    setErro("");
    if (foto && foto.size > MAX_MB * 1024 * 1024) { setErro(`A imagem tem mais de ${MAX_MB} MB. Escolhe uma mais pequena ou envia-a depois pelo WhatsApp.`); return; }
    setEstado("a-enviar");
    const dados = new FormData();
    dados.append("form-name", "pedido");
    Object.entries(f).forEach(([k, v]) => dados.append(k, v));
    if (foto) dados.append("foto", foto);
    try {
      const r = await fetch("/", { method: "POST", body: dados });
      if (!r.ok) throw new Error(String(r.status));
      setEstado("enviado");
      window.scrollTo(0, 0);
    } catch {
      setEstado("falhou");
      window.scrollTo(0, 0);
    }
  };

  if (estado === "enviado" || estado === "falhou") {
    const ok = estado === "enviado";
    return (
      <Layout>
        <section style={{ maxWidth: "620px", margin: "0 auto", padding: "48px 16px", textAlign: "center" }}>
          <div style={{ fontSize: "56px" }} aria-hidden>{ok ? "✅" : "📲"}</div>
          <h1 style={{ fontFamily: FONTE, fontSize: "26px", fontWeight: 800, color: "#1a1a2e", margin: "10px 0" }}>
            {ok ? "Pedido recebido!" : "Falta só um passo"}
          </h1>
          <p style={{ fontSize: "16px", color: "#4b5563", lineHeight: 1.6 }}>
            {ok
              ? <>Obrigada, {f.nome.split(" ")[0]}! Respondemos em menos de 24 horas para o <strong>{f.telefone}</strong> com o orçamento.</>
              : <>Não conseguimos guardar o pedido agora. Carrega no botão abaixo para o enviar pelo WhatsApp. A mensagem já vai escrita, só tens de carregar em <strong>enviar</strong>.</>}
          </p>
          <a href={WA_MSG(resumo())} target="_blank" rel="noopener noreferrer" className="btn-whatsapp"
            style={{ display: "inline-block", marginTop: "18px", padding: "14px 24px", borderRadius: "10px", textDecoration: "none", fontSize: "15px" }}>
            {ok ? "Quero falar também no WhatsApp" : "Enviar pedido pelo WhatsApp"}
          </a>
          <div style={{ marginTop: "22px" }}><a href="/" style={{ color: AZUL, fontWeight: 700 }}>Voltar ao início</a></div>
        </section>
      </Layout>
    );
  }

  return (
    <Layout>
      <section style={{ maxWidth: "640px", margin: "0 auto", padding: "26px 16px 0" }}>
        <h1 style={{ fontFamily: FONTE, fontSize: "26px", fontWeight: 800, color: "#1a1a2e", margin: "0 0 6px" }}>Fazer pedido</h1>
        <p style={{ fontSize: "15px", color: "#4b5563", margin: "0 0 20px", lineHeight: 1.5 }}>
          Conta-nos o que queres. Respondemos em menos de 24 horas com o orçamento e uma prova do design. Não pagas nada agora.
        </p>

        <form name="pedido" onSubmit={enviar} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <div>
            <label style={rotulo} htmlFor="produto">Produto</label>
            <select id="produto" name="produto" value={f.produto} onChange={mudar} style={campo}>
              <option value="">{areaInicial ? `A minha ideia (${areaInicial.nome})` : "A minha ideia / outro artigo"}</option>
              {AREAS.map(a => (
                <optgroup key={a.id} label={a.nome}>
                  {PRODUTOS.filter(p => p.area === a.id).map(p => <option key={p.codigo} value={`${p.nome} (${p.codigo})`}>{p.nome}</option>)}
                </optgroup>
              ))}
            </select>
          </div>

          <div>
            <label style={rotulo} htmlFor="ideia">A tua ideia *</label>
            <textarea id="ideia" name="ideia" required rows={5} value={f.ideia} onChange={mudar} style={{ ...campo, resize: "vertical" }}
              placeholder="Ex.: 2 canecas com a foto dos netos e a frase «Melhor avó do mundo». Tamanhos, cores, nomes, datas…" />
          </div>

          <div>
            <label style={rotulo} htmlFor="foto">Foto, logótipo ou exemplo (opcional)</label>
            <input id="foto" name="foto" type="file" accept="image/*,application/pdf" onChange={e => setFoto(e.target.files?.[0] || null)} style={{ ...campo, padding: "10px" }} />
            <small style={{ color: "#6b7280" }}>Até {MAX_MB} MB. Se tiveres várias, envia as outras depois pelo WhatsApp.</small>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
            <div>
              <label style={rotulo} htmlFor="quantidade">Quantidade *</label>
              <input id="quantidade" name="quantidade" type="number" min={1} required value={f.quantidade} onChange={mudar} style={campo} />
            </div>
            <div>
              <label style={rotulo} htmlFor="data">Para quando?</label>
              <input id="data" name="data" type="date" value={f.data} onChange={mudar} style={campo} />
            </div>
          </div>
          <small style={{ color: "#6b7280", marginTop: "-8px" }}>A produção demora 5 a 8 dias depois de recebermos o sinal e as imagens.</small>

          <div>
            <label style={rotulo} htmlFor="nome">Nome *</label>
            <input id="nome" name="nome" required autoComplete="name" value={f.nome} onChange={mudar} style={campo} />
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
            <div>
              <label style={rotulo} htmlFor="telefone">Telemóvel / WhatsApp *</label>
              <input id="telefone" name="telefone" type="tel" required autoComplete="tel" value={f.telefone} onChange={mudar} style={campo} placeholder="9XX XXX XXX" />
            </div>
            <div>
              <label style={rotulo} htmlFor="email">Email</label>
              <input id="email" name="email" type="email" autoComplete="email" value={f.email} onChange={mudar} style={campo} />
            </div>
          </div>

          <div>
            <span style={rotulo}>Entrega</span>
            {["Levantar em Beja", "Envio por transportadora (portes à parte)"].map(o => (
              <label key={o} style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "15px", padding: "6px 0" }}>
                <input type="radio" name="entrega" value={o} checked={f.entrega === o} onChange={mudar} /> {o}
              </label>
            ))}
            {f.entrega !== "Levantar em Beja" && (
              <input name="codigoPostal" value={f.codigoPostal} onChange={mudar} style={{ ...campo, marginTop: "6px" }} placeholder="Código postal (ex.: 7800-000)" />
            )}
          </div>

          <label style={{ display: "flex", gap: "10px", alignItems: "flex-start", fontSize: "13.5px", color: "#4b5563", lineHeight: 1.5 }}>
            <input type="checkbox" required checked={aceito} onChange={e => setAceito(e.target.checked)} style={{ marginTop: "3px", width: "18px", height: "18px" }} />
            <span>Aceito os <a href="/termos" target="_blank" style={{ color: AZUL }}>termos</a> e a <a href="/privacidade" target="_blank" style={{ color: AZUL }}>política de privacidade</a>. Sei que os produtos personalizados não têm devolução por arrependimento e que a produção começa com um sinal de 50%. *</span>
          </label>

          {erro && <p style={{ color: "#b91c1c", fontWeight: 600, margin: 0 }}>{erro}</p>}

          <button type="submit" disabled={estado === "a-enviar"} className="btn-primary"
            style={{ padding: "16px", borderRadius: "12px", fontSize: "17px", border: "none", cursor: "pointer", opacity: estado === "a-enviar" ? 0.6 : 1 }}>
            {estado === "a-enviar" ? "A enviar…" : "Enviar pedido"}
          </button>
          <p style={{ textAlign: "center", fontSize: "13px", color: "#6b7280", margin: 0 }}>
            Preferes falar diretamente? <a href={WA_MSG("Olá! Gostava de fazer um pedido.")} target="_blank" rel="noopener noreferrer" style={{ color: "#16a34a", fontWeight: 700 }}>Escreve-nos no WhatsApp</a>
          </p>
        </form>
      </section>
    </Layout>
  );
}
