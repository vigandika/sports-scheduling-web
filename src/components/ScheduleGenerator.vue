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
          <v-form
            ref="firstStep"
            v-model="firstStepValid"
          >
            <v-text-field 
              label="Competition Name"
              :rules="[rules.required]"
              clearable
            >
            </v-text-field>

            <v-text-field 
              label="Number of teams"
              type="number"
              :rules="[rules.number]"
            >
            </v-text-field>
          <v-btn color="primary" @click="e1 = 2" :disabled="!firstStepValid"> Continue </v-btn>
          </v-form>
        </v-stepper-content>

        <v-stepper-content step="2">
          <v-form
            ref="secondStep"
            v-model="secondStepValid"
          >            
            <v-row align="center" justify="center" v-for="index in 10" :key="index">
              <v-col cols="1" sm="4">
                <v-text-field                
                  :label="`Team ${index}`"
                  :rules="[rules.required]"
                >

                </v-text-field>
              </v-col>

              <v-col cols="1" sm="2">
                <v-select
                  required
                  :items="['A', 'B', 'C']"
                  label="Category"
                  :rules="[rules.required]"
                >
                </v-select>
              </v-col>
            </v-row>
          </v-form>

          <v-btn 
            icon
            @click="e1 = 1" 
            color="primary"
          >
            <v-icon>mdi-chevron-left</v-icon>
          </v-btn>

          <v-btn
            icon
            color="primary"
            @click="e1 = 3"
            :disabled="!secondStepValid"
          >
            <v-icon>mdi-chevron-right</v-icon>
          </v-btn>
        </v-stepper-content >

        <v-stepper-content step="3">
          <v-alert :value="true" type="success"> asd. </v-alert>
          <v-btn color="primary" @click="isOkay = true" > Nice deri tash </v-btn>
        </v-stepper-content>
      </v-stepper-items>
    </v-stepper>
  </v-container>
</template>

  <script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class ScheduleGenerator extends Vue {
  private e1 = 1;
  private firstStepValid = true;
  private secondStepValid = true;
  private isOkay = false;
  private rules = {
    required: value => !!value || "Required",
    number: value => (parseInt(value) && parseInt(value) >= 5) || "The number of teams should be a valid number and greater than 4",
  }
}
</script>