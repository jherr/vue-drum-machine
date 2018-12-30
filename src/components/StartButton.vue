<template>
  <button
    :style="color"
    class="start"
    @click="toggleOn"
  >
    {{ on ? 'Stop' : 'Play' }}
  </button>
</template>

<script>
import { mapState } from 'vuex';
export default {
  computed: {
    ...mapState(['on']),
    color() {
      return {
        color: this.on === false ? '#25CCF7' : '#FD7272',
        border: `2px solid ${this.on === false ? '#25CCF7' : '#FD7272'}`,
      }
    }
  },
  methods: {
    toggleOn() {
      this.$store.dispatch('toggleOn');
    }
  }
}
</script>

<style scoped>
.start {
  background: none;
  font-family: 'Righteous', cursive;
  padding: 10px;
  font-size: 18px;
  border-radius: 2px;
  margin: 2px 4px;
  margin-right: 20px;
  align-self: center;
  min-width: 100px;
}
</style>
