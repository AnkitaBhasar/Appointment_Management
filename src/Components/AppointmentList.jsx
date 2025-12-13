import React, { useState } from "react";
import "../App.css";

const AppointmentList = ({
  appointments,
  deleteAppointment,
  editAppointment,
  clearAppointments,
}) => {
  const [editIndex, setEditIndex] = useState(null);
  const [editedData, setEditedData] = useState({
    name: "",
    phone: "",
    date: "",
    time: "",
    purpose: "",
  });

  const [search, setSearch] = useState("");
  const [filterDate, setFilterDate] = useState("");
  const [sortType, setSortType] = useState("");

  const startEdit = (index) => {
    setEditIndex(index);
    setEditedData(appointments[index]);
  };

  const saveEdit = (index) => {
    editAppointment(index, editedData);
    setEditIndex(null);
  };

  // Sorting
  const sortAppointments = (list) => {
    if (sortType === "name") {
      return [...list].sort((a, b) => a.name.localeCompare(b.name));
    }
    if (sortType === "date") {
      return [...list].sort((a, b) => new Date(a.date) - new Date(b.date));
    }
    return list;
  };

  // Filter + Search logic
  const filteredAppointments = sortAppointments(
    appointments.filter((a) => {
      const matchSearch =
        a.name.toLowerCase().includes(search.toLowerCase()) ||
        a.phone.includes(search);

      const matchDate = filterDate ? a.date === filterDate : true;

      return matchSearch && matchDate;
    })
  );

  return (
    <div className="table-container">
      <h2 className="title">Appointment List</h2>

      {/* Search + Filter + Sort */}
      <div className="filter-box">
        <input
          type="text"
          placeholder="Search by name or phone..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="search-input"
        />

        <input
          type="date"
          value={filterDate}
          onChange={(e) => setFilterDate(e.target.value)}
          className="filter-date"
        />

        <select
          className="sort-select"
          value={sortType}
          onChange={(e) => setSortType(e.target.value)}
        >
          <option value="">Sort By</option>
          <option value="name">Name</option>
          <option value="date">Date</option>
        </select>
      </div>

      <table className="styled-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Phone</th>
            <th>Date</th>
            <th>Time</th>
            <th>Purpose</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {filteredAppointments.map((a, index) => (
            <tr
              key={index}
              className={editIndex === index ? "editing-row" : ""}
            >
              <td>{index + 1}</td>

              <td>
                {editIndex === index ? (
                  <input
                    value={editedData.name}
                    onChange={(e) =>
                      setEditedData({ ...editedData, name: e.target.value })
                    }
                  />
                ) : (
                  a.name
                )}
              </td>

              <td>
                {editIndex === index ? (
                  <input
                    value={editedData.phone}
                    onChange={(e) =>
                      setEditedData({ ...editedData, phone: e.target.value })
                    }
                  />
                ) : (
                  a.phone
                )}
              </td>

              <td>
                {editIndex === index ? (
                  <input
                    type="date"
                    value={editedData.date}
                    onChange={(e) =>
                      setEditedData({ ...editedData, date: e.target.value })
                    }
                  />
                ) : (
                  a.date
                )}
              </td>

              <td>
                {editIndex === index ? (
                  <input
                    type="time"
                    value={editedData.time}
                    onChange={(e) =>
                      setEditedData({ ...editedData, time: e.target.value })
                    }
                  />
                ) : (
                  a.time
                )}
              </td>

              <td>
                {editIndex === index ? (
                  <textarea
                    value={editedData.purpose}
                    onChange={(e) =>
                      setEditedData({ ...editedData, purpose: e.target.value })
                    }
                  />
                ) : (
                  a.purpose
                )}
              </td>

              <td>
                {editIndex === index ? (
                  <>
                    <button className="save-btn" onClick={() => saveEdit(index)}>
                      Save
                    </button>
                    <button
                      className="cancel-btn"
                      onClick={() => setEditIndex(null)}
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      className="edit-btn"
                      onClick={() => startEdit(index)}
                    >
                      Edit
                    </button>

                    <button
                      className="delete-btn"
                      onClick={() => deleteAppointment(index)}
                    >
                      Delete
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {appointments.length > 0 && (
        <button className="clear-btn" onClick={clearAppointments}>
          Clear All
        </button>
      )}
    </div>
  );
};

export default AppointmentList;
