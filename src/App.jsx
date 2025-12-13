import React, { useState } from "react";
import "./App.css";
import AppointmentForm from "./Components/AppointmentForm";
import AppointmentList from "./Components/AppointmentList";

const App = () => {
  const [appointments, setAppointments] = useState([]);

  const addAppointment = (appointment) => {
    setAppointments([...appointments, appointment]);
  };

  const deleteAppointment = (index) => {
    const deleted = [...appointments];
    deleted.splice(index, 1);
    setAppointments(deleted);
  };

  const editAppointment = (index, editedName, editedDate) => {
    const updated = [...appointments];
    updated[index] = { name: editedName, date: editedDate };
    setAppointments(updated);
  };

  const clearAppointments = () => setAppointments([]);

  return (
    <div style={{ textAlign: "center" }}>
      <h1 style={{ marginTop: "20px", color: "gold" }}>
        Appointment Management System
      </h1>

      <AppointmentForm addAppointment={addAppointment} />

      <AppointmentList
        appointments={appointments}
        deleteAppointment={deleteAppointment}
        editAppointment={editAppointment}
        clearAppointments={clearAppointments}
      />
    </div>
  );
};

export default App;
