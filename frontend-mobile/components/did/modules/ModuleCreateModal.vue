<template>
    <uni-popup ref="editModal">
        <div style="background: linear-gradient(180deg, #252525 0%, #181818 100%); "
            class="tw-rounded-t-xl tw-text-white tw-px-3 tw-overflow-hidden">
            <div class="tw-relative tw-flex tw-flex-row tw-items-center tw-justify-center tw-py-3 tw-text-sm">
                <div> {{ title }}</div>
                <div v-if="isTab('list')" class="tw-absolute tw-top-0 tw-left-0">
                    <div class="tw-relative tw-flex tw-flex-row tw-items-center tw-py-3 tw-text-sm">
                        <div @click="back" class="tw-flex tw-flex-row tw-items-center">
                            <img class="tw-w-5 tw-h-5"
                                src="https://static.xxxxxx.com/mdi/af8ebf95055ff7a71f265a8bcaad2eec569d30d0eabe56239b03602f7da20e76" />
                            <div>返回</div>
                        </div>
                    </div>
                </div>
            </div>
            <div style="height: 28rem" class="tw-overflow-y-auto tw-pb-3">
                <div v-show="isTab('list')">
                    <div class="tw-flex tw-flex-col">
                        <div class="tw-flex tw-w-full tw-overflow-hidden tw-mb-2" @click="createModule(item)"
                            v-for="item of appModulesConfigs" :key="item.kind">
                            <div
                                class="tw-bg-white tw-transition tw-duration-300 hover:tw-border-white tw-border-transparent tw-border-solid tw-border-2 tw-bg-opacity-5 tw-px-3 tw-py-1.5 tw-rounded-xl">
                                <div class="tw-flex tw-items-center tw-flex-shrink-0 tw-overflow-hidden">
                                    <div class="module-content-left tw-mr-1 tw-h-full">
                                        <div edit-callable
                                            class="tw-w-14 tw-h-14 tw-flex tw-items-center tw-justify-center">
                                            <SPIcon class="tw-w-10 tw-h-10" :config="item.icon"></SPIcon>
                                        </div>
                                    </div>
                                    <div class="tw-mr-3 tw-flex tw-justify-center tw-flex-col">
                                        <div class="tw-w-60 module-title  tw-text-base tw-break-all tw-mb-0.5">
                                            {{ item.name }}
                                        </div>
                                        <div
                                            class="tw-w-60 module-subtitle tw-truncate tw-break-all tw-text-sm tw-opacity-60">
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
                <div v-show="isTab('edit')">
                    <div class="tw-px-1 -tw-mt-3">
                        <ModuleConfig @confirm="confirm" @back="back" :profile="profile" :config="createdConfig"
                            :groupIndex="groupIndex" :moduleIndex="-1">
                        </ModuleConfig>
                    </div>
                </div>
            </div>
        </div>
    </uni-popup>
</template>
<script>
import SPIcon from "@/components/base/SPIcon.vue";
import IconFont from "@/components/base/IconFont.vue";
import ModuleConfig from "@/components/did/modules/ModuleConfig.vue";
import _ from "lodash";
import { MODULE_CONFIGS, getModuleByKind } from '@/library/consts.js';
export default {
    props: {
        config: {},
    },
    components: {
        SPIcon,
        IconFont,
        ModuleConfig
    },
    data() {
        return {
            tab: 'list',
            createdConfig: null,
            selectedItem: null,
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
        title() {
            if (this.selectedItem) {
                return `创建` + this.selectedItem.name + '模块';
            }
            return '添加内容'
        }
    },
    methods: {
        show() {
            this.$refs.editModal.open('bottom')
            this.selectedItem = null;
        },
        back() {
            if (this.tab === 'edit') {
                this.switchTab('list')
                this.selectedItem = null;
            } else {
                this.$refs.editModal.close()
            }
        },
        isTab(tab) {
            return this.tab === tab;
        },
        switchTab(tab) {
            if (this.tab === tab) return;
            this.tab = tab;
        },
        confirm() {
            console.log('>>> module create confirm')
            this.config.spec.children.push(this.createdConfig);
            this.$refs.editModal.close()
            this.switchTab('list')
        },
        createModule(item) {
            this.selectedItem = item;
            const moduleConfig = getModuleByKind(item.kind);
            const config = _.cloneDeep(moduleConfig.default);
            this.createdConfig = config;
            this.switchTab('edit');
        },
        getModulesConfigs() {
            return MODULE_CONFIGS;
        },
    }
}
</script> 