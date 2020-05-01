/*
 * @Author       : djkloop
 * @Date         : 2020-04-24 23:25:04
 * @LastEditors  : djkloop
 * @LastEditTime : 2020-05-01 16:43:16
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

/// fc-components
import FcTips from "@/components/common/fc-tips/fc-tips.vue";

function installPlugins() {
  Vue.use(VueCompositionApi);
  Vue.use(ElementUI);
  Vue.component(FcTips.name, FcTips);
  Vue.use(VueAxios, axios);
  Vue.use(hooks);
}

export default installPlugins;
