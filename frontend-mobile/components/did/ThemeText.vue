<template>
    <div>
        <div class="tw-text-lg tw-mt-3 tw-mb-3">
            <span>对齐方式</span>
        </div>
        <div class="tw-grid tw-grid-cols-3 tw-gap-1">
            <button @click="switchTextAlign('left')" :class="getTextAlignActiveClass('left')"
                class="tw-w-full tw-text-white tw-transition tw-duration-300 hover:tw-border-white tw-border-solid tw-border tw-border-transparent tw-rounded-lg tw-text-base tw-border tw-bg-white tw-bg-opacity-5 tw-flex tw-flex-row tw-items-center tw-justify-center tw-py-3">
                <img class="tw-w-4 tw-h-4 tw-self-center tw-ml-1 tw-mr-1"
                    src="https://static.xxxxxx.com/5e5f48a87b66b5350a0264e42e4e1784765a1cc0d3a3906e472bedf4ca729ace"
                    alt="">
                <div class="tw-text-sm">左对齐</div>
            </button>
            <button @click="switchTextAlign('center')" :class="getTextAlignActiveClass('center')"
                class="tw-w-full tw-text-white tw-transition tw-duration-300 hover:tw-border-white tw-border-solid tw-border tw-border-transparent tw-rounded-lg tw-text-base tw-border tw-bg-white tw-bg-opacity-5 tw-flex tw-flex-row tw-items-center tw-justify-center tw-py-3">
                <img class="tw-w-4 tw-h-4 tw-self-center tw-ml-1 tw-mr-1"
                    src="https://static.xxxxxx.com/a8078f72afccc466bfea99eea0768cf87cac65980e0cd4fb39c9af6f348526e3"
                    alt="">
                <div class="tw-text-sm">居中</div>
            </button>
            <button @click="switchTextAlign('right')" :class="getTextAlignActiveClass('right')"
                class="tw-w-full tw-text-white tw-transition tw-duration-300 hover:tw-border-white tw-border-solid tw-border tw-border-transparent tw-rounded-lg tw-text-base tw-border tw-bg-white tw-bg-opacity-5 tw-flex tw-flex-row tw-items-center tw-justify-center tw-py-3">
                <img class="tw-w-4 tw-h-4 tw-self-center tw-ml-1 tw-mr-1"
                    src="https://static.xxxxxx.com/8a5237e9c37ffdfe5da79e2081dda01bc39f532768eb9783db3f0db494bb3cc3"
                    alt="">
                <div class="tw-text-sm">右对齐</div>
            </button>
        </div>
    </div>
</template>
<script>
import { apiService } from "@/library/apis";
import {
    useStorage
} from '@/store/storage'
import { PROFILE_CONSTS } from '@/library/consts';
export default {
    props: {
        profile: {}
    },
    data() {
        return {}
    },
    created() { },
    computed: {
        accountId() {
            const { state } = useStorage();
            return state.accountId;
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
    }
}
</script>
<style></style>