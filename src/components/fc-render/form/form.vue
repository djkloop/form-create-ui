<template>
  <div
    class="fc-drage-move-box"
    :class="{ 'fc-active': item.uniqueKey === getSelectItem.uniqueKey }"
    @click.stop="handleActiveItem"
  >
    <component :is="item.type" :key="item.uniqueKey" :data-key="item.uniqueKey" />
  </div>
</template>

<script lang="ts">
import { defineComponent, toRefs, ref } from "@vue/composition-api";
import { FormItemProps } from "@/interface/components";
import { useGetters, useMutations } from "@u3u/vue-hooks";
import { AnyType } from "@/interface/common";

export default defineComponent<FormItemProps, AnyType>({
  props: {
    item: {
      type: Object,
    },
  },
  setup(props) {
    const updateTime = ref(0);

    const storeGet = {
      ...useGetters("common", ["getSelectItem"]),
    };

    const storeMutations = {
      ...useMutations("common", ["setCurrentItem"]),
    };

    const handleActiveItem = () => {
      const newTime = new Date().getTime();
      if (newTime - updateTime.value < 100) {
        return;
      }

      storeMutations.setCurrentItem(props.item);
    };

    return {
      ...toRefs(storeGet),
      updateTime,
      handleActiveItem,
    };
  },
});
</script>

<style lang="scss" scoped>
@import "form.scss";
</style>
