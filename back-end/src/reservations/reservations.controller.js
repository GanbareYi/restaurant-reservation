const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

/**
 * 
 */
async function create(req, res) {
  const data = service.create(req.body);
  res.status(201).json({ data });
}

/**
 * List handler for reservation resources
 */
async function list(req, res) {
  res.json({
    data: [],
  });
}

module.exports = {
  create: asyncErrorBoundary(create),
  list,
};
