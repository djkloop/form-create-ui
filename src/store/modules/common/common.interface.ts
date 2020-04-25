import { ComponentsItem } from "@/interface/components";
import { ActionContext, ActionPayload } from "vuex";

export interface ICommonState {
  list: ComponentsItem[];
  selectCurrentItem: Partial<ComponentsItem>;
  mainList: any[];
}

export interface ICommonActions {
  setServerList: (ctx: ActionContext<ICommonState, any>, payload: ActionPayload) => void;
}
