<template>
    <ModuleZenItem :icon="getIcon()" :title="getTitle()" :subtitle="getSubtitle()"></ModuleZenItem>
</template>

<script>
import ModuleZenItem from "../ModuleZenItem.vue";

export default {
    props: {
        config: {},
        profile: {},
    },
    components: {
        ModuleZenItem,
    },
    data() {
        return {};
    },
    methods: {
        getIcon() {
            return "title";
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
