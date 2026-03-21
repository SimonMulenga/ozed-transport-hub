import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Phone, MessageCircle, ChevronLeft, ChevronRight, Flame } from "lucide-react";

// Actual vehicle photos — each matched to the correct car
import pajeroSilver from "@/assets/pajero-silver.jpg";      // Silver Mitsubishi Pajero
import vanguardWhite from "@/assets/vanguard-white.jpg";    // White Toyota Vanguard
import fortunerSilver from "@/assets/fortuner-silver.jpg";  // Silver Toyota Fortuner
import hondaFitBlue from "@/assets/honda-fit-blue.jpg";     // Blue Honda Fit
import coasterFront from "@/assets/coaster-front-2.jpg";    // Toyota Coaster bus
import vellfileSilver from "@/assets/vellfire-silver.jpg";   // Toyota Vellfire
import mercedesWedding from "@/assets/mercedes-wedding-real.jpg"; // 3 white Mercedes
import lexusLx from "@/assets/lexus-lx.jpg";                // Lexus LX
import hiluxWhite from "@/assets/hilux-white.jpg";          // Toyota Hilux
import pradoWhite from "@/assets/prado-white.jpg";          // Toyota Land Cruiser Prado

const slides = [
  { image: coasterFront, alt: "Toyota Coaster Bus" },
  { image: vellfileSilver, alt: "Toyota Vellfire" },
  { image: vanguardWhite, alt: "Toyota Vanguard" },
  { image: pajeroSilver, alt: "Mitsubishi Pajero" },
  { image: fortunerSilver, alt: "Toyota Fortuner" },
  { image: lexusLx, alt: "Lexus LX" },
  { image: pradoWhite, alt: "Toyota Land Cruiser Prado" },
  { image: hiluxWhite, alt: "Toyota Hilux" },
  { image: hondaFitBlue, alt: "Honda Fit" },
  { image: mercedesWedding, alt: "Wedding Mercedes Sedans" },
];

const HeroSection = () => {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);
  const [touchStart, setTouchStart] = useState<number | null>(null);

  const next = useCallback(() => {
    setDirection(1);
    setCurrent((p) => (p + 1) % slides.length);
  }, []);

  const prev = useCallback(() => {
    setDirection(-1);
    setCurrent((p) => (p === 0 ? slides.length - 1 : p - 1));
  }, []);

  useEffect(() => {
    const timer = setInterval(next, 4000);
    return () => clearInterval(timer);
  }, [next]);

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center overflow-hidden"
      onTouchStart={(e) => setTouchStart(e.touches[0].clientX)}
      onTouchEnd={(e) => {
        if (touchStart === null) return;
        const diff = touchStart - e.changedTouches[0].clientX;
        if (Math.abs(diff) > 50) diff > 0 ? next() : prev();
        setTouchStart(null);
      }}
    >
      <AnimatePresence mode="popLayout" custom={direction}>
        <motion.img
          key={current}
          src={slides[current].image}
          alt={slides[current].alt}
          custom={direction}
          initial={{ x: direction > 0 ? "100%" : "-100%", opacity: 0.5 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: direction > 0 ? "-100%" : "100%", opacity: 0.5 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
      </AnimatePresence>

      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/40" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/30" />

      {/* Current vehicle label */}
      <div className="absolute top-24 left-4 md:left-8 z-20">
        <motion.div
          key={slides[current].alt}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white/10 backdrop-blur-sm text-white px-4 py-2 rounded-full text-xs md:text-sm font-medium"
        >
          {slides[current].alt}
        </motion.div>
      </div>

      <div className="absolute top-24 right-4 md:right-8 z-20">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1 }}
          className="bg-accent/90 backdrop-blur-sm text-accent-foreground px-4 py-2 rounded-full text-xs md:text-sm font-bold flex items-center gap-2 shadow-lg"
        >
          <Flame className="w-4 h-4" />
          Most Booked Vehicles Available
        </motion.div>
      </div>

      <button
        onClick={prev}
        className="absolute left-3 md:left-6 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-black/40 backdrop-blur-sm text-white flex items-center justify-center hover:bg-black/60 transition-colors"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>
      <button
        onClick={next}
        className="absolute right-3 md:right-6 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-black/40 backdrop-blur-sm text-white flex items-center justify-center hover:bg-black/60 transition-colors"
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => { setDirection(idx > current ? 1 : -1); setCurrent(idx); }}
            className={`h-2 rounded-full transition-all duration-300 ${idx === current ? "w-8 bg-accent" : "w-2 bg-white/50"}`}
          />
        ))}
      </div>

      <div className="relative z-10 section-container pt-28 pb-20 w-full">
        <div className="max-w-2xl space-y-8">
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-accent font-semibold text-sm tracking-[0.2em] uppercase">
            Here To Take You There
          </motion.p>
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.08]">
            Reliable <br />Transport <span className="text-gradient-primary">Services</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} className="text-lg md:text-xl text-white/60">
            Safe • Reliable • Affordable
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }} className="flex flex-wrap gap-4">
            <a href="#booking" className="bg-primary text-primary-foreground px-8 py-4 rounded-xl font-semibold hover:brightness-110 transition-all">Book a Vehicle</a>
            <a href="https://wa.me/260772344849" target="_blank" rel="noopener noreferrer" className="bg-[#25D366] text-white px-8 py-4 rounded-xl font-semibold flex items-center gap-2 hover:brightness-110 transition-all">
              <MessageCircle className="w-5 h-5" />WhatsApp Booking
            </a>
          </motion.div>
          <div className="flex flex-wrap gap-6 text-white/70 text-sm">
            <a href="tel:+260772344849" className="flex items-center gap-2 hover:text-accent transition-colors"><Phone className="w-4 h-4 text-accent" /> 0772 344 849</a>
            <a href="tel:+260760039168" className="flex items-center gap-2 hover:text-accent transition-colors"><Phone className="w-4 h-4 text-accent" /> 0760 039 168</a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
