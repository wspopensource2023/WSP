<template>
    <v-dialog v-model="visible" scrim="black" persistent width="auto">
        <div class="tw-select-none tw-flex tw-flex-col tw-bg-black tw-rounded-2xl tw-overflow-hidden">
            <div
                class="tw-bg-white tw-flex tw-flex-col tw-items-center tw-justify-center tw-bg-opacity-10 tw-w-full tw-h-full tw-px-10 tw-py-10">
                <div>
                    <v-progress-circular color="blue" indeterminate :size="75" :width="7"></v-progress-circular>
                </div>
                <div class="tw-mt-5 tw-text-center"> {{ getLoadingText() }}</div>
            </div>
        </div>
    </v-dialog>
</template>
<script>
export default {
    data() {
        return {
            text: '',
            visible: false
        }
    },
    created() {
        const self = this;
        window.showLoading = function (text) {
            self.show(text)
        }
        window.hideLoading = function () {
            self.hide()
        }
    },
    methods: {
        getLoadingText() {
            return this.text || '加载中'
        },
        show(text) {
            this.text = text;
            this.visible = true;
        },
        hide() {
            this.visible = false;
        }

    }
}
</script>