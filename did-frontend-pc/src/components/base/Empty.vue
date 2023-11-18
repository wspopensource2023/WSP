<template>
    <div class="tw-flex tw-mt-8 tw-rounded-2xl tw-w-full tw-justify-center tw-items-center tw-p-16">
        <div class="tw-flex tw-items-center tw-flex-col">
            <div :class="getImageClass()" style="
                background: url('https://static.xxxxxx.com/ee77956e9be66a7badcfc1030c168236641e944cb2c4a36880fc6aa954231954') no-repeat center center;
                background-size: 100%;
                                    "></div>
            <div class="tw-text-lg tw-w-full tw-opacity-30 tw-mt-5 tw-text-center">
                <slot></slot>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    props: {
        size: 28
    },
    methods: {
        getImageClass() {
            const size = this.size || 28;
            return `tw-w-${size} tw-h-${size} tw-opacity-25`
        }
    }
}
</script>