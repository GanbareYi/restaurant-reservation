import React, { useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { createTable } from "../utils/api";

function NewTable() {
    const [newTable, setNewTable] = useState({
                                            status: "Free",
                                            capacity: 1
                                        });
const history = useHistory();

    const handleChange = (event) => {
        const { name, value } = event.target;

        if (name === "capacity") {
            setNewTable({
                ...newTable,
                [name]: Number(value)
            });
        } else {
            setNewTable({
                ...newTable,
                [name]: value
            });
        }

    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        try{
            await createTable(newTable);
            history.push("/dashboard");
        } catch(error){
            console.error("Failed to create table!", error);
            throw error;
        }
    };

    const handleCancel = (event) => {
        history.goBack();
    };

    return (
        <div className="container-fluid col-md-8 justify-content-center">
            <h1 className="col-md-8 mt-4 text-center">New table</h1>
            <form className="row g-3 mt-3" onSubmit={handleSubmit}>
                {/* Table name */}
                <div className="col-md-4">
                    <label className="form-label">
                        Table
                    </label>
                    <input className="form-control" 
                        type="text"
                        name="table_name"
                        minLength={2}
                        placeholder="Table Name"
                        value={newTable.table_name}
                        onChange={handleChange}
                        required
                        />
                </div>
                {/* Capacity */}
                <div className="col-md-4">
                    <label className="form-label">
                        Capacity
                    </label>
                    <input className="form-control"
                        type="text"
                        name="capacity"
                        value={newTable.capacity}
                        onChange={handleChange}
                        required
                        />
                </div>
                <div className="col-8 mt-3 d-md-flex justify-content-md-end">
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

export default NewTable;