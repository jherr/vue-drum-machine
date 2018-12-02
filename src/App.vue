<template>
  <drum-machine />
</template>

<script>
import DrumMachine from './components/DrumMachine.vue'

export default {
  name: 'app',
  components: {
    DrumMachine
  }
}
</script>

<style>
html,
body {
  height: 100%;
}

* {
  box-sizing: border-box;
}

body {
  background: #333;
  margin: 0;
  padding: 0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
