<template>
    <div class="tw-text-white tw-h-full tw-w-full page-did" style="background: #121212">
        <div class="tw-p-3">
            <div class="tw-mt-2">
                <div class="tw-flex tw-p-3 tw-justify-between" @click="updateMe">
                    <div class="tw-w-20 tw-flex tw-items-center">
                        <img :src="avatar" class="tw-w-14 tw-h-14 tw-rounded-full" alt="" />
                    </div>
                    <div class="tw-w-full tw-pl-4 tw-truncate">
                        <div class="tw-text-base tw-mt-1">{{ name }}</div>
                        <div class="tw-text-sm tw-opacity-50 tw-mt-1">
                            {{ description }}
                        </div>
                    </div>
                </div>
            </div>
            <div class="tw-mt-4 tw-p-2 tw-bg-white tw-bg-opacity-5 tw-rounded-lg tw-text-base">
                <div class="tw-p-3 tw-border-b-1" @click="updateMe">
                    <div class="tw-flex tw-items-center tw-justify-between">
                        <span>修改基础信息</span>
                        <img class="tw-w-6 tw-h-6"
                            src="https://static.xxxxxx.com/dd59fc3fba842e8626db37e42327a43db2475eed4e7585e9f0788caac90ebf43" />
                    </div>
                </div>
                <div class="tw-p-3 tw-border-b-1" @click="logout">
                    <div class="tw-flex tw-items-center tw-justify-between">
                        <span>退出登录</span>
                        <img class="tw-w-6 tw-h-6"
                            src="https://static.xxxxxx.com/dd59fc3fba842e8626db37e42327a43db2475eed4e7585e9f0788caac90ebf43" />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>


import ButtonBox from "@/components/base/ButtonBox.vue";


import IconFont from "@/components/base/IconFont.vue";
import {
    useStorage,
    getDefaultAvatar,
    getDefaultName,
    getDefaultDescription,
} from "@/store/storage";
import {
    apiService
} from "@/library/apis";

export default {
    data() {
        return {
            me: {},
        };
    },
    computed: {
        accountId() {
            const storage = useStorage();
            return storage.$state.accountId;
        },
        avatar() {
            return this.me?.avatar || getDefaultAvatar();
        },
        name() {
            return this.me?.name || getDefaultName();
        },
        description() {
            return this.me?.desc || getDefaultDescription();
        },
        banner() {
            return this.me?.banner;
        },
    },
    async onShow() {
        await this.loadMe();
    },
    methods: {
        updateMe() {
            uni.navigateTo({
                url: `/app/mobile/user/edit`,
            });
        },
        async loadMe() {
            try {
                const res = await apiService.Me(true);
                this.me = res;
            } catch (e) {
                this.me = {};
            }
        },
        logout() {
            uni.showModal({
                title: "提示",
                content: "确定要退出登录吗？",
                success: (res) => {
                    if (res.confirm) {
                        const { clear } = useStorage()
                        clear();
                        uni.navigateTo({
                            url: "/app/mobile/login",
                        });
                    }
                },
            });
        },
    },
    components: {
        IconFont,
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