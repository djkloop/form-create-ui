import { ResponseWithMockJS } from '@/interface/response';
import { ComponentsResult } from '@/interface/components';

const respose: Array<ResponseWithMockJS<ComponentsResult>> = [
  {
      path: '/api/getComponentsList',
      method: 'get',
      handle() {
        return {
          code: 0,
          message: '获取组件成功',
          result: {
            tags: [ "基础组件", "布局组件" ],
            list: [
              {
                type: "el-input",
                label: "单行输入框",
                key: '基础组件',
                sort: 4
              },
              {
                type: "el-row",
                label: "卡片布局",
                key: '布局组件',
                sort: 4
              }
            ]
          }
        }
      }
    }
]

export default respose
