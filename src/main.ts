
import Vue from 'vue'
import VueAxios from 'vue-axios'
import axios  from 'axios'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import VueRouter from 'vue-router'
import ScheduleGenerator from './components/ScheduleGenerator.vue'
import FixtureList from './components/FixtureList.vue'

Vue.config.productionTip = false

Vue.use(VueRouter)
Vue.use(VueAxios, axios)

const routes = [
  { path: '/', name: 'schedule-generator', component: ScheduleGenerator },
  { path: '/fixture-list', name: 'fixture-list', component: FixtureList, props: true }
]


const router = new VueRouter({
  routes
})

new Vue({
  vuetify,
  router,
  render: h => h(App)
}).$mount('#app')
