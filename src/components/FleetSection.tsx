import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Users, Fuel, Shield } from "lucide-react";

import coasterFront from "@/assets/coaster-front.jpg";
import coasterFleet from "@/assets/coaster-fleet.jpg";
import coasterInterior from "@/assets/coaster-interior.jpg";
import weddingMercedes from "@/assets/wedding-mercedes.jpg";
import shuttleFront from "@/assets/shuttle-front.jpg";
import shuttleBack from "@/assets/shuttle-back.jpg";
import shuttleDashboard from "@/assets/shuttle-dashboard.jpg";

const vehicles = [
  {
    name: "Toyota Coaster Bus",
    images: [coasterFront, coasterFleet, coasterInterior],
    captions: ["Front Exterior", "Our Fleet", "Spacious Interior"],
    desc: "Travel Together. Travel Comfortably. Perfect for big groups — weddings, church services, school trips, corporate events, funerals, and out-of-town travel.",
    prices: [
      { label: "Local (Lusaka)", price: "K2,500", perDay: true },
      { label: "Outside Lusaka", price: "K3,500", perDay: true },
    ],
    features: ["Professional Driver Included", "Spacious Seating", "Clean & Well Maintained", "Ideal For Long Distance"],
    capacity: "25+ Passengers",
  },
  {
    name: "Luxury Wedding Sedans",
    images: [weddingMercedes],
    captions: ["Mercedes-Benz Fleet"],
    desc: "Arrive In Style. Leave A Statement. Elegance. Class. Prestige. Perfect for bridal teams, groom & groomsmen, VIP family members, and photo sessions.",
    prices: [
      { label: "Per Vehicle", price: "K2,500", perDay: false },
      { label: "3 Vehicle Package", price: "K7,000", perDay: false },
    ],
    features: ["Professional Chauffeur", "Fuel Included", "Executive Comfort", "Perfect For Bridal Entry"],
    capacity: "4 Passengers per vehicle",
  },
  {
    name: "Shuttle / Small Car",
    images: [shuttleDashboard, shuttleFront, shuttleBack],
    captions: ["Dashboard View", "Front Interior", "Rear Seating"],
    desc: "Compact, clean, and comfortable. Ideal for airport pickups, city transfers, business travel, and personal trips around Lusaka and beyond.",
    prices: [
      { label: "Local (Lusaka)", price: "K2,500", perDay: true },
      { label: "Outside Lusaka", price: "K3,500", perDay: true },
    ],
    features: ["Clean & Comfortable", "Air Conditioned", "Fuel Efficient", "Flexible Bookings"],
    capacity: "4 Passengers",
  },
];

const ImageGallery = ({ images, captions, name }: { images: string[]; captions: string[]; name: string }) => {
  const [current, setCurrent] = useState(0);

  if (images.length === 1) {
    return (
      <div className="aspect-[4/3] overflow-hidden rounded-t-2xl">
        <img src={images[0]} alt={name} className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
      </div>
    );
  }

  return (
    <div className="relative aspect-[4/3] overflow-hidden rounded-t-2xl group">
      <img
        src={images[current]}
        alt={`${name} - ${captions[current]}`}
        className="w-full h-full object-cover transition-all duration-500"
      />
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-3">
        <p className="text-white/90 text-xs font-medium">{captions[current]}</p>
        <div className="flex gap-1.5 mt-2">
          {images.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrent(idx)}
              className={`h-1.5 rounded-full transition-all duration-300 ${idx === current ? "w-6 bg-accent" : "w-1.5 bg-white/50"}`}
            />
          ))}
        </div>
      </div>
      {images.length > 1 && (
        <>
          <button
            onClick={() => setCurrent((p) => (p === 0 ? images.length - 1 : p - 1))}
            className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/40 backdrop-blur-sm text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/60"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={() => setCurrent((p) => (p === images.length - 1 ? 0 : p + 1))}
            className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/40 backdrop-blur-sm text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/60"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </>
      )}
    </div>
  );
};

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
          <p className="text-muted-foreground mt-4 max-w-xl mx-auto">Real vehicles. Real comfort. Browse our fleet and book your ride today.</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {vehicles.map((v, i) => (
            <motion.div
              key={v.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="bg-card border border-border rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 group"
            >
              <ImageGallery images={v.images} captions={v.captions} name={v.name} />

              <div className="p-5 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-display text-xl font-bold text-foreground">{v.name}</h3>
                  <span className="flex items-center gap-1 text-xs text-muted-foreground bg-muted rounded-full px-2.5 py-1">
                    <Users className="w-3 h-3" /> {v.capacity}
                  </span>
                </div>

                <p className="text-muted-foreground text-sm leading-relaxed">{v.desc}</p>

                <div className="flex flex-wrap gap-3">
                  {v.prices.map((p) => (
                    <div key={p.label} className="bg-primary/5 border border-primary/10 rounded-xl px-3 py-2 flex-1 min-w-[120px]">
                      <p className="text-[11px] text-muted-foreground">{p.label}</p>
                      <p className="font-mono text-primary font-bold tabular-nums text-lg">{p.price}</p>
                      {p.perDay && <p className="text-[10px] text-muted-foreground">per day</p>}
                    </div>
                  ))}
                </div>

                <ul className="grid grid-cols-2 gap-1.5">
                  {v.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Shield className="w-3 h-3 text-accent flex-shrink-0" /> {f}
                    </li>
                  ))}
                </ul>

                <a
                  href="#booking"
                  className="block text-center bg-primary text-primary-foreground py-3 rounded-xl font-semibold text-sm btn-glow hover:scale-[1.02] active:scale-[0.98] transition-transform"
                >
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
