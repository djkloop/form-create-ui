<!--
 * @Author       : djkloop
 * @Date         : 2020-04-24 23:25:04
 * @LastEditors  : djkloop
 * @LastEditTime : 2020-05-01 16:04:59
 * @Description  : 右侧属性区域
 * @FilePath     : /form-create-ui/src/components/fc-components-props/index.vue
 -->
<template>
  <div class="fc-aside-props">
    <el-drawer title="全局表单属性" custom-class="fc-aside-props__drawer" :visible.sync="drawer" direction="ttb">
      <div>全局表单属性</div>
    </el-drawer>
    <el-button plain class="fc-aside-props__form_btn" @click="() => (this.drawer = !drawer)"
      >设置全局表单属性</el-button
    >
    <el-tabs class="fc-aside-props-tab" v-model="activeName">
      <el-tab-pane label="组件属性" name="props-item">
        <div class="no-fc-item" v-show="!storeGetters.getSelectItem.uniqueKey">暂无组件</div>
      </el-tab-pane>
      <el-tab-pane label="组件样式" name="props-style">组件样式</el-tab-pane>
    </el-tabs>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, toRefs } from "@vue/composition-api";
import { useGetters } from "@u3u/vue-hooks";
export default defineComponent({
  name: "fc-aside-props",
  setup() {
    const activeName = ref("props-item");
    const state = reactive({ drawer: false });
    const storeGetters = reactive({
      ...useGetters("common", ["getSelectItem"]),
    });

    console.log("setup");
    return {
      activeName,
      storeGetters,
      ...toRefs(state),
    };
  },
});
</script>

<style lang="scss">
@import "fc-aside-props.module.scss";
</style>
