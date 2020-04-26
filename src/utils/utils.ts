/*
 * @Author        : djkloop
 * @Date          : 2020-04-26 11:45:07
 * @LastEditors   : djkloop
 * @LastEditTime  : 2020-04-26 13:28:29
 * @Description   : 工具方法
 * @FilePath      : /form-create-ui/src/utils/utils.ts
 */
import dayjs from "dayjs";
import uniqueId from "lodash.uniqueid";

class Utils {

  public static generateUniqueKeyUtils(t: string): string {
    return uniqueId(`${t}__key`) + "__" + dayjs(new Date().getTime()).format("YYYY_MM_DD_HH_mm_sss");
  }

}


export default Utils;
