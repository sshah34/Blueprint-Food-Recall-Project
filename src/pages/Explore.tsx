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

  if (loading) {
    return <p className="loading">Loading food recalls...</p>;
  }

  if (error) {
    return <p className="error">Error: {error}</p>
  }
  
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
          <select id="food-category"
            value={selectedCategory}
            onChange={(event) => setSelectedCategory(event.target.value)}
            >
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
          <select id="allergens"
            value={selectedAllergen}
            onChange={(event) => setSelectedAllergen(event.target.value)}
            >
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
          <select id="recall-classifications"
            value={selectedClassification}
            onChange={(event) => setSelectedClassification(event.target.value)}
            >
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
            {filteredRecalls.length === 0 ?
              (<p className="nothing-found">No matching food recalls found.</p>)
              : (filteredRecalls.map((recall) => 
                <article className="recall-cards" key={recall.id}>
                  <h3>{recall.product}</h3>
                  <p><strong>Brand:</strong> {recall.brand}</p>
                  <p><strong>Reason for recall:</strong> {recall.reason}</p>
                  <p><strong>Hazard:</strong> {recall.hazard}</p>
                  <p><strong>Category:</strong> {recall.categories.join(", ")}</p>
                  <p><strong>Allergen:</strong> {recall.allergens.join(", ")}</p>
                  <p><strong>Classification:</strong> {recall.classification}</p>
                  <p><strong>Recall Date:</strong> {recall.recallDate}</p>
                  <a href={recall.sourceUrl} target="_blank" rel="noreferrer">View Official Recall</a>
                </article>  
                ))}
        </div> 
      </section>
    </main>

    <footer className="footer">Food Recall Detective</footer>
    </>
  );
}
