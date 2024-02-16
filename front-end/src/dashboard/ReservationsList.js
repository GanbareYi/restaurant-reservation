import React from "react";

function ReservationsList({ reservations=[] }) {
    if (reservations.length === 0) {
        return (
            <div>
                <p>No reservation.</p>
            </div>
        );
    }

    reservations.sort(compareFn);

    const rows = reservations.map((rsv, index) => (
        <tr key={index}>
            <td>{rsv.reservation_date}</td>
            <td>{rsv.reservation_time}</td>
            <td>{rsv.first_name}</td>
            <td>{rsv.last_name}</td>
            <td>{rsv.mobile_number}</td>
            <td>{rsv.people}</td>
        </tr>
    ));

    return (
        <div className="container col-12 mt-5">
            <table className="table table-hover">
                <thead>
                    <tr>
                        <th>Reservation Date</th>
                        <th>Reservation Time</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Mobile Number</th>
                        <th>People</th>
                    </tr>
                </thead>
                <tbody>
                    {rows}
                </tbody>
            </table>
        </div>
    );
}

const compareFn = (rsvA, rsvB) => {
    if (rsvA.reservation_time < rsvB.reservation_time) {
        return -1;
    } else if (rsvA.reservation_time > rsvB.reservation_time) {
        return 1;
    } else {
        return 0;
    }
};

export default ReservationsList;