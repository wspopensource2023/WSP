<template>
    <div class="tw-px-1">
        <div class="tw-text-xl tw-text-center">
            {{ config.spec.title || "暂无标题" }}
        </div>
        <div class="tw-mb-2 tw-text-center tw-opacity-60">
            {{ config.spec.subtitle }}
        </div>
        <div class="tw-mb-1 tw-whitespace-pre-line tw-text-left">
            {{ config.spec.content || "暂无内容" }}
        </div>
    </div>
</template>

<script>
import SPIcon from "@/components/base/SPIcon.vue";

export default {
    props: {
        config: {},
    },
    components: {
        SPIcon,
    },
    data() {
        return {};
    },
    methods: {
        create() { },
    },
};
</script>

<style></style>
