import { useState } from "react";
import { motion } from "framer-motion";
import { Send } from "lucide-react";

const BookingSection = () => {
  const [form, setForm] = useState({
    name: "", phone: "", pickup: "", destination: "", date: "", vehicle: "", passengers: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const msg = `Hi Ozed Transport! I'd like to book:\n\nName: ${form.name}\nPhone: ${form.phone}\nPickup: ${form.pickup}\nDestination: ${form.destination}\nDate: ${form.date}\nVehicle: ${form.vehicle}\nPassengers: ${form.passengers}`;
    window.open(`https://wa.me/260772344849?text=${encodeURIComponent(msg)}`, "_blank");
  };

  const inputClass = "w-full bg-muted border border-border rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 transition-shadow";

  return (
    <section id="booking" className="section-padding bg-background">
      <div className="section-container">
        <div className="max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <p className="text-accent font-display font-semibold text-sm tracking-widest uppercase mb-3">Reserve Your Ride</p>
            <h2 className="font-display text-3xl md:text-5xl font-bold tracking-tight text-foreground">Book a Vehicle</h2>
          </motion.div>

          <motion.form
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            onSubmit={handleSubmit}
            className="card-premium p-6 md:p-10 space-y-5"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <input className={inputClass} placeholder="Full Name" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
              <input className={inputClass} placeholder="Phone Number" required value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <input className={inputClass} placeholder="Pickup Location" required value={form.pickup} onChange={(e) => setForm({ ...form, pickup: e.target.value })} />
              <input className={inputClass} placeholder="Destination" required value={form.destination} onChange={(e) => setForm({ ...form, destination: e.target.value })} />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <input type="date" className={inputClass} required value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} />
              <select className={inputClass} required value={form.vehicle} onChange={(e) => setForm({ ...form, vehicle: e.target.value })}>
                <option value="">Select Vehicle</option>
                <option>Toyota Coaster</option>
                <option>GWM P300 4x4</option>
                <option>Luxury Wedding Sedan</option>
                <option>Wedding Package (3 Vehicles)</option>
              </select>
            </div>
            <input className={inputClass} placeholder="Number of Passengers" type="number" min="1" required value={form.passengers} onChange={(e) => setForm({ ...form, passengers: e.target.value })} />

            <button type="submit" className="w-full bg-primary text-primary-foreground py-4 rounded-xl font-display font-semibold text-lg btn-glow hover:scale-[1.02] active:scale-[0.98] transition-transform flex items-center justify-center gap-2">
              <Send className="w-5 h-5" /> Submit Booking
            </button>
          </motion.form>
        </div>
      </div>
    </section>
  );
};

export default BookingSection;
