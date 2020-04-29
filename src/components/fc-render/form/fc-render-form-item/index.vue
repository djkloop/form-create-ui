<!--
 * @Author        : djkloop
 * @Date          : 2020-04-27 11:15:31
 * @LastEditors   : djkloop
 * @LastEditTime  : 2020-04-29 14:07:29
 * @Description   : 头部注释
 * @FilePath      : /form-create-ui/src/components/fc-render/form/fc-render-form-item/index.vue
 -->
<template>
  <div class="fc-drage-components-form__container fc-drage-container" @click.stop="handleActiveSelectItem(item)">
    <div
      class="fc-drage-components-form__tools fc-render-form-item__tools"
      :class="{ 'fc-active': item.uniqueKey === getSelectItem.uniqueKey }"
    >
      <i class="el-icon-document-copy" @click.stop="context.emit('fc-on-form-item-copy', true, item)"></i>
      <i class="el-icon-delete"></i>
    </div>
    <div class="fc-drage-components-form__item fc-render-form-item__box">
      <component
        :is="item.tag"
        :key="item.uniqueKey"
        :data-key="item.uniqueKey"
        :type="item.attrs && item.attrs.type"
      />
    </div>
    <div class="fc-drage-components-form__keys" v-text="item.uniqueKey || '暂无key'"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent, toRefs } from "@vue/composition-api";
import { useGetters } from "@u3u/vue-hooks";
import { handleActiveSelectItem } from "@/components/fc-components-list/fc-components.utils";

export default defineComponent({
  name: "fc-render-form-item",
  props: {
    item: {
      type: Object,
    },
  },
  setup(props, context) {
    const storeGet = {
      ...useGetters("common", ["getSelectItem"]),
    };
    return {
      context,
      handleActiveSelectItem,
      ...toRefs(storeGet),
    };
  },
});
</script>

<style lang="scss" scoped>
@import "../form.scss";
</style>
