import type { WatchlistPreferences } from "../types/types";
const STORAGE_KEY = "food-recall-watchlist"; //what we will use to identify saved preferences in the broswer
//saveWatchList() receives the uesr's preferences
//JSON.stringify converts javascript objects into string because localStorage stores string
//localStorage.setItem ssaves that string under our storage key
export function saveWatchlist(preferences: WatchlistPreferences): void {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(preferences));
    } catch (error) {
        console.error("Failed to save watchlist preferences:", error);
        throw new Error("Unable to save your watchlist. Please try again.");
    }
}

export function loadWatchlist(): WatchlistPreferences {
    try {
        const savedPreferences = localStorage.getItem(STORAGE_KEY);

        if (!savedPreferences) {
            return {
                categories: [],
                allergens: []
            };
        }

        const parsedPreferences: unknown = JSON.parse(savedPreferences);

        if (
            typeof parsedPreferences === "object" &&
            parsedPreferences !== null &&
            "categories" in parsedPreferences &&
            "allergens" in parsedPreferences &&
            Array.isArray(parsedPreferences.categories) &&
            Array.isArray(parsedPreferences.allergens) &&
            parsedPreferences.categories.every((item) => typeof item === "string") &&
            parsedPreferences.allergens.every((item) => typeof item === "string")
        ) {
            return {
                categories: parsedPreferences.categories,
                allergens: parsedPreferences.allergens
            };
        }

        throw new Error("Saved watchlist data has an invalid format.");

    } catch (error) {
        console.error("Failed to load watchlist preferences:", error);

        return {
            categories: [],
            allergens: []
        };
    }
}