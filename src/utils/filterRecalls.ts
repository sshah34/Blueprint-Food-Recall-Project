import type { Recall } from "../types/types";
//takes an array of recall objects, searchTerm takes the text the user typed, :Recall[] returns an array of recall objects
export function filterRecalls(recalls: Recall[], searchTerm: string, selectedCategory: string, selectedAllergen: string, selectedClassification: string): Recall[] {
    const normalizedSearch = searchTerm.toLowerCase().trim(); //standardizes the string the user typed into the search bar
    return recalls.filter((recall) => {
        const matchesSearch = 
            recall.product.toLowerCase().includes(normalizedSearch) ||
            recall.brand.toLowerCase().includes(normalizedSearch) ||
            recall.hazard.toLowerCase().includes(normalizedSearch) ||
            recall.reason.toLowerCase().includes(normalizedSearch);

        const matchesCategory =
            selectedCategory === "" || //if user hasn't selected a category every recall passes this condition
            recall.categories.some( //.some checks whether at least one category in recall.categories matches the selected category
                (category) => category.toLowerCase() === selectedCategory.toLowerCase()
        );
        const matchesAllergen =
        selectedAllergen === "" ||
        recall.allergens.some(
            (allergen) => allergen.toLowerCase() === selectedAllergen.toLowerCase()
        );
        const matchesClassification =
            selectedClassification === "" ||
            recall.classification.toLowerCase() === selectedClassification.toLowerCase();
        return matchesSearch && matchesCategory && matchesAllergen && matchesClassification;
    });
}
