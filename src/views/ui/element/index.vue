<!--
 * @Author       : djkloop
 * @Date         : 2020-04-24 23:25:04
 * @LastEditors   : djkloop
 * @LastEditTime  : 2020-04-26 15:09:06
 * @Description  : 从fc-item到lib-ui
 * @FilePath      : /form-create-ui/src/views/ui/element/index.vue
 -->
<template>
  <div class="fc-main fc-main-element">
    <h1 class="no-fc-item" v-show="baseList.length === 0">
      从左侧控件列表添加
    </h1>
    <!-- fc-transfer-panel -->
    <draggable
      class="fc-main-draggable-box"
      tag="div"
      v-bind="draggableOptions"
      @add="handleAddItem"
      v-model="baseList"
    >
      <!-- fc-item -->
      <transition-group tag="div" type="transition" class="fc-main-draggable-box-transition" name="flip-list">
        <form-item
          class="fc-drage-move"
          :item="item"
          v-for="item in baseList"
          :key="item.uniqueKey + '__item__parent'"
          @copy-item="handleCopyItem"
        />
      </transition-group>
    </draggable>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, toRefs, reactive, watch } from "@vue/composition-api";
import draggable from "vuedraggable";
import { useGetters } from "@u3u/vue-hooks";
import { AnyType } from "@/interface/common";
import { ComponentsItem } from "@/interface/components";
import { setClickHandleItem } from "@/components/fc-components-list/fc-components.utils";

/// form item
import FormItem from "@/components/fc-render/form/form.vue";

export default defineComponent({
  components: {
    draggable,
    FormItem,
  },
  setup() {
    /// 默认的mainList
    const baseList = ref([]);

    const draggableOptions = ref({
      group: "fc-draggable",
      ghostClass: "moving",
      animation: 300,
      handle: ".fc-drage-move",
    });

    const storeGetters = reactive({
      ...useGetters("common", ["getMainList"]),
    });

    const handleAddItem = (e: AnyType) => {
      const newIndex = e.newIndex;
      /// 选中
      setClickHandleItem(baseList.value[newIndex], void 0);
    };

    /// 监听一下
    watch(
      () => storeGetters.getMainList,
      n => {
        baseList.value = n;
      },
      { lazy: true }
    );

    const handleCopyItem = (isCopy: boolean, item: ComponentsItem) => {
      console.log(isCopy, item);
    }

    return {
      draggableOptions,
      handleAddItem,
      baseList,
      handleCopyItem,
      ...toRefs(storeGetters),
    };
  }
});
</script>
<style lang="scss" scoped>
.flip-list-move {
  transition: transform 0.5s;
}
</style>

<style lang="scss" scoped>
@import "ui-element.scss";
</style>