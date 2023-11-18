<template>
    <div class="tw-p-2 tw-rounded-lg tw-bg-white/[0.12] tw-border tw-border-solid tw-border-white/5">
        <div class="tw-w-32 tw-h-32 tw-p-0.5">
            <img class="tw-w-full tw-h-full tw-rounded-lg" :src="image" :alt="name" />
        </div>
        <div class="tw-mt-1.5 tw-flex tw-flex-col tw-pl-1">
            <div class="tw-flex tw-flex-row tw-mb-1 tw-items-center">
                <div style="max-width: 7rem" class="tw-truncate tw-text-base">
                    {{ name || "未命名成就" }}
                </div>
                <div v-if="verified" style="margin-top: 0.25rem; margin-left: 0.3rem">
                    <SPIcon size="1rem" config="verified"></SPIcon>
                </div>
            </div>
            <div class="tw-flex tw-flex-row tw-items-center" style="margin-top: -0.2rem">
                <img class="tw-w-4 tw-h-4 tw-rounded-full tw-mr-1" :src="issuer.avatar" alt="">
                <div class="tw-text-white/50 tw-text-sm">{{ issuer.name || "未知发行方" }}</div>
            </div>
        </div>
    </div>
</template>
<script>
import SPIcon from "@/components/base/SPIcon.vue";

export default {
    props: {
        name: "",
        image: "",
        issuer: {},
        verified: false,
    },
    components: {
        SPIcon,
    },
    data() {
        return {};
    },
    mounted() { },
    methods: {},
};
</script>