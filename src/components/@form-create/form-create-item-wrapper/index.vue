<!--
 * @Author       : djkloop
 * @Date         : 2020-05-08 21:59:28
 * @LastEditors  : djkloop
 * @LastEditTime : 2020-05-08 22:45:04
 * @Description  : 用来包裹form-create-item外层的组件（使用自定义组件）
 * @FilePath     : /form-create-ui/src/components/@form-create/form-create-item-wrapper/index.vue
 -->
<template>
  <!-- 最外层的wrapper -->
  <div class="fc-drage-move-box fc-drage-move">
    <!-- fc-drage-components-form__container fc-drage-container fc-render-form-item -->
    <div class="fc-drage-components-form__container fc-drage-container fc-render-form-item">
      <div
        class="fc-drage-components-form__tools fc-render-form-item__tools"
        :class="{
          'fc-active': item.uniqueKey === getSelectItem.uniqueKey,
          'fc-inactive': item.uniqueKey !== getSelectItem.uniqueKey,
        }"
      >
        <i class="el-icon-document-copy" @click.stop="context.emit('fc-on-form-item-copy', true, item)"></i>
        <i class="el-icon-delete"></i>
      </div>
      <div class="fc-drage-components-form__item fc-render-form-item__box">
        <!-- 这个地方应该是form-item -->
        <slot></slot>
      </div>
      <div class="fc-drage-components-form__keys" v-text="item.uniqueKey || '暂无key'"></div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, toRefs } from "@vue/composition-api";
import { useGetters } from "@u3u/vue-hooks";

export default defineComponent({
  name: "form-create-item-wrapper",
  props: {
    item: {
      type: Object,
    },
  },
  setup(context) {
    const storeGet = {
      ...useGetters("common", ["getSelectItem"]),
    };

    console.log(context.item);

    return {
      context,
      ...toRefs(storeGet),
    };
  },
});
</script>

<style></style>
