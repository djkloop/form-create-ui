import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import installPlugins from "@/plugins/plugins";
import "@/mock";

Vue.config.productionTip = false;

/// install plugins
installPlugins();

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
