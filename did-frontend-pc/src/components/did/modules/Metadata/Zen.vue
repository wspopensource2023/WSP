<template>
    <div>
        <div v-if="loading">
            <v-skeleton-loader class="tw-rounded-xl tw-select-none" :loading="loading" height="120"
                type="avatar, list-item-two-line"></v-skeleton-loader>
        </div>
        <div v-show="!loading" class="tw-bg-white tw-bg-opacity-5 tw-px-4 tw-py-3 tw-rounded-xl tw-select-none">
            <div>
                <div class="tw-flex tw-items-center tw-text-white tw-text-opacity-60">
                    <v-icon size="1.2rem" icon="mdi-pac-man"></v-icon>
                    <span class="tw-ml-1.5 tw-text-base tw-mb-0.5">基础资料</span>
                </div>
                <div class="tw-flex tw-items-center tw-justify-between">
                    <div style="width: calc(100% - 9rem)" class="tw-mt-2 tw-pb-2 tw-flex tw-items-center tw-truncate">
                        <div class="tw-w-20 tw-mr-1.5 tw-flex tw-justify-center tw-items-center tw-flex-shrink-0">
                            <img :src="getAvatar()" style="width: 3.8rem; height: 3.8rem" class="tw-rounded-full" />
                        </div>
                        <div class="tw-flex tw-flex-col">
                            <div class="tw-text-lg tw-flex">
                                <div style="max-width: 11rem" class="tw-truncate">
                                    {{ getTitle() }}
                                </div>
                                <div @click="clickLink"
                                    class="tw-flex tw-items-center tw-ml-3 tw-px-3 tw-text-sm tw-text-indigo-400 tw-bg-indigo-500 tw-rounded-lg tw-text-center tw-bg-opacity-10">
                                    <span class="tw-truncate">{{ getLink() }}</span>
                                </div>
                            </div>
                            <div class="tw-opacity-50 tw-text-base tw-mt-1">
                                {{ getDescription() }}
                            </div>
                        </div>
                    </div>
                    <div class="tw-w-32">
                        <v-btn @click="editing"
                            class="hover:tw-border-white tw-border-solid tw-border tw-border-transparent" variant="tonal"
                            :ripple="false">编辑基础资料</v-btn>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { VSkeletonLoader } from 'vuetify/labs/VSkeletonLoader'
export default {
    components: {
        VSkeletonLoader
    },
    props: {
        profile: {},
    },
    data() {
        return {
            loading: true
        }
    },
    created() {
        setTimeout(() => {
            this.loading = false;
        }, 500);
    },
    methods: {
        editing() {
            this.$emit("editing", {
                type: 'profile.metadata',
                config: {},
                groupIndex: -1,
                moduleIndex: -1
            });
        },
        getAvatar() {
            return this.profile?.spec?.avatar;
        },
        getTitle() {
            return this.profile?.spec?.title;
        },
        getDescription() {
            return this.profile?.spec?.description;
        },
        isLinkAvaliable() {
            return this.profile?.spec?.slug;
        },
        getLink() {
            if (this.isLinkAvaliable()) {
                return 'xxxxxx.com/' + this.profile?.spec?.slug;
            }
            return '点击设置个性域名'
        },
        clickLink() {
            if (!this.isLinkAvaliable()) {
                this.editing();
            }
        }
    }
};
</script>