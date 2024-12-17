import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000';

const MovieDetail = ({ onAddToFavorites }) => {
    const { id } = useParams();
    const [movie, setMovie] = useState(null);

    useEffect(() => {
        const fetchMovieDetail = async () => {
            try {
                const endpoints = [
                    `${API_BASE_URL}/movies-coming`,
                    `${API_BASE_URL}/movies-in-theaters`,
                    `${API_BASE_URL}/top-rated-india`,
                    `${API_BASE_URL}/top-rated-movies`
                ];

                const responses = await Promise.all(endpoints.map(url => axios.get(url)));
                const movies = responses.flatMap(res => res.data);
                const movieDetail = movies.find(movie => movie.id === id);

                setMovie(movieDetail);
            } catch (error) {
                console.error('Error fetching movie details:', error);
            }
        };

        fetchMovieDetail();
    }, [id]);

    if (!movie) return <div>Loading...</div>;

    return (
        <div className="movie-detail-page">
            <img className="movie-detail-poster" src={movie.posterurl} alt={movie.title} />
            <div>
                <h1>{movie.title}</h1>
                <div className="movie-info">
                    <div><span className="label">Year:</span> {movie.year}</div>
                    <div><span className="label">Genres:</span> {movie.genres.join(', ')}</div>
                    <div><span className="label">Duration:</span> {movie.duration}</div>
                    <div><span className="label">Content Rating:</span> {movie.contentRating}</div>
                    <div><span className="label">Release Date:</span> {movie.releaseDate}</div>
                    <div><span className="label">Average Rating:</span> {movie.averageRating}</div>
                    <div><span className="label">Actors:</span> {movie.actors.join(', ')}</div>
                    <div><span className="label">Storyline:</span> {movie.storyline}</div>
                </div>
                <button onClick={() => onAddToFavorites(movie)}>Add to Favorites</button>
            </div>
        </div>
    );
};

export default MovieDetail;
