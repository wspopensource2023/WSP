<template>
    <div :style="{
        backgroundImage: `url(${getImage()})`,
    }" class="tw-relative tw-w-full tw-bg-no-repeat tw-flex tw-justify-center tw-items-center tw-bg-top tw-bg-cover">
        <div style="width: 100%;
                height: 0;
                padding: 0;
                padding-bottom: 50%;">
        </div>
    </div>
</template>
<script>
import { PROFILE_CONSTS } from "@/library/consts";
export default {
    props: {
        value: '',
        default: PROFILE_CONSTS.DEFAULT_ACCOUNT_BANNER
    },
    methods: {
        getImage() {
            return this.value || this.default
        },
    }
}
</script>