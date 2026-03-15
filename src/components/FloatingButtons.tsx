import { MessageCircle, Phone } from "lucide-react";

const FloatingButtons = () => {
  return (
    <>
      {/* WhatsApp */}
      <a
        href="https://wa.me/260772344849"
        target="_blank"
        rel="noopener noreferrer"
        className="floating-whatsapp"
        aria-label="WhatsApp"
      >
        <MessageCircle className="w-6 h-6 text-primary-foreground" />
      </a>

      {/* Call Now */}
      <a
        href="tel:+260772344849"
        className="fixed bottom-6 left-6 z-50 w-14 h-14 rounded-full bg-primary flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
        aria-label="Call Now"
      >
        <Phone className="w-6 h-6 text-primary-foreground" />
      </a>
    </>
  );
};

export default FloatingButtons;
