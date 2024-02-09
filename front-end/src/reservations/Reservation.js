import React from "react";
import { useHistory } from "react-router-dom";

function Reservation() {
    const history = useHistory();
    /* Submit button handler. When clicked, saves the new reservation, 
     * then displays the /dashboard page for the date of the new reservation.
     */
    const handleSubmit = () => {
        history.push("/dashboard");
    };

    // Cancel button handler. When clicked, navigate the user to the previous page.
    const handleCancel = () => {
        history.goBack();
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
                    <input className="form-control" type="text" name="first_name" placeholder="first name" required/>
                </div>
                {/* Last Name */}
                <div className="col-md-6">
                    <label className="form-label">
                        Last Name:
                    </label>
                    <input className="form-control" type="text" name="last_name" placeholder="last name" required />
                </div>
                {/* Mobile Number */}
                <div className="col-md-6">
                    <label className="form-label">
                        Mobile number:
                    </label>
                    <input className="form-control" type="text" name="mobile_number" placeholder="(123)456-7890" required/>
                </div>
                {/* Number of People */}
                <div className="col-md-6">
                    <label className="form-label">
                        People:
                    </label>
                    <input className="form-control" name="people" defaultValue={1} required/>
                </div>
                {/* Date of Reservation */}
                <div className="col-md-6">
                    <label className="form-label">
                        Date of reservation:
                    </label>
                    <input className="form-control" name="reservation_date" type="date" />
                </div>
                {/* Time of Reservation */}
                <div className="col-md-6">
                    <label className="form-label">
                        Time of reservation:
                    </label>
                    <input className="form-control" name="reservation_time" type="time" />
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