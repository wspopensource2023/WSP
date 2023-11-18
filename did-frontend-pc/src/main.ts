import { createApp } from "vue";
import { createPinia } from "pinia";
import piniaPluginPersist from "pinia-plugin-persist";
import "@mdi/font/css/materialdesignicons.css";
import App from "./App.vue";
import router from "./router";
import "vuetify/styles";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import "@/assets/tailwind.css";
import "@/assets/main.css";
import "@/assets/font.css";
import { aliases, mdi } from "vuetify/iconsets/mdi";

const app = createApp(App);

const vuetify = createVuetify({
    icons: {
        defaultSet: "mdi",
        aliases,
        sets: {
            mdi,
        },
    },
    theme: {
        defaultTheme: "dark",
    },
    components,
    directives,
});

const store = createPinia();
store.use(piniaPluginPersist);

app.use(vuetify);

app.use(store);
app.use(router);

app.mount("#app");
