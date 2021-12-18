import Vue from "vue";
import Component from "vue-class-component";



@Component
class RulesMixin extends Vue {
    private rules = {
        required: (value) => !!value || "Required",
        number: (value) =>
            (parseInt(value) && parseInt(value) >= 5) ||
            "The number of teams should be a valid number and greater than 4",
    };

    private penalties = [1, 2, 3, 4, 5];

    protected getSharedVenuePairsMax(numberOFTeams: number) {
        return numberOFTeams < 10 ? 2 : 4;
    }
}
export default RulesMixin;
