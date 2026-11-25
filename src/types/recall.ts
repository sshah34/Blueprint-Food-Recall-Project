//recall data structure, needed because ew are getting info from two different APIs
//the APIs probably organize info differently so we are standardizing the format to make it is
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
