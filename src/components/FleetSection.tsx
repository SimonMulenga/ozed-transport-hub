import { useState, useEffect } from "react";
import { motion } from "framer-motion";

/* ================= IMAGES ================= */

// Coaster
import coaster1 from "../assets/coaster-front-2.jpg";
import coaster2 from "../assets/coaster-interior-2.jpg";
import coaster3 from "../assets/coaster-interior-3.jpg";
import coaster4 from "../assets/coaster-interior-real.jpg";

// Quantum
import q1 from "../assets/Quantum-1.jpg";
import q2 from "../assets/Quantum-2.jpg";
import q3 from "../assets/Quantum-3.jpg";
import q4 from "../assets/Quantum-4.jpg";

// Alphard
import alphard from "../assets/vellfire-black.jpg";

// Fortuner
import f1 from "../assets/Fortuner-1.jpg";
import f2 from "../assets/Fortuner-2.jpg";
import f3 from "../assets/Fortuner-3.jpg";

// Pajero
import paj1 from "../assets/pajero-real.jpg";
import paj2 from "../assets/pajero-black.jpg";

// Prado
import pr1 from "../assets/Landcruiser-1.jpg";
import pr2 from "../assets/Landcruiser-2.jpg";

// LC300
import lc1 from "../assets/Land cruiser Lc 300-1.jpg";
import lc2 from "../assets/Land cruiser Lc 300-2.jpg";

// Hilux
import hilux from "../assets/hilux-white.jpg";

// GWM
import p1 from "../assets/gwm-p300.jpg";

// Vitz
import vitz1 from "../assets/Vitz-1.jpg";
import vitz2 from "../assets/Vitz-2.jpg";

// Fit
import fit1 from "../assets/honda-fit-front.jpg";

// ================= DATA =================

const vehicles = [
  {
    name: "Toyota Coaster",
    category: "Bus",
    mostBooked: true,
    passengers: "25+",
    desc: "Group transport",
    images: [coaster1, coaster2, coaster3, coaster4],
    local: "K2,500",
    outside: "K3,500",
  },
  {
    name: "Toyota Quantum",
    category: "Bus",
    mostBooked: true,
    passengers: "14",
    desc: "Airport transport",
    images: [q1, q2, q3, q4],
    local: "K2,500",
    outside: "K3,000",
  },
  {
    name: "Toyota Vellfire / Alphard",
    category: "Bus",
    passengers: "7",
    desc: "VIP transport",
    images: [alphard],
    local: "K1,500",
    outside: "K2,000",
  },
  {
    name: "GWM P300",
    category: "Pickup",
    passengers: "5",
    desc: "Powerful pickup",
    images: [p1],
    local: "K2,500",
    outside: "K3,500",
  },
  {
    name: "Toyota Hilux",
    category: "Pickup",
    passengers: "5",
    desc: "Reliable pickup",
    images: [hilux],
    local: "K2,500",
    outside: "K3,500",
  },
  {
    name: "Land Cruiser Prado",
    category: "SUV",
    passengers: "7",
    desc: "Premium SUV",
    images: [pr1, pr2],
    local: "K2,500",
    outside: "K3,500",
  },
  {
    name: "Mitsubishi Pajero",
    category: "SUV",
    passengers: "5",
    desc: "4x4 SUV",
    images: [paj1, paj2],
    local: "K2,000",
    outside: "K2,500",
  },
  {
    name: "Fortuner",
    category: "SUV",
    passengers: "7",
    desc: "Executive SUV",
    images: [f1, f2, f3],
    local: "K3,000",
    outside: "K3,500",
  },
  {
    name: "Land Cruiser LC300",
    category: "SUV",
    mostBooked: true,
    passengers: "7",
    desc: "Luxury SUV",
    images: [lc1, lc2],
    local: "K5,500",
    outside: "K6,500",
  },
  {
    name: "Honda Fit",
    category: "Economy",
    passengers: "5",
    desc: "Fuel efficient",
    images: [fit1],
    local: "K600",
    note: "Local only",
  },
  {
    name: "Toyota Vitz",
    category: "Economy",
    passengers: "5",
    desc: "Budget friendly",
    images: [vitz1, vitz2],
    local: "K600",
    note: "Local only",
  },
];

const categories = ["All", "Bus", "SUV", "Pickup", "Economy"];

/* ================= CARD ================= */

const Card = ({ v }) => {
  const [i, setI] = useState(0);

  useEffect(() => {
    if (v.images.length <= 1) return;

    const interval = setInterval(() => {
      setI((prev) => (prev === v.images.length - 1 ? 0 : prev + 1));
    }, 3000);

    return () => clearInterval(interval);
  }, [v.images.length]);

  const handleBooking = () => {
    document.getElementById("booking")?.scrollIntoView({ behavior: "smooth" });
    window.dispatchEvent(new CustomEvent("selectVehicle", { detail: v.name }));
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden relative">

      {/* BADGE */}
      {v.mostBooked && (
        <div className="absolute top-3 left-3 bg-yellow-500 text-white text-xs px-3 py-1 rounded-full z-10">
          Most Booked
        </div>
      )}

      {/* IMAGE SLIDER */}
      <div className="relative">
        <img src={v.images[i]} className="w-full h-48 object-cover" />

        {v.images.length > 1 && (
          <>
            <button onClick={() => setI(i === 0 ? v.images.length - 1 : i - 1)}
              className="absolute left-2 top-1/2 bg-black/40 text-white px-2 rounded">‹</button>

            <button onClick={() => setI(i === v.images.length - 1 ? 0 : i + 1)}
              className="absolute right-2 top-1/2 bg-black/40 text-white px-2 rounded">›</button>
          </>
        )}
      </div>

      {/* CONTENT */}
      <div className="p-4">
        <div className="flex justify-between">
          <h3 className="font-bold">{v.name}</h3>
          <span className="text-xs bg-gray-100 px-2 py-1 rounded-full">
            {v.passengers} Passengers
          </span>
        </div>

        <p className="text-sm text-gray-500 mb-3">{v.desc}</p>

        <div className="grid grid-cols-2 gap-2">
          {v.local && (
            <div className="bg-gray-100 p-2 rounded text-center">
              <p className="text-xs">Local</p>
              <p className="font-bold">{v.local}</p>
            </div>
          )}
          {v.outside && (
            <div className="bg-gray-100 p-2 rounded text-center">
              <p className="text-xs">Outside</p>
              <p className="font-bold">{v.outside}</p>
            </div>
          )}
        </div>

        {v.note && (
          <p className="text-xs mt-2 text-gray-500">{v.note}</p>
        )}

        <button
          onClick={handleBooking}
          className="mt-4 w-full bg-blue-600 text-white py-2 rounded-xl font-semibold"
        >
          Book This Vehicle
        </button>
      </div>
    </div>
  );
};

/* ================= SECTION ================= */

export default function FleetSection() {
  const [filter, setFilter] = useState("All");
  const [showAll, setShowAll] = useState(false);

  const filtered =
    filter === "All"
      ? vehicles
      : vehicles.filter((v) => v.category === filter);

  const visible = showAll ? filtered : filtered.slice(0, 6);

  return (
    <section id="fleet" className="p-6 scroll-mt-24">

      {/* FILTER */}
      <div className="flex justify-center gap-2 mb-6 flex-wrap">
        {categories.map((c) => (
          <button
            key={c}
            onClick={() => setFilter(c)}
            className={`px-4 py-2 rounded-full text-sm ${
              filter === c ? "bg-blue-600 text-white" : "bg-gray-200"
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      {/* GRID */}
      <div className="grid md:grid-cols-3 gap-6">
        {visible.map((v, i) => (
          <motion.div key={i} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}>
            <Card v={v} />
          </motion.div>
        ))}
      </div>

      {/* SHOW MORE */}
      <div className="text-center mt-8">
        <button
          onClick={() => setShowAll(!showAll)}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg"
        >
          {showAll ? "Show Less" : "Show More"}
        </button>
      </div>

    </section>
  );
}