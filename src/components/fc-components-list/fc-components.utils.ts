/*
 * @Author       : djkloop
 * @Date         : 2020-04-25 01:21:14
 * @LastEditors   : djkloop
 * @LastEditTime  : 2020-04-26 18:55:43
 * @Description  : fc-components工具方法(用来替代vue2中的methods的)
 * @FilePath      : /form-create-ui/src/components/fc-components-list/fc-components.utils.ts
 */
import { ComponentsItem, IFcComponentsListState } from "@/interface/components";
import { AnyType } from "@/interface/common";
import clonedeep from "lodash.clonedeep";
import { useMutations, useGetters } from "@u3u/vue-hooks";
import Utils from "@/utils/utils";
import { reactive } from '@vue/composition-api';

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

/// 点击左侧按钮
/// 判断当前主区域是否有选中的
export const setClickHandleItem = (item: ComponentsItem, callbakCopy: Function) => {
  const storeGetters = reactive({
    ...useGetters("common", ["getSelectItem"])
  })
  const deepItem = clonedeep(item);

  /// 当前任何一个都没有被选中
  /// 就说明主区域为空
  if (Object.keys(storeGetters.getSelectItem).length === 0) {
    if (!deepItem.uniqueKey) {
      deepItem.uniqueKey = Utils.generateUniqueKeyUtils(deepItem.tag);
      const setStore = {
        ...useMutations("common", ["setCurrentItem", "pushMainList"]),
      };
      setStore.pushMainList(deepItem);
      setStore.setCurrentItem(deepItem);
    }
    return
  }

  /// 如果当前主区域有被选中的
  /// 直接调用item里面的复制方法就行了
  callbakCopy(false, item);
};


/// 主区域点击选中active
export const handleActiveSelectItem = (item: ComponentsItem) => {
    const deepItem = clonedeep(item);
    const setStore = {
      ...useMutations("common", ["setCurrentItem"]),
    };
    setStore.setCurrentItem(deepItem);
}


export const handleColAdd = (e: AnyType, columns: ComponentsItem[], isCopy = false) => {
  const newIndex = e.newIndex;
  const uniqueKey = Utils.generateUniqueKeyUtils(columns[newIndex].tag);
  if (!columns[newIndex].tag || isCopy) {
    columns[newIndex]["uniqueKey"] = uniqueKey
  }
  const item = clonedeep(columns[newIndex]);
  columns[newIndex] = item;
  /// 激活添加的
  handleActiveSelectItem(item);
};
