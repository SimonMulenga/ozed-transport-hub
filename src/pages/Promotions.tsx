import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Flame } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingButtons from "@/components/FloatingButtons";

import flyerMain from "@/assets/flyer-main.jpg";
import flyerPajero from "@/assets/flyer-pajero.jpg";
import flyerGwm from "@/assets/flyer-gwm.jpg";
import flyerHondafit from "@/assets/flyer-hondafit.jpg";
import flyerAlphard from "@/assets/flyer-alphard.jpg";
import flyerVanguard from "@/assets/flyer-vanguard.jpg";

const flyers = [
  { image: flyerMain, title: "March Hire Madness — Full Fleet" },
  { image: flyerVanguard, title: "Toyota Vanguard Special" },
  { image: flyerPajero, title: "Mitsubishi Pajero Offer" },
  { image: flyerGwm, title: "GWM P300 Pickup" },
  { image: flyerHondafit, title: "Honda Fit — Budget Friendly" },
  { image: flyerAlphard, title: "Toyota Alphard Executive" },
];

const Promotions = () => {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);
  const [touchStart, setTouchStart] = useState<number | null>(null);

  const next = useCallback(() => {
    setDirection(1);
    setCurrent((p) => (p + 1) % flyers.length);
  }, []);

  const prev = useCallback(() => {
    setDirection(-1);
    setCurrent((p) => (p === 0 ? flyers.length - 1 : p - 1));
  }, []);

  useEffect(() => {
    const timer = setInterval(next, 4000);
    return () => clearInterval(timer);
  }, [next]);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <section className="pt-24 pb-16">
        <div className="section-container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-10"
          >
            <div className="inline-flex items-center gap-2 bg-accent/10 text-accent px-4 py-2 rounded-full text-sm font-bold mb-4">
              <Flame className="w-4 h-4" /> Current Promotions
            </div>
            <h1 className="font-display text-3xl md:text-5xl font-bold text-foreground">
              Special Offers & Deals
            </h1>
            <p className="text-muted-foreground mt-3 max-w-lg mx-auto">
              Browse our latest vehicle hire promotions. Limited slots available!
            </p>
          </motion.div>

          {/* Full-width carousel */}
          <div
            className="relative w-full aspect-[3/4] sm:aspect-[9/16] md:aspect-[3/4] lg:aspect-[2/3] max-h-[80vh] rounded-2xl overflow-hidden shadow-2xl"
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
                src={flyers[current].image}
                alt={flyers[current].title}
                custom={direction}
                initial={{ x: direction > 0 ? "100%" : "-100%", opacity: 0.5 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: direction > 0 ? "-100%" : "100%", opacity: 0.5 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="absolute inset-0 w-full h-full object-contain bg-black"
              />
            </AnimatePresence>

            <button
              onClick={prev}
              className="absolute left-3 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-black/50 backdrop-blur-sm text-white flex items-center justify-center hover:bg-black/70 transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={next}
              className="absolute right-3 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-black/50 backdrop-blur-sm text-white flex items-center justify-center hover:bg-black/70 transition-colors"
            >
              <ChevronRight className="w-5 h-5" />
            </button>

            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 flex gap-2">
              {flyers.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => { setDirection(idx > current ? 1 : -1); setCurrent(idx); }}
                  className={`h-2 rounded-full transition-all duration-300 ${idx === current ? "w-8 bg-accent" : "w-2 bg-white/50"}`}
                />
              ))}
            </div>

            <div className="absolute bottom-12 left-4 right-4 z-10">
              <div className="bg-black/60 backdrop-blur-sm rounded-xl px-4 py-3">
                <p className="text-white font-semibold text-sm">{flyers[current].title}</p>
              </div>
            </div>
          </div>

          {/* Thumbnail grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3 mt-8">
            {flyers.map((f, idx) => (
              <button
                key={idx}
                onClick={() => { setDirection(idx > current ? 1 : -1); setCurrent(idx); }}
                className={`aspect-[3/4] rounded-xl overflow-hidden border-2 transition-all ${
                  idx === current ? "border-accent shadow-lg scale-105" : "border-transparent opacity-70 hover:opacity-100"
                }`}
              >
                <img src={f.image} alt={f.title} className="w-full h-full object-cover" loading="lazy" />
              </button>
            ))}
          </div>
        </div>
      </section>

      <Footer />
      <FloatingButtons />
    </div>
  );
};

export default Promotions;
