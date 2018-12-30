<template>
  <div class="container">
    <div class="transport">
      <h1 class="logo">Trap Lord 9000</h1>
      <bpm />
      <start-button />
    </div>
    <div v-if="ready">
      <step-sequencer />
      <div class="button-container">
        <fx sound="loop" title="Turn Up (F)" />
        <fx sound="loop130" title="SQUAD (Am)" />
        <fx sound="hey" title="Hey" />
        <fx sound="yeah" title="Yeah" />
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  computed: {
    ...mapGetters(['ready']),
  }
}
</script>

<style>
.container {
  max-width: 800px;
  margin: auto;
  background: linear-gradient(to bottom right, #222, #0a0a0a);
  border: 2px solid black;
  border-radius: 4px;
  margin-top: 20px;
}

.logo {
  font-size: 28px;
  color: #25ccf7;
  font-family: 'Righteous', cursive;
  padding: 20px;
  margin: 0px;
  text-transform: uppercase;
}

.transport {
  display: grid;
  grid-template-columns: 50% 25% 25%;
}

.button-container {
  display: grid;
  grid-template-columns: 25% 25% 25% 25%;
  padding: 0px 20px 10px;
}
</style>
