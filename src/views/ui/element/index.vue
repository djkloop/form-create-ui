<!--
 * @Author       : djkloop
 * @Date         : 2020-04-24 23:25:04
 * @LastEditors  : djkloop
 * @LastEditTime : 2020-04-25 23:04:20
 * @Description  : 转化fc-item
 * @FilePath     : /form-create-ui/src/views/ui/element/index.vue
 -->
<template>
  <div class="fc-main fc-main-element">
    <h1 class="no-fc-item" v-show="getMainList.length === 0">从左侧控件列表添加</h1>
    <!-- fc-transfer-panel -->
    <draggable
      class="fc-main-draggable-box"
      tag="div"
      v-bind="draggableOptions"
      @add="handleAddItem"
      v-model="getMainList"
    >
      <!-- fc-item -->
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
