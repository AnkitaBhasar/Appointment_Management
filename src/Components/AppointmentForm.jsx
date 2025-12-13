import React, { useState } from "react";
import "../App.css";

const AppointmentForm = ({ addAppointment }) => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    date: "",
    time: "",
    purpose: "",
  });

  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState("");

  // Handle Input Change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  // Basic Validation
  const validate = () => {
    let tempErrors = {};

    if (!formData.name.trim()) tempErrors.name = "Name is required";
    if (!formData.phone.trim()) tempErrors.phone = "Phone number is required";
    if (formData.phone.length !== 10)
      tempErrors.phone = "Phone number must be 10 digits";

    if (!formData.date) tempErrors.date = "Select appointment date";
    if (!formData.time) tempErrors.time = "Select appointment time";
    if (!formData.purpose.trim())
      tempErrors.purpose = "Purpose cannot be empty";

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  // Submit Handler
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validate()) return;

    addAppointment(formData);

    setSuccess("Appointment added successfully ✔");
    setTimeout(() => setSuccess(""), 2000);

    setFormData({
      name: "",
      phone: "",
      date: "",
      time: "",
      purpose: "",
    });
  };

  return (
    <div className="appointment-card">
      <h2 className="title">Book an Appointment</h2>

      {success && <p className="success-message">{success}</p>}

      <form onSubmit={handleSubmit} className="form-box">
        {/* Name */}
        <div className="input-group">
          <label>Name</label>
          <input
            type="text"
            name="name"
            placeholder="Enter full name"
            value={formData.name}
            onChange={handleChange}
          />
          {errors.name && <span className="error">{errors.name}</span>}
        </div>

        {/* Phone */}
        <div className="input-group">
          <label>Phone Number</label>
          <input
            type="number"
            name="phone"
            placeholder="10-digit mobile number"
            value={formData.phone}
            onChange={handleChange}
          />
          {errors.phone && <span className="error">{errors.phone}</span>}
        </div>

        {/* Date */}
        <div className="input-group">
          <label>Appointment Date</label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
          />
          {errors.date && <span className="error">{errors.date}</span>}
        </div>

        {/* Time */}
        <div className="input-group">
          <label>Appointment Time</label>
          <input
            type="time"
            name="time"
            value={formData.time}
            onChange={handleChange}
          />
          {errors.time && <span className="error">{errors.time}</span>}
        </div>

        {/* Purpose */}
        <div className="input-group">
          <label>Purpose</label>
          <textarea
            name="purpose"
            placeholder="Enter appointment purpose"
            value={formData.purpose}
            onChange={handleChange}
          />
          {errors.purpose && <span className="error">{errors.purpose}</span>}
        </div>

        <button type="submit" className="submit-btn">
          Add Appointment
        </button>
      </form>
    </div>
  );
};

export default AppointmentForm;
