import React from "react";
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
    
    const rows = reservations.map((rsv) => (
        <tr key={rsv.reservation_id}>
            <td>{rsv.reservation_date}</td>
            <td>{rsv.reservation_time}</td>
            <td>{rsv.reservation_id}</td>
            <td>{rsv.first_name}</td>
            <td>{rsv.last_name}</td>
            <td>{rsv.mobile_number}</td>
            <td>{rsv.people}</td>
            <td data-reservation-id-status={rsv.reservation_id}>
                {rsv.status}</td>
            <td>
                {!rsv.status || rsv.status === "booked" ?
                    (<a href={`/reservations/${rsv.reservation_id}/seat`} 
                        className="btn btn-primary" >
                        Seat
                    </a>)
                    :
                    null
                }
            </td>
            <td>
                {rsv.status === "booked" ? 
                    (<a href={`/reservations/${rsv.reservation_id}/edit`}
                        className="btn btn-primary">
                        Edit
                    </a>)
                    :
                    null
                }
            </td>
            <td data-reservation-id-cancel={rsv.reservation_id}>
                {rsv.status === "booked" ? 
                    (<button className="btn btn-primary"
                            onClick={() => handleClick(rsv.reservation_id)}>
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