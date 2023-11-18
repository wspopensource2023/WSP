<template>
    <v-app-bar color="rgb(15, 17, 20)">
        <template v-slot:prepend>
            <div class="tw-mx-3">xxxx_xxx</div>
            <div class="mr-5"></div>
            <v-tabs
                selected-class="tw-bg-white tw-bg-opacity-5"
                hide-slider
                fixed-tabs
            >
                <a href="/app/did">
                    <v-tab :value="1">数字身份</v-tab>
                </a>
                <a href="/app/achievement">
                    <v-tab :value="2">数字成就</v-tab>
                </a>
            </v-tabs>
        </template>
        <template v-slot:append>
            <div class="tw-cursor-pointer" @click="logout">退出登录</div>
        </template>
    </v-app-bar>
</template>
<script>
import { useStorage } from "@/stores/storage";

export default {
    data() {
        return {};
    },
    computed: {},
    created() {},
    methods: {
        logout() {
            const { commitJWT } = useStorage();
            commitJWT("");
            this.$router.push({
                name: "PageLogin",
            });
        },
    },
    components: {},
};
</script>