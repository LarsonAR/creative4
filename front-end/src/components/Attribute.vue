<template>
  <div>
    <p class="text-center">{{ attribute.min }} | {{ attribute.max }}</p>
    <div class="progress"><div class="progress-bar" :style="style"></div></div>
  </div>
</template>

<script>
export default {
  name: "Personality",
  props:  {
    attribute: Object
  },
  data() {
    return {
      style: {
        width: this.attribute.value + "%"
      }
    }
  }

}
</script>

<style scoped>
  p {
    margin-bottom: 3px;
  }
  .progress-bar {
    background-color: #497575;
  }
</style>