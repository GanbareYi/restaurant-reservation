const knex = require("../db/connection");

function create(reservation) {
    return knex("reservations")
        .insert(reservation, ["*"])
        .then(result => result[0]);
}