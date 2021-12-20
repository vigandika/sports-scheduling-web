export class OpponentConstraint {
    type: string;
    level: string;
    penalty?: number;
    teamId?: number;
    opponentId?: number;
    matchweek?: number;
    
    constructor();
    constructor(penalty: number);
    constructor(penalty?: number, teamId?: number, opponentId?: number, matchweek?: number) {
        this.type = "opponentConstraint";
        this.level = "SOFT";
        this.penalty = penalty;
        this.teamId = teamId;
        this.opponentId = opponentId;
        this.matchweek = matchweek;
    }
}