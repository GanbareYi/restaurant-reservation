const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const service = require("./tables.service");

/**
 * Validate if the data property is present. 
 */
function hasData(req, res, next) {
    const { data } = req.body;

    if (data) {
        return next();
    }

    next({
        status: 400,
        message: "`data` is missing."
    })
}

/**
 * Validate if a property is in the request.
 */ 
function bodyDataHas(propertyName) {
    return function (req, res, next) {
      const { data ={} } = req.body;
      if (data[propertyName]) {
        return next();
      } else {
        next({
          status: 400,
          message: `Must include a ${propertyName}.`
        })
      }
    }
}

/**
 * Validate if a table_name is at least 2 characters long.
 */ 
function isValidName(req, res, next) {
    const { table_name } = req.body.data;

    if (table_name && table_name.length >= 2) {
        return next();
    }

    next({
        status: 400,
        message: "`table_name` can't be empty and must be at least 2 characters long."
    })
}

function capacityIsNumber(req, res, next) {
    const { capacity } = req.body.data;

    if (typeof(capacity) === "number" && capacity > 0) {
        return next();
    }

    next({
        status: 400,
        message: "`capacity` is not a number."
    })
}

async function create(req, res) {
    const data = await service.create(req.body.data);

    res.status(201).json({data});
}

async function tableExists(req, res, next){
    const { table_id } = req.params;

    const table = await service.readTable(table_id);

    if (table) {
        res.locals.table = table;
        return next();
    }

    next({
        status: 404,
        message: `Table ( ${table_id } ) doesn't exist.`
    });
}

async function reservationExists(req, res, next){
    const { reservation_id } = req.body.data;

    const reservation = await service.readReservation(reservation_id);

    if (reservation) {
        res.locals.reservation = reservation;
        return next();
    }

    next({
        status: 404,
        message: `The reservation( ${reservation_id} )doesn't exist.`
    });
}

function validatePartyNumber(req, res, next) {
    const { capacity } = res.locals.table;
    const { people } = res.locals.reservation;

    if (people <= capacity) {
        return next();
    }

    next({
        status: 400,
        message: `The party number(${people}) is more than the table capacity(${capacity}).`
    });
}

function tableIsAvailable(req, res, next){
    const { table } = res.locals;

    if (table.status === "Occupied") {
        next({
            status: 400,
            message: `Table (${table.table_name}) is occupied.`
        })
    }else{
        return next();
    }

}

async function assignTable(req, res) {
    const table = res.locals.table;
    const { reservation_id } = req.body.data;

    table.status = "Occupied";
    table.reservation_id = reservation_id;

    const data = await service.updateTableToSeated(table);
    res.json({ data });
}

async function list(req, res) {
    const data = await service.list();

    res.json({ data });
}

/**
 * Validate whether a table is occupied.
 */
function isOccupied(req, res, next) {
    const { table } = res.locals;

    if (table.reservation_id) {
        return next();
    }

    next({
        status: 400,
        message: `Table ${table.table_id} is not occupied.`
    });
}

/**
 * Reset table status to `Free`.
 */
async function destroy(req, res){

    const { table } = res.locals;
    const data = await service.resetTableStatus(table.table_id, table.reservation_id);

    res.status(200).json({ data });
}

module.exports = {
    create: [
        hasData,
        bodyDataHas("table_name"),
        bodyDataHas("capacity"),
        isValidName,
        capacityIsNumber,
        asyncErrorBoundary(create),
    ],
    update: [
        hasData,
        bodyDataHas("reservation_id"),
        asyncErrorBoundary(tableExists),
        asyncErrorBoundary(reservationExists),
        validatePartyNumber,
        tableIsAvailable,
        asyncErrorBoundary(assignTable)
    ],
    delete: [
        asyncErrorBoundary(tableExists),
        isOccupied,
        asyncErrorBoundary(destroy)
    ],
    list: asyncErrorBoundary(list),
}