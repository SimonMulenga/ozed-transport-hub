import { useState, useMemo, useEffect } from "react";
import { Send } from "lucide-react";

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
    isSelfDrive: false, // ✅ NEW
  });

  const set = (key: string, value: any) =>
    setForm((f) => ({ ...f, [key]: value }));

  const today = new Date().toISOString().split("T")[0];

  /* 🔥 AUTO FILL FROM FLEET */
  useEffect(() => {
    const handler = (e: any) => {
      setForm((f) => ({ ...f, vehicle: e.detail }));
    };
    window.addEventListener("selectVehicle", handler);
    return () => window.removeEventListener("selectVehicle", handler);
  }, []);

  /* 💰 CORRECT DATE LOGIC */
  const calculation = useMemo(() => {
    if (!form.pickupDate || !form.returnDate || !form.vehicle) return null;

    const start = new Date(form.pickupDate);
    const end = new Date(form.returnDate);

    if (end < start) return null;

    // ✅ COUNT DATES (INCLUSIVE)
    const diffTime = end.getTime() - start.getTime();
    const totalDates = Math.floor(diffTime / (1000 * 60 * 60 * 24)) + 1;

    const vehicle = VEHICLES.find((v) => v.name === form.vehicle);
    if (!vehicle) return null;

    const pricePerDay = form.isOutsideLusaka
      ? vehicle.outsidePrice
      : vehicle.localPrice;

    // ✅ SELF DRIVE LOGIC
    const billableDays = form.isSelfDrive
      ? Math.max(totalDates - 1, 1)
      : totalDates;

    return {
      totalDates,
      billableDays,
      total: pricePerDay * billableDays,
    };
  }, [form]);

  /* 📩 WHATSAPP MESSAGE */
  const message = useMemo(() => {
    return `Hello, I would like to book a vehicle:

Vehicle: ${form.vehicle || "-"}
Pickup Location: ${form.pickup || "-"}
Destination: ${form.destination || "-"}
Pickup Date: ${form.pickupDate || "-"}
Return Date: ${form.returnDate || "-"}

Total Dates: ${calculation?.totalDates || "-"}
Charged Days: ${calculation?.billableDays || "-"}

Passengers: ${form.passengers || "-"}
Self Drive: ${form.isSelfDrive ? "Yes" : "No"}

Estimated Price: ${
      calculation ? "K" + calculation.total.toLocaleString() : "-"
    }

Name: ${form.name || "-"}
Phone: ${form.phone || "-"}

Please confirm availability.`;
  }, [form, calculation]);

  const handleSubmit = (e: any) => {
    e.preventDefault();
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

          {/* DATES */}
          <input type="date" className={inputClass}
            min={today}
            value={form.pickupDate}
            onChange={(e) => set("pickupDate", e.target.value)} />

          <input type="date" className={inputClass}
            value={form.returnDate}
            onChange={(e) => set("returnDate", e.target.value)} />

          {/* VEHICLE */}
          <select className={inputClass}
            value={form.vehicle}
            onChange={(e) => set("vehicle", e.target.value)}>
            <option value="">Select Vehicle</option>
            {VEHICLES.map((v) => (
              <option key={v.name}>{v.name}</option>
            ))}
          </select>

          <input type="number" className={inputClass} placeholder="Passengers"
            value={form.passengers}
            onChange={(e) => set("passengers", e.target.value)} />

          {/* CHECKBOXES */}
          <label className="flex gap-2 items-center">
            <input type="checkbox"
              checked={form.isOutsideLusaka}
              onChange={(e) => set("isOutsideLusaka", e.target.checked)} />
            Outside Lusaka
          </label>

          <label className="flex gap-2 items-center">
            <input type="checkbox"
              checked={form.isSelfDrive}
              onChange={(e) => set("isSelfDrive", e.target.checked)} />
            Self Drive
          </label>

          {/* PRICE */}
          {calculation && (
            <div className="bg-primary/10 p-4 rounded text-center">
              <p className="font-bold text-lg">
                K{calculation.total.toLocaleString()}
              </p>
              <p className="text-sm">
                {calculation.totalDates} date(s)
                {form.isSelfDrive && ` → ${calculation.billableDays} charged`}
              </p>
            </div>
          )}

          {/* PREVIEW */}
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