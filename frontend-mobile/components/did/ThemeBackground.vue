<template>
    <div class="tw-pb-16">
        <div class="tw-grid tw-grid-cols-3 tw-gap-1">
            <button @click="switchBackgroundMode('image')"
                    :class="getBackgroundActiveClass('image')"
                    class="tw-w-full tw-text-white tw-transition tw-duration-300 tw-whitespace-nowrap hover:tw-border-white tw-border-solid tw-border tw-border-transparent tw-rounded-lg tw-text-base tw-border tw-bg-white tw-bg-opacity-5 tw-flex tw-flex-row tw-justify-center tw-items-center tw-py-3">
                <img class="tw-w-4 tw-h-4 tw-self-center tw-ml-1 tw-mr-2.5"
                     src="https://static.xxxxxx.com/ba13915a1fcebb7aa4ff3e3126887f68bc99ff8ccf3806e7c5340de6be623873"
                     alt="">
                <div>图片</div>
            </button>
            <button @click="switchBackgroundMode('color')"
                    :class="getBackgroundActiveClass('color')"
                    class="tw-w-full tw-text-white tw-transition tw-duration-300 tw-whitespace-nowrap hover:tw-border-white tw-border-solid tw-border tw-border-transparent tw-rounded-lg tw-text-base tw-border tw-bg-white tw-bg-opacity-5 tw-flex tw-flex-row tw-justify-center tw-items-center tw-py-3">
                <img class="tw-w-4 tw-h-4 tw-self-center tw-ml-1 tw-mr-2.5"
                     src="https://static.xxxxxx.com/4a7cc465f328fdd3c5916316bb4c0ce51df0cdd8eec7a24c21593a2ce07d9d82"
                     alt="">
                <div>颜色</div>
            </button>
            <button @click="switchBackgroundMode('video')"
                    :class="getBackgroundActiveClass('video')"
                    class="tw-w-full tw-text-amber-300 tw-transition tw-duration-300 tw-whitespace-nowrap hover:tw-border-amber-200 tw-border-solid tw-rounded-lg tw-text-base tw-border tw-bg-white tw-bg-opacity-5 tw-flex tw-flex-row tw-justify-center tw-items-center tw-py-3">
                <img class="tw-w-4 tw-h-4 tw-self-center tw-ml-1 tw-mr-2.5"
                     src="https://static.xxxxxx.com/f7a5a752f7e285c6f10187ae6b04e71008e192cacea6558bb557eaf63b1f6b5c"
                     alt="">
                <div>视频</div>
            </button>
        </div>
        <div v-if="isBackgroundMode('image')"
             class="tw-mt-3 tw-bg-white tw-bg-opacity-5 tw-rounded-xl tw-px-3 tw-py-3">
            <div class="tw-text-sm tw-text-white tw-text-opacity-70">选择图片背景</div>
            <div class="tw-mt-2 tw-grid tw-grid-cols-3 tw-gap-1">
                <div
                    class="tw-relative tw-cursor-pointer tw-transition tw-duration-300 hover:tw-border-white tw-border-solid tw-border-2 tw-border-transparent tw-h-40 tw-rounded-xl tw-overflow-hidden">
                    <div
                        class="tw-absolute tw-t-0 tw-l-0 tw-bg-white tw-bg-opacity-20 tw-w-full tw-h-full"
                        :style="getBackgroundImageStyle(getBackgroundImage(), true)">
                    </div>
                    <div @click="uploadImage"
                         class="tw-w-full tw-text-white tw-transition tw-duration-300 tw-whitespace-nowrap tw-cursor-pointer tw-flex tw-flex-col tw-items-center hover:tw-bg-opacity-50 tw-justify-center tw-absolute tw-t-0 tw-l-0 tw-bg-black tw-bg-opacity-30 tw-w-full tw-h-full">
                        <span><img class="tw-w-6 tw-h-6 tw-self-center tw-ml-1 tw-mr-2.5"
                                   src="https://static.xxxxxx.com/97c76493ffafdf5d9ca927abe1beb5f67124ff828ea004b5fb51b0eb1dfcd388"
                                   alt=""></span>
                        <span class="tw-mt-1">上传图片</span>
                    </div>
                    <div style="display: none;">
                        <uni-file-picker ref="imageUploader" :sourceType="['album']"
                                         @select="chooseImage" :del-icon="false"
                                         file-mediatype="image" limit="1" :disable-preview="true">
                        </uni-file-picker>
                    </div>
                </div>
                <div
                    class="tw-cursor-pointer tw-transition tw-duration-300 hover:tw-border-white tw-border-solid tw-border-2 tw-border-transparent tw-h-40 tw-bg-white tw-bg-opacity-10 tw-rounded-xl"
                    @click="selectBackgroundImage(item)" v-for="item of backgroundImages"
                    :key="item"
                    :style="getBackgroundImageStyle(item, false)">
                </div>
            </div>
        </div>
        <div v-if="isBackgroundMode('color')"
             class="tw-mt-3 tw-bg-white tw-bg-opacity-5 tw-rounded-xl tw-px-3 tw-py-3">
            <div class="tw-text-white tw-text-opacity-70">选择颜色背景</div>
            <div class="tw-mt-3 tw-grid tw-grid-cols-7 tw-gap-1">
                <div
                    class="tw-w-8 tw-h-8 tw-cursor-pointer tw-transition tw-duration-300 hover:tw-border-white tw-border-solid tw-border-2 tw-border-transparent tw-flex tw-items-center tw-justify-center tw-bg-white tw-bg-opacity-5 tw-rounded-full tw-mb-2">
                    <v-icon class="tw-mt-1.5" size="1.8rem" icon="mdi-format-color-fill"></v-icon>
                </div>
                <div
                    class="tw-cursor-pointer tw-transition tw-duration-300 hover:tw-border-white tw-border-solid tw-border-2 tw-border-transparent tw-w-8 tw-h-8 tw-rounded-full tw-mb-2"
                    @click="selectBackgroundColor(item)" v-for="item of backgroundColors"
                    :key="item"
                    :style="getBackgroundColorStyle(item)">
                </div>
            </div>
        </div>
        <div v-if="isBackgroundMode('video')"
             class="tw-mt-3 tw-bg-white tw-bg-opacity-5 tw-rounded-xl tw-px-3 tw-py-3">
            <div class="tw-text-white tw-text-opacity-70">选择视频背景</div>
            <div class="tw-mt-2 tw-grid tw-grid-cols-3 tw-gap-1">
                <div @click="uploadVideo"
                     class="tw-relative tw-cursor-pointer tw-transition tw-duration-300 hover:tw-border-amber-200 tw-border-solid tw-border-2 tw-border-transparent tw-h-40 tw-rounded-xl tw-overflow-hidden">
                    <div
                        class="tw-absolute tw-t-0 tw-l-0 tw-bg-white tw-bg-opacity-20 tw-w-full tw-h-full">
                        <video class="tw-w-full tw-h-full" :src="getBackgroundVideo()"
                               v-if="getBackgroundVideo()" muted
                               :controls="false" :vslide-gesture-in-fullscreen="false"
                               :enable-progress-gesture="false"
                               :show-play-btn="false" :show-center-play-btn="false"
                               :show-fullscreen-btn="false" :loop="true"
                               :autoplay="true" object-fit="cover"></video>
                    </div>
                    <div
                        class="tw-transition tw-duration-300 tw-cursor-pointer tw-flex tw-flex-col tw-items-center hover:tw-bg-opacity-25 hover:tw-bg-amber-800 tw-justify-center tw-absolute tw-t-0 tw-l-0 tw-bg-black hover:tw-text-amber-300 tw-bg-opacity-30 tw-w-full tw-h-full tw-text-amber-200">
                        <span><img class="tw-w-6 tw-h-6 tw-self-center tw-ml-1 tw-mr-2.5"
                                   src="https://static.xxxxxx.com/230b7256c3c6dc36ef09be6b216ef52e240b78bc2372f710f1bf512e1b2fdbf5"
                                   alt=""></span>
                        <span class="tw-mt-1">上传视频</span>
                    </div>
                    <div style="display: none;">
                        <uni-file-picker ref="videoUploader" :sourceType="['album']"
                                         @select="chooseVideo" :del-icon="false"
                                         file-mediatype="video" limit="1" :disable-preview="true">
                        </uni-file-picker>
                    </div>
                </div>
                <div
                    class="tw-cursor-pointer tw-transition tw-duration-300 hover:tw-border-amber-200 tw-border-solid tw-border-2 tw-border-transparent tw-h-40 tw-bg-white tw-bg-opacity-10 tw-rounded-xl"
                    @click="selectBackgroundVideo(item.video, item.poster)"
                    v-for="item of backgroundVideos" :key="item"
                    :style="getBackgroundVideoStyle(item.poster, false)">
                </div>
            </div>
        </div>
        <LoginModal ref="LoginModal"></LoginModal>
    </div>
</template>
<script>
import {apiService} from "@/library/apis";
import {
    useStorage
} from '@/store/storage'
import LoginModal from '@/app/mobile/loginModal.vue'
import {PROFILE_CONSTS} from '@/library/consts';

export default {
    props: {
        profile: {}
    },
    components: {
        LoginModal
    },
    data() {
        return {
            backgroundMode: 'image',
            backgroundImages: [
                'https://static.xxxxxx.com/b65406bac2a3ebb7228111b6933f0ad85af0d28008601f6553350a2c890c4d46',
                'https://static.xxxxxx.com/36cbf951c96f1fc9bb32b61819f0e63236de676035bb5e9d95b3576328f99899',
                'https://static.xxxxxx.com/f77a67d61f953743dce2be48d684e1a8ae56dbf16c52f1c203bed23a401152b8',
                'https://static.xxxxxx.com/e01ffcfbcdcb42fa3593339511baf13f5dd138a4366b22237a23dee298f41ee4',
                'https://static.xxxxxx.com/b92f3b021f6e0cdda604cf3ca109aea30d75767d8e06833882acbeac7a814fe1',
                'https://static.xxxxxx.com/1d83024625bf12fa6a0b53926e71c00332abd129dbff20b095b584f0d3210bd9',
                'https://static.xxxxxx.com/52f64a740a1a8671ed5247e830845a9348de171bf584956392be5016d320bfa5',
                'https://static.xxxxxx.com/d1282ca637eeb86e0bff93d6add7640e46b42efb817afc9efd60440f311300c5',
            ],
            backgroundColors: [
                "rgb(0,0,0)",
                "rgb(28,152,141)",
                "rgb(29,52,96)",
                "rgb(48,58,47)",
                "rgb(47,48,69)",
                "rgb(53,74,95)",
                "rgb(67,66,136)",
                "rgb(89,102,119)",
                "rgb(95,181,156)",
                "rgb(110,68,88)",
                "rgb(113,221,247)",
                "rgb(121,89,100)",
                "rgb(128,147,241)",
                "rgb(145,184,191)",
                "rgb(151,223,177)",
                "rgb(176,237,232)",
                "rgb(177,135,233)",
                "rgb(214,200,189)",
                "rgb(222,239,184)",
                "rgb(240,255,250)",
                "rgb(245,175,248)",
                "rgb(254,157,114)",
                "rgb(254,198,247)",
                "rgb(255,104,119)",
                "rgb(255,215,215)",
                "rgb(255,253,132)",
                "rgb(255,255,255)",
            ],
            backgroundVideos: [
                {
                    poster: 'https://static.xxxxxx.com/bdde105734f74ac03b9450e82dfd7560fc989efcf80fbcd90e9284b36dcb200d',
                    video: 'https://static.xxxxxx.com/2eeb89af088b0d0cb51f8cc3999fd61305f574e8628125b92a1f6f87fb2a38e5',
                },
                {
                    poster: 'https://static.xxxxxx.com/c86a7ade03a0e10d10f72e3b85295170978364ae716e2a8680aae3accbadce6d',
                    video: 'https://static.xxxxxx.com/7c523b19916702fb37738261c8a172ebe32153acace7d863269344a0a88ddb14',
                },
                {
                    poster: 'https://static.xxxxxx.com/c52e426fdaca8d978edaaa1ad94faef5441abb153db63e8d0056fa087679b5b3',
                    video: 'https://static.xxxxxx.com/5b4881c29fd290e94fe1d35a03c46774fabb7c3736e081c174514875734496eb',
                },
                {
                    poster: 'https://static.xxxxxx.com/37fb507887b006f321aeb42a22b7ad629f1ce4d6db76cce8cd6f12d35b74a1e5',
                    video: 'https://static.xxxxxx.com/1e2f8295758a50131d35bbd42cc3dd064444bd48811219249fb58c2752a8cb19',
                },
                {
                    poster: 'https://static.xxxxxx.com/69eeb0e2cadf9fb7d390ddf82a447c9026473551e69d44de68a140dabe7cb7b7',
                    video: 'https://static.xxxxxx.com/d489c496af8ce2c2d794e14a52a2bcf840bd20fde254723f0230f4f93cadb998',
                },
                {
                    poster: 'https://static.xxxxxx.com/adb0b5b3cd63c0d0b4f03a620a49e877e11d076df493636fa9402b27237930c3',
                    video: 'https://static.xxxxxx.com/16d1789c8f9ab209074006ab6ec74f0ae9591de348837708bb0341e9e086af76',
                },
                {
                    poster: 'https://static.xxxxxx.com/d507b191ef6c8ef043c7a6f9d9934e0a18433f689063a59ebe570d3cc5bd454b',
                    video: 'https://static.xxxxxx.com/dd2f32a25ac7d007ad0fdd9531aeb03024ce1b5f762886223b1b489670355a8f',
                },
                {
                    poster: 'https://static.xxxxxx.com/2adccf3998ff044a18aecf6e595b7657552b75fc2335dd0683dec8e82eab70af',
                    video: 'https://static.xxxxxx.com/7ffae414ef69a76c91c399017621dc2e9093ad0f79348c82f59e78124a7f3ea9',
                },
                {
                    poster: 'https://static.xxxxxx.com/53b0aadc6b889c2103d250c8bea76c6a91b23117e88f98e58ad482c6fef85a75',
                    video: 'https://static.xxxxxx.com/2327c75b93058efa9832cd185c06923d49116b9abadfe36f2811d94f8776ba52',
                },
            ],
        }
    },
    created() {
        this.backgroundMode = this.getBackgroundMode();
    },
    computed: {
        accountId() {
            const {accountId} = useStorage();
            return accountId;
        },
        premiumActivated() {
            const storage = useStorage();
            return storage.$state?.account?.is_premium_activated;
        },
        style: {
            get() {
                return this?.profile?.spec?.style || {};
            },
            set(value) {
                this.profile.spec.style = value;
            },
        }
    },
    methods: {
        showLoginModal() {
            this.$refs.LoginModal.show()
        },
        uploadImage() {
            if (!this.accountId) {
                this.showLoginModal();
                return
            }
            this.$refs.imageUploader.choose();
        },
        uploadVideo() {
            if (!this.accountId) {
                this.showLoginModal();
                return
            }
            if (!this.premiumActivated) {
                this.$emit('showPremium')
                return
            }
            this.$refs.videoUploader.choose();
        },
        async chooseImage(data) {
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
                    this.selectBackgroundImage(imageUri);
                }
            } finally {
                uni.hideLoading()
            }
        },
        async chooseVideo(data) {
            const tempFilePaths = data?.tempFilePaths;
            if (!tempFilePaths || !tempFilePaths.length) return;
            uni.showLoading({
                title: '上传中'
            });
            try {
                const filepath = tempFilePaths[0];
                const res = await apiService.UploadVideo(filepath);
                const videoUri = res?.video_uri || "";
                if (videoUri) {
                    this.selectBackgroundVideo(videoUri, '');
                }
            } finally {
                uni.hideLoading()
            }
        },

        // background
        switchBackgroundMode(value) {
            if (this.backgroundMode === value) return;
            this.backgroundMode = value;
            this.setBackgroundMode(value);
        },
        isBackgroundMode(value) {
            return this.backgroundMode === value;
        },
        getBackgroundActiveClass(value) {
            if (this.isBackgroundMode(value)) {
                if (value === 'video') {
                    return {
                        'tw-border-amber-200': true,
                    }
                }
                return {
                    'tw-border-white': true
                }
            }
            return {
                'tw-border-transparent': true
            }
        },
        getBackgroundImageStyle(image, upload) {
            if (!image) return {};
            let style = {
                'background': `url(${image}) no-repeat center center`,
                'background-size': 'cover'
            }
            if (!upload && this.getBackgroundImage() === image) {
                style['border'] = '2px solid #fff'
            }
            return style;
        },
        getBackgroundVideoStyle(poster) {
            if (!poster) return {};
            let style = {
                'background': `url(${poster}) no-repeat center center`,
                'background-size': 'cover'
            }
            if (this.getBackgroundVideoPoster() === poster) {
                style['border'] = '2px solid #FFD37D'
            }
            return style;
        },
        getBackgroundColorStyle(color) {
            if (!color) return {};
            let style = {
                'background': color
            }
            if (this.getBackgroundColor() === color) {
                style['border'] = '2px solid #fff'
            }
            return style;
        },
        getBackgroundMode() {
            return this.style[PROFILE_CONSTS.KEY_PROFILE_BACKGROUND_MODE] || "image";
        },
        setBackgroundMode(mode) {
            this.style[PROFILE_CONSTS.KEY_PROFILE_BACKGROUND_MODE] = mode;
        },
        getBackgroundImage() {
            return this.getSafeNetworkResource(this.style[PROFILE_CONSTS.KEY_PROFILE_BACKGROUND_IMAGE]);
        },
        getSafeNetworkResource(value) {
            if (typeof (value) == 'string' && value.indexOf('http') === 0) {
                return value
            }
            return '';
        },
        selectBackgroundImage(image) {
            this.setBackgroundMode('image')
            this.style[PROFILE_CONSTS.KEY_PROFILE_BACKGROUND_IMAGE] = image;
        },
        getBackgroundColor() {
            return this.style[PROFILE_CONSTS.KEY_PROFILE_BACKGROUND_COLOR];
        },
        selectBackgroundColor(color) {
            this.setBackgroundMode('color')
            this.style[PROFILE_CONSTS.KEY_PROFILE_BACKGROUND_COLOR] = color;
        },
        getBackgroundVideo() {
            return this.getSafeNetworkResource(this.style[PROFILE_CONSTS.KEY_PROFILE_BACKGROUND_VIDEO]);
        },
        getBackgroundVideoPoster() {
            return this.getSafeNetworkResource(this.style[PROFILE_CONSTS.KEY_PROFILE_BACKGROUND_VIDEO_POSTER]);
        },
        selectBackgroundVideo(video, poster) {
            this.setBackgroundMode('video')
            this.style[PROFILE_CONSTS.KEY_PROFILE_BACKGROUND_VIDEO] = video;
            this.style[PROFILE_CONSTS.KEY_PROFILE_BACKGROUND_VIDEO_POSTER] = poster;
        }
    }
}
</script>
<style></style>