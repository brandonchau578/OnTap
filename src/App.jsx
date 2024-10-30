import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Navbar from './components/Navbar';
import BreweryDetail from './components/BreweryDetail';
import BreweryChart from './components/BreweryChart';
import './App.css';

function App() {
  const [breweries, setBreweries] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredBreweries, setFilteredBreweries] = useState([]);

  // Fetch breweries data from API
  useEffect(() => {
    const fetchBreweries = async () => {
      const response = await fetch('https://api.openbrewerydb.org/v1/breweries');
      const data = await response.json();
      setBreweries(data);
      setFilteredBreweries(data);
    };

    fetchBreweries().catch(console.error);
  }, []);

  // Filter breweries based on search term
  useEffect(() => {
    if (searchTerm) {
      setFilteredBreweries(
        breweries.filter((brewery) =>
          brewery.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    } else {
      setFilteredBreweries(breweries);
    }
  }, [searchTerm, breweries]);

  const totalBreweries = filteredBreweries.length;

  return (
    <Router>
      <div className="App">
        <Navbar />
        <h1>Find Your Closest Brewery!</h1>

        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search Breweries"
        />

        <h2>Total Breweries: {totalBreweries}</h2>
        <BreweryChart breweries={filteredBreweries} />

        {/* List of filtered breweries with links to detail pages */}
        <ul className="brewery-list">
          {filteredBreweries.map((brewery) => (
            <li key={brewery.id}>
              <Link to={`/brewery/${brewery.id}`} className="brewery-link">
                {brewery.name} - {brewery.city}
              </Link>
            </li>
          ))}
        </ul>

        <Routes>
          <Route
            path="/brewery/:id"
            element={<BreweryDetail breweries={breweries} />}
          />
          <Route path="*" element={<p>Page not found!</p>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;