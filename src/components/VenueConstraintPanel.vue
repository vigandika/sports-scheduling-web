<template>
	<v-container>
    <i style="color: gray;">Forbid a team to play at a venue (H/A) in a specific matchweek.</i>

		<v-form ref="venueConstraintForm" v-model="venueConstraintFormValid">
			<v-row align="center" justify="center" v-for="(venueConstraint, index) in venueConstraints" :key="index">
				<v-col cols="10" sm="4">
					<v-select
						required
						v-model="venueConstraint.teamId"
						color="secondary"
						:items="teams"
						item-text="name"
						item-value="id"
						label="Team"
						:rules="[rules.required]"
					>
					</v-select>
				</v-col>
				<v-col cols="10" sm="3">
					<v-radio-group row align="center" justify="center" :style="{ padding: '0 0 0 50px' }" v-model="venueConstraint.venue">
						<v-radio color="secondary" label="Home" value="H"></v-radio>
						<v-radio color="secondary" label="Away" value="A"></v-radio>
					</v-radio-group>
				</v-col>

				<v-col cols="10" sm="">
					<v-select
						required
						color="secondary"
						v-model="venueConstraint.matchweek"
						:items="[1, 2, 3, 4, 5]"
						label="Matchweek"
						:rules="[rules.required]"
					>
					</v-select>
				</v-col>

				<v-col cols="10" sm="2">
					<penalty-slider @update-penalty="updatePenalty($event, venueConstraint)" />
				</v-col>
			</v-row>
		</v-form>
		<v-btn icon block class="add-btn" color="secondary" @click="addVenueConstraint">
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
import { VenueConstraint } from "@/models/VenueConstraint";

@Component({
	name: "VenueConstraintPanel",
	components: {
		PenaltySlider,
	},
})
export default class VenueConstraintPanel extends Mixins(Vue, RulesMixin) {
	@Prop({ type: Array as PropType<Team[]>, required: true })
	private teams: Team[] | undefined;

	@Prop({ type: Array as PropType<Number[]>, required: true })
	private matchweeks: number[] | undefined;

	public venueConstraints: Array<VenueConstraint> = [];
	public venueConstraintFormValid: boolean = false;

	private addVenueConstraint(): void {
		// Add constraint with an initial penalty value of 1
		this.venueConstraints.push(new VenueConstraint(1));
	}

	private updatePenalty(penalty: number, constraint: VenueConstraint) {
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