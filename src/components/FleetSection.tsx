import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Users, Shield, Filter } from "lucide-react";

import coasterFront from "@/assets/coaster-front-2.jpg";
import coasterFleet from "@/assets/coaster-fleet-2.jpg";
import coasterInterior from "@/assets/coaster-interior-2.jpg";
import weddingMercedes from "@/assets/wedding-mercedes-2.jpg";
import hondaFitDashboard from "@/assets/honda-fit-dashboard.jpg";
import hondaFitFront from "@/assets/honda-fit-front.jpg";
import hondaFitBack from "@/assets/honda-fit-back.jpg";
import vanguard from "@/assets/vanguard.jpg";
import shuttleFront from "@/assets/shuttle-front.jpg";
import shuttleBack from "@/assets/shuttle-back.jpg";
import shuttleDashboard from "@/assets/shuttle-dashboard.jpg";

type VehicleCategory = "All" | "Bus" | "SUV" | "Sedan" | "Economy";

interface Vehicle {
  name: string;
  category: VehicleCategory;
  images: string[];
  captions: string[];
  desc: string;
  prices: { label: string; price: string; perDay: boolean }[];
  features: string[];
  capacity: string;
  bookingName: string;
}

const vehicles: Vehicle[] = [
  {
    name: "Toyota Coaster Bus",
    category: "Bus",
    images: [coasterFront, coasterFleet, coasterInterior],
    captions: ["Front Exterior", "Our Fleet", "Spacious Interior"],
    desc: "Perfect for big groups — weddings, church trips, corporate events, funerals, and out-of-town travel.",
    prices: [
      { label: "Local (Lusaka)", price: "K2,500", perDay: true },
      { label: "Outside Lusaka", price: "K3,500", perDay: true },
    ],
    features: ["Professional Driver", "25+ Seats", "Clean & Maintained", "Long Distance Ready"],
    capacity: "25+ Passengers",
    bookingName: "Toyota Coaster Bus",
  },
  {
    name: "Toyota Quantum",
    category: "Bus",
    images: [shuttleFront, shuttleDashboard, shuttleBack],
    captions: ["Exterior", "Dashboard", "Interior"],
    desc: "Ideal for medium groups — airport transfers, team transport, and family trips.",
    prices: [
      { label: "Within Lusaka", price: "K2,500", perDay: true },
      { label: "Outside Lusaka", price: "K3,000", perDay: true },
    ],
    features: ["Air Conditioned", "Comfortable Seating", "Fuel Efficient", "Professional Driver"],
    capacity: "14 Passengers",
    bookingName: "Toyota Quantum",
  },
  {
    name: "Toyota Vanguard",
    category: "SUV",
    images: [vanguard],
    captions: ["Exterior"],
    desc: "Comfortable SUV for business travel, city transfers, and personal trips.",
    prices: [
      { label: "Within Lusaka", price: "K1,200", perDay: true },
      { label: "Outside Lusaka", price: "K1,800", perDay: true },
    ],
    features: ["Spacious Interior", "Air Conditioned", "Fuel Efficient", "Flexible Bookings"],
    capacity: "5 Passengers",
    bookingName: "Toyota Vanguard",
  },
  {
    name: "Mitsubishi Pajero",
    category: "SUV",
    images: [vanguard],
    captions: ["Exterior"],
    desc: "Rugged and powerful SUV — ideal for executive travel and long-distance trips.",
    prices: [
      { label: "Within Lusaka", price: "K2,000", perDay: true },
      { label: "Outside Lusaka", price: "K2,500", perDay: true },
    ],
    features: ["4x4 Capable", "Executive Comfort", "Professional Driver", "Long Distance Ready"],
    capacity: "5 Passengers",
    bookingName: "Mitsubishi Pajero",
  },
  {
    name: "Toyota Fortuner",
    category: "SUV",
    images: [vanguard],
    captions: ["Exterior"],
    desc: "Premium executive SUV for VIP transport, corporate travel, and special occasions.",
    prices: [
      { label: "Within Lusaka", price: "K2,000", perDay: true },
      { label: "Outside Lusaka", price: "K2,500", perDay: true },
    ],
    features: ["Executive Class", "Spacious", "Air Conditioned", "Professional Driver"],
    capacity: "7 Passengers",
    bookingName: "Toyota Fortuner",
  },
  {
    name: "Honda Fit",
    category: "Economy",
    images: [hondaFitFront, hondaFitDashboard, hondaFitBack],
    captions: ["Front Interior", "Dashboard", "Rear Seating"],
    desc: "Budget-friendly and fuel efficient — perfect for small trips, errands, and city travel.",
    prices: [
      { label: "Within Lusaka", price: "K800", perDay: true },
      { label: "Outside Lusaka", price: "K1,200", perDay: true },
    ],
    features: ["Fuel Efficient", "Air Conditioned", "Clean & Comfortable", "Affordable"],
    capacity: "4 Passengers",
    bookingName: "Honda Fit",
  },
  {
    name: "Wedding Sedans (Mercedes)",
    category: "Sedan",
    images: [weddingMercedes],
    captions: ["Mercedes-Benz Fleet"],
    desc: "Arrive in style. Elegant Mercedes-Benz sedans for bridal teams, VIP guests, and photo sessions.",
    prices: [
      { label: "Per Vehicle", price: "K2,500", perDay: false },
      { label: "3 Vehicle Package", price: "K7,000", perDay: false },
    ],
    features: ["Professional Chauffeur", "Fuel Included", "Executive Comfort", "Perfect For Weddings"],
    capacity: "4 per vehicle",
    bookingName: "Luxury Wedding Sedan",
  },
];

const categories: VehicleCategory[] = ["All", "Bus", "SUV", "Sedan", "Economy"];

const ImageGallery = ({ images, captions, name }: { images: string[]; captions: string[]; name: string }) => {
  const [current, setCurrent] = useState(0);

  return (
    <div className="relative aspect-[4/3] overflow-hidden rounded-t-2xl group">
      <img
        src={images[current]}
        alt={`${name} - ${captions[current]}`}
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
      />
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-3">
        <p className="text-white/90 text-xs font-medium">{captions[current]}</p>
        {images.length > 1 && (
          <div className="flex gap-1.5 mt-2">
            {images.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrent(idx)}
                className={`h-1.5 rounded-full transition-all duration-300 ${idx === current ? "w-6 bg-accent" : "w-1.5 bg-white/50"}`}
              />
            ))}
          </div>
        )}
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
  const [activeFilter, setActiveFilter] = useState<VehicleCategory>("All");

  const filtered = activeFilter === "All" ? vehicles : vehicles.filter((v) => v.category === activeFilter);

  return (
    <section id="fleet" className="section-padding bg-muted/50">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <p className="text-accent font-display font-semibold text-sm tracking-widest uppercase mb-3">Our Vehicles</p>
          <h2 className="font-display text-3xl md:text-5xl font-bold tracking-tight text-foreground">Our Fleet</h2>
          <p className="text-muted-foreground mt-4 max-w-xl mx-auto">Real vehicles. Real comfort. Browse our full fleet and book your ride today.</p>
        </motion.div>

        {/* Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 flex items-center gap-1.5 ${
                activeFilter === cat
                  ? "bg-primary text-primary-foreground shadow-lg"
                  : "bg-card border border-border text-muted-foreground hover:text-foreground hover:border-primary/30"
              }`}
            >
              {cat === "All" && <Filter className="w-3.5 h-3.5" />}
              {cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((v, i) => (
            <motion.div
              key={v.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-card border border-border rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <ImageGallery images={v.images} captions={v.captions} name={v.name} />

              <div className="p-5 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-display text-lg font-bold text-foreground">{v.name}</h3>
                  <span className="flex items-center gap-1 text-xs text-muted-foreground bg-muted rounded-full px-2.5 py-1">
                    <Users className="w-3 h-3" /> {v.capacity}
                  </span>
                </div>

                <p className="text-muted-foreground text-sm leading-relaxed">{v.desc}</p>

                <div className="flex flex-wrap gap-3">
                  {v.prices.map((p) => (
                    <div key={p.label} className="bg-primary/5 border border-primary/10 rounded-xl px-3 py-2 flex-1 min-w-[110px]">
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
                  href={`#booking?vehicle=${encodeURIComponent(v.bookingName)}`}
                  onClick={(e) => {
                    e.preventDefault();
                    const bookingSection = document.getElementById("booking");
                    if (bookingSection) {
                      bookingSection.scrollIntoView({ behavior: "smooth" });
                      // Dispatch custom event to pre-select vehicle
                      window.dispatchEvent(new CustomEvent("selectVehicle", { detail: v.bookingName }));
                    }
                  }}
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
