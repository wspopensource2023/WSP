import { createRouter, createWebHistory } from "vue-router";
import Index from "@/views/Index.vue";
import UserGuide from "@/views/Profile/UserGuide.vue";
import ActivityDetail from "@/views/Activity/Detail.vue";
import CampaignsDetail from "@/components/Activity/Detail/CampaignsDetail.vue";
import ActivityList from "@/views/Activity/List.vue";
import Login from "@/views/Login.vue";
import Layout from "@/layout/index.vue";
import AccountProfile from "@/components/Account/AccountProfile.vue";
import EditInformation from "@/views/Profile/EditInformation.vue";
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/app/achievement",
      name: "Index",
      component: Layout,
      redirect: "/app/achievement/activity/list",
      children: [
        {
          path: "/app/achievement/login",
          name: "login",
          component: Login,
        },
      
        {
          path: "/app/achievement/activity/list",
          name: "ActivityList",
          component: ActivityList,
        },
        {
          path: "/app/achievement/activity/detail/:id",
          name: "ActivityDetail",
          component: ActivityDetail,
        },
        {
          path: "/app/achievement/activity/campaigns/detail/:id",
          name: "CampaignsDetail",
          component: CampaignsDetail,
        },
        {
          path: "/app/achievement/account/profile/:id",
          name: "AccountProfile",
          component: AccountProfile,
        },
        {
          path: "/app/achievement/account/editInformation",
          name: "EditInformation",
          component: EditInformation,
        },
      ],
      },
    {
        path: "/app/achievement/profile/guide",
        name: "UserGuide",
        component: UserGuide,
    },
  ],
});

export default router;
