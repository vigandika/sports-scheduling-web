export class SharedVenueConstraint {
    type: string;
    level: string;
    teams: number[][];
    

    constructor(teams: number[][]) {
        this.type = "SharedVenueConstraint";
        this.level = "HARD";
        this.teams = teams;
    }
}