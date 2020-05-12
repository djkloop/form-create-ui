<!--
 * @Author        : djkloop
 * @Date          : 2020-04-27 11:26:48
 * @LastEditors   : djkloop
 * @LastEditTime  : 2020-05-12 18:22:14
 * @Description   : 属性区域
 * @FilePath      : /form-create-ui/src/components/fc-render/form/fc-render-form-grid/index.vue
 -->
<template>
  <div
    class="fc-drage-components-form__container fc-drage-container fc-render-layout-grid"
    :class="{
      'fc-active': item.uniqueKey === getSelectItem.uniqueKey,
    }"
    @click.stop="handleActiveItem"
  >
    <slot name="formItem"></slot>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, toRefs } from "@vue/composition-api";
import { FormItemProps } from "@/interface/components";
import { DeepRequired } from "@/interface/utils.interface";
import { AnyType } from "@/interface/common";
import { handleActiveSelectItem } from "@/components/fc-components-list/fc-components.utils";
import { useGetters } from "@u3u/vue-hooks";

export default defineComponent<
  DeepRequired<DeepRequired<FormItemProps>>,
  AnyType
>({
  name: "fc-render-form-grid",
  props: {
    item: {
      type: Object
    }
  },
  setup(props) {
    const updateTime = ref(0);

    const storeGet = {
      ...useGetters("common", ["getSelectItem"])
    };

    console.log(props.item);

    const handleActiveItem = () => {
      const newTime = new Date().getTime();
      if (newTime - updateTime.value < 400) {
        return;
      }
      updateTime.value = newTime;
      if (props.item) {
        handleActiveSelectItem(props.item);
      }
    };
    return {
      ...toRefs(storeGet),
      handleActiveItem
    };
  }
});
</script>

<style></style>
