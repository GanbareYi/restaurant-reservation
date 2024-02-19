import React, { useEffect, useState } from "react";
import { listReservations } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";
import ReservationsList from "./ReservationsList";
import { previous, today, next } from "../utils/date-time";
import TablesList from "./TablesList";
/**
 * Defines the dashboard page.
 * @param date
 *  the date for which the user wants to view reservations.
 * @returns {JSX.Element}
 */
function Dashboard({ date }) {
  const [currentDate, setCurrentDate] = useState(date);
  const [reservations, setReservations] = useState([]);
  const [reservationsError, setReservationsError] = useState(null);

  useEffect(loadDashboard, [currentDate]);

  function loadDashboard() {
    const abortController = new AbortController();
    setReservationsError(null);
    listReservations({ date: currentDate }, abortController.signal)
      .then(setReservations)
      .catch(setReservationsError);
    return () => abortController.abort();
  }

  //Button click handler
  const handleClick = (event) => {
    if (event.target.id === "previous") {
      const previousDay = previous(currentDate);
      setCurrentDate(previousDay);

    } else if (event.target.id === "next") {
      const nextDay = next(currentDate);
      setCurrentDate(nextDay);
    } else {
      setCurrentDate(today());
    }
  };

  return (
    <main>
      <h1 className="mt-2">Dashboard</h1>
      {/* Reservations List */}
      <div name="reservation_list">
        <h3 className="mt-5 mb-2 ml-3">Reservations for {currentDate}</h3>
        <ErrorAlert error={reservationsError} />
        <ReservationsList reservations={reservations} />
        
        <div className="d-flex justify-content-md-end">
          <button id="previous" onClick={handleClick} className="btn btn-primary mr-md-2 col-1" type="button">
              Previous
          </button>
          <button id="next" onClick={handleClick} className="btn btn-primary mr-md-2 col-1" type="button">
              Next
          </button>
          <button id="today" onClick={handleClick} className="btn btn-primary col-1" type="button">
              Today
          </button>
        </div>
      </div>

      <hr />
      
      {/* Tables List */}
      <div name="tables_list">
        <h3 className="mt-5 ml-3">Tables</h3>
        <TablesList />
      </div>
    </main>
  );
}

export default Dashboard;
