<template>
    <div class="tw-text-white tw-h-auto tw-w-full no-scrollbar" style="background: #121212">
        <div class="tw-px-3 tw-pt-5">
            <div class="tw-flex tw-flex-row tw-justify-between tw-items-center">
                <div class="tw-text-xl tw-font-bold">
                    数字成就
                </div>
            </div>
            <div @click="jumpBannerPage" class="tw-relative tw-mt-2" v-if="bannerInfo?.state">
                <div class="tw-w-full tw-h-24 tw-rounded-lg" :style="getBannerStyle()">
                </div>
                <div class="tw-absolute tw-bottom-1 tw-px-3 tw-text-base">
                    {{ bannerInfo?.title }}
                </div>
            </div>
            <div class="tw-mt-3">
                <div class="tw-flex tw-justify-between tw-items-end">
                    <div class="tw-text-lg tw-flex tw-justify-between tw-w-full">
                        <span>我的成就</span>
                    </div>
                </div>
                <div class="tw-mt-3">
                    <div v-if="!(userAchievementList && userAchievementList.length)
                        " class="tw-p-2 tw-mr-2">
                        <div class="tw-text-center tw-text-white/60 tw-text-sm tw-pt-5 tw-pb-8">
                            <img class="tw-w-28 tw-h-28"
                                src="https://static.xxxxxx.com/e004bfac0ba7c2df24d955e01ff37beb5dcc5600b8ced38c5fe292a966f449f4"
                                alt="">
                            <div class="tw-text-sm tw-opacity-30">暂时没有收集到任何成就</div>
                        </div>
                    </div>
                    <div v-if="userAchievementList && userAchievementList.length"
                        class="tw-flex tw-flex-row tw-overflow-x-auto tw-flex-shrink-0">
                        <div class="tw-mr-2" @click="jumpAchievement(item)" v-for="item of userAchievementList" :key="item">
                            <div class="tw-w-32 tw-h-32 tw-flex-shrink-0 tw-mx-auto">
                                <img class="tw-w-full tw-h-full tw-text-base" :src="item.achievement_image"
                                    :alt="item.achievement_name" />
                            </div>
                            <div class="tw-w-32 tw-flex tw-items-center tw-mt-2 tw-text-base tw-truncate">
                                <span class="tw-mr-1">{{ item.achievement_name }}</span>
                                <img class="tw-w-4 tw-h-4"
                                    src="https://static.xxxxxx.com/55d39abf637e94f70bd1ead24ee58f74139ec38980eda2e7c162ba16d2956262"
                                    alt="">
                            </div>
                            <div class="tw-w-32 tw-text-sm tw-opacity-60 tw-truncate">
                                {{ item.achievement_summary }}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="tw-mt-3">
                <div class="tw-flex tw-justify-between tw-items-end">
                    <div class="tw-text-lg">近期活动</div>
                </div>
                <view>
                    <scroll-view style="
                            background: rgb(17, 17, 17);
                            tw-border-color: rgb(43, 43, 43);
                            height: 300px;
                        " scroll-y="true" @scrolltolower="loadMore">
                        <div class="tw-pt-3 tw-flex tw-flex-col tw-truncate">
                            <view class="tw-flex tw-flex-row tw-mb-5 tw-overflow-hidden " v-for="item of campaignList"
                                :key="item" @click="
                                    jumpAchievementDetail(
                                        item.achievement_ids[0]
                                    )
                                    ">
                                <div class="tw-w-20 tw-h-20 tw-flex-shrink-0">
                                    <img class="tw-w-full tw-h-full" :src="item.campaign_image"
                                        :alt="item.achievement_name" />
                                </div>
                                <div class="tw-flex tw-flex-col tw-ml-3 tw-justify-center tw-overflow-hidden ">
                                    <div class="tw-flex tw-items-center tw-truncate tw-text-lg tw-leading-none">
                                        <span class="tw-mr-1">{{ item.campaign_name }}</span>
                                        <img class="tw-w-4 tw-h-4"
                                            src="https://static.xxxxxx.com/55d39abf637e94f70bd1ead24ee58f74139ec38980eda2e7c162ba16d2956262"
                                            alt="">
                                    </div>
                                    <div class="tw-truncate tw-flex tw-items-center tw-text-sm tw-mt-1">
                                        <img class="tw-w-4 tw-h-4 tw-rounded-full" :src="item.issuer_avatar" alt="">
                                        <span class="tw-ml-1 tw-text-white tw-text-opacity-60">{{
                                            item.issuer_name
                                        }}</span>
                                    </div>
                                    <div class="tw-truncate tw-text-sm tw-opacity-60 tw-mt-1">
                                        <span>{{
                                            item.campaign_summary
                                        }}</span>
                                    </div>
                                </div>
                            </view>
                        </div>
                    </scroll-view>
                </view>
            </div>
        </div>

    </div>
</template>
<script>
import IconFont from '@/components/base/IconFont.vue'
import SBTImage from '@/components/achievement/SBTImage'
import { apiService } from '@/library/apis.js'
import { useStorage } from '@/store/storage'

export default {
    onShow() {
        this.loadBannerInfo();
        this.page = 1;
        this.achievementList = [];
        this.userAchievementList = [];
        this.campaignList = [];
        this.getUserAchievements()
        this.getCampaignList(true)
    },
    data() {
        return {
            isLoading: false,
            page: 1,
            pageSize: 10,
            userAchievementList: [],
            campaignList: [],
            achievementList: [],
            keywords: '',
            currentSBTProfile: {},
            bannerInfo: {},
        }
    },
    computed: {
        accountId() {
            const storage = useStorage();
            return storage.$state.accountId;
        },
    },
    methods: {
        getBannerStyle() {
            return `background: url(${this.bannerInfo?.image}) center center no-repeat; background-size: cover;`
        },
        jumpAchievement(item) {
            this.jumpAchievementDetail(item.achievement_id);
        },
        async loadBannerInfo() {
            const res = await apiService.GetAchievementMobileBannerInfo();
            console.log('getBannerInfo', res)
            this.bannerInfo = res;
        },
        async getUserAchievements() {
            const res = await apiService.ListUserAchievements(
                this.accountId,
                this.page,
                this.pageSize
            )
            this.userAchievementList = res.achievement_list
        },
        async getCampaignList(init) {
            uni.showLoading({
                title: '加载中',
                mask: true,
            })
            try {
                const res = await apiService.ListCampaign(
                    null,
                    this.page,
                    this.pageSize
                )
                if (init) {
                    this.campaignList = res.campaign_list;
                } else {
                    this.campaignList.push(...res.campaign_list)
                }
                console.log(this.campaignList, 'this.campaignList')
            } finally {
                uni.hideLoading()
            }
        },
        async getAchievementList() {
            uni.showLoading({
                title: '加载中',
                mask: true,
            })
            try {
                const res = await apiService.ListAchievement(
                    this.page,
                    this.pageSize,
                    this.keywords
                )
                this.achievementList = res.achievement_list
            } finally {
                uni.hideLoading()
            }
        },

        async loadMore() {
            if (this.isLoading) return
            this.isLoading = true
            this.page++
            const res = await apiService.ListCampaign(
                this.page,
                this.pageSize,
                this.keywords
            )
            this.campaignList = [
                ...this.campaignList,
                ...res.campaignList,
            ]
        },
        async onSearch() {
            this.page = 1
            await this.getAchievementList()
        },
        async onCancel() {
            this.page = 1
            this.keywords = ''
            await this.getAchievementList()
        },
        async jumpIssuer(account_id) {
            uni.navigateTo({ url: `/app/mobile/achievement/issuer?account_id=${account_id}`, })
        },
        async jumpAchievementDetail(achievementId) {
            uni.navigateTo({ url: `/app/mobile/achievement/detail?achievementId=${achievementId}`, })
        },
        jumpBannerPage() {
            uni.navigateTo({ url: `/app/mobile/achievement/banner`, })
        },
    },
    components: {
        IconFont,
        SBTImage,
    },
}
</script>

<style lang="scss">
@import "@/static/style.css";

.title-text {
    font-size: 26px;
    position: absolute;
    z-index: 2;
}

.line {
    position: absolute;
    width: 108px;
    tw-bottom: -5px;
    z-index: 1;
    height: 13px;
    background: linear-gradient(111deg, rgba(76, 105, 255, 0.60) 0%, rgba(76, 105, 255, 0.00) 100%);
}

.no-scrollbar {
    ::-webkit-scrollbar {
        height: 0;
    }

    ::-webkit-scrollbar-track {
        background: rgb(255, 255, 255);
        tw-border-radius: 10px;
    }

    ::-webkit-scrollbar-thumb {
        background: rgb(136, 136, 136);
        tw-border-radius: 10px;
    }

    ::-webkit-scrollbar-thumb:hover {
        background: rgb(100, 100, 100);
        tw-border-radius: 10px;
    }

    ::-webkit-scrollbar-thumb:active {
        background: rgb(68, 68, 68);
        tw-border-radius: 10px;
    }
}

uni-app,
uni-page,
uni-page-wrapper,
uni-page-body {
    height: 100%;
}
</style>
