// import * as React from 'react';
// import Card from '@mui/material/Card';
// import CardActions from '@mui/material/CardActions';
// import CardContent from '@mui/material/CardContent';
// import CardMedia from '@mui/material/CardMedia';
// import Button from '@mui/material/Button';
// import Typography from '@mui/material/Typography';
// import { useNavigate } from "react-router-dom";
// import SeatSelection from './SeatSelection';
// import ReactDOM from 'react-dom';
// import { BrowserRouter as Router } from 'react-router-dom';

// function MovieCards(props) {

//     let navigate = useNavigate();

//     const routeChange = (movie) => {
//         console.log("clicked")
//         navigate(`/SeatSelection/${movie}`);
//         ReactDOM.render(
//             <Router>
//                 <SeatSelection movie={movie}/>
//             </Router>,
//             document.getElementById('root')
//         );
//     };

//     const filteredMovies = props.movies.filter((movie) =>
//         movie.moviename.toLowerCase().includes(props.query.toLowerCase())
//     );

//     return (
//         <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px' }}>
//             {filteredMovies.map((movie) => (
//                 <Card sx={{ maxWidth: 345 }} style={{ height: 'fit-content', marginTop: '23px' }} key={movie._id}>
//                     <CardMedia
//                         sx={{ height: 140 }}
//                         title={movie._id}
//                     />
//                     <CardContent>
//                         <Typography gutterBottom variant="h5" component="div">
//                             {movie.moviename}
//                         </Typography>
//                         <div style={{ paddingTop: '10px' }}>
//                             <Typography variant="body2" color="text.secondary">
//                                 Theater - {movie.theatrename}
//                             </Typography>
//                             <Typography variant="body2" color="text.secondary">
//                                 Location - {movie.theatrelocation}
//                             </Typography>
//                             <Typography variant="body2" color="text.secondary">
//                                 Release Date - {movie.releasedate}
//                             </Typography>
//                         </div>
//                     </CardContent>
//                     <CardActions>
//                         <Button size="small" onClick={() => routeChange(movie)}>BOOK</Button>
//                     </CardActions>
//                 </Card>
//             ))}
//         </div>
//     );
// }

// export default MovieCards;

import React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';
import SeatSelection from './SeatSelection';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';

function MovieCards(props) {
  let navigate = useNavigate();

  const routeChange = (movie) => {
    console.log('clicked');
    navigate(`/SeatSelection/${movie}`);
    ReactDOM.render(
      <Router>
        <SeatSelection movie={movie}/>
      </Router>,
      document.getElementById('root')
    );
  };

  const filteredMovies = props.movies.filter((movie) =>
    movie.moviename.toLowerCase().includes(props.query.toLowerCase())
  );

  return (
    <div className="card-container" > {/* Apply the "card-container" class here */}
      {filteredMovies.map((movie) => (
        <Card
          className="card"  
          sx={{ maxWidth: 345 }}
          style={{ height: 'fit-content', marginTop: '23px' }}
          key={movie._id}
        >
          <CardMedia
            sx={{ height: 140 }}
            title={movie._id}
            className="card-image"  
          />
          <CardContent className="card-content"> {/* Apply the "card-content" class here */}
            <Typography gutterBottom variant="h5" component="div" className="card-title"> {/* Apply the "card-title" class here */}
              {movie.moviename}
            </Typography>
            <div style={{ paddingTop: '10px' }}>
              <Typography variant="body2" color="text.secondary" className="card-details"> {/* Apply the "card-details" class here */}
                Theater - {movie.theatrename}
              </Typography>
              <Typography variant="body2" color="text.secondary" className="card-details"> {/* Apply the "card-details" class here */}
                Location - {movie.theatrelocation}
              </Typography>
              <Typography variant="body2" color="text.secondary" className="card-details"> {/* Apply the "card-details" class here */}
                Release Date - {movie.releasedate}
              </Typography>
            </div>
          </CardContent>
          <CardActions className="card-actions"> {/* Apply the "card-actions" class here */}
            <Button size="small" onClick={() => routeChange(movie)} className="card-button"> {/* Apply the "card-button" class here */}
              BOOK
            </Button>
          </CardActions>
        </Card>
      ))}
    </div>
  );
}

export default MovieCards;

