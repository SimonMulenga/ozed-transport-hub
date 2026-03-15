import { motion } from "framer-motion";
import toyotaCoaster from "@/assets/toyota-coaster.png";
import gwmP300 from "@/assets/gwm-p300.png";
import weddingSedans from "@/assets/wedding-sedans.png";

const vehicles = [
  {
    name: "Toyota Coaster",
    image: toyotaCoaster,
    desc: "Travel Together. Travel Comfortably. Perfect for big groups — weddings, church services, school trips, corporate events, funerals, and out-of-town travel.",
    prices: [
      { label: "Local (Lusaka)", price: "K2,500" },
      { label: "Outside Lusaka", price: "K3,500" },
    ],
    features: ["Professional Driver Included", "Spacious Seating", "Clean & Well Maintained", "Ideal For Long Distance"],
  },
  {
    name: "GWM P300 4x4",
    image: gwmP300,
    desc: "Power. Presence. Performance. Perfect for executive travel, site visits, corporate bookings, VIP transfers, long distance trips, and weekend getaways.",
    prices: [
      { label: "Local (Lusaka)", price: "K2,500" },
      { label: "Outside Lusaka", price: "K3,500" },
    ],
    features: ["Professional Driver Included", "Air Conditioned Comfort", "Clean & Well Maintained", "Flexible Bookings"],
  },
  {
    name: "Luxury Wedding Sedans",
    image: weddingSedans,
    desc: "Arrive In Style. Leave A Statement. Elegance. Class. Prestige. Perfect for bridal teams, groom & groomsmen, VIP family members, and photo sessions.",
    prices: [
      { label: "Per Vehicle", price: "K2,500" },
      { label: "3 Vehicles Package", price: "K7,000" },
    ],
    features: ["Professional Chauffeur", "Fuel Included", "Executive Comfort", "Perfect For Bridal Entry"],
  },
];

const FleetSection = () => {
  return (
    <section id="fleet" className="section-padding bg-muted/50">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-accent font-display font-semibold text-sm tracking-widest uppercase mb-3">Our Vehicles</p>
          <h2 className="font-display text-3xl md:text-5xl font-bold tracking-tight text-foreground">Our Fleet</h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {vehicles.map((v, i) => (
            <motion.div
              key={v.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="card-premium group"
            >
              <div className="card-inner aspect-video bg-muted">
                <img src={v.image} alt={v.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="p-5">
                <h3 className="font-display text-xl font-bold text-foreground mb-2">{v.name}</h3>
                <p className="text-muted-foreground text-sm mb-4 leading-relaxed">{v.desc}</p>

                <div className="flex flex-wrap gap-3 mb-4">
                  {v.prices.map((p) => (
                    <div key={p.label} className="bg-primary/5 rounded-xl px-3 py-2">
                      <p className="text-[11px] text-muted-foreground">{p.label}</p>
                      <p className="font-mono text-primary font-bold tabular-nums">{p.price}</p>
                    </div>
                  ))}
                </div>

                <ul className="space-y-1.5 mb-5">
                  {v.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <span className="w-1.5 h-1.5 rounded-full bg-accent" /> {f}
                    </li>
                  ))}
                </ul>

                <a href="#booking" className="block text-center bg-primary text-primary-foreground py-3 rounded-xl font-semibold text-sm btn-glow hover:scale-[1.02] active:scale-[0.98] transition-transform">
                  Book This Vehicle
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FleetSection;
