/*
 * @Author        : djkloop
 * @Date          : 2020-05-07 17:37:33
 * @LastEditors   : djkloop
 * @LastEditTime  : 2020-05-07 18:38:45
 * @Description   : 头部注释
 * @FilePath      : /form-create-ui/src/packages/@form-create/create-item-rule/index.ts
 */

import { AnyType } from "@/interface/common";

export default class CreateFormItemRule {
  props: AnyType;

  constructor(props: AnyType) {
    this.props = props;
    console.log(this.props);
  }

  setup() {
    console.log("setup");
  }
}
