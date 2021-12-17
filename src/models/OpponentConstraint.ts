export class OpponentConstraint {
    type: string;
    level: string;
    teamId: number;
    opponentId: number;
    matchweek: number;
    penalty: number;
    

    constructor(teamId: number, opponentId: number, matchweek: number, penalty: number) {
        this.type = "opponentConstraint";
        this.level = "SOFT";
        this.teamId = teamId;
        this.opponentId = opponentId;
        this.matchweek = matchweek;
        this.penalty = penalty;
    }
}