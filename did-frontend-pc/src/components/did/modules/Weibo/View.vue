<template>
    <ModuleViewItem :profile="profile" :title="getTitle()" :subtitle="getSubtitle()" :icon="getIcon()"></ModuleViewItem>
</template>

<script>
import SPIcon from "@/components/base/SPIcon.vue";
import ModuleViewItem from '@/components/did/modules/ModuleViewItem.vue';

export default {
    props: {
        config: {},
        profile: {},
    },
    components: {
        SPIcon,
        ModuleViewItem
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
