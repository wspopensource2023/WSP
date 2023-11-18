<template>
    <div class="px-3">
        <div>
            <ModuleConfigHeader :groupIndex="groupIndex" :moduleIndex="moduleIndex" class="tw-pt-5" icon="weibo" title="微博"
                description="展示你的微博账号，让访问者可以直接了解你在微博上的影响力以及分享的内容。" @delete="deleteModule">
            </ModuleConfigHeader>
        </div>
        <div class="tw-pt-8 tw-px-3">
            <div>
                <v-text-field hide-details class="tw-mt-3" type="text" :persistent-placeholder="true" rounded="lg" label="微博账号ID"
                              @input="onInputUID"
                    variant="outlined" v-model="config.spec.uid" placeholder="请输入微博个人主页链接或者账号UID，填入链接将自动识别" />
                <div class="tw-flex tw-flex-row tw-mb-3 tw-mt-3">
                    <div
                        @click="showVideoModal('如何获取微博的个人主页链接', 'https://static.xxxxxx.com/29e5647e1eb9b2c1d5a82ff48852a78619aa25b3886f7425c06208b1203098b6')"
                        class="tw-opacity-50 hover:tw-opacity-100 tw-transition-all tw-duration-300 tw-cursor-pointer tw-bg-white/10 tw-rounded tw-px-3 tw-py-0.5">
                        <div class="tw-flex tw-items-center">
                            <img
                                src="https://static.xxxxxx.com/d55c071d5d772ffd86689252bb4744b8767a105291c25578f3e9afa063475218"
                                alt="">
                            <span
                                class="tw-ml-1">不知道如何获取微博的个人主页链接? 点我查看帮助视频</span>
                        </div>
                    </div>
                    <a target="_black" href="https://www.weibo.com" class="tw-flex tw-flex-row tw-opacity-50 hover:tw-opacity-100 tw-transition-all tw-duration-300 tw-cursor-pointer tw-bg-white/10 tw-rounded tw-px-3 tw-py-0.5 tw-items-center tw-ml-2">
                            <img class="tw-w-4 tw-h-4"
                                src="https://static.xxxxxx.com/c490e44a1408c1baff5e49144079334c8ed75d71ff93e005d8ebf7b3136cdb6a"
                                alt="">
                            <span
                                class="tw-ml-1">打开微博</span>
                    </a>
                </div>
                <v-btn @click="aigc" :disabled="aigcButtonDisabled" height="50" :flat="true"
                    class="tw-transition tw-duration-300 tw-w-full hover:tw-border-white tw-border-solid tw-border tw-border-transparent tw-rounded-xl tw-text-base tw-bg-white tw-bg-opacity-5">
                    <v-icon class="tw-mr-2 tw-w-4 tw-h-4" icon="mdi-auto-fix"></v-icon>
                    <span>{{ aigcButtonText }}</span>
                </v-btn>
            </div>
            <div
                class="tw-mt-10 tw-pt-8 tw-pb-3 tw-border-t tw-border-opacity-5 tw-border-solid tw-border-white tw-my-5 tw-text-lg tw-text-white tw-text-opacity-80">
                更多设置</div>
            <div>
                <v-text-field class="tw-mb-3" type="text" :persistent-placeholder="true" rounded="lg" label="标题"
                    variant="outlined" v-model="config.spec.title" placeholder="请输入标题" />
                <v-text-field class="tw-mb-3" type="text" :persistent-placeholder="true" rounded="lg" label="描述"
                    variant="outlined" v-model="config.spec.subtitle" placeholder="请输入描述" />
                <v-text-field class="tw-mb-3" type="text" :persistent-placeholder="true" rounded="lg" label="跳转链接"
                    variant="outlined" v-model="config.spec.url" placeholder="请输入跳转链接" />
                <IconInput v-model="config.spec.icon" ref="IconInput"></IconInput>
            </div>
        </div>
        <VideoModal ref="VideoModal"></VideoModal>
    </div>
</template>

<script>
import SPIcon from "@/components/base/SPIcon.vue";
import { apiService } from "@/apis/apis";
import { merge } from "lodash";
import ModuleConfigHeader from "@/components/did/modules/ModuleConfigHeader.vue";
import IconInput from "@/components/base/IconInput.vue";
import {parseWeiboUID} from "@/library/util";
import VideoModal from "@/components/base/VideoModal.vue";
export default {
    props: {
        moduleIndex: -1,
        groupIndex: -1,
        config: {},
    },
    components: {
        VideoModal,
        SPIcon,
        ModuleConfigHeader,
        IconInput
    },
    data() {
        return {
            lastUID: "",
        };
    },
    computed: {
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
        showVideoModal(title, url) {
            this.$refs.VideoModal.show(title, url);
        },
        onInputUID(val) {
            this.config.spec.uid = parseWeiboUID(this.config.spec.uid)
        },
        async aigc() {
            const uid = this.config.spec.uid;
            if (!uid) {
                return;
            }
            const res = await apiService.AIGCWeiboCRD(uid);
            merge(this.config, res);
            this.lastUID = uid;
        },
        create() { },
        deleteModule() {
            this.$emit("delete");
        },
    },
};
</script>

<style></style>
