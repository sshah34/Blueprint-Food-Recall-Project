# Food Recall Detective

## Project Overview
Food Recall Detective is a React + TypeScript application that helps users explore food recalls, understand recall trends, and track recalls based on selected food categories and allergens.

## Current Data Layer (Backend)

The data layer is implemented in TypeScript and connects to the Daily Food Recalls API.

**Currently implemented:**
- Fetches current FDA and USDA food recalls (253 records in the latest test).
- Converts API responses into a standardized `Recall` structure.
- Handles missing API values with fallback values.
- Searches and filters recalls by product, brand, hazard, reason, category, allergen, and classification.
- Calculates insights, including total recalls, agency counts, classification counts, and category counts.
- Matches recalls against users' watchlist preferences.
- Saves and loads watchlist preferences using browser local storage.
- Provides reusable React hooks for frontend components.

**Data source:** https://dailyfoodrecalls.com/api/recalls.json

**Attribution:** Daily Food Recalls, licensed under CC BY 4.0. Include appropriate attribution in the application.

## Files the Frontend Team Needs to Use

| File | Purpose |
|---|---|
| `src/types/types.ts` | Shared TypeScript interfaces |
| `src/hooks/useRecalls.ts` | Fetches recalls, filters results, and calculates insights |
| `src/hooks/useWatchlist.ts` | Manages watchlist preferences and matching recalls |
| `src/utils/filterRecalls.ts` | Search and filtering logic |
| `src/utils/calculateInsights.ts` | Calculates dashboard statistics |
| `src/utils/matchWatchlist.ts` | Matches recalls to user preferences |
| `src/utils/storage.ts` | Saves and loads watchlist preferences |

The frontend should use the hooks rather than calling the external API or implementing duplicate filtering and watchlist logic.

## How to Use the Data Layer

### 1. Fetch and Filter Recalls

Import the hook:

```tsx
import { useRecalls } from "../hooks/useRecalls";
```

Use it inside a React component:

```tsx
const {
    recalls,
    filteredRecalls,
    insights,
    loading,
    error
} = useRecalls(searchTerm, selectedCategory, selectedAllergen, selectedClassification);
```

- `recalls`: All fetched recalls.
- `filteredRecalls`: Recalls matching the selected filters.
- `insights`: Calculated statistics.
- `loading`: Whether recalls are loading.
- `error`: Any loading error.

Pass empty strings (`""`) for filters that are not selected.

### 2. Use the Watchlist

Import the hook:

```tsx
import { useWatchlist } from "../hooks/useWatchlist";
```

Use it inside a React component:

```tsx
const {
    preferences,
    matchedRecalls,
    updateCategories,
    updateAllergens,
    error
} = useWatchlist(recalls);
```

- `preferences`: Currently saved categories and allergens.
- `matchedRecalls`: Recalls matching at least one selected preference.
- `updateCategories()`: Updates selected categories.
- `updateAllergens()`: Updates selected allergens.
- `error`: Any saving error.

Example:

```tsx
updateCategories(["Meat & Poultry"]);
updateAllergens(["Milk"]);
```

The hook automatically saves preference changes to local storage.

### 3. Shared Types

Import the `Recall` interface when defining component props:

```tsx
import type { Recall } from "../types/types";

interface RecallCardProps {
    recall: Recall;
}
```

This ensures components use the same recall structure throughout the application.

## Frontend Work Division

### Teammate 1: Home + Explore Pages
- Build the Home page and project introduction.
- Build the Explore page.
- Create reusable recall cards and recall detail components.
- Implement search and filter controls.
- Connect the pages to `useRecalls()`.
- Display loading and error states.

### Teammate 2: Discover + Watchlist Pages
- Build the Discover page.
- Create charts and visualizations using the insights returned by `useRecalls()`.
- Build the Watchlist page.
- Create category and allergen preference controls.
- Connect the page to `useWatchlist()`.
- Display matching recalls and handle empty watchlists.

### Both Teammates
- Coordinate shared navigation and styling.
- Make the application responsive.
- Test frontend components with actual API data.
- Ensure all pages use the shared `Recall` interface.
- Commit and push changes to GitHub regularly.

## Running the Project

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Build the project:

```bash
npm run build
```

**Important:** The data layer and its core functions have been implemented and tested. Browser integration and final frontend testing still need to be completed.