import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Movielist from './components/MovieList';
import FavoriteList from './components/FavoriteList';
import Navbar from './components/Navbar';
import { fetchMovies, deleteMovieInTheaters, updateMovieInTheaters, addMovieInTheaters, deleteTopRatedIndia, deleteTopRatedMovies, updateTopRatedIndia, updateTopRatedMovies, addTopRatedIndia, addTopRatedMovies } from './services/movieService';
import './App.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import MovieDetail from './components/MovieDetail';
import axios from 'axios';
import MovieForm from './components/MovieForm';

const API_BASE_URL = 'http://localhost:5000';

const App = () => {
    const [comingSoon, setComingSoon] = useState([]);
    const [inTheaters, setInTheaters] = useState([]);
    const [topRatedIndia, setTopRatedIndia] = useState([]);
    const [topRatedMovies, settopRatedMovies] = useState([]);
    const [favorites, setFavorites] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const loadMovies = async () => {
            const { comingSoon, inTheaters, topRatedIndia, topRatedMovies } = await fetchMovies();
            setComingSoon(comingSoon);
            setInTheaters(inTheaters);
            setTopRatedIndia(topRatedIndia);
            settopRatedMovies(topRatedMovies);
        };
        loadMovies();

        const savedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
        setFavorites(savedFavorites);
    }, []);

    const addToFavorites = (movie) => {
        if (!favorites.some(favMovie => favMovie.id === movie.id)) {
            const updatedFavorites = [...favorites, movie];
            setFavorites(updatedFavorites);
            localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
            toast.success(`${movie.title} added to favorites successfully!`);
        } else {
            toast.error(`${movie.title} already exists in favorites!`);
        }
    };

    const handleSearch = (term) => {
        setSearchTerm(term);
    };

    const handleDeleteMovie = async (id) => {
        try {
            await axios.delete(`${API_BASE_URL}/movies-coming/${id}`);
            setComingSoon(comingSoon.filter(movie => movie.id !== id));
            setInTheaters(inTheaters.filter(movie => movie.id !== id));
            setTopRatedIndia(topRatedIndia.filter(movie => movie.id !== id));
            settopRatedMovies(topRatedMovies.filter(movie => movie.id !== id));
            toast.success('Movie deleted successfully!');
        } catch (error) {
            console.error('Error deleting movie:', error);
            toast.error('Failed to delete movie!');
        }
    };

    const handleUpdateMovie = async (updatedMovie) => {
        try {
            let response;
            if (updatedMovie.id) {
                response = await axios.put(`${API_BASE_URL}/movies-coming/${updatedMovie.id}`, updatedMovie);
            } else {
                response = await axios.post(`${API_BASE_URL}/movies-coming`, updatedMovie);
            }

            const updatedMoviesList = {
                comingSoon: comingSoon.map(movie => movie.id === updatedMovie.id ? response.data : movie),
                inTheaters: inTheaters.map(movie => movie.id === updatedMovie.id ? response.data : movie),
                topRatedIndia: topRatedIndia.map(movie => movie.id === updatedMovie.id ? response.data : movie),
                topRatedMovies: topRatedMovies.map(movie => movie.id === updatedMovie.id ? response.data : movie)
            };

            setComingSoon(updatedMoviesList.comingSoon);
            setInTheaters(updatedMoviesList.inTheaters);
            setTopRatedIndia(updatedMoviesList.topRatedIndia);
            settopRatedMovies(updatedMoviesList.topRatedMovies);
            toast.success('Movie updated successfully!');
        } catch (error) {
            console.error('Error updating movie:', error);
            toast.error('Failed to update movie!');
        }
    };

    const filteredComingSoon = comingSoon.filter(movie =>
        movie.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const filteredInTheaters = inTheaters.filter(movie =>
        movie.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    const filteredTopRatedIndia = topRatedIndia.filter(movie =>
        movie.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    const filteredTopRatedMovies = topRatedMovies.filter(movie =>
        movie.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <Router>
            <Navbar onSearch={handleSearch} />
            <Routes>
                <Route
                    path="/"
                    element={<Movielist
                        movies={filteredInTheaters}
                        onAddToFavorites={addToFavorites}
                        onDeleteMovie={(id) => {
                            deleteMovieInTheaters(id);
                            setInTheaters(inTheaters.filter((movie) => movie.id !== id));
                            toast.success('Movie deleted successfully!');
                        }}
                        onUpdateMovie={async (updatedMovie) => {
                            if (updatedMovie.id) {
                                updateMovieInTheaters(updatedMovie.id, updatedMovie);
                                setInTheaters(inTheaters.map(movie =>
                                    movie.id === updatedMovie.id ? updatedMovie : movie
                                ));
                            } else {

                                addMovieInTheaters(updatedMovie);
                                setInTheaters([...inTheaters, updatedMovie]);
                            }
                            toast.success('Movie updated successfully!');
                        }}
                    />}
                />
                <Route path="/movie/:id" element={<MovieDetail onAddToFavorites={addToFavorites} />} />
                <Route
                    path="/favorites"
                    element={<FavoriteList favorites={favorites} searchTerm={searchTerm} setFavorites={setFavorites} />}
                />
                <Route
                    path="/Top-rated-Indian"
                    element={<Movielist
                        movies={filteredTopRatedIndia}
                        onAddToFavorites={addToFavorites}
                        onDeleteMovie={(id) => {
                            deleteTopRatedIndia(id);
                            setTopRatedIndia(topRatedIndia.filter((movie) => movie.id !== id));
                            toast.success('Movie deleted successfully!');
                        }}
                        onUpdateMovie={(updatedMovie) => {
                            if (updatedMovie.id) {
                                updateTopRatedIndia(updatedMovie.id, updatedMovie);
                                setTopRatedIndia(topRatedIndia.map(movie =>
                                    movie.id === updatedMovie.id ? updatedMovie : movie
                                ));
                            } else {
                                addTopRatedIndia(updatedMovie);
                                setTopRatedIndia([...topRatedIndia, updatedMovie]);
                            }
                            toast.success('Movie updated successfully!');
                        }}
                    />}
                />
                <Route
                    path="/Coming-soon"
                    element={<Movielist
                        movies={filteredComingSoon}
                        onAddToFavorites={addToFavorites}
                        onDeleteMovie={handleDeleteMovie}
                        onUpdateMovie={handleUpdateMovie}
                    />}
                />
                <Route
                    path="/Top-rated-Movies"
                    element={<Movielist
                        movies={filteredTopRatedMovies}
                        onAddToFavorites={addToFavorites}
                        onDeleteMovie={(id) => {
                            deleteTopRatedMovies(id);
                            settopRatedMovies(topRatedMovies.filter((movie) => movie.id !== id));
                            toast.success('Movie deleted successfully!');
                        }}
                        onUpdateMovie={(updatedMovie) => {
                            if (updatedMovie.id) {
                                updateTopRatedMovies(updatedMovie.id, updatedMovie);
                                settopRatedMovies(topRatedMovies.map(movie =>
                                    movie.id === updatedMovie.id ? updatedMovie : movie
                                ));
                            } else {
                                addTopRatedMovies(updatedMovie);
                                settopRatedMovies([...topRatedMovies, updatedMovie]);
                            }
                            toast.success('Movie updated successfully!');
                        }}
                    />}
                />
                <Route path="/add-movie" element={<MovieForm onSubmit={handleUpdateMovie} />} />
            </Routes>
            <ToastContainer />
        </Router>
    );
};

export default App;
