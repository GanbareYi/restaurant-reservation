import React from "react";

function TablesList({ tables=[] }) {

    const rows = tables.map((table, index) => (
        <tr key={index}>
            <td>{table.table_name}</td>
            <td>{table.capacity}</td>
            <td data-table-id-status={table.table_id}>{table.status ? table.status: "Free"}</td>
        </tr>
    ));

    return (
        <div className="container row justify-content-start col-6">
            <table className="table table-hover">
                <thead>
                    <tr>
                        <th>Table Name</th>
                        <th>Capacity</th>
                        <th>Status</th>
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