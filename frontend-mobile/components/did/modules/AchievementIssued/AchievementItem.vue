<template>
    <div class="tw-p-2 tw-rounded-lg tw-bg-white/[0.02] tw-border tw-border-solid tw-border-white/5 tw-text-left">
        <div class="tw-w-40 tw-h-40 tw-p-0.5">
            <img class="tw-w-full tw-h-full tw-rounded-lg" :src="image" :alt="name" />
        </div>
        <div class="tw-mt-1.5 tw-px-1.5" style="width: 9.5rem">
            <div class="tw-flex tw-flex-row tw-mb-1 tw-items-center">
                <div style="max-width: 7rem" class="tw-truncate tw-text-base">
                    {{ name }}
                </div>
            </div>
            <div style="margin-top: -0.2rem;" class="tw-text-white/50 tw-text-xs tw-truncate">
                {{ description }}
            </div>
            <div class="tw-flex tw-justify-end tw-mt-1">
                <div class="tw-text-white/50 tw-text-sm tw-text-right tw-text-xs">
                    {{ getParticipants() }} 人已参与
                </div>
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
        description: "",
        participants: 0,
    },
    components: {
        SPIcon,
    },
    data() {
        return {};
    },
    mounted() { },
    methods: {
        getParticipants() {
            return this.participants || 0;
        },
    },
};
</script>