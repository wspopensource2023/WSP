<template>
    <div
        class="tw-bg-white tw-bg-opacity-[0.02] tw-rounded-lg tw-h-12 tw-items-center tw-flex tw-justify-between tw-transition tw-duration-300 hover:tw-border-white tw-border-transparent tw-border-solid tw-border tw-pr-2.5">
        <div class="tw-ml-5 tw-text-white tw-text-opacity-50 tw-whitespace-nowrap">{{ label }}</div>
        <slot></slot>
    </div>
</template>
<script>
export default {
    props: {
        label: '',
        value: '',
    },
}
</script>
