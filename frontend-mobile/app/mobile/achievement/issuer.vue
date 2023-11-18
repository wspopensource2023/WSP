<template>
	<div class="tw-text-white tw-w-full" style="background: #121212; min-height: 100%">
		<div @click="jumpBack" class="tw-fixed tw-top-3 tw-left-3" style="z-index: 1">
			<img class="tw-w-8 tw-h-8 tw-mr-1"
				src="https://static.xxxxxx.com/mdi/af8ebf95055ff7a71f265a8bcaad2eec569d30d0eabe56239b03602f7da20e76"
				alt="">
		</div>
		<BannerView :value="issuer.account_banner"></BannerView>
		<div class="tw-px-5 tw-relative -tw-mt-12 tw-z-[1]">
			<div>
				<div class="tw-w-24 tw-h-24">
					<img style="border-radius: 50%" class="tw-w-full tw-h-full" :src="issuer.account_avatar" />
				</div>
				<div class="tw-text-xl tw-mt-3">
					{{ issuer.account_name }}
				</div>
				<div class="tw-text-base title-color tw-mt-1">这个人很懒，什么都没有留下</div>
				<div class="tw-flex tw-items-center title-color tw-mt-5">
					<img class="tw-w-5 tw-h-5 tw-self-center tw-mt-0.5 tw-mr-1"
						src="https://static.xxxxxx.com/mdi/f6eac1523d2c234ae898ffbc953e464785e4a575b81ef2b12b7bf2a5389ec488"
						alt="" />
					<span class="tw-self-center tw-mr-2">入驻时间</span>
					<span class="tw-self-center tw-text-white">{{ issuer.register_time }}</span>
				</div>
				<div class="tw-mt-6">
					<div class="tw-flex tw-text-lg">
						<div @click="changeTab(1)" class="tw-mr-4 tab" :class="{ active: tabIndex === 1 }">
							收集成就
						</div>
						<div @click="changeTab(2)" class="tab" :class="{ active: tabIndex === 2 }">
							发行成就
						</div>
					</div>
				</div>
			</div>
			<div class="tw-pb-24">
				<div v-if="tabIndex === 2">
					<div v-if="(campaign_list && campaign_list.length)" class="tw-grid tw-grid-cols-2 tw-gap-3 tw-mt-5">
						<div @click="jumpToDetail(item)" v-for="item of campaign_list" :key="item">
							<AchievementItem v-if="item.campaign_type === 'achievement'" :data="item"></AchievementItem>
							<CampaignItem v-if="item.campaign_type === 'campaign'" :data="item"></CampaignItem>
						</div>
					</div>
				</div>
				<div v-if="tabIndex === 1">
					<div v-if="(campaign_list && campaign_list.length)" class="tw-grid tw-grid-cols-2 tw-gap-3 tw-mt-5">
						<div @click="jumpToDetailById(item.achievement_id)" v-for="item of campaign_list" :key="item"
							class="tw-pb-3" style="border-radius: 10px; background: rgba(255, 255, 255, 0.03);">
							<div style="height: 0; padding: 0; padding-bottom: 100%;"
								class="tw-w-full tw-flex-shrink-0 tw-mx-auto tw-rounded-t-xl tw-overflow-hidden">
								<img mode="widthFix" class="tw-w-full" :src="item.campaign_image"
									:alt="item.campaign_image" />
							</div>
							<div class="tw-px-3">
								<div class="tw-w-full tw-flex tw-mt-1 tw-text-lg tw-truncate">
									{{ item.campaign_name }}
									<img class="tw-w-4 tw-h-4 tw-self-center tw-ml-1"
										src="https://static.xxxxxx.com/55d39abf637e94f70bd1ead24ee58f74139ec38980eda2e7c162ba16d2956262"
										alt="">
								</div>
								<div class="tw-flex tw-justify-end">
									<div class="tw-truncate tw-flex tw-items-center tw-text-sm tw-mt-1">
										<img class="tw-w-4 tw-h-4 tw-rounded-full" :src="item.issuer_avatar" alt="">
										<span class="tw-ml-1 tw-text-white tw-text-opacity-60">{{
											item.issuer_name
										}}</span>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div v-if="!(campaign_list && campaign_list.length)
					" class="tw-p-2 tw-mr-2">
					<div class="tw-text-center tw-text-white/30 tw-text-sm tw-py-8">
						<img class="tw-w-28 tw-h-28"
							src="https://static.xxxxxx.com/e004bfac0ba7c2df24d955e01ff37beb5dcc5600b8ced38c5fe292a966f449f4"
							alt="">
						<div class="tw-text-base">空空如也</div>
					</div>
				</div>
			</div>
		</div>

	</div>
</template>
<script>
import IconFont from "@/components/base/IconFont.vue";
import { apiService } from "@/library/apis.js";
import AchievementItem from "@/components/achievement/AchievementItem.vue";
import CampaignItem from "@/components/achievement/CampaignItem.vue";
import { getCurrentPage, dateFormat } from "@/library/util";
import BannerView from "@/components/base/BannerView.vue";

export default {
	data() {
		const page = getCurrentPage();
		return {
			tabIndex: 1, // 1: 我的成就 2: 我的发行
			accountId: "",
			issuer: {},
			issuedCampaigns: [],
			issuedCampaignSkip: 1,
			issuedCampaignLimit: 10,
			campaign_list: [],
			isNoMore: true,
		};
	},
	components: {
		IconFont,
		AchievementItem,
		CampaignItem,
		BannerView
	},
	async onLoad(options) {
		this.accountId = options.account_id;
		await this.prepareIssuer();
	},
	onReachBottom() {
		if (!this.isNoMore) {
			if (this.tabIndex === 1) {
				this.ListAccountCampaign();
			} else {
				this.ListAccountCampaignIssued();
			}
		}
	},
	methods: {
		async changeTab(type) {
			this.campaign_list = [];
			this.tabIndex = type;
			this.issuedCampaignSkip = 1;
			if (this.tabIndex === 1) {
				await this.ListAccountCampaign();
			} else {
				await this.ListAccountCampaignIssued();
			}
		},
		async jumpToDetailById(achievementId) {
			uni.redirectTo({
				url: `/app/mobile/achievement/detail?achievementId=${achievementId}`,
			});
		},
		async jumpToDetail(item) {
			if (item.campaign_type === "achievement") {
				const achievement_id = item.achievement_ids[0];
				this.jumpToDetailById(achievement_id)
			}
		},
		getBannerImage() {
			return (
				this.issuer.account_banner ||
				"https://static.xxxxxx.com/images/9214b8c6b205da3c1ecbd2faf63260bdb8653ddf78373f58584f9a7f751a473c.jpg"
			);
		},
		jumpBack() {
			const pages = getCurrentPages();
			if (!pages || pages.length == 1) {
				uni.switchTab({
					url: "/app/mobile/achievement/list",
				});
			}
			uni.navigateBack();
		},
		async prepareIssuer() {
			const data = await apiService.GetAccountProfile(this.accountId);
			this.issuer = data;
			this.issuer.register_time = dateFormat(
				new Date(this.issuer.register_time * 1000),
				"yyyy-MM-dd"
			);
			if (this.issuer.issuer) {
				this.tabIndex = 2;
				this.ListAccountCampaignIssued();
			} else {
				this.tabIndex = 1;
				this.ListAccountCampaign();
			}
		},
		async ListAccountCampaignIssued() {
			const res = await apiService.ListAccountCampaignIssued(
				this.accountId,
				this.issuedCampaignLimit,
				this.issuedCampaignSkip
			);
			if (res) {
				this.campaign_list.push(...res);
				if (res.length >= this.issuedCampaignLimit) {
					this.issuedCampaignSkip++;
					this.isNoMore = false;
				} else {
					this.isNoMore = true;
				}
			}
		},

		async ListAccountCampaign() {
			const res = await apiService.ListAccountCampaign(
				this.accountId,
				this.issuedCampaignLimit,
				this.issuedCampaignSkip
			);
			if (res) {
				this.campaign_list.push(...res);
				if (res.length >= this.issuedCampaignLimit) {
					this.issuedCampaignSkip++;
					this.isNoMore = false;
				} else {
					this.isNoMore = true;
				}
			}
		},
	},
};
</script>
  
<style lang="scss">
.avatar {
	left: 17px;
	position: absolute;
	bottom: 0;
	transform: translateY(50%);
}

.title-color {
	color: rgba(255, 255, 255, 0.5);
}

.tab {
	padding-bottom: 3px;
	border-bottom: 3px solid transparent;
}

.active {
	border-color: #4335e6;
}
</style>