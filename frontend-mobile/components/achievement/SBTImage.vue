<template>
    <div :style="{
        'width': this.size,
    }" class="tw-w-full tw-relative">
        <!-- <div class="w-full h-2/4 absolute top-0 left-0 blur-2xl" :style="getSBTContainerStyle()"></div> -->
        <div class="tw-relative tw-flex tw-justify-center tw-items-center">
            <img :style="{
                'width': this.imageSize,
                'height': this.imageSize,
            }" class="tw-w-60 tw-h-60" :src="image" alt="" />
        </div>
    </div>
</template>
<script>
export default {
    props: {
        size: '20rem',
        imageSize: '15rem',
        image: '',
    },
    methods: {
        getSBTContainerStyle() {
            return {
                "background-image": `url(${this.image})`,
                "background-size": "contain",
                "background-repeat": "no-repeat",
                "background-position": "50%",
            };
        },
    }
}
</script>