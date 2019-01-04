import Vue from 'vue';
import VueX from 'vuex';

import manager from './drumMachineManager';

Vue.use(VueX);

const store = new VueX.Store({
  state: {
    bpm: 65,
    on: false,
    step: 0,
    ready: false,
    tracks: [
      {
        name: 'Kick',
        sound: 'kick',
        steps: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      },
      {
        name: 'Sub1',
        sound: 'sub',
        steps: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      },
      {
        name: 'Sub2',
        sound: 'sub',
        steps: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      },
      {
        name: 'Snare',
        sound: 'snare',
        steps: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      },
      {
        name: 'Clap',
        sound: 'clap',
        steps: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      },
      {
        name: 'HiHat',
        sound: 'hihat',
        steps: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      },
      {
        name: 'OpenHiHat',
        sound: 'openhihat',
        steps: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      }
    ]
  },
  mutations: {
    setStep(state, step) {
      state.step = step;
    },
    setReady(state) {
      state.ready = true;
    },
    setTrackStep(state, { shiftEnabled, track, step}) {
      const steps = state.tracks[track].steps.slice();
      const val = steps[step] === 0
        ? shiftEnabled
          ? 2
          : 1
        : shiftEnabled && steps[step] === 1
          ? 2
          : 0;
      steps[step] = val;
      state.tracks[track].steps = steps;
      manager.setTracks(state.tracks);
    },
    setBPM(state, bpm) {
      state.bpm = bpm;
      manager.setBPM(bpm);
    },
    toggleOn(state) {
      state.on = !state.on;
      if (state.on) {
        manager.start(state.bpm);
      } else {
        manager.stop();
      }
    },
    startSound(state, { name, volume, loop }) {
      manager.startSound(name, volume, loop);
    },
    stopSound(state, { name }) {
      manager.stopSound(name);
    }
  },
});

manager.onReady(() => {
  store.commit('setReady');
});

manager.onStepChange((step) => {
  store.commit('setStep', step);
});

export default store;
