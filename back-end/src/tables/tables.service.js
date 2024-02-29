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

async function updateTableToSeated(table) {
    
    try {
        await knex.transaction(async (trx) =>{
            await trx("tables")
                .update(table, "*")
                .where("table_id", table.table_id);

            const result = await trx("reservations")
                            .update({
                                "status": "seated"
                            })
                            .where("reservation_id", table.reservation_id);

            await trx.commit();
            return result;
        });
    }catch(error) {
        console.error("Assign table failed!", error);
    }
}

function list() {
    return knex("tables")
            .select("*")
            .orderBy("table_name");
}

async function resetTableStatus(table_id, reservation_id) {
    
    try {
        await knex.transaction(async (trx) =>{
            await trx("tables")
                .update({"status": "free",
                        "reservation_id": null
                        }, ["*"])
                .where({"table_id": table_id});

            const result = await trx("reservations")
                            .update({
                                "status": "finished"
                            })
                            .where("reservation_id", reservation_id);

            await trx.commit();
            return result;
        });
    }catch(error) {
        console.error("Updating table status or reservation status failed!", error);
    }
}

module.exports = {
    create,
    readTable,
    readReservation,
    updateTableToSeated,
    resetTableStatus,
    list,
}