<template>
    <div>
        <div>
            <ModuleConfigHeader :groupIndex="groupIndex" :moduleIndex="moduleIndex" title="收集成就" description="展示你获得的数字成就"
                icon="achievement-collected" @delete="deleteModule"></ModuleConfigHeader>
        </div>
        <div class="tw-pt-8 tw-px-3 tw-text-white tw-text-opacity-50">
            本模块可以帮助你在数字名片上展示你收集的数字成就，让访问者可以更加直观地了解你的能力、兴趣爱好、经历等。
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
            options: [
                {
                    text: "图像",
                    value: "image",
                },
                {
                    text: "列表",
                    value: "list",
                },
            ],
        };
    },
    methods: {
        deleteModule() {
            console.log("deleteModule!");
            this.$emit("delete");
        },
        create() { },
        deleteModule() {
            this.$emit("delete");
        },
    },
};
</script>

<style></style>
