<template>
    <div>
        <div>
            <ModuleConfigHeader :groupIndex="groupIndex" :moduleIndex="moduleIndex" class="tw-pt-5" icon="weibo" title="微博"
                description="在数字名片上展示你在微博的账号，让访问者可以直接了解你在微博的影响力以及作品。" @delete="deleteModule">
            </ModuleConfigHeader>
        </div>
        <div class="tw-pt-3 tw-px-2">
            <div v-if="isTab('simple')">
                <TextInput class="tw-mt-3" label="UID" v-model="config.spec.uid" placeholder="请输入微博账号UID">
                </TextInput>
                <div class="tw-mt-3">
                    <button :disabled="aigcButtonDisabled" @click="aigc" hover-class="none"
                        class="tw-w-full tw-rounded-xl tw-bg-white tw-bg-opacity-5 hover:tw-bg-opacity-10 tw-transition">
                        <div class="tw-text-white tw-text-base tw-flex tw-items-center tw-justify-center tw-py-3.5">
                            <img class="tw-w-5 tw-h-5 tw-mr-2"
                                src="https://static.xxxxxx.com/mdi/791f815eceab01a3ff62f1e59e8bc6183ed312bf36e84f952c26fb24a679ef9a" />
                            <span>{{ aigcButtonText }}</span>
                        </div>
                    </button>
                </div>
                <div class="tw-grid tw-grid-cols-2 tw-gap-3 tw-mt-3">
                    <button @click="back" hover-class="none"
                        class="tw-w-full tw-rounded-xl tw-bg-white tw-bg-opacity-5 hover:tw-bg-opacity-10 tw-transition">
                        <div class="tw-text-white tw-text-base tw-flex tw-items-center tw-justify-center tw-py-3.5">
                            <img class="tw-w-5 tw-h-5 tw-mr-2"
                                src="https://static.xxxxxx.com/mdi/af8ebf95055ff7a71f265a8bcaad2eec569d30d0eabe56239b03602f7da20e76" />
                            <span>返回</span>
                        </div>
                    </button>
                    <button @click="showAdvance" hover-class="none"
                        class="tw-w-full tw-rounded-xl tw-bg-white tw-bg-opacity-5 hover:tw-bg-opacity-10 tw-transition">
                        <div class="tw-text-white tw-text-base tw-flex tw-items-center tw-justify-center tw-py-3.5">
                            <img class="tw-w-5 tw-h-5 tw-mr-2"
                                src="https://static.xxxxxx.com/a32aa71f895eec152ad3f47260d45a258f50e14007d11240949700879f2ce388" />
                            <span>更多设置</span>
                        </div>
                    </button>
                </div>
            </div>
            <div v-if="isTab('advance')">

                <TextInput class="tw-mt-3" label="标题" v-model="config.spec.title" placeholder="请输入标题"></TextInput>
                <TextInput class="tw-mt-3" label="描述" v-model="config.spec.subtitle" placeholder="请输入描述"></TextInput>
                <TextInput class="tw-mt-3" label="跳转链接" v-model="config.spec.url" placeholder="请输入跳转链接"></TextInput>
                <IconInput class="tw-mt-3" v-model="config.spec.icon"></IconInput>
                <div class="tw-grid tw-grid-cols-2 tw-gap-3 tw-mt-3">
                    <button @click="switchTab('simple')" hover-class="none"
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
        </div>
    </div>
</template>

<script>
import SPIcon from "@/components/base/SPIcon.vue";
import {
    apiService
} from '@/library/apis.js'
import { merge } from "lodash";
import ModuleConfigHeader from "@/components/did/modules/ModuleConfigHeader.vue";
import TextInput from "@/components/base/TextInput.vue";
import IconInput from "@/components/base/IconInput.vue";
export default {
    props: {
        moduleIndex: -1,
        groupIndex: -1,
        config: {},
    },
    components: {
        SPIcon,
        ModuleConfigHeader,
        TextInput,
        IconInput
    },
    data() {
        return {
            tab: 'simple',
            lastUID: "",
        };
    },
    computed: {
        uid() {
            return this?.config?.spec?.uid || '';
        },
        aigcButtonDisabled() {
            if (!this?.config?.spec?.uid) {
                return true;
            }
            return this.lastUID === this.config.spec.uid;
        },
        aigcButtonText() {
            if (this.lastUID !== "" && this.lastUID === this.config.spec.uid) {
                return "已加载";
            }
            return "一键加载";
        },
    },
    methods: {
        confirm() {
            this.$emit('confirm')
        },
        back() {
            this.$emit('back')
        },
        showAdvance() {
            this.switchTab('advance')
        },
        isTab(tab) {
            return this.tab === tab;
        },
        switchTab(tab) {
            this.tab = tab;
        },
        async aigc() {
            if (!this.uid) {
                uni.showToast({
                    title: `请输入微博uid`,
                    icon: 'none',
                    duration: 3000
                })
                return;
            }
            const res = await apiService.AIGCWeiboCRD(this.uid);
            merge(this.config, res);
            this.lastUID = this.uid;
        },
        create() { },
        deleteModule() {
            this.$emit("delete");
        },
    },
};
</script>

<style></style>
