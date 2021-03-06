/*
 * @Author        : djkloop
 * @Date          : 2020-04-26 11:45:07
 * @LastEditors   : djkloop
 * @LastEditTime  : 2020-04-29 17:53:34
 * @Description   : 头部注释
 * @FilePath      : /form-create-ui/src/components/fc-components-list/use-server-list.ts
 */
import { ResponseHandle } from "@/interface/response";
import { ComponentsResult, IFcComponentsListState, ComponentsItem } from "@/interface/components";
import axios, { AxiosResponse } from "axios";
import { useMutations } from "@u3u/vue-hooks";
import cloneDeep from "lodash.clonedeep";

async function fetchServerList(state: IFcComponentsListState) {
  const result = await axios.get<never, AxiosResponse<ResponseHandle<ComponentsResult>>>("/api/getComponentsList");
  if (result.data.code === 0) {
    state.list = result.data.result.list;
    state.tags = result.data.result.tags;

    const obj: { [props: string]: ComponentsItem[] } = {};

    /// 把server返回的列表存进去
    const setStoreList = {
      ...useMutations("common", ["setList"]),
    };
    setStoreList.setList(state.list);

    state.tags.forEach(item => {
      obj[item] = state.list.filter(k => k.key === item);
    });
    state.filterData = obj;
    state.cacheData = cloneDeep(obj);

    state.loading = false;
  } else {
    state.loading = true;
  }
}

export default fetchServerList;
