<template>
    <div class="tw-text-sm tw-h-full">
        <div
            class="tw-fixed tw-z-[1] tw-w-11/12 tw-top-3 tw-rounded-full tw-left-0 tw-right-0 tw-mx-auto tw-backdrop-filter tw-backdrop-blur-lg tw-shadow-sm">
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
        <Profile v-if="success" :profile="profile"></Profile>
        <ShareModal ref="ShareModal" :profile="profile"></ShareModal>
        <div style="background: #121212" v-if="!loading && !success"
            class="tw-h-full tw-text-white tw-text-opacity-80 tw-overflow-hidden tw-text-left">
            <div class="tw-px-5">
                <div class="tw-text-center tw-pt-60 tw-text-lg tw-text-white">
                    未知的数字身份: {{ did }}
                </div>
                <div class="tw-mt-5">
                    <button class="tw-bg-white tw-text-black" @click="back">
                        <span>返回我的数字身份</span>
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { getDefaultProfile } from "@/store/storage";
import Profile from '@/components/did/modules/Profile/Profile.vue'
import { apiService, loadMe } from "@/library/apis";
import { getCurrentPage } from "@/library/util";
import IconFont from "@/components/base/IconFont";
import ShareModal from "@/components/did/ShareModal.vue";

export default {
    data() {
        return {
            loading: true,
            success: false,
            did: '',
            profile: {},
        };
    },
    async created() { },
    async onLoad(options) {
        console.log("options:", options)
        let did = options.did;
        const scene = this.getScene(options);
        if (scene) {
            try {
                const res = await apiService.GetRealParams(scene)
                did = res.did;
            } catch (e) {
                console.log('failed to GetRealParams', e)
            }
        }
        this.did = did
        console.log("did", this.did);
        if (!this.did) {
            this.jumpBack()
            return
        }
        await this.loadProfile();
    },
    computed: {
        accountId() {
            const storage = useStorage()
            return storage.$state.accountId
        }
    },
    methods: {
        showShare() {
            this.$refs.ShareModal.show();
        },
        getScene(options) {
            if (options.q) {
                try {
                    const url = decodeURIComponent(options.q)
                    const scene = urlparse(url, true)?.query?.scene;
                    if (scene) {
                        return scene;
                    }
                } catch (e) {
                    console.log('failed to GetRealParams', e)
                }
            }
            if (options.scene) {
                try {
                    return decodeURIComponent(options.scene)
                } catch (e) {
                    console.log('failed to GetRealParams', e)
                }
            }
            return null;
        },
        jumpBack() {
            const pages = getCurrentPages()
            if (!pages || pages.length == 1) {
                uni.switchTab({ url: '/app/mobile/did/list', })
            }
            uni.navigateBack()
        },
        async loadProfile() {
            try {
                if (this.did) {
                    let res = await apiService.GetProfile(this.did);
                    this.profile = res.profile;
                    this.loading = false;
                    this.success = true;
                    console.log('!!!', this.profile)
                    return;
                }
            } catch (e) {
                this.loading = false;
            }
        },
    },
    components: {
        Profile,
        IconFont,
        ShareModal
    },
};
</script>

<style lang="scss"></style>