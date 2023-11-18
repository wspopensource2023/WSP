<template>
    <v-card class="tw-h-auto" style="background: rgb(15, 17, 20); min-height: 100vh; min-width: 800px">
        <Header></Header>
        <v-layout>
            <v-main style="min-height: 300px">
                <div class="tw-rounded-lg tw-p-3 tw-mb-5 tw-mx-auto" style="max-width: 1200px">
                    <div class="tw-px-3 tw-py-5">
                        <div class="tw-flex tw-justify-between tw-items-center">
                            <div class="tw-text-3xl">我的数字身份</div>
                        </div>
                        <div v-if="!profiles.length"
                            class="tw-flex tw-mt-8 tw-rounded-2xl tw-w-full tw-justify-center tw-items-center tw-bg-white tw-bg-opacity-5 tw-p-16">
                            <div class="tw-flex tw-items-center tw-flex-col">
                                <div class="tw-w-36 tw-h-36 tw-opacity-25" style="
                                        background: url('/app/did/static/empty.png')
                                            no-repeat center center;
                                        background-size: 100%;
                                    "></div>
                                <div class="tw-text-lg tw-w-full tw-opacity-30 tw-mt-5 tw-text-center">
                                    暂时没有数字身份
                                </div>
                            </div>
                        </div>
                        <div class="tw-mt-6" v-if="loading">
                            <div class="tw-mt-6"><v-skeleton-loader class="tw-rounded-xl tw-select-none" :loading="loading"
                                    height="120" type="avatar, list-item-two-line"></v-skeleton-loader></div>
                            <div class="tw-mt-6"><v-skeleton-loader class="tw-rounded-xl tw-select-none" :loading="loading"
                                    height="120" type="avatar, list-item-two-line"></v-skeleton-loader></div>
                        </div>
                        <div v-show="!loading" v-if="profiles" class="tw-mt-2">
                            <router-link
                                class="tw-transition tw-inline-block tw-w-full tw-duration-300 tw-mt-5 hover:tw-border-white tw-border-solid tw-border-2 tw-border-transparent tw-bg-white tw-rounded-2xl tw-bg-opacity-5 tw-py-6 tw-px-5 tw-rounded-lg"
                                v-for="profile in profiles" :key="profile" :to="getProfileEditUri(profile)">
                                <div class="tw-truncate tw-w-full tw-flex tw-items-center">
                                    <div
                                        class="tw-w-20 tw-cursor-pointer tw-mr-5 tw-flex tw-justify-center tw-items-center tw-flex-shrink-0">
                                        <img :src="profile?.spec?.avatar" class="tw-w-20 tw-h-20 tw-rounded-full" />
                                    </div>
                                    <div>
                                        <div class="tw-text-2xl tw-cursor-pointer tw-flex">
                                            <div>
                                                {{ profile?.spec?.title }}
                                            </div>
                                            <div
                                                class="tw-flex tw-items-center tw-ml-3 tw-px-5 tw-text-base tw-text-indigo-400 tw-bg-indigo-500 tw-rounded-lg tw-text-center tw-bg-opacity-10">
                                                <span>xxxxxx.com/{{
                                                    profile?.spec?.slug
                                                }}</span>
                                            </div>
                                        </div>
                                        <div class="tw-opacity-50 tw-text-xl tw-mt-1 tw-truncate tw-cursor-pointer">
                                            {{ profile?.spec?.description }}
                                        </div>
                                    </div>
                                </div>
                            </router-link>
                        </div>
                        <div class="tw-mt-5">
                            <v-btn height="60"
                                class="tw-transition tw-duration-300 tw-w-full tw-rounded-2xl tw-text-lg tw-border tw-bg-white tw-bg-opacity-5"
                                @click="createProfile">
                                <v-icon class="tw-mr-2" icon="mdi-creation"></v-icon>
                                <span>创建新的数字身份</span>
                            </v-btn>
                        </div>
                    </div>
                </div>
            </v-main>
        </v-layout>
    </v-card>
</template>

<script>
import { VSkeletonLoader } from 'vuetify/labs/VSkeletonLoader'
import IconFont from "@/components/base/IconFont.vue";
import { useStorage } from "@/stores/storage";
import SPHeader from "@/components/base/SPHeader.vue";
import { useRouter } from "vue-router/dist/vue-router";
import Header from "@/components/Header.vue";
export default {
    data() {
        return {
            loading: true
        };
    },
    components: {
        VSkeletonLoader,
        IconFont,
        SPHeader,
        Header,
    },
    computed: {
        profiles() {
            const { state } = useStorage();
            return state?.account?.profiles || [];
        },
    },
    created() {
        setTimeout(() => {
            this.loading = false;
        }, 500)
    },
    methods: {
        getProfileEditUri(profile) {
            return `/app/did/edit/${profile.spec.profileId}`;
        },
        createProfile() {
            this.$router.push({
                name: "PageProfileConfig",
                params: {
                    profileId: "",
                },
            });
        },
    },
};
</script>

<style></style>
