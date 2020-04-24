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
    state.loading = false;
  } else {
    state.loading = true;
  }
}

export default fetchServerList;
