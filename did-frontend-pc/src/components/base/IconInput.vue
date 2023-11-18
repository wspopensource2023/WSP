<template>
    <div @click="show"
        class="tw-h-14 tw-mb-8 tw-border-opacity-50 tw-border-white tw-py-3 tw-px-6 tw-border-solid tw-border tw-rounded-lg tw-flex tw-flex-row tw-items-center hover:tw-border-opacity-100 tw-duration-300 tw-transition tw-justify-between">
        <div class="tw-mr-3  tw-select-none ">图标</div>
        <img v-if="!modelValue" class="tw-w-6 tw-h-6"
            src="https://static.xxxxxx.com/dd59fc3fba842e8626db37e42327a43db2475eed4e7585e9f0788caac90ebf43" />
        <div v-if="modelValue"
            class="tw-transition tw-duration-300 tw-bg-white tw-rounded-xl tw-flex tw-flex-row tw-items-center tw-justify-center tw-bg-opacity-10 tw-flex-shrink-0">
            <SPIcon class="tw-w-8 tw-h-8" :config="modelValue"></SPIcon>
        </div>
        <v-dialog scroll-strategy="reposition" v-model="modalVisible" scrim="black" width="650">
            <div class="tw-relative tw-rounded-xl tw-px-5 tw-pt-3 tw-pb-5" style="background: rgb(20 20 20)">
                <div class="tw-flex tw-flex-row tw-items-center tw-justify-center tw-text-sm">
                    <div>更新图标</div>
                </div>
                <div class="tw-mt-3 tw-flex tw-flex-row">
                    <v-text-field hide-details type="text" :persistent-placeholder="true" rounded="lg" label="关键词"
                        variant="outlined" v-model="keywords" placeholder="搜索图标" />
                    <v-btn @click="uploadIcon" height="55" :flat="true"
                        class="tw-ml-2 tw-transition tw-duration-300 hover:tw-border-white tw-border-solid tw-border tw-border-transparent tw-rounded-xl tw-text-base tw-bg-white tw-bg-opacity-5">
                        <div
                            class="tw-text-white tw-text-base tw-flex tw-items-center tw-justify-center tw-py-3.5 tw-whitespace-nowrap">
                            <img class="tw-w-5 tw-h-5 tw-mr-2"
                                src="https://static.xxxxxx.com/36386c9453d757bdd7d64cc5f23e2a60ec9435d61df6382ce871f35fb8a51375" />
                            <span>上传</span>
                        </div>
                    </v-btn>
                    <div>
                        <v-file-input ref="uploader" class="tw-hidden" @update:modelValue="chooseImage" accept="image/*"
                            prepend-icon="" variant="outlined"></v-file-input>
                    </div>
                </div>
                <div class="tw-mt-3 tw-max-h-72 tw-overflow-y-auto tw-grid tw-grid-cols-12 tw-gap-y-1">
                    <div @click="select(icon.imageUri)" :class="getIconClass(icon.imageUri)" :key="icon"
                        v-for="icon in results">
                        <SPIcon class="tw-w-10 tw-h-10" :config="icon.imageUri"></SPIcon>
                    </div>
                </div>
                <div class="tw-mt-3 tw-grid tw-grid-cols-2 tw-gap-8">
                    <v-btn @click="cancel" height="50" :flat="true"
                        class="tw-transition tw-duration-300 hover:tw-border-white tw-border-solid tw-border tw-border-transparent tw-rounded-lg tw-text-base tw-border tw-bg-white tw-bg-opacity-5">
                        <span class="tw-mr-2">
                            <v-icon size="1.5rem" icon="mdi-chevron-left"></v-icon>
                        </span>
                        <div>取消</div>
                    </v-btn>
                    <v-btn @click="confirm" height="50" :flat="true"
                        class="tw-transition tw-duration-300 hover:tw-border-white tw-border-solid tw-border tw-border-transparent tw-rounded-lg tw-text-base tw-border tw-bg-white tw-bg-opacity-5">
                        <span class="tw-mr-2">
                            <v-icon size="1.5rem" icon="mdi-check"></v-icon>
                        </span>
                        <span>确认</span>
                    </v-btn>
                </div>
            </div>
        </v-dialog>
    </div>
</template>
<script>
import SPIcon from "@/components/base/SPIcon.vue";
import { apiService } from "@/apis/apis";
import { useStorage } from "@/stores/storage";

export default {
    components: {
        SPIcon
    },
    props: {
        modelValue: '',
    },
    data() {
        return {
            value: '',
            keywords: "",
            modalVisible: false,
            icons: [
                {
                    keywords: ["alipay", "支付宝", "阿里支付", "zhifubao", "ali"],
                    imageUri: "https://static.xxxxxx.com/8ae78348476f4c98457770a7b895b42dcb4bee1285b7cfe47f3e4afbf6744339",
                },
                {
                    keywords: ["bilibili", "哔哩哔哩", "b站"],
                    imageUri: "https://static.xxxxxx.com/72f5b3d7f935d506f0c98c0df24cd03841513441f83f4ca5b9b31460c06db7d6",
                },
                {
                    keywords: ["discord"],
                    imageUri: "https://static.xxxxxx.com/4b9be43ebe70c14f5c2e3674eed81246690fcc98d9589dd6eefc303217483d77",
                },
                {
                    keywords: ["douban", "豆瓣"],
                    imageUri: "https://static.xxxxxx.com/1805ba4edd2896e9c223995fe5f97492e5f974cf74ba4198b41e660ccf9a27c3",
                },
                {
                    keywords: ["dribbble", "dribble"],
                    imageUri: "https://static.xxxxxx.com/fdac7187103ebcf84bd1ea01cc1b9cc1533a57bbe8a172fd63bdf53b773d9865",
                },
                {
                    keywords: ["ethereum", "以太坊", "yitaifang"],
                    imageUri: "https://static.xxxxxx.com/f544525364f4bed5b141149379c86241c24bae375148a4233b20188b38db83f1",
                },
                {
                    keywords: ["github"],
                    imageUri: "https://static.xxxxxx.com/2afc57d8f65fe5649ba2724b352e255e9eb6c01174a2d3cc345d1d5a1183b728",
                },
                {
                    keywords: ["netease-cloud-music", "网易云音乐"],
                    imageUri: "https://static.xxxxxx.com/274d254b26f7c7e34d6043791d2396dc8cedc97a884899099a099786162ac600",
                },
                {
                    keywords: ["paypal"],
                    imageUri: "https://static.xxxxxx.com/4b7299a30bd0e22532fa18d8574217ce3b6c540a67fdb14d5160d530a1f87d63",
                },
                {
                    keywords: ["qq", "腾讯QQ", "tengxunqq"],
                    imageUri: "https://static.xxxxxx.com/fc06c2739a69106a09b2514925e86117165879da7edfdafc4f13cd5323c1d495",
                },
                {
                    keywords: ["qzone", "qq空间", "qqkongjian"],
                    imageUri: "https://static.xxxxxx.com/29cb70fb6a268f2c82db77f1ca7fd4caeb34d34b4c3edc0b7ebeb6418f06fc8d",
                },
                {
                    keywords: ["slack"],
                    imageUri: "https://static.xxxxxx.com/63ee542fa59cc1e308cf7d9ffddef9a67f35d236a60345654576dfb63c0bd488",
                },
                {
                    keywords: ["stackoverflow"],
                    imageUri: "https://static.xxxxxx.com/f41e411a0ef11ce98acf5bac543610016936a4e90008a58ac1b70938142951d6",
                },
                {
                    keywords: ["steam"],
                    imageUri: "https://static.xxxxxx.com/8681e3981f382ad0b54d721efe47cef18c83cd9c72145c8756dbde378ca799d5",
                },
                {
                    keywords: ["taobao", "淘宝"],
                    imageUri: "https://static.xxxxxx.com/a64e294a2488d35ee8f1317a4cae5f66d00045aa87bcf673f79da5b69dd932a2",
                },
                {
                    keywords: ["tiktok", "douyin", "抖音"],
                    imageUri: "https://static.xxxxxx.com/14b7938739839e74299da2d1b2d5f05d5985841dfa697a6699ace90a447a4845",
                },
                {
                    keywords: ["twitter", "推特", "小蓝鸟", "tuite"],
                    imageUri: "https://static.xxxxxx.com/158900e93f31e3b8b3363cb330313ecb15bd248cd551011e317331cde7c409b8",
                },
                {
                    keywords: ["wechat", "微信", "weixin"],
                    imageUri: "https://static.xxxxxx.com/0125d55358f214dd8939a46ae5e7cb3ecd88d9f1dcb6bc9ff7cef553afef2072",
                },
                {
                    keywords: ["weibo", "微博"],
                    imageUri: "https://static.xxxxxx.com/89815ca17833a76349ce3d97afc4a56986db65b824f53279f7194bec76188099",
                },
                {
                    keywords: ["wikipedia", "维基百科", "weijibaike"],
                    imageUri: "https://static.xxxxxx.com/a8f51bad4b480a00db604ba89d927b80559bd819eeb6fba45eddec2b5050183b",
                },
                {
                    keywords: ["zhihu", "知乎", "逼乎"],
                    imageUri: "https://static.xxxxxx.com/8c56fb75d90cbbfc4d55e9d81981f9954c57fddadf2f0e5e8b9d146bf1ccf1ee",
                },
                {
                    imageUri: "https://static.xxxxxx.com/images/6a2b39be850aa528155c8efce551ac86a23b71d06b7266ce65f3d23f1dd6d4b4",
                    keywords: ["acfun", "a站"]
                },
                {
                    imageUri: "https://static.xxxxxx.com/images/2c59a14af8eee70ff7afb51e0d3d96db4c748a08384dcdd66b26543062f374f0",
                    keywords: ["dewu", "得物", "毒"]
                },
                {
                    imageUri: "https://static.xxxxxx.com/images/350d115e1a1f763bd83172c0850fbac435f982b5c2fb3eaaa9d5b2cb1bb23bb6",
                    keywords: ["dongchedi", "懂车帝"]
                },
                {
                    imageUri: "https://static.xxxxxx.com/images/bf328361dce978540ca756c7fde3b284d7d128794fcf787f44559726b7badaa8",
                    keywords: ["haokanvideo", "好看视频", "haokanshipin"]
                },
                {
                    imageUri: "https://static.xxxxxx.com/images/b5d7ec3542d6ef83400c362ef85517993b4e6f268e748abe6212f27374b28289",
                    keywords: ["hupu", "虎扑"]
                },
                {
                    imageUri: "https://static.xxxxxx.com/images/e3399d72d24ba8904bdcf02a1fa7f7cbf985d84b232aa8acf10c85f18a6ea39b",
                    keywords: ["jike", "即刻", "黄即"]
                },
                {
                    imageUri: "https://static.xxxxxx.com/images/7981e4c4bfe301a44bbf96ace985606a3cf0dae84377d1ee4551a073e0577dfe",
                    keywords: ["lizhifm", "荔枝fm"]
                },
                {
                    imageUri: "https://static.xxxxxx.com/images/43e89173b31b62aeac4f996d75b85045ef647adfe527979179a930aa831157b7",
                    keywords: ["maoerfm", "猫儿fm"]
                },
                {
                    imageUri: "https://static.xxxxxx.com/images/01d0b2a9dc618705e92f3c37f9a9298bc0df444adc359d0418eb07675cb2d4ad",
                    keywords: ["pipixia", "皮皮虾"]
                },
                {
                    imageUri: "https://static.xxxxxx.com/images/011255dbe5d35c7e38ed1b90051c2a8bea96502201724ff2c39d4a34486ea751",
                    keywords: ["qqyinyue", "qq音乐"]
                },
                {
                    imageUri: "https://static.xxxxxx.com/images/51991d6447a0f7f5e7944c030dc513dc4deda59d1477a6f0a49c426cd4c76001",
                    keywords: ["soul", "soulapp"]
                },
                {
                    imageUri: "https://static.xxxxxx.com/images/c1e8217fc289f42d8ff03dc46ca12075f35aaa6e426ac9bb0178ecab447f8af4",
                    keywords: ["jinritoutiao", "今日头条"]
                },
                {
                    imageUri: "https://static.xxxxxx.com/images/6bd61f6caf7c30b1bf4a050ff412a872c24001bac047149d38c34629ac5100f4",
                    keywords: ["xianyu", "咸鱼", "闲鱼"]
                },
                {
                    imageUri: "https://static.xxxxxx.com/images/7a0f0164f9a1d6118fff9b46b683c34e8f5489b817fd7bf747c18e1166f415ac",
                    keywords: ["xiaohongshu", "小红书"]
                },
                {
                    imageUri: "https://static.xxxxxx.com/images/06021ea3d0d07d88a2e1c05c55899dd943adff905be819e1355e61a0d5f5e146",
                    keywords: ["xiguavideo", "西瓜视频"]
                },
                {
                    imageUri: "https://static.xxxxxx.com/images/fb6134dc15e704f8b4156baf87458247a23112e5756b8db9f2c3bb3023dbbccb",
                    keywords: ["ximalaya", "喜马拉雅"]
                },
                {
                    imageUri: "https://static.xxxxxx.com/images/9d8f4f7d7025820412dc30f7a0c8d352d4405164439d4acae28b7ca49d4065aa",
                    keywords: ["youku", "优酷视频"]
                },
                {
                    imageUri: 'https://static.xxxxxx.com/images/3aa3004d2f2cfec1e5af50a1e39d48d4dfaf8ef6386f8893fc30ca1a3f09aa88.png',
                    keywords: ["kuaishou", "快手"]
                },
                {
                    imageUri: 'https://static.xxxxxx.com/images/6840f41715904dca970a3b0c0ad4e7d22336acae4386e0ff60beb5993b4f5c20.png',
                    keywords: ["shipinhao", "视频号"]
                }
            ]
        }
    },
    computed: {
        accountId() {
            const { state } = useStorage();
            return state.accountId;
        },
        results() {
            const keywords = this.keywords.toLowerCase();
            if (!keywords) {
                return this.icons;
            }
            const res = [];
            for (let i = 0; i < this.icons.length; i++) {
                const item = this.icons[i]
                for (let j = 0; j < item.keywords.length; j++) {
                    const a = item.keywords[j].toLowerCase().indexOf(keywords) !== -1;
                    const b = keywords.indexOf(item.keywords[j].toLowerCase()) !== -1;
                    if (a || b) {
                        res.push(item);
                        break;
                    }
                }
            }
            return res;
        }
    },
    methods: {
        show() {
            this.value = this.modelValue;
            this.modalVisible = true;
        },
        cancel() {
            this.modalVisible = false;
        },
        confirm() {
            this.$emit('update:modelValue', this.value)
            this.modalVisible = false;
        },
        uploadIcon() {
            if (!this.accountId) {
                showLoginModal();
                return
            }
            this.$refs.uploader.click();
        },
        async chooseImage(files) {
            if (!files) return;
            showLoading();
            const res = await apiService.UploadImage(files[0]);
            hideLoading();
            const imageUri = res?.image_uri || "";
            if (imageUri) {
                this.keywords = '';
                this.value = imageUri;
                this.addIcon(imageUri)
            }
        },
        getIconClass(imageUri) {
            const baseClass = 'tw-border-2 tw-border-solid tw-flex tw-items-center tw-justify-center tw-rounded-2xl tw-flex-shrink-0 tw-w-12 tw-h-12 hover:tw-border-white tw-transition tw-duration-300'
            if (this.value === imageUri) {
                return baseClass + ' tw-border-white'
            }
            return baseClass + ' tw-border-transparent'
        },
        getAccountId() {
            const storage = useStorage()
            return storage.$state.accountId
        },
        addIcon(imageUri) {
            for (let i = 0; i < this.icons.length; i++) {
                if (this.icons[i].imageUri === imageUri) {
                    return
                }
            }
            this.icons.unshift({
                keywords: [],
                imageUri: imageUri
            })
        },
        select(value) {
            this.value = value;
        },
    }
}
</script>