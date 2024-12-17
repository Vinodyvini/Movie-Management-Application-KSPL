import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import MovieForm from './MovieForm';

const Movielist = ({ movies, onAddToFavorites, onDeleteMovie, onUpdateMovie }) => {
    const [movieToEdit, setMovieToEdit] = useState(null);

    const handleUpdateClick = (movie) => {
        setMovieToEdit(movie);
    };

    const handleCancel = () => {
        setMovieToEdit(null); 
    };

    const handleSubmit = (updatedMovie) => {
        if (movieToEdit) {
            onUpdateMovie(updatedMovie); 
        } else {
            onAddToFavorites(updatedMovie); 
        }
        setMovieToEdit(null); 
    };

    if (movieToEdit) {
        return <MovieForm movieToEdit={movieToEdit} onSubmit={handleSubmit} onCancel={handleCancel} />;
    }

    if (movies.length === 0) {
        return <p>No movies available.</p>;
    }

    return (
        <div className="movie-list">
            <button className="add-movie-btn" onClick={() => setMovieToEdit({})}>Add New Movie</button> {/* Add new movie button */}
            {movies.map((movie) => (
                <div key={movie.id} className="movie-card">
                    <Link to={`/movie/${movie.id}`}>
                        <img src={movie.posterurl} alt={movie.title} className="movie-poster" />
                    </Link>
                    <h3 className="movie-title">{movie.title}</h3>
                    <div className="movie-info">
                        <p><strong>Year:</strong> {movie.year}</p>
                        <p><strong>Genres:</strong> {movie.genres.join(', ')}</p>
                        <p><strong>Actors:</strong> {movie.actors.join(', ')}</p>
                    </div>
                    <button onClick={() => onAddToFavorites(movie)}>Add to Favorites</button>
                    <button onClick={() => handleUpdateClick(movie)}>Update</button>
                    <button onClick={() => onDeleteMovie(movie.id)}>Delete</button>
                </div>
            ))}
        </div>
    );
};

export default Movielist;
