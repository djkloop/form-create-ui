<template>
  <div class="fc-container-box">
    <el-menu>
      <template v-if="loading">
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
import axios, { AxiosResponse } from "axios";
import {
  ComponentsResult,
  IFcComponentsListState
} from "@/interface/components";
import { ResponseHandle } from "@/interface/response";
export default defineComponent({
  name: "fc-components-list",
  setup() {
    const state = reactive<IFcComponentsListState>({
      list: [],
      loading: true
    });

    async function fetchServerList() {
      const result = await axios.get<
        never,
        AxiosResponse<ResponseHandle<ComponentsResult>>
      >("/api/getComponentsList");
      if (result.data.code === 0) {
        state.list = result.data.result.list;
      } else {
        state.loading = true;
      }
    }

    fetchServerList();

    return {
      ...toRefs(state)
    };
  }
});
</script>

<style></style>
