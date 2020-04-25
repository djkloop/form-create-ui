<template>
  <div
    class="fc-drage-move-box"
    :class="{ 'fc-active': item.uniqueKey === getSelectItem.uniqueKey }"
    @click.stop="handleActiveItem"
  >
    <div class="fc-drage-components-form__container fc-drage-container">
      <div class="fc-drage-components-form__tools" v-if="item.uniqueKey === getSelectItem.uniqueKey">
        <i class="el-icon-document-copy"></i>
        <i class="el-icon-delete"></i>
      </div>
      <div class="fc-drage-components-form__item">
        <component :is="item.type" :key="item.uniqueKey" :data-key="item.uniqueKey" />
      </div>
      <div class="fc-drage-components-form__keys" v-text="item.uniqueKey || '暂无key'"></div>
    </div>
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
        ctx.root.$toast.warning("您点击的太快了~400毫秒内只能点击一次呦~", {
          timeout: 5000,
        });
        return;
      }
      updateTime.value = newTime;

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
