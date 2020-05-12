/*
 * @Author        : djkloop
 * @Date          : 2020-05-07 17:37:33
 * @LastEditors   : djkloop
 * @LastEditTime  : 2020-05-12 19:13:54
 * @Description   : 处理规则类
 * @FilePath      : /form-create-ui/src/packages/@form-create/create-item-rule/index.ts
 */

import { ComponentsItem, IDraggableComponentsItem } from "@/interface/components";
import clonedeep from "lodash.clonedeep";
import Utils from "@/utils/utils";
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

  /// 创建el-row & mergeProps
  private __createFormLayoutChildrenRowWithRule() {
    if (this.originProps && this.originProps.type === "el-row") {
      const cols = this.originProps.children;
      this.originProps["class"] = classnames(this.originProps.class, "fc-render-form-grid-row");
      console.log("__createFormLayoutChildrenRowWithRule:: -- 1 --", this.originProps);
      if (cols && cols.length > 0) {
        this.__createFormLayoutChildColWithRule();
      }
    }
  }

  private __createFormLayoutChildColWithRule() {
    if (this.originProps) {
      /// 这里一定会有children的并且会大于0因为在上一个方法已经判断过了
      this.originProps.children!.forEach(item => {
        item.children = this.__createColChildrenWrapper(item);
      });
      console.log("__createFormLayoutChildColWithRule:: -- 3 --", this.originProps);
    }
  }

  /// 创建col的下面的一级draggable组件
  private __createColChildrenWrapper(item: AnyType) {
    /// list
    const o = [
      {
        type: "draggable",
        props: {
          list: item.children, /// 这里要添加item.children
          tag: "div",
        },
        attrs: {
          group: "fc-draggable",
          ghostClass: "fc-drage-moving",
          animation: 180,
          handle: ".fc-drage-move",
        },
        class: "fc-main-draggable-box",
        children: [
          {
            type: "transition-group",
            props: {
              name: "fc-drage-list",
              tag: "div",
            },
            class: "fc-main-draggable-box-transition",
            children: item.children, /// 这里要添加item.children
            native: true,
          },
        ],
        on: {
          add: (f, e, it) => console.log(f, e, it),
        },
        emit: ["drage-start", "add-col-item"],
        emitPrefix: "fc",
      },
    ];
    // const p = [
    //   {
    //     type: "fc-draggable-children",
    //     props: {
    //       item,
    //     },
    //     children: [
    //       {
    //         type: "transition-group",
    //         props: {
    //           name: "fc-drage-list",
    //           tag: "div",
    //         },
    //         class: "fc-main-draggable-box-transition",
    //         children: item.children, /// 这里要添加item.children
    //         native: true,
    //       },
    //     ],
    //   },
    // ];
    console.log("__createColChildrenWrapper:: -- 2 --", this.originProps);
    return o;
  }

  __createFormItemWrapper() {
    // form-create-item-wrapper
    return {
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
      children: [],
      native: true,
    };
  }

  /// 生成布局组件
  _createFormLyaout() {
    this.__createFormLayoutChildrenRowWithRule();
    const customComponentWrapperRule: any = {
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
    console.log("_createFormLyaout__::", customComponentWrapperRule);
    this.props = customComponentWrapperRule;
  }
  /// 生成布局组件
  _createFormItem() {
    /// src/components/fc-render/form/form.vue
    const customComponentWrapperRule: any = {
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
    console.log("_createFormItem::", customComponentWrapperRule);
    this.props = customComponentWrapperRule;
  }
}
