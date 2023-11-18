<template>
    <div class="tw-relative">
        <div @click="triggerUpload"
            class="tw-z-[1] tw-text-white tw-text-center tw-bg-black tw-border tw-border-solid tw-border-white tw-bg-opacity-10 tw-border-opacity-30 tw-px-3 tw-py-1 tw-rounded tw-absolute tw-right-3 tw-top-3 tw-text-sm">
            点击设置背景图
        </div>
        <BannerView :value="getImage()"></BannerView>
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
import BannerView from "./BannerView.vue";

export default {
    components: {
        SPIcon,
        IconFont,
        TextInput,
        TextareaInput,
        LoginModal,
        BannerView
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
        getImage() {
            return this.modelValue || this.defaultValue;
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
