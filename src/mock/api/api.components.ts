/*
 * @Author       : djkloop
 * @Date         : 2020-04-24 23:25:04
 * @LastEditors   : djkloop
 * @LastEditTime  : 2020-05-08 13:55:49
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
              field: "goods_name",
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
              field: "goods_name1",
              label: "单行输入框1",
              value: "iphone 7",
              listIcon: "el-icon-edit",
              itemTag: "基础组件",
              props: {
                type: "text",
              },
              validate: [{ required: true, message: "请输入goods_name", trigger: "blur" }],
            },
            // {
            //   type: "el-input",
            //   tag: "el-input",
            //   label: "多行输入框",
            //   key: "基础组件",
            //   model: "", // 数据字段
            //   icon: "el-icon-edit",
            //   sort: 4,
            //   options: {},
            //   attrs: {
            //     type: "textarea",
            //   },
            // },
            // {
            //   type: "fc-grid",
            //   tag: "fc-grid",
            //   label: "栅格布局",
            //   icon: "el-icon-c-scale-to-original",
            //   key: "布局组件",
            //   model: "", // 数据字段
            //   sort: 4,
            //   options: {
            //     gutter: 0,
            //   },
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
