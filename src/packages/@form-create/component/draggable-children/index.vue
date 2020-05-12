<!--
 * @Author        : djkloop
 * @Date          : 2020-05-12 12:32:44
 * @LastEditors   : djkloop
 * @LastEditTime  : 2020-05-12 16:27:29
 * @Description   : 头部注释
 * @FilePath      : /form-create-ui/src/packages/@form-create/component/draggable-children/index.vue
 -->
<template>
  <draggable
    tag="div"
    class="fc-main-draggable-box"
    v-bind="{
      group: 'fc-draggable',
      ghostClass: 'fc-drage-moving',
      animation: 180,
      handle: '.fc-drage-move',
    }"
    v-model="item.children"
    @start="$emit('drage-start', $event, item.children)"
    @add="$emit('add-col-item', $event, item.children)"
  >
    <transition-group
      tag="div"
      type="transition"
      class="fc-main-draggable-box-transition"
      name="fc-drage-list"
    >
      <slot></slot>
    </transition-group>
  </draggable>
</template>

<script lang="ts">
import { defineComponent } from "@vue/composition-api";
export default defineComponent({
  name: "fc-draggable-children",
  props: {
    item: {
      type: Object
    }
  }
});
</script>

<style></style>
