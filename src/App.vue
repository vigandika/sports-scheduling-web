<template>
  <v-app>
    <router-view></router-view>
    <v-main class="body">
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

<style>
#app {
	background-image: url(./assets/background-9.png);
	/* background-color: #cccccc; */
  /* background-size: cover; */
  background-position: bottom;
  background-repeat: no-repeat;
}
</style>
