<template>
    <div class="tw-relative tw-h-full tw-w-full">
        <div class="pb-5 tw-font-extrabold">所有参与者({{ total }})</div>
        <div class="tw-flex tw-mb-5 tw--space-x-2">
            <img
                @click="toProfile(participant)"
                v-for="participant in participants"
                :key="participant.slug"
                class="tw-border-solid tw-border tw-w-10 tw-h-10 tw-border-white tw-rounded-full tw-dark:border-gray-800"
                :src="participant.avatar"
            />
        </div>
    </div>
</template>

<script lang="ts">
import { apiService } from "@/apis/apis";
import { toRefs, ref } from "vue";
import { useRoute } from "vue-router";

export default {
  data() {
    const route = useRoute();
    return {
      participants:{},
      total:0,
      badgeId:route.params.id,
    };
  },
  components: {},
  async created() {
    await this.getParticipant();
  },

  methods: {
    async getParticipant() {
      const res = await apiService.ListAchievementParticipant(this.badgeId, 10, 1);
      this.participants = res.data;
      this.total = res.total_count;
    },
    toProfile(item:any) {
      this.$router.push({
        name: "AccountProfile",
        params: {
          id: item.account_id,
        },
      })
    }
  },

};
</script>
