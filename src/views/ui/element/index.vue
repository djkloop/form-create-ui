<!--
 * @Author       : djkloop
 * @Date         : 2020-04-24 23:25:04
 * @LastEditors   : djkloop
 * @LastEditTime  : 2020-04-28 16:25:00
 * @Description  : 主区域
 * @FilePath      : /form-create-ui/src/views/ui/element/index.vue
 -->
<template>
  <div class="fc-main fc-main-element">
    <h1 class="no-fc-item" v-show="baseList.length === 0">
      从左侧控件列表添加
    </h1>
    <!-- fc-transfer-panel -->
    <draggable
      class="fc-main-draggable-box"
      tag="div"
      v-bind="draggableOptions"
      @add="handleAddItem"
      v-model="baseList"
    >
      <!-- fc-item -->
      <transition-group tag="div" type="transition" class="fc-main-draggable-box-transition" name="flip-list">
        <form-item
          class="fc-drage-move"
          v-for="record in baseList"
          :item="record"
          :key="record.uniqueKey + '__item__parent'"
          @fc-copy-item="handleCopyItem"
          @fc-add-col-item="handleColAdd"
          @fc-drage-start="handleAddItem"
        />
      </transition-group>
    </draggable>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, toRefs, reactive } from "@vue/composition-api";
import draggable from "vuedraggable";
import { useGetters } from "@u3u/vue-hooks";
import { AnyType } from "@/interface/common";
import { ComponentsItem } from "@/interface/components";
import { setClickHandleItem, handleColAdd } from "@/components/fc-components-list/fc-components.utils";

/// form item
import FormItem from "@/components/fc-render/form/form.vue";
import config from "@/configs/config";

export default defineComponent({
  components: {
    draggable,
    FormItem,
  },
  setup(_, ctx) {
    /// 默认的mainList
    const baseList = reactive<ComponentsItem[]>([]);

    const draggableOptions = ref({
      group: "fc-draggable",
      ghostClass: "ghost",
      animation: 300,
      handle: ".fc-drage-move",
    });

    const storeGetters = reactive({
      ...useGetters("common", ["getMainList", "getSelectItem"]),
    });

    /// 复制方法 - 回调方式
    /// 也可以放在fc-components.utils里面
    /// 可以看到vue3.x 灵活性极大的提高了
    const handleCopyItem = (isCopy: boolean, item: ComponentsItem) => {
      /// TODO: 这里用的递归, 有什么优化好办法?
      console.log("copy-------", isCopy);
      const traverse = (array: ComponentsItem[]) => {
        for (let index = 0; index < array.length; index++) {
          const element = array[index];
          if (element.uniqueKey === storeGetters.getSelectItem.uniqueKey) {
            if (isCopy) {
              // 复制添加到选择节点后面
              array.splice(index + 1, 0, element);
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
        }
      };
      traverse(baseList);
    };

    const handleAddItem = (e: AnyType, item: ComponentsItem, isNew = true) => {
      /// 父级调用的时候没有e属性
      console.log("add-------", item);
      if (!e) {
        console.log("add-----------1");
        if (config.disabledConfigComponents.includes(item.tag)) {
          ctx.root.$toast.error(`暂时不支持 ${item.tag.toUpperCase()} 组件...`);
          return;
        }
        setClickHandleItem(item, baseList, handleCopyItem);
      } else {
        const idx = isNew ? e.newIndex : e.oldIndex;
        const item = baseList[idx];
        console.log("add-----------2");
        if (config.disabledConfigComponents.includes(item.tag)) {
          ctx.root.$toast.error(`暂时不支持 ${item.tag.toUpperCase()} 组件...`);
          return;
        }
        /// 拖拽
        setClickHandleItem(item, baseList, undefined);
      }
    };

    return {
      draggableOptions,
      handleAddItem,
      handleColAdd,
      baseList,
      handleCopyItem,
      ...toRefs(storeGetters),
    };
  },
});
</script>
<style lang="scss">
.flip-list-move {
  transition: transform 0.5s;
}
.no-move {
  transition: transform 0s;
}
.ghost {
  opacity: 0.3;
}

.fc-drage-move {
  cursor: move;
}
.fc-drage-move {
  cursor: pointer;
}
</style>

<style lang="scss" scoped>
@import "ui-element.scss";
</style>
