<template>
  <button
    class="step"
    :style="style"
    @click="onClick"
  />
</template>

<script>
export default {
  props: {
    on: {
      type: Boolean,
    },
    index: {
      type: Number,
    },
    doubled: {
      type: Boolean,
    },
    track: {
      type: Number,
    }
  },
  computed: {
    style() {
      const offsetColor = (this.index > 3 && this.index < 8) || (this.index > 11 && this.index < 16);
      return {
        background: offsetColor ? '#25CCF7' : '#FD7272',
        opacity: this.on ? 1 : 0.35,
        animation: this.doubled ? 'flash 0.5s linear infinite' : ''
      };
    }
  },
  methods: {
    onClick(e) {
      let shiftEnabled = e.shiftKey === true;
      this.$store.commit('setTrackStep', {
        shiftEnabled,
        track: this.track,
        step: this.index,
      });
    }
  }
}
</script>

<style>
@keyframes flash {
  0% {
    opacity: 0.5;
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: 0.5
  }
}

.step {
  border-radius: 2px;
  margin: 2px;
}
</style>
