<template>
  <v-app>
    <v-main>
      <schedule-generator/>
    </v-main>
  </v-app>
</template>

<script lang="ts">

import { Component, Vue } from 'vue-property-decorator';
import ScheduleGenerator from './components/ScheduleGenerator.vue';

@Component({
  components: {
    ScheduleGenerator,
  },
})
export default class App extends Vue {}
</script>
