<template>
  <div class="fc-main fc-main-element">
    <h1 class="no-fc-item" v-show="isHitText">从左侧控件列表添加</h1>
    <!-- fc-transfer-panel -->
    <draggable
      class="fc-main-draggable-box"
      tag="div"
      v-bind="draggableOptions"
      @add="handleAddItem"
      v-model="getMainList"
    >
      <form-item :item="item" v-for="item in getMainList" :key="item.uniqueKey + '__item__parent'" />
    </draggable>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, toRefs } from "@vue/composition-api";
import draggable from "vuedraggable";
import { useGetters } from "@u3u/vue-hooks";
import { AnyType } from "@/interface/common";

/// form item
import FormItem from "@/components/fc-render/form/form.vue";

export default defineComponent({
  components: {
    draggable,
    FormItem,
  },
  setup() {
    const isHitText = ref(true);
    const draggableOptions = ref({
      group: "fc-draggable",
      ghostClass: "moving",
      animation: 180,
      handle: ".drag-move",
    });
    const storeGetters = {
      ...useGetters("common", ["getMainList"]),
    };

    return {
      isHitText,
      draggableOptions,
      ...toRefs(storeGetters),
    };
  },
  methods: {
    handleAddItem(e: AnyType) {
      const idx = e.newIndex;
      console.log(idx);
    },
  },
});
</script>

<style lang="scss" scoped>
@import "ui-element.scss";
</style>
