import Tone from 'tone';

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

// Recent changes to audio policies require resuming:
// https://developers.google.com/web/updates/2017/09/autoplay-policy-changes#webaudio
let resumedAudioContext = false;
const resumeAudioContext = () => {
  if (!resumedAudioContext) {
    Tone.context.resume();
    resumedAudioContext = true;
  }
};

const manager = {
  sounds: {},
  tracks: [],
  on: false,
  step: 0,
  readyCallback: () => {},
  loadSounds() {
    soundNames.forEach(name => this.loadSound(name));
  },
  loadSound(name) {
    const buffer = new Tone.Player(`sounds/${name}.wav`, () => {
      this.sounds[name] = buffer;
      const ready = Object.keys(this.sounds)
        .filter(k => !this.sounds[k])
        .length === 0;
      if (ready) {
        this.readyCallback();
      }
    }).toMaster();
  },
  stopSound(name) {
    resumeAudioContext();
    this.sounds[name].stop();
  },
  startSound(name, volume, loop) {
    resumeAudioContext();
    this.sounds[name].volume.value = volume;
    this.sounds[name].loop = loop;
    this.sounds[name].start();
  },
  start(bpm) {
    resumeAudioContext();
    Tone.Transport.bpm.value = bpm;
    Tone.Transport.start();
    this.on = true;
  },
  stop() {
    resumeAudioContext();
    Tone.Transport.stop();
    this.on = false;
  },
  setBPM(bpm) {
    resumeAudioContext();
    Tone.Transport.bpm.value = bpm;
  },
  onReady(cb) {
    this.readyCallback = cb;
  },
  onStepChange(cb) {
    this.stepChangeCallback = cb;
  },
  setTracks(tracks) {
    this.tracks = tracks;
  },
};

manager.loadSounds();

Tone.Transport.scheduleRepeat(function(time) {
  if(manager.on) {
    manager.tracks.forEach(({ steps, sound }) => {
      if (steps[manager.step] === 1) {
        manager.sounds[sound].start(time);
      } else if (steps[manager.step] === 2) {
        manager.sounds[sound].start();
        manager.sounds[sound].start('+64n');
        manager.sounds[sound].start('+32n');
      }
    });
    manager.step = manager.step > 14 ? 0 : manager.step + 1
    manager.stepChangeCallback(manager.step);
  }
}, '16n');

export default manager;
