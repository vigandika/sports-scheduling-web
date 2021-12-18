<template>
	<v-container>
		<i style="color: gray;">
			Identify teams that share the home venue. The pair of teams sharing a venue will have complementary Home-Away playing patterns.
		</i>

		<v-form ref="sharedVenueConstraintForm" v-model="sharedVenueConstraintFormValid" :lazy-validation="true">
			<v-row align="center" justify="center" v-for="(teamPair, index) in sharedVenueConstraint.teamPairs" :key="index">
				<v-col cols="10" sm="4">
					<v-select
						required
						color="secondary"
						:items="teams"
						:item-disabled="disableTeam"
						item-text="name"
						item-value="id"
						label="Team"
						:rules="[rules.required]"
						@change="updateSelectedTeams($event, index, 0)"
					>
					</v-select>
				</v-col>
				&
				<v-col cols="10" sm="4">
					<v-select
						required
						color="secondary"
						:items="teams"
						:item-disabled="disableTeam"
						item-text="name"
						item-value="id"
						label="Team"
						:rules="[rules.required]"
						@change="updateSelectedTeams($event, index, 1)"
					>
					</v-select>
				</v-col>
			</v-row>
		</v-form>
		<v-btn
			v-if="sharedVenueConstraint.teamPairs.length < sharedVenuePairsMax"
			icon
			block
			class="add-btn"
			color="secondary"
			@click="addTeamPair"
		>
			<v-icon>mdi-plus-circle-outline</v-icon>
		</v-btn>
		<p v-else class="text-caption text-sm-center text-xs-center">
			The maximum number of shared venue pairs for {{ teams.length }} teams is {{ sharedVenuePairsMax }}
		</p>
	</v-container>
</template>

<script lang="ts">
import { Component, Vue, Prop, Mixins } from "vue-property-decorator";
import RulesMixin from "@/mixins/RulesMixin";
import { SharedVenueConstraint } from "@/models/SharedVenueConstraint";
import { Team } from "@/models/Team";
import { PropType } from "vue";

@Component({
	name: "SharedVenueConstraintPanel",
})
export default class SharedVenueConstraintPanel extends Mixins(Vue, RulesMixin) {
	@Prop({ type: Array as PropType<Team[]>, required: true })
	private teams: Team[] | undefined;

	public sharedVenueConstraint = new SharedVenueConstraint([]);
	private sharedVenueConstraintFormValid: boolean = false;
	private selectedTeams: Array<Team> = [];

	private addTeamPair(): void {
		this.sharedVenueConstraint.teamPairs?.push([0, 0]);
	}

	private disableTeam(team: Team) {
		return this.teamSelected(team.id);
	}

	private updateSelectedTeams(teamId: number, index: number, pairIndex: number) {
		if (this.sharedVenueConstraint.teamPairs !== undefined) {
			this.sharedVenueConstraint.teamPairs[index][pairIndex] = teamId;
		} else {
			console.error("teamPairs are undefined");
		}
	}

	private teamSelected(teamId) {
		if (this.sharedVenueConstraint.teamPairs !== undefined) {
			for (var i = 0; i < this.sharedVenueConstraint.teamPairs?.length; i++) {
				if (this.sharedVenueConstraint.teamPairs[i].includes(teamId)) {
					return true;
				}
			}
			return false;
		}
	}

	get sharedVenuePairsMax() {
		if (this.teams !== undefined) {
			return this.getSharedVenuePairsMax(this.teams?.length);
		} else {
			console.error("teams is undefined");
		}
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