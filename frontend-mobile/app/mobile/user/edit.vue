<template>
    <div class="bg-page tw-h-full tw-text-white tw-text-opacity-80 tw-overflow-hidden tw-text-left">
        <BannerUploader v-model="config.banner"></BannerUploader>
        <div class="overflow-x-auto tw-overflow-y-hidden tw-pb-5 tw-px-5 -tw-mt-16">
            <AvatarUploader v-model="config.avatar"></AvatarUploader>
            <div class="tw-mt-8">
                <div class="tw-mt-2">
                    <TextInput v-model="config.name" label="昵称" placeholder="请输入昵称">
                    </TextInput>
                </div>
                <div class="tw-mt-5">
                    <TextareaInput label="描述" v-model="config.description" placeholder="请输入描述">
                    </TextareaInput>
                </div>
            </div>
            <div class="tw-mt-6 tw-grid tw-grid-cols-2 tw-gap-8">
                <button @click="back"
                    class="tw-w-full tw-rounded-xl tw-bg-white tw-bg-opacity-5 hover:tw-bg-opacity-10 tw-transition">
                    <div class="tw-text-white tw-text-base tw-flex tw-items-center tw-justify-center tw-py-3.5">
                        <img class="tw-w-5 tw-h-5 tw-mr-2"
                            src="https://static.xxxxxx.com/mdi/af8ebf95055ff7a71f265a8bcaad2eec569d30d0eabe56239b03602f7da20e76" />
                        <span>返回</span>
                    </div>
                </button>
                <button @click="save" hover-class="none"
                    class="tw-w-full tw-rounded-xl tw-bg-white tw-bg-opacity-5 hover:tw-bg-opacity-10 tw-transition">
                    <div class="tw-text-white tw-text-base tw-flex tw-items-center tw-justify-center tw-py-3.5">
                        <img class="tw-w-5 tw-h-5 tw-mr-2"
                            src="https://static.xxxxxx.com/d2545c1e3cc1982dbc11b3aca8bde1cf2b39b4fa443782336a621ad0a80aaed2" />
                        <span>保存</span>
                    </div>
                </button>
            </div>
        </div>
    </div>
</template>

<script>
import SPIcon from "@/components/base/SPIcon.vue";
import { apiService } from "@/library/apis";
import IconFont from "@/components/base/IconFont.vue";
import TextInput from "@/components/base/TextInput.vue";
import TextareaInput from "@/components/base/TextareaInput.vue";
import { useStorage } from '@/store/storage'
import { PROFILE_CONSTS } from "@/library/consts";
import AvatarUploader from "@/components/base/AvatarUploader.vue";
import BannerUploader from "@/components/base/BannerUploader.vue";
import {
    getDefaultAvatar,
    getDefaultDescription,
    getDefaultName,
    getDefaultBanner,
} from "@/store/storage";

export default {
    components: {
        SPIcon,
        IconFont,
        TextInput,
        TextareaInput,
        AvatarUploader,
        BannerUploader
    },
    data() {
        return {
            config: {
                avatar: "",
                name: "",
                description: "",
                banner: "",
            },
        };
    },
    computed: {
        accountId() {
            const storage = useStorage()
            return storage.$state.accountId
        },
    },
    async onShow() {
        if (!this.accountId) {
            uni.navigateTo({
                url: "/app/mobile/login",
            });
            return
        }

        await this.loadMe();
    },
    async created() {
    },
    methods: {
        getAvatarImageStyle() {
            const avatar = this.config.avatar || PROFILE_CONSTS.DEFAULT_ACCOUNT_AVATAR
            return {
                'background': `url(${avatar}) no-repeat center center`,
                'background-size': 'cover'
            };
        },
        async save() {
            await apiService.UpdateAccountProfile({
                avatar: this.config.avatar,
                name: this.config.name,
                desc: this.config.description,
                banner: this.config.banner,
            });
            this.back();
        },
        back() {
            uni.switchTab({
                url: "/app/mobile/user/me",
            });
        },
        async loadMe() {
            uni.showLoading({
                title: '加载中',
                mask: true,
            })
            let res;
            try {
                res = await apiService.Me(true);
            } finally {
                this.config = {
                    avatar: res.avatar || getDefaultAvatar(),
                    name: res.name || '',
                    description: res.desc || '',
                    banner: res.banner || getDefaultBanner(),
                };
                uni.hideLoading()
            }
        },
        async bannerUpload(data) {
            const tempFilePaths = data?.tempFilePaths;
            if (!tempFilePaths || !tempFilePaths.length) return;
            const filepath = tempFilePaths[0];
            const res = await apiService.UploadImage(filepath);
            const imageUri = res?.image_uri || "";
            if (imageUri) {
                this.config.banner = imageUri;
            }
        },
        async avatarUpload(data) {
            const tempFilePaths = data?.tempFilePaths;
            if (!tempFilePaths || !tempFilePaths.length) return;
            const filepath = tempFilePaths[0];
            const res = await apiService.UploadImage(filepath);
            const imageUri = res?.image_uri || "";
            if (imageUri) {
                this.config.avatar = imageUri;
            }
        },
    },
};
</script>

<style lang="scss">
@import "@/static/style.css";
</style>
