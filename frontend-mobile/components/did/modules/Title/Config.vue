<template>
    <div>
        <div>
            <ModuleConfigHeader :groupIndex="groupIndex" :moduleIndex="moduleIndex" class="tw-pt-5" icon="title" title="标题"
                description="添加一个标题，来对列表进行简单的分类" @delete="deleteModule">
            </ModuleConfigHeader>
        </div>
        <div class="tw-pt-3 tw-px-2">
            <TextInput class="tw-mt-3" label="标题" v-model="config.spec.title" placeholder="请输入标题"></TextInput>
            <TextInput class="tw-mt-3" label="描述" v-model="config.spec.subtitle" placeholder="请输入描述"></TextInput>
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
import SPIcon from "@/components/base/SPIcon.vue";
import ModuleConfigHeader from "@/components/did/modules/ModuleConfigHeader.vue";
import TextInput from "@/components/base/TextInput.vue";

export default {
    props: {
        moduleIndex: -1,
        groupIndex: -1,
        config: {},
    },
    components: {
        SPIcon,
        ModuleConfigHeader,
        TextInput
    },
    data() {
        return {};
    },
    methods: {
        create() { },
        deleteModule() {
            this.$emit("delete");
        },
        confirm() {
            this.$emit('confirm')
        },
        back() {
            this.$emit('back')
        },
    },
};
</script>

<style></style>
