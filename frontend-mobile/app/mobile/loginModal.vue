<template>
    <uni-popup ref="moduleConfig">
        <div style="background: linear-gradient(180deg, #252525 0%, #181818 100%);"
            class="tw-rounded-t-lg tw-text-white tw-overflow-hidden">
            <div class="tw-relative tw-p-3 tw-text-center tw-text-base">
                <div>快捷登录</div>
                <div class="tw-absolute tw-top-0 tw-right-3">
                    <div class="tw-relative tw-flex tw-flex-row tw-items-center tw-py-3 tw-opacity-60">
                        <div @click="hide"
                            class="tw-flex tw-items-center tw-justify-center tw-w-4 tw-h-4 tw-bg-white tw-bg-opacity-10 tw-rounded-full tw-p-0.5">
                            <img class="tw-w-3 tw-h-3"
                                src="https://static.xxxxxx.com/63d2ad6ca4076d87299a85e2373bb5ad53a73ab1857c51c33930790f5cb3090e" />
                        </div>
                    </div>
                </div>
            </div>
            <div v-if="isPage('phone')">
                <div class="tw-px-5 tw-pt-5 tw-pb-16">
                    <div class="tw-relative">
                        <div class="tw-text-xl">欢迎来到xxxx_xxx</div>
                        <div class="tw-text-white tw-mt-2 tw-text-opacity-50">每个人都值得被看见</div>
                        <div class="tw-m-6"></div>
                        <div v-if="isWechat">
                            <button open-type="getPhoneNumber" @getphonenumber="loginByWeixinPhone" class="tw-rounded-full">
                                <div class="tw-h-12 tw-flex tw-items-center tw-text-center tw-justify-center tw-text-md">
                                    手机号一键登录
                                </div>
                            </button>
                            <div class="tw-text-center tw-text-white tw-text-opacity-50 tw-mt-3 tw-text-sm">提示：未注册用户将会自动注册
                            </div>
                        </div>
                        <div v-if="!isWechat">
                            <div
                                class="tw-flex tw-flex-row tw-border tw-border-solid tw-rounded-lg tw-border-2 tw-h-12 tw-items-center tw-px-2">
                                <div class="tw-text-lg tw-flex tw-items-center tw-mr-2">
                                    <img class="tw-w-6 tw-h-6 tw-mr-1"
                                        src="https://static.xxxxxx.com/mdi/e89ad9961a254e5848d6350655c94e34a36b080b296b2d5b1911a688ac40f96e" />
                                </div>
                                <div class="tw-w-full tw-flex tw-items-center">
                                    <input focus class="tw-w-full" v-model="phone" type="number" placeholder="请输入大陆手机号" />
                                </div>
                            </div>
                            <div class="tw-mt-5"></div>
                            <div>
                                <button class="tw-rounded-full" :disabled="codeButtonDisabled" @click="getCode">
                                    <div
                                        class="tw-h-12 tw-flex tw-items-center tw-text-center tw-justify-center tw-text-md">
                                        {{ codeButtonText }}
                                    </div>
                                </button>
                            </div>
                            <div class="tw-text-center tw-text-white tw-text-opacity-50 tw-mt-3 tw-text-sm">提示：未注册用户将会自动注册
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div v-if="isPage('code')">
                <div class="tw-px-5 tw-pt-2 tw-pb-16">
                    <div class="tw-text-xl tw-flex tw-items-center">
                        <IconFont @click="switchPage('phone')" class="tw-mr-2" size="1rem" name="jiantou-zuo"></IconFont>
                        <span>输入验证码</span>
                    </div>
                    <div class="tw-my-3">
                        <span class="tw-opacity-60 tw-mr-1">验证码已经发送至</span>
                        <span class="tw-text-blue-500">{{ phone }}</span>
                    </div>
                    <div class="tw-m-6"></div>
                    <div
                        class="tw-flex tw-flex-row tw-border tw-border-solid tw-rounded-lg tw-border-2 tw-h-12 tw-items-center tw-px-2">
                        <div class="tw-text-lg tw-flex tw-items-center tw-mr-2">
                            <img class="tw-w-6 tw-h-6 tw-mr-1"
                                src="https://static.xxxxxx.com/mdi/4dfdd1527b4b307951f261b0d196f7d9c7d8b02e3ea4089d1be768e6be778013" />
                        </div>
                        <div class="tw-w-full">
                            <input maxlength="6" focus class="tw-w-full" v-model="code" type="number"
                                placeholder="请输入验证码" />
                        </div>
                    </div>
                    <div class="tw-m-5"></div>
                    <div>
                        <button class="tw-rounded-full" :disabled="loginButtonDisabled" @click="login">
                            <div class="tw-h-12 tw-flex tw-items-center tw-text-center tw-justify-center tw-text-md">
                                登录
                            </div>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </uni-popup>
</template>
<script>
import {
    Icon
} from '@iconify/vue'
import IconFont from '@/components/base/IconFont.vue'
import {
    apiService
} from '@/library/apis'
import {
    useStorage
} from '@/store/storage'

export default {
    components: {
        IconFont,
        Icon
    },
    data() {
        return {
            // #ifdef MP-WEIXIN
            isWechat: true,
            // #endif
            // #ifndef MP-WEIXIN
            isWechat: false,
            // #endif
            page: 'phone',
            phone: '',
            code: '',
            nextSMSCodeDuration: 0,
            ticker: null,
        }
    },
    computed: {
        currentTimestamp() {
            return Math.round(new Date().getTime() / 1000)
        },
        codeButtonText() {
            if (this.nextSMSCodeDuration > 0) {
                return `下次获取时间 ${this.nextSMSCodeDuration} s`
            }
            return '获取验证码'
        },
        codeButtonDisabled() {
            if (this.phone.length !== 11) {
                return true
            }
            return this.nextSMSCodeDuration > 0
        },
        loginButtonDisabled() {
            if (this.code.length !== 6) {
                return true
            }
            return false
        },
    },
    created() {
        this.ticker = setInterval(() => {
            if (this.nextSMSCodeDuration > 0) {
                this.nextSMSCodeDuration--
            }
        }, 1000)
    },
    destroyed() {
        clearInterval(this.ticker)
    },
    methods: {
        show() {
            this.$refs.moduleConfig.open("bottom");
        },
        hide() {
            this.$refs.moduleConfig.close();
        },
        isPage(page) {
            return this.page === page
        },
        switchPage(page) {
            this.page = page
        },
        async getCode() {
            await apiService.SendSMSCode(this.phone);
            this.nextSMSCodeDuration = 10
            this.switchPage('code')
        },
        async login() {
            const res = await apiService.Login(this.phone, this.code)
            this.comsumeLoginRes(res)
        },
        async loginByWeixinPhone(e) {
            const res = await apiService.LoginByWeixinPhone(e.detail.code);
            this.comsumeLoginRes(res)
        },
        comsumeLoginRes(res) {
            const {
                commitJWT
            } = useStorage()
            const {
                commitMe
            } = useStorage()
            commitJWT(res.access_token)
            commitMe(res)
            this.hide()
        },
    }
}
</script>