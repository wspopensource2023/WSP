import App from "./App";
import "@/library/tailwind.css";

// 仅在微信小程序上用到 运行到h5报错
// #ifdef MP-WEIXIN
import "@/static/style.css"
// #endif


import lodash from "lodash";
import { createPinia } from "pinia";
import piniaPersist from "pinia-plugin-persist-uni";

const pinia = createPinia();
pinia.use(piniaPersist);

// #ifndef VUE3
import Vue from "vue";
Vue.config.productionTip = false;
App.mpType = "app";
// name is optional
Vue.use(VueLodash, {
    lodash: lodash,
});

const app = new Vue({
    ...App,
});
app.$mount();

// #endif

// #ifdef VUE3
import { createSSRApp } from "vue";
export function createApp() {
    const app = createSSRApp(App);
    console.log("createSSRApp", app);
    app.use(pinia);
    return {
        app,
    };
}
// #endif
