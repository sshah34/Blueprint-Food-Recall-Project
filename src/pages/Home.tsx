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
    <p>Learn about recent food recalls on products that matter to you.</p>
    <img src= 
  </header>

  <section id = "updates">
    <h2>Get Updates to Your Email</h2>
    <p>Sign up to receive food recall updates and important safety information.</p>
    <form className="updates-form" aria-describedby="form-note"
      onSubmit = {(event) => {
        event.preventDefault();
        alert("Thank you for signing up!");
      }}
      >
        <label htmlFor="name">Name</label>
        <input 
          id="name" 
          type="text" 
          placeholder="Your Name" 
          autoComplete="name" required
          />
        <label htmlFor="email">Email</label>
        <input 
          id="email" 
          type="email" 
          placeholder="you@example.com" 
          autoComplete="email" required
          />
        <button type="submit">Submit</button>
      </form>
  </section>

  <footer>Food Recall Tracker</footer>
    </>
    );
}

export default Home;
