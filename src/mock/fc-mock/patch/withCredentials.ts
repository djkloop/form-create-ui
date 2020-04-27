/* eslint-disable prefer-rest-params */

import { AnyType } from "@/interface/common";

/* eslint-disable prefer-spread */
export default function(Mock: AnyType) {
  // http://cnine.me/note/FrontEnd/mock-lose-cookies-dbg.html
  Mock.XHR.prototype.__send = Mock.XHR.prototype.send;
  Mock.XHR.prototype.send = function() {
    if (this.custom.xhr) this.custom.xhr.withCredentials = this.withCredentials || false;
    this.__send.apply(this, arguments);
  };
}
