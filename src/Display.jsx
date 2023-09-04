import React from "react";
import { useState, useEffect } from "react";
import MovieCards from "./MovieCards";
import axios from "axios";

function Display({ onSearch }, props) {

    const [query, setQuery] = useState('');
    const [movies, setMovies] = useState([]);

    const handleInputChange = (e) => {
        setQuery(e.target.value);
    };

    const handleSearch = () => {
        onSearch(query);
    };

    useEffect(() => {
        axios.get('https://flask-server-psi.vercel.app/api/movies')
          .then(response => {
            setMovies(response.data);
          })
          .catch(error => {
            console.error('Error fetching data: ', error);
          });
      }, []);

    return (
        <div className="display">
            <div className="search-bar-container">
                <input
                    type="text"
                    placeholder="Search..."
                    value={query}
                    onChange={handleInputChange}
                    className="search-input"
                />
                <button onClick={handleSearch} className="search-button">
                    Search
                </button>
            </div>
            <MovieCards query={query} movies = {movies}/>
        </div>
    )
}

export default Display;
