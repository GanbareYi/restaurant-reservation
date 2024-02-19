const knex = require("../db/connection");

function create(table){
    return knex("tables")
            .insert(table, ["*"])
            .then(result => result[0]);
}

function list() {
    return knex("tables")
            .select("*")
            .orderBy("table_name");
}

module.exports = {
    create,
    list,
}