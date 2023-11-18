<template>
    <div>
        <div class="tw-cursor-default" v-for="(item, index) in getChildren()" :key="item" @click="showModulePanel(item)">
            <!-- <slot name="item" :item="item" :index="index"></slot> -->
						<ModuleView :profile="profile" :config="item"></ModuleView>
        </div>
        <ModulePanelModal ref="ModulePanelModal" :profile="profile"></ModulePanelModal>
    </div>
</template>

<script>
import ModuleView from '@/components/did/modules/ModuleView.vue'
import ModulePanelModal from "@/components/did/modules/ModulePanelModal.vue";
export default {
    props: {
        readonly: false,
        profile: {},
        config: {},
        index: -1,
    },
    data() {
        return {
            currentConfig: null,
        };
    },
    components: {
			ModuleView,
      ModulePanelModal
    },
    mounted() { },
    computed: {},
    methods: {
        showModulePanel(item) {
            if (item.kind === "Title") {
                return;
            }
            this.currentConfig = item;
            this.$refs.ModulePanelModal.show(this.currentConfig);
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

<style>
.module-group {
    padding-left: 0 !important;
    padding-right: 0 !important;
}
</style>