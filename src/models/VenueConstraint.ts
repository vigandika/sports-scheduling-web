export class VenueConstraint {
    type: string;
    level: string;
    teamId: number;
    venue: string;
    matchweek: number;
    penalty: number;
    

    constructor(teamId: number, venue: string, matchweek: number, penalty: number) {
        this.type = "venueConstraint";
        this.level = "SOFT";
        this.teamId = teamId;
        this.venue = venue;
        this.matchweek = matchweek;
        this.penalty = penalty;
    }
}