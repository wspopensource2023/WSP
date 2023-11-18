<template>
    <div>
        <div class="tw-cursor-default" v-for="(item, index) in getChildren()" :key="item" @click="showModulePanel(item)">
            <slot name="item" :item="item" :index="index"></slot>
        </div>
        <ModulePanelModal ref="PanelModuleModal" :profile="profile"></ModulePanelModal>
    </div>
</template>

<script>
import { isTransparent } from "@/library/util";
import { clone, merge } from "lodash";
import ModulePanelModal from "@/components/did/modules/ModulePanelModal.vue";

export default {
    props: {
        readonly: false,
        profile: {},
        config: {},
        index: -1,
    },
    components: {
        ModulePanelModal,
    },
    data() {
        return {
            currentConfig: null,
        };
    },
    mounted() { },
    computed: {},
    methods: {
        showModulePanel(item) {
            if (item.kind === "Title") {
                return;
            }
            this.currentConfig = item;
            this.$refs.PanelModuleModal.show(this.currentConfig);
        },
        deleteGroup() {
            if (this.index === -1) return;
            this.profile.spec.children.splice(this.index, 1);
        },
        deleteModule(group, index) {
            group.spec.children.splice(index, 1);
        },
        setEditable(value) {
            this.editable = value;
        },
        onModuleConfigCreated(config) {
            const children = this.getChildren();
            children.push(config);
            console.log("onModuleConfigCreated", config);
        },
        match(item, kind) {
            return item.kind.toLowerCase() === kind.toLowerCase();
        },
        getGroupStyle() {
            if (this.editable) return {};
            let globalStyle = clone(this.profile.spec.style["group.css"] || {});
            let style = clone(this.config.style || {});
            style = merge(globalStyle, style);
            if (this.editable || isTransparent(style["background-color"])) {
                delete style["backdrop-filter"];
            }
            return style;
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