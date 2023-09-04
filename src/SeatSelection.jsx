import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ConfirmBooking from './ConfirmBooking';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { useNavigate } from "react-router-dom";

const numRows = 5;
const seatsPerRow = 10;

const initialSeatState = Array(numRows * seatsPerRow).fill('available');

function SeatSelection(props) {

  let navigate = useNavigate();

  const [seatState, setSeatState] = useState(initialSeatState);
  const [selectedSeats, setSelectedSeats] = useState([]); // Track selected seats
  const [bookedSeats, setBookedSeats] = useState([]); // Track booked seats
  const [totalPrice, setTotalPrice] = useState(0);

  const [selectedShowtime, setSelectedShowtime] = useState(null); // Track selected showtime
  const [error, setError] = useState(null); // Error message state

  const showtimes = ['10AM', '2PM', '6PM', '10PM']; // Hard-coded showtimes

  const toggleSeat = (index) => {
    const updatedSeatState = [...seatState];
    if (updatedSeatState[index] === 'available' && selectedSeats.length < 10) {
      updatedSeatState[index] = 'selected';
      setSelectedSeats([...selectedSeats, index + 1]); // Add the selected seat number
    } else if (updatedSeatState[index] === 'selected') {
      updatedSeatState[index] = 'available';
      setSelectedSeats(selectedSeats.filter((seat) => seat !== index + 1)); // Remove the deselected seat number
    } else {
      setError('You can only select up to 10 seats.');
    }
    setSeatState(updatedSeatState);
  };

  const handleShowtimeClick = (showtime) => {
    setSelectedShowtime(showtime);
  };

  

  const updatedSelectedSeats = selectedSeats.map(String);
  const updatedTotalPrice = updatedSelectedSeats.length * 10;

  const handleConfirmBooking = () => {
    if (selectedShowtime) {
      if (selectedSeats.length <= 10) {
        const updatedSeatState = seatState.map((seat) => (seat === 'selected' ? 'booked' : seat));
        setSeatState(updatedSeatState);
  
        // Convert seat numbers to strings
        // Assuming $10 per seat
        console.log('Total Price:', updatedTotalPrice);

        setBookedSeats(updatedSelectedSeats);
        setTotalPrice(updatedTotalPrice);
        setError(null);
      } else {
        setError('You can only select up to 10 seats.');
      }
    }
    else {
      setError('Please select a showtime before confirming the booking.');
    }
    
  };

  const routeChangetoConfirm = (movie) => {
    console.log("clicked")
    navigate(`/ConfirmBooking/${movie}`);
    ReactDOM.render(
        <Router>
            <ConfirmBooking 
              movie={props.movie} 
              selectedSeats={selectedSeats} 
              selectedShowtime={selectedShowtime}
              totalPrice={updatedTotalPrice}/>
        </Router>,
        document.getElementById('root')
    );
};
  const { movie } = props;
  const [data, setData] = useState({ message: '' });

  const handlePostRequest = () => {
    axios
      .post('http://127.0.0.1:5000/api/bookings', {
        // Your request data here
        email_id: 'mail',
        booking_movie: movie.moviename,
        theatre_location: movie.theatrelocation,
        theatre_name: movie.theatrename,
        show_time: selectedShowtime,
        seats: selectedSeats
        
      })
      .then((response) => {
        // Handle success
        console.log('Response:', response.data);
        setData({ message: 'POST request successful' });
      })
      .catch((error) => {
        // Handle error
        console.error('Error:', error);
        setData({ message: 'Error occurred' });
      });
  };

  return (
    <div className="seat-selection">
      <h1>{props.movie.moviename} - Seat Selection</h1>
      <div className="showtimes">
        <p>Showtimes:</p>
        <div className="showtime-buttons">
          {showtimes.map((showtime, index) => (
            <button
              key={index}
              className={`showtime-button ${selectedShowtime === showtime ? 'selected' : ''}`}
              onClick={() => handleShowtimeClick(showtime)}
            >
              {showtime}
            </button>
          ))}
        </div>
      </div>
        <button className='screen'>
          SCREEN
        </button>
      <div className="seat-grid">
        {seatState.map((seat, index) => (
          <div
            key={index}
            className={`seat ${seat}`}
            onClick={() => toggleSeat(index)}
          >
            {index + 1}
          </div>
        ))}
      </div>
      <div className="seat-summary">
        <p>Selected Seats: {selectedSeats.join(', ')}</p>
        <button onClick={() => {
            if (selectedShowtime) {
              handleConfirmBooking();
              routeChangetoConfirm(props.movie);
              handlePostRequest();
            }
          }}
          disabled={!selectedShowtime}>
            Confirm Booking
        </button>
        {selectedShowtime === null && (
          <p className="error">Please select a showtime to confirm the booking.</p>
        )}
        {error && <p className="error">{error}</p>}
      </div>
    </div>
  );
}

export default SeatSelection;