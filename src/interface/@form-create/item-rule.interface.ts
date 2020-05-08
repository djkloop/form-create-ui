/*
 * @Author        : djkloop
 * @Date          : 2020-05-07 17:40:28
 * @LastEditors   : djkloop
 * @LastEditTime  : 2020-05-08 16:20:31
 * @Description   : 创建item属性
 * @FilePath      : /form-create-ui/src/interface/@form-create/item-rule.interface.ts
 */
import { IFormCreateItemBase } from "./item-base.interface";
import { AnyType } from "../common";

export interface IFormCreateItem extends IFormCreateItemBase {
  validate?: AnyType[];
  col?: {
    span?: number;
    labelWidth?: number;
  };
  emit?: string[];
  template?: string;
  emitPrefix?: string;
  title?: string;
  info?: string;
  native?: boolean;
  inject?: boolean;
  value?: AnyType;
  className?: AnyType;
  defaultSlot?: AnyType;
  visibility?: boolean;
  children?: Partial<IFormCreateItem>[];
  listIcon?: string;
  itemTag?: string;
  uniqueKey?: string;
  class?: string;
  [key: string]: AnyType;
}
