<template>
    <nav style="
            position: sticky;
            top: 0;
            z-index: 1000;
            min-width: 800px;
            background: linear-gradient(
                rgb(255 255 255 / 3%) 0%,
                rgb(0 0 0 / 0%) 100%
            );
        " class="tw-backdrop-blur-lg tw-group tw-relative tw-flex tw-space-x-4 tw-py-3 tw-px-3 tw-z-30">
        <a href="/">
            <div class="tw-flex tw-items-center">
                <img src="https://xxxxxxxx/05cf85800e9395f08c474f6373d128b2fbb003d0ed72c9ee9b41f58fb8d8fa76"
                    alt="" />
            </div>
        </a>
        <div class="mr-8"></div>
        <div class="tw-relative tw-flex tw-w-32 tw-justify-start tw-items-center tw-text-lg" style="flex: 1">
            <a href="/app/did">
                <div :class="{ active: isPage('did') }"
                    class="nagivator-did tw-flex tw-items-center tw-justify-center tw-mr-8 tw-px-2 tw-rounded-lg">
                    <div class="nagivator-did-icon"></div>
                    <span class="tw-ml-1 tw-mb-0.5">数字身份</span>
                </div>
            </a>
            <a href="/app/achievement">
                <div :class="{
                    active: isPage('achievement'),
                }" class="navigator-achievement tw-flex tw-items-center tw-justify-center  tw-px-2 tw-rounded-lg">
                    <div class="navigator-achievement-icon"></div>
                    <span class="tw-ml-1 tw-mb-0.5">数字成就</span>
                </div>
            </a>
        </div>
        <div class="tw-flex tw-h-full tw-self-center">
            <div class="tw-flex tw-right-0 custom-box">
                <v-menu open-on-hover>
                    <template v-slot:activator="{ props }">
                        <div v-bind="props">
                            <v-btn height="45" :flat="true" @click="navigateToProfile" v-if="accountId"
                                class="tw-w-full tw-transition tw-duration-300 hover:tw-border-white tw-border-solid tw-border tw-border-transparent tw-rounded-lg tw-text-base tw-border tw-bg-white tw-bg-opacity-5">
                                <div class="tw-w-full tw-flex tw-flew-row tw-justify-between tw-items-center">
                                    <div class="tw-mr-3">
                                        <img :src="avatar"
                                            class="tw-rounded-full tw-w-6 tw-h-6 tw-shadow tw-align-middle" />
                                    </div>
                                    <div>{{ name }}</div>
                                </div>
                            </v-btn>

                            <v-btn v-if="!accountId" height="45" :flat="true" @click="navigateToLogin"
                                class="tw-w-full tw-transition tw-duration-300 hover:tw-border-white tw-border-solid tw-border tw-border-transparent tw-rounded-lg tw-text-base tw-border tw-bg-white tw-bg-opacity-5 tw-text-opacity-50">
                                <div class="tw-w-full tw-flex tw-flew-row tw-justify-between tw-items-center">
                                    <div class="tw-mr-2.5">
                                        <v-icon size="1.4rem" icon="mdi-pac-man"></v-icon>
                                    </div>
                                    <div>一键登录</div>
                                </div>
                            </v-btn>
                        </div>
                    </template>
                    <div v-if="accountId" class="tw-mt-3 tw-w-32 tw-bg-black tw-rounded-lg tw-overflow-hidden">
                        <div class="">
                            <div @click="logout"
                                class="tw-transition tw-duration-300 hover:tw-text-opacity-100 hover:tw-bg-opacity-20 tw-bg-white tw-bg-opacity-10 tw-cursor-pointer tw-h-12 tw-flex tw-items-center tw-justify-center">
                                <span><v-icon icon="mdi-logout-variant"></v-icon></span>
                                <span class="tw-ml-2">退出登录</span>
                            </div>
                        </div>
                    </div>
                </v-menu>
            </div>
        </div>
    </nav>
</template>
<script>
import { useRouter, useRoute } from "vue-router";
import { useStorage } from "@/stores/storage";
import { apiService } from "@/apis/apis";
import { onMounted, ref } from "vue";

export default {
    data() {
        return {
            account: {},
            searchText: "",
        };
    },
    created() { },
    mounted() {
        this.load();
    },
    computed: {
        accountId() {
            const { state } = useStorage();
            return state.accountId;
        },
        avatar() {
            const { state } = useStorage();
            return state?.account?.avatar;
        },
        name() {
            const { state } = useStorage();
            return state?.account?.name;
        },
    },
    methods: {
        async load() {
            const { commitMe } = useStorage();
            let res = await apiService.Me({
                tolerance: true,
            });
            if (res) {
                this.account = res;
                commitMe(res);
            }
        },
        isPage(name) {
            const route = useRoute();
            return route.path.indexOf(`/app/${name}`) !== -1;
        },
        logout() {
            const storage = useStorage();
            const { commitJWT, commitMe } = useStorage();
            const router = useRouter();
            commitJWT("");
            commitMe("");
            router.go(0);
        },
        navigateToLogin() {
            this.$router.push({
                name: "PageLogin",
            });
        },
        navigateToProfile() { },
        navigateToEditPrfile() {
            const { state } = useStorage();
            const router = useRouter();
            router.push({
                name: "EditInformation",
                query: {
                    id: state.accountId,
                },
            });
        },
    },
};
</script>
<style lang="less" scoped>
.nagivator-did {
    transition: all 0.6s;
    @white-icon: "https://xxxxxxxx/aa845f9156efcaf0b2c5d8659c60c0f5fe6b74f5df93912f3f966cb4e2026c89";
    @black-icon: "https://xxxxxxxx/312c090ff40a09be01a48b520835cfbbb5c6afebaeb4cc4460a6330f96f6593a";

    .nagivator-did-icon {
        width: 25px;
        height: 25px;
        background: url(@white-icon) no-repeat center center;
    }

    &:hover .nagivator-did-icon,
    &.active .nagivator-did-icon {
        background: url(@black-icon) no-repeat center center;
    }

    &.active,
    &:hover {
        color: #000;
        background-color: rgba(255, 255, 255, 0.99);
    }
}

.navigator-achievement {
    transition: all 0.6s;
    @white-icon: "https://xxxxxxxx/34d111d42dff48069fb67732828277a471d72ed3a83f1ec4ff55d70c21bc08ed";
    @black-icon: "https://xxxxxxxx/3ce2f473999f63e4cf042f9717d93f00c3763708d61a1f4141dc1642d2aeb299";

    .navigator-achievement-icon {
        width: 25px;
        height: 25px;
        background: url(@white-icon) no-repeat center center;
    }

    &:hover .navigator-achievement-icon,
    &.active .navigator-achievement-icon {
        background: url(@black-icon) no-repeat center center;
    }

    &.active,
    &:hover {
        color: #000;
        background-color: rgba(255, 255, 255, 0.99);
    }
}
</style>