export class SharedVenueConstraint {
    type: string;
    level: string;
    teamPairs?: number[][];
    
    constructor();
    constructor(teamPairs: number[][]);
    constructor(teamPairs?: number[][]) {
        this.type = "sharedVenueConstraint";
        this.level = "HARD";
        this.teamPairs = teamPairs;
    }
}