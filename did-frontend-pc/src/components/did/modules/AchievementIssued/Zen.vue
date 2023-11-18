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
            return "achievement-issued";
        },
        getTitle() {
            return '发行成就';
        },
        getSubtitle() {
            return 'Achievements Issued';
        },
    },
};
</script>
