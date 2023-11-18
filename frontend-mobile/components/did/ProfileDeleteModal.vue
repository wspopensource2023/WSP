<template>
    <uni-popup ref="deleteModal">
        <div class="tw-rounded-xl tw-bg-black tw-overflow-hidden tw-text-white">
            <div class="tw-px-5 tw-pb-8 tw-bg-white tw-bg-opacity-10">
                <div class="tw-relative tw-mb-5 tw-pt-5 tw-text-lg tw-flex tw-flex-row tw-items-center tw-justify-between">
                    <div class="tw-flex tw-items-center">
                        <img class="tw-w-5 tw-h-5 tw-mr-3"
                            src="https://static.xxxxxx.com/941ed4555ff1bb03fd236ac457f5002027328a4a6ce8f7594476b6becc5e695b"
                            alt="">
                        <span>确认要删除吗？</span>
                    </div>
                    <div class="tw-absolute tw-top-0 tw-right-0">
                        <div class="tw-relative tw-flex tw-flex-row tw-items-center tw-py-3 tw-opacity-60">
                            <div @click="hide"
                                class="tw-flex tw-items-center tw-justify-center tw-w-4 tw-h-4 tw-bg-white tw-bg-opacity-10 tw-rounded-full tw-p-0.5">
                                <img class="tw-w-3 tw-h-3"
                                    src="https://static.xxxxxx.com/63d2ad6ca4076d87299a85e2373bb5ad53a73ab1857c51c33930790f5cb3090e" />
                            </div>
                        </div>
                    </div>
                </div>
                <div style="height: 330px;" class="tw-overflow-y-auto">
                    <div class="tw-text-white tw-text-opacity-60">
                        <p>您确定要删除您的数字名片吗？</p>
                        <p>请注意，此操作将删除您在当前数字名片中保存的所有个人信息和社交媒体数据，在完成删除之后，将<span
                                class="tw-text-opacity-80 tw-mx-1 tw-text-white tw-underline">无法恢复</span>这些数据，同时<span
                                class="tw-text-opacity-80 tw-mx-1 tw-text-white tw-underline">你的个性域名也会被释放</span>，请谨慎考虑，并确保您已备份或导出您需要保留的任何重要信息。
                        </p>
                        <div class="tw-break-all">如果您确认删除，请在下方输入 <span
                                class="tw-text-indigo-400 tw-bg-indigo-500 tw-font-bold tw-mx-1 tw-bg-opacity-10 tw-p-1 tw-rounded">
                                <span class="tw-select-text">
                                    {{ getConfirmText() }}
                                </span>
                            </span>
                            以继续。
                        </div>
                    </div>
                    <div class="tw-mt-6">
                        <TextInput class="tw-mt-3" label="提示词" v-model="confirmText" placeholder="请输入确认提示词">
                        </TextInput>
                    </div>
                    <div class="tw-mt-6 tw-grid tw-grid-cols-2 tw-gap-8">
                        <button @click="hide()"
                            class="tw-w-full tw-rounded-xl tw-bg-white tw-bg-opacity-5 hover:tw-bg-opacity-10 tw-transition">
                            <div class="tw-text-white tw-text-base tw-flex tw-items-center tw-justify-center tw-py-3.5">
                                <img class="tw-w-5 tw-h-5 tw-mr-2"
                                    src="https://static.xxxxxx.com/mdi/af8ebf95055ff7a71f265a8bcaad2eec569d30d0eabe56239b03602f7da20e76" />
                                <span>返回</span>
                            </div>
                        </button>
                        <button :disabled="getConfirmDisabled()" @click="deleteProfile('color')" hover-class="none"
                            class="tw-w-full tw-rounded-xl tw-bg-white tw-bg-opacity-5 hover:tw-bg-opacity-10 tw-transition">
                            <div class="tw-text-white tw-text-base tw-flex tw-items-center tw-justify-center tw-py-3.5">
                                <img class="tw-w-5 tw-h-5 tw-mr-2"
                                    src="https://static.xxxxxx.com/d2545c1e3cc1982dbc11b3aca8bde1cf2b39b4fa443782336a621ad0a80aaed2" />
                                <span>确认删除</span>
                            </div>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </uni-popup>
</template>
<script>
import { apiService } from "@/library/apis";
import SPIcon from "@/components/base/SPIcon.vue";
import IconFont from "@/components/base/IconFont.vue";
import TextInput from "@/components/base/TextInput.vue";
import _ from "lodash";

export default {
    props: {
        profile: {},
    },
    components: {
        SPIcon,
        IconFont,
        TextInput
    },
    data() {
        return {
            confirmText: '',
            visible: false
        }
    },
    methods: {
        getConfirmDisabled() {
            return this.confirmText !== this.getConfirmText();
        },
        async deleteProfile() {
            const profileId = this?.profile?.spec?.profileId;
            if (profileId) {
                await apiService.DeleteProfile(this.profile.spec.profileId);
                uni.showToast({
                    title: `删除成功！`,
                    icon: 'none',
                    duration: 3000
                });
            }
            uni.switchTab({
                url: '/app/mobile/did/list',
            })
        },
        getConfirmText() {
            return this.profile?.spec?.slug || this.profile?.spec?.profileId || '我确定';
        },
        hide() {
            this.$refs.deleteModal.close()
        },
        show() {
            this.$refs.deleteModal.open('bottom')
        },
    }
}
</script>