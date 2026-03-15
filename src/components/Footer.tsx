import { Phone, Mail, MapPin } from "lucide-react";
import logo from "@/assets/logo.jpeg";

const Footer = () => {
  return (
    <footer className="bg-foreground py-16">
      <div className="section-container">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-12">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <img src={logo} alt="Ozed Transport" className="h-12 rounded-md" />
              <div>
                <p className="font-display font-bold text-primary-foreground">OZED TRANSPORT SERVICES</p>
                <p className="text-xs text-primary-foreground/50">Here To Take You There</p>
              </div>
            </div>
            <p className="text-primary-foreground/60 text-sm leading-relaxed">
              Premium vehicle hire and logistics serving Lusaka & Nationwide. Safe • Reliable • Affordable.
            </p>
          </div>

          <div>
            <h4 className="font-display font-bold text-primary-foreground mb-4">Quick Links</h4>
            <div className="space-y-2">
              {["Services", "Fleet", "Pricing", "Booking", "Contact"].map((l) => (
                <a key={l} href={`#${l.toLowerCase()}`} className="block text-sm text-primary-foreground/60 hover:text-accent transition-colors">
                  {l}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-display font-bold text-primary-foreground mb-4">Contact</h4>
            <div className="space-y-3 text-sm">
              <a href="tel:+260772344849" className="flex items-center gap-2 text-primary-foreground/60 hover:text-accent transition-colors">
                <Phone className="w-4 h-4" /> 0772 344 849
              </a>
              <a href="tel:+260760039168" className="flex items-center gap-2 text-primary-foreground/60 hover:text-accent transition-colors">
                <Phone className="w-4 h-4" /> 0760 039 168
              </a>
              <a href="mailto:ozedzm@gmail.com" className="flex items-center gap-2 text-primary-foreground/60 hover:text-accent transition-colors">
                <Mail className="w-4 h-4" /> ozedzm@gmail.com
              </a>
              <p className="flex items-center gap-2 text-primary-foreground/60">
                <MapPin className="w-4 h-4" /> Lusaka, Zambia
              </p>
            </div>
          </div>
        </div>

        <div className="border-t border-primary/10 pt-8 text-center">
          <p className="text-sm text-primary-foreground/40">
            © {new Date().getFullYear()} Ozed Transport Services. All rights reserved. Serving Lusaka & Nationwide.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
