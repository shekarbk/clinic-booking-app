import React, { useState, useEffect } from "react";
import { db } from "./firebase";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import {
  collection,
  addDoc,
  query,
  where,
  getDocs,
  onSnapshot,
  doc,
  updateDoc,
} from "firebase/firestore";
import AdminDashboard from "./components/AdminDashboard";
import BookingForm from "./components/BookingForm";
import AdminLogin from "./components/AdminLogin";

function App() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    age: "",
    reason: "",
    date: "",
    time: "",
  });

  const [bookedSlots, setBookedSlots] = useState([]);

  const [appointments, setAppointments] = useState([]);

  const [isAdmin, setIsAdmin] = useState(false);

  const [showTodayOnly, setShowTodayOnly] = useState(false);

  const [searchTerm, setSearchTerm] = useState("");

  const [lastToken, setLastToken] = useState(null);

  const [lastDate, setLastDate] = useState(null);
  const [lastTime, setLastTime] = useState(null);
  const [currentToken, setCurrentToken] = useState(null);

  const adminLogin = () => {
    const pin = prompt("Enter Admin PIN");

    if (pin === "1234") {
      setIsAdmin(true);
    } else {
      alert("Wrong PIN");
    }
  };

  const updateStatus = async (id, newStatus) => {
    const ref = doc(db, "appointments", id);

    await updateDoc(ref, {
      status: newStatus,
    });
  };

  useEffect(() => {
    const q = query(collection(db, "appointments"));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setAppointments(data);
    });

    return () => unsubscribe();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm({ ...form, [name]: value });

    // When date changes → fetch booked slots
    if (name === "date") {
      fetchBookedSlots(value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !form.name ||
      !form.phone ||
      !form.age ||
      !form.reason ||
      !form.date ||
      !form.time
    ) {
      alert("Please fill all required fields.");
      return;
    }

    const phoneRegex = /^[0-9]{8,15}$/;

    if (!phoneRegex.test(form.phone)) {
      alert("Enter a valid phone number.");
      return;
    }

    const ageNum = parseInt(form.age);

    if (ageNum <= 0 || ageNum > 120) {
      alert("Enter a valid age.");
      return;
    }

    // e.preventDefault();

    try {
      // ⭐ Get today's date
      const today = form.date;

      // ⭐ Find existing appointments for same day
      const q = query(
        collection(db, "appointments"),
        where("date", "==", today)
      );

      const snapshot = await getDocs(q);

      // ⭐ Next token = existing count + 1
      const tokenNumber = snapshot.size + 1;

      // ⭐ Save with token
      await addDoc(collection(db, "appointments"), {
        ...form,
        status: "Booked",
        token: tokenNumber,
      });

      setLastToken(tokenNumber);
      setLastDate(form.date);
      setLastTime(form.time);

      setForm({
        name: "",
        phone: "",
        age: "",
        reason: "",
        date: "",
        time: "",
      });
    } catch (error) {
      console.error("Error adding document: ", error);
      alert("Error booking appointment");
    }
  };

  const fetchBookedSlots = async (selectedDate) => {
    const q = query(
      collection(db, "appointments"),
      where("date", "==", selectedDate)
    );

    const querySnapshot = await getDocs(q);

    const slots = querySnapshot.docs.map((doc) => doc.data().time);
    setBookedSlots(slots);
  };
  return (
    <Router>
      <Routes>

        {/* Patient Booking Page */}
        <Route
          path="/"
          element={
            <div style={{ maxWidth: 900, margin: "40px auto", fontFamily: "Arial" }}>
              {lastToken && (
                <div style={{
                  backgroundColor: "#e8f5e9",
                  padding: 15,
                  marginBottom: 15,
                  borderRadius: 6,
                  textAlign: "center",
                }}>
                  <h3>✅ Appointment Confirmed</h3>
                  <p>🎟️ Token: <strong>{lastToken}</strong></p>
                  <p>📅 Date: <strong>{lastDate}</strong></p>
                  <p>⏰ Time: <strong>{lastTime}</strong></p>
                </div>
              )}

              <BookingForm
                form={form}
                handleChange={handleChange}
                handleSubmit={handleSubmit}
                bookedSlots={bookedSlots}
                setForm={setForm}
              />
            </div>
          }
        />

        {/* Admin Page */}
        <Route
          path="/admin"
          element={
            <div style={{ maxWidth: 900, margin: "40px auto" }}>
              <AdminLogin isAdmin={isAdmin} setIsAdmin={setIsAdmin} />

              {isAdmin && (
                <AdminDashboard
                  appointments={appointments}
                  updateStatus={updateStatus}
                  showTodayOnly={showTodayOnly}
                  searchTerm={searchTerm}
                  currentToken={currentToken}
                  setCurrentToken={setCurrentToken}
                  setIsAdmin={setIsAdmin}
                />
              )}
            </div>
          }
        />

      </Routes>
    </Router>
  );
}

export default App;
