import { ComponentsItem, IFcComponentsListState } from "@/interface/components";
import { AnyType } from "@/interface/common";
import deep from "lodash.clonedeep";

/// 生成唯一key
export const generateUniqueKey = (
  state: IFcComponentsListState,
  idx: number
) => {
  const uniqueKey = state.list[idx].type + "__" + new Date().getTime();
  const cloneItem = deep(state.list[idx]);
  cloneItem["uniqueKey"] = uniqueKey;
  state.list[idx] = cloneItem;
};

/// 当前选中的值
export const setChooseType = (
  e: AnyType,
  state: IFcComponentsListState,
  list: ComponentsItem[]
) => {
  state.chooseType = list[e.oldIndex].type;
};
