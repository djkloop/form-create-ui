/*
 * @Author       : djkloop
 * @Date         : 2020-04-25 01:21:14
 * @LastEditors   : djkloop
 * @LastEditTime  : 2020-05-11 18:35:15
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
import CreateFormItemRule from "@/packages/@form-create/create-item-rule";

const useES20XX = () => {
  const idx = void 0;
  /// 测试下新特性...
  const testA = idx ?? "default_a";
  console.log(testA);

  ///
  const box: any = {
    weight: 2,
    getWeight() {
      return this.weight;
    },
  };
  console.log(box?.bbb);
  /// ::func
  /// 好像不支持
};

/// TODO: 后期把所有的函数改为useXXX和hooks更加符合语义
/// 生成唯一key
export const generateUniqueKey = (
  state: IFcComponentsListState,
  idx: number,
  list: ComponentsItem[],
  item?: ComponentsItem
) => {
  if (cfgs.disabledConfigComponents.includes(list[idx].tag)) {
    return;
  }
  let cloneItem: AnyType = {};

  if (item) {
    cloneItem = clonedeep(state.cacheData[item.itemTag!][idx]);
  } else {
    cloneItem = clonedeep(state.cacheData[list[idx].itemTag!][idx]);
  }

  useES20XX();
  /// 在这里就把key生成
  console.log(cloneItem, " --------------------------------------------");
  const ruleInstance = new CreateFormItemRule(cloneItem, void 0);
  const rule = ruleInstance.getRule();
  const originRules = ruleInstance.getOriginRule();
  console.log(originRules, " originRules");
  const key = cloneItem.itemTag!;
  cloneItem["uniqueKey"] = originRules?.uniqueKey;
  cloneItem["originRules"] = originRules;
  state.filterData[key][idx] = rule!;
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
export const setClickHandleItem = (
  item: ComponentsItem,
  baseList: ComponentsItem[],
  callbakCopy?: Function,
  index?: number
) => {
  const storeGetters = reactive({
    ...useGetters("common", ["getSelectItem"]),
  });
  const setStore = {
    ...useMutations("common", ["setCurrentItem", "pushMainList"]),
  };
  let deepItem = clonedeep(item);
  /// 如果是点击左侧列表需要手动添加key
  if (!deepItem.originRules) {
    const ruleInstance = new CreateFormItemRule(deepItem, void 0);
    const rule = ruleInstance.getRule();
    deepItem = rule!;
  }
  /// 当前任何一个都没有被选中
  /// 就说明主区域为空
  console.log("set-click-handle-item");
  if (Object.keys(storeGetters.getSelectItem).length === 0) {
    console.log("set-click-handle-item-1");

    setStore.pushMainList(deepItem);
    setStore.setCurrentItem(deepItem.originRules);
    if (deepItem && callbakCopy) {
      baseList.push(deepItem);
    }
    return;
  } else if (!callbakCopy) {
    setStore.setCurrentItem(deepItem.originRules);
    return;
  }
  /// 如果当前主区域有被选中的
  /// 直接调用item里面的复制方法就行了
  console.log("set-click-handle-item-3", deepItem);
  callbakCopy && callbakCopy(false, deepItem);
};

/// 主区域点击选中active
export const handleActiveSelectItem = (item: Partial<ComponentsItem>) => {
  const setStore = {
    ...useMutations("common", ["setCurrentItem"]),
  };
  setStore.setCurrentItem(item);
};

export const handleColAdd = (
  fin: AnyType,
  e: AnyType,
  columns: Partial<ComponentsItem>[],
  isCopy = false,
  isNew = true
) => {
  const newIndex = e.newIndex;
  const __item__ = columns[newIndex].children![0];
  const uniqueKey = Utils.generateUniqueKeyUtils(__item__.type!);
  if (!__item__.uniqueKey || isCopy) {
    /// 如果item不深拷贝
    /// 在这里容易出现uniqueKey被修改的情况
    __item__["uniqueKey"] = uniqueKey;
    /// 这里的form组件的fileds也不能相同
    __item__.field = uniqueKey;
    if (__item__.children) {
      __item__.children = clonedeep(__item__.children);
      __item__.children!.forEach((item) => {
        item.children = [];
      });
    }
  }
  console.log(__item__);
  console.log(columns);
  // const item = clonedeep(__item__);
  columns[newIndex].children![0] = __item__;
  /// 激活添加的
  handleActiveSelectItem(__item__);
};

/// 后面所有的函数都会换成这种开头的
export const useColAdd = (e: AnyType, columns: ComponentsItem[], isCopy = false, isNew = false) => {
  const newIndex = isNew ? e.newIndex : e.oldIndex;
  const uniqueKey = Utils.generateUniqueKeyUtils(columns[newIndex].tag);
  if (!columns[newIndex].uniqueKey || isCopy) {
    columns[newIndex]["uniqueKey"] = uniqueKey;
    if (columns[newIndex].children) {
      columns[newIndex].children = clonedeep(columns[newIndex].children);
      columns[newIndex].children!.forEach((item) => {
        item.children = [];
      });
    }
  }
  const item = clonedeep(columns[newIndex]);
  columns[newIndex] = item;
  /// 激活添加的
  handleActiveSelectItem(item);
};
