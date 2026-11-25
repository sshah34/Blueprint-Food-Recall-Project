import { useEffect, useMemo, useState } from "react";
import type { Recall, WatchlistPreferences } from "../types/types";
import { matchWatchlist } from "../utils/matchWatchlist";
import { loadWatchlist, saveWatchlist } from "../utils/storage";

export function useWatchlist(recalls: Recall[]) {
    const [preferences, setPreferences] = useState<WatchlistPreferences>(
        () => loadWatchlist()
    );

    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        try {
            saveWatchlist(preferences);
            setError(null);
        } catch (err) {
            setError(
                err instanceof Error
                    ? err.message
                    : "Unable to save watchlist preferences."
            );
        }
    }, [preferences]);

    const matchedRecalls = useMemo(() => {
        return matchWatchlist(recalls, preferences);
    }, [recalls, preferences]);

    function updateCategories(categories: string[]) {
        setPreferences((current) => ({
            ...current,
            categories
        }));
    }

    function updateAllergens(allergens: string[]) {
        setPreferences((current) => ({
            ...current,
            allergens
        }));
    }

    return {
        preferences,
        matchedRecalls,
        updateCategories,
        updateAllergens,
        error
    };
}