const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const service = require("./reservations.service");

const CLOSING_DAY = 2; //Sun-0, Mon-1, Tue-2, Wed-3, Thu-4, Fri-5, Sat-6
const OPENING_TIME = '10:30';
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

/**
 * Validate if the reservation_date is a date.
 */
function isValidDate(req, res, next) {
  const { reservation_date } = req.body.data;

  const validDate = new Date(reservation_date);
  if (!isNaN(validDate) && validDate.toString() !== 'Invalid Date') {
    return next();
  }

  next({
    status: 400,
    message: "`reservation_date` is not a date."
  })
}

/**
 * Validate if the reservation_time is a time.
 */
function isValidTime(req, res, next) {
  const { reservation_time } = req.body.data;

  const timeRegex = /^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/;

  if (reservation_time && timeRegex.test(reservation_time)) {
    return next();
  }

  next({
    status: 400,
    message: "`reservation_time` is not a time."
  })
}

/**
 * Validate if people is a number.
 */
function peopleIsNumber(req, res, next) {
  const { people } = req.body.data;

  if (typeof(people) === "number") {
    return next();
  }

  next({
    status: 400,
    message: "`people` is not a number."
  })
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
      message: `Reservation must be in the future.`
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

async function reservationExists(req, res, next) {
  const { reservation_id } = req.params;

  const reservation = await service.read(reservation_id);

    if (reservation) {
        res.locals.reservation = reservation;
        return next();
    }

    next({
        status: 404,
        message: `The reservation( ${reservation_id} )doesn't exist.`
    });
}

function checkStatus(req, res, next){
  const { status } = req.body.data;

  const { reservation } = res.locals;

  if (req.method === "POST"){
    if (status === "seated" || status === "finished"){
        next({
          status: 400,
          message: `Reservation status must not be ${status}.`
        });
      }
  }

  if (req.method === "PUT"){
    if (!status || status === "unknown") {
      next({
        status: 400,
        message: "Reservation status is unknown."
      });
    }
  }

  return next();
}

function reservationFinished(req, res, next) {
  const { reservation } = res.locals;

  if (reservation.status === "finished") {
    next({
      status: 400,
      message: "A finished reservation cannot be updated."
    })
  }

  return next();
}

async function updateStatus(req, res) {
  const { status } = req.body.data;
  const { reservation } = res.locals;

  const data = await service.setReservationStatus(reservation.reservation_id,
                                                  status);

  res.status(200).json({data});
}

/**
 * List handler for reservation resources
 */
async function list(req, res) {
  const { date, mobile_number } = req.query;
  if (mobile_number) {
    const data = await service.searchBy(mobile_number);
    res.json({ data });
  }else if (date) {
    const data = await service.listForDate(date);
    res.json({ data });
  }else {
    const data = await service.list();
    res.json({ data });
  }
}

function read(req, res) {
  const { reservation } = res.locals;

  res.json({ data: reservation });
}

module.exports = {
  create: [
    bodyDataHas("first_name"),
    bodyDataHas("last_name"),
    bodyDataHas("mobile_number"),
    bodyDataHas("people"),
    bodyDataHas("reservation_date"),
    bodyDataHas("reservation_time"),
    bodyDataHas("status"),
    checkStatus,
    isValidDate,
    isValidTime,
    peopleIsNumber,
    reservationIsInFuture,
    storeIsOpen,
    isWithinBusinessHour,
    asyncErrorBoundary(create)
  ],
  update: [
    asyncErrorBoundary(reservationExists),
    checkStatus,
    reservationFinished,
    asyncErrorBoundary(updateStatus)
  ],
  list: asyncErrorBoundary(list),
  read: [asyncErrorBoundary(reservationExists), asyncErrorBoundary(read)]
};
