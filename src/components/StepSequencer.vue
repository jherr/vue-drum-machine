<template>
  <div class="wrapper">
    <div class="indicator">
      <div
        v-if="on"
        :style="{ left: `${step * 37.5}px` }"
        class="step-indicator"
      />
    </div>
    <step-track
      v-for="(track, index) in tracks"
      :key="track.name"
      :track="index"
      :name="track.name"
    />
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
  position: absolute;
  top: 0px;
  left: 0px;
  width: 38px;
  height: 100%;
  background: #00ff0020;
}

.indicator {
  position: absolute;
  width: 600px;
  top: 0px;
  right: 0px;
  height: 100%;
  padding: 4px 2px;
  pointer-events: none;
}

.wrapper {
  display: flex;
  flex: 1;
  flex-direction: column;
  border: 1px solid #555;
  margin: 0px 20px 20px;
  position: relative;
}
</style>
