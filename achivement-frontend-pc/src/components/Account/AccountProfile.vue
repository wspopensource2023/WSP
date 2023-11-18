<template>
  <div class="tw-bg-black tw-w-full tw-h-full" style="padding-bottom: 20px;">
    <div class="tw-bg-black tw-w-full">
      <div class="tw-relative tw-w-full tw-h-1/3">
        <div
          class="tw-h-60 tw-w-auto tw-overflow-hidden"
          style="display: flex; justify-content: center"
        >
          <img
            class="tw-w-full"
            style="object-fit: cover"
            :src="issuer.account_banner"
          />
        </div>
        <div class="tw-absolute tw--bottom-12 tw-left-16">
          <div class="tw-h-48 tw-w-48 tw-ring-8 tw-ring-white tw-rounded-full">
            <img
              class="tw-h-48 tw-w-48 tw-rounded-full"
              :src="issuer.account_avatar"
            />
          </div>
        </div>
      </div>
      <div class="tw-relative tw-w-full tw-h-1/3 tw-p-12">
        <div class="tw-w-full tw-h-full">
          <div class="tw-w-full tw-h-full tw-pt-6">
            <p class="tw-text-2xl tw-font-bold">
              {{ issuer.account_name }}
              <img class="tw-w-8 tw-h-8" src="../../assets/img/blue.png" alt="">
            </p>
            <div class="tw-relative tw-mt-4  tw-pt-1 tw-pb-3">
              <div class="tw-whitespace-pre-line tw-text-lg tw-font-semibold tw-text-[#ffffff] tw-opacity-60">
                {{ issuer.account_desc }}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="tw-w-full tw-px-12">
        <div class="">
          <div class="sd-tools">
            <div class="tabs">
              <div
                class="tab"
                :class="{ active: tabIndex === 1 }"
                @click="changeTab(1)"
              >
                收集成就
              </div>
               <div
                class="tab"
                :class="{ active: tabIndex === 2 }"
                @click="changeTab(2)"
              >
                发行成就
              </div>
            </div>
          </div>
          <div class="tw-w-full tw-h-full tw-mt-5">
            <div
              class="tw-grid tw-grid tw-grid-cols-5 sm:tw-grid-cols-2 md:tw-grid-cols-3 lg:tw-grid-cols-4 xl:tw-grid-cols-5 2xl:tw-grid-cols-6 tw-gap-5"
            >
              <div
                class="campaign-card"
                v-for="(item, index) in campaign_list"
                :key="index"
              >
                <ProfileItem
                  v-if="getItemMode(item) == 'achievement'"
                  :item="item"
                ></ProfileItem>
                <ProfileCampaign
                  v-if="getItemMode(item) == 'campaign'"
                  :item="item"
                ></ProfileCampaign>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Nav from "@/components/Nav/Nav.vue";
import { apiService } from "@/apis/apis";
import { useRoute } from "vue-router";
import ProfileItem from "@/components/Activity/List/ProfileItem.vue"
// import Campaign from "@/components/Activity/List/Campaign.vue";
import ProfileCampaign from "@/components/Activity/List/ProfileCampaign.vue"
import IconFont from "@/components/Activity/Detail/IconFont.vue";
export default {
  components: {
    Nav,
    ProfileCampaign,
    IconFont,
    ProfileItem
  },
  data() {
    const route = useRoute();
    return {
      issuer_account_id: route.params.id as string,
      issuer: {
        account_banner: "",
        account_avatar: "",
        account_name: "",
        account_desc: "",
        issuer: false, // false：个人 true: 发行方
      },
      campaign_list: [] as object[],
      visible: false,
      tablist: [] as any[],
      tabIndex: 1, // 1: 我的发行 2: 我的成就
      limit: 15,
      skip: 1,
      isNoMore: true,
      isChangeTab: false,
      ListAccountCampaignIssuedNum:0
    };
  },
  created() {
    this.getAccountProfile();
  },
  mounted() {
    this.$nextTick(() => {
      window.addEventListener("scroll", (e: any) => {
        this.scrollEvent(e);
      });
    });
  },
  methods: {
    scrollEvent(e: any) {
      let dom = document.documentElement || document.body;
      let scrollTop = dom.scrollTop;
      let windowHeight = dom.clientHeight;
      let scrollHeight = dom.scrollHeight;
      if (scrollTop + windowHeight == scrollHeight) {
        // 当前滚动条已经触底
        if (!this.isNoMore) {
          if (this.tabIndex === 1) {
            this.ListAccountCampaignIssued()
          } else {
            this.ListAccountCampaign();
          }
        }
      }
    },

    async getAccountProfile() {
      const res = await apiService.GetAccountProfile(this.issuer_account_id);
      if (res) {
        this.issuer = res;
        if (this.issuer.issuer) {
          this.tabIndex = 1
          this.ListAccountCampaignIssued();
        } else {
          this.tabIndex = 2
          this.ListAccountCampaign();
        }
      }
    },

    async ListAccountCampaignIssued() {
      if (this.isChangeTab) {
        this.campaign_list = []
      }
      const res = await apiService.ListAccountCampaignIssued(
        this.issuer_account_id,
        this.limit,
        this.skip
      );
      if (res) {
        console.log(res);
        this.isChangeTab = false
        this.campaign_list.push(...res);
        if (res.length >= this.limit) {
          this.skip++;
          this.isNoMore = false;
        } else {
          this.isNoMore = true;
        }
      }
    },

    async ListAccountCampaign() {
      if (this.isChangeTab) {
        this.campaign_list = []
      }
      const res = await apiService.ListAccountCampaign(
        this.issuer_account_id,
        this.limit,
        this.skip
      );
      if (res) {
        this.isChangeTab = false
        this.campaign_list.push(...res);
        if (res.length >= this.limit) {
          this.skip ++
           this.isNoMore = false;
        } else {
          this.isNoMore = true;
        }
      }
    },

    async changeTab(type: any){
      this.isChangeTab = true
      this.tabIndex = type;
      this.skip = 1;
      this.isNoMore = false
      if (this.tabIndex === 1) {
        await this.ListAccountCampaignIssued()
      } else {
        await this.ListAccountCampaign();
      }
    },
    getItemMode(item: any) {
      if (item.campaign_type == "campaign") {
        return "campaign";
      } else {
        return "achievement";
      }
    },
    show() {
      console.log("show");
      this.visible = true;
    },
    hide() {
      console.log("hide");
      this.visible = false;
    },
  },
};
</script>

<style scoped>
.tab-box {
  width: 100%;
  height: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 160px;
}
.sd-camp-content {
  display: flex;
  flex-direction: column;
  height: auto;
  width: 1480px;
}
.sd-tools {
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #1b1e24;
  overflow-x: auto;
}
.tabs {
  display: inline-flex;
  width: 100%;
  align-items: center;
  list-style: none;
  padding: 0;
  white-space: nowrap;
}
.tab {
  cursor: pointer;
  margin-right: 60px;
  display: inline-flex;
  font-weight: 400;
  padding-bottom: 12px;
  font-size: 20px;
  line-height: 34px;
  color: rgba(255, 255, 255, 0.66);
  border-bottom: 3px solid transparent;
}
.active {
  border-color: #ffffff;
  color: #ffffff;
}
</style>
