<!--
 * @Author       : djkloop
 * @Date         : 2020-04-24 23:25:04
 * @LastEditors  : djkloop
 * @LastEditTime : 2020-04-27 00:26:26
 * @Description  : 头部注释
 * @FilePath     : /form-create-ui/src/App.vue
 -->
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
    BaseLayout,
  },
});
</script>

<style lang="scss">
$primary-color: rgb(75, 144, 240);
$primary-hover-bg-color: rgb(159, 234, 191);
$scroller-width: 5px;
$scroller-border-radius: 8px;
$scroller-border-bg: #ddd;

html,
body {
  width: 100%;
  height: 100%;
}

#fc-app {
  height: 100%;
}

::-webkit-scrollbar {
  width: $scroller-width;
  border-radius: $scroller-border-radius;
  background: $scroller-border-bg;
}

::-webkit-scrollbar-track {
  background: $scroller-border-bg;
}

::-webkit-scrollbar-thumb {
  background: linear-gradient(to bottom, $primary-hover-bg-color, $primary-color);
}
</style>
