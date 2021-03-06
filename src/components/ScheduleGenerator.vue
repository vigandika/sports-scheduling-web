<template>
	<v-container>
		<h2 style="color: #6e8fb8">Sports Competition Scheduler</h2>
		<i class="text-subtitle-2" style="color: gray">
			Generate the schedule of a sports competition in the
			<a href="https://en.wikipedia.org/wiki/Round-robin_tournament" target="_blank">Round Robin format</a>
			that follows a customizable set of rules.
		</i>
		<br /><br />

		<fixture-list v-if="scheduleGenerated" :fixtureList="fixtureList"> </fixture-list>

		<v-stepper v-else v-model="step" color="secondary">
			<v-stepper-header>
				<v-stepper-step :complete="step > 1" step="1" color="secondary">Competition</v-stepper-step>

				<v-divider></v-divider>

				<v-stepper-step :complete="step > 2" step="2" color="secondary">Teams</v-stepper-step>

				<v-divider></v-divider>

				<v-stepper-step step="3" :complete="false" color="secondary">Constraints</v-stepper-step>
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

					<v-btn icon @click="goToFirstStep()" color="secondary">
						<v-icon>mdi-chevron-left</v-icon>
					</v-btn>

					<v-btn icon color="secondary" @click="step = 3" :disabled="!secondStepValid">
						<v-icon>mdi-chevron-right</v-icon>
					</v-btn>
				</v-stepper-content>

				<v-stepper-content step="3">
					<v-row justify="center">
						<v-expansion-panels inset v-model="panels">
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

							<v-expansion-panel>
								<v-expansion-panel-header> FairnessConstraint (SOFT) </v-expansion-panel-header>
								<v-expansion-panel-content>
									<fairness-constraint-panel ref="fairnessConstraintPanel" :teams="teams"> </fairness-constraint-panel>
								</v-expansion-panel-content>
							</v-expansion-panel>
						</v-expansion-panels>
					</v-row>
					<v-row>
						<v-col class="text-right">
							<v-btn
								:loading="loading"
								:disabled="!constraintsValid()"
								color="secondary"
								class="ma-2 white--text"
								@click="generateSchedule()"
							>
								Generate Schedule
								<v-icon right dark> mdi-magic-staff </v-icon>
							</v-btn>
							<br />
							<i v-if="!constraintsValid()" class="text-subtitle-2" style="color: gray; font-weight: 400">
								Make sure to successfully fill all constraint panels and close them&nbsp;&nbsp;
							</i>
						</v-col>
					</v-row>
				</v-stepper-content>
			</v-stepper-items>
		</v-stepper>
		<v-overlay :value="overlay">
			<v-progress-circular indeterminate size="64"></v-progress-circular>
		</v-overlay>
	</v-container>
</template>

<script lang="ts">
import { Component, Vue, Mixins } from "vue-property-decorator";
import StaticVenueConstraintPanel from "@/components/StaticVenueConstraintPanel.vue";
import SharedVenueConstraintPanel from "@/components/SharedVenueConstraintPanel.vue";
import OpponentConstraintPanel from "@/components/OpponentConstraintPanel.vue";
import VenueConstraintPanel from "@/components/VenueConstraintPanel.vue";
import RepeaterGapConstraintPanel from "@/components/RepeaterGapConstraintPanel.vue";
import FairnessConstraintPanel from "@/components/FairnessConstraintPanel.vue";
import FixtureList from "@/components/FixtureList.vue";
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
		FairnessConstraintPanel,
		FixtureList,
	},
})
export default class ScheduleGenerator extends Mixins(Vue, RulesMixin) {
	private teams: Team[] = [];
	private numberOfTeams: number | null = null;
	private step = 1;
	private firstStepValid = true;
	private secondStepValid = true;
	private generatorFormValid = false;
	private constraints: Array<Object> = [];
	private loading = false;
	private scheduleGenerated: boolean = false;
	private fixtureList: Object | null = null;
	private panels = null;
	private overlay: boolean = false;

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

	private constraintsValid() {
		// If Static Venue Constraint is given
		console.log(this.panels);
		if (this.$refs.staticVenueConstraintPanel !== undefined) {
			if ((<StaticVenueConstraintPanel>this.$refs.staticVenueConstraintPanel).staticVenueConstraintFormValid == false) {
				return false;
			}
		}

		// If shared Venue Constraint is given
		if (this.$refs.sharedVenueConstraintPanel !== undefined) {
			if ((<SharedVenueConstraintPanel>this.$refs.sharedVenueConstraintPanel).sharedVenueConstraintFormValid === false) {
				return false;
			}
		}

		// If Opponent Constraint is given
		if (this.$refs.opponentConstraintPanel !== undefined) {
			if ((<OpponentConstraintPanel>this.$refs.opponentConstraintPanel).opponentConstraintFormValid === false) {
				return false;
			}
		}

		// If Venue Constraint is given
		if (this.$refs.venueConstraintPanel !== undefined) {
			if ((<VenueConstraintPanel>this.$refs.venueConstraintPanel).venueConstraintFormValid === false) {
				return false;
			}
		}

		// If Repeater Gap Constraint is given
		if (this.$refs.repeaterGapConstraintPanel !== undefined) {
			if ((<RepeaterGapConstraintPanel>this.$refs.repeaterGapConstraintPanel).repeaterGapConstraintFormValid === false) {
				return false;
			}
		}

		if (this.$refs.fairnessConstraintPanel !== undefined) {
			if ((<FairnessConstraintPanel>this.$refs.fairnessConstraintPanel).fairnessConstraintFormValid == false) {
				return false;
			}
		}
		// If none of the forms is invalid return true
		return true;
	}

	private finishFirstStep() {
		this.step = 2;
		if (this.numberOfTeams !== null) {
			for (let index = 0; index < this.numberOfTeams; index++) {
				this.teams.push(new Team(index + 1));
			}
		} else {
			console.error("numberOfTeams is null before stepping to step 2");
		}
	}

	private goToFirstStep() {
		this.step = 1;
		this.teams = [];
	}

	private generateSchedule() {
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

		if (this.$refs.fairnessConstraintPanel !== undefined) {
			this.constraints?.push((<FairnessConstraintPanel>this.$refs.fairnessConstraintPanel).fairnessConstraint);
		}
		this.overlay = true;
		this.axios
			.post("http://127.0.0.1:9090/schedule", {
				teams: this.teams,
				constraints: this.constraints,
			})
			.then((response) => {
				this.fixtureList = response.data.matchweeks;
				this.scheduleGenerated = true;
				this.overlay = false;
			})
			.catch((error) => {
				console.log(error);
				this.overlay = false;
			});
	}
}
</script>


<style scoped>
.v-expansion-panel-header {
	font-weight: bold;
	color: #79a8a9;
}
</style>