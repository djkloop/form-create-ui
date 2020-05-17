/*
 * @Author        : djkloop
 * @Date          : 2020-04-26 11:45:07
 * @LastEditors   : djkloop
 * @LastEditTime  : 2020-04-28 16:16:46
 * @Description   : 头部注释
 * @FilePath      : /form-create-ui/src/store/modules/common/common.interface.ts
 */
import { ComponentsItem } from "@/interface/components";
import { ActionContext, ActionPayload } from "vuex";
import { AnyType } from "@/interface/common";

export interface ICommonState {
  list: ComponentsItem[];
  selectCurrentItem: Partial<ComponentsItem>;
  baseList: AnyType[];
  selectType: string;
}

export interface ICommonActions {
  setServerList: (ctx: ActionContext<ICommonState, AnyType>, payload: ActionPayload) => void;
}
