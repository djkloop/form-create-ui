<template>
  <div class="fc-main fc-main-element">
    <h1 class="no-fc-item" v-show="isHitText">从左侧控件列表添加</h1>
    <!-- fc-transfer-panel -->
    <draggable class="fc-main-draggable-box" tag="div" v-bind="draggableOptions">
      <li>1111</li>
    </draggable>
  </div>
</template>

<script>
import { createComponent, ref } from "@vue/composition-api";
import draggable from "vuedraggable";
export default createComponent({
  components: {
    draggable,
  },
  setup() {
    const isHitText = ref(true);
    const draggableOptions = ref({
      group: "fc-draggable",
      ghostClass: "moving",
      animation: 180,
      handle: ".drag-move",
    });

    return {
      isHitText,
      draggableOptions,
    };
  },
});
</script>

<style lang="scss" scoped>
@import "ui-element.scss";
</style>
