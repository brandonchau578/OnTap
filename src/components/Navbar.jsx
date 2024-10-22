import React from 'react'
import './Navbar.css'
function Navbar() {
  return (
    <div className= "NavbarContainer">
        <nav className = "Navbar">
            <div className = "logo">OnTap</div>
            <ul className = "nav-links">
                <li><a href = "#">Home</a></li>
                <li><a href = "#">Breweries</a></li>
                <li><a href = "#">About</a></li>
            </ul>
        </nav>
    </div>
    
  )
}

export default Navbar
