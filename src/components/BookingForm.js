import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function BookingForm({
  form,
  handleChange,
  handleSubmit,
  bookedSlots,
  setForm
}) {
  const [slotError, setSlotError] = useState(false);
  const navigate = useNavigate();
  return (
    <>
      <h2>🏥 Clinic Appointment Booking</h2>

      <form onSubmit={handleSubmit}>
        <p style={{ fontSize: "12px", color: "#666" }}>
          * Required fields
        </p>
        <input
          name="name"
          placeholder="Name *"
          value={form.name}
          onChange={handleChange}
          required
          style={{ width: "100%", marginBottom: 10 }}
        />

        <input
          name="phone"
          placeholder="Phone *"
          value={form.phone}
          onChange={handleChange}
          required
          style={{ width: "100%", marginBottom: 10 }}
        />

        <input
          name="age"
          placeholder="Age *"
          value={form.age}
          onChange={handleChange}
          style={{ width: "100%", marginBottom: 10 }}
        />

        <textarea
          name="reason"
          placeholder="Reason *"
          value={form.reason}
          onChange={handleChange}
          style={{ width: "100%", marginBottom: 10 }}
        />

        <input
          type="date"
          name="date"
          value={form.date}
          onChange={handleChange}
          required
          style={{ width: "100%", marginBottom: 10 }}
        />

        {/* ⭐ Time Slot Buttons */}
        <div style={{ marginBottom: 20 }}>
          <p><strong>Select Time Slot *</strong></p>
          {slotError && (
            <p style={{ color: "#d32f2f", fontSize: "12px" }}>
              Please select a date first
            </p>
          )}
          {[
            "09:00", "09:30", "10:00", "10:30",
            "11:00", "11:30", "12:00",
            "14:00", "14:30", "15:00", "15:30", "16:00"
          ].map(slot => {
            const isBooked = bookedSlots.includes(slot);

            return (
              <button
                key={slot}
                type="button"
                disabled={isBooked}
                onClick={() => {
                  if (!form.date) {
                    setSlotError(true);
                    return;
                  }

                  setSlotError(false);
                  setForm({ ...form, time: slot });
                }}
                style={{
                  margin: 5,
                  padding: "8px 12px",
                  backgroundColor: isBooked
                    ? "#ddd"
                    : form.time === slot
                      ? "#4CAF50"
                      : "#eee",
                  color: isBooked
                    ? "#777"
                    : form.time === slot
                      ? "white"
                      : "black",
                  border: "none",
                  borderRadius: 6,
                  cursor: isBooked ? "not-allowed" : "pointer"
                }}
              >
                {slot}
              </button>
            );
          })}
        </div>

        <button type="submit" style={{ width: "100%" }}>
          Book Appointment
        </button>
      </form>
      <button
        type="button"
        onClick={() => navigate("/admin")}
        style={{
          position: "fixed",
          top: 15,
          right: 15,
          padding: "6px 12px",
          borderRadius: 6,
          border: "1px solid #ccc",
          backgroundColor: "#fafafa",
          cursor: "pointer",
          fontSize: "13px",
          boxShadow: "0 1px 4px rgba(0,0,0,0.1)"
        }}
      >
        🔐 Go to Admin
      </button>
    </>
  );
}

export default BookingForm;