<!--
 * @Author        : djkloop
 * @Date          : 2020-04-26 11:45:07
 * @LastEditors   : djkloop
 * @LastEditTime  : 2020-04-26 15:03:57
 * @Description   : form-item
 * @FilePath      : /form-create-ui/src/components/fc-render/form/form.vue
 -->
<template>
  <div
    class="fc-drage-move-box"
    :class="{ 'fc-active': item.uniqueKey === getSelectItem.uniqueKey }"
    @click.stop="handleActiveItem"
  >
    <div class="fc-drage-components-form__container fc-drage-container">
      <div class="fc-drage-components-form__tools" :class="{ 'fc-active': item.uniqueKey === getSelectItem.uniqueKey }">
        <i class="el-icon-document-copy" @click.stop="handleCopyItem(item)"></i>
        <i class="el-icon-delete"></i>
      </div>
      <div class="fc-drage-components-form__item">
        <component :is="item.tag" :key="item.uniqueKey" :data-key="item.uniqueKey" :type="item.attrs.type" />
      </div>
      <div class="fc-drage-components-form__keys" v-text="item.uniqueKey || '暂无key'"></div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, toRefs, ref } from "@vue/composition-api";
import { FormItemProps, ComponentsItem } from "@/interface/components";
import { useGetters, useMutations } from "@u3u/vue-hooks";
import { AnyType } from "@/interface/common";

export default defineComponent<FormItemProps, AnyType>({
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

    const storeMutations = {
      ...useMutations("common", ["setCurrentItem"]),
    };

    const handleActiveItem = () => {
      const newTime = new Date().getTime();
      if (newTime - updateTime.value < 400) {
        return;
      }
      updateTime.value = newTime;

      storeMutations.setCurrentItem(props.item);
    };

    const handleCopyItem = (isCopy: boolean, item: ComponentsItem) => ctx.emit("copy-item", ...[isCopy, item]);

    return {
      ...toRefs(storeGet),
      updateTime,
      handleActiveItem,
      handleCopyItem,
    };
  },
});
</script>

<style lang="scss" scoped>
@import "form.scss";
</style>
