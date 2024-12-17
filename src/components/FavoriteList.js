import React from 'react';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

const FavoriteList = ({ favorites, searchTerm, setFavorites }) => {
    const filteredFavorites = favorites.filter(movie =>
        movie.title && movie.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const removeFavorite = (id) => {
        const updatedFavorites = favorites.filter(movie => movie.id !== id);
        setFavorites(updatedFavorites);
        localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
        const removedMovie = favorites.find(movie => movie.id === id);
        toast.info(`${removedMovie.title} removed from favorites!`);
    };

    return (
        <div className="favorite-list">
            {filteredFavorites.length > 0 ? (
                filteredFavorites.map(movie => (
                    <div className="favorite-card" key={movie.id}>
                        <Link to={`/movie/${movie.id}`}>
                            <img
                                src={movie.posterurl || 'default-poster.jpg'}
                                alt={movie.title || 'No Title'}
                                className="favorite-poster"
                            />
                        </Link>
                        <h3 className="favorite-title">{movie.title || 'No Title Available'}</h3>
                        <button onClick={() => removeFavorite(movie.id)}>Remove</button>
                    </div>
                ))
            ) : (
                <p>No favorite movies found.</p>
            )}
        </div>
    );
};

export default FavoriteList;