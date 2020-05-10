/*
 * @Author        : djkloop
 * @Date          : 2020-05-07 17:37:33
 * @LastEditors  : djkloop
 * @LastEditTime : 2020-05-10 20:52:01
 * @Description   : 处理规则类
 * @FilePath     : /form-create-ui/src/packages/@form-create/create-item-rule/index.ts
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
    console.log(this.props, " new Rules");
    this.$f = fcInstance;
    this._setup();
  }

  ///先检查key
  _setup() {
    /// 生成formitem
    this._createFormItem();
    /// 生成
  }

  getRule() {
    return this.props;
  }

  getOriginRule() {
    return this.originProps;
  }

  generateUniqueKey() {
    if (this.originProps && !this.originProps.uniqueKey) {
      this.originProps["uniqueKey"] = Utils.generateUniqueKeyUtils(this.originProps.type);
    } else {
      this.originProps["field"] = this.originProps["uniqueKey"];
    }
  }

  _createFormItem() {
    this.generateUniqueKey();
    /// 每个
    const draggableRule: any = {
      type: "form-create-item-wrapper",
      name: this.originProps?.field,
      class: "fc-drage-move",
      props: {
        item: this.originProps,
      },
      emit: ["copy-form-item", "drage-start", "add-col-item"],
      emitPrefix: "fc",
      children: [this.originProps],
      originRules: this.originProps,
      native: true,
    };
    console.log(this.originProps, "  生成的规则");
    this.props = draggableRule;
  }

  _renderFormItemToolsIconRule() {
    const toolsIcons = [
      { type: "i", class: "el-icon-document-copy" },
      { type: "i", class: "el-icon-delete" },
    ];

    const toolsRules = toolsIcons.map(item => this._createElementRule(item));
    return toolsRules;
  }

  _createElementRule(props: ComponentsItem) {
    const _t = props.type;
    const _c = props.className || props.class;
    return {
      type: _t,
      class: _c,
    };
  }
}
