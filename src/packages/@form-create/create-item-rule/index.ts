/*
 * @Author        : djkloop
 * @Date          : 2020-05-07 17:37:33
 * @LastEditors   : djkloop
 * @LastEditTime  : 2020-05-11 17:06:06
 * @Description   : 处理规则类
 * @FilePath      : /form-create-ui/src/packages/@form-create/create-item-rule/index.ts
 */

import { ComponentsItem, IDraggableComponentsItem } from "@/interface/components";
import clonedeep from "lodash.clonedeep";
import Utils from "@/utils/utils";
import { AnyType } from "@/interface/common";

export default class CreateFormItemRule {
  props?: IDraggableComponentsItem;
  /// 原始数据
  originProps?: ComponentsItem;
  ///
  isActiveClass = false;
  ///
  $f: AnyType;

  themeClass = "fc-render-form-item";

  constructor(props: ComponentsItem, fcInstance: AnyType) {
    this.originProps = clonedeep(props);
    this.$f = fcInstance;
    this._setup();
  }

  ///先检查key
  _setup() {
    this.generateUniqueKey();
    /// 生成布局组件
    if (this.originProps?.itemTag === "布局组件") {
      this._createFormLyaout();
    } else {
      /// 生成formitem
      this._createFormItem();
    }
  }

  /// 获取form-create需要的规则
  /// 其实就是在外面包了一层自定义组件
  getRule() {
    return this.props;
  }

  /// 获取原始的规则
  getOriginRule() {
    return this.originProps;
  }

  /// 生成唯一key && 自动生成field
  generateUniqueKey() {
    if (this.originProps && !this.originProps.uniqueKey) {
      this.originProps["uniqueKey"] = Utils.generateUniqueKeyUtils(this.originProps.type);
    }
    this.originProps!["field"] = this.originProps!["uniqueKey"];
  }

  /// 生成布局组件
  _createFormLyaout() {
    const customComponentWraaperRule: any = {
      type: "form-create-item-wrapper",
      name: this.originProps?.field,
      class: "fc-drage-move",
      props: {
        /// 把props传进去给组件用
        /// 用于组件内部进化判断
        item: this.originProps,
      },
      emit: ["copy-form-item", "drage-start", "add-col-item"],
      emitPrefix: "fc",
      children: [this.originProps],
      originRules: this.originProps,
      native: true,
    };
    console.log("_createFormLyaout__::", customComponentWraaperRule);
    this.props = customComponentWraaperRule;
  }
  /// 生成布局组件
  _createFormItem() {
    /// src/components/fc-render/form/form.vue
    const customComponentWraaperRule: any = {
      type: "form-create-item-wrapper",
      name: this.originProps?.field,
      class: "fc-drage-move",
      props: {
        /// 把props传进去给组件用
        /// 用于组件内部进化判断
        item: this.originProps,
      },
      emit: ["copy-form-item", "drage-start", "add-col-item"],
      emitPrefix: "fc",
      children: [this.originProps],
      originRules: this.originProps,
      native: true,
    };
    console.log("_createFormItem::", customComponentWraaperRule);
    this.props = customComponentWraaperRule;
  }
}
