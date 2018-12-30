<template>
  <div class="steps">
    <div
      v-if="on"
      :style="`grid-column: ${step + 2}; grid-row: 1 / span 9;`"
      class="step-indicator"
    />
    <template
      v-for="(track, index) in tracks"
    >
      <h2
        :key="track.name"
        :style="`grid-column: 1; grid-row: ${index+1};`"
        class="st-name"
      >
        {{ track.name }}
      </h2>
      <step
        v-for="(step, stepIndex) in track.steps"
        :key="`${track.name}-${stepIndex}`"
        :track="index"
        :on="step > 0"
        :doubled="step === 2"
        :index="stepIndex"
        :style="`grid-column: ${stepIndex + 2}; grid-row: ${index+1};`"
      />
    </template>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  computed: {
    ...mapState([ 'on', 'step', 'tracks' ])
  }
};
</script>

<style scoped>
.step-indicator {
  background: #00ff0020;
}

.steps {
  display: grid;
  grid-template-columns: 155px repeat(16, 37.5px);
  border: 1px solid #555;
  margin: 0px 20px 20px;
}

.st-name {
  font-family: 'Righteous', cursive;
  background: linear-gradient(#292929, #111);
  border: 1px solid #555;
  color: white;
  font-size: 14px;
  margin: 0px;
  vertical-align: middle;
  padding: 0px 10px;
  line-height: 50px;
}
</style>
