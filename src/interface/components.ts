/*
 * @Author       : djkloop
 * @Date         : 2020-04-24 23:25:04
 * @LastEditors  : djkloop
 * @LastEditTime : 2020-05-17 12:35:04
 * @Description  : 组件相关的interface
 * @FilePath     : /form-create-ui/src/interface/components.ts
 */
import { IDraggableOptions, AnyType } from "./common";
import { IFormCreateItem } from "./@form-create/item-rule.interface";

/// TODO: 这里需要更加语义化
/// 例如type 换成 tag 会更好一点
export type ComponentsItem = IFormCreateItem;

export interface IDraggableComponentsItem extends ComponentsItem {
  props?: any;
  class?: string;
  native?: boolean;
}

export interface FormItemProps {
  item?: IDraggableComponentsItem;
}

export interface ComponentsResult {
  list: IDraggableComponentsItem[];
  tags: string[];
}

export interface IFcComponentsListState extends ComponentsResult {
  loading: boolean;
  defaultActive: string | string[];
  chooseType: string;
  draggableOptions: IDraggableOptions;
  selectCurrentItem: Partial<IDraggableComponentsItem>;
  filterData: {
    [props: string]: IDraggableComponentsItem[];
  };
  cacheData: {
    [props: string]: IDraggableComponentsItem[];
  };
}
