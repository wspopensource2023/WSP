<template>
    <v-dialog scroll-strategy="block" v-model="visible" scrim="black" width="500">
        <div class="tw-rounded-xl tw-bg-black tw-overflow-hidden">
            <div class="tw-px-5 tw-pb-8 tw-bg-white tw-bg-opacity-10">
                <div class="tw-mb-5 tw-pt-5 tw-text-lg tw-flex tw-flex-row tw-items-center tw-justify-between">
                    <div class="tw-flex tw-items-center">
                        <span><v-icon class="tw-mr-3" icon="mdi-alert"></v-icon></span>
                        <span>{{ title }}</span>
                    </div>
                </div>
                <div class="tw-overflow-y-auto">
                    <div class="tw-text-white tw-text-opacity-60">
                        <slot></slot>
                    </div>
                    <div class="tw-mt-1 tw-grid tw-grid-cols-2 tw-gap-8 tw-mt-6">
                        <v-btn height="50" :flat="true" @click="cancel"
                            class="tw-transition tw-duration-300 hover:tw-border-white tw-border-solid tw-border tw-border-transparent tw-rounded-lg tw-text-base tw-border tw-bg-white tw-bg-opacity-5">
                            <span class="tw-mr-2">
                                <v-icon size="1.5rem" icon="mdi-close"></v-icon>
                            </span>
                            <div>取消</div>
                        </v-btn>
                        <v-btn height="50" :flat="true" @click="confirm"
                            class="tw-transition tw-duration-300 hover:tw-border-white tw-border-solid tw-border tw-border-transparent tw-rounded-lg tw-text-base tw-border tw-bg-white tw-bg-opacity-5">
                            <span class="tw-mr-2">
                                <v-icon size="1.5rem" icon="mdi-delete"></v-icon>
                            </span>
                            <span>确认</span>
                        </v-btn>
                    </div>
                </div>
            </div>
        </div>
    </v-dialog>
</template>
<script>
export default {
    props: {
        title: '',
    },
    data() {
        return {
            visible: false
        }
    },
    methods: {
        show() {
            this.visible = true
        },
        hide() {
            this.visible = false
        },
        confirm() {
            this.$emit('confirm')
            this.hide()
        },
        cancel() {
            this.$emit('confirm')
            this.hide()
        }
    }
}


</script>