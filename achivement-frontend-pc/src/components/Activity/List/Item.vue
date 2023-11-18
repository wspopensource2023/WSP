<script lang="ts" setup>
import { ref, toRefs } from 'vue';

const props = defineProps<{
    activity: any,
}>()

let { activity } = toRefs(props);

</script>
<template>
    <div class="tw-rounded-md bg-lighten2 tw-h-full tw-w-full ">
        <div class="tw-border-solid tw-border tw-rounded-2xl tw-text-xs tw-py-2 tw-bg-white">
            灵魂绑定代币
        </div>
        <div class="tw-w-full tw-mt-6 tw-px-6">
            <div class="tw-text-xl tw-font-semibold ">
                {{ activity.badge_name }}
            </div>
            <div class=" info-lighten1">
                <img :src="activity.badge3ds" class="tw-rounded-full tw-w-6 tw-h-6 tw-shadow tw-align-middle">
                {{ activity.issuer }}
            </div>
        </div>
    </div>
</template>