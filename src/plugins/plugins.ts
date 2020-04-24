import Vue from "vue";
import VueCompositionApi from "@vue/composition-api";
/// element-ui
import ElementUI from "element-ui";
import "normalize.css";
import "element-ui/lib/theme-chalk/index.css";

function installPlugins() {
  Vue.use(VueCompositionApi);
  Vue.use(ElementUI);
}

export default installPlugins;
