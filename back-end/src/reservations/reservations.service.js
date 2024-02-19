const knex = require("../db/connection");

function create(reservation) {
    return knex("reservations")
        .insert(reservation, ["*"])
        .then(result => result[0]);
}

function listForDate(date) {
    return knex("reservations")
            .select("*")
            .where({reservation_date: date})
            .orderBy("reservation_time");
}

function list() {
    return knex("reservations")
            .select("*");
}

module.exports = {
    create,
    list,
    listForDate
}