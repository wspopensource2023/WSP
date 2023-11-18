<template>
    <div class="tw-text-white tw-h-auto tw-w-full no-scrollbar">
        <div class="tw-px-3 tw-pt-3">
            <div class="tw-flex tw-flex-row tw-justify-between tw-items-center">
                <div class="tw-text-xl tw-font-bold">
                    数字身份
                </div>
                <div @click="search">
                    <img class="tw-w-4 tw-h-4"
                        src="https://static.xxxxxx.com/6836d15dccb8095efee8f68b1f605f8163b37236d33cdc699ae9738137f7f7bd"
                        alt="">
                </div>
            </div>
            <div @click="jumpBannerPage" class="tw-relative tw-mt-2" v-if="bannerInfo?.state">
                <div class="tw-w-full tw-h-24 tw-rounded-lg" :style="getBannerStyle()">
                </div>
                <div class="tw-absolute tw-bottom-1 tw-px-3 tw-text-base">
                    {{ bannerInfo?.title }}
                </div>
            </div>
            <div v-if="!hasProfiles">
                <div class="tw-text-center tw-text-white/60 tw-text-sm tw-py-8">
                    <img class="tw-w-28 tw-h-28"
                        src="https://static.xxxxxx.com/e004bfac0ba7c2df24d955e01ff37beb5dcc5600b8ced38c5fe292a966f449f4"
                        alt="">
                    <div class="tw-text-sm tw-opacity-30">暂时没有数字身份</div>
                </div>
            </div>
            <div v-show="!loading" v-if="hasProfiles" class="tw-mt-2">
                <div class="tw-transition tw-duration-300 tw-mt-3 hover:tw-border-white tw-border-solid tw-border-2 tw-border-transparent tw-bg-white tw-rounded-2xl tw-bg-opacity-5 tw-py-4 tw-px-3 tw-rounded-lg"
                    @click="jumpProfileEditPage(profile)" v-for="profile in profiles" :key="profile">
                    <div class="tw-flex tw-items-center tw-flex-row tw-flex-shrink-0">
                        <div
                            class="tw-mr-2 tw-cursor-pointer tw-mr-2 tw-flex tw-justify-center tw-items-center tw-flex-shrink-0">
                            <img :src="profile?.spec?.avatar" class="tw-w-14 tw-h-14 tw-rounded-full" />
                        </div>
                        <div style="width: calc(100% - 4rem);">
                            <div class="tw-text-lg tw-cursor-pointer tw-flex tw-flex-row">
                                <div class="tw-whitespace-nowrap">
                                    {{ profile?.spec?.title }}
                                </div>
                                <div
                                    class="tw-flex tw-truncate tw-items-center tw-ml-2 tw-px-2 tw-text-sm tw-text-indigo-400 tw-bg-indigo-500 tw-rounded-lg tw-text-center tw-bg-opacity-10">
                                    <span>xxxxxx.com/{{
                                        profile?.spec?.slug
                                    }}</span>
                                </div>
                            </div>
                            <div class="tw-opacity-50 tw-text-base tw-mt-0.5 tw-truncate tw-cursor-pointer">
                                {{ profile?.spec?.description }}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="tw-mt-3">
                <button @click="createProfile" hover-class="none"
                    class="tw-rounded-xl tw-bg-white tw-bg-opacity-5 hover:tw-bg-opacity-10">
                    <div class="tw-text-white tw-text-base tw-flex tw-items-center tw-justify-center tw-py-3.5">
                        <img class="tw-w-5 tw-h-5 tw-mr-2"
                            src="https://static.xxxxxx.com/mdi/791f815eceab01a3ff62f1e59e8bc6183ed312bf36e84f952c26fb24a679ef9a" />
                        <span>创建新的数字身份</span>
                    </div>
                </button>
            </div>
        </div>
        <SearchModal ref="SearchModal"></SearchModal>
    </div>
</template>  
<script>
import {
    useStorage
} from "@/store/storage";
import {
    apiService
} from '@/library/apis.js'
import SearchModal from '@/components/did/SearchModal.vue';

export default {
    data() {
        return {
            loading: true,
            bannerInfo: {},
        };
    },
    computed: {
        profiles() {
            const storage = useStorage();
            return storage.$state?.account?.profiles;
        },
        hasProfiles() {
            return this.profiles && this.profiles.length
        }
    },
    created() {
        setTimeout(() => {
            this.loading = false;
        }, 500)
    },
    onShow() {
        this.loadBannerInfo();
        this.load();
    },
    methods: {
        getBannerStyle() {
            return `background: url(${this.bannerInfo?.image}) center center no-repeat; background-size: cover;`
        },
        search() {
            this.$refs.SearchModal.show();
        },
        createProfile() {
            uni.navigateTo({
                url: `/app/mobile/did/edit`
            });
        },
        jumpProfileEditPage(profile) {
            const profileId = profile.spec.profileId;
            uni.navigateTo({
                url: `/app/mobile/did/edit?profileId=${profileId}`
            });
        },
        jumpBannerPage() {
            uni.navigateTo({ url: `/app/mobile/did/banner`, })
        },
        async load() {
            const {
                commitMe
            } = useStorage();
            const res = await apiService.Me();
            commitMe(res);
        },
        async loadBannerInfo() {
            const res = await apiService.GetDIDMobileBannerInfo();
            this.bannerInfo = res;
        },
    },
    components: {
        SearchModal
    },
};
</script>

<style lang="scss">
@import "@/static/style.css";

uni-app,
uni-page,
uni-page-wrapper,
uni-page-body {
    height: 100%;
}
</style>