import React from "react";

function BookingForm({
  form,
  handleChange,
  handleSubmit,
  bookedSlots,
  setForm
}) {
  return (
    <>
      <h2>🏥 Clinic Appointment Booking</h2>

      <form onSubmit={handleSubmit}>
        <input
          name="name"
          placeholder="Patient Name"
          value={form.name}
          onChange={handleChange}
          required
          style={{ width: "100%", marginBottom: 10 }}
        />

        <input
          name="phone"
          placeholder="Phone Number"
          value={form.phone}
          onChange={handleChange}
          required
          style={{ width: "100%", marginBottom: 10 }}
        />

        <input
          name="age"
          placeholder="Age"
          value={form.age}
          onChange={handleChange}
          style={{ width: "100%", marginBottom: 10 }}
        />

        <textarea
          name="reason"
          placeholder="Reason for visit"
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
          <p><strong>Select Time Slot</strong></p>

          {[
            "09:00","09:30","10:00","10:30",
            "11:00","11:30","12:00",
            "14:00","14:30","15:00","15:30","16:00"
          ]
            .filter(slot => !bookedSlots.includes(slot))
            .map(slot => (
              <button
                key={slot}
                type="button"
                onClick={() => setForm({ ...form, time: slot })}
                style={{
                  margin: 5,
                  padding: "8px 12px",
                  backgroundColor: form.time === slot ? "#4CAF50" : "#eee",
                  color: form.time === slot ? "white" : "black",
                  border: "none",
                  borderRadius: 6,
                  cursor: "pointer"
                }}
              >
                {slot}
              </button>
            ))}
        </div>

        <button type="submit" style={{ width: "100%" }}>
          Book Appointment
        </button>
      </form>
    </>
  );
}

export default BookingForm;