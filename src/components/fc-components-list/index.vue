<template>
  <div>
    {{ msg }}
  </div>
</template>

<script>
import { defineComponent, onMounted, ref } from "@vue/composition-api";
export default defineComponent({
  name: "fc-components-list",
  setup() {
    const msg = ref("left");

    onMounted(() => {
      setTimeout(() => {
        msg.value = "effect";
      }, 2000);
    });

    return {
      msg
    };
  }
});
</script>

<style></style>
