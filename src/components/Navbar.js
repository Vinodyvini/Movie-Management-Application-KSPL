import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = ({ onSearch }) => {
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearchChange = (event) => {
        const newSearchTerm = event.target.value;
        setSearchTerm(newSearchTerm);
        onSearch(newSearchTerm);
    };

    return (
        <nav className="navbar">
            <div className="navbar-links">
                <Link to="/">In Theaters</Link>
                <Link to="/Coming-soon">Coming soon</Link>
                <Link to="/Top-rated-Indian">Top rated Indian</Link>
                <Link to="/Top-rated-Movies">Top rated Movies</Link>
                <Link to="/favorites">Favorites</Link>
            </div>
            <div className="search-bar">
                <input
                    type="text"
                    placeholder="Search movies..."
                    value={searchTerm}
                    onChange={handleSearchChange}
                />
            </div>
        </nav>
    );
};

export default Navbar;