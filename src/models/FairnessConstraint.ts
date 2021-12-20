export class FairnessConstraint {
    type: string;
    level: string;
    consecutiveHardMatches?: number;
    penalty?: number;
    
    constructor();
    constructor(consecutiveHardMatches?: number) {
        this.type = "fairnessConstraint";
        this.level = "SOFT";
        this.consecutiveHardMatches = consecutiveHardMatches;
        this.penalty = this.penalty;
    }
}