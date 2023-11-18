<template>
    <div class="tw-h-full">
        <div>
            <div class="tw-fixed tw-top-5 tw-left-0 tw-z-[1] tw-w-full">
                <div class="tw-px-3">
                    <div style="background: rgb(33, 33, 33);"
                        class="tw-py-3 tw-px-3 tw-rounded-2xl tw-flex tw-flex-row tw-justify-between tw-items-center tw-text-white tw-border tw-border-white/10 tw-border-solid">
                        <div @click="back" class="tw-flex tw-flex-row tw-opacity-60">
                            <div
                                class="tw-px-3 tw-select-none tw-items-center tw-py-1 tw-cursor-pointer tw-transition tw-duration-300 tw-text-white tw-rounded-md tw-justify-center hover:tw-bg-opacity-10 tw-bg-white tw-bg-opacity-0 tw-flex tw-items-center">
                                <img class="tw-w-4 tw-h-4"
                                    src="https://static.xxxxxx.com/mdi/af8ebf95055ff7a71f265a8bcaad2eec569d30d0eabe56239b03602f7da20e76" />
                                <span class="tw-ml-1 tw-text-base">返回</span>
                            </div>
                        </div>
                        <div class="tw-flex tw-flex-row tw-opacity-60">
                            <div v-if="slug" @click="deleteProfile"
                                class="tw-px-3 tw-select-none tw-items-center tw-py-1 tw-cursor-pointer tw-transition tw-duration-300 tw-text-white tw-rounded-md tw-justify-center hover:tw-bg-opacity-10 tw-bg-white tw-bg-opacity-0 tw-flex tw-items-center">
                                <img class="tw-w-4 tw-h-4"
                                    src="https://static.xxxxxx.com/d576c7d3f5b1457afe780d0350b1e4ce1b80536003f54d3fd1e2d6e7b4714c7a" />
                                <span class="tw-ml-1 tw-text-base">删除</span>
                            </div>
                            <div v-if="slug" @click="showShare"
                                class="tw-px-3 tw-select-none tw-items-center tw-py-1 tw-cursor-pointer tw-transition tw-duration-300 tw-text-white tw-rounded-md tw-justify-center hover:tw-bg-opacity-10 tw-bg-white tw-bg-opacity-0 tw-flex tw-items-center">
                                <img class="tw-w-4 tw-h-4"
                                    src="https://static.xxxxxx.com/4da81a0e81ca603cdb8237f57c747d083ac35ba44bd18e89472d4b551d4afe6d" />
                                <span class="tw-ml-1 tw-text-base">分享</span>
                            </div>
                            <div @click="saveProfile"
                                class="tw-px-3 tw-select-none tw-items-center tw-py-1 tw-cursor-pointer tw-transition tw-duration-300 tw-text-white tw-rounded-md tw-justify-center hover:tw-bg-opacity-10 tw-bg-white tw-bg-opacity-0 tw-flex tw-items-center">
                                <img class="tw-w-4 tw-h-4"
                                    src="https://static.xxxxxx.com/aa7a5e29c75f02ac62330a16c1972b56aa29031d1ca84928951b31fa1f352050" />
                                <span class="tw-ml-1 tw-text-base">保存</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div style="background: rgb(33, 33, 33);"
                class="tw-fixed tw-z-[1] tw-overflow-hidden tw-rounded-2xl tw-border-white/10 tw-border-solid tw-right-3 tw-top-24 tw-flex tw-items-center tw-justify-center tw-flex tw-flex-col tw-p-1.5 tw-text-sm tw-border">
                <div @click="showEditor('profile')"
                    class="tw-flex tw-p-2 tw-select-none   tw-transition tw-duration-300 tw-cursor-pointer tw-rounded-xl tw-flex-col tw-mb-2 tw-items-center tw-justify-center tw-flex-shrink-0"
                    :class="getTabClass('profile')">
                    <div class="tw-flex tw-items-center tw-mb-1 tw-justify-center">
                        <img v-if="!isLooseEditingType('profile')" class="tw-w-6 tw-h-6"
                            src="https://static.xxxxxx.com/fd419e4650e802bf4384d57d724469e6c52fc9e74874e6c17dabb10175a1ce73" />
                        <img v-if="isLooseEditingType('profile')" class="tw-w-6 tw-h-6"
                            src="https://static.xxxxxx.com/55f052e9ec137458df3e5a8eeafadb645d67435fa34832309abf4da58f28c188" />
                    </div>
                    <div class="tw-w-8 tw-text-opacity-10 tw-text-center">
                        名片资料
                    </div>
                </div>
                <div @click="showEditor('theme')" :class="getTabClass('theme')"
                    class="tw-flex tw-p-2 tw-select-none  tw-cursor-pointer tw-transition tw-duration-300 tw-rounded-xl tw-flex-col tw-mb-2 tw-items-center tw-justify-center">
                    <div class="tw-flex tw-items-center tw-mb-1">
                        <img v-if="!isLooseEditingType('theme')" class="tw-w-6 tw-h-6"
                            src="https://static.xxxxxx.com/a2935774a1263b70f8ff05cc1460e1e37eb8cf4bc6adf74eff0f1bfd6ba854f5" />
                        <img v-if="isLooseEditingType('theme')" class="tw-w-6 tw-h-6"
                            src="https://static.xxxxxx.com/86a371ab38ed7f0b77e6ba12eb1cee2c94df46d2b995f3de79bc3189b3496b7f" />
                    </div>
                    <div class="tw-w-8 tw-text-opacity-10 tw-text-center">风格设计</div>
                </div>
                <div @click="showActivatePremiumModal()" class="tw-text-white tw-flex tw-p-2 tw-select-none  tw-cursor-pointer tw-transition tw-duration-300 tw-rounded-xl tw-flex-col tw-mb-2 tw-items-center tw-justify-center">
                    <div class="tw-opacity-80 tw-flex tw-flex-col tw-items-center tw-justify-center" v-if="!premiumActivated">
                        <div class="tw-flex tw-items-center tw-mb-1">
                            <img class="tw-w-6 tw-h-6"
                            src="https://static.xxxxxx.com/f008d3ade9e6fe6e4cfab6fea49e613d53611163d084f3e7dc0d6560ac10090e" />
                        </div>
                        <div class="tw-w-8 tw-text-opacity-10 tw-text-center">开通会员</div>
                    </div>
                    <div class="tw-flex tw-flex-col tw-items-center tw-justify-center" v-if="premiumActivated">
                        <div class="tw-flex tw-items-center tw-mb-1">
                            <img class="tw-w-6 tw-h-6"
                            src="https://static.xxxxxx.com/b939b29fb3b4ca1c5ac9033aaf0b506bec3f4a6a8b2cdd8961a6d3c15aa891e9" />
                        </div>
                        <div class="tw-text-amber-300 tw-w-8 tw-text-center">会员状态</div>
                    </div>
                </div>
            </div>
        </div>
        <div class="tw-text-sm tw-h-full">
            <Profile @clickAvatar="clickAvatar" :profile="profile"></Profile>
        </div>
        <div>
            <uni-popup @change="onEditModalChange" ref="editModal">
                <ProfileEditor @editing="editing" v-if="isEditingType('profile')" :profile="profile"></ProfileEditor>
                <ThemeEditor @showPremium="showPremium" @editing="editing" v-if="isEditingType('theme')" :profile="profile"></ThemeEditor>
                <MetadataConfig @editing="editing" v-if="isEditingType('profile.metadata')" :profile="profile">
                </MetadataConfig>
            </uni-popup>
            <ModuleConfigModal ref="ModuleConfigModal" :profile="profile" @editing="editing" :config="editingConfig"
                :groupIndex="editingGroupIndex" :moduleIndex="editingModuleIndex">
            </ModuleConfigModal>
            <ProfileDeleteModal ref="ProfileDeleteModal" :profile="profile"></ProfileDeleteModal>
            <ShareModal ref="ShareModal" :profile="profile"></ShareModal>
            <LoginModal ref="LoginModal"></LoginModal>
            <ActivatePremiumModal :profile="profile" ref="ActivatePremiumModal"></ActivatePremiumModal>
        </div>
    </div>
</template>
<script>
import { apiService, loadMe } from '@/library/apis'
import Profile from '@/components/did/modules/Profile/Profile.vue'
import ProfileEditor from '@/components/did/ProfileEditor.vue';
import ShareModal from '@/components/did/ShareModal.vue';
import ThemeEditor from '@/components/did/ThemeEditor.vue';
import ModuleConfigModal from '@/components/did/modules/ModuleConfigModal.vue';
import ProfileDeleteModal from '@/components/did/ProfileDeleteModal.vue';
import MetadataConfig from '@/components/did/modules/Metadata/Config.vue';
import LoginModal from '@/app/mobile/loginModal.vue'
import ActivatePremiumModal from "@/components/did/ActivatePremiumModal.vue";

import {
    useStorage
} from '@/store/storage'
import { getDefaultProfile } from "@/store/storage";

export default {
    components: {
        Profile,
        ProfileEditor,
        ThemeEditor,
        ModuleConfigModal,
        ProfileDeleteModal,
        MetadataConfig,
        ShareModal,
        LoginModal,
        ActivatePremiumModal
    },
    data() {
        return {
            profileId: -1,
            profile: {
                spec: {
                    style: {},
                },
            },
            // editing 
            editingType: '',
            editingConfig: {},
            editingGroupIndex: -1,
            editingModuleIndex: -1,
        }
    },
    computed: {
        slug() {
            return this.profile?.spec?.slug || '';
        },
        accountId() {
            const storage = useStorage()
            return storage.$state.accountId
        },
        premiumActivated() {
            const storage = useStorage();
            return storage.$state?.account?.is_premium_activated;
        },
    },
    async onLoad(options) {
        this.profileId = options.profileId;
        console.log('profileId', this.profileId)
        await this.loadProfile()
    },
    methods: {
        showPremium() {
            this.$refs.ActivatePremiumModal.show();
        },
        showActivatePremiumModal() {
            if (this.premiumActivated) {
                uni.showToast({
                    title: `会员生效中`,
                    icon: 'none',
                    duration: 3000
                });
                return
            }
            this.$refs.ActivatePremiumModal.show();
        },
        clickAvatar() {
            this.$refs.editModal.open('bottom');
            this.editing({
                type: 'profile.metadata',
                config: {},
                groupIndex: -1,
                moduleIndex: -1
            })
        },
        deleteProfile() {
            const profileId = this?.profile?.spec?.profileId;
            if (!profileId) {
                uni.switchTab({
                    url: '/app/mobile/did/list',
                })
                return;
            }
            this.$refs.ProfileDeleteModal.show();
        },
        back() {
            uni.switchTab({
                url: '/app/mobile/did/list',
            })
        },
        showShare() {
            this.$refs.ShareModal.show();
        },
        async saveProfile() {
            if (!this.accountId) {
                this.$refs.LoginModal.show()
            }
            console.log('>>>>>>>>> 保存！', this.profile.spec.profileId)
            const res = await apiService.UpdateProfile(
                this.profile
            );
            if (res) {
                const profileId = res?.profile_id;
                if (profileId) {
                    this.profileId = profileId;
                    this.profile.spec.profileId = profileId;
                    uni.navigateTo({
                        url: `/app/mobile/did/edit?profileId=${profileId}`
                    });
                }
            }
            uni.showToast({
                title: `保存成功！`,
                icon: 'none',
                duration: 3000
            });
        },
        editing(info) {
            console.log('switch edit page', info)
            this.editingConfig = info.config;
            this.editingType = info.type;
            this.editingGroupIndex = info.groupIndex;
            this.editingModuleIndex = info.moduleIndex;
            console.log('update editing type', {
                'editingType': this.editingType,
                'editingGroupIndex': this.editingGroupIndex,
                'editingModuleIndex': this.editingModuleIndex,
            })
            if (!this.editingType) {
                this.$refs.editModal.close();
                this.$refs.ModuleConfigModal.close();
            }
            if (this.editingType === 'profile.editModule') {
                this.editingType = 'profile';
                this.$refs.ModuleConfigModal.show();
            }
        },
        onEditModalChange(event) {
            if (!event.show) {
                this.editingType = '';
            }
        },
        showEditor(type) {
            if (this.editingType === type) return;
            this.editingType = type;
            this.$refs.editModal.open('bottom')
        },
        isEditingType(type) {
            return this.editingType === type;
        },
        isLooseEditingType(type) {
            return this.editingType && this.editingType.indexOf(type) === 0;
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
                'tw-opacity-60': true,
                'tw-text-white': true
            }
        },
        async loadProfile() {
            if (this.profileId) {
                try {
                    const res = await apiService.GetProfileByID(this.profileId)
                    this.profile = res.profile;
                    return
                } catch (e) {
                    console.error('apiService.GetProfileByID', e)
                    uni.showToast({
                        title: `加载个人资料失败`,
                        icon: 'none',
                        duration: 3000
                    })
                }
            }
            this.profile = getDefaultProfile();
        }
    }
}
</script> 