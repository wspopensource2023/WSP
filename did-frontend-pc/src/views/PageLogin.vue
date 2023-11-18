<template>
    <div
        style="background-color: #01000c; min-height: 100vh; min-width: 1200px"
    >
        <Header></Header>
        <div
            style="
                position: absolute;
                right: 0;
                top: -30px;
                width: 408px;
                height: 383px;
                flex-shrink: 0;
                background: rgba(115, 80, 255, 0.27);
                filter: blur(150px);
            "
        ></div>
        <div class="tw-pt-24 tw-flex tw-justify-center tw-items-center">
            <div class="tw-flex tw-justify-between -tw-ml-48">
                <div class="tw-mt-10 tw-pr-24">
                    <div class="tw-pb-32 tw-flex tw-justify-center -tw-mt-8">
                        <video
                            class="-tw-rotate-[26deg]"
                            width="650"
                            muted
                            autoplay
                            loop
                        >
                            <source
                                src="https://xxxxxxxx/blackhole.mp4"
                                type="video/mp4"
                            />
                        </video>
                    </div>
                </div>
                <div class="-tw-ml-5">
                    <div style="width: 400px">
                        <div>
                            <div class="tw-text-3xl">欢迎来到xxxx_xxx</div>
                            <div class="tw-opacity-30 tw-mt-2">
                                每个人都值得被看见
                            </div>
                        </div>
                        <div class="mt-8">
                            <v-text-field
                                v-model="phone"
                                prepend-inner-icon="mdi-cellphone"
                                clearable
                                variant="outlined"
                                label="手机号"
                                placeholder="请输入大陆手机号"
                            ></v-text-field>
                        </div>
                        <div>
                            <v-text-field
                                v-model="code"
                                clearable
                                prepend-inner-icon="mdi-shield-lock"
                                label="验证码"
                                @keyup.enter="login"
                                variant="outlined"
                                placeholder="请输入验证码"
                            >
                                <template v-slot:append>
                                    <div
                                        class="tw-flex tw-items-center tw-justify-center"
                                    >
                                        <v-btn
                                            @click="getCode"
                                            style="height: 48px"
                                            prepend-icon="mdi-email-fast-outline"
                                            class="tw-bg-white tw-text-black"
                                            :disabled="codeButtonDisabled"
                                            type="submit"
                                            variant="tonal"
                                        >
                                            {{ codeButtonText }}
                                        </v-btn>
                                    </div>
                                </template>
                            </v-text-field>
                        </div>
                        <div>
                            <v-btn
                                block
                                class="tw-bg-white tw-text-black"
                                :disabled="loginButtonDisabled"
                                @click.prevent="login"
                                size="large"
                                type="submit"
                                variant="elevated"
                            >
                                立即登录
                            </v-btn>
                        </div>
                        <div
                            class="tw-opacity-60 tw-flex tw-items-center tw-mt-3"
                        >
                            <v-icon icon="mdi-information-slab-box"></v-icon>
                            <div class="tw-ml-1">
                                提示：未注册用户将会自动注册
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <Footer style="border-top: 1px solid #ffffff12"></Footer>
    </div>
</template>
<script>
import { apiService } from "@/apis/apis";
import Toast from "@/components/base/Toast.vue";
import { useStorage } from "@/stores/storage";
import { useRouter } from "vue-router/dist/vue-router";
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";
export default {
    props: {},
    data() {
        const router = useRouter();
        const redirectUri = router.currentRoute.value.query.redirectUri || "";
        return {
            page: "phone",
            phone: "",
            code: "",
            nextSMSCodeDuration: 0,
            ticker: null,
            redirectUri: redirectUri,
        };
    },
    components: {
        Toast,
        Header,
        Footer,
    },
    created() {
        this.ticker = setInterval(() => {
            if (this.nextSMSCodeDuration > 60) {
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
    methods: {
        async getCode() {
            this.nextSMSCodeDuration = 3;
            const res = await apiService.SendSMSCode(this.phone);
            console.log("res", res);
        },
        async login() {
            const res = await apiService.Login(this.phone, this.code);
            const { commitJWT } = useStorage();
            commitJWT(res.access_token);
            if (this.redirectUri) {
                window.location = this.redirectUri;
            } else {
                this.$router.push({ name: "PageDID" });
            }
        },
    },
};
</script>
<style lang="less" scoped>
</style>
