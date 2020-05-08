/*
 * @Author        : djkloop
 * @Date          : 2020-04-26 11:45:07
 * @LastEditors   : djkloop
 * @LastEditTime  : 2020-05-08 11:24:56
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
    /**
     * 从后台请求的列表
     *
     * @param state Stroe
     * @param list
     */
    setList(state, list) {
      state.list = list;
    },
    /**
     * 当前选中的Item
     *
     * @param state Stroe
     * @param item
     */
    setCurrentItem(state, item) {
      state.selectCurrentItem = item;
    },
    /**
     * 向主区域列表添加Item
     *
     * @param state
     * @param item
     */
    pushMainList(state, item) {
      state.mainList.push(item);
    },
    /**
     * 设置主区域列表
     *
     * @param state
     * @param list
     */
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
