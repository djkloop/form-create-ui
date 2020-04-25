import { ComponentsItem, IFcComponentsListState } from "@/interface/components";
import { AnyType } from "@/interface/common";
import deep from "lodash.clonedeep";
import { useMutations } from "@u3u/vue-hooks";

const generateUniqueKeyUtils = (t: string) => t + "__" + new Date().getTime();

/// 生成唯一key
export const generateUniqueKey = (state: IFcComponentsListState, idx: number) => {
  const uniqueKey = generateUniqueKeyUtils(state.list[idx].type);
  const cloneItem = deep(state.list[idx]);
  cloneItem["uniqueKey"] = uniqueKey;
  state.list[idx] = cloneItem;
};

/// 当前选中的值
export const setChooseType = (e: AnyType, state: IFcComponentsListState, list: ComponentsItem[]) => {
  state.chooseType = list[e.oldIndex].type;
};

/// 设置当前选中的item
export const setClickHandleItem = (state: IFcComponentsListState, item: ComponentsItem) => {
  const deepItem = deep(item);
  state.selectCurrentItem = deepItem;
  if (!deepItem.uniqueKey) {
    state.selectCurrentItem.uniqueKey = deepItem.uniqueKey = generateUniqueKeyUtils(deepItem.type);
  }
  const setStore = {
    ...useMutations("common", ["setCurrentItem", "setMainList"]),
  };
  setStore.setCurrentItem(deepItem);
  setStore.setMainList(deepItem);
};
