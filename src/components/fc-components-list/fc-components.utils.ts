/*
 * @Author       : djkloop
 * @Date         : 2020-04-25 01:21:14
 * @LastEditors  : djkloop
 * @LastEditTime : 2020-05-16 18:03:48
 * @Description  : fc-components工具方法(用来替代vue2中的methods的)
 * @FilePath     : /form-create-ui/src/components/fc-components-list/fc-components.utils.ts
 */
import { ComponentsItem, IFcComponentsListState, IDraggableComponentsItem } from "@/interface/components";
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
  const ruleInstance = new CreateFormItemRule(cloneItem, [], void 0);
  const rule = ruleInstance.getRule();
  const originRules = ruleInstance.getOriginRule();
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
    const ruleInstance = new CreateFormItemRule(deepItem, [], void 0);
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
  debugger;
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
      __item__.children!.forEach(item => {
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

/// 激活主区域的class
export const useActiveItem = (item: IDraggableComponentsItem) => {
  const setStore = {
    ...useMutations("common", ["setCurrentItem"]),
  };
  setStore.setCurrentItem(item);
};
/// 左侧进入主区域调用的方法
export const useMainAddItem = (
  item: IDraggableComponentsItem,
  baseList: IDraggableComponentsItem[],
  callback?: Function
) => {
  /// 获取当前主区域当前的item
  /// 等于vue2.x 里面的computed里面的getter
  const storeGetters = reactive({
    ...useGetters("common", ["getSelectItem"]),
  });
  /// 这个类似
  const setStore = {
    ...useMutations("common", ["setCurrentItem", "pushMainList"]),
  };
  /// 深拷贝
  let deepItem = clonedeep(item);
  /// 去格式化规则 & 防止后台传递的规则有问题
  if (!deepItem.uniqueKey || !deepItem.originProps) {
    /// 把list传进去防止item.children上下文环境丢失 - draggable嵌套的时候element null Bug
    const ruleInstance = new CreateFormItemRule(deepItem, baseList, void 0);
    const rule = ruleInstance.getRule();
    deepItem = rule;
  }

  if (Object.keys(storeGetters.getSelectItem).length === 0) {
    /// 往store里面推进去，防止其他的地方使用
    setStore.pushMainList(deepItem);
    /// 设置当前点击的item，用于激活当前class
    /// 这里获取它的源规则是不包含它的外层组件
    setStore.setCurrentItem(deepItem.originRules);
    if (callback) {
      baseList.push(deepItem);
    }
    return;
  } else if (!callback) {
    setStore.setCurrentItem(deepItem.originRules);
    return;
  }

  callback && callback(false, deepItem);
};

/// 主区域在激活状态下的item后面在添加一个item
/// 1、$f -> form-create的实例
/// 2、e -> draggable的event对象
export const useColAdd = ($f: AnyType, e: AnyType, baseList: IDraggableComponentsItem[], isCopy = false) => {
  Utils.logs("useColAdd", $f);
  Utils.logs("useColAdd", e);
  Utils.logs("useColAdd", baseList);
  Utils.logs("useColAdd", isCopy);
  const newIndex = e.newIndex;
  const itemWrapper = baseList[newIndex];
  let item;
  let deepItem;
  /// 如果是表单组件
  if (itemWrapper.isFormItem) {
    item = itemWrapper.children![0];
    deepItem = clonedeep(item);
    baseList[newIndex].children![0] = deepItem;
  }
  if (deepItem) {
    useActiveItem(deepItem);
  }
};
