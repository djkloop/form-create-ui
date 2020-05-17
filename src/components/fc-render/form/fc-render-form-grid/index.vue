<!--
 * @Author        : djkloop
 * @Date          : 2020-04-27 11:26:48
 * @LastEditors  : djkloop
 * @LastEditTime : 2020-05-17 12:20:47
 * @Description   : 属性区域
 * @FilePath     : /form-create-ui/src/components/fc-render/form/fc-render-form-grid/index.vue
 -->
<template>
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
          <transition-group tag="div" type="transition" class="fc-main-draggable-box-transition" name="fc-drage-list">
            <form-create-item-wrapper
              class="fc-drage-move"
              :item="col.children[0]"
              :data-item="JSON.stringify(col)"
              :data-key="col.children[0].uniqueKey"
              v-for="col in it.children"
              :key="col.children[0].uniqueKey + '__col__item__parent'"
              @fc-add-col-item="handleColAdd"
              @fc-copy-form-item="handleCopyItem"
            >
              <slot></slot>
            </form-create-item-wrapper>
          </transition-group>
        </draggable>
      </el-col>
    </el-row> -->
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, toRefs } from "@vue/composition-api";
import { FormItemProps, ComponentsItem } from "@/interface/components";
import { DeepRequired } from "@/interface/utils.interface";
import { AnyType } from "@/interface/common";
import { handleActiveSelectItem } from "@/components/fc-components-list/fc-components.utils";
import { useGetters } from "@u3u/vue-hooks";

export default defineComponent<DeepRequired<DeepRequired<FormItemProps>>, AnyType>({
  name: "fc-render-form-grid",
  props: {
    item: {
      type: Object,
    },
  },
  setup(props, { emit }) {
    const updateTime = ref(0);

    const storeGet = {
      ...useGetters("common", ["getSelectItem"]),
    };

    console.log(props.item, " ooooooo");

    const handleColAdd = (e: AnyType, list: ComponentsItem[], isc: boolean, isn: boolean) =>
      emit("add-col-item", e, list, isc, isn);

    const handleCopyItem = (isCopy: boolean, item: ComponentsItem) => emit("copy-form-item", isCopy, item);

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
      handleActiveItem,
      handleColAdd,
      handleCopyItem,
    };
  },
});
</script>

<style></style>
