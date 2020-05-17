<!--
 * @Author        : djkloop
 * @Date          : 2020-04-26 11:45:07
 * @LastEditors  : djkloop
 * @LastEditTime : 2020-05-17 12:30:16
 * @Description   : 封装给form-create用的自定义组件
 * @FilePath     : /form-create-ui/src/components/fc-render/form/form.vue
 -->
<style lang="scss">
@import "form.scss";
</style>
<template>
  <div
    class="fc-drage-move-box"
    :class="{
      'fc-layout-width': ['fc-grid', 'table', 'card', 'divider', 'html'].includes(item.listTag),
    }"
  >
    <!-- TODO: 这里可以想个更好的解决方法... -->
    <!-- 栅格布局 -->
    <template v-if="item.listTag === 'fc-grid'">
      <div
        class="fc-drage-components-form__container fc-drage-container fc-render-layout-grid"
        :class="{
          'fc-active': item.uniqueKey === getSelectItem.uniqueKey,
        }"
        @click.stop="handleActiveItem"
      >
        <slot></slot>
        <!-- <el-row :gutter="item.gutter || 0" class="fc-render-form-grid-row">
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
              </transition-group>
            </draggable>
          </el-col>
        </el-row> -->
      </div>
    </template>
    <!-- 普通的表单start -->
    <template v-else>
      <div
        :class="{ 'fc-active': item.uniqueKey === getSelectItem.uniqueKey }"
        class="fc-drage-components-form__container fc-drage-container fc-render-form-item"
        @click.stop="handleActiveSelectItem(item)"
      >
        <div
          class="fc-drage-components-form__tools fc-render-form-item__tools"
          :class="{
            'fc-active': item.uniqueKey === getSelectItem.uniqueKey,
            'fc-inactive': item.uniqueKey !== getSelectItem.uniqueKey,
          }"
        >
          <!-- 这里再次点击触发父组件的fc-copy事件 -->
          <i class="el-icon-document-copy" @click.stop="context.emit('fc-on-form-item-copy', true, item)"></i>
          <i class="el-icon-delete"></i>
        </div>
        <div class="fc-drage-components-form__item fc-render-form-item__box">
          <slot></slot>
        </div>
        <div class="fc-drage-components-form__keys" v-text="item.uniqueKey || '暂无key'"></div>
      </div>
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

export default defineComponent<FormItemProps, AnyType>({
  name: "form-create-item-wrapper",
  components: {
    FcRenderFormItem,
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
