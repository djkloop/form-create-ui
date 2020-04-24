<template>
  <div>
    <el-menu>
      <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>导航一</span>
        </template>
      </el-submenu>
    </el-menu>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, computed } from "@vue/composition-api";
import { ComponentsItem } from "@/interface/components";
import useServerList from "./use-server-list";
export default defineComponent({
  name: "fc-components-list",
  setup() {
    // let list: ComponentsItem[] = reactive([]);
    useServerList();
    // console.log(list);
    // if (result.data.code === 0) {
    //   console.log("ok");
    //   list = results.data.result.list;
    // }

    return {
      // list
    };
  }
});
</script>

<style></style>
