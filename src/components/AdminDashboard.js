import React from "react";
import AppointmentCard from "./AppointmentCard";
import { collection, query, where, getDocs, addDoc } from "firebase/firestore";
import { db } from "../firebase";

function AdminDashboard({
  appointments,
  updateStatus,
  showTodayOnly,
  searchTerm,
  currentToken,
  setCurrentToken,
}) {
  const [showWalkInForm, setShowWalkInForm] = React.useState(false);
  const [walkInData, setWalkInData] = React.useState({
    name: "",
    age: "",
    reason: "",
  });
  // ⭐ ADD WALK-IN FUNCTION HERE
  const handleWalkIn = async () => {
    const today = new Date().toISOString().split("T")[0];

    const q = query(collection(db, "appointments"), where("date", "==", today));

    const snapshot = await getDocs(q);
    const tokenNumber = snapshot.size + 1;

    await addDoc(collection(db, "appointments"), {
      name: walkInData.name || "Walk-in",
      phone: "-",
      age: walkInData.age,
      reason: walkInData.reason || "Walk-in",
      date: today,
      time: "Walk-in",
      status: "Booked",
      token: tokenNumber,
    });

    // Reset form
    setWalkInData({ name: "", age: "", reason: "" });
    setShowWalkInForm(false);
  };

  const today = new Date().toISOString().split("T")[0];

  const todayAppointments = appointments.filter((a) => a.date === today);

  const totalToday = todayAppointments.length;

  const completedToday = todayAppointments.filter(
    (a) => a.status === "Completed"
  ).length;

  const cancelledToday = todayAppointments.filter(
    (a) => a.status === "Cancelled"
  ).length;

  const pendingToday = totalToday - completedToday - cancelledToday;
  return (
    <>
      <h2>👩‍⚕️ Admin Dashboard</h2>
      <div
        style={{
          backgroundColor: "#f1f3f5",
          padding: 12,
          marginBottom: 15,
          borderRadius: 6,
        }}
      >
        <strong>📊 Today’s Summary</strong>

        <p>👥 Total: {totalToday}</p>
        <p>⏳ Pending: {pendingToday}</p>
        <p>✔️ Completed: {completedToday}</p>
        <p>❌ Cancelled: {cancelledToday}</p>
      </div>

      <button
        onClick={() => {
          const today = new Date().toISOString().split("T")[0];

          const todayAppointments = appointments
            .filter((a) => a.date === today)
            .sort((a, b) => (a.token || 0) - (b.token || 0));

          const next = todayAppointments.find(
            (a) => a.token > (currentToken || 0)
          );

          if (!next) return;

          const confirmMove = window.confirm(
            `Move to next patient?\nToken ${currentToken || 0} → ${next.token}`
          );

          if (confirmMove) {
            setCurrentToken(next.token);
          }
        }}
        style={{ marginBottom: 15 }}
      >
        ▶️ Call Next Patient
      </button>
      <button
        onClick={() => {
          if (!currentToken) {
            alert("No patient is being served yet.");
            return;
          }

          alert(`Calling Token ${currentToken} again`);
        }}
        style={{ marginBottom: 15, marginLeft: 10 }}
      >
        🔁 Recall Current Patient
      </button>
      {currentToken && (
        <div
          style={{
            backgroundColor: "#fff3cd",
            padding: 12,
            marginBottom: 15,
            borderRadius: 6,
            textAlign: "center",
            fontWeight: "bold",
          }}
        >
          ▶️ NOW SERVING: Token {currentToken}
        </div>
      )}
      {appointments.length === 0 && <p>No appointments yet</p>}
      <button
        onClick={() => setShowWalkInForm(!showWalkInForm)}
        style={{ marginBottom: 15 }}
      >
        ➕ Add Walk-In Patient
      </button>
      {showWalkInForm && (
        <div style={{ marginBottom: 15 }}>
          <input
            placeholder="Patient Name"
            value={walkInData.name}
            onChange={(e) =>
              setWalkInData({ ...walkInData, name: e.target.value })
            }
            style={{ marginRight: 5 }}
          />

          <input
            placeholder="Age"
            value={walkInData.age}
            onChange={(e) =>
              setWalkInData({ ...walkInData, age: e.target.value })
            }
            style={{ marginRight: 5 }}
          />

          <input
            placeholder="Reason"
            value={walkInData.reason}
            onChange={(e) =>
              setWalkInData({ ...walkInData, reason: e.target.value })
            }
            style={{ marginRight: 5 }}
          />

          <button onClick={handleWalkIn}>Save</button>
        </div>
      )}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: 15,
        }}
      >
        {appointments
          .filter((appt) => {
            const matchesSearch =
              appt.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
              appt.phone.includes(searchTerm);

            if (!matchesSearch) return false;

            if (!showTodayOnly) return true;

            const today = new Date().toISOString().split("T")[0];
            return appt.date === today;
          })
          .sort((a, b) => {
            // If both are today → sort by token
            const today = new Date().toISOString().split("T")[0];

            if (a.date === today && b.date === today) {
              return (a.token || 0) - (b.token || 0);
            }

            // Otherwise sort by date/time
            const dateTimeA = new Date(`${a.date} ${a.time}`);
            const dateTimeB = new Date(`${b.date} ${b.time}`);
            return dateTimeA - dateTimeB;
          })
          .map((appt) => (
            <AppointmentCard
              key={appt.id}
              appt={appt}
              updateStatus={updateStatus}
            />
          ))}
      </div>
    </>
  );
}

export default AdminDashboard;
