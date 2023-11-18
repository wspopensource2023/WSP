<template>
    <div class="tw-px-3 tw-pt-6">
        <div class="tw-flex tw-justify-between tw-select-none ">
            <div>
                <div class="tw-flex tw-flew-row tw-items-center">
                    <div
                        class="tw-flex tw-items-center tw-justify-center tw-bg-white tw-bg-opacity-10 tw-rounded-xl tw-w-9 tw-h-9">
                        <SPIcon size="1.3rem" class="tw-w-10 tw-h-10" :config="icon"></SPIcon>
                    </div>
                    <div class="tw-ml-3 tw-text-xl">
                        {{ title }}
                    </div>
                </div>
                <div class="tw-mt-2 tw-text-base tw-text-white tw-text-opacity-70">{{ description }}</div>
            </div>
            <div class="tw-w-32 tw-flex tw-flew-row tw-items-center tw-justify-end">
                <div @click="deleteModule" v-if="moduleIndex >= 0"
                    class="tw-px-3 tw-select-none  tw-mr-3 tw-py-1 tw-cursor-pointer tw-transition tw-duration-300 tw-text-white tw-rounded-md tw-justify-center tw-text-opacity-50  hover:tw-text-opacity-100 hover:tw-bg-opacity-10 tw-bg-white tw-bg-opacity-0  tw-flex tw-items-center">
                    <v-icon icon="mdi-delete-outline"></v-icon>
                    <span class="tw-ml-1 tw-text-base">删除</span>
                </div>
            </div>
        </div>
        <div class="tw-mt-5 tw-border-b tw-border-solid tw-border-white tw-border-opacity-5"></div>
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