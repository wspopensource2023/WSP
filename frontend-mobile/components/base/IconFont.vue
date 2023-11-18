<template>
    <div :style="{
        fontSize: size,
		// #ifdef MP-WEIXIN
		width: width,
		height: height
		// #endif
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
            },
			width: {
				type: String,
				default: () => {
					return '16px';
				}
			},
			height: {
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
				// #ifdef MP-WEIXIN
				return `t-icon iconfont-${this.name}`
				// #endif
				
				// #ifdef H5
				return `iconfont iconfont-${this.name}`
				// #endif
            }
        }
    }
</script>

<style lang="scss">
	@import "@/static/style.css";
	
	// #ifdef MP-WEIXIN
	@import '@/static/iconfont/iconfont-weapp/iconfont-weapp-icon.css';
	// #endif
	
	// #ifdef H5
	@import "//at.alicdn.com/t/c/font_3794199_hvjmqgyggm.css";
	// #endif
</style>
