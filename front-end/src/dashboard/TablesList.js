import React from "react";

function TablesList({ tables=[] }) {
    tables.sort(compareFn);

    const rows = tables.map((table, index) => {
        <tr key={index}>
            <td>{table.table_name}</td>
            <td data-table-id-status={table.table_id}>{table.status}</td>
        </tr>
    })

    return (
        <div className="container row justify-content-start col-6">
            <table className="table table-hover">
                <thead>
                    <tr>
                        <th>Table Name</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {rows}
                </tbody>
            </table>
        </div>
    );
}

const compareFn = (tbA, tbB) => {
    return tbA.table_name.toLowerCase() - tbB.table_name.toLowerCase();
};

export default TablesList;