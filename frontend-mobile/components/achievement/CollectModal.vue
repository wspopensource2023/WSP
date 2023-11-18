<template>
    <div>
        <uni-popup ref="popup" mask-background-color="rgb(0, 0, 0, 0.9)">
            <div class="tw-flex tw-justify-center tw-w-full">
                <div class="tw-w-full">
                    <div class="tw-flex tw-flex-row tw-items-center tw-justify-center">
                        <img class="tw-w-8 tw-h-8 tw-mr-1"
                            src="https://static.xxxxxx.com/mdi/6866c0b91a1f8a31f762f6e86a97c70966f4067b51443231dec341492e272c75" />
                        <span class="tw-text-2xl">恭喜，领取成功</span>
                    </div>
                    <div class="tw-flex tw-justify-center tw-mt-3">
                        <SBTImage :image="achievement.achievement_image"></SBTImage>
                    </div>
                    <div class="tw-w-full tw-pt-3 tw-flex tw-justify-center">
                        <div class="tw-w-full">
                            <div class="tw-flex tw-items-center tw-justify-center tw-text-2xl tw-text-center tw-mb-2">
                                <span class="tw-mr-1.5">{{ achievement.achievement_name }}</span>
                                <img class="tw-w-6 h-6"
                                    src="https://static.xxxxxx.com/55d39abf637e94f70bd1ead24ee58f74139ec38980eda2e7c162ba16d2956262"
                                    alt="">
                            </div>
                            <div class="tw-flex tw-justify-center tw-items-center">
                                <div class="tw-mr-1">
                                    <img class="tw-w-5 tw-h-5"
                                        src="https://static.xxxxxx.com/6cb5c95fa47fdca1147d802428025242c8dfd44f3236309cfe97f7daebdf1d24"
                                        alt="">
                                </div>
                                <span class="tw-text-white tw-text-opacity-50">{{ achievement.achievement_summary }}</span>
                            </div>
                            <div class="tw-w-full tw-mt-10">
                                <button @click="hide" class="tw-rounded-xl tw-w-full" style="background: #4335E6">
                                    <div
                                        class="tw-text-white tw-text-base tw-flex tw-items-center tw-justify-center tw-py-3.5">
                                        <span>开心收下</span>
                                    </div>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </uni-popup>
    </div>
</template>

<script>
import SPIcon from "@/components/base/SPIcon.vue";
import { Icon } from '@iconify/vue';
import SBTImage from "@/components/achievement/SBTImage";
export default {
    props: {
        achievement: {}
    },
    components: {
        SPIcon,
        Icon,
        SBTImage
    },
    data() {
    },
    methods: {
        show() {
            this.$refs.popup.open("center");
        },
        hide() {
            this.$refs.popup.close();
        },
    },
};
</script>

<style lang="scss">
@import "@/static/style.css";
</style>