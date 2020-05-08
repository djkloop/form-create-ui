/*
 * @Author        : djkloop
 * @Date          : 2020-05-07 17:37:33
 * @LastEditors  : djkloop
 * @LastEditTime : 2020-05-08 23:20:11
 * @Description   : 处理规则类
 * @FilePath     : /form-create-ui/src/packages/@form-create/create-item-rule/index.ts
 */

import { ComponentsItem, IDraggableComponentsItem } from "@/interface/components";
import { createToastInterface } from "vue-toastification";
import clonedeep from "lodash.clonedeep";
import Utils from "@/utils/utils";
import { useGetters } from "@u3u/vue-hooks";
import { reactive } from "@vue/composition-api";
import { AnyType } from "@/interface/common";
import classnames from "classnames";

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

  getOriginRule() {
    return this.originProps;
  }

  generateUniqueKey() {
    if (this.originProps && !this.originProps.uniqueKey) {
      this.originProps["uniqueKey"] = Utils.generateUniqueKeyUtils(this.originProps.type);
    }
  }

  /// 更新状态
  updateActive() {
    const storeGet = reactive({
      ...useGetters("common", ["getSelectItem"]),
    });
    console.log(storeGet.getSelectItem);
    const { uniqueKey } = storeGet.getSelectItem;
    if (this.originProps && this.originProps.uniqueKey) {
      if (this.originProps.uniqueKey === uniqueKey) {
        this.isActiveClass = true;
        if (this.props && this.props.children) {
          /// 更新第一个
          this.props.children[0].class = classnames(
            `fc-draage-components-form_container`,
            `fc-drage-container`,
            this.themeClass,
            {
              ["fc-active"]: this.isActiveClass,
              ["fc-inactive"]: !this.isActiveClass,
            }
          );
          /// 更新第二个
          /// fc-drage-components-form__tools fc-render-form-item__tools
          if (this.props.children[0].children) {
            this.props.children[0].children[0].class = classnames(
              `fc-drage-components-form__tools`,
              `fc-render-form-item__tools`,
              {
                ["fc-active"]: this.isActiveClass,
                ["fc-inactive"]: !this.isActiveClass,
              }
            );
          }
        }
      } else {
        this.isActiveClass = false;
        if (this.props && this.props.children) {
          this.props.children[0].class = classnames(
            `fc-draage-components-form_container`,
            `fc-drage-container`,
            this.themeClass,
            {
              ["fc-active"]: this.isActiveClass,
              ["fc-inactive"]: !this.isActiveClass,
            }
          );
          if (this.props.children[0].children) {
            this.props.children[0].children[0].class = classnames(
              `fc-drage-components-form__tools`,
              `fc-render-form-item__tools`,
              {
                ["fc-active"]: this.isActiveClass,
                ["fc-inactive"]: !this.isActiveClass,
              }
            );
          }
        }
      }
    }
  }

  _createFormItem() {
    this.generateUniqueKey();
    /// 每个
    const draggableRule: any = {
      type: "form-create-item-wrapper",
      name: this.originProps?.field,
      props: {
        item: this.originProps,
      },
      emit: ["add-col-item", "drage-start", "copy-form-item"],
      emitPrefix: "fc-",
      children: [this.originProps],
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
