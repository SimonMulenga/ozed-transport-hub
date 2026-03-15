import { motion } from "framer-motion";
import { Plane, MapPin, Heart, Briefcase, Car } from "lucide-react";

const services = [
  { icon: Plane, title: "Airport Pickups & Drop-offs", desc: "Reliable airport transfer service across Lusaka and nationwide." },
  { icon: MapPin, title: "Long Distance Travel", desc: "Comfortable long-distance journeys with professional drivers." },
  { icon: Heart, title: "Wedding & Event Hire", desc: "Luxury wedding sedans and group transport for your special day." },
  { icon: Briefcase, title: "Business & Family Travel", desc: "Executive and family travel solutions for every occasion." },
  { icon: Car, title: "Local & Out-of-Town Vehicle Hire", desc: "Flexible vehicle hire within Lusaka and beyond." },
];

const ServicesSection = () => {
  return (
    <section id="services" className="section-padding bg-background">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-accent font-display font-semibold text-sm tracking-widest uppercase mb-3">What We Offer</p>
          <h2 className="font-display text-3xl md:text-5xl font-bold tracking-tight text-foreground">Our Services</h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="card-premium group"
            >
              <div className="p-6 md:p-8">
                <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-accent/20 transition-colors">
                  <s.icon className="w-7 h-7 text-primary group-hover:text-accent transition-colors" />
                </div>
                <h3 className="font-display text-lg font-bold text-foreground mb-2">{s.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{s.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
