const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const service = require("./tables.service");

async function create(req, res) {
    const data = await service.create(req.body.data);

    res.status(201).json({data});
}

async function list(req, res) {
    const data = await service.list();

    res.json({ data });
}

module.exports = {
    list: asyncErrorBoundary(list),
    create: asyncErrorBoundary(create),
}