import React from "react";

function ReservationsList({ reservations=[] }) {
    if (reservations.length === 0) {
        return (
            <div>
                <p>No reservations in the day.</p>
            </div>
        );
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
                {rsv.reservation_status}</td>
            <td>
                {rsv.reservation_status === "booked" ?
                    (<Link to={`/reservations/${rsv.reservation_id}/seat`} >
                        <button className="btn btn-primary">
                            Seat
                        </button>
                    </Link>)
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