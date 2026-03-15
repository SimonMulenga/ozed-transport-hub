import { motion } from "framer-motion";
import { Check } from "lucide-react";

const pricingData = [
  {
    name: "Toyota Coaster",
    subtitle: "Group Transport",
    prices: [
      { label: "Local (Lusaka)", value: "K2,500" },
      { label: "Outside Lusaka", value: "K3,500" },
    ],
    features: ["Professional Driver Included", "Spacious Seating", "Clean & Well Maintained", "Comfortable Interior", "Ideal For Long Distance"],
    note: "Fuel Calculated Based On Distance",
  },
  {
    name: "GWM P300 4x4",
    subtitle: "Executive & Adventure",
    prices: [
      { label: "Local (Lusaka)", value: "K2,500" },
      { label: "Outside Lusaka", value: "K3,500" },
    ],
    features: ["Professional Driver Included", "Air Conditioned Comfort", "Clean & Well Maintained", "Flexible Bookings", "4x4 Power"],
    note: "Fuel Calculated Based On Distance",
    popular: true,
  },
  {
    name: "Wedding Package",
    subtitle: "Luxury Sedans",
    prices: [
      { label: "Per Vehicle", value: "K2,500" },
      { label: "3 Vehicle Package", value: "K7,000" },
    ],
    features: ["Professional Chauffeur", "Fuel Included", "Clean & Well Presented", "Executive Comfort", "Perfect For Bridal Entry"],
    note: "Morning Collection Until Drop-Off At Reception",
  },
];

const PricingSection = () => {
  return (
    <section id="pricing" className="section-padding bg-background">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-accent font-display font-semibold text-sm tracking-widest uppercase mb-3">Transparent Pricing</p>
          <h2 className="font-display text-3xl md:text-5xl font-bold tracking-tight text-foreground">Our Rates</h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {pricingData.map((p, i) => (
            <motion.div
              key={p.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12 }}
              className={`card-premium p-6 md:p-8 relative ${p.popular ? "ring-2 ring-accent" : ""}`}
            >
              {p.popular && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-accent text-accent-foreground text-xs font-bold px-4 py-1 rounded-full">
                  Most Popular
                </span>
              )}
              <h3 className="font-display text-xl font-bold text-foreground">{p.name}</h3>
              <p className="text-sm text-muted-foreground mb-6">{p.subtitle}</p>

              <div className="space-y-3 mb-6">
                {p.prices.map((pr) => (
                  <div key={pr.label} className="flex justify-between items-baseline">
                    <span className="text-sm text-muted-foreground">{pr.label}</span>
                    <span className="font-mono text-2xl font-bold text-primary tabular-nums">{pr.value}</span>
                  </div>
                ))}
              </div>

              <ul className="space-y-2.5 mb-6">
                {p.features.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Check className="w-4 h-4 text-accent shrink-0" /> {f}
                  </li>
                ))}
              </ul>

              <p className="text-xs text-muted-foreground/70 italic mb-5">{p.note}</p>

              <a href="#booking" className="block text-center bg-primary text-primary-foreground py-3 rounded-xl font-semibold text-sm btn-glow hover:scale-[1.02] active:scale-[0.98] transition-transform">
                Book Now
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
