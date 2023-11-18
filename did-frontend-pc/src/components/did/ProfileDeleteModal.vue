<template>
    <v-dialog scroll-strategy="block" v-model="visible" scrim="black" width="500">
        <div class="tw-rounded-xl tw-bg-black tw-overflow-hidden">
            <div class="tw-px-5 tw-pb-8 tw-bg-white tw-bg-opacity-10">
                <div class="tw-mb-5 tw-pt-5 tw-text-lg tw-flex tw-flex-row tw-items-center tw-justify-between">
                    <div class="tw-flex tw-items-center">
                        <span><v-icon class="tw-mr-3" icon="mdi-alert"></v-icon></span>
                        <span>确认要删除吗？</span>
                    </div>
                </div>
                <div class="tw-overflow-y-auto">
                    <div class="tw-text-white tw-text-opacity-60">
                        <p>您确定要删除您的数字身份吗？</p>
                        <p>请注意，此操作将删除您在当前数字身份中保存的所有个人信息和社交媒体数据，在完成删除之后，将<span
                                class="tw-text-opacity-80 tw-mx-1 tw-text-white tw-underline">无法恢复</span>这些数据，同时<span
                                class="tw-text-opacity-80 tw-mx-1 tw-text-white tw-underline">你的个性域名也会被释放</span>，请谨慎考虑，并确保您已备份或导出您需要保留的任何重要信息。
                        </p>
                        <div class="tw-break-all">如果您确认删除，请在下方输入 <span
                                class="tw-text-indigo-400 tw-bg-indigo-500 tw-font-bold tw-mx-1 tw-bg-opacity-10 tw-p-1 tw-rounded">
                                {{
                                    getConfirmText() }}
                            </span>
                            以继续。
                        </div>
                    </div>
                    <div class="tw-mt-6">
                        <v-text-field rounded="lg" type="text" label="确认提示词" variant="outlined" v-model="confirmText"
                            placeholder="请输入确认提示词" />
                    </div>
                    <div class="tw-mt-1 tw-grid tw-grid-cols-2 tw-gap-8">
                        <v-btn height="50" :flat="true" @click="hide()"
                            class="tw-transition tw-duration-300 hover:tw-border-white tw-border-solid tw-border tw-border-transparent tw-rounded-lg tw-text-base tw-border tw-bg-white tw-bg-opacity-5">
                            <span class="tw-mr-2">
                                <v-icon size="1.5rem" icon="mdi-close"></v-icon>
                            </span>
                            <div>取消</div>
                        </v-btn>
                        <v-btn :disabled="getConfirmDisabled()" height="50" :flat="true" @click="deleteProfile('color')"
                            class="tw-transition tw-duration-300 hover:tw-border-white tw-border-solid tw-border tw-border-transparent tw-rounded-lg tw-text-base tw-border tw-bg-white tw-bg-opacity-5">
                            <span class="tw-mr-2">
                                <v-icon size="1.5rem" icon="mdi-delete"></v-icon>
                            </span>
                            <span>确认删除</span>
                        </v-btn>
                    </div>
                </div>
            </div>
        </div>
    </v-dialog>
</template>
<script>
import { apiService } from "@/apis/apis";
import SPIcon from "@/components/base/SPIcon.vue";
import IconFont from "@/components/base/IconFont.vue";
import _ from "lodash";

export default {
    props: {
        profile: {},
    },
    components: {
        SPIcon,
        IconFont,
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
                showToast({
                    message: `删除成功！`,
                    type: "success",
                });
            }
            this.$router.push("/app/did");
        },
        getConfirmText() {
            return this.profile?.spec?.slug || this.profile?.spec?.profileId || '我确定';
        },
        hide() {
            this.visible = false;
        },
        show() {
            this.visible = true;
        },
    }
}
</script>