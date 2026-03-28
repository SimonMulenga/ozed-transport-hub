import { useState } from "react";
import { Menu, X, Phone } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from "@/assets/logo-new.jpg";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const isHome = location.pathname === "/";

  const scrollTo = (id: string) => {
    if (!isHome) {
      navigate("/", { state: { scrollTo: id } });
    } else {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const navLinks = [
    { label: "Home", action: () => scrollTo("home") },
    { label: "Services", action: () => scrollTo("services") },
    { label: "Fleet", action: () => scrollTo("fleet") },
    { label: "Pricing", action: () => scrollTo("pricing") },
    { label: "Promotions", link: "/promotions" },
    { label: "Booking", action: () => scrollTo("booking") },
    { label: "Contact", action: () => scrollTo("contact") },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-foreground/90 backdrop-blur-md border-b border-primary/10">
      <div className="section-container flex items-center justify-between h-16 md:h-20">

        {/* LOGO */}
        <Link to="/" className="flex items-center gap-2">
          <img src={logo} className="h-10 md:h-12 rounded-full" />
        </Link>

        {/* DESKTOP NAV */}
        <div className="hidden lg:flex items-center gap-8">
          {navLinks.map((l) =>
            l.link ? (
              <Link
                key={l.label}
                to={l.link}
                className="text-sm text-primary-foreground/70 hover:text-accent transition"
              >
                {l.label}
              </Link>
            ) : (
              <button
                key={l.label}
                onClick={l.action}
                className="text-sm text-primary-foreground/70 hover:text-accent transition"
              >
                {l.label}
              </button>
            )
          )}
        </div>

        {/* CTA */}
        <div className="hidden lg:flex items-center gap-3">
          <a href="tel:+260772344849" className="text-accent font-semibold">
            <Phone className="w-4 h-4 inline" /> 0772 344 849
          </a>

          <button
            onClick={() => scrollTo("booking")}
            className="bg-primary text-white px-5 py-2 rounded-xl hover:opacity-90"
          >
            Book Now
          </button>
        </div>

        {/* MOBILE BUTTON */}
        <button
          onClick={() => setOpen(!open)}
          className="lg:hidden text-primary-foreground"
        >
          {open ? <X /> : <Menu />}
        </button>

      </div>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25 }}
            className="fixed top-0 left-0 w-full h-screen bg-black/95 backdrop-blur-md z-[9999] lg:hidden"
          >
            {/* HEADER */}
            <div className="flex justify-between items-center p-4 border-b border-white/10">
              <img src={logo} className="h-10 rounded-full" />
              <button onClick={() => setOpen(false)} className="text-white">
                <X size={28} />
              </button>
            </div>

            {/* LINKS */}
            <div className="flex flex-col items-center justify-center h-[80%] gap-6">
              {navLinks.map((l) =>
                l.link ? (
                  <Link
                    key={l.label}
                    to={l.link}
                    onClick={() => setOpen(false)}
                    className="text-white text-xl font-semibold hover:text-accent transition"
                  >
                    {l.label}
                  </Link>
                ) : (
                  <button
                    key={l.label}
                    onClick={() => {
                      l.action();
                      setOpen(false);
                    }}
                    className="text-white text-xl font-semibold hover:text-accent transition"
                  >
                    {l.label}
                  </button>
                )
              )}

              {/* CTA */}
              <button
                onClick={() => {
                  scrollTo("booking");
                  setOpen(false);
                }}
                className="mt-6 bg-primary text-white px-8 py-3 rounded-xl hover:opacity-90"
              >
                Book Now
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;