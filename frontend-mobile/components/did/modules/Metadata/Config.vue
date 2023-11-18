<template>
    <div style="background: linear-gradient(180deg, #252525 0%, #181818 100%); "
        class="tw-rounded-t-xl tw-text-white tw-px-3 tw-overflow-hidden">
        <div class="tw-relative tw-flex tw-flex-row tw-items-center tw-justify-center tw-py-3 tw-text-sm">
            <div>编辑身份资料</div>
        </div>
        <div style="height: 28rem" class="tw-overflow-y-auto tw-pb-3">
            <div>
                <ModuleConfigHeader :groupIndex="groupIndex" :moduleIndex="moduleIndex" title="基础资料"
                    description="基础资料支持录入头像、描述等信息" icon="fingerprint" @delete="deleteModule">
                </ModuleConfigHeader>
            </div>
            <div class="tw-pt-16 tw-px-3">
                <div class="tw-flex tw-flex-col tw-items-center tw-justify-center">
                    <div @click="uploadAvatar" class="tw-relative tw-w-28 tw-h-28 tw-rounded-full tw-overflow-hidden">
                        <div class="tw-absolute tw-t-0 tw-l-0 tw-bg-white tw-bg-opacity-10 tw-w-full tw-h-full"
                            :style="getAvatarImageStyle()"></div>
                        <div
                            class="tw-transition tw-duration-300 tw-cursor-pointer tw-flex tw-items-center hover:tw-bg-opacity-50 tw-justify-center tw-absolute tw-t-0 tw-l-0 tw-bg-black tw-bg-opacity-30 tw-w-full tw-h-full">
                            <img class="tw-w-4 tw-h-4"
                                src="https://static.xxxxxx.com/627400846e6019a4819cb30ff5279e4653e074b272a8a8f1f68dd1e37212c76f"
                                alt="">
                        </div>
                    </div>
                    <div class="tw-text-white tw-text-opacity-30 tw-mt-3 tw-text-base">点击修改头像</div>
                </div>
                <div style="display: none;">
                    <uni-file-picker ref="avatarUploader" :sourceType="['album']" @select="avatarUpload" :del-icon="false"
                        file-mediatype="image" limit="1" :disable-preview="true">
                    </uni-file-picker>
                </div>
                <div class="tw-mt-16">
                    <div class="tw-mt-2">
                        <TextInput v-model="profile.spec.title" label="昵称" placeholder="请输入昵称">
                        </TextInput>
                    </div>
                    <div class="tw-mt-2">
                        <TextareaInput class="tw-mt-3" label="描述" v-model="profile.spec.description" placeholder="请输入描述">
                        </TextareaInput>
                    </div>
                    <div class="tw-mt-2">
                        <TextInput prefix="https://xxxxxx.com/" v-model="profile.spec.slug" label="个性域名"
                            placeholder="请输入个性域名">
                        </TextInput>
                    </div>
                </div>
                <div class="tw-grid tw-grid-cols-2 tw-gap-3 tw-mt-3">
                    <button @click="back" hover-class="none"
                        class="tw-w-full tw-rounded-xl tw-bg-white tw-bg-opacity-5 hover:tw-bg-opacity-10 tw-transition">
                        <div class="tw-text-white tw-text-base tw-flex tw-items-center tw-justify-center tw-py-3.5">
                            <img class="tw-w-5 tw-h-5 tw-mr-2"
                                src="https://static.xxxxxx.com/mdi/af8ebf95055ff7a71f265a8bcaad2eec569d30d0eabe56239b03602f7da20e76" />
                            <span>返回</span>
                        </div>
                    </button>
                    <button @click="confirm" hover-class="none"
                        class="tw-w-full tw-rounded-xl tw-bg-white tw-bg-opacity-5 hover:tw-bg-opacity-10 tw-transition">
                        <div class="tw-text-white tw-text-base tw-flex tw-items-center tw-justify-center tw-py-3.5">
                            <img class="tw-w-5 tw-h-5 tw-mr-2"
                                src="https://static.xxxxxx.com/d2545c1e3cc1982dbc11b3aca8bde1cf2b39b4fa443782336a621ad0a80aaed2" />
                            <span>确认</span>
                        </div>
                    </button>
                </div>
            </div>
        </div>
        <LoginModal ref="LoginModal"></LoginModal>
    </div>
</template>

<script>
import ModuleConfigHeader from "../ModuleConfigHeader.vue";
import {
    apiService
} from '@/library/apis.js'
import TextInput from "@/components/base/TextInput.vue";
import TextareaInput from "@/components/base/TextareaInput.vue";
import {
    useStorage
} from '@/store/storage'
import LoginModal from '@/app/mobile/loginModal.vue'

export default {
    props: {
        moduleIndex: -1,
        groupIndex: -1,
        profile: {}
    },
    components: {
        ModuleConfigHeader,
        TextInput,
        TextareaInput,
        LoginModal
    },
    created() { },
    computed: {
        accountId() {
            const { accountId } = useStorage();
            return accountId;
        }
    },
    methods: {
        editing(info) {
            this.$emit('editing', info)
        },
        confirm() {
            this.back()
        },
        back() {
            this.$emit("editing", {
                type: 'profile',
                config: {},
                groupIndex: -1,
                moduleIndex: -1
            });
        },
        uploadAvatar() {
            if (!this.accountId) {
                this.$refs.LoginModal.show()
                return
            }
            console.log('>>>>>>>>>> avatarUploader', this.$refs.avatarUploader)
            this.$refs.avatarUploader.choose();
        },
        async avatarUpload(data) {
            const tempFilePaths = data?.tempFilePaths;
            if (!tempFilePaths || !tempFilePaths.length) return;
            uni.showLoading({
                title: '上传中'
            });
            try {
                const filepath = tempFilePaths[0];
                const res = await apiService.UploadImage(filepath);
                const imageUri = res?.image_uri || "";
                if (imageUri) {
                    this.profile.spec.avatar = imageUri;
                }
            } finally {
                uni.hideLoading()
            }
        },
        getAvatarImageStyle() {
            return {
                'background': `url(${this.profile?.spec?.avatar}) no-repeat center center`,
                'background-size': 'cover'
            };
        }
    }
}
</script>