import { ResponseHandle } from "@/interface/response";
import { ComponentsResult } from "@/interface/components";
import axios from "axios";

function useServerList() {
  return new Promise(async resolve => {
    const result = await axios.get<never, ResponseHandle<ComponentsResult>>("/api/getComponentsList");
    resolve(result);
  });
}

export default useServerList;
