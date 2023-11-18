<template>
    <span 
	<!-- #ifdef MP-WEIXIN -->
	style="width: 100%; height: 100%;"
	<!-- #endif -->
	:class="getIconClassName()" 
	:style="getIconStyle()"
	></span>
</template>

<script>
	import URL from 'url-new';
    export default {
        name: "spicon",
        props: {
            size: {
                type: String,
                default: () => {
                    return '';
                }
            },
            config: {
                type: String,
                default: () => {
                    return ''
                }
            },
        },
        mounted() {

        },
        methods: {
            isImageMode() {
                try {
                    const protocol = new URL(this.config).protocol;
                    return ['https:', "http:", "data:"].indexOf(protocol) !== -1
                } catch {
                    return false;
                }
            },
            getIconStyle() {
                if (this.isImageMode()) {
                    return {
                        'background-image': `url("${this.config}")`,
                        'display': 'inline-block',
                        'background-repeat': 'no-repeat',
                        'background-position': 'center',
                        'background-size': '100%',
                    }
                }
                return this.size ? {
                    'width': this.size,
                    'height': this.size
                } : '';
            },
            getIconClassName() {
                if (this.isImageMode()) {
                    return 'spicon';
                }
                const id = this.config;
				
				return `spicon spicon-${id}`
            }
        }
    }
</script>

<style lang="scss">
	@import "@/static/style.css";
    @import url("/static/spicon.scss");
    .spicon {}
</style>
