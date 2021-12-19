export class FairnessConstraint {
    type: string;
    level: string;
    consecutiveHardMatches?: number;
    
    constructor();
    constructor(consecutiveHardMatches?: number) {
        this.type = "fairnessConstraint";
        this.level = "SOFT";
        this.consecutiveHardMatches = consecutiveHardMatches;
    }
}