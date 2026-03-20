import { useState } from "react";
import { Menu, X, Phone } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import logo from "@/assets/logo-new.jpg";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === "/";

  const navLinks = [
    { label: "Home", href: isHome ? "#home" : "/" },
    { label: "Services", href: isHome ? "#services" : "/#services" },
    { label: "Fleet", href: isHome ? "#fleet" : "/#fleet" },
    { label: "Pricing", href: isHome ? "#pricing" : "/#pricing" },
    { label: "Promotions", href: "/promotions" },
    { label: "Booking", href: isHome ? "#booking" : "/#booking" },
    { label: "Contact", href: isHome ? "#contact" : "/#contact" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-foreground/90 backdrop-blur-md border-b border-primary/10">
      <div className="section-container flex items-center justify-between h-16 md:h-20">
        <Link to="/" className="flex items-center gap-2">
          <img src={logo} alt="Ozed Transport Services" className="h-10 md:h-12 rounded-full object-cover" />
          <div className="hidden sm:block">
            <p className="font-display text-sm font-bold text-primary-foreground tracking-tight">OZED TRANSPORT</p>
            <p className="text-[10px] text-muted-foreground">Here To Take You There</p>
          </div>
        </Link>

        <div className="hidden lg:flex items-center gap-8">
          {navLinks.map((l) =>
            l.href.startsWith("/") && !l.href.startsWith("/#") ? (
              <Link key={l.label} to={l.href} className="text-sm text-primary-foreground/70 hover:text-accent transition-colors font-medium">
                {l.label}
              </Link>
            ) : (
              <a key={l.label} href={l.href} className="text-sm text-primary-foreground/70 hover:text-accent transition-colors font-medium">
                {l.label}
              </a>
            )
          )}
        </div>

        <div className="hidden lg:flex items-center gap-3">
          <a href="tel:+260772344849" className="flex items-center gap-2 text-sm text-accent font-semibold">
            <Phone className="w-4 h-4" /> 0772 344 849
          </a>
          <a href={isHome ? "#booking" : "/#booking"} className="bg-primary text-primary-foreground px-5 py-2.5 rounded-xl text-sm font-semibold btn-glow hover:scale-105 active:scale-95 transition-transform">
            Book Now
          </a>
        </div>

        <button onClick={() => setOpen(!open)} className="lg:hidden text-primary-foreground">
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="lg:hidden bg-foreground/95 backdrop-blur-md overflow-hidden"
          >
            <div className="section-container py-4 flex flex-col gap-3">
              {navLinks.map((l) =>
                l.href.startsWith("/") && !l.href.startsWith("/#") ? (
                  <Link key={l.label} to={l.href} onClick={() => setOpen(false)} className="text-primary-foreground/80 hover:text-accent py-2 font-medium">
                    {l.label}
                  </Link>
                ) : (
                  <a key={l.label} href={l.href} onClick={() => setOpen(false)} className="text-primary-foreground/80 hover:text-accent py-2 font-medium">
                    {l.label}
                  </a>
                )
              )}
              <a href="tel:+260772344849" className="text-accent font-semibold py-2">📞 0772 344 849</a>
              <a href={isHome ? "#booking" : "/#booking"} onClick={() => setOpen(false)} className="bg-primary text-primary-foreground text-center py-3 rounded-xl font-semibold">
                Book Now
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
