import type { Recall, RecallInsights } from "../types/types";
export function calculateInsights(recalls: Recall[]): RecallInsights {
    const totalRecalls = recalls.length;
    const fdaRecalls = recalls.filter(
        (recall) => recall.source === "FDA").length;
    const usdaRecalls = recalls.filter(
        (recall) => recall.source === "USDA").length;
    const class1Recalls = recalls.filter(
        (recall) => recall.classification === "Class 1").length;
    const class2Recalls = recalls.filter(
        (recall) => recall.classification === "Class 2").length;
    const class3Recalls = recalls.filter(
        (recall) => recall.classification === "Class 3").length;
    const categoryCounts: Record<string, number> = {};
    recalls.forEach((recall) => {
        recall.categories.forEach((category) => { //looping through every recall
            categoryCounts[category] = (categoryCounts[category] || 0) + 1; //increase category count
        });
    });
    return {totalRecalls, fdaRecalls, usdaRecalls, class1Recalls, class2Recalls, class3Recalls, categoryCounts};
}