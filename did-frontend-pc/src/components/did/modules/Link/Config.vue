<template>
    <div>
        <div>
            <ModuleConfigHeader :groupIndex="groupIndex" :moduleIndex="moduleIndex" title="链接"
                description="添加一个链接，让访问者可以直接点击进入你想要分享的网页或者社交媒体页面。" icon="link" @delete="deleteModule">
            </ModuleConfigHeader>
        </div>
        <div class="tw-pt-8 tw-px-3">
            <v-text-field :persistent-placeholder="true" rounded="lg" class="tw-mt-2" type="text" label="标题"
                variant="outlined" v-model="config.spec.title" placeholder="请输入标题" />
            <v-text-field :persistent-placeholder="true" rounded="lg" class="tw-mt-2" type="text" label="描述"
                variant="outlined" v-model="config.spec.subtitle" placeholder="请输入描述" />
            <v-text-field :persistent-placeholder="true" rounded="lg" class="tw-mt-2" type="text" label="跳转链接"
                variant="outlined" v-model="config.spec.url" placeholder="跳转链接" />
            <IconInput v-model="config.spec.icon" ref="IconInput"></IconInput>
        </div>
    </div>
</template>

<script>
import SPIcon from "@/components/base/SPIcon.vue";
import ModuleConfigHeader from "@/components/did/modules/ModuleConfigHeader.vue";
import IconInput from "@/components/base/IconInput.vue";
export default {
    props: {
        moduleIndex: -1,
        groupIndex: -1,
        config: {},
    },
    components: {
        IconInput,
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
