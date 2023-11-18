<template>
    <div>aaaaa</div>
</template>
<script>
import { useStorage } from "@/store/storage";
import { apiService } from '@/library/apis';

export default {
    onLaunch: async function () {
        uni.loadFontFace({
            family: 'SourceHanSansCN-Normal',
            source: 'url("https://static.xxxxxx.com/a961763dcf9872d6ffc7ce14d8169c652413cc7f9c54ef8e0db619fd8fe191d3")',
            success() {
                console.log('success')
            },
            fail(err) {
                console.log('fail', err)
            }
        })
    },
    onShow: function () {
    },
    onHide: function () {
    },
    onPageNotFound() {
        console.log('page not found!!!')
        // Vue.component('my-component', {
        //     template: 'My Component'
        // });
        // new Vue({
        //     el: '#app',
        //     data: {
        //         currentView: 'my-component'
        //     }
        // })
    }
}
</script>

<style lang="scss">
/*每个页面公共css */
@import "tailwindcss/base";
@import "tailwindcss/utilities";

html {
    font-family: 'SourceHanSansCN-Normal';
}
</style>