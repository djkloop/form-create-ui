<template>
  <div class="fc-drage-move-box" :class="{ 'fc-active': item.uniqueKey === getSelectItem.uniqueKey }">
    <component :is="item.type" :key="item.uniqueKey" :data-key="item.uniqueKey" />
  </div>
</template>

<script lang="ts">
import { defineComponent, toRefs } from "@vue/composition-api";
import { FormItemProps } from "@/interface/components";
import { useGetters } from "@u3u/vue-hooks";
import { AnyType } from "@/interface/common";

export default defineComponent<FormItemProps, AnyType>({
  props: {
    item: {
      type: Object,
    },
  },
  setup() {
    const storeGet = {
      ...useGetters("common", ["getSelectItem"]),
    };

    return {
      ...toRefs(storeGet),
    };
  },
});
</script>

<style lang="scss" scoped>
@import "form.scss";
</style>
