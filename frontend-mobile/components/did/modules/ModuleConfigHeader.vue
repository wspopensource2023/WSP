<template>
    <div class="tw-px-2 tw-pt-4">
        <div class="tw-flex tw-select-none tw-flex-col">
            <div class="tw-flex tw-flew-row tw-items-center tw-justify-between">
                <div class="tw-flex tw-flew-row tw-items-center">
                    <div
                        class="tw-flex tw-items-center tw-justify-center tw-bg-white tw-bg-opacity-10 tw-rounded-xl tw-w-9 tw-h-9">
                        <SPIcon style="display: flex;" size="1.3rem" class="" :config="icon"></SPIcon>
                    </div>
                    <div class="tw-ml-3 tw-text-base">
                        {{ title }}
                    </div>
                </div>
                <div class="tw-w-32 tw-flex tw-flew-row tw-items-center tw-justify-end">
                    <div @click="deleteModule" v-if="moduleIndex >= 0"
                        class="tw-px-3 tw-select-none tw-items-center tw-py-1 tw-cursor-pointer tw-transition tw-duration-300 tw-text-white tw-rounded-md tw-justify-center tw-text-opacity-50  hover:tw-text-opacity-100 hover:tw-bg-opacity-10 tw-bg-white tw-bg-opacity-0 tw-flex tw-items-center tw-opacity-70">
                        <img class="tw-w-4 tw-h-4"
                            src="https://static.xxxxxx.com/17d1a26dfc0a61395b0ccca77ae63b13d4f60ceeeb0a0187976fa223be55ceb2"
                            alt="">
                        <span class="tw-ml-1 tw-text-base">删除</span>
                    </div>
                </div>
            </div>
            <div class="tw-mt-2 tw-text-sm tw-text-white tw-text-opacity-70">{{ description }}</div>
        </div>
        <div style="border-bottom: 1px solid rgba(255, 255, 255, 0.05);" class="tw-mt-3"></div>
    </div>
</template>
<script>
import SPIcon from "@/components/base/SPIcon.vue";
export default {
    props: {
        groupIndex: -1,
        moduleIndex: -1,
        title: "",
        description: "",
        icon: "",
    },
    components: {
        SPIcon,
    },
    methods: {
        deleteModule() {
            this.$emit("delete");
        }
    }
}

</script>