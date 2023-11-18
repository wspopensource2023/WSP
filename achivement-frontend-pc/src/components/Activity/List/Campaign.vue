<template>
  <div
    @click="campaign(item.achievement_ids)"
    class="tw-w-full tw-cursor-pointer tw-shrink-0 tw-flex-col tw-flex tw-h-128 tw-col-span-1 tw-bg-black tw-pt-0 tw-transition-all tw-ease-in-out tw-duration-300 tw-transform"
  >
    <div class="tw-relative tw-w-full tw-h-80 tw-bg-black">
      <div class="tw-w-full tw-h-full">
        <img
          :src="item.campaign_image"
          class="tw-h-full tw-w-full tw-rounded-full"
        />
      </div>
      <div
        class="tw-absolute tw-h-full tw-w-full tw-top-0 tw-backdrop-blur-2xl tw-bg-[rgba(9,11,13,0.6)]"
      ></div>
      <div
        class="tw-absolute tw-bottom-0 tw-h-full tw-w-full tw-overflow-hidden"
        style="display: flex; justify-content: center; align-items: center"
      >
        <img
          :src="item.campaign_image"
          class="tw-w-full"
          style="object-fit: cover"
        />
      </div>
    </div>
    <div class="tw-w-full tw-h-48 tw-bg-black">
      <div
        class="tw-w-full tw-h-px tw-bg-gradient-to-r tw-from-indigo-500 tw-via-purple-500 tw-to-pink-500"
      ></div>
      <div class="tw-w-full tw-h-full tw-rounded-md bg-lighten2 tw-px-1">
        <div class="tw-h-7 tw-py-2" style="box-sizing: content-box">
          <div
            v-for="item in item.campaign_tags"
            :key="item"
            class="tw-inline-block tw-border-solid tw-border tw-mr-1 tw-p-1 tw-rounded-2xl"
            style="border-color: rgba(255, 255, 255, 0.4);overflow: hidden;"
          >
            <div class="tw-text-xs tw-px-2">{{ item }}</div>
          </div>
        </div>

        <div class="tw-w-full tw-mt-0 tw-px-4">
          <div class="tw-h-16 tw-w-full">
            <strong class="tw-text-base tw-font-semibold tw-line-clamp-2">
              {{ item.campaign_name }}
            </strong>
          </div>
          <div class="info-lighten1 tw-mb-6"></div>
          <div class="tw-flex">
            <img
            :src="item.issuer_avatar"
            class="tw-rounded-full tw-w-6 tw-h-6 tw-shadow tw-align-middle"
          />
          <span class="tw-text-base tw-font-semibold tw-ml-2 tw-align-middle">
            {{ item.issuer_name }}
          </span>
          </div>
          
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
      default: () => {},
    },
  },
  methods: {
    campaign(id) {
      this.$router.push({
        name: "CampaignsDetail",
        params: {
          id: this.item.campaign_id,
        },
      });
    },
  },
};
</script>
