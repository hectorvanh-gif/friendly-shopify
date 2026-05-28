import { MessageCircle } from "lucide-react";
import { whatsappQuoteUrl } from "@/lib/quote";

export function WhatsAppFloat() {
  return (
    <a
      href={whatsappQuoteUrl()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chatear por WhatsApp"
      className="fixed bottom-6 right-6 z-50 group inline-flex items-center gap-2 h-14 w-14 hover:w-auto hover:px-5 justify-center rounded-full bg-[#25D366] text-white shadow-elegant hover:shadow-lg transition-all duration-300 overflow-hidden"
    >
      <MessageCircle className="w-6 h-6 shrink-0" />
      <span className="hidden group-hover:inline whitespace-nowrap text-xs uppercase tracking-[0.2em] font-medium">
        WhatsApp
      </span>
    </a>
  );
}