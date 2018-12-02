import Vue from 'vue'
import App from './App.vue'
import store from './store'

import BPM from './components/BPM.vue'
import StartButton from './components/StartButton.vue'
import StepSequencer from './components/StepSequencer.vue'
import StepTrack from './components/StepTrack.vue'
import Step from './components/Step.vue'
import FX from './components/FX.vue'

Vue.config.productionTip = false

Vue.component('bpm', BPM);
Vue.component('start-button', StartButton);
Vue.component('step-sequencer', StepSequencer);
Vue.component('step-track', StepTrack);
Vue.component('step', Step);
Vue.component('fx', FX);

new Vue({
  store,
  render: h => h(App),
}).$mount('#app')
