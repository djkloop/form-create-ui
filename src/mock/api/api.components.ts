/*
 * @Author       : djkloop
 * @Date         : 2020-04-24 23:25:04
 * @LastEditors   : djkloop
 * @LastEditTime  : 2020-05-12 12:09:56
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
              type: "input",
              field: "",
              label: "单行输入框",
              value: "iphone 7",
              listIcon: "el-icon-edit",
              itemTag: "基础组件",
              props: {
                type: "text",
              },
              validate: [{ required: true, message: "请输入goods_name", trigger: "blur" }],
            },
            {
              type: "input",
              field: "",
              label: "多行文本框",
              value: "",
              listIcon: "el-icon-edit",
              itemTag: "基础组件",
              props: {
                type: "textarea",
              },
              validate: [{ required: true, message: "请输入goods_name", trigger: "blur" }],
            },
            {
              type: "el-row",
              children: [
                {
                  type: "el-col",
                  props: {
                    span: 12,
                  },
                  children: [],
                },
                {
                  type: "el-col",
                  props: {
                    span: 12,
                  },
                  children: [],
                },
              ],
              label: "栅格布局",
              listIcon: "el-icon-c-scale-to-original",
              itemTag: "布局组件",
              listTag: "fc-grid",
            },
            // {
            //   type: "fc-card",
            //   tag: "fc-card",
            //   label: "卡片布局",
            //   icon: "el-icon-c-scale-to-original",
            //   key: "布局组件",
            //   model: "", // 数据字段
            //   sort: 4,
            //   options: {},
            //   children: [
            //     {
            //       span: 12,
            //       children: [],
            //     },
            //     {
            //       span: 12,
            //       children: [],
            //     },
            //   ],
            // },
          ],
        },
      };
    },
  },
];

export default respose;
