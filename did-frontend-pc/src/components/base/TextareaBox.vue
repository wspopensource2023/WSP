<template>
    <div>
        <div
            class="tw-bg-white tw-bg-opacity-[0.02] tw-rounded-lg tw-p-3 tw-flex tw-justify-between tw-transition tw-duration-300 hover:tw-border-white tw-border-transparent tw-border-solid tw-border">
            <div class="tw-ml-2 tw-mr-3 tw-text-white tw-text-opacity-50 tw-whitespace-nowrap">{{ label }}</div>
            <div class="tw-w-4/5 tw-flex tw-flex-row tw-justify-end tw-items-center">
                <div @click="copy(value)" class="tw-pr-2 tw-flex tw-text-justify tw-break-all">
                    {{ value || placeholder }}
                </div>
                <div class="tw-flex tw-items-center" @click="copy(value)" v-if="value">
                    <img class="tw-mt-0.5 tw-w-4 tw-h-4"
                        src="https://static.xxxxxx.com/6596fd440b55064e9b314a71b82d0966ad872c9354e7671477cbd691a829c47c"
                        :alt="value">
                </div>
            </div>
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
