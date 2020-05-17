/*
 * @Author        : djkloop
 * @Date          : 2020-04-26 11:45:07
 * @LastEditors  : djkloop
 * @LastEditTime : 2020-05-16 16:35:22
 * @Description   : 工具方法
 * @FilePath     : /form-create-ui/src/utils/utils.ts
 */
import dayjs from "dayjs";
import uniqueId from "lodash.uniqueid";
import { AnyType } from "@/interface/common";

class Utils {
  public static generateUniqueKeyUtils(t: string): string {
    return uniqueId(`${t}__key`) + "__" + dayjs(new Date().getTime()).format("YYYY_MM_DD_HH_mm_sss");
  }

  public static logs(actionTitle: string, obj: AnyType) {
    console.log(`------------------${actionTitle} - before --------------------`);
    console.log(obj);
    console.log(`------------------${actionTitle} - after --------------------`);
    console.log("\n");
  }
}

export default Utils;
