<template>
    <div>
        <AchievementItem
            v-if="data.campaign_type === 'achievement'"
            :data="data"
        ></AchievementItem>
        <CampaignItem
            v-if="data.campaign_type === 'campaign'"
            :data="data"
        ></CampaignItem>
    </div>
</template>
<script>
import AchievementItem from './AchievementItem.vue'
import CampaignItem from './CampaignItem.vue'

export default {
    props: { data: {}, },
    components: {
        AchievementItem,
        CampaignItem,
    },
    data() {
        return {}
    },
}
</script>
