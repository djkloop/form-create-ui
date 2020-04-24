<template>
  <div id="fc-app">
    <base-layout />
  </div>
</template>
<script lang="ts">
import { defineComponent } from "@vue/composition-api";
import BaseLayout from "@/layouts/basic-layout.vue";

export default defineComponent({
  name: "App",
  components: {
    BaseLayout
  }
});
</script>

<style lang="scss">
html,
body {
  width: 100%;
  height: 100%;
}

#fc-app {
  height: 100%;
}
</style>
