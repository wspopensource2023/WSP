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
                <div class="tw-mt-2">
                    <button @click="createModule" hover-class="none"
                        class="tw-rounded-xl tw-bg-white tw-bg-opacity-5 hover:tw-bg-opacity-10">
                        <div class="tw-text-white tw-text-base tw-flex tw-items-center tw-justify-center tw-py-3.5">
                            <img class="tw-w-5 tw-h-5 tw-mr-2"
                                src="https://static.xxxxxx.com/mdi/791f815eceab01a3ff62f1e59e8bc6183ed312bf36e84f952c26fb24a679ef9a" />
                            <span>添加内容</span>
                        </div>
                    </button>
                </div>
            </div>
        </div>
        <div>
            <ModuleCreateModal ref="ModuleCreateModal" :profile="profile" :config="config">
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
            return item.kind?.toLowerCase() === kind?.toLowerCase();
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
