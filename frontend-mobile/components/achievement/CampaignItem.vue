<template>
    <div class="tw-py-4" style="border-radius: 10px; background: rgba(255, 255, 255, 0.03);">
        <div class="tw-w-44 tw-h-44 tw-flex-shrink-0 tw-mx-auto">
            <img class="tw-w-full h-full" :src="data.campaign_image" :alt="data.campaign_name" />
        </div>
        <div class="tw-w-28 tw-mt-2 tw-text-sm tw-font-bold tw-truncate">
            {{ data.campaign_name }}
        </div>
        <div class="tw-w-28 tw-mt-1 tw-text-sm tw-opacity-60 tw-truncate">
            {{ data.campaign_summary }}
        </div>
    </div>
</template>
<script>
import IconFont from '@/components/base/IconFont.vue'
import { apiService } from '@/library/apis'

export default {
    props: { data: {}, },
    data() {
        console.log('data', this.data)
        return {}
    },
}
</script>