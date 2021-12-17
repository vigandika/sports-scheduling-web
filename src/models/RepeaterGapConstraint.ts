export class RepeaterGapConstraint {
    type: string;
    level: string;
    team1Id: number;
    team2Id: number;
    minimumGap: number;
    penalty: number;
    

    constructor(team1Id: number, team2Id: number, minimumGap: number, penalty: number) {
        this.type = "repeaterGapConstraint";
        this.level = "SOFT";
        this.team1Id = team1Id;
        this.team2Id = team2Id;
        this.minimumGap = minimumGap;
        this.penalty = penalty;
    }
}