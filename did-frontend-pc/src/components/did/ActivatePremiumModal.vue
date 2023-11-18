<template>
    <div>
        <v-dialog scroll-strategy="block" v-model="visible" scrim="black" width="800">
            <div class="tw-rounded-xl tw-bg-black tw-overflow-hidden">
                <div v-if="isPage('index')" class="tw-px-5 tw-pb-8 tw-bg-white tw-bg-opacity-10">
                    <div
                        class="tw-mb-5 tw-pt-5 tw-text-lg tw-flex tw-flex-row tw-items-center tw-justify-between">
                        <div class="tw-flex tw-items-center">
                            <span>开通会员</span>
                        </div>
                        <div class="tw-flex tw-flex-row">
                            <div @click="hide"
                                 class="tw-px-3 tw-py-1 tw-cursor-pointer tw-transition tw-duration-300 tw-w-fit tw-text-white tw-rounded-md tw-justify-center tw-text-opacity-50 hover:tw-text-opacity-100 hover:tw-bg-opacity-10 tw-bg-white tw-bg-opacity-0 tw-flex tw-items-center">
                                <span class="tw-ml-1 tw-text-base">关闭</span>
                            </div>
                        </div>
                    </div>
                    <div class="tw-overflow-y-auto tw-flex tw-flex-row">
                        <div
                            class="tw-transition-all tw-duration-300 tw-border-transparent tw-border-[#ffc186] tw-border-2 tw-mr-3 tw-w-80 tw-bg-gradient-to-b tw-from-white/5 tw-to-white/9 tw-rounded-xl">
                            <div class="tw-flex tw-justify-center">
                                <div
                                    class="tw-w-24 tw-px-1 tw-py-0.5 tw-justify-center tw-flex tw-flex-row tw-items-center tw-bg-gradient-to-r tw-from-[#efc691] tw-to-[#B38F55] tw-rounded-bl-lg tw-rounded-br-lg">
                                    <span>会员特权</span>
                                </div>
                            </div>
                            <!-- <div class="tw-py-5 tw-flex tw-justify-center tw-items-end">
                             <span class="tw-text-6xl tw-bg-clip-text tw-text-transparent tw-bg-gradient-to-b tw-from-[#ECCEA8] tw-to-[#B38F55]">30</span>
                                <span
                                    class="tw-text-3xl tw-bg-clip-text tw-text-transparent tw-bg-gradient-to-b  tw-from-[#ECCEA8] tw-to-[#B38F55]">/月</span>
                            </div>
                            -->
                            <div class="tw-mt-3 tw-flex tw-justify-center">
                                <div class="tw-tracking-wider">
                                    <div class="tw-flex tw-justify-center tw-pt-3 tw-pb-3">
                                        <div class="tw-w-60">
                                            <div class="tw-flex tw-items-center">
                                                <div class="tw-border-b tw-border-[#D6C6AD] tw-flex-grow"></div>
                                                <span
                                                    class="tw-mx-2 tw-text-[#D6C6AD] tw-text-xs">功能特权</span>
                                                <div class="tw-border-b tw-border-[#D6C6AD] tw-flex-grow"></div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="tw-flex tw-flex-row tw-mb-3">
                                        <img class="tw-w-6"
                                             src="https://static.xxxxxx.com/52995bae1381a5b80f50823713abaf033da41004242838c863f6f609378f115b"/>
                                        <div class="tw-ml-3 tw-text-[#FFECCF]">支持使用视频背景
                                        </div>
                                    </div>
                                    <div class="tw-flex tw-flex-row tw-mb-3">
                                        <img class="tw-w-6"
                                             src="https://static.xxxxxx.com/49ce0e66fdbd6fcd0bca979c6591ee14bb78097c5669ff0f0516a8d9ea36d8de"/>
                                        <div class="tw-ml-3 tw-text-[#FFECCF]">允许创建超过2张的数字身份
                                        </div>
                                    </div>
                                    <div class="tw-flex tw-flex-row tw-mb-3">
                                        <img class="tw-w-6"
                                             src="https://static.xxxxxx.com/27b8b7f877736d322fdff50a07776aa24e28d624ac50fa2382b0d92daab4658c"/>
                                        <div class="tw-ml-3 tw-text-[#FFECCF]">支持修改个性域名
                                        </div>
                                    </div>
                                    <div class="tw-flex tw-flex-row tw-mb-3">
                                        <img class="tw-w-6"
                                             src="https://static.xxxxxx.com/b682c1fae0b22b8a1f8a5d6a09c96f386402e6999bfb3b17d6bf65c1ab8aaca8"/>
                                        <div class="tw-ml-3 tw-text-[#FFECCF]">支持创建数字成就
                                        </div>
                                    </div>
                                    <div class="tw-flex tw-justify-center tw-pt-5 tw-pb-3">
                                        <div class="tw-w-60">
                                            <div class="tw-flex tw-items-center">
                                                <div class="tw-border-b tw-border-[#D6C6AD] tw-flex-grow"></div>
                                                <span
                                                    class="tw-mx-2 tw-text-[#D6C6AD] tw-text-xs">服务特权</span>
                                                <div class="tw-border-b tw-border-[#D6C6AD] tw-flex-grow"></div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="tw-flex tw-flex-row tw-mb-3">
                                        <img class="tw-w-6"
                                             src="https://static.xxxxxx.com/1c20a397988dd624bf3d3f639e0a693b383551bbf4c895bb90fc398e9403677a"/>
                                        <div class="tw-ml-3 tw-text-[#FFECCF]">优先体验实验性功能
                                        </div>
                                    </div>
                                    <div class="tw-flex tw-flex-row tw-mb-3">
                                        <img class="tw-w-6"
                                             src="https://static.xxxxxx.com/95c6295cbfcf59e16f1aa94330a74c61f4bdfcf1c1ce75c647f6f1c9ca7377d2"/>
                                        <div class="tw-ml-3 tw-text-[#FFECCF]">客服极速响应</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div
                            class="tw-transition-all tw-duration-300 tw-border-transparent  tw-border-2 tw-w-[30rem] tw-bg-gradient-to-b tw-from-[#454545] tw-to-[#161616] tw-rounded-xl">
                            <div class="tw-flex tw-justify-center">
                                <div
                                    class="tw-w-32 tw-px-1 tw-py-0.5 tw-justify-center tw-flex tw-flex-row tw-items-center tw-bg-gradient-to-r tw-from-[#efc691] tw-to-[#B38F55] tw-rounded-bl-lg tw-rounded-br-lg">
                                    <span>限时活动</span>
                                </div>
                            </div>
                            <div class="tw-px-10 tw-pb-8">
                                <div class="tw-text-sm tw-bg-white/5 tw-rounded-lg tw-mt-3 tw-p-2">
                                    在活动期间，将你的数字身份链接贴到你的社交媒体简介中，即可免费领取会员，享有所有会员特权。
                                </div>
                                <div class="tw-mt-3">
                                    完成下面任意一个引导任务，即可领取会员：
                                </div>
                                <div class="tw-flex tw-flex-col  tw-cursor-pointer">
                                    <div
                                        @click="switchPage('bilibili')"
                                        class="tw-mt-2 tw-transition-all tw-duration-300 tw-border-transparent hover:tw-border-white tw-border-2 tw-flex tw-flex-row tw-items-center tw-bg-white/5 tw-py-3 tw-px-3 tw-rounded-xl">
                                        <div class="tw-mr-3 tw-flex tw-items-center">
                                            <img
                                                class="tw-w-10"
                                                src="https://static.xxxxxx.com/72f5b3d7f935d506f0c98c0df24cd03841513441f83f4ca5b9b31460c06db7d6"
                                                alt="">
                                        </div>
                                        <div>
                                            <div class="tw-text-sm tw-mb-0.5">哔哩哔哩</div>
                                            <div class="tw-text-xs tw-text-white/60">预计1分钟</div>
                                        </div>
                                        <div class="tw-flex tw-justify-end tw-grow pr-2">
                                            <img
                                                class="tw-w-2"
                                                src="https://static.xxxxxx.com/6eab787e5655ab48c75588a4667729be638d90a38a51c0379cf5a3a91370544f"
                                                alt="">
                                        </div>
                                    </div>
                                    <div
                                        @click="switchPage('xiaohongshu')"
                                        class="tw-mt-2 tw-transition-all tw-duration-300 tw-border-transparent hover:tw-border-white tw-border-2 tw-flex tw-flex-row tw-items-center tw-bg-white/5 tw-py-3 tw-px-3 tw-rounded-xl">
                                        <div class="tw-mr-3 tw-flex tw-items-center">
                                            <img
                                                class="tw-w-10"
                                                src="https://static.xxxxxx.com/images/7a0f0164f9a1d6118fff9b46b683c34e8f5489b817fd7bf747c18e1166f415ac"
                                                alt="">
                                        </div>
                                        <div>
                                            <div class="tw-text-sm tw-mb-0.5">小红书</div>
                                            <div class="tw-text-xs tw-text-white/60">预计1分钟</div>
                                        </div>
                                        <div class="tw-flex tw-justify-end tw-grow pr-2">
                                            <img
                                                class="tw-w-2"
                                                src="https://static.xxxxxx.com/6eab787e5655ab48c75588a4667729be638d90a38a51c0379cf5a3a91370544f"
                                                alt="">
                                        </div>
                                    </div>
                                    <div
                                        @click="switchPage('weibo')"
                                        class="tw-mt-2 tw-transition-all tw-duration-300 tw-border-transparent hover:tw-border-white tw-border-2 tw-flex tw-flex-row tw-items-center tw-bg-white/5 tw-py-3 tw-px-3 tw-rounded-xl">
                                        <div class="tw-mr-3 tw-flex tw-items-center">
                                            <img
                                                class="tw-w-10"
                                                src="https://static.xxxxxx.com/89815ca17833a76349ce3d97afc4a56986db65b824f53279f7194bec76188099"
                                                alt="">
                                        </div>
                                        <div>
                                            <div class="tw-text-sm tw-mb-0.5">微博</div>
                                            <div class="tw-text-xs tw-text-white/60">预计1分钟</div>
                                        </div>
                                        <div class="tw-flex tw-justify-end tw-grow pr-2">
                                            <img
                                                class="tw-w-2"
                                                src="https://static.xxxxxx.com/6eab787e5655ab48c75588a4667729be638d90a38a51c0379cf5a3a91370544f"
                                                alt="">
                                        </div>
                                    </div>
                                    <div
                                        @click="switchPage('zhihu')"
                                        class="tw-mt-2 tw-transition-all tw-duration-300 tw-border-transparent hover:tw-border-white tw-border-2 tw-flex tw-flex-row tw-items-center tw-bg-white/5 tw-py-3 tw-px-3 tw-rounded-xl">
                                        <div class="tw-mr-3 tw-flex tw-items-center">
                                            <img
                                                class="tw-w-10"
                                                src="https://static.xxxxxx.com/8c56fb75d90cbbfc4d55e9d81981f9954c57fddadf2f0e5e8b9d146bf1ccf1ee"
                                                alt="">
                                        </div>
                                        <div>
                                            <div class="tw-text-sm tw-mb-0.5">知乎</div>
                                            <div class="tw-text-xs tw-text-white/60">预计1分钟</div>
                                        </div>
                                        <div class="tw-flex tw-justify-end tw-grow pr-2">
                                            <img
                                                class="tw-w-2"
                                                src="https://static.xxxxxx.com/6eab787e5655ab48c75588a4667729be638d90a38a51c0379cf5a3a91370544f"
                                                alt="">
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div v-if="isPage('weibo')" class="tw-px-5 tw-pb-8 tw-bg-white tw-bg-opacity-10">
                    <div
                        class="tw-mb-5 tw-pt-5 tw-text-lg tw-flex tw-flex-row tw-items-center tw-justify-between">
                        <div class="tw-flex tw-items-center">
                            <span>通过微博免费激活会员</span>
                        </div>
                        <div class="tw-flex tw-flex-row">
                            <div @click="switchPage('index')"
                                 class="tw-px-3 tw-mr-3 tw-py-1 tw-cursor-pointer tw-transition tw-duration-300 tw-w-fit tw-text-white tw-rounded-md tw-justify-center tw-text-opacity-50 hover:tw-text-opacity-100 hover:tw-bg-opacity-10 tw-bg-white tw-bg-opacity-0 tw-flex tw-items-center">
                                <v-icon icon="mdi-arrow-left"></v-icon>
                                <span class="tw-ml-1 tw-text-base">返回</span>
                            </div>
                            <div @click="hide"
                                 class="tw-px-3 tw-mr-3 tw-py-1 tw-cursor-pointer tw-transition tw-duration-300 tw-w-fit tw-text-white tw-rounded-md tw-justify-center tw-text-opacity-50 hover:tw-text-opacity-100 hover:tw-bg-opacity-10 tw-bg-white tw-bg-opacity-0 tw-flex tw-items-center">
                                <span class="tw-ml-1 tw-text-base">关闭</span>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div>
                            <div class="tw-flex tw-flex-row">
                                <div
                                    class=" tw-mr-2 tw-rounded-full tw-bg-white/10 tw-w-6 tw-h-6 tw-flex tw-items-center tw-justify-center">
                                    1
                                </div>
                                点击复制你的数字身份链接
                            </div>
                            <div
                                @click="copyLink"
                                class="tw-bg-white/5 tw-rounded-lg tw-h-12 tw-items-center tw-flex tw-justify-between tw-transition tw-duration-300 hover:tw-border-white tw-border-transparent tw-border-solid tw-border-2 tw-pr-2.5 tw-px-3 tw-my-2">
                            <span
                                class="tw-text-white tw-whitespace-nowrap tw-font-bold tw-text-lg tw-italic">{{
                                    link
                                }}</span>
                                <span class="tw-flex tw-items-center tw-ml-2">
                                    <img class="tw-w-4 tw-h-4"
                                         src="https://static.xxxxxx.com/6596fd440b55064e9b314a71b82d0966ad872c9354e7671477cbd691a829c47c"
                                    >
                                </span>
                            </div>
                        </div>
                        <div class="tw-mt-8">
                            <div class="tw-flex tw-flex-row tw-mb-3">
                                <div
                                    class=" tw-mr-2 tw-rounded-full tw-bg-white/10 tw-w-6 tw-h-6 tw-flex tw-items-center tw-justify-center">
                                    2
                                </div>
                                <div>打开微博的 <span
                                    class="tw-text-[#FE72C6] tw-font-bold">账号信息设置</span> 页面,
                                    将第一步复制的链接粘贴到 <span
                                        class="tw-text-[#FE72C6] tw-font-bold">简介</span> 中任意位置并保存
                                </div>
                            </div>
                            <div @click="open('https://weibo.com/set/index')"
                                 class="tw-bg-white/5 tw-rounded-lg tw-h-12 tw-items-center tw-flex tw-justify-between tw-transition tw-duration-300 hover:tw-border-white tw-border-transparent tw-border-solid tw-border-2 tw-pr-2.5 tw-px-3 tw-my-2">
                                <div class="tw-flex tw-flex-row tw-items-center">

                                    <span class="tw-ml-2">打开微博账号信息设置页面</span>
                                </div>
                                <img
                                    class="tw-w-6 tw-h-6"
                                    src="https://static.xxxxxx.com/89815ca17833a76349ce3d97afc4a56986db65b824f53279f7194bec76188099"
                                    alt="">
                            </div>
                        </div>
                        <div class="tw-mt-8">
                            <div class="tw-flex tw-flex-row tw-mb-3">
                                <div
                                    class="tw-mr-2 tw-rounded-full tw-bg-white/10 tw-w-6 tw-h-6 tw-flex tw-items-center tw-justify-center">
                                    3
                                </div>
                                <div>第三步: 将你的微博的 <span
                                    class="tw-text-[#FE72C6] tw-font-bold">个人主页链接</span>
                                    粘贴到下方,
                                    点击认证即可完成会员的领取
                                </div>
                            </div>

                            <div class="tw-mt-5 tw-flex tw-flex-row tw-items-center">
                                <v-text-field hide-details :persistent-placeholder="true"
                                              rounded="lg"
                                              type="text" label="微博个人主页链接"
                                              variant="outlined" v-model="weiboProfileUrl"
                                              placeholder="https://weibo.com/u/..."/>
                                <v-btn @click="weiboVerify" height="55" :flat="true"
                                       class="tw-ml-2 tw-transition tw-duration-300 hover:tw-border-white tw-border-solid tw-border tw-border-transparent tw-rounded-xl tw-text-base tw-bg-white tw-bg-opacity-5">
                                    <div
                                        class="tw-text-white tw-px-5 tw-text-base tw-flex tw-items-center tw-justify-center tw-py-3.5 tw-whitespace-nowrap">
                                        <span>认证</span>
                                    </div>
                                </v-btn>
                            </div>
                        </div>
                        <div class="tw-flex tw-flex-row">
                            <div
                                @click="showVideoModal('如何获取微博的个人主页链接', 'https://static.xxxxxx.com/29e5647e1eb9b2c1d5a82ff48852a78619aa25b3886f7425c06208b1203098b6')"
                                class="tw-opacity-50 hover:tw-opacity-100 tw-transition-all tw-duration-300 tw-cursor-pointer tw-bg-white/10 tw-rounded tw-px-3 tw-py-0.5 tw-mt-3">
                                <div class="tw-flex tw-items-center">
                                    <img
                                        src="https://static.xxxxxx.com/d55c071d5d772ffd86689252bb4744b8767a105291c25578f3e9afa063475218"
                                        alt="">
                                    <span
                                        class="tw-ml-1">不知道如何获取微博的个人主页链接? 点我查看帮助视频</span>
                                </div>
                            </div>
                        </div>
                        <div class="tw-mt-3"></div>
                    </div>
                </div>
                <div v-if="isPage('bilibili')" class="tw-px-5 tw-pb-8 tw-bg-white tw-bg-opacity-10">
                    <div
                        class="tw-mb-5 tw-pt-5 tw-text-lg tw-flex tw-flex-row tw-items-center tw-justify-between">
                        <div class="tw-flex tw-items-center">
                            <span>通过哔哩哔哩免费激活会员</span>
                        </div>
                        <div class="tw-flex tw-flex-row">
                            <div @click="switchPage('index')"
                                 class="tw-px-3 tw-mr-3 tw-py-1 tw-cursor-pointer tw-transition tw-duration-300 tw-w-fit tw-text-white tw-rounded-md tw-justify-center tw-text-opacity-50 hover:tw-text-opacity-100 hover:tw-bg-opacity-10 tw-bg-white tw-bg-opacity-0 tw-flex tw-items-center">
                                <v-icon icon="mdi-arrow-left"></v-icon>
                                <span class="tw-ml-1 tw-text-base">返回</span>
                            </div>
                            <div @click="hide"
                                 class="tw-px-3 tw-mr-3 tw-py-1 tw-cursor-pointer tw-transition tw-duration-300 tw-w-fit tw-text-white tw-rounded-md tw-justify-center tw-text-opacity-50 hover:tw-text-opacity-100 hover:tw-bg-opacity-10 tw-bg-white tw-bg-opacity-0 tw-flex tw-items-center">
                                <span class="tw-ml-1 tw-text-base">关闭</span>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div>
                            <div class="tw-flex tw-flex-row">
                                <div
                                    class=" tw-mr-2 tw-rounded-full tw-bg-white/10 tw-w-6 tw-h-6 tw-flex tw-items-center tw-justify-center">
                                    1
                                </div>
                                点击复制你的数字身份链接
                            </div>
                            <div
                                @click="copyLink"
                                class="tw-bg-white/5 tw-rounded-lg tw-h-12 tw-items-center tw-flex tw-justify-between tw-transition tw-duration-300 hover:tw-border-white tw-border-transparent tw-border-solid tw-border-2 tw-pr-2.5 tw-px-3 tw-my-2">
                            <span
                                class="tw-text-white tw-whitespace-nowrap tw-font-bold tw-text-lg tw-italic">{{
                                    link
                                }}</span>
                                <span class="tw-flex tw-items-center tw-ml-2">
                                    <img class="tw-w-4 tw-h-4"
                                         src="https://static.xxxxxx.com/6596fd440b55064e9b314a71b82d0966ad872c9354e7671477cbd691a829c47c"
                                    >
                                </span>
                            </div>
                        </div>
                        <div class="tw-mt-8">
                            <div class="tw-flex tw-flex-row tw-mb-3">
                                <div
                                    class=" tw-mr-2 tw-rounded-full tw-bg-white/10 tw-w-6 tw-h-6 tw-flex tw-items-center tw-justify-center">
                                    2
                                </div>
                                <div>打开哔哩哔哩的 <span
                                    class="tw-text-[#FE72C6] tw-font-bold">账号信息设置</span> 页面,
                                    将第一步复制的链接粘贴到 <span
                                        class="tw-text-[#FE72C6] tw-font-bold">简介</span> 中任意位置并保存
                                </div>
                            </div>
                            <div @click="open('https://account.bilibili.com/account/setting')"
                                 class="tw-bg-white/5 tw-rounded-lg tw-h-12 tw-items-center tw-flex tw-justify-between tw-transition tw-duration-300 hover:tw-border-white tw-border-transparent tw-border-solid tw-border-2 tw-pr-2.5 tw-px-3 tw-my-2">
                                <div class="tw-flex tw-flex-row tw-items-center">
                                    <span class="tw-ml-2">打开哔哩哔哩账号信息设置页面</span>
                                </div>
                                <img
                                    class="tw-w-6 tw-h-6"
                                    src="https://static.xxxxxx.com/72f5b3d7f935d506f0c98c0df24cd03841513441f83f4ca5b9b31460c06db7d6"
                                    alt="">
                            </div>
                        </div>
                        <div class="tw-mt-8">
                            <div class="tw-flex tw-flex-row tw-mb-3">
                                <div
                                    class="tw-mr-2 tw-rounded-full tw-bg-white/10 tw-w-6 tw-h-6 tw-flex tw-items-center tw-justify-center">
                                    3
                                </div>
                                <div>第三步: 将你的哔哩哔哩的 <span
                                    class="tw-text-[#FE72C6] tw-font-bold">个人主页链接</span>
                                    粘贴到下方,
                                    点击认证即可完成会员的领取
                                </div>
                            </div>

                            <div class="tw-mt-5 tw-flex tw-flex-row tw-items-center">
                                <v-text-field hide-details :persistent-placeholder="true"
                                              rounded="lg"
                                              type="text" label="哔哩哔哩个人主页链接"
                                              variant="outlined" v-model="bilibiliProfileUrl"
                                              placeholder="https://space.bilibili.com/..."/>
                                <v-btn @click="bilibiliVerify" height="55" :flat="true"
                                       class="tw-ml-2 tw-transition tw-duration-300 hover:tw-border-white tw-border-solid tw-border tw-border-transparent tw-rounded-xl tw-text-base tw-bg-white tw-bg-opacity-5">
                                    <div
                                        class="tw-text-white tw-px-5 tw-text-base tw-flex tw-items-center tw-justify-center tw-py-3.5 tw-whitespace-nowrap">
                                        <span>认证</span>
                                    </div>
                                </v-btn>
                            </div>
                        </div>
                        <div class="tw-flex tw-flex-row">
                            <div
                                @click="showVideoModal('如何获取哔哩哔哩的个人主页链接', 'https://static.xxxxxx.com/b2f236c17e9181a25b62a29882c22bd5bf1850c847f4ead1107fede1aa6ce46d')"
                                class="tw-opacity-50 hover:tw-opacity-100 tw-transition-all tw-duration-300 tw-cursor-pointer tw-bg-white/10 tw-rounded tw-px-3 tw-py-0.5 tw-mt-3">
                                <div class="tw-flex tw-items-center">
                                    <img
                                        src="https://static.xxxxxx.com/d55c071d5d772ffd86689252bb4744b8767a105291c25578f3e9afa063475218"
                                        alt="">
                                    <span
                                        class="tw-ml-1">不知道如何获取哔哩哔哩的个人主页链接? 点我查看帮助视频</span>
                                </div>
                            </div>
                        </div>
                        <div class="tw-mt-3"></div>
                    </div>
                </div>
                <div v-if="isPage('xiaohongshu')"
                     class="tw-px-5 tw-pb-8 tw-bg-white tw-bg-opacity-10">
                    <div
                        class="tw-mb-5 tw-pt-5 tw-text-lg tw-flex tw-flex-row tw-items-center tw-justify-between">
                        <div class="tw-flex tw-items-center">
                            <span>通过小红书免费激活会员</span>
                        </div>
                        <div class="tw-flex tw-flex-row">
                            <div @click="switchPage('index')"
                                 class="tw-px-3 tw-mr-3 tw-py-1 tw-cursor-pointer tw-transition tw-duration-300 tw-w-fit tw-text-white tw-rounded-md tw-justify-center tw-text-opacity-50 hover:tw-text-opacity-100 hover:tw-bg-opacity-10 tw-bg-white tw-bg-opacity-0 tw-flex tw-items-center">
                                <v-icon icon="mdi-arrow-left"></v-icon>
                                <span class="tw-ml-1 tw-text-base">返回</span>
                            </div>
                            <div @click="hide"
                                 class="tw-px-3 tw-mr-3 tw-py-1 tw-cursor-pointer tw-transition tw-duration-300 tw-w-fit tw-text-white tw-rounded-md tw-justify-center tw-text-opacity-50 hover:tw-text-opacity-100 hover:tw-bg-opacity-10 tw-bg-white tw-bg-opacity-0 tw-flex tw-items-center">
                                <span class="tw-ml-1 tw-text-base">关闭</span>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div>
                            <div class="tw-flex tw-flex-row">
                                <div
                                    class=" tw-mr-2 tw-rounded-full tw-bg-white/10 tw-w-6 tw-h-6 tw-flex tw-items-center tw-justify-center">
                                    1
                                </div>
                                点击复制你的数字身份链接
                            </div>
                            <div
                                @click="copyLink"
                                class="tw-bg-white/5 tw-rounded-lg tw-h-12 tw-items-center tw-flex tw-justify-between tw-transition tw-duration-300 hover:tw-border-white tw-border-transparent tw-border-solid tw-border-2 tw-pr-2.5 tw-px-3 tw-my-2">
                            <span
                                class="tw-text-white tw-whitespace-nowrap tw-font-bold tw-text-lg tw-italic">{{
                                    link
                                }}</span>
                                <span class="tw-flex tw-items-center tw-ml-2">
                                    <img class="tw-w-4 tw-h-4"
                                         src="https://static.xxxxxx.com/6596fd440b55064e9b314a71b82d0966ad872c9354e7671477cbd691a829c47c"
                                    >
                                </span>
                            </div>
                        </div>
                        <div class="tw-mt-8">
                            <div class="tw-flex tw-flex-row tw-mb-3">
                                <div
                                    class=" tw-mr-2 tw-rounded-full tw-bg-white/10 tw-w-6 tw-h-6 tw-flex tw-items-center tw-justify-center">
                                    2
                                </div>
                                <div>由于小红书网页版不支持修改简介，请打开小红书app，将第一步的链接添加到
                                    <span
                                        class="tw-text-[#FE72C6] tw-font-bold">简介</span> 中任意位置并保存
                                </div>
                            </div>
                        </div>
                        <div class="tw-mt-8">
                            <div class="tw-flex tw-flex-row tw-mb-3">
                                <div
                                    class="tw-mr-2 tw-rounded-full tw-bg-white/10 tw-w-6 tw-h-6 tw-flex tw-items-center tw-justify-center">
                                    3
                                </div>
                                <div>第三步: 将你的小红书的 <span
                                    class="tw-text-[#FE72C6] tw-font-bold">个人主页链接</span>
                                    粘贴到下方，
                                    点击认证即可完成会员的领取
                                </div>
                            </div>

                            <div class="tw-mt-5 tw-flex tw-flex-row tw-items-center">
                                <v-text-field hide-details :persistent-placeholder="true"
                                              rounded="lg"
                                              type="text" label="小红书个人主页链接"
                                              variant="outlined" v-model="xiaohongshuProfileUrl"
                                              placeholder="https://www.xiaohongshu.com/user/profile/..."/>
                                <v-btn @click="xiaohongshuVerify" height="55" :flat="true"
                                       class="tw-ml-2 tw-transition tw-duration-300 hover:tw-border-white tw-border-solid tw-border tw-border-transparent tw-rounded-xl tw-text-base tw-bg-white tw-bg-opacity-5">
                                    <div
                                        class="tw-text-white tw-px-5 tw-text-base tw-flex tw-items-center tw-justify-center tw-py-3.5 tw-whitespace-nowrap">
                                        <span>认证</span>
                                    </div>
                                </v-btn>
                            </div>
                        </div>
                        <div class="tw-flex tw-flex-row">
                            <div
                                @click="showVideoModal('如何获取小红书的个人主页链接', 'https://static.xxxxxx.com/21cd674c7afe50d0b925d6787164433269850bd2ffe8c42518496a8d0189bca0')"
                                class="tw-opacity-50 hover:tw-opacity-100 tw-transition-all tw-duration-300 tw-cursor-pointer tw-bg-white/10 tw-rounded tw-px-3 tw-py-0.5 tw-mt-3">
                                <div class="tw-flex tw-items-center">
                                    <img
                                        src="https://static.xxxxxx.com/d55c071d5d772ffd86689252bb4744b8767a105291c25578f3e9afa063475218"
                                        alt="">
                                    <span
                                        class="tw-ml-1">不知道如何获取小红书的个人主页链接? 点我查看帮助视频</span>
                                </div>
                            </div>
                        </div>
                        <div class="tw-mt-3"></div>
                    </div>
                </div>
                <div v-if="isPage('zhihu')" class="tw-px-5 tw-pb-8 tw-bg-white tw-bg-opacity-10">
                    <div
                        class="tw-mb-5 tw-pt-5 tw-text-lg tw-flex tw-flex-row tw-items-center tw-justify-between">
                        <div class="tw-flex tw-items-center">
                            <span>通过知乎免费激活会员</span>
                        </div>
                        <div class="tw-flex tw-flex-row">
                            <div @click="switchPage('index')"
                                 class="tw-px-3 tw-mr-3 tw-py-1 tw-cursor-pointer tw-transition tw-duration-300 tw-w-fit tw-text-white tw-rounded-md tw-justify-center tw-text-opacity-50 hover:tw-text-opacity-100 hover:tw-bg-opacity-10 tw-bg-white tw-bg-opacity-0 tw-flex tw-items-center">
                                <v-icon icon="mdi-arrow-left"></v-icon>
                                <span class="tw-ml-1 tw-text-base">返回</span>
                            </div>
                            <div @click="hide"
                                 class="tw-px-3 tw-mr-3 tw-py-1 tw-cursor-pointer tw-transition tw-duration-300 tw-w-fit tw-text-white tw-rounded-md tw-justify-center tw-text-opacity-50 hover:tw-text-opacity-100 hover:tw-bg-opacity-10 tw-bg-white tw-bg-opacity-0 tw-flex tw-items-center">
                                <span class="tw-ml-1 tw-text-base">关闭</span>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div>
                            <div class="tw-flex tw-flex-row">
                                <div
                                    class=" tw-mr-2 tw-rounded-full tw-bg-white/10 tw-w-6 tw-h-6 tw-flex tw-items-center tw-justify-center">
                                    1
                                </div>
                                点击复制你的数字身份链接
                            </div>
                            <div
                                @click="copyLink"
                                class="tw-bg-white/5 tw-rounded-lg tw-h-12 tw-items-center tw-flex tw-justify-between tw-transition tw-duration-300 hover:tw-border-white tw-border-transparent tw-border-solid tw-border-2 tw-pr-2.5 tw-px-3 tw-my-2">
                            <span
                                class="tw-text-white tw-whitespace-nowrap tw-font-bold tw-text-lg tw-italic">{{
                                    link
                                }}</span>
                                <span class="tw-flex tw-items-center tw-ml-2">
                                    <img class="tw-w-4 tw-h-4"
                                         src="https://static.xxxxxx.com/6596fd440b55064e9b314a71b82d0966ad872c9354e7671477cbd691a829c47c"
                                    >
                                </span>
                            </div>
                        </div>
                        <div class="tw-mt-8">
                            <div class="tw-flex tw-flex-row tw-mb-3">
                                <div
                                    class=" tw-mr-2 tw-rounded-full tw-bg-white/10 tw-w-6 tw-h-6 tw-flex tw-items-center tw-justify-center">
                                    2
                                </div>
                                <div>打开知乎的 <span
                                    class="tw-text-[#FE72C6] tw-font-bold">账号信息设置</span> 页面,
                                    将第一步复制的链接粘贴到
                                    <span class="tw-text-[#FE72C6] tw-font-bold">一句话介绍</span>
                                    或
                                    <span class="tw-text-[#FE72C6] tw-font-bold">个人简介</span>
                                    中任意位置并保存
                                </div>
                            </div>
                            <div @click="open('https://www.zhihu.com/people/edit')"
                                 class="tw-bg-white/5 tw-rounded-lg tw-h-12 tw-items-center tw-flex tw-justify-between tw-transition tw-duration-300 hover:tw-border-white tw-border-transparent tw-border-solid tw-border-2 tw-pr-2.5 tw-px-3 tw-my-2">
                                <div class="tw-flex tw-flex-row tw-items-center">
                                    <span class="tw-ml-2">打开知乎账号信息设置页面</span>
                                </div>
                                <img
                                    class="tw-w-6 tw-h-6"
                                    src="https://static.xxxxxx.com/8c56fb75d90cbbfc4d55e9d81981f9954c57fddadf2f0e5e8b9d146bf1ccf1ee"
                                    alt="">
                            </div>
                        </div>
                        <div class="tw-mt-8">
                            <div class="tw-flex tw-flex-row tw-mb-3">
                                <div
                                    class="tw-mr-2 tw-rounded-full tw-bg-white/10 tw-w-6 tw-h-6 tw-flex tw-items-center tw-justify-center">
                                    3
                                </div>
                                <div>第三步: 将你的知乎的 <span
                                    class="tw-text-[#FE72C6] tw-font-bold">个人主页链接</span>
                                    粘贴到下方,
                                    点击认证即可完成会员的领取
                                </div>
                            </div>

                            <div class="tw-mt-5 tw-flex tw-flex-row tw-items-center">
                                <v-text-field hide-details :persistent-placeholder="true"
                                              rounded="lg"
                                              type="text" label="知乎个人主页链接"
                                              variant="outlined" v-model="zhihuProfileUrl"
                                              placeholder="https://www.zhihu.com/people/..."/>
                                <v-btn @click="zhihuVerify" height="55" :flat="true"
                                       class="tw-ml-2 tw-transition tw-duration-300 hover:tw-border-white tw-border-solid tw-border tw-border-transparent tw-rounded-xl tw-text-base tw-bg-white tw-bg-opacity-5">
                                    <div
                                        class="tw-text-white tw-px-5 tw-text-base tw-flex tw-items-center tw-justify-center tw-py-3.5 tw-whitespace-nowrap">
                                        <span>认证</span>
                                    </div>
                                </v-btn>
                            </div>
                        </div>
                        <div class="tw-flex tw-flex-row">
                            <div
                                @click="showVideoModal('如何获取知乎的个人主页链接', 'https://static.xxxxxx.com/aaa3609bfecacae63c62eb5c4bbc0b3450cac25037e8bed6fad372d8824aebcd')"
                                class="tw-opacity-50 hover:tw-opacity-100 tw-transition-all tw-duration-300 tw-cursor-pointer tw-bg-white/10 tw-rounded tw-px-3 tw-py-0.5 tw-mt-3">
                                <div class="tw-flex tw-items-center">
                                    <img
                                        src="https://static.xxxxxx.com/d55c071d5d772ffd86689252bb4744b8767a105291c25578f3e9afa063475218"
                                        alt="">
                                    <span
                                        class="tw-ml-1">不知道如何获取知乎的个人主页链接? 点我查看帮助视频</span>
                                </div>
                            </div>
                        </div>
                        <div class="tw-mt-3"></div>
                    </div>
                </div>
            </div>
        </v-dialog>
    </div>
    <div>
        <VideoModal ref="VideoModal"></VideoModal>
    </div>
</template>
<script>
import SPIcon from "@/components/base/SPIcon.vue";
import IconFont from "@/components/base/IconFont.vue";
import TextBox from "@/components/base/TextBox.vue";
import {
    openLink,
    copyClipboard,
    parseWeiboUID,
    parseBilibiliUID,
    parseXiaohongshuUID, parseZhihuUID, withLoading
} from "@/library/util";
import VideoModal from "@/components/base/VideoModal.vue";
import {apiService} from "@/apis/apis";
import {useStorage} from "@/stores/storage";

export default {
    props: {
        profile: {},
    },
    components: {
        VideoModal,
        TextBox,
        SPIcon,
        IconFont,
    },
    data() {
        return {
            page: '',
            link: '',
            visible: false,
            weiboProfileUrl: '',
            bilibiliProfileUrl: '',
            xiaohongshuProfileUrl: '',
            zhihuProfileUrl: '',
        }
    },
    methods: {
        showVideoModal(title, url) {
            this.$refs.VideoModal.show(title, url);
        },
        switchPage(page) {
            this.page = page;
        },
        async weiboVerify() {
            const uid = parseWeiboUID(this.weiboProfileUrl)
            if (!uid) {
                showToast({
                    message: "无法识别的链接",
                    type: "error",
                });
                return
            }
            await this.verify('weibo', uid)
        },
        async bilibiliVerify() {
            const uid = parseBilibiliUID(this.bilibiliProfileUrl)
            if (!uid) {
                showToast({
                    message: "无法识别的链接",
                    type: "error",
                });
                return
            }
            await this.verify('bilibili', uid)
        },
        async xiaohongshuVerify() {
            const uid = parseXiaohongshuUID(this.xiaohongshuProfileUrl)
            if (!uid) {
                showToast({
                    message: "无法识别的链接",
                    type: "error",
                });
                return
            }
            await this.verify('xiaohongshu', uid)
        },
        async zhihuVerify() {
            const uid = parseZhihuUID(this.zhihuProfileUrl)
            if (!uid) {
                showToast({
                    message: "无法识别的链接",
                    type: "error",
                });
                return
            }
            await this.verify('zhihu', uid)
        },
        async verify(platform, uid) {
            const res = await withLoading(async () => {
                const res = await apiService.ActivatePremiumBySocialMediaDesc(
                    this.profile.spec.profileId,
                    platform,
                    uid
                )
                this.hide()
            })
            const {commitMe} = useStorage();
            let me = await apiService.Me();
            commitMe(me);
            showToast({
                message: "恭喜，激活成功",
                icon: "mdi-check-circle-outline",
            })
        },
        open(url) {
            openLink(url);
        },
        copyLink() {
            copyClipboard(this.link)
        },
        isPage(name) {
            return this.page === name
        },
        show() {
            this.visible = true;
            this.reset()
        },
        hide() {
            this.visible = false;
        },
        reset() {
            this.page = 'index';
            const slug = this.profile.spec.slug;
            this.link = `xxxxxx.com/${slug}`
        }
    }
}
</script>