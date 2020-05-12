<!--
 * @Author        : djkloop
 * @Date          : 2020-04-26 11:45:07
 * @LastEditors   : djkloop
 * @LastEditTime  : 2020-05-12 16:37:10
 * @Description   : 封装给form-create用的自定义组件
 * @FilePath      : /form-create-ui/src/components/fc-render/form/form.vue
 -->
<template>
  <div
    class="fc-drage-move-box"
    :class="{
      'fc-layout-width': ['fc-grid', 'table', 'card', 'divider', 'html'].includes(item.listTag),
    }"
  >
    <!-- TODO: 这里可以想个更好的解决方法... -->
    <!-- 栅格布局 -->
    <!-- <template v-if="item.listTag === 'fc-grid'">
      <div
        class="fc-drage-components-form__container fc-drage-container fc-render-layout-grid"
        :class="{
          'fc-active': item.uniqueKey === getSelectItem.uniqueKey,
        }"
        @click.stop="handleActiveItem"
      >
        <el-row :gutter="item.gutter || 0" class="fc-render-form-grid-row">
          <el-col v-for="(it, index) in item.children" :key="index" :span="it.props.span || 0">
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
              @start="$emit('drage-start', $event, it.children)"
              @add="$emit('add-col-item', $event, it.children)"
            >
              <transition-group
                tag="div"
                type="transition"
                class="fc-main-draggable-box-transition"
                name="fc-drage-list"
              >
                <form-create-item-wrapper
                  class="fc-drage-move"
                  :item="col.children[0]"
                  :data-key="col.children[0].uniqueKey"
                  v-for="col in it.children"
                  :key="col.children[0].uniqueKey + '__col__item__parent'"
                  @fc-add-col-item="handleColAdd"
                  @fc-copy-form-item="handleCopyItem"
                >
                </form-create-item-wrapper>
              </transition-group>
            </draggable>
          </el-col>
        </el-row>
      </div>
    </template> -->
    <template v-if="item.listTag === 'fc-grid'">
      <fc-render-form-grid :item="item">
        <template #formItem>
          <slot></slot>
        </template>
      </fc-render-form-grid>
    </template>
    <!-- 普通的表单start -->
    <template v-else>
      <fc-render-form-item
        class="fc-render-form-item"
        :class="{ 'fc-active': item.uniqueKey === getSelectItem.uniqueKey }"
        :item="item"
        @fc-on-form-item-copy="handleCopyItem"
      >
        <template #formItem>
          <slot></slot>
        </template>
      </fc-render-form-item>
    </template>
  </div>
</template>

<script lang="ts">
import { defineComponent, toRefs } from "@vue/composition-api";
import { FormItemProps, ComponentsItem } from "@/interface/components";
import { useGetters } from "@u3u/vue-hooks";
import { AnyType } from "@/interface/common";

/// TODO: 后期是否可以考虑抽成单独的组件?
/// fc-render-form-components
import FcRenderFormItem from "./fc-render-form-item/index.vue";
import FcRenderFormGrid from "./fc-render-form-grid/index.vue";

export default defineComponent<FormItemProps, AnyType>({
  name: "form-create-item-wrapper",
  components: {
    FcRenderFormItem,
    FcRenderFormGrid,
  },
  props: {
    item: {
      type: Object,
    },
  },
  setup(props, { emit, slots }) {
    const storeGet = {
      ...useGetters("common", ["getSelectItem"]),
    };

    const handleColAdd = (e: AnyType, list: ComponentsItem[], isc: boolean, isn: boolean) =>
      emit("add-col-item", e, list, isc, isn);
    const handleCopyItem = (isCopy: boolean, item: ComponentsItem) => emit("copy-form-item", isCopy, item);

    return {
      ...toRefs(storeGet),
      emit,
      slots,
      handleColAdd,
      handleCopyItem,
    };
  },
});
</script>

<style lang="scss">
@import "form.scss";
</style>
