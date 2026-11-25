//fetches food recalls from the API and stores it in React state
//Tracks whether the data is loading and stores any errors that occured
//Provides filtered recalls and insights to frontend files
import { useEffect, useMemo, useState } from "react";
import { fetchDailyFoodRecalls } from "../api/dailyFoodRecalls";
import { filterRecalls } from "../utils/filterRecalls";
import { calculateInsights } from "../utils/calculateInsights";
import type { Recall } from "../types/types";

export function useRecalls(
    searchTerm = "",
    selectedCategory = "",
    selectedAllergen = "",
    selectedClassification = ""
) {
    // Stores all recalls fetched from the API
    const [recalls, setRecalls] = useState<Recall[]>([]);
    // Tracks whether the API is still loading
    const [loading, setLoading] = useState<boolean>(true);
    // Stores an error message if fetching fails
    const [error, setError] = useState<string | null>(null);
    // Fetches recall data when the component first loads
    useEffect(() => {
        async function loadRecalls() {
            try {
                setLoading(true);
                setError(null);

                const data = await fetchDailyFoodRecalls();
                setRecalls(data);
            } catch (err) {
                setError(
                    err instanceof Error
                        ? err.message
                        : "Something went wrong while loading recalls."
                );
            } finally {
                setLoading(false);
            }
        }

        loadRecalls();
    }, []);

    // Recalculates filtered recalls when the data or filters change
    const filteredRecalls = useMemo(() => {
        return filterRecalls(
            recalls,
            searchTerm,
            selectedCategory,
            selectedAllergen,
            selectedClassification
        );
    }, [
        recalls,
        searchTerm,
        selectedCategory,
        selectedAllergen,
        selectedClassification
    ]);
    // Calculates statistics using the complete recall list
    const insights = useMemo(() => {
        return calculateInsights(recalls);
    }, [recalls]);

    return {
        recalls,
        filteredRecalls,
        insights,
        loading,
        error
    };
}