import { useState } from "react";
import { useRecalls } from "../hooks/useRecalls";

//setting and storing what the user inputs
function Explore() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedAllergen, setSelectedAllergen] = useState("");
  const [selectedClassification, setSelectedClassification] = useState("");

//passing the user input into recalls hook
  const {
    filteredRecalls,
    loading,
    error
  } = useRecalls (
    searchTerm,
    selectedCategory,
    selectedAllergen,
    selectedClassification
  );
  
  return (
    <>

    <header className = "header-1">
      <h1 className = "main-header">Explore Food Recalls</h1>
      <p className = "header-description">Search recent food recalls.</p>
    </header>

    <main>
      <section className = "search-section">
        <h2 className = "next-header">Search for a recall</h2>

        <form className = "search-bar"
          onSubmit={(event) => event.preventDefault()}
        >
          <input 
            type="text"
            placeholder="Search by product, brand, or keyword..."
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
          />
          <button className = "submit-button" type="submit">Submit</button>
        </form>
      </section>

      <section className = "filters">
        <h2 className = "filer-header">Filter Recalls</h2>

        <div className = "filter-box">
          <label htmlFor="food-category">Food Category</label>
          <select id="food-category">
            <option value="">All Categories</option>
            <option value="dairy">Dairy</option>
            <option value="seafood">Seafood</option>
            <option value="meat">Meat</option>
            <option value="produce">Produce</option>
            <option value="packaged">Packaged Foods</option>
          </select>
        </div>

        <div className="filter-box">
          <label htmlFor="allergens">Allergens</label>
          <select id="allergens">
            <option value="">All Allergens</option>
            <option value="milk">Milk</option>
            <option value="peanuts">Peanuts</option>
            <option value="soy">Soy</option>
            <option value="shellfish">Shellfish</option>
            <option value="wheat">Wheat</option>
            <option value="eggs">Eggs</option>
          </select>
        </div>

        <div className="filter-box">
          <label htmlFor="recall-classifications">Recall Classification</label>
          <select id="recall-classifications">
            <option value="">All Classifications</option>
            <option value="class-i">Class I</option>
            <option value="class-ii">Class II</option>
            <option value="class-iii">Class III</option>
          </select>
        </div>
      </section>

      <section className="recall-section">
        <h2 className="recall-header">Recent Food Recalls</h2>

        <div className="recalls">
          <article className="recall-cards">
            //add functionality
            <h3>Example Food Product</h3>
            <p><strong>Brand:</strong>Example Brand</p>
            <p><strong>Reason for recall:</strong>Insert reason here</p>
            <p><strong>Category:</strong>Category</p>
            <p><strong>Allergen:</strong>Allergen</p>
            <p><strong>Classification:</strong>Classification</p>
            <p><strong>Recall Date:</strong>month-day-year</p>
          </article>  
        </div> 
      </section>
    </main>

    <footer className="footer">Food Recall Detective</footer>
    </>
  );
}
