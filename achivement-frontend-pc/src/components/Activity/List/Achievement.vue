<template>
  <div
    @click="navigateDetailPage(item)"
    class="tw-w-full tw-cursor-pointer tw-shrink-0 tw-w-80 tw-flex-col tw-flex tw-h-128 tw-col-span-1 tw-bg-black tw-pt-0 tw-ease-in-out tw-duration-300"
  >
    <div class="tw-relative tw-w-full tw-h-80 tw-bg-black">
      <div class="tw-w-full tw-h-full tw-p-5">
        <img
          :src="getImage(item)"
          class="tw-h-full tw-w-full tw-rounded-full"
        />
      </div>
      <div
        class="tw-absolute tw-h-full tw-w-full tw-top-0 tw-backdrop-blur-2xl tw-bg-[rgba(9,11,13,0.1)]"
      ></div>
      <div
        class="tw-absolute tw-bottom-0 tw-w-60 tw-h-60 custom-img-box"
        style="display: flex; justify-content: center; align-items: center"
      >
        <img
          :src="getImage(item)"
          class="tw-rounded-full tw-h-full tw-w-full tw-ring-2 tw-ring-white"
        />
      </div>
    </div>
    <div class="tw-w-full tw-h-48 tw-bg-black">
      <div
        class="tw-w-full tw-h-px tw-bg-gradient-to-r tw-from-indigo-500 tw-via-purple-500 tw-to-pink-500"
      ></div>
      <div class="tw-w-full tw-h-full tw-rounded-md bg-lighten2 tw-px-1">
        <div class="tw-h-7 tw-py-2" style="box-sizing: content-box;">
          <div
            v-for="item in item.achievement_tags"
            :key="item"
            class="tw-inline-block tw-border-solid tw-border tw-mr-1 tw-p-1 tw-rounded-2xl"
            style="border-color: rgba(255, 255, 255, 0.4)"
          >
            <div class="tw-text-xs tw-px-2">{{ item }}</div>
          </div>
        </div>

        <div class="tw-w-full tw-mt-0 tw-px-4">
          <div class="tw-h-16 tw-w-full">
            <div class="tw-text-base tw-font-semibold tw-line-clamp-2">
              {{ getName(item) }}
            </div>
          </div>
          <div class="info-lighten1 tw-mb-6"></div>
          <div class="tw-flex">
             <img
            @click.stop="toProfile"
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
    getImage(item) {
      if (item.hasOwnProperty("campaign_image")) return item.campaign_image;
      else if (item.hasOwnProperty("achievement_image"))
        return item.achievement_image;
    },
    getName(item) {
      if (item.hasOwnProperty("campaign_name")) return item.campaign_name;
      else if (item.hasOwnProperty("achievement_name"))
        return item.achievement_name;
    },
    navigateDetailPage(item) {
      let achievement_id = "";
      if (item.hasOwnProperty("achievement_ids"))
        achievement_id = item.achievement_ids[0];
      else if (item.hasOwnProperty("achievement_id"))
        achievement_id = item.achievement_id;

      this.$router.push({
        name: "ActivityDetail",
        params: {
          id: achievement_id,
        },
      });
    },
    toProfile() {
      this.$router.push({
        name: "AccountProfile",
        params: {
          id: this.item.issuer_account_id,
        },
      });
    },
  },
};
</script>

<style scoped>
.custom-img-box {
  display: flex;
  justify-content: center;
  align-items: center;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
