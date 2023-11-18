<template>
    <div class="module tw-py-3" :style="getModuleStyle()">
        <div class="module-header"></div>
        <div class="module-content tw-relative">
            <div class="module-content-left tw-absolute tw-left-0 tw-w-10 tw-flex tw-h-full tw-items-center">
                <SPIcon size="" class="tw-w-10 tw-h-10" :config="getIcon()"></SPIcon>
            </div>
            <div class="module-content-right tw-pl-14 tw-flex tw-justify-center tw-flex-col">
                <div class="module-title  tw-text-base tw-break-all tw-mb-0.5 tw-truncate">
                    {{ getTitle() || "暂无标题" }}
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
export default {
    props: {
        config: {},
        profile: {},
    },
    components: {
        SPIcon,
    },
    data() {
        return {};
    },
    methods: {
        getModuleStyle() {
            return this.profile.spec.style["module.css"] || {};
        },
        getIcon() {
            return this.config?.spec?.icon;
        },
        getTitle() {
            return this.config?.spec?.title;
        },
        getSubtitle() {
            return this.config?.spec?.subtitle;
        },
    },
};
</script>

<style></style>
