/*
 * @Author       : djkloop
 * @Date         : 2020-04-24 23:25:04
 * @LastEditors  : djkloop
 * @LastEditTime : 2020-04-25 23:39:39
 * @Description  : 注册所有用到的插件
 * @FilePath     : /form-create-ui/src/plugins/plugins.ts
 */
import Vue from "vue";
import VueCompositionApi from "@vue/composition-api";
import hooks from "@u3u/vue-hooks";

/// element-ui
import ElementUI from "element-ui";
import "normalize.css";
import "element-ui/lib/theme-chalk/index.css";
/// axios
import axios from "axios";
import VueAxios from "vue-axios";
/// vue-toast
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";

function installPlugins() {
  Vue.use(VueCompositionApi);
  Vue.use(ElementUI);
  Vue.use(VueAxios, axios);
  Vue.use(hooks);
  Vue.use(Toast);
}

export default installPlugins;
