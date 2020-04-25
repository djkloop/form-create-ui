import { ComponentsItem } from '@/interface/components';
import { ActionContext, ActionPayload } from "vuex";

export interface ICommonState {
  list: ComponentsItem[]
}

export interface ICommonActions {
  setServerList: (ctx: ActionContext<ICommonState, any>,  payload: ActionPayload) => void
}