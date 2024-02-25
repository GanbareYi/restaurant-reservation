import React from "react";
import { Link } from "react-router-dom";

function ReservationsList({ reservations=[] }) {    
    const rows = reservations
                    .filter(rsv => rsv.status !== "finished")
                    .map((rsv) => (
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
                        <th>Action</th>
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