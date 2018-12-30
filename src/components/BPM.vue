<template>
  <input
    v-model="bpm"
    min="60"
    max="180"
    type="number"
    class="bpm"
  />
</template>

<script>
export default {
  computed: {
    bpm: {
      get() {
        return this.$store.state.bpm;
      },
      set(val) {
        this.$store.dispatch('setBPM', val);
      }
    }
  }
}
</script>

<style scoped>
.bpm {
  color: #25ccf7;
  border: 2px solid #25ccf7;
  font-size: 18px;
  background: none;
  padding: 10px;
  font-family: 'Righteous', cursive;
  border-radius: 2px;
  margin: 2px 4px;
  margin-right: 20px;
  align-self: center;
}
</style>
