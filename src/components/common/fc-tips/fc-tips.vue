<!--
 * @Author       : djkloop
 * @Date         : 2020-05-01 16:36:53
 * @LastEditors  : djkloop
 * @LastEditTime : 2020-05-01 16:46:28
 * @Description  : fc-tips
 * @FilePath     : /form-create-ui/src/components/common/fc-tips/fc-tips.vue
 -->

<template>
  <el-alert type="warning" show-icon>
    <div slot="title">
      查看详细文档&nbsp;&nbsp;
      <strong class="fc-tips-href">
        <i class="el-icon-link"></i>
        <a :href="docsUrl" target="__blank">{{ title }}</a>
      </strong>
    </div>
  </el-alert>
</template>

<script lang="ts">
import { defineComponent } from "@vue/composition-api";
export default defineComponent({
  name: "fc-tips",
  props: {
    title: {
      type: String,
      default: "暂无描述",
    },
    docsUrl: {
      type: String,
      default: "",
    },
  },
});
</script>

<style></style>
