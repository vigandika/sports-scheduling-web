
import Vue from 'vue'
import VueAxios from 'vue-axios'
import axios  from 'axios'
import App from './App.vue'
import vuetify from './plugins/vuetify'

Vue.config.productionTip = false

Vue.use(VueAxios, axios)

new Vue({
  vuetify,
  render: h => h(App)
}).$mount('#app')
