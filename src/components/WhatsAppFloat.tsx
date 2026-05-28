import { whatsappQuoteUrl } from "@/lib/quote";
import whatsappLogo from "@/assets/whatsapp-logo.png";

export function WhatsAppFloat() {
  return (
    <a
      href={whatsappQuoteUrl()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chatear por WhatsApp"
      className="fixed bottom-6 right-6 z-50 group inline-flex items-center gap-2 h-14 hover:px-5 hover:bg-white justify-center rounded-full shadow-elegant hover:shadow-lg transition-all duration-300"
    >
      <img src={whatsappLogo} alt="WhatsApp" className="w-14 h-14 shrink-0" />
      <span className="hidden group-hover:inline whitespace-nowrap text-xs uppercase tracking-[0.2em] font-medium text-[#25D366]">
        WhatsApp
      </span>
    </a>
  );
}