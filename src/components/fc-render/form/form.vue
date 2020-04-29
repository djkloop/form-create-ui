<!--
 * @Author        : djkloop
 * @Date          : 2020-04-26 11:45:07
 * @LastEditors   : djkloop
 * @LastEditTime  : 2020-04-29 11:50:45
 * @Description   : form-item
 * @FilePath      : /form-create-ui/src/components/fc-render/form/form.vue
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
                <fc-render-form
                  class="fc-drage-move"
                  :item="col"
                  :data-key="col.uniqueKey"
                  v-for="col in it.children"
                  :key="col.uniqueKey + '__col__item__parent'"
                  @fc-add-col-item="handleColAdd"
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
        :class="{
          'fc-active': item.uniqueKey === getSelectItem.uniqueKey,
        }"
        :item="item"
        @fc-on-copy="handleCopyItem"
      />
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
  name: "fc-render-form",
  components: {
    FcRenderFormItem,
    draggable,
  },
  props: {
    item: {
      type: Object,
    },
  },
  setup(props, ctx) {
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

    const handleCopyItem = (isCopy: boolean, item: ComponentsItem) => ctx.emit("fc-copy-item", isCopy, item);

    const handleColAdd = (e: AnyType, list: AnyType, isc: AnyType, isn: AnyType) =>
      ctx.emit("fc-add-col-item", e, list, isc, isn);
    return {
      ...toRefs(storeGet),
      updateTime,
      handleActiveItem,
      handleCopyItem,
      handleColAdd,
      ctx,
    };
  },
});
</script>

<style lang="scss">
@import "form.scss";
</style>
