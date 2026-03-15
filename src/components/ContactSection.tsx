import { motion } from "framer-motion";
import { Phone, Mail, MapPin, MessageCircle } from "lucide-react";

const ContactSection = () => {
  return (
    <section id="contact" className="section-padding bg-muted/50">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-accent font-display font-semibold text-sm tracking-widest uppercase mb-3">Get In Touch</p>
          <h2 className="font-display text-3xl md:text-5xl font-bold tracking-tight text-foreground">Contact Us</h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div className="card-premium p-6 flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                <Phone className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="font-display font-bold text-foreground mb-1">Call / WhatsApp</h3>
                <a href="tel:+260772344849" className="block text-primary font-mono font-semibold">0772 344 849</a>
                <a href="tel:+260760039168" className="block text-primary font-mono font-semibold">0760 039 168</a>
              </div>
            </div>

            <div className="card-premium p-6 flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                <Mail className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="font-display font-bold text-foreground mb-1">Email</h3>
                <a href="mailto:ozedzm@gmail.com" className="text-primary font-medium">ozedzm@gmail.com</a>
              </div>
            </div>

            <div className="card-premium p-6 flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                <MapPin className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="font-display font-bold text-foreground mb-1">Location</h3>
                <p className="text-muted-foreground">Lusaka, Zambia</p>
                <p className="text-sm text-muted-foreground">Serving Lusaka & Nationwide</p>
              </div>
            </div>

            <a
              href="https://wa.me/260772344849"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 bg-[#25D366] text-primary-foreground py-4 rounded-xl font-display font-semibold btn-glow hover:scale-[1.02] active:scale-[0.98] transition-transform"
            >
              <MessageCircle className="w-5 h-5" /> Chat on WhatsApp
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="card-premium overflow-hidden h-[400px] lg:h-auto"
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d246323.5684554661!2d28.2049!3d-15.4167!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1940f33e4fffffff%3A0x1cc210d7a1a77c0!2sLusaka%2C%20Zambia!5e0!3m2!1sen!2s!4v1"
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: 400 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Ozed Transport Services Location"
              className="rounded-[12px]"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
