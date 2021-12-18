<template>
	<v-container>
    <i style="color: gray;">Set the minimum number of rounds to be played before two teams meet for the second time.</i>

		<v-form ref="repeaterGapConstraintForm" v-model="repeaterGapConstraintFormValid">
			<v-row align="center" justify="center" v-for="(repeaterGapConstraint, index) in repeaterGapConstraints" :key="index">
				<v-col cols="10" sm="4">
					<v-select
						required
						v-model="repeaterGapConstraint.team1Id"
						color="secondary"
						:items="teams"
						item-text="name"
						item-value="id"
						label="Team"
						:rules="[rules.required]"
					>
					</v-select>
				</v-col>

				<v-col cols="10" sm="4">
					<v-select
						required
						v-model="repeaterGapConstraint.team2Id"
						color="secondary"
						:items="teams"
						item-text="name"
						item-value="id"
						label="Team"
						:rules="[rules.required]"
					>
					</v-select>
				</v-col>

				<v-col cols="10" sm="2">
					<v-text-field
						v-model="repeaterGapConstraint.minimumGap"
						color="secondary"
						label="Minimum Gap"
						type="number"
						:rules="[rules.required, repeaterGapRules.minimumGap]"
					>
					</v-text-field>
				</v-col>

				<v-col cols="10" sm="2">
					<penalty-slider @update-penalty="updatePenalty($event, repeaterGapConstraint)" />
				</v-col>
			</v-row>
		</v-form>
		<v-btn icon block class="add-btn" color="secondary" @click="addRepeaterGapConstraint">
			<v-icon>mdi-plus-circle-outline</v-icon>
		</v-btn>
	</v-container>
</template>

<script lang="ts">
import { PropType } from "vue";
import { Component, Vue, Prop, Mixins } from "vue-property-decorator";
import { Team } from "@/models/Team";
import RulesMixin from "@/mixins/RulesMixin";
import PenaltySlider from "@/components/shared/PenaltySlider.vue";
import { RepeaterGapConstraint } from "@/models/RepeaterGapConstraint";

@Component({
	name: "RepeaterGapConstraintPanel",
	components: {
		PenaltySlider,
	},
})
export default class RepeaterGapConstraintPanel extends Mixins(Vue, RulesMixin) {
	@Prop({ type: Array as PropType<Team[]>, required: true })
	private teams: Team[] | undefined;

	@Prop({ type: Array as PropType<Number[]>, required: true })
	private matchweeks: number[] | undefined;

	public repeaterGapConstraints: Array<RepeaterGapConstraint> = [];
	private repeaterGapConstraintFormValid: boolean = false;

	private addRepeaterGapConstraint(): void {
		this.repeaterGapConstraints.push(new RepeaterGapConstraint());
	}

	private updatePenalty(penalty: number, constraint: RepeaterGapConstraint) {
		constraint.penalty = penalty;
	}

	repeaterGapRules = {
		minimumGap: (value) => {
			if (this.matchweeks !== undefined) {
				return (
					(parseInt(value) && parseInt(value) < this.matchweeks.length) ||
					`The number of teams should be a valid number and smaller than the total number of matchweeks (${this.matchweeks.length})`
				);
			}
		},
	};
}
</script>


<style scoped>
.add-btn::before,
.add-btn::after,
.v-btn--round {
	border-radius: 0;
}
</style>