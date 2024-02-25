const knex = require("../db/connection");

function create(reservation) {
    return knex("reservations")
        .insert(reservation, ["*"])
        .then(result => result[0]);
}

function read(id) {
    return knex("reservations")
            .select("*")
            .where("reservation_id", id)
            .first();
}

function listForDate(date) {
    return knex("reservations")
            .select("*")
            .where({"reservation_date": date})
            .orderBy("reservation_time");
}

function list() {
    return knex("reservations")
            .select("*");
}

function setReservationStatus(id, status) {
    return knex("reservations")
            .update({"status": status}, ["*"])
            .where("reservation_id", id)
            .then(result => result[0]);
}

module.exports = {
    create,
    read,
    list,
    listForDate,
    setReservationStatus,
}