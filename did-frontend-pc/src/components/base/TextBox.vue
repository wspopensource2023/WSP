<template>
    <div
        class="tw-bg-white tw-bg-opacity-[0.02] tw-rounded-lg tw-h-12 tw-items-center tw-flex tw-justify-between tw-transition tw-duration-300 hover:tw-border-white tw-border-transparent tw-border-solid tw-border tw-pr-2.5">
        <div class="tw-ml-5 tw-text-white tw-text-opacity-50 tw-whitespace-nowrap">{{ label }}</div>
        <div @click="copy(value)" class="tw-text-right tw-flex tw-justify-center">
            <span>{{ value || placeholder }}</span>
            <span v-if="value" class="tw-flex tw-items-center tw-ml-2">
                <img class="tw-w-4 tw-h-4"
                    src="https://static.xxxxxx.com/6596fd440b55064e9b314a71b82d0966ad872c9354e7671477cbd691a829c47c"
                    :alt="value">
            </span>
        </div>
    </div>
</template>
<script>
import { openLink, copyClipboard } from "@/library/util";
export default {
    props: {
        label: '',
        value: '',
        placeholder: ''
    },
    methods: {
        copy(data) {
            copyClipboard(data)
        }
    }
}
</script>
