import { createRouter, createWebHistory } from "vue-router";
import PageProfile from "@/views/PageProfile.vue";
import PageProfileConfig from "@/views/PageProfileConfig.vue";
import PageLogin from "@/views/PageLogin.vue";
import PageDID from "@/views/PageDID.vue";
import PageIndex from "@/views/PageIndex.vue";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: "/",
            name: "PageIndex",
            component: PageIndex,
        },
        {
            path: "/:did",
            name: "PageProfile",
            component: PageProfile,
        },
        {
            path: "/app/did",
            name: "PageDID",
            component: PageDID,
        },
        {
            path: "/app/did/edit/:profileId?",
            name: "PageProfileConfig",
            component: PageProfileConfig,
        },
        {
            path: "/app/login",
            name: "PageLogin",
            component: PageLogin,
        },
    ],
});

export default router;
