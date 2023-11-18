<template>
    <div>
        <div
            class="tw-bg-white tw-bg-opacity-[0.02] tw-rounded-lg tw-h-12 tw-items-center tw-flex tw-justify-between tw-transition tw-duration-300 hover:tw-border-white tw-border-transparent tw-border-solid tw-border">
            <div class="tw-ml-5 tw-text-white tw-text-opacity-50 tw-whitespace-nowrap">{{ label }}</div>
            <div class="tw-w-3/5 tw-h-10 tw-justify-end tw-pr-3 tw-flex tw-items-center " @click="showEditor">
                <div class="tw-truncate">{{ modelValue }}</div>
            </div>
        </div>
        <uni-popup ref="editModal">
            <div style="background: linear-gradient(180deg, #252525 0%, #181818 100%); "
                class="tw-rounded-t-xl tw-text-white tw-px-5 tw-py-3 tw-overflow-hidden">
                <div class="tw-relative tw-flex tw-flex-row tw-items-center tw-justify-center tw-text-sm tw-mb-3"> 编辑{{
                    label
                }}</div>
                <uni-easyinput :clearable="true"
                    class="tw-mb-3 tw-h-52 tw-bg-white tw-bg-opacity-[0.02] tw-transition tw-duration-300 hover:tw-border-white tw-border-transparent tw-border-solid tw-border tw-rounded-lg tw-text-base"
                    type="textarea" v-model="tmp" :placeholder="placeholder" />
                <div class="tw-grid tw-grid-cols-2 tw-gap-3 tw-mt-3">
                    <button @click="back" hover-class="none"
                        class="tw-w-full tw-rounded-xl tw-bg-white tw-bg-opacity-5 hover:tw-bg-opacity-10 tw-transition">
                        <div class="tw-text-white tw-text-base tw-flex tw-items-center tw-justify-center tw-py-3.5">
                            <img class="tw-w-5 tw-h-5 tw-mr-2"
                                src="https://static.xxxxxx.com/mdi/af8ebf95055ff7a71f265a8bcaad2eec569d30d0eabe56239b03602f7da20e76" />
                            <span>返回</span>
                        </div>
                    </button>
                    <button @click="comfirm"
                        class="tw-w-full tw-text-white tw-transition tw-duration-300 hover:tw-border-white tw-border-solid tw-border tw-border-transparent tw-rounded-lg tw-text-base tw-border tw-bg-white tw-bg-opacity-5 tw-flex tw-flex-row tw-items-center tw-justify-center tw-py-3">
                        <div>确定</div>
                    </button>
                </div>
            </div>
        </uni-popup>
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
        return {
            tmp: ''
        }
    },
    methods: {
        back() {
            this.$refs.editModal.close();
        },
        showEditor() {
            this.tmp = this.modelValue
            this.$refs.editModal.open('bottom')
        },
        comfirm() {
            this.$emit('update:modelValue', this.tmp)
            console.log('this.tmp', this.tmp, this.modelValue)
            this.$refs.editModal.close();
        }
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
