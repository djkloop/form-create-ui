/*
 * @Author       : djkloop
 * @Date         : 2020-04-24 23:25:04
 * @LastEditors   : djkloop
 * @LastEditTime  : 2020-04-26 12:16:13
 * @Description  : mocks数据
 * @FilePath      : /form-create-ui/src/mock/api/api.components.ts
 */
import { ResponseWithMockJS } from "@/interface/response";
import { ComponentsResult } from "@/interface/components";

const respose: Array<ResponseWithMockJS<ComponentsResult>> = [
  {
    path: "/api/getComponentsList",
    method: "get",
    handle() {
      return {
        code: 0,
        message: "获取组件成功",
        result: {
          tags: ["基础组件", "布局组件"],
          list: [
            {
              type: "el-input",
              label: "单行输入框",
              key: "基础组件",
              tag: "el-input",
              icon: "el-icon-edit",
              model: "", // 数据字段
              sort: 4,
              attrs: {
                type: "text",
              },
            },
            {
              type: "el-input",
              tag: "el-input",
              label: "多行输入框",
              key: "基础组件",
              model: "", // 数据字段
              icon: "el-icon-edit",
              sort: 4,
              attrs: {
                type: "textarea",
              },
            },
            {
              type: "el-row",
              tag: "el-row",
              label: "卡片布局",
              icon: "el-icon-c-scale-to-original",
              key: "布局组件",
              model: "", // 数据字段
              sort: 4,
            },
          ],
        },
      };
    },
  },
];

export default respose;
