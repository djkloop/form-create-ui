/*
 * @Author       : djkloop
 * @Date         : 2020-04-25 01:21:14
 * @LastEditors   : djkloop
 * @LastEditTime  : 2020-04-28 16:53:55
 * @Description  : fc-components工具方法(用来替代vue2中的methods的)
 * @FilePath      : /form-create-ui/src/components/fc-components-list/fc-components.utils.ts
 */
import { ComponentsItem, IFcComponentsListState } from "@/interface/components";
import { AnyType } from "@/interface/common";
import clonedeep from "lodash.clonedeep";
import { useMutations, useGetters } from "@u3u/vue-hooks";
import Utils from "@/utils/utils";
import { reactive } from "@vue/composition-api";
import cfgs from "@/configs/config";

/// TODO: 后期把所有的函数改为useXXX和hooks更加符合语义
/// 生成唯一key
export const generateUniqueKey = (state: IFcComponentsListState, idx: number, list: ComponentsItem[]) => {
  console.log(list);
  if (cfgs.disabledConfigComponents.includes(list[idx].tag)) {
    return;
  }

  console.log(list[idx].tag, "   tag");
  const uniqueKey = Utils.generateUniqueKeyUtils(list[idx].tag);
  const cloneItem = clonedeep(list[idx]);
  const key = cloneItem.key;
  cloneItem["uniqueKey"] = uniqueKey;
  state.filterData[key][idx] = state.list[idx] = cloneItem;
  console.log(cloneItem["uniqueKey"], "   gggggggggg-----key");
  console.log(state, "   gggggggggg-----state");
};

/// 当前选中的值
export const setChooseType = (e: AnyType, state: IFcComponentsListState, list: ComponentsItem[]) => {
  if (cfgs.disabledConfigComponents.includes(list[e.oldIndex].tag)) {
    return;
  }
  state.chooseType = list[e.oldIndex].tag;
};

/// 点击左侧按钮
/// 判断当前主区域是否有选中的
export const setClickHandleItem = (item: ComponentsItem, baseList: ComponentsItem[], callbakCopy?: Function) => {
  const storeGetters = reactive({
    ...useGetters("common", ["getSelectItem"]),
  });
  const setStore = {
    ...useMutations("common", ["setCurrentItem", "pushMainList"]),
  };
  const deepItem = clonedeep(item);
  /// 当前任何一个都没有被选中
  /// 就说明主区域为空
  console.log("set-click-handle-item");
  if (Object.keys(storeGetters.getSelectItem).length === 0) {
    console.log(1);
    if (!deepItem.uniqueKey) {
      console.log(1, 1);
      deepItem.uniqueKey = Utils.generateUniqueKeyUtils(deepItem.tag);
      setStore.pushMainList(deepItem);
      baseList.push(deepItem);
    }
    setStore.setCurrentItem(deepItem);
    return;
  } else if (!callbakCopy) {
    console.log(2, 2);
    if (!deepItem.uniqueKey) {
      deepItem.uniqueKey = Utils.generateUniqueKeyUtils(deepItem.tag);
    }
    /// 如果从左侧拖入进来的...
    /// 只需要激活item不要copy
    setStore.setCurrentItem(deepItem);
    return;
  }
  console.log(3, 3);
  /// 如果当前主区域有被选中的
  /// 直接调用item里面的复制方法就行了
  callbakCopy && callbakCopy(false, item);
};

/// 主区域点击选中active
export const handleActiveSelectItem = (item: ComponentsItem) => {
  const setStore = {
    ...useMutations("common", ["setCurrentItem"]),
  };
  setStore.setCurrentItem(item);
};

export const handleColAdd = (e: AnyType, columns: ComponentsItem[], isCopy = false, isNew = true) => {
  const newIndex = isNew ? e.newIndex : e.oldIndex;
  console.log(e, " aaaaaaaa");
  console.log(newIndex, " aaaaaaaa");
  console.log(columns, " aaaaaaaa");
  console.log(isCopy, " aaaaaaaa");
  console.log(isNew, " aaaaaaaa");
  console.log(columns[newIndex].uniqueKey);
  const uniqueKey = Utils.generateUniqueKeyUtils(columns[newIndex].tag);
  if (!columns[newIndex].uniqueKey || isCopy) {
    columns[newIndex]["uniqueKey"] = uniqueKey;
    if (columns[newIndex].children) {
      columns[newIndex].children = clonedeep(columns[newIndex].children);
      columns[newIndex].children!.forEach(item => {
        item.children = [];
      });
    }
  }
  const item = clonedeep(columns[newIndex]);
  columns[newIndex] = item;
  console.log(columns[newIndex]);
  /// 激活添加的
  handleActiveSelectItem(item);
};

export const useColAdd = (e: AnyType, columns: ComponentsItem[], isCopy = false, isNew = false) => {
  const newIndex = isNew ? e.newIndex : e.oldIndex;
  const uniqueKey = Utils.generateUniqueKeyUtils(columns[newIndex].tag);
  if (!columns[newIndex].uniqueKey || isCopy) {
    columns[newIndex]["uniqueKey"] = uniqueKey;
    if (columns[newIndex].children) {
      columns[newIndex].children = clonedeep(columns[newIndex].children);
      columns[newIndex].children!.forEach(item => {
        item.children = [];
      });
    }
  }
  console.log(columns[newIndex]);
  const item = clonedeep(columns[newIndex]);
  columns[newIndex] = item;
  /// 激活添加的
  handleActiveSelectItem(item);
};
