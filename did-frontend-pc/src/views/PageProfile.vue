<template>
    <div class="tw-flex tw-justify-center" style="min-height: 100vh;">
        <div class="tw-absolute tw-t-0 tw-l-0 tw-w-full tw-h-full">
            <div class="tw-absolute tw-t-0 tw-l-0 tw-w-full tw-h-full" :style="getBackgroundStyle()">
                <img class="tw-w-full" v-if="getBackgroundMode() === 'image'" :src="getBackgroundImage()" alt="">
            </div>
            <div v-if="isBackgroundMode('video')" class="tw-absolute tw-t-0 tw-l-0 tw-w-full tw-h-full">
                <video class="tw-w-full tw-h-full tw-object-cover" muted :controls="false" :loop="true" :autoplay="true"
                    :src="getBackgroundVideo()"></video>
            </div>
            <div class="tw-absolute tw-t-0 tw-l-0 tw-bg-white/10 tw-w-full tw-h-full tw-backdrop-blur-lg">
            </div>
        </div>
        <Profile style="min-height: 100vh; width: 35rem" :config="profile"></Profile>
        <div style="width: 32rem"
            class="tw-fixed tw-z-[1] tw-top-3 tw-rounded-full tw-w-full tw-backdrop-filter tw-backdrop-blur-lg tw-shadow-sm">
            <div class="tw-flex tw-flex-row tw-justify-between tw-items-center tw-py-3 tw-px-3">
                <div class="tw-w-8 tw-justify-center tw-flex tw-items-center" @click="jumpBack">
                    <img class="tw-w-6 tw-h-6"
                        src="https://static.xxxxxx.com/mdi/af8ebf95055ff7a71f265a8bcaad2eec569d30d0eabe56239b03602f7da20e76" />
                </div>
                <div class="tw-w-8 tw-justify-center tw-flex tw-items-center" @click="showShare">
                    <img class="tw-w-4 tw-h-4"
                        src="https://static.xxxxxx.com/4da81a0e81ca603cdb8237f57c747d083ac35ba44bd18e89472d4b551d4afe6d" />
                </div>
            </div>
        </div>
        <Share :profile="profile" ref="Share"></Share>
    </div>
</template>

<script>
import { apiService } from "@/apis/apis";
import { getDefaultProfile } from "@/stores/storage";
import Profile from "@/components/did/modules/Profile/Profile.vue";
import { PROFILE_CONSTS } from "@/library/consts";
import Share from '@/components/did/Share.vue';
export default {
    data() {
        return {
            did: this.$route.params.did || "",
            profile: {},
        };
    },
    components: {
        Profile,
        Share
    },
    created() {
        this.loadProfile();
    },
    methods: {
        showShare() {
            this.$refs.Share.show();
        },
        jumpBack() {
            this.$router.push({ name: "PageDID" });
        },
        async loadProfile() {
            if (this.did) {
                let res = await apiService.GetProfile(this.did);
                this.profile = res.profile;
                console.log("profile loaded", this.profile);
                return;
            }
            console.log(`no did, use default profile: ${this.did}`);
            this.profile.value = getDefaultProfile();
        },
        getBackgroundMode() {
            return this.profile?.spec?.style[PROFILE_CONSTS.KEY_PROFILE_BACKGROUND_MODE];
        },
        isBackgroundMode(mode) {
            return this.getBackgroundMode() === mode;
        },
        getModulesStyle() {
            return {
                'text-align': this.profile?.spec?.style[PROFILE_CONSTS.KEY_PROFILE_TEXT_ALIGN] || PROFILE_CONSTS.DEFAULT_PROFILE_TEXT_ALIGN
            }
        },
        getBackgroundImage() {
            return this.profile?.spec?.style[PROFILE_CONSTS.KEY_PROFILE_BACKGROUND_IMAGE];
        },
        getBackgroundColor() {
            return this.profile?.spec?.style[PROFILE_CONSTS.KEY_PROFILE_BACKGROUND_COLOR];
        },
        getBackgroundVideo() {
            return this.profile?.spec?.style[PROFILE_CONSTS.KEY_PROFILE_BACKGROUND_VIDEO];
        },
        getBackgroundStyle() {
            const style = {}
            const mode = this.getBackgroundMode();
            if (mode === "color") {
                style['background-color'] = this.getBackgroundColor();
            }
            return style;
        },
    },
};
</script>
<style lang="less">
html,
body,
#app {
    height: auto;
}
</style>
