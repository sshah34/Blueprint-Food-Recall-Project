import type {
  DailyFoodRecallsApiResponse,
  Recall
} from "../types/types";
// Sends requests to Daily Food Recalls and converts the data
// into the format our application uses.
const API_URL = "https://dailyfoodrecalls.com/api/recalls.json";
//async means this function will perform an op that may take time
export async function fetchDailyFoodRecalls(): Promise<Recall[]>{ //promise means data is returned asynch after the api request finishes
    try {
        const response = await fetch(API_URL); //await tells javascript to wait until request finishes before moving onto next line
    //response doesn't contain actual recall data, it contains info about the HTTP response
    if(!response.ok){
        throw new Error('HTTP error: ${response.status}');
    }
    const data: DailyFoodRecallsApiResponse = await response.json(); //response.json converts the response body into a Javascript object we can work with
    const recalls: Recall[] = data.recalls
  .filter((item) => item.id && (item.agency === "FDA" || item.agency === "USDA"))
  .map((item) => ({ //uses map to convert json response into our recall data structure
    //what filter does is it checks each recall, if it has an ID and valid agency it keeps it, otherwise it skips the recall
    id: item.id,
    product: item.product || "Unknown product",
    brand: item.brand || "Unknown brand",
    hazard: item.hazard || "No hazard information provided",
    classification: item.class
        ? `Class ${item.class}`
        : "Unknown",
    recallDate: item.recallInitiated || "Unknown",
    distributionStates: item.affectedStates ?? [],
    description: item.reason || "No description provided",
    reason: item.reason || "No reason provided",
    consumerInstructions: item.whatToDo || "No instructions provided",
    source: item.agency,
    sourceUrl: item.officialUrl || "",
    categories: item.category ? [item.category] : [],
    allergens: item.allergens ?? [],
    })); //all the |, ?, [], "" statements are to handle null or missing values
    return recalls; 
    } catch (error){
        console.error("Failed to fetch food recalls:", error);
        throw new Error("Unable to load food recalls. Please try again later.");
    }

}