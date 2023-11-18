<template>
    <div>
        <div>
            <ModuleConfigHeader :groupIndex="groupIndex" :moduleIndex="moduleIndex" class="tw-pt-5" icon="story" title="文章"
                description="发布一篇文章，展示自己的故事、想法和经验。" @delete="deleteModule">
            </ModuleConfigHeader>
        </div>
        <div class="tw-pt-8 tw-px-3">
            <div class="tw-mt-2">
                <v-text-field type="text" :persistent-placeholder="true" rounded="lg" label="标题" variant="outlined"
                    v-model="config.spec.title" placeholder="请输入标题" />
            </div>
            <div class="tw-mt-2">
                <v-text-field type="text" :persistent-placeholder="true" rounded="lg" label="描述" variant="outlined"
                    v-model="config.spec.subtitle" placeholder="请输入描述" />
            </div>
            <div class="tw-mt-2">
                <v-textarea :persistent-placeholder="true" rounded="lg" v-model="config.spec.content" variant="outlined"
                    label="正文" placeholder="请输入正文"></v-textarea>
            </div>
            <IconInput v-model="config.spec.icon" ref="IconInput"></IconInput>
        </div>
    </div>
</template>

<script>
import SPIcon from "@/components/base/SPIcon.vue";
import ModuleConfigHeader from "@/components/did/modules/ModuleConfigHeader.vue";
import IconInput from '@/components/base/IconInput.vue';
export default {
    props: {
        moduleIndex: -1,
        groupIndex: -1,
        config: {},
    },
    components: {
        SPIcon,
        IconInput,
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
