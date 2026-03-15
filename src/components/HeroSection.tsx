import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Phone, MessageCircle } from "lucide-react";
import toyotaCoaster from "@/assets/toyota-coaster.png";
import gwmP300 from "@/assets/gwm-p300.png";
import weddingSedans from "@/assets/wedding-sedans.png";
import citySkyline from "@/assets/city-skyline.png";

const HeroSection = () => {
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  // All animation hooks declared at top level
  const vehicleX = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const skylineY = useTransform(scrollYProgress, [0, 1], [0, 40]);
  const gwmX = useTransform(scrollYProgress, [0, 1], [0, 50]);
  const sedanX = useTransform(scrollYProgress, [0, 1], [0, 100]);

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  return (
    <section
      ref={sectionRef}
      id="home"
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{
        background:
          "linear-gradient(165deg, hsl(224 71% 4%) 0%, hsl(221 60% 12%) 40%, hsl(224 71% 4%) 100%)",
      }}
    >
      {/* Grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "linear-gradient(hsl(var(--primary) / 0.4) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--primary) / 0.4) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Skyline */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 pointer-events-none"
        style={{ y: skylineY }}
      >
        <img
          src={citySkyline}
          alt=""
          className="w-full h-auto opacity-40 object-cover object-bottom"
          style={{ minHeight: "200px" }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[hsl(224,71%,4%)] via-transparent to-transparent" />
      </motion.div>

      {/* Ambient glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[80%] h-[300px] rounded-full bg-primary/10 blur-[120px]" />

      <div className="relative z-10 section-container pt-28 pb-20 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          
          {/* LEFT CONTENT */}
          <div className="space-y-8">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-accent font-semibold text-sm tracking-[0.2em] uppercase"
            >
              Here To Take You There
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-primary-foreground leading-[1.08]"
            >
              Reliable <br />
              Transport <span className="text-gradient-primary">Services</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="text-lg md:text-xl text-primary-foreground/50"
            >
              Safe • Reliable • Affordable
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="flex flex-wrap gap-4"
            >
              <a
                href="#booking"
                className="bg-primary text-primary-foreground px-8 py-4 rounded-xl font-semibold hover:brightness-110"
              >
                Book a Vehicle
              </a>

              <a
                href="https://wa.me/260772344849"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#25D366] text-white px-8 py-4 rounded-xl font-semibold flex items-center gap-2"
              >
                <MessageCircle className="w-5 h-5" />
                WhatsApp Booking
              </a>
            </motion.div>

            <div className="flex flex-wrap gap-6 text-primary-foreground/70 text-sm">
              <a
                href="tel:+260772344849"
                className="flex items-center gap-2 hover:text-accent"
              >
                <Phone className="w-4 h-4 text-accent" />
                0772 344 849
              </a>

              <a
                href="tel:+260760039168"
                className="flex items-center gap-2 hover:text-accent"
              >
                <Phone className="w-4 h-4 text-accent" />
                0760 039 168
              </a>
            </div>
          </div>

          {/* RIGHT VEHICLE SECTION */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="relative flex items-end justify-center min-h-[380px] md:min-h-[500px]"
          >
            {isMobile ? (
              <div className="relative w-full flex flex-col items-center">
                <div className="absolute -bottom-6 w-[70%] h-10 rounded-full bg-primary/20 blur-2xl" />

                <motion.img
                  src={toyotaCoaster}
                  alt="Toyota Coaster Bus"
                  className="w-[90%] max-w-[400px]"
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 4, repeat: Infinity }}
                />

                <span className="mt-4 text-accent text-sm uppercase tracking-widest">
                  Toyota Coaster
                </span>
              </div>
            ) : (
              <div className="relative w-full h-full">
                
                {/* Main Bus */}
                <motion.div
                  className="absolute bottom-0 left-1/2 -translate-x-1/2 z-30 w-[95%]"
                  style={{ x: vehicleX }}
                >
                  <motion.img
                    src={toyotaCoaster}
                    alt="Toyota Coaster Bus"
                    className="w-full"
                    animate={{ y: [0, -6, 0] }}
                    transition={{ duration: 4, repeat: Infinity }}
                  />
                </motion.div>

                {/* Pickup */}
                <motion.div
                  className="absolute bottom-[45%] left-[-5%] z-20 w-[55%]"
                  style={{ x: gwmX }}
                >
                  <motion.img
                    src={gwmP300}
                    alt="GWM Pickup"
                    className="w-full opacity-90"
                    animate={{ y: [0, -5, 0] }}
                    transition={{ duration: 5, repeat: Infinity }}
                  />
                </motion.div>

                {/* Sedans */}
                <motion.div
                  className="absolute bottom-[50%] right-[-5%] z-10 w-[50%]"
                  style={{ x: sedanX }}
                >
                  <motion.img
                    src={weddingSedans}
                    alt="Wedding Sedans"
                    className="w-full opacity-85"
                    animate={{ y: [0, -4, 0] }}
                    transition={{ duration: 4.5, repeat: Infinity }}
                  />
                </motion.div>

              </div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;