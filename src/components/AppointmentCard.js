import React from "react";

function AppointmentCard({ appt, updateStatus }) {
  const isToday =
    appt.date === new Date().toISOString().split("T")[0];

  return (
    <div
      style={{
        border: "1px solid #ddd",
        padding: 10,
        borderRadius: 6,
        backgroundColor: isToday ? "#e8f5e9" : "#fff"
      }}
    >
      <p><strong>{appt.name}</strong> ({appt.age})</p>
      <p>📞 {appt.phone}</p>
      <p>📅 {appt.date} — ⏰ {appt.time}</p>
      <p>🎟️ Token: {appt.token || "-"}</p>
      <p>📌 Status: {appt.status || "Booked"}</p>
      <p>📝 {appt.reason}</p>

      <div style={{ marginTop: 10 }}>
        <button
          style={{ marginRight: 5 }}
          onClick={() => updateStatus(appt.id, "Completed")}
        >
          ✔️ Complete
        </button>

        <button
          onClick={() => updateStatus(appt.id, "Cancelled")}
        >
          ❌ Cancel
        </button>
      </div>
    </div>
  );
}

export default AppointmentCard;