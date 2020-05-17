/*
 * @Author        : djkloop
 * @Date          : 2020-05-07 17:37:33
 * @LastEditors  : djkloop
 * @LastEditTime : 2020-05-17 13:56:49
 * @Description   : 处理规则类
 * @FilePath     : /form-create-ui/src/packages/@form-create/create-item-rule/index.ts
 */

import { IDraggableComponentsItem } from "@/interface/components";
import clonedeep from "lodash.clonedeep";
import Utils from "@/utils/utils";
import { AnyType } from "@/interface/common";
import classnames from "classnames";

export default class CreateFormItemRule {
  props!: IDraggableComponentsItem;
  /// 原始数据
  originProps?: IDraggableComponentsItem;
  ///
  isActiveClass = false;
  ///
  baseList: IDraggableComponentsItem[] = [];
  ///
  reactiveBaseList?: IDraggableComponentsItem[];
  ///
  $f: AnyType;

  themeRenderItemClass = "fc-render-form-item";
  themeRenderFormGridRowClass = "fc-render-form-grid-row";
  themeMainDraggableBoxTransition = "fc-main-draggable-box-transition";

  constructor(props: IDraggableComponentsItem, baseList: IDraggableComponentsItem[], fcInstance: AnyType) {
    this.originProps = clonedeep(props);
    this.$f = fcInstance;
    this.baseList = baseList;
    this._setup();
  }

  _setup() {
    ///先生成组件唯一key
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

    if (this.originProps && this.originProps.itemTag === "基础组件") {
      /// 如果后台没有传field就自动创建
      /// 这里可以到时候可以存到一个map里面如果重复就自动重建
      if (!this.originProps.field) {
        this.originProps.field = this.originProps!["uniqueKey"];
      }
    }
  }

  // <el-row :gutter="item.gutter || 0" class="fc-render-form-grid-row">
  //         <el-col v-for="(it, index) in item.children" :key="index" :span="it.props.span || 0">
  //               <form-create-item-wrapper
  //                 class="fc-drage-move"
  //                 :item="col.children[0]"
  //                 :data-key="col.children[0].uniqueKey"
  //                 v-for="col in it.children"
  //                 :key="col.children[0].uniqueKey + '__col__item__parent'"
  //                 @fc-add-col-item="handleColAdd"
  //                 @fc-copy-form-item="handleCopyItem"
  //               >
  //               </form-create-item-wrapper>
  //         </el-col>
  //       </el-row>

  // {
  //               type: "el-row",
  //               children: [
  //                 {
  //                   type: "el-col",
  //                   props: {
  //                     span: 12,
  //                   },
  //                   children: [{
  //                     type: "form-create-item-wrapper",

  //                   }],
  //                 },
  //                 {
  //                   type: "el-col",
  //                   props: {
  //                     span: 12,
  //                   },
  //                   children: [],
  //                 },
  //               ],
  //               label: "栅格布局",
  //               listIcon: "el-icon-c-scale-to-original",
  //               itemTag: "布局组件",
  //               listTag: "fc-grid",
  //             },

  /// 这里需要在外层嵌套一层
  __createFormItemWrapper() {
    // form-create-item-wrapper
    return {
      type: "form-create-item-wrapper",
      class: "fc-drage-move",
      name: this.originProps?.field,
      props: {
        /// 把props传进去给组件用
        /// 用于组件内部进化判断
        item: this.originProps,
      },
      emit: ["copy-form-item", "drage-start", "add-col-item"],
      emitPrefix: "fc",
      children: [this.originProps],
      native: true,
    };
  }

  private __createLayoutColChildren(item: IDraggableComponentsItem) {
    Utils.logs("__createLayoutColChildren", this.baseList);
    const draggableOptions = {
      type: "draggable",
      props: {
        tag: "div",
        list: item.children,
      },
      attrs: {
        group: "fc-draggable",
        ghostClass: "fc-drage-moving",
        animation: 180,
        handle: ".fc-drage-move",
      },
      class: classnames("fc-main-draggable-box"),
      children: [
        {
          type: "transition-group",
          props: { tag: "div", name: "fc-drage-list" },
          class: classnames(this.themeMainDraggableBoxTransition),
          children: item.children,
        },
      ],
      on: {
        add: ($f: AnyType, $event: AnyType) => {
          Utils.logs("on-add::event", $event);
          Utils.logs("on-add::baseList", this.baseList);
          Utils.logs("on-add::children", item.children);
        },
      },
    };
    return [draggableOptions];
  }

  private __createFormLayoutChildren() {
    /// 生成col
    if (this.originProps) {
      const children = this.originProps.children;
      this.originProps.class = classnames(this.themeRenderFormGridRowClass);
      if (children) {
        children.forEach(item => {
          item.children = this.__createLayoutColChildren(item);
        });
        this.originProps.children = children;
      }
      return [this.originProps];
    } else {
      return [];
    }
  }

  /// 生成布局组件
  _createFormLyaout() {
    const customComponentWrapperRule: any = {
      type: "form-create-item-wrapper",
      originRules: this.originProps,
      isFormLayout: true,
      props: {
        /// 把props传进去给组件用
        /// 用于组件内部进化判断
        item: this.originProps,
      },
      children: this.__createFormLayoutChildren(),
    };
    console.log("_createFormLyaout__::", customComponentWrapperRule);
    this.props = customComponentWrapperRule;
  }
  /// 生成表单组件
  _createFormItem() {
    /// src/components/fc-render/form/form.vue
    const customComponentWrapperRule: any = {
      type: "form-create-item-wrapper",
      name: this.originProps?.field,
      class: "fc-drage-move",
      isFormItem: true,
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
    console.log("_createFormItem::", customComponentWrapperRule);
    this.props = customComponentWrapperRule;
  }
}
