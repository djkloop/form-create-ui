<!--
 * @Author       : djkloop
 * @Date         : 2020-04-24 23:25:04
 * @LastEditors  : djkloop
 * @LastEditTime : 2020-05-16 16:56:51
 * @Description  : 主区域
 * @FilePath     : /form-create-ui/src/views/ui/element/index.vue
 -->
<template>
  <div class="fc-main fc-main-element">
    <h1 class="no-fc-item" v-show="baseList.length === 0">
      从左侧控件列表添加
    </h1>
    <form-create
      v-model="formInstance"
      class="fc-main-draggable-box"
      :rule="formRules"
      :option="formOptions"
      @fc-add-col-item="handleColAdd"
      @fc-drage-start="handleAddItem"
      @fc-copy-form-item="useCopyItem"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, toRefs, reactive, watch } from "@vue/composition-api";
import { useToast } from "vue-toastification/composition";
import { useGetters } from "@u3u/vue-hooks";
import { AnyType } from "@/interface/common";
import { ComponentsItem, IDraggableComponentsItem } from "@/interface/components";
import {
  setClickHandleItem,
  handleColAdd,
  useMainAddItem,
  useColAdd,
} from "@/components/fc-components-list/fc-components.utils";
import FormItem from "@/components/fc-render/form/form.vue";
import config from "@/configs/config";
import cloneDeep from "lodash.clonedeep";

export default defineComponent({
  name: "fc-draggable-form",
  components: {
    FormItem,
  },
  setup() {
    const toast = useToast();
    /// 主区域的列表数据
    const baseList = ref<IDraggableComponentsItem[]>([]);
    const draggableOptions = ref({
      group: "fc-draggable",
      ghostClass: "fc-drage-moving",
      animation: 180,
      handle: ".fc-drage-move",
    });

    const storeGetters = reactive({
      ...useGetters("common", ["getMainList", "getSelectItem"]),
    });

    // watch(
    //   () => baseList.value,
    //   (n, o) => {
    //     console.log("watch::", n, o);
    //   },
    //   {
    //     deep: true,
    //     lazy: true,
    //   }
    // );

    /// 复制方法 - 回调方式
    const useCopyItem = (isCopy: boolean, item: IDraggableComponentsItem) => {
      /// 这个方法用于在主区域如果有item并且被激活状态
      /// 需要在它的下面在生成一个item
      const traverse = (array: IDraggableComponentsItem[]) => {
        for (let index = 0; index < array.length; index++) {
          const element = array[index];
          /// 拿到组件的key
          const key = element.children![0].uniqueKey;
          if (key === storeGetters.getSelectItem.uniqueKey) {
            if (isCopy) {
              // 复制添加到选择节点后面
              // 这里建议深拷贝一下因为后面修改uniquekey的时候有可能会冲突
              array.splice(index + 1, 0, cloneDeep(element));
            } else {
              // 点击的时候添加到选择节点后面
              array.splice(index + 1, 0, item);
            }
            const e = {
              newIndex: index + 1,
            };
            useColAdd(void 0, e, array, true);
            break;
          }
          // if (element.listTag === "fc-grid") {
          //   // 栅格布局
          //   if (typeof element.children !== "undefined") {
          //     element.children.forEach(item => {
          //       if (typeof item.children !== "undefined") {
          //         traverse(item.children);
          //       }
          //     });
          //   }
          // }
        }
      };
      traverse(baseList.value);
    };

    /// 左侧点击/拖拽进入主区域的时候会触发这个事件
    const handleAddItem = (e: AnyType, item?: ComponentsItem, isNew = true) => {
      /// 父级调用ref触发这个if
      if (!e && item) {
        /// 这里有个回调函数
        useMainAddItem(item, baseList.value, useCopyItem);
      } else {
        const idx = e.newIndex;
        const item = baseList.value[idx];
        console.log(item, "           -------------");
        console.log(baseList, "           -------------");
        console.log(idx, "           -------------");
        if (!item) {
          toast.error(`不存在`);
          return;
        }
        if (config.disabledConfigComponents.includes(item.type)) {
          toast.error(`暂时不支持 ${item.type.toUpperCase()} 组件...`);
          return;
        }
        /// 拖拽
        setClickHandleItem(item, baseList.value, void 0, idx);
      }
    };

    const formCreateState = reactive({
      formInstance: {},
      formRules: [
        {
          type: "draggable",
          props: {
            list: baseList.value,
            tag: "div",
          },
          attrs: {
            ...draggableOptions.value,
          },
          class: "fc-main-draggable-box",
          children: [
            {
              type: "transition-group",
              props: {
                name: "fc-drage-list",
                tag: "div",
              },
              class: "fc-main-draggable-box-transition",
              children: baseList.value,
              native: true,
            },
          ],
          on: {
            add: ($f: AnyType, e: AnyType) => handleAddItem(e, void 0, true),
          },
          native: true,
        },
      ],
      formOptions: {
        submitBtn: false,
        injectEvent: true,
        form: {
          col: false,
        },
      },
    });

    return {
      draggableOptions,
      handleAddItem,
      handleColAdd,
      baseList,
      useCopyItem,
      ...toRefs(storeGetters),
      ...toRefs(formCreateState),
    };
  },
});
</script>

<style lang="scss">
@import "ui-element.scss";
</style>
