import React, { useState } from "react";
import { useHistory, useParams } from "react-router-dom/cjs/react-router-dom.min";
import ErrorAlert from "../layout/ErrorAlert";
import { saveTableAssignment } from "../utils/api";

function SeatReservation() {
    const { reservation_id } = useParams();
    const [table, setTable] = useState({"reservation_id": Number(reservation_id)});
    const [error, setError] = useState(null);
    const tables = [];

    const history = useHistory();

    const handleCancel = (event) => {
        history.goBack();
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        try{
            await saveTableAssignment(table);

            history.push("/dashboard");
        }catch(error) {

        }
    }

    const handleChange = (event) => {
        const { name, value } = event.target;
        setError(null);

        setTable({
            ...table,
            [name]: value
        });

    }

    const options = tables.map((table, index) => {
        <option key={index} value={table.table_id}>
            {table.table_name} - {table.capacity}
        </option>
    });

    return (
        <div>
            <h1 className="col-md-6 mt-4 text-center">Seat a reservation</h1>
            <ErrorAlert error={error} />
            {/* Table number */}
            <div className="container mt-5">
                <label className="form-label mr-3">
                    Table number:
                </label>
                <select className="form-select" name="table_id" required >
                    <option selected>Select an option</option>
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