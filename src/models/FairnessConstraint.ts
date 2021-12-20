export class FairnessConstraint {
    type: string;
    level: string;
    penalty?: number;
    consecutiveHardMatches?: number;
    
    constructor();
    constructor(penalty: number);
    constructor(penalty?: number, consecutiveHardMatches?: number) {
        this.type = "fairnessConstraint";
        this.level = "SOFT";
        this.penalty = penalty;
        this.consecutiveHardMatches = consecutiveHardMatches;
    }
}