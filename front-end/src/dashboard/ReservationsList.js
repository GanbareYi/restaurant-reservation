import React from "react";
import { Link } from "react-router-dom";
import { updateReservationStatus } from "../utils/api";

function ReservationsList({ reservations=[], loadDashboard, setError }) {  
    const handleClick = async (reservation_id) => {
        const abortController = new AbortController();
        setError(null);

        if (window.confirm(
            "Do you want to cancel this reservation? This cannot be undone.")){
                try{
                    await updateReservationStatus(
                            reservation_id, 
                            "cancelled", 
                            abortController.signal);
                    loadDashboard();
                } catch (error) {
                    console.error("Cancelling reservation failed!", error);
                    setError(error);
                } finally {
                    abortController.abort();
                }
        }
    }
    
    const rows = reservations.map((reservation) => (
        <tr key={reservation.reservation_id}>
            <td>{reservation.reservation_date}</td>
            <td>{reservation.reservation_time}</td>
            <td>{reservation.reservation_id}</td>
            <td>{reservation.first_name}</td>
            <td>{reservation.last_name}</td>
            <td>{reservation.mobile_number}</td>
            <td>{reservation.people}</td>
            <td data-reservation-id-status={reservation.reservation_id}>
                {reservation.status}</td>
            <td>
                {!reservation.status || reservation.status === "booked" ?
                    (<Link to={`/reservations/${reservation.reservation_id}/seat`} >
                        <button className="btn btn-primary">Seat</button>
                    </Link>)
                    :
                    null
                }
            </td>
            <td>
                {reservation.status === "booked" ? 
                    (<Link to={`/reservations/${reservation.reservation_id}/edit`} >
                        <button className="btn btn-primary">Edit</button>
                    </Link>)
                    :
                    null
                }
            </td>
            <td data-reservation-id-cancel={reservation.reservation_id}>
                {reservation.status === "booked" ? 
                    (<button className="btn btn-primary"
                            onClick={() => handleClick(reservation.reservation_id)}>
                        Cancel
                    </button>)
                    :
                    null
                }
            </td>
        </tr>
    ));

    return (
        <div className="container col-12">
            <table className="table table-hover">
                <thead>
                    <tr>
                        <th>Reservation Date</th>
                        <th>Reservation Time</th>
                        <th>Reservation ID</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Mobile Number</th>
                        <th>People</th>
                        <th>Status</th>
                        <th>Seat</th>
                        <th>Edit</th>
                        <th>Cancel</th>
                    </tr>
                </thead>
                <tbody>
                    {rows}
                </tbody>
            </table>
        </div>
    );
}

export default ReservationsList;