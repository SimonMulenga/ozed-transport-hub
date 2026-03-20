import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Users, Shield, Filter, Flame } from "lucide-react";

// Toyota Coaster Bus
import coasterFront from "@/assets/coaster-front-2.jpg";
import coasterFleet from "@/assets/coaster-fleet-2.jpg";
import coasterInteriorReal from "@/assets/coaster-interior-real.jpg";

// Toyota Quantum (actual Quantum van images)
import quantumSide from "@/assets/quantum-real.jpg";
import quantumFront from "@/assets/quantum-front.jpg";

// Toyota Vanguard (white SUV)
import vanguardWhite from "@/assets/vanguard-white.jpg";

// Mitsubishi Pajero (silver SUV)
import pajeroReal from "@/assets/pajero-real.jpg";

// Toyota Fortuner (silver SUV)
import fortunerSilver from "@/assets/fortuner-silver.jpg";

// GWM P300 Pickup
import gwmP300 from "@/assets/gwm-p300.png";

// Honda Fit (blue hatchback)
import hondaFitBlue from "@/assets/honda-fit-blue.jpg";
import hondaFitInterior from "@/assets/honda-fit-interior.jpg";
import hondaFitInteriorSide from "@/assets/honda-fit-interior-side.jpg";
import hondaFitDashboard from "@/assets/honda-fit-dashboard-real.jpg";

// Wedding Mercedes (3 white Mercedes sedans)
import mercedesWedding from "@/assets/mercedes-wedding-real.jpg";

// Logo
import logoNew from "@/assets/logo-new.jpg";

type VehicleCategory = "All" | "Bus" | "SUV" | "Sedan" | "Economy" | "Pickup";

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
  mostBooked?: boolean;
}

const vehicles: Vehicle[] = [
  {
    name: "Toyota Coaster Bus",
    category: "Bus",
    images: [coasterFront, coasterFleet, coasterInteriorReal],
    captions: ["Front Exterior", "Our Fleet", "Interior Seating"],
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
    images: [quantumSide, quantumFront],
    captions: ["Side View", "Front View"],
    desc: "Ideal for medium groups — airport transfers, team transport, and family trips.",
    prices: [
      { label: "Within Lusaka", price: "K2,500", perDay: true },
      { label: "Outside Lusaka", price: "K3,000", perDay: true },
    ],
    features: ["Air Conditioned", "Comfortable Seating", "Fuel Efficient", "Professional Driver"],
    capacity: "14 Passengers",
    bookingName: "Toyota Quantum",
    mostBooked: true,
  },
  {
    name: "Toyota Vanguard",
    category: "SUV",
    images: [vanguardWhite],
    captions: ["Exterior"],
    desc: "Executive family SUV. Comfort, class, confidence — perfect for family trips, airport transfers, and corporate travel.",
    prices: [
      { label: "Within Lusaka", price: "K1,200", perDay: true },
      { label: "Outside Lusaka", price: "K1,800", perDay: true },
    ],
    features: ["Spacious & Comfortable", "Air Conditioned", "Professional Driver", "Ideal For Long Distance"],
    capacity: "5 Passengers",
    bookingName: "Toyota Vanguard",
  },
  {
    name: "Mitsubishi Pajero",
    category: "SUV",
    images: [pajeroReal],
    captions: ["Silver Pajero"],
    desc: "Executive 4×4 experience. Luxury, power, and command on the road for VIP transfers and corporate travel.",
    prices: [
      { label: "Within Lusaka", price: "K2,000", perDay: true },
      { label: "Outside Lusaka", price: "K2,500", perDay: true },
    ],
    features: ["4x4 Capable", "Executive Comfort", "Professional Driver", "Ideal For Long Distance"],
    capacity: "5 Passengers",
    bookingName: "Mitsubishi Pajero",
    mostBooked: true,
  },
  {
    name: "Toyota Fortuner",
    category: "SUV",
    images: [fortunerSilver],
    captions: ["Exterior"],
    desc: "Premium executive SUV for VIP transport, corporate travel, and special occasions.",
    prices: [
      { label: "Within Lusaka", price: "K2,000", perDay: true },
      { label: "Outside Lusaka", price: "K2,500", perDay: true },
    ],
    features: ["Executive Class", "Spacious", "Air Conditioned", "Professional Driver"],
    capacity: "7 Passengers",
    bookingName: "Toyota Fortuner",
    mostBooked: true,
  },
  {
    name: "GWM P300",
    category: "Pickup",
    images: [gwmP300],
    captions: ["Exterior"],
    desc: "Power. Presence. Performance. Perfect for executive travel, site visits, and long distance trips.",
    prices: [
      { label: "Local (Lusaka)", price: "K2,500", perDay: true },
      { label: "Outside Lusaka", price: "K3,500", perDay: true },
    ],
    features: ["4x4 Power", "Air Conditioned", "Professional Driver", "Flexible Bookings"],
    capacity: "4 Passengers",
    bookingName: "GWM P300",
  },
  {
    name: "Honda Fit",
    category: "Economy",
    images: [hondaFitBlue, hondaFitInterior, hondaFitInteriorSide, hondaFitDashboard],
    captions: ["Exterior", "Front Interior", "Interior Side", "Dashboard"],
    desc: "Smart, economical, reliable. Perfect for local movements, small family trips, and town errands.",
    prices: [
      { label: "Per Day", price: "K600", perDay: true },
    ],
    features: ["Fuel Efficient", "Comfortable Interior", "Easy Town Driving", "Min 3 Days Booking"],
    capacity: "4 Passengers",
    bookingName: "Honda Fit",
  },
  {
    name: "Wedding Sedans (Mercedes)",
    category: "Sedan",
    images: [mercedesWedding],
    captions: ["3x Mercedes-Benz C-Class"],
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

const categories: VehicleCategory[] = ["All", "Bus", "SUV", "Pickup", "Sedan", "Economy"];

const ImageGallery = ({ images, captions, name }: { images: string[]; captions: string[]; name: string }) => {
  const [current, setCurrent] = useState(0);

  return (
    <div className="relative aspect-[4/3] overflow-hidden rounded-t-2xl group">
      <img
        src={images[current]}
        alt={`${name} - ${captions[current]}`}
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        loading="lazy"
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
        <div className="flex justify-center mb-6">
          <img src={logoNew} alt="Ozed Transport" className="h-16 w-16 rounded-full object-cover shadow-lg border-2 border-accent" />
        </div>

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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((v, i) => (
            <motion.div
              key={v.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="bg-card border border-border rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 relative"
            >
              {v.mostBooked && (
                <div className="absolute top-3 left-3 z-10 bg-accent text-accent-foreground px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 shadow-md">
                  <Flame className="w-3 h-3" /> Most Booked
                </div>
              )}

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

                <button
                  onClick={() => {
                    const bookingSection = document.getElementById("booking");
                    if (bookingSection) {
                      bookingSection.scrollIntoView({ behavior: "smooth" });
                      window.dispatchEvent(new CustomEvent("selectVehicle", { detail: v.bookingName }));
                    }
                  }}
                  className="w-full text-center bg-primary text-primary-foreground py-3 rounded-xl font-semibold text-sm btn-glow hover:scale-[1.02] active:scale-[0.98] transition-transform"
                >
                  Book This Vehicle
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FleetSection;
