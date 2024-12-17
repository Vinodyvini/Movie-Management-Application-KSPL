import React, { useState, useEffect } from 'react';
import './MovieForm.css';

const MovieForm = ({ movieToEdit, onSubmit, onCancel }) => {
    const [movie, setMovie] = useState({
        title: '',
        year: '',
        genres: '',
        actors: '',
        posterurl: ''
    });

    useEffect(() => {
        if (movieToEdit) {
            setMovie({
                title: movieToEdit.title || '',
                year: movieToEdit.year || '',
                genres: movieToEdit.genres ? movieToEdit.genres.join(', ') : '',
                actors: movieToEdit.actors ? movieToEdit.actors.join(', ') : '',
                posterurl: movieToEdit.posterurl || ''
            });
        }
    }, [movieToEdit]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setMovie((prevMovie) => ({ ...prevMovie, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const updatedMovie = {
            ...movie,
            id: movieToEdit.id,
            genres: movie.genres.split(',').map((genre) => genre.trim()),
            actors: movie.actors.split(',').map((actor) => actor.trim())
        };
        onSubmit(updatedMovie);
    };

    return (
        <form onSubmit={handleSubmit} className="movie-form">
            <h3>{movieToEdit ? 'Update Movie' : 'Add New Movie'}</h3>
            <div className="input-group">
                <div>
                    <label>Title</label>
                    <input
                        type="text"
                        name="title"
                        value={movie.title}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Year</label>
                    <input
                        type="number"
                        name="year"
                        value={movie.year}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Genres</label>
                    <input
                        type="text"
                        name="genres"
                        value={movie.genres}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Actors</label>
                    <input
                        type="text"
                        name="actors"
                        value={movie.actors}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Poster URL</label>
                    <input
                        type="text"
                        name="posterurl"
                        value={movie.posterurl}
                        onChange={handleChange}
                        required
                    />
                </div>
            </div>
            <button type="submit">Submit</button>
            <button type="button" onClick={onCancel} className="cancel-btn">Cancel</button>
        </form>
    );
};

export default MovieForm;
