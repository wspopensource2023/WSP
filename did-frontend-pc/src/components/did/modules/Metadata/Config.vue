<template>
    <div>
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
                        <v-icon size="2rem" icon="mdi-camera"></v-icon>
                    </div>
                </div>
                <div class="tw-text-white tw-text-opacity-30 tw-mt-3 tw-text-base">点击修改头像</div>
            </div>
            <div>
                <v-file-input class="tw-hidden" id="metadata-avatar-uploader" @update:modelValue="chooseImage"
                    accept="image/*" prepend-icon="" variant="outlined"></v-file-input>
            </div>
            <div class="tw-mt-16">
                <div class="tw-mt-2">
                    <v-text-field :persistent-placeholder="true" rounded="lg" v-model="profile.spec.title" clearable
                        variant="outlined" label="名称" placeholder="请输入名称"></v-text-field>
                </div>
                <div class="tw-mt-2">
                    <v-textarea :persistent-placeholder="true" rounded="lg" v-model="profile.spec.description"
                        variant="outlined" label="简介" placeholder="请输入简介"></v-textarea>
                </div>
                <div class="tw-mt-2">
                    <v-text-field :persistent-placeholder="true" rounded="lg" prefix="https://xxxxxx.com/"
                        v-model="profile.spec.slug" clearable variant="outlined" label="个性域名" placeholder="请输入个性域名">
                    </v-text-field>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import ModuleConfigHeader from "../ModuleConfigHeader.vue";
import { apiService } from "@/apis/apis";
import { useStorage } from "@/stores/storage";

export default {
    props: {
        moduleIndex: -1,
        groupIndex: -1,
        profile: {}
    },
    components: {
        ModuleConfigHeader,
    },
    created() { },
    computed: {
        accountId() {
            const { state } = useStorage();
            return state.accountId;
        }
    },
    methods: {
        uploadAvatar() {
            if (!this.accountId) {
                showLoginModal();
                return
            }
            document.getElementById('metadata-avatar-uploader').click();
        },
        async chooseImage(files) {
            if (!files) return;
            showLoading();
            const res = await apiService.UploadImage(files[0]);
            hideLoading();
            const imageUri = res?.image_uri || "";
            if (imageUri) {
                this.profile.spec.avatar = imageUri;
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