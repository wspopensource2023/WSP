<template>
    <div class="module tw-py-3">
        <div class="module-header"></div>
        <div class="module-content tw-relative">
            <div class="module-content-left tw-absolute tw-left-0 tw-w-10 tw-flex tw-h-full tw-items-center">
                <SPIcon class="tw-w-10 tw-h-10" :config="getIcon()"></SPIcon>
            </div>
            <div :style="getFixedStyle()"
                class="module-content-right tw-pl-14 tw-pr-14 tw-flex tw-justify-center tw-flex-col">
                <div class="module-title tw-text-base tw-break-all tw-mb-0.5 tw-truncate">
                    {{ getTitle() }}
                </div>
                <div class="module-subtitle tw-break-all tw-text-sm tw-opacity-60 tw-truncate">
                    {{ getSubtitle() }}
                </div>
            </div>
        </div>
        <div class="module-footer"></div>
    </div>
</template>

<script>
import SPIcon from "@/components/base/SPIcon.vue";
import { PROFILE_CONSTS } from "@/library/consts";

export default {
    props: {
        title: '',
        subtitle: '',
        icon: '',
        profile: {},
    },
    components: {
        SPIcon,
    },
    data() {
        return {};
    },
    methods: {
        getFixedStyle() {
            const align = (this.profile?.spec?.style[PROFILE_CONSTS.KEY_PROFILE_TEXT_ALIGN] || PROFILE_CONSTS.DEFAULT_PROFILE_TEXT_ALIGN);
            if (align == 'right') {
                return {
                    'margin-right': '-3.5rem'
                }
            }
            return {}
        },
        getIcon() {
            return this.icon;
        },
        getTitle() {
            return this.title || "暂无标题";
        },
        getSubtitle() {
            return this.subtitle;
        },
    },
};
</script>

<style></style>
