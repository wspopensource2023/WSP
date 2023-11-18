<template>
    <div>
        <div @click="show">
            <slot></slot>
        </div>
        <uni-popup ref="modal">
            <div style="background: linear-gradient(180deg, #252525 0%, #181818 100%); "
                class="tw-rounded-t-xl tw-text-white tw-px-3 tw-overflow-hidden">
                <div class="tw-relative tw-flex tw-flex-row tw-items-center tw-justify-center tw-py-3 tw-text-sm">
                    <div>立即分享给好友</div>
                    <div class="tw-absolute tw-top-0 tw-right-0">
                        <div class="tw-relative tw-flex tw-flex-row tw-items-center tw-py-3 tw-opacity-60">
                            <div @click="hide"
                                class="tw-flex tw-items-center tw-justify-center tw-w-4 tw-h-4 tw-bg-white tw-bg-opacity-10 tw-rounded-full tw-p-0.5">
                                <img class="tw-w-3 tw-h-3"
                                    src="https://static.xxxxxx.com/63d2ad6ca4076d87299a85e2373bb5ad53a73ab1857c51c33930790f5cb3090e" />
                            </div>
                        </div>
                    </div>
                </div>
                <div class="tw-pt-3">
                    <div class="tw-flex tw-justify-center">
                        <img class="tw-w-52 tw-h-52" :src="qrcodeImageUri" alt="">
                    </div>
                    <div class="tw-grid tw-grid-cols-2 tw-gap-3 tw-mt-3 tw-py-3">
                        <button @click="hide"
                            class="tw-w-full tw-rounded-xl tw-bg-white tw-bg-opacity-5 hover:tw-bg-opacity-10 tw-transition">
                            <div class="tw-text-white tw-text-base tw-flex tw-items-center tw-justify-center tw-py-3.5">
                                <img class="tw-w-5 tw-h-5 tw-mr-2"
                                    src="https://static.xxxxxx.com/mdi/af8ebf95055ff7a71f265a8bcaad2eec569d30d0eabe56239b03602f7da20e76" />
                                <span>返回</span>
                            </div>
                        </button>
                        <button
							// #ifdef MP-WEIXIN
							@click="saveImage()"
							// #endif
							
							// #ifdef H5
							@click="download"
							// #endif
                            class="tw-w-full tw-rounded-xl tw-bg-white tw-bg-opacity-5 hover:tw-bg-opacity-10 tw-transition">
                            <div class="tw-text-white tw-text-base tw-flex tw-items-center tw-justify-center tw-py-3.5">
                                <img class="tw-w-5 tw-h-5 tw-mr-2"
                                    src="https://static.xxxxxx.com/ca0f0aae05c7c98b63e2bb55dbe42f845d46623f40ba2ba48143737cb286c0f5" />
                                <span>下载二维码</span>
                            </div>
                        </button>
                    </div>
                </div>
            </div>
        </uni-popup>
    </div>
</template>
<script>
import SPIcon from "@/components/base/SPIcon.vue";
import { getShareLink } from "@/library/util";
import { apiService } from "@/library/apis";

export default {
    components: {
        SPIcon,
    },
    props: {
        profile: {}
    },
    data() {
        return {
            qrcodeImageUri: '',
        };
    },
    computed: {
        filename() {
            const title = this.profile.spec.slug;
            return `${title} - xxxxxx.com.png`;
        }
    },
    methods: {
        hide() {
            this.$refs.modal.close();
        },
        download() {
            const self = this;
            var xhr = new XMLHttpRequest();
            xhr.open('GET', this.qrcodeImageUri, true);
            xhr.responseType = 'blob';
            xhr.onload = function (e) {
                if (this.status == 200) {
                    var blob = new Blob([this.response], { type: 'image/png' });
                    var downloadLink = document.createElement('a');
                    downloadLink.href = URL.createObjectURL(blob);
                    downloadLink.download = self.filename;
                    downloadLink.click();
                }
            };
            xhr.send();
        },
		saveImage(){
			uni.getSetting({
				success:(res)=> {
					if(res.authSetting['scope.writePhotosAlbum']){
						this.downloadImage();
					}else{
						uni.authorize({
							scope: 'scope.writePhotosAlbum',
							success:()=> {
								this.downloadImage();
							},
							fail:()=>{
								uni.showToast({
									title:"请打开保存相册权限，再点击保存小程序码",
									icon:"none",
									duration:3000
								});
								setTimeout(()=>{
									uni.openSetting({//调起客户端小程序设置界面,让用户开启访问相册
										success:(res)=> {
											console.log('res', res);
										}
									});
								},3000);
							}
						})
					}
				}
			})
		},
		downloadImage() {
			uni.showLoading({
				title: '加载中'
			});
			uni.downloadFile({
				url: this.qrcodeImageUri,
				success: (res) => {
					uni.hideLoading();
					if (res.statusCode === 200) {
						uni.saveImageToPhotosAlbum({
							filePath: res.tempFilePath,
							success: function() {
								uni.showToast({
									title: "保存成功",
									icon: "success"
								});
							},
							fail: function() {
								console.log('aaaa')
								uni.showToast({
									title: "保存失败",
									icon: "error"
								});
							}
						});
					}
				},
				fail: (err) => {
					console.log('err:', err)
					uni.showToast({
						title: "保存失败",
						icon: "error"
					});
				}
			})
		},
        async show() {
            uni.showLoading({
                title: '获取二维码中'
            });
            try {
                const res = await apiService.GetProfileShareQRImage(this.profile.spec.profileId)
                this.qrcodeImageUri = res.image_uri;
                this.$refs.modal.open("bottom");
            } finally {
                uni.hideLoading();
            }
        },
    },
};
</script>

<style></style>