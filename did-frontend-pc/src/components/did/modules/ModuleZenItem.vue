<template>
    <div
        class="tw-bg-white tw-transition tw-duration-300 hover:tw-border-white tw-border-transparent tw-border-solid tw-border-2 tw-bg-opacity-5 tw-px-4 tw-py-1.5 tw-rounded-xl">
        <div class="tw-flex tw-items-center tw-flex-shrink-0">
            <div class="module-content-left tw-ml-1 tw-mr-3 tw-h-full">
                <div edit-callable class="tw-w-14 tw-h-14 tw-flex tw-items-center tw-justify-center">
                    <SPIcon class="tw-w-10 tw-h-10" :config="getIcon()"></SPIcon>
                </div>
            </div>
            <div class="tw-w-full tw-mr-5 tw-h-10 tw-flex tw-justify-center tw-flex-col">
                <div class="module-title tw-break-all tw-text-base tw-mb-0.5">
                    {{ getTitle() }}
                </div>
                <div class="module-subtitle tw-break-all tw-text-sm tw-opacity-60">
                    {{ getSubtitle() }}
                </div>
            </div>
            <div class="tw-h-full">
                <div
                    class="draggable-module-item-handler tw-flex tw-items-center tw-justify-center tw-text-opacity-30 tw-cursor-pointer">
                    <v-icon size="1.5rem" icon="mdi-drag"></v-icon>
                </div>
            </div>
        </div>
        <div class="module-footer"></div>
    </div>
</template>

<script>
import SPIcon from "@/components/base/SPIcon.vue";
import IconFont from "@/components/base/IconFont.vue";
import { apiService } from "@/apis/apis";
import { merge } from "lodash";
import { openLink } from "@/library/util";

export default {
    props: {
        title: "",
        subtitle: "",
        icon: "",
    },
    components: {
        SPIcon,
        IconFont,
    },
    data() {
        return {};
    },
    computed: {},
    methods: {
        getTitle() {
            return this.title;
        },
        getSubtitle() {
            return this.subtitle;
        },
        getIcon() {
            return this.icon;
        },
    },
};
</script>
