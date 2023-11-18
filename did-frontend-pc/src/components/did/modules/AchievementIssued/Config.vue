<template>
    <div>
        <div>
            <ModuleConfigHeader :groupIndex="groupIndex" :moduleIndex="moduleIndex" title="发行成就" description="展示你发行的数字成就"
                icon="achievement-issued" @delete="deleteModule"></ModuleConfigHeader>
        </div>
        <div class="tw-pt-8 tw-px-3 tw-text-white tw-text-opacity-50">
            本模块可以展示你发行的数字成就，让访问者可以更加直观地了解你发行过的活动。
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
        create() { },
        deleteModule() {
            this.$emit("delete");
        },
    },
};
</script>

<style></style>
