<script lang="ts" setup>
import { ref } from "vue";

const identity = ref("");
const presetItems = ref([
    { name: "前端工程师", value: 10 },
    { name: "美术设计师", value: 10 },
    { name: "创意设计师", value: 10 },
    { name: "后端工程师", value: 10 },
    { name: "产品经理", value: 10 },
    { name: "运营", value: 10 },
]);
const triggeredItems = ref([]);

async function search(event: any) {
    identity.value = event.target.value;
    let items = [];
    for (let item of presetItems.value) {
        if (item.name.indexOf(identity.value) !== -1) {
            items.push(item);
        }
    }
    // @ts-ignore
    triggeredItems.value = items;
}

async function select(item: any) {
    if (item.name) {
        identity.value = item.name;
    }
}
</script>
<template>
    <div>
        <v-autocomplete
            v-model="identity"
            :items="triggeredItems"
            color="blue-grey-lighten-2"
            item-title="name"
            item-value="name"
            label="社交身份"
            @input="search"
        >
            <template v-slot:item="{ props, item }">
                <v-list-item
                    v-bind="props"
                    :title="item?.raw?.name"
                    :subtitle="item?.raw?.count"
                ></v-list-item>
            </template>
        </v-autocomplete>
        <div class="tw-flex tw-flex-wrap">
            <div
                class="tw-mt-2 tw-mr-3"
                v-for="item of presetItems"
                :key="item.name"
                @click="select(item)"
            >
                <v-chip
                    color="primary"
                    :variant="
                        (() => {
                            return item.name === identity ? 'flat' : 'tonal';
                        })()
                    "
                    >{{ item.name }}</v-chip
                >
            </div>
        </div>
    </div>
</template>
<style lang="scss">
</style>