/*
 * Policies.tsx — Páginas de políticas do Ninho do Dragão
 * Design: limpo, profissional, mobile first
 */
import React, { useState } from "react";

const WHATSAPP_URL = "https://wa.me/351935852703?text=Olá! Gostava de saber mais informações.";

type PolicyTab = "privacidade" | "termos" | "devolucoes" | "envio";

const tabs: { id: PolicyTab; label: string }[] = [
  { id: "privacidade", label: "Privacidade" },
  { id: "termos", label: "Termos e Condições" },
  { id: "devolucoes", label: "Devoluções e Trocas" },
  { id: "envio", label: "Envio e Entrega" },
];

function PolicyPrivacidade() {
  return (
    <div className="policy-content">
      <h2 style={{ fontSize: "1.75rem", fontWeight: 700, marginBottom: "1.5rem", color: "#1a1a2e" }}>
        Política de Privacidade
      </h2>
      <p style={{ color: "#666", marginBottom: "1rem", fontSize: "0.9rem" }}>
        Última atualização: abril de 2026
      </p>

      <h3 style={{ fontSize: "1.15rem", fontWeight: 600, marginTop: "2rem", marginBottom: "0.75rem", color: "#2B4EAF" }}>
        1. Responsável pelo tratamento de dados
      </h3>
      <p>
        O responsável pelo tratamento dos dados pessoais recolhidos neste website é o <strong>Ninho do Dragão</strong>, 
        com contacto através do WhatsApp (+351 935 852 703) ou email.
      </p>

      <h3 style={{ fontSize: "1.15rem", fontWeight: 600, marginTop: "2rem", marginBottom: "0.75rem", color: "#2B4EAF" }}>
        2. Dados recolhidos
      </h3>
      <p>Podemos recolher os seguintes dados pessoais:</p>
      <ul style={{ paddingLeft: "1.5rem", marginTop: "0.5rem" }}>
        <li>Nome e contacto (telefone, email) — fornecidos voluntariamente pelo cliente ao efetuar uma encomenda via WhatsApp</li>
        <li>Fotografias e textos — fornecidos pelo cliente para personalização dos produtos</li>
        <li>Endereço de entrega — para envio das encomendas</li>
        <li>Email — caso subscreva a nossa newsletter</li>
      </ul>

      <h3 style={{ fontSize: "1.15rem", fontWeight: 600, marginTop: "2rem", marginBottom: "0.75rem", color: "#2B4EAF" }}>
        3. Finalidade do tratamento
      </h3>
      <p>Os dados pessoais são utilizados exclusivamente para:</p>
      <ul style={{ paddingLeft: "1.5rem", marginTop: "0.5rem" }}>
        <li>Processamento e entrega de encomendas</li>
        <li>Personalização dos produtos conforme solicitado</li>
        <li>Comunicação com o cliente sobre o estado da encomenda</li>
        <li>Envio de newsletter (apenas com consentimento)</li>
      </ul>

      <h3 style={{ fontSize: "1.15rem", fontWeight: 600, marginTop: "2rem", marginBottom: "0.75rem", color: "#2B4EAF" }}>
        4. Partilha de dados
      </h3>
      <p>
        Os dados pessoais <strong>não são partilhados com terceiros</strong>, exceto com a transportadora para efeitos de entrega 
        das encomendas. Não vendemos, alugamos ou cedemos dados pessoais a terceiros.
      </p>

      <h3 style={{ fontSize: "1.15rem", fontWeight: 600, marginTop: "2rem", marginBottom: "0.75rem", color: "#2B4EAF" }}>
        5. Conservação dos dados
      </h3>
      <p>
        Os dados pessoais são conservados apenas durante o período necessário para a finalidade para a qual foram recolhidos, 
        ou conforme exigido por lei.
      </p>

      <h3 style={{ fontSize: "1.15rem", fontWeight: 600, marginTop: "2rem", marginBottom: "0.75rem", color: "#2B4EAF" }}>
        6. Direitos do titular
      </h3>
      <p>O cliente tem o direito de:</p>
      <ul style={{ paddingLeft: "1.5rem", marginTop: "0.5rem" }}>
        <li>Aceder aos seus dados pessoais</li>
        <li>Solicitar a retificação ou eliminação dos mesmos</li>
        <li>Retirar o consentimento a qualquer momento</li>
      </ul>
      <p style={{ marginTop: "0.75rem" }}>
        Para exercer estes direitos, contacte-nos através do WhatsApp (+351 935 852 703).
      </p>
    </div>
  );
}

function PolicyTermos() {
  return (
    <div className="policy-content">
      <h2 style={{ fontSize: "1.75rem", fontWeight: 700, marginBottom: "1.5rem", color: "#1a1a2e" }}>
        Termos e Condições
      </h2>
      <p style={{ color: "#666", marginBottom: "1rem", fontSize: "0.9rem" }}>
        Última atualização: abril de 2026
      </p>

      <h3 style={{ fontSize: "1.15rem", fontWeight: 600, marginTop: "2rem", marginBottom: "0.75rem", color: "#2B4EAF" }}>
        1. Identificação
      </h3>
      <p>
        O presente website é propriedade do <strong>Ninho do Dragão</strong>, dedicado à criação e venda de 
        produtos personalizados com sublimação e vinil.
      </p>

      <h3 style={{ fontSize: "1.15rem", fontWeight: 600, marginTop: "2rem", marginBottom: "0.75rem", color: "#2B4EAF" }}>
        2. Encomendas e personalização
      </h3>
      <p>
        Todas as encomendas são efetuadas através do WhatsApp. O cliente fornece os materiais necessários 
        (fotografias, textos, design pretendido) e recebe uma proposta de orçamento.
      </p>
      <p style={{ marginTop: "0.75rem" }}>
        <strong>O cliente tem sempre que aprovar o projeto antes da produção.</strong> Qualquer modificação ao 
        design deve ser solicitada e aprovada antes do início da produção.
      </p>

      <h3 style={{ fontSize: "1.15rem", fontWeight: 600, marginTop: "2rem", marginBottom: "0.75rem", color: "#2B4EAF" }}>
        3. Pagamento
      </h3>
      <p>O pagamento é efetuado em duas fases:</p>
      <ul style={{ paddingLeft: "1.5rem", marginTop: "0.5rem" }}>
        <li><strong>50% no momento da aceitação do orçamento</strong> — para confirmação e início da produção</li>
        <li><strong>50% após a conclusão da arte</strong> — quando o produto está finalizado e pronto para envio</li>
      </ul>

      <h3 style={{ fontSize: "1.15rem", fontWeight: 600, marginTop: "2rem", marginBottom: "0.75rem", color: "#2B4EAF" }}>
        4. Tempo de produção
      </h3>
      <p>
        O tempo estimado de produção é de <strong>8 dias úteis</strong>, contados a partir do momento em que 
        temos o material necessário do fornecedor. Este prazo pode variar em épocas de maior procura.
      </p>

      <h3 style={{ fontSize: "1.15rem", fontWeight: 600, marginTop: "2rem", marginBottom: "0.75rem", color: "#2B4EAF" }}>
        5. Aprovação do projeto
      </h3>
      <p>
        Antes da produção, o cliente recebe uma pré-visualização do design para aprovação. 
        <strong> A produção só avança após aprovação expressa do cliente.</strong> Alterações após aprovação 
        podem implicar custos adicionais e atrasos na entrega.
      </p>

      <h3 style={{ fontSize: "1.15rem", fontWeight: 600, marginTop: "2rem", marginBottom: "0.75rem", color: "#2B4EAF" }}>
        6. Regime fiscal
      </h3>
      <div style={{ 
        background: "#f0f4ff", 
        border: "1px solid #2B4EAF", 
        borderRadius: "8px", 
        padding: "1rem 1.25rem", 
        marginTop: "0.5rem" 
      }}>
        <p style={{ fontWeight: 600, color: "#2B4EAF" }}>
          IVA — Regime de Isenção
        </p>
        <p style={{ marginTop: "0.5rem", fontSize: "0.95rem" }}>
          O Ninho do Dragão opera ao abrigo do <strong>Regime de Isenção de IVA</strong>, nos termos dos 
          artigos 36.º e 40.º do Código do IVA (CIVA). Os preços apresentados são finais e não incluem IVA.
        </p>
      </div>

      <h3 style={{ fontSize: "1.15rem", fontWeight: 600, marginTop: "2rem", marginBottom: "0.75rem", color: "#2B4EAF" }}>
        7. Propriedade intelectual
      </h3>
      <p>
        O cliente é responsável por garantir que os materiais fornecidos (imagens, textos, logótipos) 
        não violam direitos de autor de terceiros. O Ninho do Dragão não se responsabiliza por eventuais 
        infrações de propriedade intelectual.
      </p>
    </div>
  );
}

function PolicyDevolucoes() {
  return (
    <div className="policy-content">
      <h2 style={{ fontSize: "1.75rem", fontWeight: 700, marginBottom: "1.5rem", color: "#1a1a2e" }}>
        Política de Devoluções e Trocas
      </h2>
      <p style={{ color: "#666", marginBottom: "1rem", fontSize: "0.9rem" }}>
        Última atualização: abril de 2026
      </p>

      <div style={{ 
        background: "#fff8f0", 
        border: "1px solid #C9A227", 
        borderRadius: "8px", 
        padding: "1.25rem", 
        marginBottom: "1.5rem" 
      }}>
        <p style={{ fontWeight: 600, color: "#1a1a2e", fontSize: "1.05rem" }}>
          ⚠️ Produtos personalizados não são passíveis de devolução ou troca.
        </p>
      </div>

      <h3 style={{ fontSize: "1.15rem", fontWeight: 600, marginTop: "2rem", marginBottom: "0.75rem", color: "#2B4EAF" }}>
        1. Produtos personalizados
      </h3>
      <p>
        Dado que todos os nossos produtos são <strong>feitos por medida e personalizados</strong> de acordo 
        com as especificações do cliente, <strong>não aceitamos devoluções nem trocas</strong>.
      </p>
      <p style={{ marginTop: "0.75rem" }}>
        É por este motivo que o processo de aprovação é fundamental: o cliente tem sempre a oportunidade de 
        rever e aprovar o design antes da produção.
      </p>

      <h3 style={{ fontSize: "1.15rem", fontWeight: 600, marginTop: "2rem", marginBottom: "0.75rem", color: "#2B4EAF" }}>
        2. Aprovação obrigatória
      </h3>
      <p>
        Antes de iniciar a produção, enviamos sempre uma pré-visualização do produto para aprovação. 
        <strong> O cliente deve confirmar que está satisfeito com o design, texto, cores e disposição dos elementos.</strong>
      </p>
      <p style={{ marginTop: "0.75rem" }}>
        Qualquer modificação deve ser solicitada <strong>antes da aprovação final</strong>. Após aprovação e 
        início da produção, não é possível efetuar alterações.
      </p>

      <h3 style={{ fontSize: "1.15rem", fontWeight: 600, marginTop: "2rem", marginBottom: "0.75rem", color: "#2B4EAF" }}>
        3. Defeitos de fabrico
      </h3>
      <p>
        No caso excecional de o produto apresentar um <strong>defeito de fabrico</strong> (erro de impressão, 
        dano no material, produto diferente do aprovado), o cliente deve contactar-nos no prazo de 
        <strong>48 horas após a receção</strong>, enviando fotografias do defeito.
      </p>
      <p style={{ marginTop: "0.75rem" }}>
        Após análise, procederemos à <strong>reposição do produto sem custos adicionais</strong>.
      </p>

      <h3 style={{ fontSize: "1.15rem", fontWeight: 600, marginTop: "2rem", marginBottom: "0.75rem", color: "#2B4EAF" }}>
        4. Contacto
      </h3>
      <p>
        Para qualquer questão relacionada com a sua encomenda, contacte-nos através do WhatsApp: 
        <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" style={{ color: "#25D366", fontWeight: 600 }}>
          +351 935 852 703
        </a>
      </p>
    </div>
  );
}

function PolicyEnvio() {
  return (
    <div className="policy-content">
      <h2 style={{ fontSize: "1.75rem", fontWeight: 700, marginBottom: "1.5rem", color: "#1a1a2e" }}>
        Política de Envio e Entrega
      </h2>
      <p style={{ color: "#666", marginBottom: "1rem", fontSize: "0.9rem" }}>
        Última atualização: abril de 2026
      </p>

      <h3 style={{ fontSize: "1.15rem", fontWeight: 600, marginTop: "2rem", marginBottom: "0.75rem", color: "#2B4EAF" }}>
        1. Método de envio
      </h3>
      <p>
        Todos os envios são efetuados através de <strong>transportadora</strong>, com <strong>entrega garantida 
        no dia seguinte</strong> ao envio (em Portugal Continental).
      </p>

      <h3 style={{ fontSize: "1.15rem", fontWeight: 600, marginTop: "2rem", marginBottom: "0.75rem", color: "#2B4EAF" }}>
        2. Custos de envio
      </h3>
      <p>
        Os portes de envio são calculados com base na <strong>melhor solução para o cliente</strong>, tendo em 
        conta o peso, dimensões e destino da encomenda. O valor dos portes é comunicado ao cliente antes da 
        confirmação da encomenda.
      </p>

      <h3 style={{ fontSize: "1.15rem", fontWeight: 600, marginTop: "2rem", marginBottom: "0.75rem", color: "#2B4EAF" }}>
        3. Prazo de entrega
      </h3>
      <div style={{ 
        background: "#f0fff4", 
        border: "1px solid #25D366", 
        borderRadius: "8px", 
        padding: "1rem 1.25rem", 
        marginTop: "0.5rem" 
      }}>
        <p><strong>Tempo de produção:</strong> 8 dias úteis (a partir do momento em que temos o material do fornecedor)</p>
        <p style={{ marginTop: "0.5rem" }}><strong>Entrega:</strong> Dia seguinte ao envio (Portugal Continental)</p>
      </div>
      <p style={{ marginTop: "0.75rem", fontSize: "0.9rem", color: "#666" }}>
        Nota: O prazo de produção pode variar em épocas de maior procura (ex: Dia da Mãe, Natal).
      </p>

      <h3 style={{ fontSize: "1.15rem", fontWeight: 600, marginTop: "2rem", marginBottom: "0.75rem", color: "#2B4EAF" }}>
        4. Tracking / Rastreio
      </h3>
      <p>
        Após o envio, o cliente recebe o <strong>número de rastreio</strong> da encomenda via WhatsApp, 
        permitindo acompanhar a entrega em tempo real.
      </p>

      <h3 style={{ fontSize: "1.15rem", fontWeight: 600, marginTop: "2rem", marginBottom: "0.75rem", color: "#2B4EAF" }}>
        5. Entrega em mão
      </h3>
      <p>
        Em determinadas situações e mediante acordo prévio, é possível efetuar a <strong>entrega em mão</strong>, 
        sem custos de envio adicionais.
      </p>

      <h3 style={{ fontSize: "1.15rem", fontWeight: 600, marginTop: "2rem", marginBottom: "0.75rem", color: "#2B4EAF" }}>
        6. Problemas na entrega
      </h3>
      <p>
        Caso a encomenda chegue danificada ou não seja entregue no prazo previsto, contacte-nos imediatamente 
        através do WhatsApp: 
        <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" style={{ color: "#25D366", fontWeight: 600 }}>
          +351 935 852 703
        </a>
      </p>
    </div>
  );
}

const policyComponents: Record<PolicyTab, () => React.ReactElement> = {
  privacidade: PolicyPrivacidade,
  termos: PolicyTermos,
  devolucoes: PolicyDevolucoes,
  envio: PolicyEnvio,
};

export default function Policies({ initialTab = "termos" }: { initialTab?: PolicyTab }) {
  const [activeTab, setActiveTab] = useState<PolicyTab>(initialTab);
  const ActivePolicy = policyComponents[activeTab];

  return (
    <div style={{ minHeight: "100vh", background: "#fafafa" }}>
      {/* Header */}
      <header style={{
        background: "#fff",
        borderBottom: "1px solid #eee",
        padding: "1rem 1.5rem",
        position: "sticky",
        top: 0,
        zIndex: 50,
      }}>
        <div style={{ maxWidth: "900px", margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <a href="/" style={{ fontFamily: "'Dancing Script', cursive", fontSize: "1.5rem", color: "#2B4EAF", textDecoration: "none" }}>
            Ninho do Dragão
          </a>
          <a href="/" style={{ color: "#2B4EAF", textDecoration: "none", fontSize: "0.9rem", fontWeight: 500 }}>
            ← Voltar ao site
          </a>
        </div>
      </header>

      {/* Tabs */}
      <div style={{ background: "#fff", borderBottom: "1px solid #eee", overflowX: "auto" }}>
        <div style={{ maxWidth: "900px", margin: "0 auto", display: "flex", gap: "0" }}>
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              aria-label={`Ver ${tab.label}`}
              style={{
                padding: "1rem 1.25rem",
                fontSize: "0.85rem",
                fontWeight: activeTab === tab.id ? 600 : 400,
                color: activeTab === tab.id ? "#2B4EAF" : "#666",
                background: "transparent",
                border: "none",
                borderBottom: activeTab === tab.id ? "2px solid #2B4EAF" : "2px solid transparent",
                cursor: "pointer",
                whiteSpace: "nowrap",
                transition: "all 0.2s",
                minHeight: "44px",
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <main style={{ maxWidth: "900px", margin: "0 auto", padding: "2rem 1.5rem 4rem" }}>
        <ActivePolicy />

        {/* IVA Notice — always visible */}
        <div style={{
          marginTop: "3rem",
          padding: "1.25rem",
          background: "#f0f4ff",
          border: "1px solid #2B4EAF",
          borderRadius: "8px",
          textAlign: "center",
        }}>
          <p style={{ fontWeight: 600, color: "#2B4EAF", fontSize: "0.95rem" }}>
            IVA — Regime de Isenção
          </p>
          <p style={{ marginTop: "0.5rem", fontSize: "0.85rem", color: "#555" }}>
            Ao abrigo dos artigos 36.º e 40.º do Código do IVA (CIVA)
          </p>
        </div>
      </main>
    </div>
  );
}
