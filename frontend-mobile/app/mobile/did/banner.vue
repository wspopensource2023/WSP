<template>
    <div class="tw-text-white tw-w-full" style="background: #121212; min-height: 100%">
        <div @click="jumpBack" class="tw-fixed tw-top-3 tw-left-3" style="z-index: 1">
            <img class="tw-w-8 tw-h-8 tw-mr-1"
                src="https://static.xxxxxx.com/mdi/af8ebf95055ff7a71f265a8bcaad2eec569d30d0eabe56239b03602f7da20e76"
                alt="">
        </div>
        <div v-html="bannerInfo.content"></div>
    </div>
</template>
<script>
import IconFont from "@/components/base/IconFont.vue";
import { apiService } from "@/library/apis.js";
export default {
    components: {
        IconFont
    },
    data() {
        return {
            bannerInfo: {},
        };
    },
    onShow() {
        this.loadBannerInfo();
    },
    methods: {
        getCoverImageStyle() {
            return {
                'background': `url(${this.bannerInfo.image}) center center no-repeat`
            }
        },
        jumpBack() {
            const pages = getCurrentPages()
            if (!pages || pages.length == 1) {
                uni.switchTab({ url: '/app/mobile/did/list', })
            }
            uni.navigateBack()
        },
        async loadBannerInfo() {
            const res = await apiService.GetDIDMobileBannerInfo();
            console.log('getBannerInfo', res)
            this.bannerInfo = res;
        },
    }
};
</script>
 
<style>
.img-font {
    position: absolute;
    tw-bottom: 10px;
    padding-left: 10px;
    font-size: 16px;
}
</style>