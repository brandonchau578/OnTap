import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Navbar from './components/Navbar'

function App() {
  const [breweries, setBreweries] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredBreweries, setFilteredBreweries] = useState([]);

  useEffect(() =>{
    const fetchBreweries = async () =>{
      const response = await fetch("https://api.openbrewerydb.org/v1/breweries")
      const data = await response.json();
      setBreweries(data)
      setFilteredBreweries(data)
    };

    fetchBreweries().catch(console.error)

  },[]);
  useEffect(() => {
    if (searchTerm) {
      setFilteredBreweries(breweries.filter(brewery => 
        brewery.name.toLowerCase().includes(searchTerm.toLowerCase())
      ));
    } else {
      setFilteredBreweries(breweries);
    }
  }, [searchTerm, breweries]);

  const totalBreweries = filteredBreweries.length;

  return (
    <div className = "App">
      <Navbar />
      <h1>Find your closest Brewery!</h1>
      <input
        type = "text"
        value = {searchTerm}
        onChange = {(e) => setSearchTerm(e.target.value)}
        placeholder='Search Breweries'
      />
      <h2> Total Breweries: {totalBreweries}</h2>
      <ul>
        {filteredBreweries.map(brewery => (
          <li key={brewery.id}>{brewery.name} - {brewery.city}</li>
        ))}
      </ul>
    </div>
  )
}

export default App
