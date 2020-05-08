<!--
 * @Author        : djkloop
 * @Date          : 2020-04-26 11:45:07
 * @LastEditors  : djkloop
 * @LastEditTime : 2020-05-08 23:28:35
 * @Description   : form-item
 * @FilePath     : /form-create-ui/src/components/fc-render/form/form.vue
 -->
<template>
  <div
    class="fc-drage-move-box"
    :class="{
      'fc-layout-width': ['fc-grid', 'table', 'card', 'divider', 'html'].includes(item.tag),
    }"
  >
    <!-- TODO: 这里可以想个更好的解决方法... -->
    <!-- 栅格布局 -->
    <template v-if="item.tag === 'fc-grid'">
      <div
        class="fc-drage-components-form__container fc-drage-container fc-render-layout-grid"
        :class="{
          'fc-active': item.uniqueKey === getSelectItem.uniqueKey,
        }"
        @click.stop="handleActiveItem"
      >
        <el-row :gutter="item.options.gutter" class="fc-render-form-grid-row">
          <el-col v-for="(it, index) in item.children" :key="index" :span="it.span || 0">
            <draggable
              tag="div"
              class="fc-main-draggable-box"
              v-bind="{
                group: 'fc-draggable',
                ghostClass: 'fc-drage-moving',
                animation: 180,
                handle: '.fc-drage-move',
              }"
              v-model="it.children"
              @start="$emit('fc-drage-start', $event, it.children)"
              @add="$emit('fc-add-col-item', $event, it.children)"
            >
              <transition-group
                tag="div"
                type="transition"
                class="fc-main-draggable-box-transition"
                name="fc-drage-list"
              >
                <!-- 这里的和element那里要写一样要不然不能冒泡哦 -->
                <fc-render-form
                  class="fc-drage-move"
                  :item="col"
                  :data-key="col.uniqueKey"
                  v-for="col in it.children"
                  :key="col.uniqueKey + '__col__item__parent'"
                  @fc-add-col-item="handleColAdd"
                  @fc-copy-form-item="handleCopyItem"
                />
              </transition-group>
            </draggable>
          </el-col>
        </el-row>
      </div>
    </template>
    <!-- 普通的表单start -->
    <template v-else>
      <fc-render-form-item
        class="fc-render-form-item"
        :class="{ 'fc-active': item.uniqueKey === getSelectItem.uniqueKey }"
        :item="item"
        @fc-on-form-item-copy="handleCopyItem"
      >
        <slot></slot>
      </fc-render-form-item>
    </template>
  </div>
</template>

<script lang="ts">
import { defineComponent, toRefs, ref } from "@vue/composition-api";
import { FormItemProps, ComponentsItem } from "@/interface/components";
import { useGetters } from "@u3u/vue-hooks";
import { AnyType } from "@/interface/common";
import draggable from "vuedraggable";
import { handleActiveSelectItem } from "@/components/fc-components-list/fc-components.utils";

/// TODO: 后期是否可以考虑抽成单独的组件?
/// fc-render-form-components
import FcRenderFormItem from "./fc-render-form-item/index.vue";
// import FcRenderFormGrid from "./fc-render-form-grid/index.vue";

export default defineComponent<FormItemProps, AnyType>({
  name: "form-create-item-wrapper",
  components: {
    FcRenderFormItem,
    draggable,
  },
  props: {
    item: {
      type: Object,
    },
  },
  setup(props, { emit, slots }) {
    const updateTime = ref(0);

    const storeGet = {
      ...useGetters("common", ["getSelectItem"]),
    };

    const handleActiveItem = () => {
      console.log("form-active");
      const newTime = new Date().getTime();
      if (newTime - updateTime.value < 400) {
        return;
      }
      updateTime.value = newTime;
      if (props.item) {
        handleActiveSelectItem(props.item);
      }
    };

    const handleColAdd = (e: AnyType, list: ComponentsItem[], isc: boolean, isn: boolean) =>
      emit("fc-add-col-item", e, list, isc, isn);
    const handleCopyItem = (isCopy: boolean, item: ComponentsItem) => emit("fc-copy-form-item", isCopy, item);
    return {
      ...toRefs(storeGet),
      slots,
      updateTime,
      handleActiveItem,
      handleColAdd,
      handleCopyItem,
    };
  },
});
</script>

<style lang="scss">
@import "form.scss";
</style>
