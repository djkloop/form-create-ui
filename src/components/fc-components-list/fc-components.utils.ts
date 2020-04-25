/*
 * @Author       : djkloop
 * @Date         : 2020-04-25 01:21:14
 * @LastEditors  : djkloop
 * @LastEditTime : 2020-04-26 00:57:45
 * @Description  : fc-components工具方法(用来替代vue2中的methods的)
 * @FilePath     : /form-create-ui/src/components/fc-components-list/fc-components.utils.ts
 */
import { ComponentsItem, IFcComponentsListState } from "@/interface/components";
import { AnyType } from "@/interface/common";
import deep from "lodash.clonedeep";
import { useMutations } from "@u3u/vue-hooks";
import dayjs from "dayjs";

const generateUniqueKeyUtils = (t: string) => t + "__" + dayjs(new Date().getTime()).format("YYYY_MM_DD_HH_mm_ss");

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
