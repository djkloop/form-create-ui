import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import Home from "@/views/ui/element/index.vue";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/choose-ui/:ui",
    name: "ChooseUI",
    component: () =>
      import(/* webpackChunkName: "choose-ui" */ "@/views/choose-ui/index.vue")
  }
];

const router = new VueRouter({
  routes
});

export default router;
