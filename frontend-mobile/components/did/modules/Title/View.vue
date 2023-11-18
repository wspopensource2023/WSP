<template>
    <div class="module tw-pt-5 tw-pb-1" :style="getModuleStyle()">
        <div class="module-header"></div>
        <div class="module-content tw-relative">
            <div class="module-title tw-text-base">
                <div v-if="getTitle()" class="tw-text-lg tw-truncate">
                    {{ getTitle() }}
                </div>
                <div v-if="getSubTitle()" class="tw-text-xs tw-opacity-60 tw-truncate">
                    {{ getSubTitle() }}
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
        getTitle() {
            return this.config?.spec?.title;
        },
        getSubTitle() {
            return this.config?.spec?.subtitle;
        },
    },
};
</script>

<style></style>
