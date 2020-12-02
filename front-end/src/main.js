import Vue from 'vue'
import App from './App.vue'
import router from './router'

Vue.config.productionTip = false

import starterData from "@/starter_data"

let data = {
  profiles: starterData,
}

new Vue({
  router,
  data,
  render: h => h(App)
}).$mount('#app')