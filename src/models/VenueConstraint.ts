export class VenueConstraint {
    type?: string;
    level?: string;
    penalty?: number;
    teamId?: number;
    venue?: string;
    matchweek?: number;

    constructor();
    constructor(penalty: number);
    constructor(penalty?: number, teamId?: number, venue?: string, matchweek?: number) {
        this.type = "venueConstraint";
        this.level = "SOFT";
        this.penalty = penalty;
        this.teamId = teamId;
        this.venue = venue;
        this.matchweek = matchweek;
    }
}