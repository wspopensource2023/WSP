<template>
  <div class="tw-w-full" style="padding-bottom: 20px;">
    <div class="scroll-container">
      <div class="tw-mt-10"></div>
      <div class="section-content">
        <div class="tw-grid tw-gap-7 grid-cols">
          <div class="campaign-card" v-for="(item, index) in list" :key="index">
            <Achievement v-if="getItemMode(item) == 'achievement'" :item="item">
            </Achievement>
            <Campaign v-if="getItemMode(item) == 'campaign'" :item="item">
            </Campaign>
          </div>
        </div>
        <div class="loading-box" v-show="isLoading">
          <img
            class="loading-img"
            src="https://galxe.com/_nuxt/img/loading.11e7f66.webp"
            alt=""
          />
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import ActivityItem from "@/components/Activity/List/Item.vue";
import { apiService } from "@/apis/apis";
import { onUnmounted } from "vue";
import Nav from "@/components/Nav/Nav.vue";
import Footer from "@/components/Footer/Footer.vue"
import Achievement from "@/components/Activity/List/Achievement.vue";
import Campaign from "@/components/Activity/List/Campaign.vue";

export default {
  components: {
    ActivityItem,
    Nav,
    Achievement,
    Campaign,
    Footer
  },
  setup() {
    onUnmounted(() => {
      window.removeEventListener("scroll", () => {});
    });
  },
  data() {
    return {
      list: [] as object[],
      isLoading: false,
      page: 1,
      pageSize: 15,
      campaignType: "",
      isNoMore: false,
    };
  },
  async created() {
    await this.getActivities();
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
        console.log(this.isNoMore, "this.isNoMore");
        if (!this.isNoMore) {
          this.getActivities();
        }
      }
    },
    load() {
      console.log("loading.....", this.page);
    },
    getItemMode(item: any) {
      if (item.campaign_type == "campaign") {
        return "campaign";
      } else {
        return "achievement";
      }
    },
    async getActivities() {
      if (this.isLoading) return; // 如果正在加载数据，则退出
      this.isLoading = true; // 标记正在加载数据
      await apiService
        .ListCampaign(this.campaignType, this.pageSize, this.page)
        .then((res) => {
          console.log(res);
          this.list.push(...res.campaign_list);
          if (res.campaign_list.length >= this.pageSize) {
            this.page++;
            this.isNoMore = false;
          } else {
            this.isNoMore = true;
          }
        });
      this.isLoading = false;
    },
  },
};
</script>

<style>
.section-content {
  max-width: 2048px;
  margin: 0 auto;
  width: 100%;
  padding: 0 64px;
}
@media all and (min-width: 1800px) {
  .grid-cols {
    grid-template-columns: repeat(6, minmax(100px, 100%));
  }
}
@media screen and (max-width: 1800px) {
  .grid-cols {
    grid-template-columns: repeat(5, minmax(100px, 100%));
  }
}
@media screen and (max-width: 1500px) {
  .grid-cols {
    grid-template-columns: repeat(4, minmax(100px, 100%));
  }
}
@media screen and (max-width: 1300px) {
  .grid-cols {
    grid-template-columns: repeat(3, minmax(100px, 100%));
  }
}
@media screen and (max-width: 958px) {
  .grid-cols {
    grid-template-columns: repeat(3, minmax(100px, 100%));
  }
}
.campaign-card {
  border-radius: 12px;
  overflow: hidden;
  transition: all 0.2s cubic-bezier(0.17, 0.67, 0.83, 0.67);
  cursor: pointer;
}
.campaign-card:hover {
  transform: scale(1.05);
}
.loading-spinner {
  text-align: center;
  margin-top: 10px;
}
.loading-box {
  display: flex;
  justify-content: center;
  margin-top: 40px !important;
  margin-bottom: 64px !important;
}
.loading-img {
  width: 88px;
  height: 16px;
}
</style>
