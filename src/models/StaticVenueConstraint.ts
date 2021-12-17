export class StaticVenueConstraint {
    type: string;
    level: string;
    maximum: number;
    

    constructor(maximum: number) {
        this.type = "StaticVenueConstraint";
        this.level = "HARD";
        this.maximum = maximum;
    }
}