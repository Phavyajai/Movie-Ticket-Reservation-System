import React from "react";

function ConfirmBooking(props) {
  return (
    <div className="confirmation-container">
      <h1>Booking Confirmation</h1>
      <div className="booking-summary">
        <h2>Booking Summary</h2>
        <div className="booking-detail">
          <span>Movie Name:</span>
          <span>{props.movie.moviename}</span>
        </div>
        <div className="booking-detail">
          <span>Theater Name:</span>
          <span>{props.movie.theatrename}</span>
        </div>
        <div className="booking-detail">
          <span>Location:</span>
          <span>{props.movie.theatrelocation}</span>
        </div>
        <div className="booking-detail">
          <span>Show Timing:</span>
          <span>{props.selectedShowtime}</span>
        </div>
        <div className="booking-detail">
          <span>Number of Tickets:</span>
          <span>{props.selectedSeats.length}</span>
        </div>
        <div className="booking-detail">
          <span>Selected Seats:</span>
          <span className="selected-seats">{props.selectedSeats.join(", ")}</span>
        </div>
        <div className="booking-detail">
          <span>Total Price:</span>
          <span>${props.totalPrice}</span>
        </div>
      </div>
    </div>
  );
}

export default ConfirmBooking;
