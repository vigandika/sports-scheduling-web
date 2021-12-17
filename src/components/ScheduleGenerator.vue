<template>
  <v-container>
    <v-stepper v-model="e1">
      <v-stepper-header>
        <v-stepper-step :complete="e1 > 1" step="1">Competition</v-stepper-step>

        <v-divider></v-divider>

        <v-stepper-step :complete="e1 > 2" step="2">Teams</v-stepper-step>

        <v-divider></v-divider>

        <v-stepper-step step="3" :complete="isOkay">Constraints</v-stepper-step>
      </v-stepper-header>

      <v-stepper-items>
        <v-stepper-content step="1">
          <v-form ref="firstStep" v-model="firstStepValid">
            <v-text-field
              label="Competition Name"
              :rules="[rules.required]"
              clearable
            >
            </v-text-field>

            <v-text-field
              v-model="numberOfTeams"
              label="Number of teams"
              type="number"
              :rules="[rules.number]"
            >
            </v-text-field>
            <v-btn
              color="primary"
              @click="finishFirstStep()"
              :disabled="!firstStepValid"
            >
              Continue
            </v-btn>
          </v-form>
        </v-stepper-content>

        <v-stepper-content step="2">
          <v-form ref="secondStep" v-model="secondStepValid">
            <v-row
              align="center"
              justify="center"
              v-for="team in teams"
              :key="team.id"
            >
              <v-col cols="1" sm="4">
                <v-text-field
                  v-model="team.name"
                  :label="`Team ${team.id}`"
                  :rules="[rules.required]"
                >
                </v-text-field>
              </v-col>

              <v-col cols="1" sm="2">
                <v-select
                  v-model="team.category"
                  required
                  :items="['A', 'B', 'C']"
                  label="Category"
                  :rules="[rules.required]"
                >
                </v-select>
              </v-col>
            </v-row>
          </v-form>

          <v-btn icon @click="e1 = 1" color="primary">
            <v-icon>mdi-chevron-left</v-icon>
          </v-btn>

          <v-btn
            icon
            color="primary"
            @click="e1 = 3"
            :disabled="secondStepValid"
          >
            <v-icon>mdi-chevron-right</v-icon>
          </v-btn>
        </v-stepper-content>

        <v-stepper-content step="3">
          <v-row justify="center">
            <v-expansion-panels inset>
              <v-expansion-panel>
                <v-expansion-panel-header
                  >StaticVenueConstraint (HARD)</v-expansion-panel-header
                >
                <v-expansion-panel-content> </v-expansion-panel-content>
              </v-expansion-panel>

              <v-expansion-panel>
                <v-expansion-panel-header
                  >OpponentConstraint (SOFT)</v-expansion-panel-header
                >
                <v-expansion-panel-content>
                  <opponent-constraint-panel :teams="teams">
                  </opponent-constraint-panel>
                </v-expansion-panel-content>
              </v-expansion-panel>

              <v-expansion-panel>
                <v-expansion-panel-header>Panel 3</v-expansion-panel-header>
                <v-expansion-panel-content>
                  Some content
                </v-expansion-panel-content>
              </v-expansion-panel>
            </v-expansion-panels>
          </v-row>
        </v-stepper-content>
      </v-stepper-items>
    </v-stepper>
  </v-container>
</template>

  <script lang="ts">
import { Component, Vue, Mixins } from "vue-property-decorator";
import { OpponentConstraint } from "@/models/OpponentConstraint";
import OpponentConstraintPanel from "@/components/OpponentConstraintPanel.vue";
import { Team } from "@/models/Team";
import RulesMixin  from "@/mixins/RulesMixin";

@Component({
  components: {
    OpponentConstraintPanel,
  },
})
export default class ScheduleGenerator extends Mixins(Vue, RulesMixin) {
  private teams: Team[] = [];
  private numberOfTeams: number | null = null;
  private e1 = 1;
  private firstStepValid = true;
  private secondStepValid = true;
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
}
</script>


