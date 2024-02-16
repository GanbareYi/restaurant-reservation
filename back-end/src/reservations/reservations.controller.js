const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const service = require("./reservations.service");

const CLOSING_DAY = 2; //Sun-0, Mon-1, Tue-2, Wed-3, Thu-4, Fri-5, Sat-6
const OPENING_TIME = '09:30';
const LAST_RESERVATION_TIME = '21:30';

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

/***
 * Validate if a reservation date is a Tuesday as the restaurant is closed on Tuesdays. 
 */
function storeIsOpen(req, res, next) {
  const { reservation_date } = req.body.data;
  const dayOfWeek = new Date(reservation_date).getUTCDay();

  if (dayOfWeek !== CLOSING_DAY) {
    return next();
   } else {
    next({
      status: 400,
      message: `${reservation_date} is Tuesday. The restaurant is closed on Tuesdays.`
    })
   }
}

/**
 * Validate if a reservation time is in the past.
 */
function reservationIsInFuture(req, res, next){
  const current = new Date();

  const { reservation_date, reservation_time } = req.body.data;
  const specificDateTime = new Date(`${reservation_date}T${reservation_time}`);

  if (specificDateTime < current) {
    next({
      status: 400,
      message: `Invalid time! ${reservation_date} ${reservation_time} is in the past.`
    })
  } else {
    return next();
  }
}

/**
 * Validate if a reservation time is between 10:30am and 9:30pm.
 */
function isWithinBusinessHour(req, res, next) {
  const { reservation_time } = req.body.data;

  if (reservation_time > OPENING_TIME && reservation_time < LAST_RESERVATION_TIME) {
      return next();
  } else {
    next({
      status: 400,
      message: `Reservation not within business hours. Please choose a time between ${OPENING_TIME} and ${LAST_RESERVATION_TIME}.`
    });
  }
}

/**
 * Create handler for reservation resources
 */
async function create(req, res) {
  const data = await service.create(req.body.data);
  res.status(201).json({ data });
}

/**
 * List handler for reservation resources
 */
async function list(req, res) {
  const { date } = req.query;
  const data = await service.list(date);
  res.json({ data });
}

module.exports = {
  create: [
    bodyDataHas("first_name"),
    bodyDataHas("last_name"),
    bodyDataHas("mobile_number"),
    bodyDataHas("people"),
    bodyDataHas("reservation_date"),
    bodyDataHas("reservation_time"),
    reservationIsInFuture,
    storeIsOpen,
    isWithinBusinessHour,
    asyncErrorBoundary(create)
  ],
  list: asyncErrorBoundary(list),
};
