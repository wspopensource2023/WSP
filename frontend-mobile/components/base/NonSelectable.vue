<template>
    <div class="non-selectable tw-relative">
        <slot></slot>
    </div>
</template>

<script>
export default {
    name: "NonSelectable",
    data() {
        return {};
    },
    watch: {

    }
};
</script>

<style lang="scss">
@import "@/static/style.css";

.non-selectable::after {
    // width: 100%;
    // height: 100%;
    // content: "";
    // position: absolute;
    // bottom: 0;
}
</style>
