import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Send, Calendar, MapPin, Car, Users, Calculator } from "lucide-react";

const VEHICLES = [
  { name: "Toyota Coaster Bus", localPrice: 2500, outsidePrice: 3500 },
  { name: "Luxury Wedding Sedan (x1)", localPrice: 2500, outsidePrice: 2500 },
  { name: "Wedding Package (3 Vehicles)", localPrice: 7000, outsidePrice: 7000 },
  { name: "Shuttle / Small Car", localPrice: 2500, outsidePrice: 3500 },
];

const BookingSection = () => {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    pickup: "",
    destination: "",
    pickupDate: "",
    returnDate: "",
    vehicle: "",
    passengers: "",
    isOutsideLusaka: false,
  });
  const [sending, setSending] = useState(false);

  const calculation = useMemo(() => {
    if (!form.pickupDate || !form.returnDate || !form.vehicle) return null;
    const start = new Date(form.pickupDate);
    const end = new Date(form.returnDate);
    const diffMs = end.getTime() - start.getTime();
    if (diffMs < 0) return null;
    const days = Math.max(1, Math.ceil(diffMs / (1000 * 60 * 60 * 24)));
    const selected = VEHICLES.find((v) => v.name === form.vehicle);
    if (!selected) return null;
    const pricePerDay = form.isOutsideLusaka ? selected.outsidePrice : selected.localPrice;
    const total = pricePerDay * days;
    return { days, pricePerDay, total };
  }, [form.pickupDate, form.returnDate, form.vehicle, form.isOutsideLusaka]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);

    const totalDays = calculation ? `${calculation.days} day${calculation.days > 1 ? "s" : ""}` : "N/A";
    const estimatedPrice = calculation ? `K${calculation.total.toLocaleString()}` : "To be confirmed";

    const msg = `Hello, I would like to book a vehicle:

Vehicle: ${form.vehicle}
Pickup Location: ${form.pickup}
Destination: ${form.destination}
Pickup Date: ${form.pickupDate}
Return Date: ${form.returnDate}
Total Days: ${totalDays}
Passengers: ${form.passengers}
Estimated Price: ${estimatedPrice}

Name: ${form.name}
Phone: ${form.phone}

Please confirm availability.`;

    setTimeout(() => {
      window.open(`https://wa.me/260772344849?text=${encodeURIComponent(msg)}`, "_blank");
      setSending(false);
    }, 600);
  };

  const set = (key: string, value: string | boolean) => setForm((f) => ({ ...f, [key]: value }));

  const inputClass =
    "w-full bg-muted border border-border rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 transition-shadow";

  const today = new Date().toISOString().split("T")[0];

  return (
    <section id="booking" className="section-padding bg-background">
      <div className="section-container">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <p className="text-accent font-display font-semibold text-sm tracking-widest uppercase mb-3">Reserve Your Ride</p>
            <h2 className="font-display text-3xl md:text-5xl font-bold tracking-tight text-foreground">Book a Vehicle</h2>
            <p className="text-muted-foreground mt-4 max-w-lg mx-auto">Fill in your details and get an instant price estimate. Booking is confirmed via WhatsApp.</p>
          </motion.div>

          <motion.form
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            onSubmit={handleSubmit}
            className="card-premium p-6 md:p-10 space-y-5"
          >
            {/* Personal */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="text-xs font-semibold text-muted-foreground mb-1.5 block">Full Name</label>
                <input className={inputClass} placeholder="John Doe" required value={form.name} onChange={(e) => set("name", e.target.value)} />
              </div>
              <div>
                <label className="text-xs font-semibold text-muted-foreground mb-1.5 block">Phone Number</label>
                <input className={inputClass} placeholder="0772 XXX XXX" required value={form.phone} onChange={(e) => set("phone", e.target.value)} />
              </div>
            </div>

            {/* Locations */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="text-xs font-semibold text-muted-foreground mb-1.5 flex items-center gap-1"><MapPin className="w-3 h-3" /> Pickup Location</label>
                <input className={inputClass} placeholder="e.g. Lusaka City Centre" required value={form.pickup} onChange={(e) => set("pickup", e.target.value)} />
              </div>
              <div>
                <label className="text-xs font-semibold text-muted-foreground mb-1.5 flex items-center gap-1"><MapPin className="w-3 h-3" /> Destination</label>
                <input className={inputClass} placeholder="e.g. Livingstone" required value={form.destination} onChange={(e) => set("destination", e.target.value)} />
              </div>
            </div>

            {/* Dates */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="text-xs font-semibold text-muted-foreground mb-1.5 flex items-center gap-1"><Calendar className="w-3 h-3" /> Pickup Date</label>
                <input type="date" className={inputClass} required min={today} value={form.pickupDate} onChange={(e) => set("pickupDate", e.target.value)} />
              </div>
              <div>
                <label className="text-xs font-semibold text-muted-foreground mb-1.5 flex items-center gap-1"><Calendar className="w-3 h-3" /> Return Date</label>
                <input type="date" className={inputClass} required min={form.pickupDate || today} value={form.returnDate} onChange={(e) => set("returnDate", e.target.value)} />
              </div>
            </div>

            {/* Vehicle & Passengers */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="text-xs font-semibold text-muted-foreground mb-1.5 flex items-center gap-1"><Car className="w-3 h-3" /> Vehicle Type</label>
                <select className={inputClass} required value={form.vehicle} onChange={(e) => set("vehicle", e.target.value)}>
                  <option value="">Select Vehicle</option>
                  {VEHICLES.map((v) => (
                    <option key={v.name} value={v.name}>{v.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-xs font-semibold text-muted-foreground mb-1.5 flex items-center gap-1"><Users className="w-3 h-3" /> Passengers</label>
                <input className={inputClass} placeholder="Number of passengers" type="number" min="1" max="50" required value={form.passengers} onChange={(e) => set("passengers", e.target.value)} />
              </div>
            </div>

            {/* Outside Lusaka toggle */}
            <label className="flex items-center gap-3 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={form.isOutsideLusaka}
                onChange={(e) => set("isOutsideLusaka", e.target.checked)}
                className="w-4 h-4 rounded border-border text-primary focus:ring-primary/40"
              />
              <span className="text-sm text-muted-foreground">Destination is outside Lusaka</span>
            </label>

            {/* Price Calculation Display */}
            {calculation && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                className="bg-primary/5 border border-primary/15 rounded-xl p-5 space-y-3"
              >
                <div className="flex items-center gap-2 text-primary font-display font-semibold">
                  <Calculator className="w-4 h-4" /> Price Estimate
                </div>
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <p className="text-2xl font-bold font-mono text-foreground">{calculation.days}</p>
                    <p className="text-xs text-muted-foreground">day{calculation.days > 1 ? "s" : ""}</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold font-mono text-foreground">K{calculation.pricePerDay.toLocaleString()}</p>
                    <p className="text-xs text-muted-foreground">per day</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold font-mono text-accent">K{calculation.total.toLocaleString()}</p>
                    <p className="text-xs text-muted-foreground">estimated total</p>
                  </div>
                </div>
              </motion.div>
            )}

            <button
              type="submit"
              disabled={sending}
              className="w-full bg-primary text-primary-foreground py-4 rounded-xl font-display font-semibold text-lg btn-glow hover:scale-[1.02] active:scale-[0.98] transition-transform flex items-center justify-center gap-2 disabled:opacity-70"
            >
              {sending ? (
                <span className="flex items-center gap-2">
                  <span className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                  Opening WhatsApp...
                </span>
              ) : (
                <>
                  <Send className="w-5 h-5" /> Book via WhatsApp
                </>
              )}
            </button>

            <p className="text-center text-xs text-muted-foreground">
              Clicking "Book via WhatsApp" will open a pre-filled message. Final price confirmed by our team.
            </p>
          </motion.form>
        </div>
      </div>
    </section>
  );
};

export default BookingSection;
