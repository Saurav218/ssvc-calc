export const utilityTable = [
    { automatable: 'no', valueDensity: 'diffuse', utility: 'laborious' },
    { automatable: 'no', valueDensity: 'concentrated', utility: 'efficient' },
    { automatable: 'yes', valueDensity: 'diffuse', utility: 'efficient' },
    { automatable: 'yes', valueDensity: 'concentrated', utility: 'super effective' },
];
  
export const exploitations = ["none", "PoC", "active"];
export const exposures = ["small", "controlled", "open"];
export const automatables = ["no", "yes"];
export const valueDensities = ["diffuse", "concentrated"];
export const humanImpacts = ["low", "medium", "high", "very high"];

// Calculate the priority based on the provided parameters
// FYI: https://insights.sei.cmu.edu/documents/606/2021_019_001_653461.pdf
export function getPriority(exploitation: string, exposure: string, utility: string, humanImpact: string): string {
    if (exploitation === "active") {
        if (exposure === "open") {
            if ((utility === "super effective" || utility === "efficient" || utility === "laborious") && humanImpact === "very high") {
                return "immediate";
            }
            if (utility === "efficient" && humanImpact === "high") {
                return "immediate";
            }
            return "out-of-cycle";
        }

        return "scheduled";
    }

    if (exploitation === "PoC") {
        if (exposure === "open" && utility === "super effective" && humanImpact === "very high") return "out-of-cycle";
        return "scheduled";
    }

    if (exploitation === "none") {
        if (humanImpact === "low") return "defer";
        return "scheduled";
    }

    return "scheduled";
}

// Determine the utility based on the provided parameters
export function determineUtility(automatable: string, valueDensity: string) {
    
    // Find the utility result that matches from the utilityTable based on automatable and valueDensity
    const utilityResult = utilityTable.find(
        (row) => row.automatable === automatable && row.valueDensity === valueDensity
    );
    
    // Return the utility if found
    return utilityResult ? utilityResult.utility : 'No match found';
}
