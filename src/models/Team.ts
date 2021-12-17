export class Team {
    id?: number;
    name?: string;
    category?: string;
    

    constructor();
    
    constructor(id: number);

    constructor(id?: number, name?: string, category?: string) {
        this.id = id;
        this.name = name;
        this.category = category;
    }

}