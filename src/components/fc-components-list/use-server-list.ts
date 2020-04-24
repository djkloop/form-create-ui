import { onBeforeMount } from '@vue/composition-api'
import { ResponseHandle } from '@/interface/response';
import { ComponentsResult } from '@/interface/components';
import  axios from 'axios';

function useServerList() {
  const getServerList = async () => await axios.get<never, ResponseHandle<ComponentsResult>>("/api/getComponentsList");
  console.log(getServerList)
}

export default useServerList;
