import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000';

export const fetchMovies = async () => {
    try {
        const [comingSoonRes, inTheatersRes, topRatedIndiaRes, topRatedMoviesRes] = await Promise.all([
            axios.get(`${API_BASE_URL}/movies-coming`),
            axios.get(`${API_BASE_URL}/movies-in-theaters`),
            axios.get(`${API_BASE_URL}/top-rated-india`),
            axios.get(`${API_BASE_URL}/top-rated-movies`)
        ]);

        return {
            comingSoon: comingSoonRes.data,
            inTheaters: inTheatersRes.data,
            topRatedIndia: topRatedIndiaRes.data,
            topRatedMovies: topRatedMoviesRes.data
        };
    } catch (error) {
        console.error('Error fetching movies:', error);
        return { comingSoon: [], inTheaters: [], topRatedIndia: [], topRatedMovies: [] };
    }
};

export const addMovieToFavorites = async (movie) => {
    try {
        await axios.post(`${API_BASE_URL}/favorites`, movie);
    } catch (error) {
        console.error('Error adding movie to favorites:', error);
    }
};

export const deleteMovie = async (movieId) => {
    try {
        await axios.delete(`${API_BASE_URL}/movies-coming/${movieId}`);
    } catch (error) {
        console.error('Error deleting movie:', error);
    }
};


export const updateMovie = async (movieId, movieData) => {
    try {
        await axios.put(`${API_BASE_URL}/movies-coming/${movieId}`, movieData);
    } catch (error) {
        console.error('Error updating movie:', error);
    }
};

export const deleteMovieInTheaters = (movieId) => axios.delete(`${API_BASE_URL}/movies-in-theaters/${movieId}`);
export const updateMovieInTheaters = (movieId, movieData) => axios.put(`${API_BASE_URL}/movies-in-theaters/${movieId}`, movieData);
export const addMovieInTheaters = (movieData) => axios.post(`${API_BASE_URL}/movies-in-theaters`, movieData);

export const deleteTopRatedIndia = (movieId) => axios.delete(`${API_BASE_URL}/top-rated-india/${movieId}`);
export const updateTopRatedIndia = (movieId, movieData) => axios.put(`${API_BASE_URL}/top-rated-india/${movieId}`, movieData);
export const addTopRatedIndia = (movieData) => axios.post(`${API_BASE_URL}/top-rated-india`, movieData);

export const deleteTopRatedMovies = (movieId) => axios.delete(`${API_BASE_URL}/top-rated-movies/${movieId}`);
export const updateTopRatedMovies = (movieId, movieData) => axios.put(`${API_BASE_URL}/top-rated-movies/${movieId}`, movieData);
export const addTopRatedMovies = (movieData) => axios.post(`${API_BASE_URL}/top-rated-movies`, movieData);

