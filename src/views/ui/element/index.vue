<!--
 * @Author       : djkloop
 * @Date         : 2020-04-24 23:25:04
 * @LastEditors  : djkloop
 * @LastEditTime : 2020-05-08 23:20:32
 * @Description  : 主区域
 * @FilePath     : /form-create-ui/src/views/ui/element/index.vue
 -->
<template>
  <div class="fc-main fc-main-element">
    <h1 class="no-fc-item" v-show="baseList.length === 0">
      从左侧控件列表添加
    </h1>
    <!-- fc-transfer-panel -->
    <!-- <div class="fc-main-draggable-box">
      <form-create v-model="formInstance" :rule="formRules" :option="formOptions" />
    </div> -->
    <!-- <draggable
        class="fc-main-draggable-box"
        tag="div"
        v-bind="draggableOptions"
        @add="handleAddItem"
        v-model="baseList"
      >
        <transition-group tag="div" type="transition" class="fc-main-draggable-box-transition" name="fc-drage-list">
          <form-item
            class="fc-drage-move"
            v-for="record in baseList"
            :item="record"
            :key="record.uniqueKey + '__item__parent'"
            @fc-add-col-item="handleColAdd"
            @fc-drage-start="handleAddItem"
            @fc-copy-form-item="handleCopyItem"
          />
        </transition-group>
      </draggable> -->
    <!-- </form-create> -->
    <form-create
      v-model="formInstance"
      class="fc-main-draggable-box"
      :rule="formRules"
      :option="formOptions"
      @fc-add-col-item="handleColAdd"
      @fc-drage-start="handleAddItem"
      @fc-copy-form-item="handleCopyItem"
    />
    <!-- <draggable
      class="fc-main-draggable-box"
      tag="div"
      v-bind="draggableOptions"
      @add="handleAddItem"
      v-model="baseList"
    >
      <transition-group tag="div" type="transition" class="fc-main-draggable-box-transition" name="fc-drage-list">
        <form-item
          class="fc-drage-move"
          v-for="record in baseList"
          :item="record"
          :key="record.uniqueKey + '__item__parent'"
          @fc-add-col-item="handleColAdd"
          @fc-drage-start="handleAddItem"
          @fc-copy-form-item="handleCopyItem"
        />
      </transition-group>
    </draggable> -->
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, toRefs, reactive, watch } from "@vue/composition-api";
import { useToast } from "vue-toastification/composition";
import { useGetters } from "@u3u/vue-hooks";
import { AnyType } from "@/interface/common";
import { ComponentsItem } from "@/interface/components";
import { setClickHandleItem, handleColAdd } from "@/components/fc-components-list/fc-components.utils";
import FormItem from "@/components/fc-render/form/form.vue";
import config from "@/configs/config";
import cloneDeep from "lodash.clonedeep";

export default defineComponent({
  components: {
    FormItem,
  },
  setup() {
    const toast = useToast();
    /// 默认的mainList
    const baseList = ref<ComponentsItem[]>([]);
    const draggableOptions = ref({
      group: "fc-draggable",
      ghostClass: "fc-drage-moving",
      animation: 180,
      handle: ".fc-drage-move",
    });
    const formCreateState = reactive({
      formInstance: {},
      formRules: [
        {
          type: "draggable",
          props: {
            list: baseList.value,
            ...draggableOptions.value,
            tag: "div",
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

    watch(
      () => baseList,
      (n, o) => {
        console.log("watch", n, o);
      },
      {
        deep: true,
      }
    );

    const storeGetters = reactive({
      ...useGetters("common", ["getMainList", "getSelectItem"]),
    });

    /// 复制方法 - 回调方式
    /// 也可以放在fc-components.utils里面
    /// 可以看到vue3.x 灵活性极大的提高了
    const handleCopyItem = (isCopy: boolean, item: ComponentsItem) => {
      /// TODO: 这里用的递归, 有什么优化好办法?
      console.log("copy----", isCopy, item);
      debugger;
      const traverse = (array: Partial<ComponentsItem>[]) => {
        for (let index = 0; index < array.length; index++) {
          const element = array[index];
          if (element.uniqueKey === storeGetters.getSelectItem.uniqueKey) {
            if (isCopy) {
              // 复制添加到选择节点后面
              // 这里建议深拷贝一下因为后面修改uniquekey的时候有可能会冲突
              array.splice(index + 1, 0, cloneDeep(element));
            } else {
              // 双击添加到选择节点后面
              array.splice(index + 1, 0, item);
            }
            const e = {
              newIndex: index + 1,
            };
            handleColAdd(e, array, true);
            break;
          }
          if (element.tag === "fc-grid") {
            // 栅格布局
            if (typeof element.children !== "undefined") {
              element.children.forEach(item => {
                if (typeof item.children !== "undefined") {
                  traverse(item!.children);
                }
              });
            }
          }
        }
      };
      traverse(baseList.value);
    };

    const handleAddItem = (e: AnyType, item: ComponentsItem, isNew = true) => {
      console.log(e, item, isNew);
      /// 父级调用的时候没有e属性
      if (!e) {
        if (config.disabledConfigComponents.includes(item.tag)) {
          toast.error(`暂时不支持 ${item.tag.toUpperCase()} 组件...`);
          return;
        }
        setClickHandleItem(item, baseList.value, handleCopyItem, formCreateState.formInstance);
      } else {
        console.log(baseList.value);
        const idx = isNew ? e.newIndex : e.oldIndex;
        const item = baseList.value[idx];
        if (!item) {
          toast.error(`不存在`);
          return;
        }
        if (config.disabledConfigComponents.includes(item.tag)) {
          toast.error(`暂时不支持 ${item.tag.toUpperCase()} 组件...`);
          return;
        }
        /// 拖拽
        setClickHandleItem(item, baseList.value, undefined);
      }
    };

    const fcContainerClick = (e: AnyType) => {
      console.log(`fc-container-click`);
      const fItem = e.inject[0];
      fItem.updateActive();
    };

    return {
      draggableOptions,
      handleAddItem,
      handleColAdd,
      baseList,
      handleCopyItem,
      ...toRefs(storeGetters),
      ...toRefs(formCreateState),
      fcContainerClick,
    };
  },
});
</script>

<style lang="scss">
@import "ui-element.scss";
</style>
