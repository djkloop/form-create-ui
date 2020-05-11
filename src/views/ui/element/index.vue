<!--
 * @Author       : djkloop
 * @Date         : 2020-04-24 23:25:04
 * @LastEditors   : djkloop
 * @LastEditTime  : 2020-05-11 14:23:20
 * @Description  : 主区域
 * @FilePath      : /form-create-ui/src/views/ui/element/index.vue
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
    <!-- 这里有三个emit事件 -->
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

    const storeGetters = reactive({
      ...useGetters("common", ["getMainList", "getSelectItem"]),
    });

    watch(
      () => baseList.value,
      (n, o) => {
        console.log(n, o);
      },
      {
        deep: true,
        lazy: true,
      }
    );

    /// 复制方法 - 回调方式
    /// 也可以放在fc-components.utils里面
    /// 可以看到vue3.x 灵活性极大的提高了
    const handleCopyItem = (isCopy: boolean, item: ComponentsItem) => {
      /// TODO: 这里用的递归, 有什么优化好办法?
      const traverse = (array: Partial<ComponentsItem>[]) => {
        for (let index = 0; index < array.length; index++) {
          const element = array[index];
          /// 拿到组件的key
          const key = element.children![0].uniqueKey;
          console.log(key, storeGetters.getSelectItem.uniqueKey);
          if (key === storeGetters.getSelectItem.uniqueKey) {
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
              element.children.forEach((item) => {
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

    const handleAddItem = (e: AnyType, item?: ComponentsItem, isNew = true) => {
      /// 父级调用的时候没有e属性
      if (!e && item) {
        if (config.disabledConfigComponents.includes(item.tag)) {
          toast.error(`暂时不支持 ${item.tag.toUpperCase()} 组件...`);
          return;
        }
        setClickHandleItem(item, baseList.value, handleCopyItem);
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
      handleCopyItem,
      ...toRefs(storeGetters),
      ...toRefs(formCreateState),
    };
  },
});
</script>

<style lang="scss">
@import "ui-element.scss";
</style>
