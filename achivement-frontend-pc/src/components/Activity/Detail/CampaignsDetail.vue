<template>
    <div class="tw-bg-black tw-w-full ">
        <div class="tw-w-full tw-h-full tw-bg-black tw-flex tw-justify-center">
            <div class="tw-h-1/2 tw-w-4/5 tw-bg-black">
                <div class="tw-font-black tw-pt-2 tw-pb-2 tw-text-2xl">
                  {{this.campaign.campaign_name}}
                </div>
                <div class="tw-relative tw-mt-4 tw-pt-1 tw-pb-3 tw-h-full tw-w-full">
                    <div class="tw-flex tw-flex-row tw-items-center tw-h-full tw-w-full">
                        <div class="tw-whitespace-pre-line tw-w-2/3">
                            {{this.campaign.campaign_introduction}}
                        </div>
                        <div class="tw-w-1/5 tw-h-full">
                            <v-img :src=this.campaign.campaign_image class="tw-h-full tw-w-full tw-object-contain"/>
                        </div>
                    </div>
                    <div v-if="!visible" class="tw-absolute tw-top-0 tw-w-full tw-h-full" >
                        <div
                            class="tw-w-full tw-h-full"
                            style="
                                background: linear-gradient(
                                    180deg,
                                    rgba(18, 18, 18, 0),
                                    rgba(0, 0, 0, 1)
                                );
                            "
                        ></div>
                        <div
                            @click="show"
                            class="tw-flex tw-opacity-60 tw-items-center tw-justify-center"
                        >
                            <IconFont size="1.5rem" name="expand"> </IconFont>
                        </div>
                    </div>
                    <div v-if="visible" class="tw-absolute tw-mt-5 tw-w-full">
                        <div
                            @click="hide"
                            class="tw-flex tw-opacity-60 tw-items-center tw-justify-center"
                        >
                            <IconFont
                                class="tw-transform tw-rotate-180"
                                size="1.5rem"
                                name="expand"
                            >
                            </IconFont>
                        </div>
                    </div>
                </div>
                <div class="tw-h-full tw-w-full">
                    <div
                        class="tw-h-full tw-grid tw-grid-cols-5 tw-md:tw-grid-cols-3 tw-lg:tw-grid-cols-4 tw-gap-5 tw-p-10"
                    >
                        <div v-for="(item, index) in list" :key="index">
                            <Achievement
                                :item="item"
                            ></Achievement>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script lang="ts">
import { ref, computed } from "vue";
import Nav from "@/components/Nav/Nav.vue";
import IconFont from "@/components/Activity/Detail/IconFont.vue";
import Achievement from "@/components/Activity/List/Achievement.vue";
import { apiService } from "@/apis/apis";
import {useRoute} from "vue-router";

export default {
  components: {
    Nav,
    IconFont,
    Achievement,
  },

  data() {
    const route = useRoute();
    return {
      visible: false,
      list:[],
      campaignId: route.params.id,
      page:1,
      pageSize:10,
      campaign: {},
    };
  },
  created() {
    this.getCampaignDetail();
    this.getAchievementList();
  },
  methods: {
    show(){
      this.visible = true;
    },
    hide(){
      this.visible = false;
    },
    async getCampaignDetail(){
      const res = await apiService.GetCampaignDetail(this.campaignId);
      if(res){
        this.campaign = res;
      }
    },
    async getAchievementList(){
      const res = await apiService.ListAchievementByCampaign(this.campaignId);
      if(res){
        console.log(res);
        this.list = res;
      }
    },
  },
};

</script>
<style>
</style>
