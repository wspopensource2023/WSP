<template>
    <div style="background: linear-gradient(180deg, #252525 0%, #181818 100%); "
        class="tw-rounded-t-xl tw-text-white tw-px-3 tw-overflow-hidden">
        <div class="tw-relative tw-flex tw-flex-row tw-items-center tw-justify-center tw-py-3 tw-text-sm">
            <div>风格设计</div>
            <div class="tw-absolute tw-top-0 tw-right-0">
                <div class="tw-relative tw-flex tw-flex-row tw-items-center tw-py-3 tw-opacity-60">
                    <div @click="editing({})"
                        class="tw-flex tw-items-center tw-justify-center tw-w-4 tw-h-4 tw-bg-white tw-bg-opacity-10 tw-rounded-full tw-p-0.5">
                        <img class="tw-w-3 tw-h-3"
                            src="https://static.xxxxxx.com/63d2ad6ca4076d87299a85e2373bb5ad53a73ab1857c51c33930790f5cb3090e" />
                    </div>
                </div>
            </div>
        </div>
        <div style="height: 28rem" class="tw-overflow-y-auto tw-pb-3">
            <ThemeBackground @showPremium="showPremium" :profile="profile" v-if="isTab('background')"></ThemeBackground>
            <ThemeText :profile="profile" v-if="isTab('text')"></ThemeText>
        </div>
        <div style="border-top: 1px solid rgba(255, 255, 255, 0.05)"
            class="tw-fixed tw-bottom-0 tw-left-0 tw-grid tw-grid-cols-2 bg-panel tw-px-5 tw-py-3 tw-w-full tw-text-center">
            <div :style="getTabStyle('background')" @click="switchTab('background')"
                class="tw-mr-5 tw-flex tw-flex-row tw-justify-center tw-items-center tw-opacity-30 hover:tw-opacity-100">
                <img class="tw-w-5 tw-h-5 tw-self-center tw-ml-1 tw-mr-2.5"
                    src="https://static.xxxxxx.com/27206ad18e014688b49a685e64fcd44dc6c8eabfaf51f333ba8d5fa57e9983b4"
                    alt="">
                <div class="tw-mb-0.5">背景</div>
            </div>
            <div :style="getTabStyle('text')" @click="switchTab('text')"
                class="tw-mr-5 tw-flex tw-flex-row tw-justify-center tw-items-center tw-opacity-30 hover:tw-opacity-100">
                <img class="tw-w-5 tw-h-5 tw-self-center tw-ml-1 tw-mr-2.5"
                    src="https://static.xxxxxx.com/81eb21b90f075d151234e650775b97781cbae9be1d69ed02c80fe0ca75e15081"
                    alt="">
                <div class="tw-mb-0.5">文本</div>
            </div>
        </div>
    </div>
</template>
<script>
import { apiService } from "@/library/apis";
import {
    useStorage
} from '@/store/storage'
import { PROFILE_CONSTS } from '@/library/consts';
import ThemeText from "./ThemeText.vue";
import ThemeBackground from "./ThemeBackground.vue";
export default {
    props: {
        profile: {}
    },
    components: {
        ThemeText,
        ThemeBackground
    },
    data() {
        return {
            tab: 'background'
        }
    },
    created() {
    },
    computed: {
        accountId() {
            const { state } = useStorage();
            return state.accountId;
        },

    },
    methods: {
        showPremium() {
            this.$emit('showPremium')
        },
        editing(info) {
            this.$emit('editing', info)
        },
        isTab(tab) {
            return (this.tab === tab)
        },
        getTabStyle(tab) {
            if (this.isTab(tab)) {
                return {
                    'opacity': 1
                }
            }
            return {}
        },
        switchTab(tab) {
            this.tab = tab;
        }
    }
}
</script>
<style></style>