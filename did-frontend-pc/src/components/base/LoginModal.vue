<template>
    <v-dialog scroll-strategy="block" v-model="visible" scrim="black" width="480">
        <div class="tw-rounded-xl tw-bg-black tw-overflow-hidden">
            <div class="tw-p-10 tw-bg-white tw-bg-opacity-10">
                <!-- <div class="tw-mb-5 tw-pt-5 tw-text-lg tw-flex tw-flex-row tw-items-center tw-justify-between">
                    <div class="tw-flex tw-items-center">
                        <span><v-icon class="tw-mr-3" icon="mdi-alert"></v-icon></span>
                        <span>请先登录</span>
                    </div>
                </div> -->
                <div class="tw-overflow-y-auto">
                    <div>
                        <div>
                            <div class="tw-text-3xl">欢迎来到xxxx_xxx</div>
                            <div class="tw-opacity-30 tw-mt-2">
                                每个人都值得被看见
                            </div>
                        </div>
                        <div class="mt-8">
                            <v-text-field v-model="phone" prepend-inner-icon="mdi-cellphone" clearable variant="outlined"
                                label="手机号" placeholder="请输入大陆手机号"></v-text-field>
                        </div>
                        <div>
                            <v-text-field v-model="code" clearable prepend-inner-icon="mdi-shield-lock" label="验证码"
                                @keyup.enter="login" variant="outlined" placeholder="请输入验证码">
                                <template v-slot:append>
                                    <div class="tw-flex tw-items-center tw-justify-center">
                                        <v-btn @click="getCode" style="height: 48px" prepend-icon="mdi-email-fast-outline"
                                            class="tw-bg-white tw-text-black" :disabled="codeButtonDisabled" type="submit"
                                            variant="tonal">
                                            {{ codeButtonText }}
                                        </v-btn>
                                    </div>
                                </template>
                            </v-text-field>
                        </div>
                        <div>
                            <v-btn block class="tw-bg-white tw-text-black" :disabled="loginButtonDisabled"
                                @click.prevent="login" :flat="true" size="large" type="submit" variant="elevated">
                                立即登录
                            </v-btn>
                            <div class="tw-opacity-60 tw-flex tw-items-center tw-mt-3">
                                <v-icon icon="mdi-information-slab-box"></v-icon>
                                <div class="tw-ml-1">
                                    提示：未注册用户将会自动注册
                                </div>
                            </div>
                            <div class="tw-mt-3">
                                <v-btn @click="hide"
                                    class="tw-w-full tw-text-opacity-30 hover:tw-text-opacity-80 tw-text-white"
                                    variant="plain" :flat="true" size="large">
                                    继续以游客身份访问
                                </v-btn>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </v-dialog>
</template>
<script>
import { apiService } from "@/apis/apis";
import SPIcon from "@/components/base/SPIcon.vue";
import IconFont from "@/components/base/IconFont.vue";
import Toast from "@/components/base/Toast.vue";
import { useStorage } from "@/stores/storage";
import _ from "lodash";

export default {
    props: {
        profile: {},
    },
    components: {
        SPIcon,
        IconFont,
        Toast
    },
    data() {
        return {
            success: null,
            visible: false,
            page: "phone",
            phone: "",
            code: "",
            nextSMSCodeDuration: 0,
            ticker: null,
        }
    },
    created() {
        this.ticker = setInterval(() => {
            if (this.nextSMSCodeDuration > 0) {
                this.nextSMSCodeDuration--;
            }
        }, 1000);
    },
    destroyed() {
        clearInterval(this.ticker);
    },
    computed: {
        currentTimestamp() {
            return Math.round(new Date().getTime() / 1000);
        },
        codeButtonText() {
            if (this.nextSMSCodeDuration > 0) {
                return `下次获取时间${this.nextSMSCodeDuration}s`;
            }
            return "获取验证码";
        },
        codeButtonDisabled() {
            if (this.phone.length !== 11) {
                return true;
            }
            return this.nextSMSCodeDuration > 0;
        },
        loginButtonDisabled() {
            if (this.code.length !== 6) {
                return true;
            }
            return false;
        },
    },
    created() {
        const self = this;
        window.showLoginModal = function (options) {
            if (options) {
                self.success = options?.success || null;
            }
            self.show()
        }
        window.hideLoginModal = function () {
            self.hide()
        }
    },
    methods: {
        show() {
            this.visible = true;
        },
        hide() {
            this.visible = false;
        },
        async getCode() {
            this.nextSMSCodeDuration = 3;
            const res = await apiService.SendSMSCode(this.phone);
        },
        async login() {
            const res = await apiService.Login(this.phone, this.code);
            if (res && res.access_token) {
                const { commitJWT, commitMe } = useStorage();
                commitJWT(res.access_token);
                let me = await apiService.Me();
                commitMe(me);
                this.success && this.success();
                this.hide()
            }
        },
    }
}
</script>