import { ResponseHandle } from "@/interface/response";
import { ComponentsResult, IFcComponentsListState } from "@/interface/components";
import axios, { AxiosResponse } from "axios";

async function fetchServerList(state: IFcComponentsListState) {
  const result = await axios.get<
    never,
    AxiosResponse<ResponseHandle<ComponentsResult>>
  >("/api/getComponentsList");
  if (result.data.code === 0) {
    state.list = result.data.result.list;
    state.tags = result.data.result.tags;

    const obj: any = {}

    state.tags.forEach(item => {
      obj[item] = state.list.filter(k => k.key === item)
    })
    state.filterData  = obj
    state.loading = false;
  } else {
    state.loading = true;
  }
}

export default fetchServerList;
