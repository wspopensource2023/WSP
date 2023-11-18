<script lang="ts" setup>
import {toRefs} from "vue";

const props = defineProps<{
    type: string,
    title: string,
    text: string,
    visible: boolean,
}>()

let {type, title, text, visible} = toRefs(props);

</script>

<template>
    <div class="tw-absolute tw-mt-56">
        <div class="tx-items-center tw-text-center">
            <v-alert
            v-model="visible"
            v-type="type"
            :title="title"
            :text="text"
            ></v-alert>
        </div>
    </div>
</template>