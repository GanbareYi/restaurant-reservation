import React from "react";

import { Redirect, Route, Switch } from "react-router-dom";
import Dashboard from "../dashboard/Dashboard";
import Reservation from "../reservations/Reservation";
import NotFound from "./NotFound";
import { today } from "../utils/date-time";
import useQuery from "../utils/useQuery";
import NewTable from "../tables/NewTable";
import SeatReservation from "../tables/SeatReservation";
import SearchReservation from "../reservations/searchReservation";

/**
 * Defines all the routes for the application.
 *
 * You will need to make changes to this file.
 *
 * @returns {JSX.Element}
 */
function Routes() {

  const query = useQuery();
  const date = query.get("date");

  return (
    <Switch>
      <Route exact={true} path="/">
        <Redirect to={"/dashboard"} />
      </Route>
      <Route exact={true} path ="/search">
        <SearchReservation />
      </Route>
      <Route exact={true} path="/dashboard">
        <Dashboard date={date? date : today()} />
      </Route>
      <Route exact={true} path="/reservations">
        <Redirect to={'/dashboard'} />
      </Route>
      <Route exact={true} path="/tables">
        <Redirect to={'/dashboard'} />
      </Route>
      
      <Route path="/reservations/new">
        <Reservation />
      </Route>
      <Route path="/reservations/:reservation_id/seat">
        <SeatReservation />
      </Route>
      <Route path="/reservations/:reservation_id/edit">
        <Reservation />
      </Route>
      <Route path="/tables/new" >
        <NewTable />
      </Route>

      {/* Not Found Handler */}
      <Route>
        <NotFound />
      </Route>
    </Switch>
  );
}

export default Routes;
