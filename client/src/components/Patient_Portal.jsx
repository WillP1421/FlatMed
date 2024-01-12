import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import NavBar from './NavBar';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './PatientPortal.css';

const PatientPortal = ({ authData, dispatch }) => {
  const { patientData, token } = authData;
  const [appointments, setAppointments] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [rating, setRating] = useState('');
  const [comment, setComment] = useState('');
  const [newDate, setNewDate] = useState(null); 
  const [newTime, setNewTime] = useState(null); 
  const [editingAppointmentId, setEditingAppointmentId] = useState(null);

  useEffect(() => {
    const storedToken = localStorage.getItem('authToken');

    if (storedToken) {
      dispatch({ type: 'SET_TOKEN', payload: storedToken });
    }

    fetchAppointments();
    fetchDoctors();
  }, [dispatch, token]);

  useEffect(() => {
    localStorage.setItem('authToken', token);
  }, [token]);

  const fetchAppointments = async () => {
    try {
      const response = await fetch(`/patients/${patientData.id}/appointments`);
      if (response.ok) {
        const appointmentsData = await response.json();
        setAppointments(appointmentsData);
      } else {
        console.error('Failed to fetch appointments');
      }
    } catch (error) {
      console.error('Error during appointment fetch:', error);
    }
  };

  const fetchDoctors = async () => {
    try {
      const response = await fetch('/doctors');
      if (response.ok) {
        const doctorsData = await response.json();
        setDoctors(doctorsData);
      } else {
        console.error('Failed to fetch doctors');
      }
    } catch (error) {
      console.error('Error during doctor fetch:', error);
    }
  };

  const handleAddAppointment = async (e) => {
    e.preventDefault();

    if (!selectedDoctor) {
      console.error('Please select a doctor before adding an appointment');
      return;
    }

    if (!selectedDate || !selectedTime) {
      console.error('Please select both date and time');
      return;
    }

    try {
      const payload = {
        doctor_id: selectedDoctor.id,
        date: selectedDate.toISOString().split('T')[0],
        time: selectedTime.toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' }),
      };

      const response = await fetch(`/patients/${patientData.id}/add_appointment`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        await fetchAppointments();
        setSelectedDoctor(null);
        setSelectedDate(null);
        setSelectedTime(null);
      } else {
        console.error('Failed to add appointment');
      }
    } catch (error) {
      console.error('Error during appointment addition:', error);
    }
  };

  const handleAddReview = async (e) => {
    e.preventDefault();

    if (!selectedDoctor || !rating || !comment) {
      console.error('Please select a doctor and provide rating/comment before adding a review');
      return;
    }

    try {
      const payload = {
        doctor_id: selectedDoctor.id,
        rating,
        comment,
      };

      const response = await fetch(`/reviews/${patientData.id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        setRating('');
        setComment('');
        console.log('Review added successfully');
      } else {
        console.error('Failed to add review');
      }
    } catch (error) {
      console.error('Error during review addition:', error);
    }
  };

  const handleEditAppointment = async (appointmentId) => {
    try {
      if (!newDate || !newTime) {
        console.error('Please select both new date and new time');
        return;
      }
  
      const payload = {
        date: newDate.toISOString().split('T')[0],
        time: newTime.toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' }),
      };
  
      const response = await fetch(`/appointments/${appointmentId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });
  
      if (response.ok) {
        console.log('Appointment updated successfully');
        await fetchAppointments();
        setEditingAppointmentId(null);
        setNewDate(null);
        setNewTime(null);
      } else {
        console.error('Failed to update appointment');
      }
    } catch (error) {
      console.error('Error during appointment update:', error);
    }
  };
  
  const handleDeleteAppointment = async (appointmentId) => {
    try {
      const response = await fetch(`/appointments/${appointmentId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        console.log('Appointment deleted successfully');
        await fetchAppointments();
      } else {
        console.error('Failed to delete appointment');
      }
    } catch (error) {
      console.error('Error during appointment deletion:', error);
    }
  }

  const handleEditButtonClick = (appointmentId) => {
    setEditingAppointmentId(appointmentId);
  };

  const handleCancelEdit = () => {
    setEditingAppointmentId(null);
    setNewDate(null);
    setNewTime(null);
  };
  const handleSaveButtonClick = async (appointmentId) => {
    try {
      if (!newDate || !newTime) {
        console.error('Please select both new date and new time');
        return;
      }

      const payload = {
          date: newDate, 
          time: newTime.toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' }),
      };

      console.log('Save button clicked. Payload:', payload);

      const response = await fetch(`/appointments/${appointmentId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        console.log('Appointment updated successfully');
        await fetchAppointments();
        setEditingAppointmentId(null);
        setNewDate(null);
        setNewTime(null);
      } else {
        console.error('Failed to update appointment');
      }
    } catch (error) {
      console.error('Error during appointment update:', error);
    }

  };

  return (
    <div className="patient-portal-container">
      <NavBar />
      <h1>Patient Portal</h1>

      {patientData && (
        <div className="patient-welcome">
          <p>Welcome, {patientData.name}!</p>
          <Link to={`/patient_profile/${patientData.id}`}>Edit Profile</Link>
        </div>
      )}

      <div className="appointments-container">
        <h2>Your Appointments</h2>
        <ul>
          {appointments.map((appointment) => (
            <li key={appointment.id}>
              Doctor: {appointment.doctor_name}, Date: {appointment.date}, Time: {appointment.time}, Address: {appointment.doctor_address}

            
              {editingAppointmentId === appointment.id ? (
                <div className="edit-form">
                  <label htmlFor="newDate">New Date:</label>
                  <DatePicker
                    id="newDate"
                    selected={newDate}
                    onChange={(date) => setNewDate(date)}
                    dateFormat="yyyy-MM-dd"
                    className="date-picker"
                  />

                  <label htmlFor="newTime">New Time:</label>
                  <DatePicker
                    id="newTime"
                    selected={newTime}
                    onChange={(time) => setNewTime(time)}
                    showTimeSelect
                    showTimeSelectOnly
                    timeIntervals={15}
                    dateFormat="HH:mm"
                    className="time-picker"
                  /> 
                  
                  <button onClick={() => handleSaveButtonClick(appointment.id)}>Save</button>
                  <button onClick={handleCancelEdit}>Cancel</button>
                </div>
              ) : (
                
                <div className="edit-buttons">
                  <button onClick={() => handleEditButtonClick(appointment.id)}>Edit</button>
                  <button onClick={() => handleDeleteAppointment(appointment.id)}>Delete</button>
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>

      <div className="add-appointment-container">
        <h2>Add Appointment</h2>
        <form onSubmit={handleAddAppointment}>
          <label htmlFor="doctor_id">Select Doctor:</label>
          <select
            id="doctor_id"
            value={selectedDoctor ? selectedDoctor.id : ''}
            onChange={(e) => {
              const selectedDocId = e.target.value;
              const doctor = doctors.find((doc) => doc.id === parseInt(selectedDocId, 10));
              setSelectedDoctor(doctor);
            }}
          >
            <option value="" disabled>
              Select Doctor
            </option>
            {doctors.map((doc) => (
              <option key={doc.id} value={doc.id}>
                {doc.name}
              </option>
            ))}
          </select>

          <label htmlFor="date">Select Date:</label>
          <DatePicker
            id="date"
            selected={selectedDate}
            onChange={(date) => setSelectedDate(date)}
            dateFormat="yyyy-MM-dd"
            className="date-picker"
          />

          <label htmlFor="time">Select Time:</label>
          <DatePicker
            id="time"
            selected={selectedTime}
            onChange={(time) => setSelectedTime(time)}
            showTimeSelect
            showTimeSelectOnly
            timeIntervals={15}
            dateFormat="HH:mm"
            className="time-picker"
          />

          <button type="submit" disabled={!selectedDoctor || !selectedDate || !selectedTime} className="submit-button">
            Add Appointment
          </button>
        </form>
      </div>

      <div className="add-review-container">
        <h2>Add Review</h2>
        <form onSubmit={handleAddReview}>
          <label htmlFor="rating">Rating:</label>
          <input
            type="number"
            id="rating"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
          />

          <label htmlFor="comment">Comment:</label>
          <textarea
            id="comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />

          <button type="submit" disabled={!selectedDoctor || !rating || !comment} className="submit-button">
            Add Review
          </button>
        </form>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  authData: state.auth,
});

export default connect(mapStateToProps)(PatientPortal);
