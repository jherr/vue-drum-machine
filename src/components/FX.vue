<template>
  <button
    class="fx"
    @mousedown="playSound"
    @touchstart="playSound"
    @touchend="stopSound"
    @mouseup="stopSound"
    :style="style"
  >
    {{ title }}
  </button>
</template>

<script>
export default {
  props: {
    title: {
      type: String
    },
    sound: {
      type: String
    },
  },
  data: () => ({
    held: false,
  }),
  computed: {
    style() {
      return {
        background: this.held ? '#fd7272' : 'none',
        color: this.held ? 'black' : '#fd7272'
      }
    }
  },
  methods: {
    playSound(e) {
      let loop = false;
      if (e.shiftKey) {
        this.held = true;
        loop = true;
      }
      this.$store.dispatch('startSound', {
        name: this.sound,
        volume: -8,
        loop
      });
    },
    stopSound() {
      this.held = false;
      this.$store.dispatch('stopSound', {
        name: this.sound,
      });
    }
  }
}
</script>

<style>
.fx {
  border: 2px solid #fd7272;
  display: inline-block;
  font-size: 24px;
  border-radius: 2px;
  padding: 20px;
  font-family: 'Righteous', cursive;
  margin: 2px;
}

.fx:active {
  background: #fd7272;
  color: black;
}
</style>
