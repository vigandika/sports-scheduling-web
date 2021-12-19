<template>
	<v-container>
		<h2 style="color: #6e8fb8">Sports Competition Scheduler</h2>
		<i class="text-subtitle-2" style="color: gray">
			Generate the schedule of a sports competition in the
			<a href="https://en.wikipedia.org/wiki/Round-robin_tournament" target="_blank">Round Robin format</a>
			that follows a customizable set of rules.
		</i>
		<br /><br />

		<v-stepper v-model="e1" color="secondary">
			<v-stepper-header>
				<v-stepper-step :complete="e1 > 1" step="1" color="secondary">Competition</v-stepper-step>

				<v-divider></v-divider>

				<v-stepper-step :complete="e1 > 2" step="2" color="secondary">Teams</v-stepper-step>

				<v-divider></v-divider>

				<v-stepper-step step="3" :complete="isOkay" color="secondary">Constraints</v-stepper-step>
			</v-stepper-header>

			<v-stepper-items>
				<v-stepper-content step="1">
					<v-form ref="firstStep" v-model="firstStepValid">
						<v-text-field color="secondary" label="Competition Name" :rules="[rules.required]" clearable> </v-text-field>

						<v-text-field
							v-model="numberOfTeams"
							color="secondary"
							label="Number of teams"
							type="number"
							:rules="[rules.number]"
						>
						</v-text-field>
						<v-btn color="secondary" @click="finishFirstStep()" :disabled="!firstStepValid"> Continue </v-btn>
					</v-form>
				</v-stepper-content>

				<v-stepper-content step="2">
					<v-form ref="secondStep" v-model="secondStepValid">
						<v-row align="center" justify="center" v-for="team in teams" :key="team.id">
							<v-col cols="10" sm="4">
								<v-text-field v-model="team.name" color="secondary" :label="`Team ${team.id}`" :rules="[rules.required]">
								</v-text-field>
							</v-col>

							<v-col cols="10" sm="2">
								<v-select
									v-model="team.category"
									color="secondary"
									required
									:items="['A', 'B', 'C']"
									label="Category"
									:rules="[rules.required]"
								>
								</v-select>
							</v-col>
						</v-row>
					</v-form>

					<v-btn icon @click="e1 = 1" color="secondary">
						<v-icon>mdi-chevron-left</v-icon>
					</v-btn>

					<v-btn icon color="secondary" @click="e1 = 3" :disabled="secondStepValid">
						<v-icon>mdi-chevron-right</v-icon>
					</v-btn>
				</v-stepper-content>

				<v-stepper-content step="3">
					<v-row justify="center">
						<v-expansion-panels inset>
							<v-expansion-panel>
								<v-expansion-panel-header>ParticipationConstraint (HARD)</v-expansion-panel-header>
								<v-expansion-panel-content>
									<v-container>
										<h4>Enforced by default</h4>
										<i style="color: gray">
											Every team should play exactly one match for every matchweek (unless the number of teams is odd,
											then one team gets a
											<a href="https://en.wikipedia.org/wiki/Bye_(sports)" target="_blank">bye</a>)
										</i>
									</v-container>
								</v-expansion-panel-content>
							</v-expansion-panel>

							<v-expansion-panel>
								<v-expansion-panel-header>EncounterConstraint (HARD)</v-expansion-panel-header>
								<v-expansion-panel-content>
									<v-container>
										<h4>Enforced by default</h4>
										<i style="color: gray"
											>Every team should play against every other team, once at Home and once Away.</i
										>
									</v-container>
								</v-expansion-panel-content>
							</v-expansion-panel>

							<v-expansion-panel>
								<v-expansion-panel-header>CompleteCycleConstraint (HARD)</v-expansion-panel-header>
								<v-expansion-panel-content>
									<v-container>
										<h4>Enforced by default</h4>
										<i style="color: gray">
											Every team should play every other team at least once before meeting a team for the second time.
										</i>
									</v-container>
								</v-expansion-panel-content>
							</v-expansion-panel>

							<v-expansion-panel>
								<v-expansion-panel-header> StaticVenueConstraint (HARD) </v-expansion-panel-header>
								<v-expansion-panel-content>
									<static-venue-constraint-panel
										ref="staticVenueConstraintPanel"
										:numberOfMatchweeks="numberOfMatchweeks"
									>
									</static-venue-constraint-panel>
								</v-expansion-panel-content>
							</v-expansion-panel>

							<v-expansion-panel>
								<v-expansion-panel-header> SharedVenueConstraint (HARD) </v-expansion-panel-header>
								<v-expansion-panel-content>
									<shared-venue-constraint-panel ref="sharedVenueConstraintPanel" :teams="teams">
									</shared-venue-constraint-panel>
								</v-expansion-panel-content>
							</v-expansion-panel>

							<v-expansion-panel>
								<v-expansion-panel-header> OpponentConstraint (SOFT) </v-expansion-panel-header>
								<v-expansion-panel-content>
									<opponent-constraint-panel ref="opponentConstraintPanel" :teams="teams" :matchweeks="matchweeks">
									</opponent-constraint-panel>
								</v-expansion-panel-content>
							</v-expansion-panel>

							<v-expansion-panel>
								<v-expansion-panel-header> VenueConstraint (SOFT) </v-expansion-panel-header>
								<v-expansion-panel-content>
									<venue-constraint-panel ref="venueConstraintPanel" :teams="teams" :matchweeks="matchweeks">
									</venue-constraint-panel>
								</v-expansion-panel-content>
							</v-expansion-panel>

							<v-expansion-panel>
								<v-expansion-panel-header> RepeaterGapConstraint (SOFT) </v-expansion-panel-header>
								<v-expansion-panel-content>
									<repeater-gap-constraint-panel ref="repeaterGapConstraintPanel" :teams="teams" :matchweeks="matchweeks">
									</repeater-gap-constraint-panel>
								</v-expansion-panel-content>
							</v-expansion-panel>
						</v-expansion-panels>
					</v-row>
				</v-stepper-content>
			</v-stepper-items>
		</v-stepper>
		<v-btn @click="constraintsComplete"> A</v-btn>
	</v-container>
</template>

<script lang="ts">
import { Component, Vue, Mixins } from "vue-property-decorator";
import StaticVenueConstraintPanel from "@/components/StaticVenueConstraintPanel.vue";
import SharedVenueConstraintPanel from "@/components/SharedVenueConstraintPanel.vue";
import OpponentConstraintPanel from "@/components/OpponentConstraintPanel.vue";
import VenueConstraintPanel from "@/components/VenueConstraintPanel.vue";
import RepeaterGapConstraintPanel from "@/components/RepeaterGapConstraintPanel.vue";
import { Team } from "@/models/Team";
import RulesMixin from "@/mixins/RulesMixin";
import { ParticipationConstraint } from "@/models/ParticipationConstraint";
import { EncounterConstraint } from "@/models/EncounterConstraint";
import { CompleteCycleConstraint } from "@/models/CompleteCycleConstraint";

@Component({
	components: {
		StaticVenueConstraintPanel,
		OpponentConstraintPanel,
		VenueConstraintPanel,
		RepeaterGapConstraintPanel,
		SharedVenueConstraintPanel,
	},
})
export default class ScheduleGenerator extends Mixins(Vue, RulesMixin) {
	private teams: Team[] = [];
	private numberOfTeams: number | null = null;
	private e1 = 1;
	private firstStepValid = true;
	private secondStepValid = true;
	private constraints: Array<Object> = [];
	private isOkay = false;

	private finishFirstStep() {
		this.e1 = 2;
		if (this.numberOfTeams !== null) {
			for (let index = 0; index < this.numberOfTeams; index++) {
				this.teams.push(new Team(index + 1));
			}
		} else {
			console.error("numberOfTeams is null before stepping to step 2");
		}
	}

	private constraintsComplete() {
		// push constraints enforced by default
		this.constraints?.push(new ParticipationConstraint(), new EncounterConstraint(), new CompleteCycleConstraint());

		// If Static Venue Constraint is given
		if (this.$refs.staticVenueConstraintPanel !== undefined) {
			this.constraints?.push((<StaticVenueConstraintPanel>this.$refs.staticVenueConstraintPanel).staticVenueConstraint);
		}

		// If shared Venue Constraint is given
		if (this.$refs.sharedVenueConstraintPanel !== undefined) {
			this.constraints?.push((<SharedVenueConstraintPanel>this.$refs.sharedVenueConstraintPanel).sharedVenueConstraint);
		}

		// If Opponent Constraint is given
		if (this.$refs.opponentConstraintPanel !== undefined) {
			// Since soft constraints can be unlimited in number, `opponentConstraints` is an array
			(<OpponentConstraintPanel>this.$refs.opponentConstraintPanel).opponentConstraints.forEach((opponentConstraint) =>
				this.constraints.push(opponentConstraint)
			);

		}

		// If Venue Constraint is given
		if (this.$refs.venueConstraintPanel !== undefined) {
			(<VenueConstraintPanel>this.$refs.venueConstraintPanel).venueConstraints.forEach((venueConstraint) => 
				this.constraints.push(venueConstraint)
			);
		}

		// If Repeater Gap Constraint is given
		if (this.$refs.repeaterGapConstraintPanel !== undefined) {
			(<RepeaterGapConstraintPanel>this.$refs.repeaterGapConstraintPanel).repeaterGapConstraints.forEach((repeaterGapConstraint) => 
				this.constraints.push(repeaterGapConstraint)
			);
		}

		console.log(JSON.stringify(this.constraints));
	}

	get matchweeks() {
		let matchweeks: Array<number> = [];
		if (this.numberOfTeams !== null) {
			for (let index = 1; index <= (this.numberOfTeams - 1) * 2; index++) {
				matchweeks.push(index);
			}
		}
		return matchweeks;
	}

	get numberOfMatchweeks() {
		return this.matchweeks.length;
	}
}
</script>


<style scoped>
.v-expansion-panel-header {
	font-weight: bold;
	color: #79a8a9;
}
</style>