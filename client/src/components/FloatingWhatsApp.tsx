import { MessageCircle } from "lucide-react";
import { siteConfig } from "@/lib/site";

export default function FloatingWhatsApp() {
  const handleWhatsAppClick = () => {
    const message = encodeURIComponent(siteConfig.whatsappDefaultMessage);
    window.open(`https://wa.me/${siteConfig.whatsappNumber}?text=${message}`, "_blank");
  };

  return (
    <button
      onClick={handleWhatsAppClick}
      className="fixed bottom-6 right-6 z-40 bg-[#25D366] hover:bg-[#20BA5A] text-white rounded-full p-4 shadow-2xl transition-all duration-300 hover:scale-110"
      title="Contacta-nos por WhatsApp"
      aria-label="Botão WhatsApp"
    >
      <MessageCircle className="w-6 h-6" />
    </button>
  );
}
