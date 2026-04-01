import { useState, useMemo, useEffect } from "react";
import { Send } from "lucide-react";
import { motion } from "framer-motion";

const WHATSAPP_NUMBER = "260772344849";

const VEHICLES = [
  { name: "Toyota Coaster", localPrice: 2500, outsidePrice: 3500 },
  { name: "Toyota Quantum", localPrice: 2500, outsidePrice: 3000 },
  { name: "Toyota Vellfire / Alphard", localPrice: 1500, outsidePrice: 2000 },
  { name: "GWM P300", localPrice: 2500, outsidePrice: 3500 },
  { name: "Toyota Hilux", localPrice: 2500, outsidePrice: 3500 },
  { name: "Fortuner", localPrice: 3000, outsidePrice: 3500 },
  { name: "Land Cruiser Prado", localPrice: 2500, outsidePrice: 3500 },
  { name: "Land Cruiser LC300", localPrice: 5500, outsidePrice: 6500 },
  { name: "Mitsubishi Pajero", localPrice: 2000, outsidePrice: 2500 },
  { name: "Honda Fit", localPrice: 600, outsidePrice: 600 },
  { name: "Toyota Vitz", localPrice: 600, outsidePrice: 600 },
  { name: "Toyota Mark X", localPrice: 1000, outsidePrice: 1500 },
];

const SELF_DRIVE_CARS = [
  "Honda Fit",
  "Toyota Vitz",
  "Toyota Mark X",
  "Toyota Vellfire / Alphard",
];

const RESTRICTED_OUTSIDE_LUSAKA = [
  "Toyota Vitz",
  "Honda Fit",
];

const OUTSIDE_LUSAKA_LOCATIONS = [
  "kitwe",
  "ndola",
  "kafue",
  "kabwe",
  "livingstone",
  "chipata",
  "solwezi",
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
    isSelfDrive: null as boolean | null,
  });

  const set = (key: string, value: any) =>
    setForm((f) => ({ ...f, [key]: value }));

  const today = new Date().toISOString().split("T")[0];

  useEffect(() => {
    const dest = form.destination.toLowerCase();
    const isOutside = OUTSIDE_LUSAKA_LOCATIONS.some((place) =>
      dest.includes(place)
    );

    if (isOutside !== form.isOutsideLusaka) {
      set("isOutsideLusaka", isOutside);
    }
  }, [form.destination]);

  const handleVehicleChange = (value: string) => {
    if (
      form.isOutsideLusaka &&
      RESTRICTED_OUTSIDE_LUSAKA.includes(value)
    ) {
      alert(`${value} is not allowed for trips outside Lusaka.`);
      set("vehicle", "");
      return;
    }

    set("vehicle", value);

    if (SELF_DRIVE_CARS.includes(value)) {
      set("isSelfDrive", null);
    } else {
      set("isSelfDrive", false);
    }
  };

  const calculation = useMemo(() => {
    if (!form.pickupDate || !form.returnDate || !form.vehicle) return null;

    const start = new Date(form.pickupDate);
    const end = new Date(form.returnDate);
    if (end < start) return null;

    const totalDates =
      Math.floor((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)) + 1;

    const vehicle = VEHICLES.find((v) => v.name === form.vehicle);
    if (!vehicle) return null;

    const pricePerDay = form.isOutsideLusaka
      ? vehicle.outsidePrice
      : vehicle.localPrice;

    if (form.isSelfDrive === true) {
      const chargedDays = Math.max(totalDates - 1, 3);
      return {
        chargedDays,
        total: pricePerDay * chargedDays,
        warning: totalDates - 1 < 3,
        minDays: 3,
        blocked: totalDates - 1 < 3,
      };
    }

    let minDays = form.isOutsideLusaka ? 2 : 1;
    const chargedDays = totalDates < minDays ? minDays : totalDates;

    return {
      chargedDays,
      total: pricePerDay * chargedDays,
      warning: totalDates < minDays,
      minDays,
      blocked: false,
    };
  }, [form]);

  const message = useMemo(() => {
    return `Hello, I would like to book a vehicle:

Vehicle: ${form.vehicle || "-"}
Pickup Location: ${form.pickup || "-"}
Destination: ${form.destination || "-"}
Pickup Date: ${form.pickupDate || "-"}
Return Date: ${form.returnDate || "-"}
Total Days: ${calculation?.chargedDays || "-"}
Passengers: ${form.passengers || "-"}
Service Type: ${
      form.isSelfDrive === true ? "Self Drive" : "With Driver"
    }
Estimated Price: ${
      calculation ? "K" + calculation.total.toLocaleString() : "-"
    }

Name: ${form.name || "-"} 
Phone: ${form.phone || "-"}

Please confirm availability.`;
  }, [form, calculation]);

  const handleSubmit = (e: any) => {
    e.preventDefault();

    if (form.isSelfDrive === null && SELF_DRIVE_CARS.includes(form.vehicle)) {
      alert("Please select Self Drive or With Driver.");
      return;
    }

    if (calculation?.blocked) {
      alert("Minimum booking for self-drive is 3 days.");
      return;
    }

    if (!form.name || !form.phone || !form.vehicle) {
      alert("Fill all required fields");
      return;
    }

    window.open(
      `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`,
      "_blank"
    );
  };

  const inputClass =
    "w-full bg-muted border rounded-xl px-4 py-3";

  return (
    <section id="booking" className="section-padding bg-background">
      <div className="section-container max-w-3xl mx-auto">

        <h2 className="text-3xl font-bold text-center mb-6">
          Book a Vehicle
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">

          <input className={inputClass} placeholder="Full Name"
            value={form.name} onChange={(e) => set("name", e.target.value)} />

          <input className={inputClass} placeholder="Phone Number"
            value={form.phone} onChange={(e) => set("phone", e.target.value)} />

          <input className={inputClass} placeholder="Pickup Location"
            value={form.pickup} onChange={(e) => set("pickup", e.target.value)} />

          <input className={inputClass} placeholder="Destination"
            value={form.destination} onChange={(e) => set("destination", e.target.value)} />

          <input type="date" className={inputClass}
            min={today}
            value={form.pickupDate}
            onChange={(e) => set("pickupDate", e.target.value)} />

          <input type="date" className={inputClass}
            value={form.returnDate}
            onChange={(e) => set("returnDate", e.target.value)} />

          <select className={inputClass}
            value={form.vehicle}
            onChange={(e) => handleVehicleChange(e.target.value)}>
            <option value="">Select Vehicle</option>
            {VEHICLES.map((v) => (
              <option key={v.name}>{v.name}</option>
            ))}
          </select>

          {/* 🔥 PREMIUM BUTTON CARDS */}
          {form.vehicle && SELF_DRIVE_CARS.includes(form.vehicle) && (
            <div className="grid grid-cols-2 gap-3">
              
              {/* SELF DRIVE */}
              <motion.button
                type="button"
                whileTap={{ scale: 0.95 }}
                whileHover={{ scale: 1.03 }}
                onClick={() => set("isSelfDrive", true)}
                className={`p-4 rounded-xl border text-center relative ${
                  form.isSelfDrive === true
                    ? "bg-primary text-white"
                    : "bg-muted"
                }`}
              >
                🚗
                <p className="font-semibold">Self Drive</p>
              </motion.button>

              {/* CHAUFFEUR */}
              <motion.button
                type="button"
                whileTap={{ scale: 0.95 }}
                whileHover={{ scale: 1.03 }}
                onClick={() => set("isSelfDrive", false)}
                className={`p-4 rounded-xl border text-center relative ${
                  form.isSelfDrive === false
                    ? "bg-primary text-white"
                    : "bg-muted"
                }`}
              >
                {/* BADGE */}
                <span className="absolute top-2 right-2 text-xs bg-yellow-400 text-black px-2 py-1 rounded">
                  Most Popular
                </span>

                👨‍✈️
                <p className="font-semibold">Chauffeur</p>
              </motion.button>

            </div>
          )}

          <input type="number" className={inputClass} placeholder="Passengers"
            value={form.passengers}
            onChange={(e) => set("passengers", e.target.value)} />

          {calculation?.warning && (
            <p className="text-red-500 text-sm text-center">
              Minimum booking is {calculation.minDays} day(s)
            </p>
          )}

          {calculation && (
            <div className="bg-primary/10 p-4 rounded text-center">
              <p className="font-bold text-lg">
                K{calculation.total.toLocaleString()}
              </p>
              <p className="text-sm">
                {calculation.chargedDays} day(s)
              </p>
            </div>
          )}

          <div className="bg-black text-green-400 p-3 rounded text-xs whitespace-pre-line">
            {message}
          </div>

          <button className="w-full bg-primary text-white py-3 rounded">
            <Send size={16} /> Book via WhatsApp
          </button>

        </form>
      </div>
    </section>
  );
};

export default BookingSection;