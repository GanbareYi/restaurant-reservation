import { React, useState} from "react";
import ReservationList from "../dashboard/ReservationsList";
import { listReservations } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";

function SearchReservation() {
    const [mobileNumber, setMobileNumber] = useState("");
    const [reservations, setReservations] = useState([]);
    const [error, setError] = useState(null);

    const handleChange = (event) =>  {
        const { target } = event;
        const { value } = target;

        setMobileNumber(value);
    }

const handleSubmit = async (event) => {
    event.preventDefault();

    if (mobileNumber.trim()) {
        try{
            const reservations = await listReservations({"mobile_number": mobileNumber});
            setReservations(reservations);
        } catch(err) {
            console.error(err);
            setError(err);
        }
    }else{
        setReservations([]);
    }
}

    return (
        <div>
            <h1 className="col-md-12 mt-4">Search for a reservation</h1>
            <ErrorAlert error={error} />
            <form onSubmit={handleSubmit}>
                <div className="input-group mb-3 ml-3 w-50">
                    <input
                        id="mobile_number"
                        name="mobile_number"
                        type="text"
                        className="form-control"
                        placeholder="Enter a customer's phone number"
                        onChange={handleChange}
                        value={mobileNumber}
                    />
                    <div className="input-group-append">
                        <button className="btn btn-primary" type="submit">
                            Find
                        </button>
                    </div>
                </div>
            </form>
            {reservations.length !== 0 ?
                <ReservationList reservations={reservations} />
                :
                <div className="ml-3">
                    <p>No reservations found</p>  
                </div>         
            }           
        </div>
    );
}

export default SearchReservation;