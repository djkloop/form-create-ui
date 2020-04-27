<!--
 * @Author        : djkloop
 * @Date          : 2020-04-27 11:26:48
 * @LastEditors   : djkloop
 * @LastEditTime  : 2020-04-27 16:15:55
 * @Description   : 头部注释
 * @FilePath      : /form-create-ui/src/components/fc-render/form/fc-render-form-grid/index.vue
 -->
<template>
  <div>
    1
  </div>
</template>

<script lang="ts">
import { defineComponent } from "@vue/composition-api";
import { FormItemProps } from "@/interface/components";
import { DeepRequired } from "@/interface/utils.interface";
import { AnyType } from "@/interface/common";

export default defineComponent<DeepRequired<DeepRequired<FormItemProps>>, AnyType>({
  name: "fc-render-form-grid",
  props: {
    item: {
      type: Object,
    },
  },
  setup(props) {
    console.log(props.item.options.gutter);
  },
});
</script>

<style></style>
