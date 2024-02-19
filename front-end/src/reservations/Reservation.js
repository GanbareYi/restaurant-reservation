import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { createReservation } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";

function Reservation() {
    const [formData, setFormData] = useState({
        first_name: "",
        last_name: "",
        mobile_number: "",
        people: 1,
        reservation_date: "",
        reservation_time: ""
    });
    const [error, setError] = useState(null);

    const history = useHistory();
    
     //Submit new reservation
    const handleSubmit = async (event) => {
        event.preventDefault();

        try{
            // Make API request
            await createReservation(formData);

            // Use history.push to navigate to the Dashboard
            history.push(`/dashboard?date=${formData.reservation_date}`);
            
        }catch(error){
            console.error("Failed to create reservation! ", error);
            setError(error);
        }
    };

    // Cancel button handler. When clicked, navigate the user to the previous page.
    const handleCancel = () => {
        history.goBack();
    };

    const handleChange= (event) => {
        const { target } = event;
        const { name, value } = target;
        setError(null);
        
        if (name === "people") {
            setFormData({
                ...formData,
                [name]: Number(value),
            });
        } else {
            setFormData({
                ...formData,
                [name]: value,
            });
        }
    };

    return (
        <div className="container-fluid col-md-10 justify-content-center">
            <h1 className="col-md-10 mt-4 text-center">Make a reservation</h1>
            {/* Display error message if error state is not null */}
            <ErrorAlert error={error} />
            <form className="row g-3 mt-3" onSubmit={handleSubmit} >
                {/* First Name */}
                <div className="col-md-5" >
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
                <div className="col-md-5">
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
                <div className="col-md-5">
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
                <div className="col-md-5">
                    <label className="form-label">
                        People:
                    </label>
                    <input className="form-control"
                        type="text"
                        name="people" 
                        value={formData.people}
                        onChange={handleChange}
                        placeholder={1}
                        required />
                </div>
                {/* Date of Reservation */}
                <div className="col-md-5">
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
                <div className="col-md-5">
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
                <div className="col-10 mt-3 d-md-flex justify-content-md-end">
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