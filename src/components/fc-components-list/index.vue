<template>
  <div class="fc-container-box">
    <el-menu>
      <template v-if="loading && list.length === 0">
        正在加载...
      </template>
      <template v-else>
        <el-submenu index="1" v-for="item in list" :key="item.type">
          <template slot="title">
            <i class="el-icon-location"></i>
            <span>{{ item.label }}</span>
          </template>
        </el-submenu>
      </template>
    </el-menu>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from "@vue/composition-api";
import { IFcComponentsListState } from "@/interface/components";
import fetchServerList from "./use-server-list";
export default defineComponent({
  name: "fc-components-list",
  setup() {
    const state = reactive<IFcComponentsListState>({
      list: [],
      loading: true
    });
    /// 拿到左侧列表
    fetchServerList(state);

    return {
      ...toRefs(state)
    };
  }
});
</script>

<style></style>
