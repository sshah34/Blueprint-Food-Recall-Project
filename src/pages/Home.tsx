import { Link } from "react-router-dom";

function Home() {
  return (
    <>
  <nav aria-label="Main Navigation">
    <Link to = "/">Home</Link>
    <Link to = "/discover">Discover</Link>
    <Link to = "/watchlist">Watchlist</Link>
    <Link to = "/explore">Explore</Link>
  </nav>
      
  <header>
    <h1>Food Recall Tracker</h1>
    <p>Learn about recent food recalls based on selected food categories and allergens.</p>
    <img src= 
  </header>

  
    </>
    );
}

export default Home;
