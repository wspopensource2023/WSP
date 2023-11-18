<template>
    <div>
        <div>
            <ModuleConfigHeader :groupIndex="groupIndex" :moduleIndex="moduleIndex" title="发行成就" description="展示你发行的数字成就"
                icon="achievement-issued" @delete="deleteModule"></ModuleConfigHeader>
        </div>
        <div class="tw-pt-5 tw-px-3 tw-text-white tw-text-opacity-50">
            本模块可以展示你发行的数字成就，让访问者可以更加直观地了解你举办过的活动。
        </div>
        <div class="tw-px-2 tw-grid tw-grid-cols-2 tw-gap-3 tw-mt-3">
            <button @click="back" hover-class="none"
                class="tw-w-full tw-rounded-xl tw-bg-white tw-bg-opacity-5 hover:tw-bg-opacity-10 tw-transition">
                <div class="tw-text-white tw-text-base tw-flex tw-items-center tw-justify-center tw-py-3.5">
                    <img class="tw-w-5 tw-h-5 tw-mr-2"
                        src="https://static.xxxxxx.com/mdi/af8ebf95055ff7a71f265a8bcaad2eec569d30d0eabe56239b03602f7da20e76" />
                    <span>返回</span>
                </div>
            </button>
            <button @click="confirm" hover-class="none"
                class="tw-w-full tw-rounded-xl tw-bg-white tw-bg-opacity-5 hover:tw-bg-opacity-10 tw-transition">
                <div class="tw-text-white tw-text-base tw-flex tw-items-center tw-justify-center tw-py-3.5">
                    <img class="tw-w-5 tw-h-5 tw-mr-2"
                        src="https://static.xxxxxx.com/d2545c1e3cc1982dbc11b3aca8bde1cf2b39b4fa443782336a621ad0a80aaed2" />
                    <span>确认</span>
                </div>
            </button>
        </div>
    </div>
</template>

<script>
import ModuleConfigHeader from "../ModuleConfigHeader.vue";
import SPIcon from "@/components/base/SPIcon.vue";
export default {
    props: {
        moduleIndex: -1,
        groupIndex: -1,
        config: {},
    },
    components: {
        SPIcon,
        ModuleConfigHeader
    },
    data() {
        return {
            value: "",
            displayOptions: [
                {
                    text: "居左",
                    value: "left",
                },
                {
                    text: "居中",
                    value: "left",
                },
                {
                    text: "居右",
                    value: "left",
                },
                {
                    text: "隐藏",
                    value: "left",
                },
                {
                    text: "自动",
                    value: "auto",
                },
            ],
        };
    },
    methods: {
        confirm() {
            this.$emit('confirm')
        },
        back() {
            this.$emit('back')
        },
        create() { },
        deleteModule() {
            this.$emit("delete");
        },
    },
};
</script>

<style></style>
