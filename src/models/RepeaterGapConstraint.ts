export class RepeaterGapConstraint {
    type?: string;
    level?: string;
    penalty?: number;
    team1Id?: number;
    team2Id?: number;
    minimumGap?: number;

    constructor(penalty: number);
    constructor(penalty?: number, team1Id?: number, team2Id?: number, minimumGap?: number) {
        this.type = "repeaterGapConstraint";
        this.level = "SOFT";
        this.penalty = penalty;
        this.team1Id = team1Id;
        this.team2Id = team2Id;
        this.minimumGap = minimumGap;
    }
}