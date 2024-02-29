import React from "react";
import { freeUpTable } from "../utils/api";

function TablesList({ tables=[], setError, loadTables, loadDashboard }) {

    const handleFinish = async (table_id) => {
        setError(null);
        if (window.confirm(
            "Is this table ready to seat new guests? This cannot be undone."
            )){
                try{
                    await freeUpTable(table_id);
                    loadTables();
                    loadDashboard();
                }catch(error){
                    console.error("Free up table failed! ", error);
                    setError(error);
                }
            }
    };

    const rows = tables.map((table) => (
        <tr key={table.table_id}>
            <td>{table.table_name}</td>
            <td>{table.capacity}</td>
            <td>{table.reservation_id}</td>
            <td data-table-id-status={table.table_id}>
                {table.status ? table.status: "Free"}
            </td>
            <td>
                {table.status==="Occupied"? 
                    (<button className="btn btn-primary" 
                            data-table-id-finish="${table.table_id}"
                            onClick={() => handleFinish(table.table_id)}
                    >
                        Finish
                    </button>)
                    :
                    null
                }      
            </td>
        </tr>
    ));

    return (
        <div className="container row justify-content-start col-6">
            <table className="table table-hover">
                <thead>
                    <tr>
                        <th>Table Name</th>
                        <th>Capacity</th>
                        <th>Reservation ID</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {/* {JSON.stringify(tables)} */}
                    {rows}
                </tbody>
            </table>
        </div>
    );
}

export default TablesList;