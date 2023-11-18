<template>
    <span :class="getIconClassName()" :style="getIconStyle()"></span>
</template>

<script>
export default {
    props: {
        size: {
            type: String,
            default: () => {
                return "";
            },
        },
        config: {
            type: String,
            default: () => {
                return "";
            },
        },
    },
    mounted() {},
    methods: {
        isImageMode() {
            try {
                const protocol = new URL(this.config).protocol;
                return ["https:", "http:", "data:"].indexOf(protocol) !== -1;
            } catch {
                return false;
            }
        },
        getIconStyle() {
            if (this.isImageMode()) {
                return {
                    "background-image": `url("${this.config}")`,
                    display: "inline-block",
                    "background-repeat": "no-repeat",
                    "background-position": "center",
                    "background-size": "100%",
                };
            }
            return this.size
                ? {
                      width: this.size,
                      height: this.size,
                  }
                : "";
        },
        getIconClassName() {
            if (this.isImageMode()) {
                return "spicon";
            }
            const id = this.config;
            return `spicon spicon-${id}`;
        },
    },
};
</script>

<style lang="scss">
@import url("/app/did/static/spicon.scss");
</style>
