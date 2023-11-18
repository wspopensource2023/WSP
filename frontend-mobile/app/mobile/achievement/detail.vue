<template>
    <div class="tw-text-white tw-h-auto tw-w-full" style="background: #121212">
        <div style="z-index: 0;
            background: url(https://static.xxxxxx.com/a4dabdafa9bcb4639a502cb427243fadedf8c4ec10ff031539ef49830f4f3ffd) center no-repeat;
            background-size: 200%;
            height: 500px;" class="tw-w-full tw-absolute tw-top-0 tw-left-0 tw-opacity-50">
        </div>
        <div class="tw-relative" style="z-index: 1">
            <div @click="jumpBack" class="tw-fixed tw-top-3 tw-left-3">
                <img class="tw-w-8 tw-h-8 tw-mr-1"
                    src="https://static.xxxxxx.com/mdi/af8ebf95055ff7a71f265a8bcaad2eec569d30d0eabe56239b03602f7da20e76"
                    alt="">
            </div>
            <div>
                <div class="tw-pt-6 tw-flex tw-justify-center">
                    <div>
                        <div class="tw-text-2xl tw-text-center tw-mb-2">
                            {{ achievement.achievement_name }}
                        </div>
                        <div class="tw-flex tw-justify-center">
                            <span v-for="item of achievement.achievement_tags" :key="item"
                                class="tw-py-0.5 tw-px-2 tw-bg-white tw-bg-opacity-5 tw-text-white tw-text-opacity-50 tw-rounded tw-text-sm tw-ml-2">{{
                                    item
                                }}</span>
                        </div>
                    </div>
                </div>
                <div class="tw-flex tw-justify-center tw-mt-3">
                    <img class="tw-w-52 tw-h-52" v-if="achievement.achievement_image"
                        :src="achievement.achievement_image" />
                </div>
                <div class="tw-flex tw-justify-center tw-w-full -tw-mt-8">
                    <img class="tw-w-full tw-h-14"
                        src="https://static.xxxxxx.com/c27b58c9f627fbf0650796f96c242cda6ff67070141c7cbab7aa216962f753ad"
                        alt="">
                </div>
                <div class="tw-flex tw-justify-center tw-items-center">
                    <div class="-tw-ml-3.5">
                        <img class="tw-w-8 tw-h-8"
                            src="https://static.xxxxxx.com/6cb5c95fa47fdca1147d802428025242c8dfd44f3236309cfe97f7daebdf1d24"
                            alt="">
                    </div>
                    <span class="tw-text-white tw-text-opacity-50">{{ achievement.achievement_summary }}</span>
                </div>
            </div>
            <div class="tw-pt-8 tw-px-3.5 tw-flex tw-flex-col">
                <div class="tw-bg-white tw-bg-opacity-5 tw-px-5 tw-py-4 tw-rounded-xl tw-mb-3">
                    <div class="tw-mr-3 tw-mb-3 tw-text-white tw-text-base tw-text-opacity-50 tw-flex tw-items-center">
                        <img class="tw-w-5 tw-h-5 tw-mr-1"
                            src="https://static.xxxxxx.com/mdi/e443c9fa8d427390f761dab856744d7140aa5cb7a2aeaa1eff451ea1bc40dbb6" />
                        <span>发行方</span>
                    </div>
                    <div>
                        <div class="tw-flex tw-flex-row tw-overflow-hidden" @click="
                            jumpIssuer(achievement.issuer_account_id)
                            ">
                            <div class="tw-w-12 tw-h-12 tw-flex-shrink-0">
                                <img class="tw-w-full tw-h-full tw-rounded-full" :src="achievement.issuer?.avatar"
                                    :alt="achievement.issuer?.name" />
                            </div>
                            <div class="tw-flex tw-flex-col tw-ml-4 tw-justify-center tw-overflow-hidden">
                                <div class="tw-truncate">
                                    {{ achievement.issuer?.name }}
                                </div>
                                <div class="tw-truncate tw-text-sm tw-opacity-50">
                                    <span>{{ achievement.issuer?.desc }}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="tw-bg-white tw-bg-opacity-5 tw-px-5 tw-py-4 tw-rounded-xl tw-mb-3">
                    <div class="tw-mr-3 tw-mb-3 tw-text-white tw-text-base tw-text-opacity-50 tw-flex tw-items-center">
                        <img class="tw-w-5 tw-h-5 tw-mr-1"
                            src="https://static.xxxxxx.com/mdi/90222547711f71908ef6391a218a39a8e5ec53d48c009de6d15eb8306cc8618b" />
                        <span>发行参数</span>
                    </div>
                    <div class="tw-grid tw-grid-cols-2 tw-gap-y-3">
                        <div class="tw-flex tw-flex-col tw-text-sm">
                            <span class="tw-mb-1 tw-text-white tw-text-opacity-60">开始时间</span>
                            <span>{{ achievement.issuance_start_time || '暂无' }}</span>
                        </div>
                        <div class="tw-flex tw-flex-col tw-text-sm">
                            <span class="tw-mb-1 tw-text-white tw-text-opacity-60">结束时间</span>
                            <span>{{ achievement.issuance_end_time || '暂无' }}</span>
                        </div>
                        <div class="tw-flex tw-flex-col tw-text-sm">
                            <span class="tw-mb-1 tw-text-white tw-text-opacity-60">最大发行量</span>
                            <span>{{ achievement.issuance_quantity || '暂无' }}</span>
                        </div>
                    </div>
                </div>

                <div class="tw-bg-white tw-bg-opacity-5 tw-px-5 tw-py-4 tw-text-base tw-rounded-xl tw-mb-3">
                    <div class="tw-mr-3 tw-mb-3 tw-text-white tw-text-opacity-50 tw-flex tw-items-center">
                        <img class="tw-w-5 tw-h-5 tw-mr-1"
                            src="https://static.xxxxxx.com/mdi/23b73d2ee66c9cc9563792eefad7418f882cd20e37ad6ebe7a31e9dfc9e8691d" />
                        <span>领取条件</span>
                    </div>
                    <div v-for="item of achievement.condition_list" :key="item">
                        <div class="tw-mb-1 tw-mt-3 tw-text-white tw-text-base tw-text-opacity-50 tw-flex tw-items-center">
                            <img v-if="item?.status === 'finished'" class="tw-w-5 tw-h-5 tw-mr-1"
                                src="https://static.xxxxxx.com/mdi/6866c0b91a1f8a31f762f6e86a97c70966f4067b51443231dec341492e272c75" />
                            <span class="tw-text-white">{{ item?.condition_template?.condition_name }}</span>
                            <span v-if="item?.status === 'finished'"
                                class="tw-py-0.5 tw-px-1 tw-text-black tw-bg-emerald-400 tw-rounded tw-text-xs tw-ml-2">已达成</span>
                            <span v-if="item?.status === 'unfinished'"
                                class="tw-py-0.5 tw-px-1 tw-text-white tw-text-opacity-50 tw-bg-white tw-bg-opacity-5 tw-rounded tw-text-xs tw-ml-2">尚未达成</span>
                        </div>
                        <div class="tw-text-white tw-text-opacity-50">
                            {{ item?.condition_template?.condition_description }}
                        </div>
                    </div>
                </div>
                <div class="tw-bg-white tw-bg-opacity-5 tw-px-5 tw-py-4 tw-rounded-xl tw-mb-3">
                    <div class="tw-mr-3 tw-mb-3 tw-text-white tw-text-base tw-text-opacity-50 tw-flex tw-items-center">
                        <img class="tw-w-5 tw-h-5 tw-mr-1"
                            src="https://static.xxxxxx.com/mdi/8e54b154e3e4e51e8c854bb128cf07e27447fc292e2a80e95fc738183fb1dd2e" />
                        <span>活动描述</span>
                    </div>
                    <div class="tw-text-white tw-text-opacity-80">
                        <div v-html="achievement.achievement_introduction"></div>
                    </div>
                </div>
                <div v-if="participants.length"
                    class="tw-bg-white tw-bg-opacity-5 tw-px-5 tw-py-4 tw-text-base tw-rounded-xl tw-mb-3">
                    <div class="tw-mr-3 tw-mb-3 tw-text-white tw-text-opacity-50 tw-flex tw-items-center">
                        <img class="tw-w-5 tw-h-5 tw-mr-1"
                            src="https://static.xxxxxx.com/mdi/f923f0183e0a69a88d62e2c50dcea280b764005924e1d1cd568d681273cca5a6" />
                        <span>参与者</span>
                        <span>({{ participantsTotal }})</span>
                    </div>
                    <div class="tw-flex tw-flex-wrap">
                        <div @click="jumpIssuer(item.account_id)"
                            class="tw-cursor-pointer tw-w-6 tw-h-6 tw-mr-1 tw-flex-shrink-0 tw-mb-2"
                            v-for="item of participants" :key="item">
                            <img class="tw-w-full tw-h-full tw-rounded-full tw-border tw-border-solid tw-border-white"
                                :src="item.avatar" :alt="item.slug" />
                        </div>
                    </div>
                </div>

            </div>
            <div class="tw-pt-24"></div>
        </div>
        <div style="z-index: 3;  background: linear-gradient(
                rgb(255 255 255 / 3%) 0%,
                rgb(0 0 0 / 0%) 100%
            );"
            class="tw-fixed tw-bottom-0 tw-left-0 tw-w-full tw-rounded-t-xl tw-overflow-hidden tw-backdrop-blur-lg">
            <div class="tw-p-5">
                <di v-if="!accountId">
                    <button class="tw-rounded-xl" style="background: #4335E6" @click="showLoginModal">
                        <div class="tw-text-white tw-text-base tw-flex tw-items-center tw-justify-center tw-py-3.5">
                            <img class="tw-w-5 tw-h-5 tw-mr-2"
                                src="https://static.xxxxxx.com/mdi/791f815eceab01a3ff62f1e59e8bc6183ed312bf36e84f952c26fb24a679ef9a" />
                            <span>登录并领取数字成就</span>
                        </div>
                    </button>
                </di>
                <div v-if="accountId">
                    <button class="tw-rounded-xl" style="background: rgb(50 ,50, 50)" :disabled="true" v-if="!isCollectable"
                        @click="collectAchievement">
                        <div
                            class="tw-text-white tw-text-opacity-50 tw-text-base tw-flex tw-items-center tw-justify-center tw-py-3.5">
                            <img class="tw-w-5 tw-h-5 tw-mr-1 tw-opacity-50"
                                src="https://static.xxxxxx.com/mdi/791f815eceab01a3ff62f1e59e8bc6183ed312bf36e84f952c26fb24a679ef9a" />
                            <span>{{ getCollectBtnText() }}</span>
                        </div>
                    </button>
                    <button class="tw-rounded-xl" v-if="isCollectable" style="background: #4335E6"
                        @click="collectAchievement">
                        <div class="tw-text-white tw-text-base tw-flex tw-items-center tw-justify-center tw-py-3.5">
                            <img class="tw-w-5 tw-h-5 tw-mr-2"
                                src="https://static.xxxxxx.com/mdi/791f815eceab01a3ff62f1e59e8bc6183ed312bf36e84f952c26fb24a679ef9a" />
                            <span>{{ getCollectBtnText() }}</span>
                        </div>
                    </button>
                </div>
            </div>
        </div>
        <LoginModal ref="LoginModal"></LoginModal>
        <CollectModal ref="CollectModal" :achievement="achievement"></CollectModal>
    </div>
</template> 
<script>
import { onLaunch, onLoad, onShow, onHide, onShareAppMessage, onShareTimeline, onPullDownRefresh } from "@dcloudio/uni-app"
import IconFont from '@/components/base/IconFont.vue'
import { apiService } from '@/library/apis'
import SBTImage from '@/components/achievement/SBTImage'
import LoginModal from '@/app/mobile/loginModal.vue'
import moment from 'moment'
import { Icon } from '@iconify/vue'
import { useStorage } from '@/store/storage'
import CollectModal from '@/components/achievement/CollectModal.vue'
import { getCurrentPage } from '@/library/util'
import urlparse from 'url-parse';

export default {
    data() {
        return {
            achievementId: '',
            achievement: {},
            participants: [],
            participantsTotal: 0,
            isCollectable: false,
            isCollected: false,
            isAutoComplteConditionFinished: false,
            isFirstLoad: true
        }
    },
    components: {
        IconFont,
        SBTImage,
        Icon,
        LoginModal,
        CollectModal,
    },
    computed: {
        accountId() {
            const storage = useStorage()
            return storage.$state.accountId
        }
    },
    onShareAppMessage(res) {
        return {
            title: "xxxxxx",
            path: `app/mobile/achievement/detail?achievementId=${this.achievementId}`
        }
    },

    onShareTimeline() {
        return {
            title: 'xxxxxx',
            path: `app/mobile/achievement/detail?achievementId=${this.achievementId}`
        }
    },
    async onLoad(options) {
        console.log("options:", options)
        let achievementId = options.achievementId;
        const scene = this.getScene(options);
        if (scene) {
            try {
                const res = await apiService.GetRealParams(scene)
                achievementId = res.achievement_id;
            } catch (e) {
                console.log('failed to GetRealParams', e)
            }
        }
        this.achievementId = achievementId
        if (!this.achievementId) {
            this.jumpBack()
            return
        }
        this.getAchievementDetail()
        this.getParticipants()
        this.autoCompleteCondition()
    },
    async onShow() {
        this.getAchievementDetail()
        this.getParticipants()
        this.autoCompleteCondition()
    },
    methods: {
        getScene(options) {
            if (options.q) {
                try {
                    const url = decodeURIComponent(options.q)
                    const scene = urlparse(url, true)?.query?.scene;
                    if (scene) {
                        return scene;
                    }
                } catch (e) {
                    console.log('failed to GetRealParams', e)
                }
            }
            if (options.scene) {
                try {
                    return decodeURIComponent(options.scene)
                } catch (e) {
                    console.log('failed to GetRealParams', e)
                }
            }
            return null;
        },
        getAchievementId() {
            try {
                return getCurrentPage().$page.options.achievementId
            } catch (e) {
                this.jumpBack()
            }
        },
        showLoginModal() {
            this.$refs.LoginModal.show()
        },
        async autoCompleteCondition() {
            const self = this
            let internvalId
            internvalId = setInterval(async () => {
                if (this.isAutoComplteConditionFinished) {
                    clearInterval(internvalId)
                    return
                }
                await (async () => {
                    if (!self.achievement.achievement_id || !self.accountId) {
                        return
                    }
                    if (
                        !(
                            this.achievement.condition_list &&
                            this.achievement.condition_list.length === 1
                        )
                    ) {
                        return
                    }
                    if (!self.accountId) {
                        return
                    }
                    const conditon = this.achievement.condition_list[0]
                    await apiService.VerifyCondition(
                        self.achievement.achievement_id,
                        conditon.condition_template_id,
                        {}
                    )
                    self.isAutoComplteConditionFinished = true
                    await self.getAchievementDetail()
                })()
            }, 1000)
        },
        jumpIssuer(account_id) {
            uni.navigateTo({ url: `/app/mobile/achievement/issuer?account_id=${account_id}`, })
        },
        jumpBack() {
            const pages = getCurrentPages()
            if (!pages || pages.length == 1) {
                uni.switchTab({ url: '/app/mobile/achievement/list', })
            }
            uni.navigateBack()
        },
        async getParticipants() {
            const res = await apiService.ListAchievementParticipant(
                this.achievementId,
                1,
                30
            )
            this.participantsTotal = res.total_count
            this.participants = res.data
        },
        async getAchievementDetail() {
            if (this.isFirstLoad) {
                uni.showLoading({
                    title: '加载中',
                    mask: true,
                })
            }
            if (!this.achievementId) {
                return
            }
            this.achievement = await apiService.GetAchievement(
                this.achievementId
            )
            this.isFirstLoad = false;
            uni.hideLoading()
        },
        getCollectBtnText() {
            // 判断
            if (!this.achievement.achievement_id) {
                return '加载中'
            }
            let status = 'finished'
            this.isCollectable = false
            this.achievement.condition_list.forEach(item => {
                if (item.status !== 'finished') {
                    status = 'unfinished'
                }
            })
            if (
                !(
                    this.achievement.condition_list &&
                    this.achievement.condition_list.length
                )
            ) {
                return '活动筹备中'
            }
            const currentTime = Date.now() / 1000
            if (
                moment(this.achievement.issuance_start_time).unix() >
                currentTime
            ) {
                return '活动尚未开始'
            }
            if (
                moment(this.achievement.issuance_end_time).unix() <
                currentTime
            ) {
                return '活动已结束'
            }
            if (this.achievement.is_received) {
                return '已领取'
            }
            if (status === 'unfinished') {
                return '尚未达成领取条件'
            }
            this.isCollectable = true
            return '立即领取'
        },
        async collectAchievement() {
            try {
                await apiService.CollectAchievement(
                    this.achievementId
                )
                this.$refs.CollectModal.show()
            } catch (e) { }
            this.getAchievementDetail()
            this.getParticipants()
        },
    },

}
</script>


<style lang="less">
@import "@/static/style.css";

uni-app,
uni-page,
uni-page-wrapper,
uni-page-body {
    height: 100%;
}

/deep/ .uni-collapse-item__wrap-content {
    color: white;
}

/deep/ .uni-collapse-item__title-box {
    color: white;
    background-color: #1b1e24;
}

/deep/ .uni-collapse-item {
    color: white;
    background-color: #1b1e24;
}

/deep/ .uni-collapse-item__title.uni-collapse-item-border {
    tw-border-bottom: 1px solid #1b1e24;
}
</style>