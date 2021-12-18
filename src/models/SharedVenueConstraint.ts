export class SharedVenueConstraint {
    type: string;
    level: string;
    teamPairs?: number[][];
    
    constructor();
    constructor(teamPairs: number[][]);
    constructor(teamPairs?: number[][]) {
        this.type = "SharedVenueConstraint";
        this.level = "HARD";
        this.teamPairs = teamPairs;
    }
}