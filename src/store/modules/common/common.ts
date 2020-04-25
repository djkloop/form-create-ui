import { Module } from "vuex";
import { ICommonState } from "./common.interface";
import { AnyType } from "@/interface/common";

const commonModule: Module<ICommonState, AnyType> = {
  namespaced: true,
  state: {
    list: [],
    selectCurrentItem: {},
    mainList: [],
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
    setMainList(state, item) {
      state.mainList.push(item);
    },
  },
  actions: {},
};

export default commonModule;
