import Vue from "vue";
import VueCompositionApi from "@vue/composition-api";
/// element-ui
import ElementUI from "element-ui";
import "normalize.css";
import "element-ui/lib/theme-chalk/index.css";
/// axios
import axios from "axios";
import VueAxios from "vue-axios";

function installPlugins() {
  Vue.use(VueCompositionApi);
  Vue.use(ElementUI);
  Vue.use(VueAxios, axios);
}

export default installPlugins;
