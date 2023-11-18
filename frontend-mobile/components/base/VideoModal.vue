<template>
    <uni-popup mask-background-color="rgba(0,0,0,1)" ref="modal">
        <div>
            <div
                class="tw-mb-2 tw-text-lg tw-text-white tw-flex tw-flex-col">
                <div class="tw-flex tw-flex-row tw-mb-2 tw-justify-end">
                    <div @click="hide"
                         class="tw-text-white tw-text-opacity-50 hover:tw-text-opacity-100 tw-flex tw-items-center">
                        <span class="tw-ml-1 tw-text-base">关闭</span>
                    </div>
                </div>
                <div class="tw-flex tw-items-center">
                    <span>{{title}}</span>
                </div>
            </div>
            <div>
                <video
                    :style="videoStyle"
                    :src="url"
                    :controls="true"
                    :vslide-gesture-in-fullscreen="false" 
                    :enable-progress-gesture="false" 
                    :show-play-btn="true"
                    :show-center-play-btn="true" 
                    :show-fullscreen-btn="false" 
                    :autoplay="false"
                    object-fit="cover">
                </video>
            </div>
        </div>
    </uni-popup>
</template>
<script>
export default {
    props: {
        videoStyle: {}
    },
    data() {
        return {
            title: '',
            url: '',
        }
    },
    methods: {
        show(title, url) {
            this.title = title;
            this.url = url;
            this.$refs.modal.open("center");
        },
        hide() {
            this.$refs.modal.close();
        }
    }
}
</script>