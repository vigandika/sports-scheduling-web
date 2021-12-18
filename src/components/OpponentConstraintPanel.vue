<template>
  <v-container>
    <i style="color: gray;">Forbid a team to play against an opponent in a specific matchweek.</i>

    <v-form ref="opponentConstraintForm" v-model="opponentConstraintFormValid">
      <v-row
        align="center"
        justify="center"
        v-for="(opponentConstraint, index) in opponentConstraints"
        :key="index"
      >
        <v-col cols="10" sm="4">
          <v-select
            required
            v-model="opponentConstraint.teamId"
            color="secondary"
            :items="teams"
            item-text="name"
            item-value="id"
            label="Team"
            :rules="[rules.required]"
            return-object
          >
            <!-- should return object be used? -->
          </v-select>
        </v-col>

        <v-col cols="10" sm="4">
          <v-select
            required
            v-model="opponentConstraint.opponentId"
            color="secondary"
            :items="teams"
            item-text="name"
            item-value="id"
            label="Team"
            :rules="[rules.required]"
            return-object
          >
            <!-- should return object be used? -->
          </v-select>
        </v-col>

        <v-col cols="10" sm="2">
          <v-select
            required
            v-model="opponentConstraint.matchweek"
            color="secondary"
            :items="matchweeks"
            label="Matchweek"
            :rules="[rules.required]"
          >
          </v-select>
        </v-col>

        <v-col cols="10" sm="2">
          <penalty-slider @update-penalty="updatePenalty($event, opponentConstraint)" />
        </v-col>

      </v-row>
    </v-form>
    <v-btn
      icon
      block
      class="add-btn"
      color="secondary"
      @click="addOpponentConstraint"
    >
      <v-icon>mdi-plus-circle-outline</v-icon>
    </v-btn>
  </v-container>
</template>

<script lang="ts">
import { OpponentConstraint } from "@/models/OpponentConstraint";
import { PropType } from "vue";
import { Component, Vue, Prop, Mixins } from "vue-property-decorator";
import { Team } from "@/models/Team";
import RulesMixin from "@/mixins/RulesMixin";
import PenaltySlider from "@/components/shared/PenaltySlider.vue"

@Component({
  name: "OpponentConstraintPanel",
  components: {
    PenaltySlider
  }
})
export default class OpponentConstraintPanel extends Mixins(Vue, RulesMixin) {
  @Prop({ type: Array as PropType<Team[]>, required: true })
  private teams: Team[] | undefined;

  @Prop({ type: Array as PropType<Number[]>, required: true })
  private matchweeks: number[] | undefined;

  private opponentConstraints: Array<OpponentConstraint> = [];
  private opponentConstraintFormValid: boolean = false;

  private addOpponentConstraint(): void {
    this.opponentConstraints.push(new OpponentConstraint());
  }

  private updatePenalty(penalty: number, constraint: OpponentConstraint) {
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