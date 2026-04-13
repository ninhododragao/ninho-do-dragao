/**
 * Design: Artesanal Mágico
 * Dados de contacto e integração WhatsApp
 */

// Substitui com o teu número de WhatsApp
export const WHATSAPP_NUMBER = "351XXXXXXXXX"; // Formato: país + número sem espaços

export const CONTACT_INFO = {
  whatsapp: WHATSAPP_NUMBER,
  email: "contacto@ninhododragao.pt",
  instagram: "https://instagram.com/ninhododragao",
  facebook: "https://facebook.com/ninhododragao",
};

/**
 * Gera URL de WhatsApp com mensagem pré-definida
 */
export const getWhatsAppLink = (message?: string) => {
  const defaultMessage = encodeURIComponent(
    message || "Olá! Gostaria de saber mais sobre os vossos artigos personalizados."
  );
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${defaultMessage}`;
};

/**
 * Gera URL de WhatsApp para compra personalizada
 */
export const getWhatsAppCustomOrderLink = (orderData?: {
  name?: string;
  productType?: string;
  description?: string;
}) => {
  let message = "Olá! Tenho uma ideia para um artigo personalizado.";
  
  if (orderData?.name) {
    message += `\n\nNome: ${orderData.name}`;
  }
  if (orderData?.productType) {
    message += `\nTipo de Produto: ${orderData.productType}`;
  }
  if (orderData?.description) {
    message += `\nDescrição: ${orderData.description}`;
  }

  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
};
