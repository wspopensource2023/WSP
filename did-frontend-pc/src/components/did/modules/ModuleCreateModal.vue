<template>
    <div>
        <v-dialog scroll-strategy="block" v-model="visible" scrim="black" width="1000">
            <div class="tw-rounded-xl tw-bg-black tw-overflow-hidden">
                <div class="tw-px-5 tw-pb-8 tw-bg-white tw-bg-opacity-10">
                    <div class="tw-mb-5 tw-pt-5 tw-text-lg tw-flex tw-flex-row tw-items-center tw-justify-between">
                        <div class="tw-flex tw-items-center">
                            <v-icon class="tw-mr-3" icon="mdi-creation"></v-icon>
                            <div>添加内容</div>
                        </div>
                        <div class="tw-flex tw-items-center tw-flew-row">
                            <div v-if="isTab('edit')" @click="back"
                                class="tw-px-3 tw-mr-3 tw-py-1 tw-cursor-pointer tw-transition tw-duration-300 tw-w-fit tw-text-white tw-rounded-md tw-justify-center tw-text-opacity-50 hover:tw-text-opacity-100 hover:tw-bg-opacity-10 tw-bg-white tw-bg-opacity-0 tw-flex tw-items-center">
                                <v-icon icon="mdi-arrow-left"></v-icon>
                                <span class="tw-ml-1 tw-text-base">返回</span>
                            </div>
                            <div v-if="isTab('edit')" @click="saveModule"
                                class="tw-px-3 tw-mr-3 tw-py-1 tw-cursor-pointer tw-transition tw-duration-300 tw-w-fit tw-text-white tw-rounded-md tw-justify-center tw-text-opacity-50 hover:tw-text-opacity-100 hover:tw-bg-opacity-10 tw-bg-white tw-bg-opacity-0 tw-flex tw-items-center">
                                <v-icon icon="mdi-plus"></v-icon>
                                <span class="tw-ml-1 tw-text-base">创建</span>
                            </div>
                        </div>
                    </div>
                    <div style="height: 500px;" class="tw-overflow-y-auto">
                        <div>
                            <div v-if="isTab('list')">
                                <div class="tw-grid tw-grid-cols-2 tw-gap-3">
                                    <div class="tw-flex" @click="createModule(item.kind)" v-for="item of appModulesConfigs"
                                        :key="item">
                                        <div
                                            class="tw-w-full tw-bg-white tw-transition tw-duration-300 hover:tw-border-white tw-border-transparent tw-border-solid tw-border-2 tw-bg-opacity-5 tw-px-3 tw-py-1.5 tw-rounded-xl">
                                            <div class="tw-flex tw-items-center tw-flex-shrink-0">
                                                <div class="module-content-left tw-mr-3 tw-h-full">
                                                    <div edit-callable
                                                        class="tw-w-14 tw-h-14 tw-flex tw-items-center tw-justify-center">
                                                        <SPIcon class="tw-w-10 tw-h-10" :config="item.icon"></SPIcon>
                                                    </div>
                                                </div>
                                                <div class="tw-w-full tw-mr-5 tw-flex tw-justify-center tw-flex-col">
                                                    <div class="module-title tw-break-all tw-text-base tw-mb-0.5">
                                                        {{ item.name }}
                                                    </div>
                                                    <div style="width: calc(100% - 5rem)"
                                                        class="module-subtitle tw-truncate tw-break-all tw-text-sm tw-opacity-60">
                                                        {{ item.description }}
                                                    </div>
                                                </div>
                                                <div class="tw-h-full"></div>
                                            </div>
                                            <div class="module-footer"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div v-if="isTab('edit')">
                                <div class="tw-px-1 -tw-mt-3">
                                    <ModuleConfig :profile="profile" :config="createdConfig" :groupIndex="groupIndex"
                                        :moduleIndex="-1">
                                    </ModuleConfig>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </v-dialog>
        <Confirm @confirm="confirmBack" ref="Confirm" title="确定要返回吗">
            <p>返回后已经填写的内容可能丢失，是否要继续？</p>
        </Confirm>
    </div>
</template>
<script>
import SPIcon from "@/components/base/SPIcon.vue";
import IconFont from "@/components/base/IconFont.vue";
import ModuleConfig from "@/components/did/modules/ModuleConfig.vue";
import Confirm from '@/components/base/Confirm.vue';

import _, { stubTrue } from "lodash";
import { getModuleByKind, moduleConfigs } from "@/library/storage.js";
export default {
    props: {
        config: {},
    },
    components: {
        SPIcon,
        IconFont,
        ModuleConfig,
        Confirm
    },
    data() {
        return {
            visible: false,
            tab: 'list',
            createdConfig: null,
            initConfig: null,
            appModules: [
                "Title",
                "Link",
                "Story",
                "AchievementCollected",
                "AchievementIssued",
                "Bilibili",
                "XiaoHongShu",
                "Weibo",
                "ZhiHu",
            ],
        }
    },
    computed: {
        appModulesConfigs() {
            return _.filter(this.getModulesConfigs(), (item) => {
                return this.appModules.includes(item.kind);
            });
        },
    },
    watch: {
    },
    methods: {
        back() {
            const isChanged = this.initConfig === JSON.stringify(this.createdConfig);
            if (!isChanged) {
                this.$refs.Confirm.show();
            } else {
                this.confirmBack();
            }
        },
        confirmBack() {
            this.switchTab('list')
        },
        show() {
            this.visible = true;
        },
        isTab(tab) {
            return this.tab === tab;
        },
        switchTab(tab) {
            if (this.tab === tab) return;
            this.tab = tab;
        },
        saveModule() {
            this.config.spec.children.push(this.createdConfig);
            this.visible = false;
        },
        createModule(kind) {
            const moduleConfig = getModuleByKind(kind);
            const config = _.cloneDeep(moduleConfig.default);
            this.createdConfig = config;
            this.initConfig = JSON.stringify(config);
            this.switchTab('edit');
        },
        getModulesConfigs() {
            return moduleConfigs;
        },
    }
}
</script>