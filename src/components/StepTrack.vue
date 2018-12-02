<template>
  <div class="st-wrapper">
    <div class="st-info">
      <h2 class="st-name">
        {{ name }}
      </h2>
    </div>
    <div class="st-steps-wrapper">
      <step
        v-for="(step, stepIndex) in steps"
        :key="stepIndex"
        :track="track"
        :on="step > 0"
        :doubled="step === 2"
        :index="stepIndex"
      />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    name: {
      type: String,
    },
    track: {
      type: Number,
    }
  },
  computed: {
    steps() {
      return this.$store.state.tracks[this.track].steps;
    }
  }
}
</script>

<style scoped>
.st-wrapper {
  display: flex;
  flex: 1;
}

.st-info {
  flex: 0 0 155px;
  background: linear-gradient(#292929, #111);
  border: 1px solid #555;
}

.st-name {
  color: white;
  font-size: 14px;
  margin-left: 20px;
  line-height: 100%;
  margin: 0;
  vertical-align: middle;
  padding: 0px 10px;
  line-height: 50px;
}

.st-steps-wrapper {
  display: flex;
  flex: 1;
}
</style>
