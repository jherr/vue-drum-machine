import Vue from 'vue';
import VueX from 'vuex';
import Tone from 'tone';

Vue.use(VueX);

// Recent changes to audio policies require resuming:
// https://developers.google.com/web/updates/2017/09/autoplay-policy-changes#webaudio
let resumedAudioContext = false;
const resumeAudioContext = () => {
  if (!resumedAudioContext) {
    Tone.context.resume();
    resumedAudioContext = true;
  }
};

const soundNames = [
  'bass',
  'clap',
  'hat2',
  'hey',
  'hihat',
  'kick',
  'loop',
  'loop130',
  'nah',
  'openhihat',
  'snare',
  'sub',
  'yeah',
];

const store = new VueX.Store({
  state: {
    bpm: 65,
    on: false,
    step: 0,
    sounds: soundNames.map(name => ({
      name,
      buffer: null,
    })),
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
  getters: {
    ready(state) {
      return state.sounds
        .filter(({ buffer }) => buffer === null)
        .length === 0;
    }
  },
  mutations: {
    setStep(state, step) {
      state.step = step;
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
    },
    setBPM(state, bpm) {
      state.bpm = bpm;
    },
    toggleOn(state) {
      state.on = !state.on;
    },
    setSound({ sounds }, { name, buffer }) {
      const sound = sounds.find((s) => s.name === name);
      sound.buffer = buffer;
    }
  },
  actions: {
    toggleOn({ state, commit }) {
      resumeAudioContext();
      commit('toggleOn');
      if (state.on) {
        Tone.Transport.bpm.value = state.bpm;
        Tone.Transport.start();
      } else {
        Tone.Transport.stop();
        commit('setStep', 0);
      }
    },
    setBPM({ state, commit }, bpm) {
      resumeAudioContext();
      commit('setBPM', bpm);
      Tone.Transport.bpm.value = state.bpm;
    },
    startSound({ state: { sounds }}, { name, volume, loop }) {
      resumeAudioContext();
      const { buffer } = sounds.find((s) => s.name === name);
      buffer.volume.value = volume;
      buffer.loop = loop;
      buffer.start();
    },
    stopSound({ state: { sounds }}, { name }) {
      resumeAudioContext();
      const { buffer } = sounds.find((s) => s.name === name);
      buffer.stop();
    },
    fetchSounds({ commit }) {
      soundNames.forEach(name => {
        const buffer = new Tone.Player(`sounds/${name}.wav`, () => {
          commit('setSound', {
            name,
            buffer
          })      
        }).toMaster();
      });
    }
  }
});

store.dispatch('fetchSounds');

Tone.Transport.scheduleRepeat(function(time) {
  if(store.state.on) {
    store.state.tracks.forEach(({ steps, sound }) => {
      const snd = store.state.sounds.find((s) => s.name === sound);
      if (steps[store.state.step] === 1) {
        snd.buffer.start(time);
      } else if (steps[store.state.step] === 2) {
        snd.buffer.start();
        snd.buffer.start('+64n');
        snd.buffer.start('+32n');
      }
    });
    store.commit('setStep', store.state.step > 14 ? 0 : store.state.step + 1);
  }
}, '16n');

export default store;
