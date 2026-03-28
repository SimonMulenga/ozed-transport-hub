import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { useState } from "react";

const pricingData = [
  {
    name: "Toyota Coaster",
    subtitle: "Group Transport",
    prices: [
      { label: "Local (Lusaka)", value: "K2,500" },
      { label: "Outside Lusaka", value: "K3,500" },
    ],
    features: ["Professional Driver Included", "Spacious Seating", "Ideal For Groups"],
    note: "Fuel Calculated Based On Distance",
    popular: true,
  },
  {
    name: "Toyota Quantum",
    subtitle: "Airport & Group Travel",
    prices: [
      { label: "Local", value: "K2,500" },
      { label: "Outside", value: "K3,000" },
    ],
    features: ["Comfortable Seating", "Air Conditioned", "Reliable Transport"],
  },
  {
    name: "Land Cruiser LC300",
    subtitle: "Luxury SUV",
    prices: [
      { label: "Local", value: "K5,500" },
      { label: "Outside", value: "K6,500" },
    ],
    features: ["Premium Ride", "Executive Comfort", "VIP Transport"],
  },
  {
    name: "GWM P300",
    subtitle: "Pickup & Utility",
    prices: [
      { label: "Local", value: "K2,500" },
      { label: "Outside", value: "K3,500" },
    ],
    features: ["4x4 Power", "Reliable", "Driver Included"],
  },
  {
    name: "Fortuner",
    subtitle: "Executive SUV",
    prices: [
      { label: "Local", value: "K3,000" },
      { label: "Outside", value: "K3,500" },
    ],
    features: ["Comfortable", "Long Distance Ready"],
  },
  {
    name: "Economy Cars",
    subtitle: "Honda Fit / Vitz",
    prices: [
      { label: "Local Only", value: "K600" },
    ],
    features: ["Fuel Efficient", "Budget Friendly"],
  },
  {
    name: "Wedding Package",
    subtitle: "Luxury Sedans",
    prices: [
      { label: "Per Vehicle", value: "K2,500" },
      { label: "3 Vehicle Package", value: "K7,000" },
    ],
    features: ["Chauffeur Included", "Fuel Included", "Premium Experience"],
    note: "Morning Until Reception Drop-Off",
  },
];

const PricingSection = () => {
  const [showAll, setShowAll] = useState(false);

  const visible = showAll ? pricingData : pricingData.slice(0, 3);

  return (
    <section id="pricing" className="section-padding bg-background">
      <div className="section-container">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <p className="text-accent font-semibold text-sm uppercase mb-3">
            Transparent Pricing
          </p>
          <h2 className="text-3xl md:text-5xl font-bold">
            Our Rates
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {visible.map((p, i) => (
            <motion.div
              key={p.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className={`card-premium p-6 relative ${p.popular ? "ring-2 ring-accent" : ""}`}
            >

              {p.popular && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-accent text-white text-xs px-4 py-1 rounded-full">
                  Most Popular
                </span>
              )}

              <h3 className="text-xl font-bold">{p.name}</h3>
              <p className="text-sm text-muted-foreground mb-5">{p.subtitle}</p>

              <div className="space-y-3 mb-6">
                {p.prices.map((pr) => (
                  <div key={pr.label} className="flex justify-between">
                    <span className="text-sm">{pr.label}</span>
                    <span className="font-bold text-primary">{pr.value}</span>
                  </div>
                ))}
              </div>

              <ul className="space-y-2 mb-5">
                {p.features.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-sm">
                    <Check className="w-4 h-4 text-accent" />
                    {f}
                  </li>
                ))}
              </ul>

              {p.note && (
                <p className="text-xs italic mb-4">{p.note}</p>
              )}

              <a
                href="#booking"
                className="block text-center bg-primary text-white py-3 rounded-xl font-semibold"
              >
                Book Now
              </a>

            </motion.div>
          ))}
        </div>

        {/* SHOW MORE */}
        <div className="text-center mt-10">
          <button
            onClick={() => setShowAll(!showAll)}
            className="px-6 py-2 bg-primary text-white rounded-lg"
          >
            {showAll ? "Show Less" : "Show More"}
          </button>
        </div>

      </div>
    </section>
  );
};

export default PricingSection;