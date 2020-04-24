<template>
  <div class="fc-container-box">
    <template v-if="loading && list.length === 0">正在加载...</template>
    <template v-else>
      <el-collapse v-model="defaultActive" class="fc-container-box__collapse">
        <el-collapse-item
          :title="key"
          :name="key"
          v-for="(item, key) in filterData"
          :key="key"
        >
          <div class="fc-container-box__collapse__box">
            <!-- 拖拽组件 -->
            <draggable tag="ul" :value="item">
              <li
                v-for="(it, idx) in item"
                :key="it.label"
                @dragstart="generateUniqueKey(item, idx)"
              >
                <i :class="it.icon"></i>
                {{ it.label }}
              </li>
            </draggable>
          </div>
        </el-collapse-item>
      </el-collapse>
    </template>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from "@vue/composition-api";
import draggable from "vuedraggable";
import { IFcComponentsListState } from "@/interface/components";
import { generateUniqueKey } from "./fc-components.utils";
import fetchServerList from "./use-server-list";
export default defineComponent({
  name: "fc-components-list",
  components: {
    draggable,
  },
  setup() {
    const state = reactive<IFcComponentsListState>({
      list: [],
      tags: [],
      loading: true,
      defaultActive: ["基础组件", "布局组件"],
      filterData: {},
    });
    /// 拿到左侧列表
    fetchServerList(state);

    return {
      ...toRefs(state),
      generateUniqueKey,
    };
  },
});
</script>

<style lang="scss">
.el-collapse-item__content {
  padding-bottom: 10px !important;
}
.el-collapse-item__header {
  padding: 0 20px;
}
</style>

<style lang="scss" scoped>
@import "fc-components-list.scss";
</style>
