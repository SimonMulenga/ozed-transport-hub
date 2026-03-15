import { motion } from "framer-motion";
import { ShieldCheck, Users, DollarSign, Sparkles, CalendarCheck, Globe } from "lucide-react";

const benefits = [
  { icon: ShieldCheck, title: "Safe & Reliable", desc: "Your safety is our top priority on every journey." },
  { icon: Users, title: "Professional Drivers", desc: "Experienced, courteous drivers you can trust." },
  { icon: DollarSign, title: "Affordable Packages", desc: "Competitive pricing for all transport needs." },
  { icon: Sparkles, title: "Clean & Comfortable Vehicles", desc: "Well-maintained fleet for a premium experience." },
  { icon: CalendarCheck, title: "Flexible Bookings", desc: "Easy scheduling that fits your plans." },
  { icon: Globe, title: "Nationwide Service", desc: "Serving Lusaka and destinations across Zambia." },
];

const WhyChooseUs = () => {
  return (
    <section className="section-padding bg-foreground">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-accent font-display font-semibold text-sm tracking-widest uppercase mb-3">Our Promise</p>
          <h2 className="font-display text-3xl md:text-5xl font-bold tracking-tight text-primary-foreground">Why Choose Us</h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {benefits.map((b, i) => (
            <motion.div
              key={b.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="group p-6 rounded-[16px] border border-primary/10 hover:border-accent/30 transition-colors bg-primary/5"
            >
              <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mb-4 group-hover:bg-accent/20 transition-colors">
                <b.icon className="w-6 h-6 text-accent" />
              </div>
              <h3 className="font-display font-bold text-primary-foreground mb-1">{b.title}</h3>
              <p className="text-sm text-primary-foreground/60 leading-relaxed">{b.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
