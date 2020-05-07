<!--
 * @Author        : djkloop
 * @Date          : 2020-04-26 11:45:07
 * @LastEditors   : djkloop
 * @LastEditTime  : 2020-05-07 18:34:16
 * @Description   : 头部注释
 * @FilePath      : /form-create-ui/src/components/fc-components-list/index.vue
 -->

<template>
  <div class="fc-container-box">
    <template v-if="loading && list.length === 0">正在加载...</template>
    <template v-else>
      <el-collapse v-model="defaultActive" class="fc-container-box__collapse">
        <el-collapse-item :title="key" :name="key" v-for="(item, key) in filterData" :key="key">
          <div class="fc-container-box__collapse__box">
            <!-- 拖拽组件 -->
            <draggable tag="ul" :value="item" v-bind="draggableOptions" @start="setType($event, item, key)">
              <li
                :class="
                  !cfgs.disabledConfigComponents.includes(it.tag)
                    ? 'fc-drage-component-item'
                    : 'fc-drage-component-item__disabled'
                "
                v-for="(it, idx) in item"
                @click="setClickItem(it)"
                :title="cfgs.disabledConfigComponents.includes(it.tag) && '暂不支持当前组件'"
                :key="it.label"
                @dragstart="genKey(item, idx)"
              >
                <i :class="it.listIcon"></i>
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
import { defineComponent, reactive, toRefs, ref } from "@vue/composition-api";
import draggable from "vuedraggable";
import { IFcComponentsListState, ComponentsItem } from "@/interface/components";
import { AnyType } from "@/interface/common";
import fetchServerList from "./use-server-list";
/// 代替以前的methods
/// TODO: 这里可以优化的更好
import { generateUniqueKey, setChooseType } from "./fc-components.utils";
import configs from "@/configs/config";

export default defineComponent({
  name: "fc-components-list",
  components: {
    draggable,
  },
  setup(_, ctx) {
    const state = reactive<IFcComponentsListState>({
      list: [],
      tags: [],
      chooseType: "",
      loading: true,
      defaultActive: ["基础组件", "布局组件"],
      filterData: {},
      cacheData: {},
      selectCurrentItem: {},
      draggableOptions: {
        group: { name: "fc-draggable", pull: "clone", put: false },
        sort: false,
        animation: 180,
        draggable: ".fc-drage-component-item",
        ghostClass: "moving",
      },
    });
    const cfgs = ref(configs);

    /// 拿到左侧列表
    fetchServerList(state);
    /// 生成uniqukey
    const genKey = (list: ComponentsItem[], idx: number) => generateUniqueKey(state, idx, list);
    /// 设置当前选中的type
    const setType = (e: AnyType, item: ComponentsItem[]) => setChooseType(e, state, item);
    /// 设置click的item
    /// setClickHandleItem(it, state);
    const setClickItem = (it: ComponentsItem) => ctx.emit("fc-click-item", it);

    return {
      ...toRefs(state),
      cfgs,
      genKey,
      setType,
      setClickItem,
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
