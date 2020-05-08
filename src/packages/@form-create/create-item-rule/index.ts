/*
 * @Author        : djkloop
 * @Date          : 2020-05-07 17:37:33
 * @LastEditors   : djkloop
 * @LastEditTime  : 2020-05-08 14:22:18
 * @Description   : 处理规则类
 * @FilePath      : /form-create-ui/src/packages/@form-create/create-item-rule/index.ts
 */

import { ComponentsItem, IDraggableComponentsItem } from "@/interface/components";
import { createToastInterface } from "vue-toastification";
import clonedeep from "lodash.clonedeep";

export default class CreateFormItemRule {
  props?: IDraggableComponentsItem;
  /// 原始数据
  originProps?: ComponentsItem;

  constructor(props: ComponentsItem) {
    this.originProps = clonedeep(props);
    console.log(this.props, " new Rules");
    this._setup();
  }

  ///先检查key
  _setup() {
    /// 如果是表单组件需要判断field
    /// 如果没有的话需要后台重新生成
    const toast = createToastInterface();
    if (!this?.originProps?.field && this?.originProps?.itemTag === "基础组件") {
      toast.error("表单组件没有field， 请重新请求数据!");
      this.originProps = void 0;
      return;
    }

    /// 生成formitem
    this._createFormItem();
    /// 生成
  }

  getRule() {
    return this.props;
  }

  _createFormItem() {
    const themeClass = "fc-render-form-item";

    this.originProps = Object.assign({}, this.originProps, { className: themeClass });

    /// 每个
    const draggableRule: any = {
      type: "div",
      class: "fc-drage-move-box fc-drage-move",
      props: {
        type: "div",
      },
      children: [this.originProps],
      native: true,
    };
    console.log(this.originProps, "  生成的规则");
    this.props = draggableRule;
  }
}
