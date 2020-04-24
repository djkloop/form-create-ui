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
            list: [
              {
                type: "input",
                label: "单行输入框",
                sort: 4
              }
            ]
          }
        }
      }
    }
]

export default respose
