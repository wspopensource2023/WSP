
<template>
    <RouterView />
    <Toast></Toast>
    <Loading></Loading>
    <LoginModal></LoginModal>
</template>
<script>
import { RouterLink, RouterView } from "vue-router";
import Toast from "@/components/base/Toast.vue";
import Loading from "@/components/base/Loading.vue";
import LoginModal from "@/components/base/LoginModal.vue";
import { useStorage } from "@/stores/storage";

export default {
    components: {
        Toast,
        Loading,
        LoginModal
    },
};
</script>

<style lang="less">
.no-scrollbar {
    ::-webkit-scrollbar {
        height: 0;
        width: 0;
    }
}
</style>
