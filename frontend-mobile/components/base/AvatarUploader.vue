<template>
    <div class="tw-flex tw-flex-col tw-items-center tw-justify-center">
        <div @click="triggerUpload" class="tw-relative tw-w-28 tw-h-28 tw-rounded-full tw-overflow-hidden">
            <div class="tw-absolute tw-t-0 tw-l-0 tw-bg-white tw-bg-opacity-10 tw-w-full tw-h-full"
                :style="getPreviewStyle()"></div>
            <div
                class="tw-transition tw-duration-300 tw-cursor-pointer tw-flex tw-items-center hover:tw-bg-opacity-50 tw-justify-center tw-absolute tw-t-0 tw-l-0 tw-bg-black tw-bg-opacity-30 tw-w-full tw-h-full">
                <img class="tw-w-6 tw-h-6"
                    src="https://static.xxxxxx.com/627400846e6019a4819cb30ff5279e4653e074b272a8a8f1f68dd1e37212c76f"
                    alt="">
            </div>
        </div>
        <div class="tw-text-white tw-text-opacity-30 tw-mt-3 tw-text-base">点击修改头像</div>
        <div style="display: none;">
            <uni-file-picker ref="uploader" :sourceType="['album']" @select="upload" :del-icon="false"
                file-mediatype="image" limit="1" :disable-preview="true">
            </uni-file-picker>
        </div>
        <LoginModal ref="LoginModal"></LoginModal>
    </div>
</template>
<script>
import SPIcon from "@/components/base/SPIcon.vue";
import { apiService } from "@/library/apis";
import IconFont from "@/components/base/IconFont.vue";
import TextInput from "@/components/base/TextInput.vue";
import TextareaInput from "@/components/base/TextareaInput.vue";
import LoginModal from '@/app/mobile/loginModal.vue'
import { useStorage } from '@/store/storage'
import { PROFILE_CONSTS } from "@/library/consts";

export default {
    components: {
        SPIcon,
        IconFont,
        TextInput,
        TextareaInput,
        LoginModal
    },
    props: {
        modelValue: '',
        defaultValue: PROFILE_CONSTS.DEFAULT_ACCOUNT_AVATAR,
    },
    data() {
        return {};
    },
    computed: {
        accountId() {
            const storage = useStorage()
            return storage.$state.accountId
        },
    },
    async created() { },
    methods: {
        triggerUpload() {
            if (!this.accountId) {
                this.$refs.LoginModal.show()
                return
            }
            this.$refs.uploader.choose();
        },
        getPreviewStyle() {
            const image = this.modelValue || this.defaultValue;
            return {
                'background': `url(${image}) no-repeat center center`,
                'background-size': 'cover'
            };
        },
        async upload(data) {
            const tempFilePaths = data?.tempFilePaths;
            if (!tempFilePaths || !tempFilePaths.length) return;
            const filepath = tempFilePaths[0];
            const res = await apiService.UploadImage(filepath);
            const imageUri = res?.image_uri || "";
            if (imageUri) {
                this.$emit('update:modelValue', imageUri)
            }
        },
    },
};
</script>

<style lang="scss">
@import "@/static/style.css";
</style>
