import React from "react";

function ReservationsList({ reservations=[] }) {
    if (reservations.length === 0) {
        return (
            <div>
                <p>No reservation.</p>
            </div>
        );
    }

    const rows = reservations.map((rsv, index) => (
        <tr key={index}>
            <td>{rsv.reservation_date}</td>
            <td>{rsv.reservation_time}</td>
            <td>{rsv.first_name}</td>
            <td>{rsv.last_name}</td>
            <td>{rsv.mobile_number}</td>
            <td>{rsv.people}</td>
            <td>
                <a href={`/reservations/${rsv.reservation_id}/seat`} className="btn btn-primary">Seat</a>
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
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Mobile Number</th>
                        <th>People</th>
                        <th>Table</th>
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