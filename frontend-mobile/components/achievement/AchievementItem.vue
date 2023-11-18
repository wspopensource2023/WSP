<template>
    <div class="tw-pb-3" style="border-radius: 10px; background: rgba(255, 255, 255, 0.03);">
        <div style="height: 0; padding: 0; padding-bottom: 100%;"
            class="tw-w-full tw-flex-shrink-0 tw-mx-auto tw-rounded-t-xl tw-overflow-hidden">
            <img mode="widthFix" class="tw-w-full" :src="data.campaign_image" :alt="data.campaign_image" />
        </div>
        <div class="tw-px-3">
            <div class="tw-w-full tw-flex tw-mt-1 tw-text-lg tw-truncate">
                {{ data.campaign_name }}
                <img class="tw-w-4 tw-h-4 tw-self-center tw-ml-1"
                    src="https://static.xxxxxx.com/55d39abf637e94f70bd1ead24ee58f74139ec38980eda2e7c162ba16d2956262"
                    alt="">
            </div>
            <div class="tw-w-full tw-text-sm tw-opacity-60 tw-truncate-two-line">
                {{ data.campaign_summary }}
                <p>&nbsp;</p>
            </div>
        </div>
    </div>
</template>
<script>

export default {
    props: { data: {}, },
    data() {
        console.log('achievement', this.data)
        return {}
    },
}
</script>

<style>
.truncate-two-line {
    word-break: break-all;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
}
</style>