<template>
    <div ref="document" class="tw-relative tw-text-white" :style="getDocumentStyle()">
        <div class="tw-absolute tw-t-0 tw-l-0 tw-w-full tw-h-full">
            <div class="tw-absolute tw-t-0 tw-l-0 tw-w-full tw-h-full" :style="getBackgroundStyle()">
                <img class="tw-w-full" v-if="getBackgroundMode() === 'image'" :src="getBackgroundImage()" alt="">
            </div>
            <div v-if="isBackgroundMode('video')" class="tw-absolute tw-t-0 tw-l-0 tw-w-full tw-h-full">
                <video class="tw-w-full tw-h-full tw-object-contain tw-object-top" muted :controls="false" :loop="true"
                    :autoplay="true" :src="getBackgroundVideo()"></video>
            </div>
        </div>
        <div class="tw-absolute tw-t-0 tw-l-0 tw-w-full tw-flex tw-flex-col tw-overflow-y-auto tw-h-full">
            <div style="width: 100%;
                height: 0;
                padding: 0;
                padding-bottom: 75%;">
            </div>
            <div style="
                background: linear-gradient(
                        180deg,
                        rgba(12, 12, 12, 0) 0%,
                        rgba(12, 12, 12, 0.45) 35%,
                        rgba(12, 12, 12, 0.80) 60%,
                        rgba(12, 12, 12, 1) 100%
                    );
            ">
                <div class="tw-block tw-w-28 tw-h-28 tw-rounded-full tw-mx-auto tw-overflow-hidden">
                    <img class="tw-w-full tw-h-full" :src="config?.spec?.avatar" alt="">
                </div>
                <div class="tw-mt-3 tw-text-center tw-text-2xl">
                    {{ config?.spec?.title }}
                </div>
                <div class="tw-flex tw-flex-row tw-items-center tw-justify-center">
                    <div id="description" class="tw-mt-3 tw-text-center tw-opacity-80 tw-text-sm tw-px-6 tw-text-justify">
                        {{ config?.spec?.description }}
                    </div>
                </div>
            </div>
            <div class="tw-pt-3 tw-pb-6 tw-px-4" style="background-color: rgb(12, 12, 12); flex: 1">
                <div :style="getModulesStyle()">
                    <GruopView v-for="(groupItem, index) in getGroups()" :readonly="true" :profile="config" :index="index"
                        :config="groupItem" :key="groupItem">
                        <template #item="item">
                            <ModuleView :profile="config" :config="item.item"></ModuleView>
                        </template>
                    </GruopView>
                </div>
                <div class="tw-flex tw-flex-col tw-text-center tw-text-opacity-30 tw-text-white tw-pt-10">
                    <div class="tw-font-bold">POWERED BY</div>
                    <div class="tw-text-sm">xxxxxx.com</div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import GruopView from '@/components/did/modules/Group/View.vue';
import ModuleView from '@/components/did/modules/ModuleView.vue';
import { PROFILE_CONSTS } from "@/library/consts";
export default {
    components: {
        GruopView,
        ModuleView
    },
    props: {
        width: String,
        height: String,
        config: {}
    },
    methods: {
        getGroups() {
            return this.config?.spec?.children;
        },
        getDocumentSize() {
            const dom = this.$refs.document;
            window.getComputedStyle(dom).width;
            window.getComputedStyle(dom).height;
        },
        getDocumentStyle() {
            return {
                'width': this.width || '100%',
                'height': this.height || '100%'
            }
        },
        getBackgroundMode() {
            return this.config?.spec?.style[PROFILE_CONSTS.KEY_PROFILE_BACKGROUND_MODE];
        },
        isBackgroundMode(mode) {
            return this.getBackgroundMode() === mode;
        },
        getModulesStyle() {
            const align = (this.config?.spec?.style[PROFILE_CONSTS.KEY_PROFILE_TEXT_ALIGN] || PROFILE_CONSTS.DEFAULT_PROFILE_TEXT_ALIGN);
            return {
                'text-align': align
            }
        },
        getBackgroundImage() {
            return this.config?.spec?.style[PROFILE_CONSTS.KEY_PROFILE_BACKGROUND_IMAGE];
        },
        getBackgroundColor() {
            return this.config?.spec?.style[PROFILE_CONSTS.KEY_PROFILE_BACKGROUND_COLOR];
        },
        getBackgroundVideo() {
            return this.config?.spec?.style[PROFILE_CONSTS.KEY_PROFILE_BACKGROUND_VIDEO];
        },
        getBackgroundStyle() {
            const style = {}
            const mode = this.getBackgroundMode();
            if (mode === "color") {
                style['background-color'] = this.getBackgroundColor();
            }
            return style;
        },
    }
} 
</script>