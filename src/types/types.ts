export interface WatchlistPreferences {
    categories: string[]; //array of food categories
    allergens: string[];
}

//this interface is for API requests failing beause of something like bad internet, server is temp unavailable or our request got rejected
export interface ApiError{
    message: string; //error message
    status?: number; //question mark means the property is optional
    //status is optional because we won't always get a HTTP code if for example there was a network issue
}

//this interface is for defining successful APIs
export interface ApiResult<T>{ //T is a generic placeholder for a data type we didn't decide on yet
    success: boolean;
    data?: T;
    error?: ApiError;
}

// Standardized recall data structure used throughout our application
export interface Recall { //export allows other files to access the blueprint we defined
  id: string;
  product: string;
  brand: string;
  hazard: string;
  classification: string;
  recallDate: string;
  distributionStates: string[];
  description: string; //explanation of the recalled product
  reason: string;
  consumerInstructions: string; //what should consumers do if they purchased the product
  source: "FDA" | "USDA";
  sourceUrl: string;
  // Information used for searching and personalization
  categories: string[];
  allergens: string[];
}

// Describes one recall as received from Daily Food Recalls
export interface DailyFoodRecallApiItem {
  id: string;
  product?: string | null;
  brand?: string | null;

  agency: "FDA" | "USDA";
  category?: string | null;
  class?: 1 | 2 | 3 | null;

  hazard?: string | null;
  reason?: string | null;
  whatToDo?: string | null;

  allergens?: string[] | null;
  affectedStates?: string[] | null;

  officialUrl?: string | null;
  recallInitiated?: string | null;
}
//because DailyFoodRecalls site pulls data from both FDA and USDA we don't need a second API for more info

// Describes the complete response from Daily Food Recalls
export interface DailyFoodRecallsApiResponse {
  generated: string;
  source: string;
  count: number;
  attribution: string;
  recalls: DailyFoodRecallApiItem[];
}

export interface RecallInsights {
    totalRecalls: number;
    fdaRecalls: number;
    usdaRecalls: number;
    class1Recalls: number;
    class2Recalls: number;
    class3Recalls: number;
    categoryCounts: Record<string, number>;
}