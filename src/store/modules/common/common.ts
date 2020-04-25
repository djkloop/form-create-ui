import { Module } from "vuex";
import { ICommonState } from "./common.interface";
import { AnyType } from "@/interface/common";

const commonModule: Module<ICommonState, AnyType> = {
  namespaced: true,
  state: {
    list: [],
  },
  getters: {},
  mutations: {
    setList(state, list) {
      state.list = list;
    },
  },
  actions: {},
};

export default commonModule;
