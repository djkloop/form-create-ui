/*
 * @Author        : djkloop
 * @Date          : 2020-04-27 15:26:46
 * @LastEditors   : djkloop
 * @LastEditTime  : 2020-04-27 15:26:59
 * @Description   : 头部注释
 * @FilePath      : /form-create-ui/src/interface/element-ui-type.ts
 */

/** Horizontal alignment of flex layout */
export type HorizontalAlignment = "start" | "end" | "center" | "space-around" | "space-between";

/** vertical alignment of flex layout */
export type VertialAlignment = "top" | "middle" | "bottom";

/** Row Layout Component */
export declare class ElRow {
  /** Grid spacing */
  gutter: number;

  /** Layout mode. You can use flex. Works in modern browsers */
  type: string;

  /** Horizontal alignment of flex layout */
  justify: HorizontalAlignment;

  /** Vertical alignment of flex layout */
  align: VertialAlignment;

  /** Custom element tag */
  tag: string;
}
