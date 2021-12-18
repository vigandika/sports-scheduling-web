<template>
	<v-container>
		<p>Limit the number of <b :style="{ color: '#1976d2' }">consecutive</b> games a team can play in the same venue.</p>

		<v-form ref="staticVenueConstraintForm" v-model="staticVenueConstraintFormValid">
			<v-row>
				<v-col cols="10" sm="6">
					<v-text-field
						v-model="staticVenueConstraint.maximum"
						label="Maximum number of consecutive games played at the same venue"
						type="number"
						:rules="[rules.required, staticVenueRules.minimumGap]"
					>
					</v-text-field>
				</v-col>
			</v-row>
		</v-form>
	</v-container>
</template>

<script lang="ts">
import { Component, Vue, Prop, Mixins } from "vue-property-decorator";
import RulesMixin from "@/mixins/RulesMixin";
import { StaticVenueConstraint } from "@/models/StaticVenueConstraint";

@Component({
	name: "StaticVenueConstraintPanel",
})
export default class StaticVenueConstraintPanel extends Mixins(Vue, RulesMixin) {
	@Prop({ type: Number, required: true })
	private numberOfMatchweeks: number | undefined;

	private staticVenueConstraint = new StaticVenueConstraint();
	private staticVenueConstraintFormValid: boolean = false;

	staticVenueRules = {
		minimumGap: (value) => {
			if (this.numberOfMatchweeks !== undefined) {
				return (
					(parseInt(value) && parseInt(value) > 0 && parseInt(value) < this.numberOfMatchweeks / 2) ||
					`The maximum number of games should be a valid number greater than 0 and smaller than 
            half the total number of matchweeks (${this.numberOfMatchweeks})`
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