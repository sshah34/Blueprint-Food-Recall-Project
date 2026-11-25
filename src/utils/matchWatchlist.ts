//compares a user's saved preferences against our recall data and returns a match
import type { Recall, WatchlistPreferences } from "../types/types";
export function matchWatchlist(recalls: Recall[], preferences: WatchlistPreferences): Recall[] {
    return recalls.filter((recall) => {
    const matchesCategory = preferences.categories.some(
        (category) =>
            recall.categories.some((recallCategory) =>
                recallCategory.toLowerCase() === category.toLowerCase())
    );

    const matchesAllergen = preferences.allergens.some(
        (allergen) =>
            recall.allergens.some((recallAllergen) =>
                recallAllergen.toLowerCase() === allergen.toLowerCase())
    );

    return matchesCategory || matchesAllergen;
    });
}