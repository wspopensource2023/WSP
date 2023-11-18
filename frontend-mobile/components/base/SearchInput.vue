<template>
    <div>
        <div
            class="tw-bg-white tw-bg-opacity-[0.02] tw-rounded-lg tw-h-12 tw-items-center tw-flex tw-justify-between tw-transition tw-duration-300 hover:tw-border-white tw-border-transparent tw-border-solid tw-border tw-pr-2.5">
            <div class="tw-flex tw-items-center tw-flex-row tw-w-full">
                <div class="tw-flex tw-items-center tw-justify-center tw-w-5 tw-h-5 tw-ml-3">
                    <img class="tw-w-4 tw-h-4"
                        src="https://static.xxxxxx.com/6836d15dccb8095efee8f68b1f605f8163b37236d33cdc699ae9738137f7f7bd"
                        alt="">
                </div>
                <uni-easyinput confirmType="search" @confirm="search" focus @enter="search" @input="input" :clearable="true"
                    type="text" :value="modelValue" :placeholder="placeholder" />
            </div>
            <div @click="search" :class="searchBtnClass()">搜索</div>
        </div>
    </div>
</template> 
<script>
export default {
    props: {
        label: '',
        modelValue: '',
        placeholder: ''
    },
    data() {
        return {}
    },
    computed: {},
    methods: {
        input(value) {
            this.$emit('update:modelValue', value)
            this.$emit('input', value)
        },
        search() {
            if (this.modelValue) {
                this.$emit('search', this.modelValue)
            }
        },
        searchBtnClass() {
            let classname = 'tw-ml-5 tw-text-white tw-whitespace-nowrap';
            if (!this.modelValue || !this.modelValue.length) {
                return classname + ' tw-text-opacity-50 1111'
            }
            return classname
        }
    }
}
</script> 
