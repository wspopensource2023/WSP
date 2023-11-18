<template>
    <div style="background: rgb(15, 17, 20); min-height: 100vh">
        <Header></Header>
        <div class="tw-flex tw-flex-row tw-flex-shrink-0 tw-justify-center">
            <div class="tw-pt-8 tw-px-20 tw-w-full">
                <div class="tw-flex tw-flex-row">
                    <div class="tw-text-3xl tw-select-none tw-mr-3">编辑数字身份</div>
                    <div class="tw-flex tw-items-end">
                        <Premium ref="Premium" :profile="profile"></Premium>
                    </div>
                </div>
                <div class="tw-flex tw-flex-shrink-0 tw-w-full tw-h-full tw-mt-6 tw-mb-8" style="height: 1000px">
                    <div style="min-width: 800px; width: calc(100% - 400px);"
                        class="tw-flex-shrink-0 tw-flex tw-h-full tw-mr-8 tw-border-solid tw-bg-white tw-bg-opacity-5 tw-rounded-2xl tw-border-white/10">
                        <div style="width: 5.5rem"
                            class="tw-flex tw-flex-shrink-0 tw-px-3 tw-pt-3 tw-flex-col tw-border-opacity-5 tw-h-full tw-border-r tw-border-white tw-border-solid">
                            <router-link to="/app/did">
                                <div
                                    class="tw-transition tw-select-none  tw-duration-300 tw-cursor-pointer tw-text-white tw-text-opacity-40 tw-flex tw-py-3 tw-rounded-xl tw-flex-col tw-bg-white tw-bg-opacity-0 hover:tw-text-opacity-100 hover:tw-bg-opacity-5 tw-mb-3 tw-items-center tw-justify-center">
                                    <v-icon size="2rem" icon="mdi-arrow-left"></v-icon>
                                    <div class="tw-text-lg">返回</div>
                                </div>
                            </router-link>
                            <div @click="switchEditingType('profile')"
                                class="tw-flex tw-select-none  tw-py-3 tw-transition tw-duration-300 tw-cursor-pointer tw-rounded-xl tw-flex-col hover:tw-text-indigo-400 hover:tw-bg-indigo-500 hover:tw-bg-opacity-10 tw-mb-3 tw-items-center tw-justify-center"
                                :class="getTabClass('profile')">
                                <v-icon size="2rem" class="tw-mb-1" icon="mdi-face-man-shimmer"></v-icon>
                                <div class="tw-w-8 tw-leading-5 tw-text-opacity-10">
                                    身份资料
                                </div>
                            </div>
                            <div @click="switchEditingType('theme')" :class="getTabClass('theme')"
                                class="tw-flex  tw-select-none tw-py-3 tw-cursor-pointer tw-transition tw-duration-300 tw-rounded-xl tw-flex-col hover:tw-text-indigo-400 hover:tw-bg-indigo-500 hover:tw-bg-opacity-10 tw-mb-3 tw-items-center tw-justify-center">
                                <v-icon size="2rem" class="tw-mb-1" icon="mdi-auto-fix"></v-icon>
                                <div class="tw-w-8 tw-leading-5">风格设计</div>
                            </div>
                        </div>
                        <div style="width: calc(100% - 5.5rem); overflow-y: scroll;" class="tw-py-5 tw-px-5">
                            <div class="tw-w-full tw-flex tw-flex-row tw-justify-between">
                                <div>
                                    <div v-if="isLooseEditingType('profile.')" @click="switchEditingType('profile')"
                                        class="tw-px-3 tw-select-none  tw-mr-3 tw-py-1 tw-cursor-pointer tw-transition tw-duration-300 tw-w-fit tw-text-white tw-rounded-md tw-justify-center tw-text-opacity-50 hover:tw-text-opacity-100 hover:tw-bg-opacity-10 tw-bg-white tw-bg-opacity-0 tw-flex tw-items-center">
                                        <v-icon icon="mdi-arrow-left"></v-icon>
                                        <span class="tw-ml-1 tw-text-base">返回</span>
                                    </div>
                                </div>
                                <div class="tw-flex tw-flew-row">
                                    <div v-if="slug" @click="deleteProfile"
                                        class="tw-px-3 tw-select-none  tw-mr-3 tw-py-1 tw-cursor-pointer tw-transition tw-duration-300 tw-w-fit tw-text-white tw-rounded-md tw-justify-center tw-text-opacity-50 hover:tw-text-opacity-100 hover:tw-bg-opacity-10 tw-bg-white tw-bg-opacity-0 tw-flex tw-items-center">
                                        <v-icon icon="mdi-delete-outline"></v-icon>
                                        <span class="tw-ml-1 tw-text-base">删除</span>
                                    </div>
                                    <div v-if="slug" @click="openInBrowser"
                                        class="tw-px-3  tw-select-none tw-mr-3 tw-py-1 tw-cursor-pointer tw-transition tw-duration-300 tw-w-fit tw-text-white tw-rounded-md tw-justify-center tw-text-opacity-50 hover:tw-text-opacity-100 hover:tw-bg-opacity-10 tw-bg-white tw-bg-opacity-0 tw-flex tw-items-center">
                                        <v-icon icon="mdi-earth"></v-icon>
                                        <span class="tw-ml-1 tw-text-base">在浏览器中打开</span>
                                    </div>
                                    <div v-if="slug" @click="openShare"
                                        class="tw-px-3 tw-select-none tw-mr-3 tw-py-1 tw-cursor-pointer tw-transition tw-duration-300 tw-w-fit tw-text-white tw-rounded-md tw-justify-center tw-text-opacity-50 hover:tw-text-opacity-100 hover:tw-bg-opacity-10 tw-bg-white tw-bg-opacity-0 tw-flex tw-items-center">
                                        <v-icon icon="mdi-share-variant-outline"></v-icon>
                                        <span class="tw-ml-1 tw-text-base">分享给朋友</span>
                                    </div>
                                    <div @click="saveProfile"
                                        class="tw-px-3 tw-select-none tw-py-1 tw-cursor-pointer tw-transition tw-duration-300 tw-w-fit tw-text-white tw-rounded-md tw-justify-center tw-text-opacity-50 hover:tw-text-opacity-100 hover:tw-bg-opacity-10 tw-bg-white tw-bg-opacity-0 tw-flex tw-items-center">
                                        <v-icon icon="mdi-content-save-edit-outline"></v-icon>
                                        <span class="tw-ml-1 tw-text-base">保存</span>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <div>
                                    <ProfileEditor @editing="editing" v-if="isEditingType('profile')" :profile="profile">
                                    </ProfileEditor>
                                </div>
                                <div>
                                    <ThemeEditor
                                        @showPremium="showPremium"
                                        v-if="isEditingType('theme')" :profile="profile">
                                    </ThemeEditor>
                                </div>
                                <div>
                                    <MetadataConfig :profile="profile" v-if="isEditingType('profile.metadata')">
                                    </MetadataConfig>
                                </div>
                                <div>
                                    <ModuleConfig v-if="isEditingType('profile.editModule')" :profile="profile"
                                        @editing="editing" :config="editingConfig" :groupIndex="editingGroupIndex"
                                        :moduleIndex="editingModuleIndex"></ModuleConfig>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div style="width: 350px; height: 100%"
                        class="tw-flex-shrink-0 tw-h-full tw-border-solid tw-bg-white tw-bg-opacity-5 tw-rounded-2xl tw-border-white/10 tw-overflow-hidden">
                        <Profile :config="profile"></Profile>
                    </div>
                </div>
            </div>
        </div>
        <ProfileDeleteModal ref="ProfileDeleteModal" :profile="profile"></ProfileDeleteModal>
        <Share :profile="profile" ref="Share"></Share>
        <Footer style="border-top: 1px solid #ffffff10"></Footer>
    </div>
</template>
<script>
import { apiService, loadMe } from "@/apis/apis";
import { getDefaultProfile } from "@/stores/storage";
import SPHeader from "@/components/base/SPHeader.vue";
import { useRouter } from "vue-router/dist/vue-router";
import IconFont from "@/components/base/IconFont.vue";
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";
import ProfileEditor from "@/components/did/ProfileEditor.vue";
import ThemeEditor from "@/components/did/ThemeEditor.vue";
import MetadataConfig from "@/components/did/modules/Metadata/Config.vue";
import ModuleConfig from "@/components/did/modules/ModuleConfig.vue";
import Profile from '@/components/did/modules/Profile/Profile.vue';
import ProfileDeleteModal from "@/components/did/ProfileDeleteModal.vue";
import { useStorage } from "@/stores/storage";
import Share from '@/components/did/Share.vue';
import Premium from '@/components/did/Premium.vue';

export default {
    components: {
        SPHeader,
        IconFont,
        Header,
        Footer,
        ProfileEditor,
        ThemeEditor,
        MetadataConfig,
        ModuleConfig,
        Profile,
        ProfileDeleteModal,
        Share,
        Premium
    },
    data() {
        return {
            profileId: this.$route.params.profileId,
            profile: {
                spec: {
                    style: {},
                },
            },
            // editing
            editingType: 'profile',
            editingConfig: {},
            editingGroupIndex: -1,
            editingModuleIndex: -1,
        };
    },
    computed: {
        slug() {
            return this.profile?.spec?.slug || '';
        }
    },
    watch: {
        profile: {
            handler: function (val, oldVal) {
                console.log("profile changed", JSON.stringify(val));
            },
            deep: true,
        },
    },
    async created() {
        await this.loadProfile();
    },
    methods: {
        showPremium() {
            this.$refs.Premium.showActivateModal();
        },
        openShare() {
            this.$refs.Share.show();
        },
        openInBrowser() {
            const routeData = this.$router.resolve({
                name: "PageProfile",
                params: {
                    did: this.profile.spec.slug,
                },
            });
            window.open(routeData.href, "_blank");
        },
        async deleteProfile() {
            const profileId = this?.profile?.spec?.profileId;
            if (!profileId) {
                this.$router.push("/app/did");
                return;
            }
            this.$refs.ProfileDeleteModal.show();
        },
        async saveProfile() {
            showLoading('保存中')
            try {
                const res = await apiService.UpdateProfile(this.profile);
                if (res) {
                    const profileId = res?.profile_id;
                    if (profileId) {
                        this.profileId = profileId;
                        this.profile.spec.profileId = profileId;
                        this.$router.push({
                            params: { ...this.$route.params, profileId: profileId }
                        })
                    }
                }
                showToast({
                    message: `保存成功！`,
                    type: "success",
                });
            } finally {
                hideLoading()
            }
        },
        editing(info) {
            console.log('switch edit page', info)
            this.editingConfig = info.config;
            this.editingType = info.type;
            this.editingGroupIndex = info.groupIndex;
            this.editingModuleIndex = info.moduleIndex;
        },
        switchEditingType(type) {
            if (this.editingType === type) return;
            this.editingType = type;
        },
        isEditingType(type) {
            return this.editingType === type;
        },
        isLooseEditingType(type) {
            return this.editingType.indexOf(type) === 0;
        },
        getTabClass(tab) {
            if (this.isLooseEditingType(tab)) {
                return {
                    'tw-text-indigo-400': true,
                    'tw-bg-indigo-500': true,
                    'tw-bg-opacity-10': true,
                }
            }
            return {
                'tw-text-white': true
            }
        },
        async loadProfile() {
            if (this.profileId) {
                try {
                    await loadMe(useRouter());
                    const { state } = useStorage();
                    const profiles = state?.account?.profiles || [];
                    for (const profile of profiles) {
                        if (profile?.spec?.profileId === this.profileId) {
                            this.profile = profile;
                            return;
                        }
                    }
                } catch (e) {
                    console.log(e)
                    showToast({
                        message: `加载个人资料失败`,
                        type: "warn",
                    });
                }
            }
            this.profile = getDefaultProfile();
        },
    }
};
</script>

<style>
::-webkit-scrollbar {
    height: 0;
    width: 0;
    border: none;
}

::-webkit-scrollbar-track {
    background: rgb(255, 255, 255);
    border-radius: 10px;
}

::-webkit-scrollbar-thumb {
    background: rgb(136, 136, 136);
    border-radius: 10px;
}

::-webkit-scrollbar-thumb:hover {
    background: rgb(100, 100, 100);
    border-radius: 10px;
}

::-webkit-scrollbar-thumb:active {
    background: rgb(68, 68, 68);
    border-radius: 10px;
}
</style>
