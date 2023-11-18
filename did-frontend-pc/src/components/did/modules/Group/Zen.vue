<template>
    <div class="tw-relative">
        <div class="module-group">
            <div class="module-header"></div>
            <div class="module-group-container module-content">
                <div class="module-content-item" v-for="(item, index) in getChildren()" :key="item">
                    <slot name="item" :item="item" :index="index" :editable="true"></slot>
                </div>
            </div>
            <div class="module-footer mt-3">
                <div class="tw-mt-3.5">
                    <v-btn height="50" :flat="true"
                        class="tw-transition tw-duration-300 tw-w-full hover:tw-border-white tw-border-solid tw-border tw-border-transparent tw-rounded-xl tw-bg-white tw-bg-opacity-5 tw-text-base"
                        @click="createModule">
                        <v-icon class="tw-mr-2" icon="mdi-creation"></v-icon>
                        <span>添加内容</span>
                    </v-btn>
                </div>
            </div>
        </div>
        <div>
            <ModuleCreateModal ref="ModuleCreateModal" :config="config">
            </ModuleCreateModal>
        </div>
    </div>
</template>

<script>
import ModuleCreateModal from "@/components/did/modules/ModuleCreateModal.vue";
export default {
    props: {
        readonly: false,
        profile: {},
        config: {},
        index: -1,
    },
    components: {
        ModuleCreateModal
    },
    data() {
        return {
            currentConfig: null,
        };
    },
    mounted() { },
    computed: {},
    methods: {
        editing(info) {
            this.$emit("editing", info);
        },
        deleteModule(group, index) {
            group.spec.children.splice(index, 1);
        },
        createModule() {
            this.$refs.ModuleCreateModal.show();
        },
        match(item, kind) {
            return item.kind.toLowerCase() === kind.toLowerCase();
        },
        getChildren() {
            return this.config?.spec?.children;
        },
    },
};
</script>

<style lang="scss">
.module-editor {
    .module-editor-container {
        padding: 30px 20px;
        background: #fff;
        border-top-left-radius: 15px;
        border-top-right-radius: 15px;
        overflow: hidden;
    }
}

.module-group-container {}
</style>
