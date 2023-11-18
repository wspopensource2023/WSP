<template>
    <div :style="{
        fontSize: size,
    }" :class="getIconClassName()"></div>
</template>

<script>
export default {
    name: "IconFont",
    props: {
        name: {
            type: String,
            default: () => {
                return ''
            }
        },
        size: {
            type: String,
            default: () => {
                return '16px';
            }
        }
    },
    data() {
        return {};
    },
    methods: {
        getIconClassName() {
            return `iconfont iconfont-${this.name}`
        }
    }
}
</script>

<style lang="scss">
@import url("//at.alicdn.com/t/c/font_3794199_g9k1c6ootw7.css");
</style>
