<script lang="ts" setup>
import { ref, computed } from "vue";
import Badge from "@/components/Activity/Detail/Badge.vue";
import Nav from "@/components/Nav/Nav.vue";
</script>
<template>
    <div class="tw-bg-black tw-flex tw-w-full tw-h-full tw-flex-col">
        <div class="tw-w-full tw-mx-auto tw-flex-1 tw-flex">
            <Badge></Badge>
        </div>
    </div>
</template>
<style>
html,
body,
#app {
    height: 100%;
}
</style>
