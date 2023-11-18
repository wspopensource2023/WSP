<template>
    <div class="module tw-pt-5 tw-pb-1" :style="getModuleStyle()">
        <div class="module-content tw-relative tw-no-scrollbar">
            <div class="tw-mb-3">
                <div class="tw-text-lg">发行成就</div>
                <div class="tw-text-xs tw-opacity-60">ACHIEVEMENTS ISSUED</div>
            </div>
            <div v-if="!achievements.length" class="tw-py-8 tw-border tw-rounded tw-border-solid tw-border-white/10">
                <div class="tw-opacity-60 tw-text-sm tw-text-center">
                    尚未发行过任何成就
                </div>
            </div>
            <div class="tw-flex tw-flex-row tw-overflow-x-auto tw-overflow-y-hidden">
                <div class="tw-mr-3" v-for="item of achievements" :key="item">
                    <AchievementItem :name="item.achievement_name" :image="item.achievement_image"
                        :description="item.achievement_summary" :participants="getParticipants(item)">
                    </AchievementItem>
                </div>
            </div>
        </div>
        <div class="module-footer"></div>
    </div>
</template>

<script>
import SPIcon from "@/components/base/SPIcon.vue";
import AchievementItem from "./AchievementItem.vue";

import { clone } from "lodash";
import {
    apiService
} from '@/library/apis.js'

export default {
    props: {
        config: {},
        profile: {},
    },
    components: {
        SPIcon,
        AchievementItem,
    },
    data() {
        return {
            achievements: [],
        };
    },
    computed: {
        accountId() {
            return this.profile?.spec?.accountId;
        },
    },
    async mounted() {
        await this.loadAchievements();
        console.log("achievements issued", this.achievements);
    },
    methods: {
        getParticipants(item) {
            const res = item.issuance_quantity - item.stock;
            if (res < 0 || !res) {
                return 0;
            }
            return res;
        },
        getModuleStyle() {
            const style = clone(this.profile.spec.style["module.css"] || {});
            const borderRadius = parseInt(style["border-radius"]) || 0;
            if (borderRadius > 15) {
                style["border-radius"] = "15px";
            }
            return style;
        },
        async loadAchievements() {
            if (this.accountId) {
                const res = await apiService.ListIssuedAchievement(
                    this.accountId,
                    1,
                    10
                );
                this.achievements = res.achievement_list;
            }
        },
    },
};
</script>

<style lang="scss" scoped>
::-webkit-scrollbar {
    height: 0;
    width: 0;
}
</style>