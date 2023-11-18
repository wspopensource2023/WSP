<template>
    <div>
        <div>
            <ModuleConfigHeader :groupIndex="groupIndex" :moduleIndex="moduleIndex" class="tw-pt-5" icon="title" title="标题"
                description="添加一个标题，来对列表进行简单的分类" @delete="deleteModule">
            </ModuleConfigHeader>
        </div>
        <div class="tw-pt-8 tw-px-3">
            <div class="tw-mt-2">
                <v-text-field type="text" :persistent-placeholder="true" rounded="lg" label="标题" variant="outlined"
                    v-model="config.spec.title" placeholder="请输入标题" />
            </div>
            <div class="tw-mt-2">
                <v-text-field type="text" :persistent-placeholder="true" rounded="lg" label="副标题" variant="outlined"
                    v-model="config.spec.subtitle" placeholder="请输入副标题" />
            </div>
        </div>
    </div>
</template>

<script>
import SPIcon from "@/components/base/SPIcon.vue";
import ModuleConfigHeader from "@/components/did/modules/ModuleConfigHeader.vue";

export default {
    props: {
        moduleIndex: -1,
        groupIndex: -1,
        config: {},
    },
    components: {
        SPIcon,
        ModuleConfigHeader,
    },
    data() {
        return {};
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
