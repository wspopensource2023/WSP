<template>
    <div
        class="tw-mt-3 tw-bg-white tw-bg-opacity-[0.02] tw-rounded-lg tw-h-12 tw-items-center tw-flex tw-justify-between tw-transition tw-duration-300 hover:tw-border-white tw-border-transparent tw-border-solid tw-border tw-pr-2.5 input-box">
        <div class="tw-ml-5 tw-text-white tw-text-opacity-50 tw-whitespace-nowrap">{{ label }}</div>
        <view>
            <uni-easyinput style="text-align: right;" :clearable="true" type="text" @input="input" :value="modelValue"
                :placeholder="placeholder" />
        </view>
    </div>
</template>
<script>
export default {
    props: {
        label: '',
        modelValue: '',
        placeholder: ''
    },
    computed: {},
    methods: {
        input(value) {
            this.$emit('update:modelValue', value)
        },
    }
}
</script>
<style lang="less">
/deep/ .uni-easyinput__content {
    height: 100%;
    border-color: transparent !important;
    background-color: transparent !important;
}
</style>