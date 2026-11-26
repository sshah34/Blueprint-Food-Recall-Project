// to view in different screens, for mac: cmd + option + i, then cmd + shift + m

import { useMemo } from "react";
import { useRecalls } from "../hooks/useRecalls";
import { useWatchlist } from "../hooks/useWatchlist";
import type { Recall } from "../types/types";
import "./DiscoverWatchlist.css";

interface PickerProps {
    legend: string;
    options: string[];
    selected: string[];
    onChange: (next: string[]) => void;
}

// defines info needed to display preference picker & update its selections
function PreferencePicker({ legend, options, selected, onChange }: PickerProps) {
    // creates reusable React component instead of separately writing checkbox UI
    function toggle(option: string) { // handles what happens when user clicks checkbox
        onChange( // adds option if isn't selected, or removes it if it alr is
            selected.includes(option) // option alr is selected
                ? selected.filter((item) => item !== option)
                : [...selected, option] // option isn't selected
        );
    }

    // returns HTML structure React displays on the page
    return (
        <fieldset className="dw-picker">
            <legend>{legend}</legend>
            {options.length === 0 ? ( // displays each option as checkbox chip, highlights ones alr selected
                <p className="dw-muted">No options available in the current data.</p>
            ) : (
                <div className="dw-chips">
                    {options.map((option) => (
                        <label key={option} className={selected.includes(option) ? "dw-chip dw-on" : "dw-chip"}>
                            <input
                                type="checkbox"
                                checked={selected.includes(option)}
                                onChange={() => toggle(option)}
                            />
                            {option}
                        </label>
                    ))}
                </div>
            )}
        </fieldset>
    );
}

// Simple stand-in card, swap later for shared RecallCard once other teammate builds it
// receives one recall object, displays the information about that recall
function MatchCard({ recall }: { recall: Recall }) {
    return (
        <li className="dw-match">
            <h3>{recall.product}</h3>
            <p className="dw-muted"> {/* displays recall information */}
                {recall.brand} · {recall.classification} · {recall.source} · {recall.recallDate}
            </p>
            <p>{recall.reason}</p>
            {recall.allergens.length > 0 && (
                <p className="dw-muted">Allergens: {recall.allergens.join(", ")}</p>
            )}
            {recall.sourceUrl && ( // displays allergens conditionally
                <a href={recall.sourceUrl} target="_blank" rel="noreferrer">
                    View official notice
                </a>
            )}
        </li>
    );
}

export default function Watchlist() {
    const { recalls, loading, error: loadError } = useRecalls("", "", "", "");
    const {
        preferences,
        matchedRecalls,
        updateCategories,
        updateAllergens,
        error: saveError,
    } = useWatchlist(recalls);

    // Options come from live data, plus anything already saved so it can still be unchecked.
    const categoryOptions = useMemo(
        () => [...new Set([...recalls.flatMap((r) => r.categories), ...preferences.categories])].sort(),
        [recalls, preferences.categories]
    );
    const allergenOptions = useMemo(
        () => [...new Set([...recalls.flatMap((r) => r.allergens), ...preferences.allergens])].sort(),
        [recalls, preferences.allergens]
    );

    const hasPreferences = preferences.categories.length + preferences.allergens.length > 0;

    if (loading) {
        return <p className="dw-state" role="status">Loading recalls…</p>;
    }
    if (loadError) {
        return <p className="dw-state dw-error" role="alert">{loadError} Refresh the page to try again.</p>;
    }

    return (
        <main className="dw-page">
            <header>
                <h1>Your watchlist</h1>
                <p>
                    Choose the food categories and allergens you want to track. Matching recalls appear below,
                    and your choices are saved in this browser.
                </p>
            </header>

            {saveError && <p className="dw-error" role="alert">{saveError}</p>}

            <PreferencePicker
                legend="Food categories"
                options={categoryOptions}
                selected={preferences.categories}
                onChange={updateCategories}
            />
            <PreferencePicker
                legend="Allergens"
                options={allergenOptions}
                selected={preferences.allergens}
                onChange={updateAllergens}
            />

            {hasPreferences && (
                <button
                    type="button"
                    className="dw-clear"
                    onClick={() => {
                        updateCategories([]);
                        updateAllergens([]);
                    }}
                >
                    Clear all preferences
                </button>
            )}

            <section aria-live="polite">
                <h2>
                    {hasPreferences
                        ? `${matchedRecalls.length} matching recall${matchedRecalls.length === 1 ? "" : "s"}`
                        : "Matching recalls"}
                </h2>
                {!hasPreferences ? (
                    <p className="dw-empty">
                        Your watchlist is empty. Select a category or allergen above to start tracking recalls.
                    </p>
                ) : matchedRecalls.length === 0 ? (
                    <p className="dw-empty">
                        No current recalls match your selections. Check back later or add more categories.
                    </p>
                ) : (
                    <ul className="dw-matches">
                        {matchedRecalls.map((recall) => (
                            <MatchCard key={recall.id} recall={recall} />
                        ))}
                    </ul>
                )}
            </section>

            <footer className="dw-attribution">
                Data from <a href="https://dailyfoodrecalls.com">Daily Food Recalls</a>, licensed under{" "}
                <a href="https://creativecommons.org/licenses/by/4.0/">CC BY 4.0</a>.
            </footer>
        </main>
    );
}