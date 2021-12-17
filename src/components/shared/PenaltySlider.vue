<template>
  <v-container>
    <v-subheader class="ma-0 pa-0" >
      Penalty&nbsp;
      <v-tooltip top>
        <template v-slot:activator="{ on, attrs }">
          <v-icon small v-bind="attrs" v-on="on">mdi-help-circle</v-icon>
        </template>
        <span
          >Penalty indicates how important is a constraint to be satisfied.
          <br />
          Algorithm will treat constraints with a higher penalty value with
          greater priority.</span
        >
      </v-tooltip>
    </v-subheader>
    <v-slider
      v-model="penalty"
      :tick-labels="[1, '', '', '', 5]"
      :min="1"
      :max="5"
      step="1"
      ticks="always"
      :thumb-label="true"
      @change="updatePenalty"
    ></v-slider>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue, Mixins } from "vue-property-decorator";
import RulesMixin from "@/mixins/RulesMixin";

@Component({
  name: "PenaltySlider",
})
export default class PenaltySlider extends Mixins(Vue, RulesMixin) {
  private penalty: number = 1;
  private updatePenalty() {
      this.$emit('update-penalty', this.penalty);
  }
}
</script>


<style scoped>
</style>