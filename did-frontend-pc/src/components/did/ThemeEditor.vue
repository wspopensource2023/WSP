<template>
    <div>
        <div>
            <div class="tw-text-lg tw-mt-5 tw-mb-5">
                <v-icon icon="mdi-image-filter-hdr-outline"></v-icon>
                <span class="tw-ml-2">背景</span>
            </div>
            <div>
                <div class="tw-grid tw-grid-cols-3 tw-gap-8">
                    <v-btn height="50" :flat="true" @click="switchBackgroundMode('image')"
                           :class="getBackgroundActiveClass('image')"
                           class="tw-transition tw-duration-300 hover:tw-border-white tw-border-solid tw-border tw-border-transparent tw-rounded-lg tw-text-base tw-border tw-bg-white tw-bg-opacity-5">
                        <div class="tw-flex tw-items-center">
                            <v-icon class="tw-mr-2.5 tw-inline-table" size="1.3rem" icon="mdi-image"></v-icon>
                            <span>图片</span>
                        </div>
                    </v-btn>
                    <v-btn height="50" :flat="true" @click="switchBackgroundMode('color')"
                           :class="getBackgroundActiveClass('color')"
                           class="tw-transition tw-duration-300 hover:tw-border-white tw-border-solid tw-border tw-border-transparent tw-rounded-lg tw-text-base tw-border tw-bg-white tw-bg-opacity-5">
                        <v-icon class="tw-mr-2.5 tw-inline-table" size="1.3rem" icon="mdi-invert-colors"></v-icon>
                        <span>颜色</span>
                    </v-btn>
                    <v-btn height="50" :flat="true" @click="switchBackgroundMode('video')"
                           :class="getBackgroundActiveClass('video')"
                           class="tw-transition tw-duration-300 hover:tw-border-amber-200 tw-border-solid tw-border tw-border-transparent tw-rounded-lg tw-text-base tw-border tw-bg-amber-200 tw-bg-opacity-5 tw-text-amber-200">
                        <v-icon class="tw-mr-2.5 tw-inline-table" size="1.3rem" icon="mdi-movie-open-play"></v-icon>
                        <span>视频</span>
                    </v-btn>
                </div>
                <div v-if="isBackgroundMode('image')"
                     class="tw-mt-6 tw-bg-white tw-bg-opacity-5 tw-rounded-2xl tw-px-6 tw-py-5">
                    <div class="tw-text-white tw-text-opacity-70">选择图片背景</div>
                    <div class="tw-mt-5 tw-grid tw-grid-cols-5 tw-gap-3">
                        <div
                            class="tw-relative tw-cursor-pointer tw-transition tw-duration-300 hover:tw-border-white tw-border-solid tw-border-2 tw-border-transparent tw-h-48 tw-rounded-xl tw-overflow-hidden">
                            <div
                                class="tw-absolute tw-t-0 tw-l-0 tw-bg-white tw-bg-opacity-20 tw-w-full tw-h-full"
                                :style="getBackgroundImageStyle(getBackgroundImage(), true)">
                            </div>
                            <div @click="uploadImage"
                                 class="tw-transition tw-duration-300 tw-cursor-pointer tw-flex tw-flex-col tw-items-center hover:tw-bg-opacity-50 tw-justify-center tw-absolute tw-t-0 tw-l-0 tw-bg-black tw-bg-opacity-30 tw-w-full tw-h-full">
                                <span><v-icon size="1.5rem" icon="mdi-cloud"></v-icon></span>
                                <span class="tw-mt-1">上传图片</span>
                            </div>
                        </div>
                        <div
                            class="tw-cursor-pointer tw-transition tw-duration-300 hover:tw-border-white tw-border-solid tw-border-2 tw-border-transparent tw-h-48 tw-bg-white tw-bg-opacity-10 tw-rounded-xl"
                            @click="selectBackgroundImage(item)" v-for="item of backgroundImages"
                            :key="item"
                            :style="getBackgroundImageStyle(item, false)">
                        </div>
                    </div>
                </div>
                <div v-if="isBackgroundMode('color')"
                     class="tw-mt-6 tw-bg-white tw-bg-opacity-5 tw-rounded-2xl tw-px-6 tw-py-5">
                    <div class="tw-text-white tw-text-opacity-70">选择颜色背景</div>
                    <div class="tw-mt-5 tw-grid tw-grid-cols-12 tw-gap-3">
                        <div
                            class="tw-w-12 tw-h-12 tw-cursor-pointer tw-transition tw-duration-300 hover:tw-border-white tw-border-solid tw-border-2 tw-border-transparent tw-flex tw-items-center tw-justify-center tw-bg-white tw-bg-opacity-5 tw-rounded-full">
                            <v-icon class="tw-mt-1.5" size="1.8rem"
                                    icon="mdi-format-color-fill"></v-icon>
                        </div>
                        <div
                            class="tw-cursor-pointer tw-transition tw-duration-300 hover:tw-border-white tw-border-solid tw-border-2 tw-border-transparent tw-w-12 tw-h-12 tw-rounded-full"
                            @click="selectBackgroundColor(item)" v-for="item of backgroundColors"
                            :key="item"
                            :style="getBackgroundColorStyle(item)">
                        </div>
                    </div>
                </div>
                <div v-if="isBackgroundMode('video')"
                     class="tw-mt-6 tw-bg-white tw-bg-opacity-5 tw-rounded-2xl tw-px-6 tw-py-5">
                    <div class="tw-text-white tw-text-opacity-70">选择视频背景</div>
                    <div class="tw-mt-5 tw-grid tw-grid-cols-5 tw-gap-3">
                        <div @click="uploadVideo"
                             class="tw-relative tw-cursor-pointer tw-transition tw-duration-300 hover:tw-border-amber-200 tw-border-solid tw-border-2 tw-border-transparent tw-h-48 tw-rounded-xl tw-overflow-hidden">
                            <div
                                class="tw-absolute tw-t-0 tw-l-0 tw-bg-white tw-bg-opacity-20 tw-w-full tw-h-full">
                                <video class="tw-w-full" :src="getBackgroundVideo()" muted autoplay
                                       loop></video>
                            </div>
                            <div
                                class="tw-transition tw-duration-300 tw-cursor-pointer tw-flex tw-flex-col tw-items-center hover:tw-bg-opacity-25 hover:tw-bg-amber-800 tw-justify-center tw-absolute tw-t-0 tw-l-0 tw-bg-black hover:tw-text-amber-300 tw-bg-opacity-30 tw-w-full tw-h-full tw-text-amber-200">
                                <span><v-icon size="1.5rem" icon="mdi-cloud"></v-icon></span>
                                <span class="tw-mt-1">上传视频</span>
                            </div>
                        </div>
                        <div
                            class="tw-cursor-pointer tw-transition tw-duration-300 hover:tw-border-amber-200 tw-border-solid tw-border-2 tw-border-transparent tw-h-48 tw-bg-white tw-bg-opacity-10 tw-rounded-xl"
                            @click="selectBackgroundVideo(item.video, item.poster)"
                            v-for="item of backgroundVideos"
                            :key="item" :style="getBackgroundVideoStyle(item.poster, false)">
                        </div>
                    </div>
                </div>
                <div>
                    <v-file-input class="tw-hidden" id="image-uploader"
                                  @update:modelValue="chooseImage" accept="image/*"
                                  prepend-icon="" variant="outlined"></v-file-input>
                    <v-file-input class="tw-hidden" id="video-uploader"
                                  @update:modelValue="chooseVideo" accept="video/*"
                                  prepend-icon="" variant="outlined"></v-file-input>
                </div>
            </div>
        </div>
        <div
            class="tw-mt-8 tw-mb-8 tw-border-white tw-border-opacity-5 tw-h-1 tw-border-solid tw-border-b"></div>

        <div>
            <div class="tw-text-lg tw-mt-5 tw-mb-5">
                <v-icon icon="mdi-text-shadow"></v-icon>
                <span class="tw-ml-2">文本对齐方式</span>
            </div>
            <div class="tw-grid tw-grid-cols-3 tw-gap-8">
                <v-btn height="50" :flat="true" @click="switchTextAlign('left')"
                       :class="getTextAlignActiveClass('left')"
                       class="tw-transition tw-duration-300 hover:tw-border-white tw-border-solid tw-border tw-border-transparent tw-rounded-lg tw-text-base tw-border tw-bg-white tw-bg-opacity-5">
                    <div class="tw-mr-2.5">
                        <v-icon size="1.4rem" icon="mdi-format-align-left"></v-icon>
                    </div>
                    <div>左对齐</div>
                </v-btn>
                <v-btn height="50" :flat="true" @click="switchTextAlign('center')"
                       :class="getTextAlignActiveClass('center')"
                       class="tw-transition tw-duration-300 hover:tw-border-white tw-border-solid tw-border tw-border-transparent tw-rounded-lg tw-text-base tw-border tw-bg-white tw-bg-opacity-5">
                    <div class="tw-mr-2.5">
                        <v-icon size="1.4rem" icon="mdi-format-align-center"></v-icon>
                    </div>
                    <div>居中</div>
                </v-btn>
                <v-btn height="50" :flat="true" @click="switchTextAlign('right')"
                       :class="getTextAlignActiveClass('right')"
                       class="tw-transition tw-duration-300 hover:tw-border-white tw-border-solid tw-border tw-border-transparent tw-rounded-lg tw-text-base tw-border tw-bg-white tw-bg-opacity-5">
                    <div class="tw-mr-2.5">
                        <v-icon size="1.4rem" icon="mdi-format-align-right"></v-icon>
                    </div>
                    <div>右对齐</div>
                </v-btn>
            </div>
        </div>
    </div>
</template>
<script>
import {apiService} from "@/apis/apis";
import {useStorage} from "@/stores/storage";
import {PROFILE_CONSTS} from '@/library/consts';
import {withLoading} from "@/library/util";

export default {
    props: {
        profile: {}
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
            const {state} = useStorage();
            return state.accountId;
        },
        style: {
            get() {
                return this?.profile?.spec?.style || {};
            },
            set(value) {
                this.profile.spec.style = value;
            },
        },
        isPremiumActivated() {
            const {state} = useStorage();
            return state?.account?.is_premium_activated;
        },
    },
    methods: {
        uploadImage() {
            if (!this.accountId) {
                showLoginModal();
                return
            }
            document.getElementById('image-uploader').click();
        },
        uploadVideo() {
            if (!this.accountId) {
                showLoginModal();
                return
            }
            if (!this.isPremiumActivated) {
                this.$emit('showPremium')
                return
            }
            document.getElementById('video-uploader').click();
        },
        async chooseImage(files) {
            if (!files) return;
            await withLoading(async () => {
                const res = await apiService.UploadImage(files[0]);
                const imageUri = res?.image_uri || "";
                if (imageUri) {
                    this.selectBackgroundImage(imageUri);
                }
            }, '上传中')
        },
        async chooseVideo(files) {
            if (!files) return;
            await withLoading(async () => {
                const res = await apiService.UploadVideo(files[0]);
                const videoUri = res?.video_uri || "";
                if (videoUri) {
                    this.selectBackgroundVideo(videoUri, '');
                }
            }, '上传中')
        },
        // text align
        isTextAlign(value) {
            return this.getTextAlign() === value;
        },
        switchTextAlign(align) {
            this.style[PROFILE_CONSTS.KEY_PROFILE_TEXT_ALIGN] = align;
        },
        getTextAlign() {
            return this.style[PROFILE_CONSTS.KEY_PROFILE_TEXT_ALIGN] || PROFILE_CONSTS.DEFAULT_PROFILE_TEXT_ALIGN;
        },
        getTextAlignActiveClass(value) {
            if (this.isTextAlign(value)) {
                return {
                    'tw-border-white': true
                }
            }
            return {}
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
                        'tw-border-amber-200': true
                    }
                }
                return {
                    'tw-border-white': true
                }
            }
            return {}
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
                style['border'] = '2px solid rgb(253,230,138)'
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
            return this.style[PROFILE_CONSTS.KEY_PROFILE_BACKGROUND_IMAGE];
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
            return this.style[PROFILE_CONSTS.KEY_PROFILE_BACKGROUND_VIDEO];
        },
        getBackgroundVideoPoster() {
            return this.style[PROFILE_CONSTS.KEY_PROFILE_BACKGROUND_VIDEO_POSTER];
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