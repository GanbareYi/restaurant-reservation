const knex = require("../db/connection");

function create(table){
    return knex("tables")
            .insert(table, ["*"])
            .then(result => result[0]);
}

module.exports = {
    create,
}