/*
 * @Author       : djkloop
 * @Date         : 2020-04-25 01:21:14
 * @LastEditors   : djkloop
 * @LastEditTime  : 2020-04-26 15:12:24
 * @Description  : fc-components工具方法(用来替代vue2中的methods的)
 * @FilePath      : /form-create-ui/src/components/fc-components-list/fc-components.utils.ts
 */
import { ComponentsItem, IFcComponentsListState } from "@/interface/components";
import { AnyType } from "@/interface/common";
import clonedeep from "lodash.clonedeep";
import { useMutations } from "@u3u/vue-hooks";
import Utils from "@/utils/utils";

/// 生成唯一key
export const generateUniqueKey = (state: IFcComponentsListState, idx: number) => {
  const uniqueKey = Utils.generateUniqueKeyUtils(state.list[idx].tag);
  const cloneItem = clonedeep(state.list[idx]);
  const key = cloneItem.key;
  cloneItem["uniqueKey"] = uniqueKey;
  state.list[idx] = cloneItem;
  /// filterData 需要重新设置
  /// 要不然在主选框区域add事件拿不到uniqueKey
  state.filterData[key][idx] = cloneItem;
};

/// 当前选中的值
export const setChooseType = (e: AnyType, state: IFcComponentsListState, list: ComponentsItem[]) => {
  state.chooseType = list[e.oldIndex].tag;
};

/// 设置当前选中的item
export const setClickHandleItem = (item: ComponentsItem, state?: IFcComponentsListState) => {
  const deepItem = clonedeep(item);
  if (state) {
    state.selectCurrentItem = deepItem;
    if (!deepItem.uniqueKey) {
      state.selectCurrentItem.uniqueKey = deepItem.uniqueKey = Utils.generateUniqueKeyUtils(deepItem.tag);
    }
  } else if (!deepItem.uniqueKey) {
    deepItem.uniqueKey = Utils.generateUniqueKeyUtils(deepItem.tag);
  }

  const setStore = {
    ...useMutations("common", ["setCurrentItem", "setMainList"]),
  };

  setStore.setMainList(deepItem);
  setStore.setCurrentItem(deepItem);
};
