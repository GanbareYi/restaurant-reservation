const knex = require("../db/connection");

function create(reservation) {
    return knex("reservations")
        .insert(reservation, ["*"])
        .then(result => result[0]);
}

function list(date) {
    return knex("reservations")
            .select("*")
            .where({reservation_date: date});
}

module.exports = {
    create,
    list,
}