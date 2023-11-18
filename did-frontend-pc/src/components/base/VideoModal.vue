<template>
    <v-dialog scroll-strategy="block" v-model="visible" scrim="black" width="800">
        <div class="bg-panel tw-rounded-xl tw-overflow-hidden tw-py-3 tw-px-5">
            <div
                class="tw-mb-2 tw-text-lg tw-flex tw-flex-row tw-items-center tw-justify-between">
                <div class="tw-flex tw-items-center">
                    <span>{{title}}</span>
                </div>
                <div class="tw-flex tw-flex-row">
                    <div @click="hide"
                         class="tw-px-3 tw-py-1 tw-cursor-pointer tw-transition tw-duration-300 tw-w-fit tw-text-white tw-rounded-md tw-justify-center tw-text-opacity-50 hover:tw-text-opacity-100 hover:tw-bg-opacity-10 tw-bg-white tw-bg-opacity-0 tw-flex tw-items-center">
                        <span class="tw-ml-1 tw-text-base">关闭</span>
                    </div>
                </div>
            </div>
            <div>
                <video
                    class="tw-w-full tw-object-cover"
                    controls
                >
                    <source :src="url" type="video/mp4">
                </video>
            </div>
        </div>
    </v-dialog>
</template>
<script>
export default {
    data() {
        return {
            title: '',
            url: '',
            visible: false,
        }
    },
    methods: {
        show(title, url) {
            this.title = title;
            this.url = url;
            this.visible = true;
        },
        hide() {
            this.visible = false;
        }
    }
}
</script>