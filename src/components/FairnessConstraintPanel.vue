<template>
	<v-container>
		<i style="color: gray">Limit the number of consecutive tough fixtures (against A-classed oppositions) for each C-classed team.</i>

		<v-form ref="fairnessConstraintForm" v-model="fairnessConstraintFormValid">
			<v-row>
				<v-col cols="10" sm="7">
					<v-text-field class="mt-8"
						v-model.number="fairnessConstraint.consecutiveHardMatches"
						color="secondary"
						label="Maximum number of consecutive matches against A-classed teams"
						type="number"
						:rules="[rules.required, fairnessRules.maxHardMatches]"
					>
					</v-text-field>
				</v-col>
				<!-- <v-col sm="3"></v-col> -->
				<v-col cols="10" sm="2">
					<penalty-slider @update-penalty="updatePenalty($event, fairnessConstraint)" />
				</v-col>
			</v-row>
		</v-form>
	</v-container>
</template>

<script lang="ts">
import { Component, Vue, Prop, Mixins } from "vue-property-decorator";
import RulesMixin from "@/mixins/RulesMixin";
import { FairnessConstraint } from "@/models/FairnessConstraint";
import { PropType } from "vue";
import { Team } from "@/models/Team";
import PenaltySlider from "@/components/shared/PenaltySlider.vue";

@Component({
	name: "FairnessConstraintPanel",
	components: {
		PenaltySlider,
	},
})
export default class FairnessConstraintPanel extends Mixins(Vue, RulesMixin) {
	@Prop({ type: Array as PropType<Team[]>, required: true })
	private teams: Array<Team> | undefined;
	
	// Add an initial penalty of
	public fairnessConstraint = new FairnessConstraint(1);
	public fairnessConstraintFormValid: boolean = false;

	get numberOfFirstClassTeams() {
		let numberOfFirstClassTeams: number = 0;
		if (this.teams !== undefined) {
			this.teams.forEach((team) => {
				// use filter
				if (team.category === "A") {
					numberOfFirstClassTeams++;
				}
			});
			return numberOfFirstClassTeams;
		}
		console.error("teams is undefined in FairnessConstraint");
	}

	fairnessRules = {
		maxHardMatches: (value) => {
			if (this.numberOfFirstClassTeams !== undefined) {
				return (
					(parseInt(value) && parseInt(value) > 0 && parseInt(value) <= this.numberOfFirstClassTeams) ||
					`The maximum number of games should be a valid number greater than 0 and not greater than the number
                    of 'A' classed teams (${this.numberOfFirstClassTeams})`
				);
			}
		},
	};

	private updatePenalty(penalty: number, constraint: FairnessConstraint) {
		constraint.penalty = penalty;
	}
}
</script>


<style scoped>
.add-btn::before,
.add-btn::after,
.v-btn--round {
	border-radius: 0;
}
</style>