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

function installPlugins() {
  Vue.use(VueCompositionApi);
  Vue.use(ElementUI);
  Vue.use(VueAxios, axios);
  Vue.use(hooks);
}

export default installPlugins;
