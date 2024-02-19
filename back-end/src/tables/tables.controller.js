const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const service = require("./tables.service");

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
        status: 400,
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
        status: 400,
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

    const data = await service.update(table);
    res.json({ data });
}

async function list(req, res) {
    const data = await service.list();

    res.json({ data });
}

module.exports = {
    create: asyncErrorBoundary(create),
    update: [
        asyncErrorBoundary(tableExists),
        asyncErrorBoundary(reservationExists),
        validatePartyNumber,
        tableIsAvailable,
        asyncErrorBoundary(assignTable)
    ],
    list: asyncErrorBoundary(list),
}