import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { createReservation } from "../utils/api";

function Reservation() {
    const [formData, setFormData] = useState({});

    const history = useHistory();
    /**
     Submit button handler. When clicked, saves the new reservation, 
     * then displays the /dashboard page for the date of the new reservation.
     */
    const handleSubmit = async (e) => {
        e.preventDefault();

        history.push("/dashboard");
    };

    // Cancel button handler. When clicked, navigate the user to the previous page.
    const handleCancel = () => {
        history.goBack();
    }

    const handleChange= (event) => {
        const { target } = event;
        const { name, value } = target;

        setFormData = {
            ...formData,
            [name]: value
        };
    }

    return (
        <div>
            <h1>NEW RESERVATION</h1>
            <form className="row g-3 mt-3" onSubmit={handleSubmit} >
                {/* First Name */}
                <div className="col-md-6" >
                    <label className="form-label">
                        First Name:
                    </label>
                    <input className="form-control" 
                        type="text" 
                        name="first_name"
                        value={formData.first_name}
                        onChange={handleChange} 
                        placeholder="first name" 
                        required />
                </div>
                {/* Last Name */}
                <div className="col-md-6">
                    <label className="form-label">
                        Last Name:
                    </label>
                    <input className="form-control" 
                        type="text" 
                        name="last_name"
                        value={formData.last_name}
                        onChange={handleChange} 
                        placeholder="last name" 
                        required />
                </div>
                {/* Mobile Number */}
                <div className="col-md-6">
                    <label className="form-label">
                        Mobile number:
                    </label>
                    <input className="form-control" 
                        type="text" 
                        name="mobile_number" 
                        value={formData.mobile_number}
                        onChange={handleChange}
                        placeholder="(123)456-7890" 
                        required/>
                </div>
                {/* Number of People */}
                <div className="col-md-6">
                    <label className="form-label">
                        People:
                    </label>
                    <input className="form-control"
                        type="text"
                        name="people" 
                        value={formData.people}
                        onChange={handleChange}
                        defaultValue={1} 
                        required />
                </div>
                {/* Date of Reservation */}
                <div className="col-md-6">
                    <label className="form-label">
                        Date of reservation:
                    </label>
                    <input className="form-control" 
                        name="reservation_date" 
                        value={formData.reservation_date}
                        type="date" 
                        onChange={handleChange}
                        required />
                </div>
                {/* Time of Reservation */}
                <div className="col-md-6">
                    <label className="form-label">
                        Time of reservation:
                    </label>
                    <input className="form-control" 
                        name="reservation_time" 
                        value={formData.reservation_time}
                        type="time" 
                        onChange={handleChange}
                        required />
                </div>
                {/* Submit & Cancel Button */}
                <div className="col-12 mt-3 d-md-flex justify-content-md-end">
                    <button className="btn btn-primary mr-3" type="submit">
                        Submit
                    </button>
                    <button className="btn btn-secondary" type="button" onClick={handleCancel}>
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
}

export default Reservation;