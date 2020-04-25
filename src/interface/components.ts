import { AnyType } from "./common";

export interface ComponentsItem {
  type: string;
  label: string;
  sort: number;
  icon: string;
  key: string;
  uniqueKey?: string;
}

export interface ComponentsResult {
  list: ComponentsItem[];
  tags: string[];
}

export interface IFcComponentsListState extends ComponentsResult {
  loading: boolean;
  defaultActive: string | string[];
  chooseType: string;
  filterData: {
    [props: string]: ComponentsItem[];
  };
  draggableOptions: AnyType;
}
