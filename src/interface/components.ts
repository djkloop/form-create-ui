/*
 * @Author       : djkloop
 * @Date         : 2020-04-24 23:25:04
 * @LastEditors   : djkloop
 * @LastEditTime  : 2020-04-29 17:55:26
 * @Description  : 组件相关的interface
 * @FilePath      : /form-create-ui/src/interface/components.ts
 */
import { IDraggableOptions, AnyType } from "./common";
import { ElRow } from "./element-ui-type";

/// TODO: 这里需要更加语义化
/// 例如type 换成 tag 会更好一点
export interface ComponentsItem {
  type: string;
  label: string;
  sort: number;
  icon: string;
  key: string;
  tag: string;
  options?: Partial<ElRow>;
  uniqueKey?: string;
  model?: string;
  attrs?: AnyType;
  span?: number;
  children?: Partial<ComponentsItem>[];
}

export interface FormItemProps {
  item?: ComponentsItem;
}

export interface ComponentsResult {
  list: ComponentsItem[];
  tags: string[];
}

export interface IFcComponentsListState extends ComponentsResult {
  loading: boolean;
  defaultActive: string | string[];
  chooseType: string;
  draggableOptions: IDraggableOptions;
  selectCurrentItem: Partial<ComponentsItem>;
  filterData: {
    [props: string]: ComponentsItem[];
  };
  cacheData: {
    [props: string]: ComponentsItem[];
  };
}
