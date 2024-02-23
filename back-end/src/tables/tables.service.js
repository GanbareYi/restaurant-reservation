const knex = require("../db/connection");

function create(table){
    return knex("tables")
            .insert(table, ["*"])
            .then(result => result[0]);
}

// function read(table_id) {
//     return knex("tables as t")
//             .join("reservations as r", "t.reservation_id", "r.reservation_id")
//             .select("t.*", "r.people")
//             .where("table_id", table_id)
//             .first();
// }

function readTable(table_id) {
    return knex("tables")
            .select("*")
            .where("table_id", table_id)
            .first();
}

function readReservation(reservation_id) {
    return knex("reservations")
            .select("*")
            .where("reservation_id", reservation_id)
            .first();

}

function update(table) {
    return knex("tables")
            .update(table, "*")
            .where("table_id", table.table_id)
            .then(result => result[0]);
}

function list() {
    return knex("tables")
            .select("*")
            .orderBy("table_name");
}

function resetTableStatus(table_id) {
    return knex("tables")
            .update({"status": "Free",
                     "reservation_id": null
                    }, ["*"])
            .where("table_id", table_id);
}

module.exports = {
    create,
    readTable,
    readReservation,
    update,
    resetTableStatus,
    list,
}