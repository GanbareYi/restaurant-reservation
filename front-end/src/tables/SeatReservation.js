import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom/cjs/react-router-dom.min";
import ErrorAlert from "../layout/ErrorAlert";
import { listTables, saveTableAssignment, updateReservationStatus } from "../utils/api";

function SeatReservation() {
    const { reservation_id } = useParams();
    const [tables, setTables] = useState([]);
    const [seat, setSeat] = useState({reservation_id: Number(reservation_id)});
    const [error, setError] = useState(null);

    function loadTables() {
        const abortController = new AbortController();
        listTables(abortController.signal)
          .then(setTables)
          .catch(setError);
    
        return () => abortController.abort();
      }

    useEffect(loadTables, []);

    const history = useHistory();

    const handleCancel = (event) => {
        history.goBack();
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        try{
            await saveTableAssignment(seat);
            await updateReservationStatus(seat.reservation_id, "seated");

            history.push("/dashboard");
        }catch(error) {
            console.error(error);
            setError(error);
        }
    }

    const handleChange = (event) => {
        const { name, value } = event.target;
        setError(null);

        setSeat({
            ...seat,
            [name]: value
        });

    }

    const options = tables.map((table, index) => (
        <option key={index} value={table.table_id}>
            {table.table_name} - {table.capacity}
        </option>
    ));

    return (
        <div>
            <h1 className="col-md-6 mt-4 text-center">Seat a reservation</h1>
            <ErrorAlert error={error} />
            {/* Table number */}
            <div className="container mt-5">
                <label className="form-label mr-3">
                    Table number:
                </label>
                <select className="form-select" name="table_id" onChange={handleChange} required >
                    <option>Select an option</option>
                    {options}
                </select>
            </div>
            <div className="col-md-6 mt-3 d-md-flex justify-content-md-end">
                <button className="btn btn-primary mr-3" type="submit" onClick={handleSubmit}>
                    Submit
                </button>
                <button className="btn btn-secondary" type="button" onClick={handleCancel}>
                    Cancel
                </button>
            </div>
        </div>
    );
}

export default SeatReservation;