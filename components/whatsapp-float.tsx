import { SITE } from "@/lib/site";
import { WhatsAppIcon } from "./whatsapp-icon";

/**
 * Floating WhatsApp button, fixed bottom-right. Navy background,
 * white WhatsApp icon, hover tooltip, subtle scale pulse every 10 seconds
 * (pulse disabled for reduced motion via CSS).
 */
export function WhatsAppFloat() {
  return (
    <div className="wa-float">
      <a
        href={SITE.whatsapp}
        target="_blank"
        rel="noopener noreferrer"
        className="wa-float__btn"
        aria-label="Chat with an agent on WhatsApp"
      >
        <WhatsAppIcon size={26} />
      </a>
      <span className="wa-float__tip" role="tooltip">
        Chat with an agent
      </span>
    </div>
  );
}
