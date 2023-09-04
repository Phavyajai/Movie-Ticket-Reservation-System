import React, { useState, useEffect } from "react";
import axios from "axios";

function MyBookings() {

    const [myMovie, setMyMovie] = useState([]);

    useEffect(() => {
        axios.get('http://127.0.0.1:5000/api/MyBookings')
          .then(response => {
            setMyMovie(response.data);
            console.log(myMovie)
          })
          .catch(error => {
            console.error('Error fetching data: ', error);
          });
      }, []);
    
    return (
        <div className="my-bookings">
            <h1>My Bookings</h1>
            {myMovie.map((booking, index) => (
                <div>
                    <div className="booking-card">
                        <h2 className="movie-name">Movie Name: {booking.booking_movie}</h2>
                        <h1 className="ticket">Theater Name: {booking.theatre_name}</h1>
                        <h1 className="ticket">Theater Location: {booking.theatre_location}</h1>
                        <h1 className="ticket">Show Time: {booking.show_time}</h1>
                        <h1 className="ticket">Ticket: {booking.seats.join(', ')}</h1>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default MyBookings;
