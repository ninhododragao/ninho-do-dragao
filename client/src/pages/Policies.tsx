/*
 * Policies.tsx — Páginas de políticas do Ninho do Dragão
 * Design: limpo, profissional, mobile first
 * Atualizado com conformidade legal completa em Portugal
 */
import React, { useState } from "react";

const WHATSAPP_URL = "https://wa.me/351925865347?text=Olá! Gostava de saber mais informações.";
const LEGAL_NAME = "Laila Fernandes Chreim";
const LEGAL_NIF = "254047750";
const LEGAL_ADDRESS = "Rua das Parreiras 4, 7800-655 Vila Azedo, Beja";
const LEGAL_PHONE = "925 865 347";
const LEGAL_EMAIL = "makiwa.arts@gmail.com";

type PolicyTab = "privacidade" | "termos" | "devolucoes" | "garantia" | "ral" | "livro-reclamacoes";

const tabs: { id: PolicyTab; label: string }[] = [
  { id: "termos", label: "Termos e Condições" },
  { id: "privacidade", label: "Privacidade" },
  { id: "devolucoes", label: "Devoluções e Trocas" },
  { id: "garantia", label: "Garantia" },
  { id: "ral", label: "RAL" },
  { id: "livro-reclamacoes", label: "Livro de Reclamações" },
];

/* ─── Termos e Condições ─────────────────────────────────────────── */
function PolicyTermos() {
  return (
    <div className="policy-content">
      <h2 style={{ fontSize: "1.75rem", fontWeight: 700, marginBottom: "1.5rem", color: "#1a1a2e" }}>
        Termos e Condições
      </h2>
      <p style={{ color: "#666", marginBottom: "1rem", fontSize: "0.9rem" }}>
        Última atualização: 17 de abril de 2026
      </p>

      <h3 style={{ fontSize: "1.15rem", fontWeight: 600, marginTop: "2rem", marginBottom: "0.75rem", color: "#2B4EAF" }}>
        1. Identificação Legal
      </h3>
      <div style={{ background: "#f9f9f9", padding: "1rem", borderRadius: "8px", marginTop: "0.75rem" }}>
        <p style={{ margin: "0.25rem 0" }}><strong>Nome Fiscal:</strong> {LEGAL_NAME}</p>
        <p style={{ margin: "0.25rem 0" }}><strong>NIF:</strong> {LEGAL_NIF}</p>
        <p style={{ margin: "0.25rem 0" }}><strong>Morada:</strong> {LEGAL_ADDRESS}</p>
        <p style={{ margin: "0.25rem 0" }}><strong>Telefone:</strong> {LEGAL_PHONE}</p>
        <p style={{ margin: "0.25rem 0" }}><strong>Email:</strong> {LEGAL_EMAIL}</p>
      </div>
      <p style={{ marginTop: "1rem" }}>
        O Ninho do Dragão – by Makiwa opera sob o regime de isenção de IVA, nos termos dos artigos 36.º e 40.º do Código do IVA (CIVA). Os preços apresentados são finais e não incluem IVA.
      </p>

      <h3 style={{ fontSize: "1.15rem", fontWeight: 600, marginTop: "2rem", marginBottom: "0.75rem", color: "#2B4EAF" }}>
        2. Produtos e Serviços
      </h3>
      <p>
        O Ninho do Dragão – by Makiwa dedica-se à criação e venda de produtos personalizados através de técnicas de sublimação e vinil. Todos os produtos são feitos por medida e personalizados de acordo com as especificações do cliente.
      </p>

      <h3 style={{ fontSize: "1.15rem", fontWeight: 600, marginTop: "2rem", marginBottom: "0.75rem", color: "#2B4EAF" }}>
        3. Preços, Portes e Custos Adicionais
      </h3>
      <p>
        Os preços dos produtos são os indicados no website ou comunicados aquando da solicitação de orçamento. Os custos de portes de envio e quaisquer outros custos adicionais serão claramente indicados e adicionados ao preço total antes da confirmação da encomenda.
      </p>

      <h3 style={{ fontSize: "1.15rem", fontWeight: 600, marginTop: "2rem", marginBottom: "0.75rem", color: "#2B4EAF" }}>
        4. Formas de Pagamento
      </h3>
      <p>O pagamento das encomendas é efetuado em duas fases:</p>
      <ul style={{ paddingLeft: "1.5rem", marginTop: "0.5rem" }}>
        <li><strong>50% no momento da aceitação do orçamento</strong> — para confirmação e início da produção</li>
        <li><strong>50% após a conclusão da arte</strong> — quando o produto está finalizado e pronto para envio</li>
      </ul>

      <h3 style={{ fontSize: "1.15rem", fontWeight: 600, marginTop: "2rem", marginBottom: "0.75rem", color: "#2B4EAF" }}>
        5. Prazos de Produção e Envio
      </h3>
      <p>
        O prazo estimado de produção para artigos personalizados é de <strong>8 dias úteis</strong>, contados a partir da aprovação final do design. Este prazo pode variar em épocas de maior procura. O prazo de envio é adicionado ao prazo de produção e dependerá da transportadora e do destino.
      </p>

      <h3 style={{ fontSize: "1.15rem", fontWeight: 600, marginTop: "2rem", marginBottom: "0.75rem", color: "#2B4EAF" }}>
        6. Processo de Encomenda
      </h3>
      <p>
        As encomendas são efetuadas principalmente através de contacto via WhatsApp ou formulário de contacto no website. O cliente deverá fornecer os detalhes da personalização pretendida. Será apresentada uma proposta de orçamento e um design preliminar para aprovação. A produção só terá início após a aprovação expressa do design pelo cliente e a confirmação do pagamento inicial.
      </p>

      <h3 style={{ fontSize: "1.15rem", fontWeight: 600, marginTop: "2rem", marginBottom: "0.75rem", color: "#2B4EAF" }}>
        7. Reclamações e Contacto
      </h3>
      <p>
        Para qualquer questão, sugestão ou reclamação, contacte-nos através do telefone {LEGAL_PHONE}, email {LEGAL_EMAIL} ou WhatsApp. Em caso de reclamação, pode utilizar o Livro de Reclamações Eletrónico, disponível no rodapé do website.
      </p>

      <h3 style={{ fontSize: "1.15rem", fontWeight: 600, marginTop: "2rem", marginBottom: "0.75rem", color: "#2B4EAF" }}>
        8. Garantia Legal e Falta de Conformidade
      </h3>
      <p>
        Todos os produtos beneficiam da garantia legal de conformidade dos bens, conforme estabelecido na legislação portuguesa. Em caso de defeito ou falta de conformidade, o cliente tem direito à reparação ou substituição do bem, à redução proporcional do preço ou à resolução do contrato, nos termos e prazos previstos na lei.
      </p>

      <h3 style={{ fontSize: "1.15rem", fontWeight: 600, marginTop: "2rem", marginBottom: "0.75rem", color: "#2B4EAF" }}>
        9. Resolução Alternativa de Litígios (RAL)
      </h3>
      <p>
        Em caso de litígio de consumo, o consumidor pode recorrer a uma Entidade de Resolução Alternativa de Litígios de Consumo. A lista atualizada pode ser consultada em <a href="https://www.consumidor.pt" target="_blank" rel="noopener noreferrer" style={{ color: "#2B4EAF", fontWeight: 600 }}>www.consumidor.pt</a>.
      </p>
    </div>
  );
}

/* ─── Política de Privacidade ─────────────────────────────────────── */
function PolicyPrivacidade() {
  return (
    <div className="policy-content">
      <h2 style={{ fontSize: "1.75rem", fontWeight: 700, marginBottom: "1.5rem", color: "#1a1a2e" }}>
        Política de Privacidade
      </h2>
      <p style={{ color: "#666", marginBottom: "1rem", fontSize: "0.9rem" }}>
        Última atualização: 17 de abril de 2026
      </p>

      <h3 style={{ fontSize: "1.15rem", fontWeight: 600, marginTop: "2rem", marginBottom: "0.75rem", color: "#2B4EAF" }}>
        1. Responsável pelo Tratamento de Dados
      </h3>
      <div style={{ background: "#f9f9f9", padding: "1rem", borderRadius: "8px", marginTop: "0.75rem" }}>
        <p style={{ margin: "0.25rem 0" }}><strong>Nome:</strong> {LEGAL_NAME}</p>
        <p style={{ margin: "0.25rem 0" }}><strong>NIF:</strong> {LEGAL_NIF}</p>
        <p style={{ margin: "0.25rem 0" }}><strong>Morada:</strong> {LEGAL_ADDRESS}</p>
        <p style={{ margin: "0.25rem 0" }}><strong>Telefone:</strong> {LEGAL_PHONE}</p>
        <p style={{ margin: "0.25rem 0" }}><strong>Email:</strong> {LEGAL_EMAIL}</p>
      </div>

      <h3 style={{ fontSize: "1.15rem", fontWeight: 600, marginTop: "2rem", marginBottom: "0.75rem", color: "#2B4EAF" }}>
        2. Dados Pessoais Recolhidos
      </h3>
      <p>Recolhemos os seguintes tipos de dados pessoais:</p>
      <ul style={{ paddingLeft: "1.5rem", marginTop: "0.5rem" }}>
        <li><strong>Dados de Identificação e Contacto:</strong> Nome, email, telefone, morada de entrega.</li>
        <li><strong>Dados de Personalização:</strong> Fotografias, textos, logótipos ou elementos gráficos fornecidos para personalização.</li>
        <li><strong>Dados de Comunicação:</strong> Conteúdo das mensagens trocadas via WhatsApp, email ou formulários.</li>
        <li><strong>Dados de Marketing:</strong> Email, caso subscreva a nossa newsletter (consentimento opcional).</li>
      </ul>

      <h3 style={{ fontSize: "1.15rem", fontWeight: 600, marginTop: "2rem", marginBottom: "0.75rem", color: "#2B4EAF" }}>
        3. Finalidade do Tratamento
      </h3>
      <p>Os seus dados pessoais são recolhidos e tratados para as seguintes finalidades:</p>
      <ul style={{ paddingLeft: "1.5rem", marginTop: "0.5rem" }}>
        <li>Processamento e gestão de encomendas</li>
        <li>Personalização de produtos de acordo com as suas especificações</li>
        <li>Comunicação com o cliente e apoio ao cliente</li>
        <li>Envio de newsletters e informações sobre promoções (apenas com consentimento)</li>
        <li>Cumprimento de obrigações legais e regulamentares</li>
      </ul>

      <h3 style={{ fontSize: "1.15rem", fontWeight: 600, marginTop: "2rem", marginBottom: "0.75rem", color: "#2B4EAF" }}>
        4. Partilha de Dados
      </h3>
      <p>
        Os seus dados pessoais <strong>não são partilhados com terceiros</strong>, exceto com as transportadoras para efeitos de entrega das encomendas e quando exigido por lei. Não vendemos, alugamos ou cedemos dados pessoais a terceiros.
      </p>

      <h3 style={{ fontSize: "1.15rem", fontWeight: 600, marginTop: "2rem", marginBottom: "0.75rem", color: "#2B4EAF" }}>
        5. Conservação dos Dados
      </h3>
      <p>
        Os dados pessoais são conservados apenas durante o período necessário para cumprir as finalidades para as quais foram recolhidos, ou conforme exigido por lei.
      </p>

      <h3 style={{ fontSize: "1.15rem", fontWeight: 600, marginTop: "2rem", marginBottom: "0.75rem", color: "#2B4EAF" }}>
        6. Os Seus Direitos
      </h3>
      <p>De acordo com o RGPD, tem os seguintes direitos:</p>
      <ul style={{ paddingLeft: "1.5rem", marginTop: "0.5rem" }}>
        <li>Direito de acesso aos seus dados pessoais</li>
        <li>Direito de retificação de dados imprecisos</li>
        <li>Direito ao apagamento (direito a ser esquecido)</li>
        <li>Direito de oposição ao tratamento</li>
        <li>Direito de retirar o consentimento a qualquer momento</li>
      </ul>
      <p style={{ marginTop: "0.75rem" }}>
        Para exercer estes direitos, contacte-nos através do email {LEGAL_EMAIL} ou telefone {LEGAL_PHONE}.
      </p>
    </div>
  );
}

/* ─── Devoluções e Trocas ─────────────────────────────────────────── */
function PolicyDevolucoes() {
  return (
    <div className="policy-content">
      <h2 style={{ fontSize: "1.75rem", fontWeight: 700, marginBottom: "1.5rem", color: "#1a1a2e" }}>
        Política de Trocas, Devoluções e Cancelamentos
      </h2>
      <p style={{ color: "#666", marginBottom: "1rem", fontSize: "0.9rem" }}>
        Última atualização: 17 de abril de 2026
      </p>

      <div style={{ 
        background: "#fff8f0", 
        border: "1px solid #C9A227", 
        borderRadius: "8px", 
        padding: "1.25rem", 
        marginBottom: "1.5rem" 
      }}>
        <p style={{ fontWeight: 600, color: "#1a1a2e", fontSize: "1.05rem", margin: 0 }}>
          ⚠️ Produtos personalizados não são passíveis de devolução ou troca por arrependimento.
        </p>
      </div>

      <h3 style={{ fontSize: "1.15rem", fontWeight: 600, marginTop: "2rem", marginBottom: "0.75rem", color: "#2B4EAF" }}>
        1. Artigos Personalizados / Feitos por Medida
      </h3>
      <p>
        Todos os nossos produtos são <strong>feitos por medida e personalizados</strong> de acordo com as suas especificações e aprovação prévia. Conforme o Decreto-Lei n.º 24/2014, não existe direito de livre resolução (direito de arrependimento) para produtos personalizados.
      </p>
      <p style={{ marginTop: "0.75rem" }}>
        <strong>Não aceitamos trocas, devoluções ou cancelamentos</strong> após a aprovação do design e início da produção, exceto em caso de defeito de fabrico, erro imputável ao vendedor ou falta de conformidade.
      </p>

      <h3 style={{ fontSize: "1.15rem", fontWeight: 600, marginTop: "2rem", marginBottom: "0.75rem", color: "#2B4EAF" }}>
        2. Defeitos de Fabrico
      </h3>
      <p>
        Se o produto apresentar um defeito de fabrico (erro de impressão, dano no material, produto diferente do aprovado), contacte-nos no prazo de <strong>48 horas</strong> após a receção, enviando fotografias do defeito. Após análise, procederemos à reposição do produto sem custos adicionais.
      </p>

      <h3 style={{ fontSize: "1.15rem", fontWeight: 600, marginTop: "2rem", marginBottom: "0.75rem", color: "#2B4EAF" }}>
        3. Garantia Legal e Falta de Conformidade
      </h3>
      <p>
        Independentemente da natureza personalizada do artigo, todos os produtos beneficiam da garantia legal de conformidade. Se um produto apresentar um defeito ou falta de conformidade num prazo de <strong>três anos</strong> a contar da entrega, tem direito à reparação, substituição, redução do preço ou resolução do contrato, nos termos da lei.
      </p>

      <h3 style={{ fontSize: "1.15rem", fontWeight: 600, marginTop: "2rem", marginBottom: "0.75rem", color: "#2B4EAF" }}>
        4. Contacto
      </h3>
      <p>
        Para qualquer questão relacionada com trocas, devoluções ou cancelamentos, contacte-nos através do telefone {LEGAL_PHONE}, email {LEGAL_EMAIL} ou WhatsApp.
      </p>
    </div>
  );
}

/* ─── Garantia ─────────────────────────────────────────────────────── */
function PolicyGarantia() {
  return (
    <div className="policy-content">
      <h2 style={{ fontSize: "1.75rem", fontWeight: 700, marginBottom: "1.5rem", color: "#1a1a2e" }}>
        Garantia e Falta de Conformidade
      </h2>
      <p style={{ color: "#666", marginBottom: "1rem", fontSize: "0.9rem" }}>
        Última atualização: 17 de abril de 2026
      </p>

      <h3 style={{ fontSize: "1.15rem", fontWeight: 600, marginTop: "2rem", marginBottom: "0.75rem", color: "#2B4EAF" }}>
        O que é a Garantia Legal?
      </h3>
      <p>
        É um direito que tem como consumidor, garantido por lei, que assegura que o produto que compra está em perfeitas condições e funciona como esperado. Se um produto apresentar um problema (um defeito ou não for conforme ao que foi acordado), tem direito a que a situação seja resolvida.
      </p>

      <h3 style={{ fontSize: "1.15rem", fontWeight: 600, marginTop: "2rem", marginBottom: "0.75rem", color: "#2B4EAF" }}>
        Qual o Período da Garantia?
      </h3>
      <p>
        Para produtos novos, a garantia legal em Portugal é de <strong>três anos</strong> a contar da data de entrega do produto. Se o problema surgir dentro deste período, somos responsáveis por resolvê-lo.
      </p>

      <h3 style={{ fontSize: "1.15rem", fontWeight: 600, marginTop: "2rem", marginBottom: "0.75rem", color: "#2B4EAF" }}>
        Como Resolvemos o Problema?
      </h3>
      <p>De acordo com a lei, temos várias formas de resolver a situação:</p>
      <ul style={{ paddingLeft: "1.5rem", marginTop: "0.5rem" }}>
        <li><strong>Reparação:</strong> O produto será reparado para que fique em conformidade.</li>
        <li><strong>Substituição:</strong> O produto será substituído por um novo.</li>
        <li><strong>Redução do Preço:</strong> Será aplicada uma redução no preço.</li>
        <li><strong>Resolução do Contrato:</strong> Resolução do contrato e reembolso do valor pago.</li>
      </ul>

      <h3 style={{ fontSize: "1.15rem", fontWeight: 600, marginTop: "2rem", marginBottom: "0.75rem", color: "#2B4EAF" }}>
        O que fazer em caso de Problema?
      </h3>
      <p>
        Se detetar um defeito ou uma falta de conformidade no seu produto, contacte-nos o mais rapidamente possível através do telefone {LEGAL_PHONE}, email {LEGAL_EMAIL} ou WhatsApp. Tenha à mão o seu comprovativo de compra e descreva o problema com detalhes.
      </p>
    </div>
  );
}

/* ─── RAL (Resolução Alternativa de Litígios) ────────────────────── */
function PolicyRAL() {
  return (
    <div className="policy-content">
      <h2 style={{ fontSize: "1.75rem", fontWeight: 700, marginBottom: "1.5rem", color: "#1a1a2e" }}>
        Resolução Alternativa de Litígios (RAL)
      </h2>
      <p style={{ color: "#666", marginBottom: "1rem", fontSize: "0.9rem" }}>
        Última atualização: 17 de abril de 2026
      </p>

      <h3 style={{ fontSize: "1.15rem", fontWeight: 600, marginTop: "2rem", marginBottom: "0.75rem", color: "#2B4EAF" }}>
        O que é a RAL?
      </h3>
      <p>
        A Resolução Alternativa de Litígios de Consumo (RAL) é um mecanismo que permite resolver conflitos entre consumidores e empresas de forma mais rápida e menos dispendiosa do que os tribunais. As entidades de RAL são reconhecidas pela Direção-Geral do Consumidor.
      </p>

      <h3 style={{ fontSize: "1.15rem", fontWeight: 600, marginTop: "2rem", marginBottom: "0.75rem", color: "#2B4EAF" }}>
        Entidade de RAL Competente
      </h3>
      <div style={{ background: "#f0f4ff", border: "1px solid #2B4EAF", borderRadius: "8px", padding: "1rem", marginTop: "0.75rem" }}>
        <p style={{ margin: "0.25rem 0", fontWeight: 600, color: "#2B4EAF" }}>
          [A preencher pela Laila Fernandes Chreim]
        </p>
        <p style={{ margin: "0.5rem 0 0 0", fontSize: "0.9rem", color: "#666" }}>
          Exemplo: Centro de Arbitragem de Conflitos de Consumo de Lisboa
        </p>
      </div>

      <h3 style={{ fontSize: "1.15rem", fontWeight: 600, marginTop: "2rem", marginBottom: "0.75rem", color: "#2B4EAF" }}>
        Como Aceder à RAL?
      </h3>
      <p>
        A lista atualizada das Entidades de Resolução Alternativa de Litígios de Consumo pode ser consultada no Portal do Consumidor, em <a href="https://www.consumidor.pt" target="_blank" rel="noopener noreferrer" style={{ color: "#2B4EAF", fontWeight: 600 }}>www.consumidor.pt</a>.
      </p>

      <h3 style={{ fontSize: "1.15rem", fontWeight: 600, marginTop: "2rem", marginBottom: "0.75rem", color: "#2B4EAF" }}>
        Contacto
      </h3>
      <p>
        Para mais informações sobre RAL ou para apresentar uma reclamação, contacte-nos através do telefone {LEGAL_PHONE}, email {LEGAL_EMAIL} ou WhatsApp.
      </p>
    </div>
  );
}

/* ─── Livro de Reclamações ─────────────────────────────────────────── */
function PolicyLivroReclamacoes() {
  return (
    <div className="policy-content">
      <h2 style={{ fontSize: "1.75rem", fontWeight: 700, marginBottom: "1.5rem", color: "#1a1a2e" }}>
        Livro de Reclamações Eletrónico
      </h2>
      <p style={{ color: "#666", marginBottom: "1rem", fontSize: "0.9rem" }}>
        Última atualização: 17 de abril de 2026
      </p>

      <h3 style={{ fontSize: "1.15rem", fontWeight: 600, marginTop: "2rem", marginBottom: "0.75rem", color: "#2B4EAF" }}>
        O que é o Livro de Reclamações?
      </h3>
      <p>
        O Livro de Reclamações Eletrónico é uma plataforma oficial que permite aos consumidores apresentar reclamações de forma formal e online. As reclamações são encaminhadas para as entidades competentes e registadas no sistema.
      </p>

      <h3 style={{ fontSize: "1.15rem", fontWeight: 600, marginTop: "2rem", marginBottom: "0.75rem", color: "#2B4EAF" }}>
        Como Apresentar uma Reclamação?
      </h3>
      <p>
        Pode apresentar a sua reclamação através do Livro de Reclamações Eletrónico, acedendo ao seguinte link:
      </p>
      <div style={{ background: "#f0f4ff", border: "1px solid #2B4EAF", borderRadius: "8px", padding: "1rem", marginTop: "0.75rem", textAlign: "center" }}>
        <a href="https://www.livroreclamacoes.pt/" target="_blank" rel="noopener noreferrer" style={{ color: "#2B4EAF", fontWeight: 600, fontSize: "1.1rem", textDecoration: "none" }}>
          Aceder ao Livro de Reclamações Eletrónico →
        </a>
      </div>

      <h3 style={{ fontSize: "1.15rem", fontWeight: 600, marginTop: "2rem", marginBottom: "0.75rem", color: "#2B4EAF" }}>
        Contacto Direto
      </h3>
      <p>
        Também pode contactar-nos diretamente para apresentar uma reclamação através do telefone {LEGAL_PHONE}, email {LEGAL_EMAIL} ou WhatsApp. Estamos disponíveis para o ajudar e resolver qualquer questão.
      </p>
    </div>
  );
}

/* ─── Main Policies Component ──────────────────────────────────────── */
export default function Policies({ initialTab = "termos" }: { initialTab?: PolicyTab }) {
  const [activeTab, setActiveTab] = useState<PolicyTab>(initialTab);

  const renderContent = () => {
    switch (activeTab) {
      case "termos":
        return <PolicyTermos />;
      case "privacidade":
        return <PolicyPrivacidade />;
      case "devolucoes":
        return <PolicyDevolucoes />;
      case "garantia":
        return <PolicyGarantia />;
      case "ral":
        return <PolicyRAL />;
      case "livro-reclamacoes":
        return <PolicyLivroReclamacoes />;
      default:
        return <PolicyTermos />;
    }
  };

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#f9f9f9", paddingTop: "80px" }}>
      <div style={{ maxWidth: "1000px", margin: "0 auto", padding: "40px 24px" }}>
        {/* Header */}
        <div style={{ marginBottom: "40px", textAlign: "center" }}>
          <h1 style={{ fontSize: "2.5rem", fontWeight: 700, color: "#1a1a2e", marginBottom: "8px" }}>
            Políticas e Informações Legais
          </h1>
          <p style={{ fontSize: "1rem", color: "#666" }}>
            Ninho do Dragão – by Makiwa
          </p>
        </div>

        {/* Tabs */}
        <div style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "8px",
          marginBottom: "32px",
          borderBottom: "2px solid #e5e7eb",
          paddingBottom: "16px",
        }}>
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                padding: "10px 16px",
                borderRadius: "8px",
                border: "none",
                backgroundColor: activeTab === tab.id ? "#2B4EAF" : "transparent",
                color: activeTab === tab.id ? "white" : "#666",
                fontWeight: activeTab === tab.id ? 600 : 500,
                fontSize: "14px",
                cursor: "pointer",
                transition: "all 0.2s ease",
                fontFamily: "Montserrat, sans-serif",
              }}
              onMouseEnter={e => {
                if (activeTab !== tab.id) {
                  e.currentTarget.style.backgroundColor = "#f0f4ff";
                }
              }}
              onMouseLeave={e => {
                if (activeTab !== tab.id) {
                  e.currentTarget.style.backgroundColor = "transparent";
                }
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div style={{
          backgroundColor: "white",
          borderRadius: "12px",
          padding: "40px",
          boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
          lineHeight: 1.7,
        }}>
          {renderContent()}
        </div>

        {/* Footer Info */}
        <div style={{
          marginTop: "40px",
          padding: "24px",
          backgroundColor: "white",
          borderRadius: "12px",
          textAlign: "center",
          fontSize: "12px",
          color: "#999",
        }}>
          <p style={{ margin: "0 0 8px 0" }}>
            © 2026 Ninho do Dragão – by Makiwa. Todos os direitos reservados.
          </p>
          <p style={{ margin: 0 }}>
            Para questões ou esclarecimentos, contacte-nos através do telefone {LEGAL_PHONE} ou email {LEGAL_EMAIL}.
          </p>
        </div>
      </div>
    </div>
  );
}
