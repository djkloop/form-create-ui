/*
 * @Author        : djkloop
 * @Date          : 2020-04-27 15:40:33
 * @LastEditors   : djkloop
 * @LastEditTime  : 2020-04-27 17:18:13
 * @Description   : 头部注释
 * @FilePath      : /form-create-ui/src/interface/utils.interface.ts
 */

import { AnyType } from "./common";

type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends Record<string, AnyType> ? DeepPartial<T[P]> : T[P];
};

type DeepRequired<T> = {
  [P in keyof T]-?: T[P] extends Record<string, AnyType> ? DeepRequired<T[P]> : T[P];
};

export { DeepRequired, DeepPartial };
