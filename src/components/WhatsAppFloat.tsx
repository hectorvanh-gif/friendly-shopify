import { whatsappQuoteUrl } from "@/lib/quote";

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} fill="currentColor" aria-hidden="true">
      <path d="M19.11 17.205c-.372 0-1.088 1.39-1.518 1.39a.63.63 0 0 1-.315-.1c-.802-.402-1.504-.817-2.163-1.447-.545-.516-1.146-1.29-1.46-1.963a.426.426 0 0 1-.073-.215c0-.33.99-.945.99-1.49 0-.143-.73-2.09-.832-2.335-.143-.372-.214-.487-.6-.487-.187 0-.36-.043-.53-.043-.302 0-.53.115-.746.315-.688.645-1.032 1.318-1.06 2.264v.114c-.015.99.472 1.977 1.017 2.78 1.23 1.82 2.506 3.41 4.554 4.34.616.287 2.035.888 2.722.888.817 0 2.15-.515 2.478-1.318.13-.33.158-.673.158-1.017 0-.057-.014-.114-.014-.171-.084-.286-2.336-1.39-2.607-1.39zM16.077 7.165c4.917 0 8.94 4.022 8.94 8.94 0 2.063-.7 4.026-2 5.605l1.143 3.397-3.534-1.13c-1.502 1.063-3.27 1.62-5.05 1.62-4.917 0-8.94-4.024-8.94-8.94 0-4.918 4.023-8.94 8.94-8.94zm0-1.79c-5.92 0-10.73 4.808-10.73 10.73 0 1.927.516 3.825 1.504 5.482L5 27.677l5.91-1.892a10.642 10.642 0 0 0 5.166 1.337c5.92 0 10.73-4.808 10.73-10.73S22 5.376 16.077 5.376z" />
    </svg>
  );
}

export function WhatsAppFloat() {
  return (
    <a
      href={whatsappQuoteUrl()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chatear por WhatsApp"
      className="fixed bottom-6 right-6 z-50 group inline-flex items-center gap-2 h-14 w-14 hover:w-auto hover:px-5 justify-center rounded-full bg-[#25D366] text-white shadow-elegant hover:shadow-lg transition-all duration-300 overflow-hidden"
    >
      <WhatsAppIcon className="w-7 h-7 shrink-0" />
      <span className="hidden group-hover:inline whitespace-nowrap text-xs uppercase tracking-[0.2em] font-medium">
        WhatsApp
      </span>
    </a>
  );
}