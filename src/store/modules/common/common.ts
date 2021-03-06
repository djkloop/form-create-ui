/*
 * @Author        : djkloop
 * @Date          : 2020-04-26 11:45:07
 * @LastEditors   : djkloop
 * @LastEditTime  : 2020-04-28 16:17:24
 * @Description   : 全局store
 * @FilePath      : /form-create-ui/src/store/modules/common/common.ts
 */
import { Module } from "vuex";
import { ICommonState } from "./common.interface";
import { AnyType } from "@/interface/common";

const commonModule: Module<ICommonState, AnyType> = {
  namespaced: true,
  state: {
    list: [],
    selectCurrentItem: {},
    mainList: [],
    selectType: "",
  },
  getters: {
    getMainList(state) {
      return state.mainList;
    },
    getSelectItem(state) {
      return state.selectCurrentItem;
    },
  },
  mutations: {
    setList(state, list) {
      state.list = list;
    },
    setCurrentItem(state, item) {
      state.selectCurrentItem = item;
    },
    pushMainList(state, item) {
      state.mainList.push(item);
    },
    setMainList(state, list) {
      state.mainList = list;
    },
    setSelectType(state, type) {
      state.selectType = type;
    },
  },
  actions: {},
};

export default commonModule;
