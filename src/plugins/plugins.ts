/*
 * @Author       : djkloop
 * @Date         : 2020-04-24 23:25:04
 * @LastEditors  : djkloop
 * @LastEditTime : 2020-05-08 23:13:33
 * @Description  : 注册所有用到的插件
 * @FilePath     : /form-create-ui/src/plugins/plugins.ts
 */
import Vue from "vue";
import VueCompositionApi from "@vue/composition-api";
import hooks from "@u3u/vue-hooks";
import Draggable from "vuedraggable";

/// element-ui
import ElementUI from "element-ui";
import "normalize.css";
import "element-ui/lib/theme-chalk/index.css";
/// form-create
import formCreate from "@form-create/element-ui";

/// axios
import axios from "axios";
import VueAxios from "vue-axios";

/// fc-components
import FcTips from "@/components/common/fc-tips/fc-tips.vue";
/// form-create-item-wrapper custom component
import FormCreateItemWrapper from "@/components/fc-render/form/form.vue";

function installPlugins() {
  Vue.use(VueCompositionApi);
  Vue.use(ElementUI);
  Vue.component(FormCreateItemWrapper.name, FormCreateItemWrapper);
  Vue.use(formCreate);
  Vue.component(Draggable.name, Draggable);
  Vue.component(FcTips.name, FcTips);
  Vue.use(VueAxios, axios);
  Vue.use(hooks);
}

export default installPlugins;
