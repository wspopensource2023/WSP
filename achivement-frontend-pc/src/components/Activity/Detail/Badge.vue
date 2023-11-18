<template>
  <div class="tw-w-1/3 tw-h-full">
    <div class="tw-flex tw-flex-row tw-h-full">
      <div class="tw-bg-black tw-h-full tw-w-full">
        <div class="tw-w-full tw-h-full tw-relative">
          <div
            style="z-index: 1"
            class="tw-absolute tw-h-full tw-w-full tw-top-0 tw-backdrop-blur-2xl"
          ></div>
          <div class="tw-relative left-img-box">
            <div class="tw-transform tw-w-full">
              <img
                :src="info.achievement_image"
                class="tw-rounded-full tw-h-full tw-w-full"
              />
            </div>
            <div class="left-img tw-w-full">
              <img
                :src="info.achievement_image"
                class="tw-h-full tw-w-full"
                style="object-fit: cover; border-radius: 50%"
              />
            </div>
          </div>

          <div
            class="op-btn tw-flex-all-center"
            style="z-index: 2; position: inherit"
          >
            <div class="tw-btn-outter tw-width-max-100">
              <div class="tw-my-12 tw-w-8/12 tw-mx-auto tw-text-center">
                <v-btn
                  :disabled="!collectStatus"
                  size="large"
                  class="tw-bg-gradient-to-r tw-from-green-400 tw-to-blue-500 tw-w-full width-max-100 tw-transition tw-duration-500 tw-ease-in-out tw-transform hover:tw--translate-y-1 hover:tw-scale-110 tw-bg-blue-600 hover:tw-bg-blue-500 tw-text-white tw-py-3 tw-px-6 tw-rounded-md"
                  @click="opAddModal"
                >
                  {{ collectBtnText() }}
                </v-btn>
              </div>
            </div>
          </div>
          <div
            class="tw-my-12 tw-w-3/5 tw-mx-auto"
            style="z-index: 2; position: inherit"
          >
            <Participants></Participants>
          </div>
        </div>
      </div>
      <v-dialog v-model="dialog" class="tw-w-1/4">
        <v-card class="tw-p-3">
          <div class="model-box">
            <div
              class="tw-backdrop-blur-2xl tw-w-full tw-h-full blur-box"
            ></div>
            <div class="model-title">
              <img src="../../../assets/img/green.png" alt="" />
              恭喜，领取成功
            </div>
            <div class="model-img-box">
              <img class="blur-img" :src="info.achievement_image" alt="" />
              <img class="badge-img" :src="info.achievement_image" alt="" />
            </div>
            <div class="badge-name tw-text-center tw-text-xl tw-mt-2">
              {{ info.achievement_name }}
              <img src="../../../assets/img/blue.png" alt="" />
            </div>
            <div class="tw-text-base tw-text-center tw-mb-6">
              {{ info.achievement_summary }}
            </div>
            <div class="tw-text-center tw-mb-4">
              <v-btn
                class="tw-w-4/5 tw-bg-[#4335E6]"
                variant="tonal"
                @click="getBadge(info.badge_name, info.issuer_phone)"
                >收入囊中
              </v-btn>
            </div>
            <div
              class="tw-text-base tw-cursor-pointer tw-text-center tw-flex tw-justify-center"
              @click="changeIsShow"
            >
              <div class="box">
                <img src="../../../assets/img/Rectangle.png" alt="" />
                <img
                  class="box-inner"
                  v-if="isShow"
                  src="../../../assets/img/inner.png"
                  alt=""
                />
              </div>
              同时展示到我的数字身份上
            </div>
          </div>
        </v-card>
      </v-dialog>
    </div>
  </div>
  <div class="tw-w-2/3 tw-h-full tw-bg-[rgba(9,11,13,1)]">
    <div class="tw-h-full">
      <div class="tw-flex-row tw-h-full right-box">
        <div class="tw-basis-3/4">
          <div class="tw-font-black tw-text-3xl">
            {{ info.achievement_name }}
            <span class="title">{{ info.achievement_summary }}</span>
          </div>
          <div class="issuer">
            <img :src="info.issuer?.avatar" alt="" />
            <span class="tw-text-base tw-ml-3">{{ info.issuer?.name }}</span>
          </div>
          <div class="tag-list tw-flex" v-if="info.achievement_tags">
            <span
              class="tag-item"
              v-for="item in info.achievement_tags"
              :key="item"
              >测试</span
            >
          </div>
          <div class="association-box" v-if="info.type !== 'achievement'">
            <div class="association-title">关联活动</div>
            <div class="association-info tw-flex">
              <img :src="info.campaign_image" alt="" />
              <div class="tw-grow tw-flex-col">
                <div>
                  <span class="association-name">
                    {{ info.campaign_name }}</span
                  >
                  <span class="association-num"
                    >包含{{ info.contain_achievement }}个成就</span
                  >
                </div>
                <div class="association-desc">
                  {{ info.campaign_introduction }}
                </div>
              </div>
            </div>
          </div>
          <div class="data-box">
            <div class="tw-flex">
              <div class="tw-flex tw-flex-col tw-w-44 tw-mb-2.5">
                <span class="data-title">发行数量</span>
                <span class="data-content">{{ info.issuance_quantity }}</span>
              </div>
              <div class="tw-flex tw-flex-col">
                <span class="data-title">发行时间</span>
                <span>
                  {{ info.issuance_start_time }} -
                  {{ info.issuance_end_time }}</span
                >
              </div>
            </div>
            <div class="tw-flex">
              <div class="tw-flex tw-flex-col tw-w-44 tw-mb-2.5">
                <span class="data-title">区块链</span>
                <span>{{ info.blockchain }}</span>
              </div>
              <div class="tw-flex tw-flex-col">
                <span class="data-title">区块链地址</span>
                <span class="text-[#0578FF]">{{ info.contact_address }}</span>
              </div>
            </div>
          </div>

          <div class="tw-mt-5">
            <div class="public-title">参与方式</div>
            <div
              class="tw-bg-gray-black tw-border tw-rounded-md tw-border-solid tw-border-gray-50 tw-border-opacity-25"
            >
              <div class="tw-p-4 tw-rounded-none tw-text-left">
                <v-expansion-panels>
                  <div class="tw-w-full">
                    <v-expansion-panel
                      v-for="condition in info.condition_list"
                      rounded
                      class="tw-mb-3"
                    >
                      <div class="tw-text-white tw-rounded-lg">
                        <Condition
                          :condition="condition"
                          :userInfo="user"
                        ></Condition>
                      </div>
                    </v-expansion-panel>
                  </div>
                </v-expansion-panels>
              </div>
            </div>
          </div>

          <div class="tw-whitespace-pre-line tw-mt-5">
            <div class="public-title">详细描述</div>
            <div v-html="info.achievement_introduction"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { apiService } from "@/apis/apis";
import { toRefs, ref } from "vue";
import { useRoute } from "vue-router";
import { useStorage } from "@/stores/storage";
import Participants from "@/components/Activity/Detail/Participants.vue";
import IconFont from "@/components/Activity/Detail/IconFont.vue";
import Condition from "@/components/Condition/Condition.vue";

export default {
  data() {
    const route = useRoute();
    const { state } = useStorage();
    return {
      dialog: false,
      visible: false,
      isShow: true,
      info: {
        condition_list: [],
        achievement_id: "",
        issuance_start_time: "",
        issuance_end_time: "",
      },
      user: {},
      badge_id: route.params.id,
      getParams: {
        code: "",
      },
      result: {},
      collectStatus: false,
      state,
    };
  },
  async created() {
    console.log(this.state, "state123");
    await this.init();
  },
  components: {
    Condition,
    Participants,
    IconFont,
  },
  methods: {
    collectBtnText() {
      // 判断
      if (!this.info.achievement_id) {
        return "加载中";
      }
      let status = "finished";
      this.info.condition_list.forEach((item) => {
        if (item.status !== "finished") {
          status = "unfinished";
        }
      });
      if (this.info.issuance_start_time > Date.now() / 1000) {
        return "未开始";
      } else if (this.info.issuance_end_time < Date.now() / 1000) {
        return "已结束";
      } else if (this.info.is_received) {
        return "已领取";
      } else if (status === "unfinished") {
        return "未达成";
      } else {
        if (!this.info.condition_list.length) {
          this.collectStatus = false;
        } else {
          this.collectStatus = true;
        }
        return "领取";
      }
    },
    opAddModal() {
      //校验登陆
      if (this.state.jwt) {
        // 领取完成弹窗
        this.dialog = true;
        //绑定接口调用
        this.result = apiService.CollectAchievement(this.badge_id);
      } else {
        this.$router.replace({
          name: "login",
        });
      }
    },
    show() {
      console.log("show");
      this.visible = true;
    },
    hide() {
      console.log("hide");
      this.visible = false;
    },

    async init() {
      this.info = await apiService.GetAchievement(this.badge_id);
      if (this.getAccountId()) {
        this.user = await apiService.Me();
        if (this.user.bind === null) {
          this.user = {
            bind: {},
          };
        }
      }
    },
    getAccountId() {
      const { state } = useStorage();
      return state.accountId;
    },
    getBadge() {},
    changeIsShow() {
      this.isShow = !this.isShow;
    },
  },
};
</script>
<style lang="less" scoped>
button:disabled {
  color: #999;
}
.title {
  color: rgba(255, 255, 255, 0.5);
  font-size: 16px;
  margin-left: 5px;
}
.right-box {
  padding: 50px 60px;
  .association-box {
    margin-top: 20px;
    padding: 20px;
    background: rgba(255, 255, 255, 0.04);
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    .association-title {
      font-size: 16px;
      color: rgba(255, 255, 255, 0.5);
      margin-bottom: 10px;
    }
    .association-info {
      img {
        width: 70px;
        height: 70px;
        margin-right: 15px;
      }
      .association-num {
        margin-left: 30px;
        font-size: 12px;
        line-height: 21.12px;
      }
      .association-desc {
        margin-top: 10px;
        font-size: 16px;
        color: rgba(255, 255, 255, 0.5);
      }
    }
  }
  .data-box {
    font-size: 16px;
    margin-top: 20px;
    padding: 20px;
    background: rgba(255, 255, 255, 0.04);
    border-radius: 10px;
    .data-title {
      color: rgba(255, 255, 255, 0.5);
    }
  }
}
.issuer {
  img {
    width: 25px;
    height: 25px;
    border-radius: 50%;
  }
}
.public-title {
  margin-bottom: 10px;
  font-weight: 700;
  font-size: 20px;
  color: rgba(5, 120, 255, 1);
}
.model-box {
  position: relative;
  padding: 20px;
  .blur-box {
    position: absolute;
    top: 0;
    left: 0;
    z-index: -1;
  }
  .model-title {
    font-size: 20px;
    font-weight: 700;
    text-align: center;
    color: rgba(255, 255, 255, 1);
  }
  .model-img-box {
    text-align: center;
    width: 271px;
    height: 271px;
    margin: 0 auto;
    position: relative;
    .badge-img {
      width: 80%;
      height: 80%;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      border-radius: 50%;
    }
    .blur-img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
      position: absolute;
      left: 0;
      z-index: -3;
    }
  }
  .box {
    align-self: center;
    position: relative;
    display: flex;
    align-items: center;
    .box-inner {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }
}
.tag-list {
  margin-top: 20px;
  display: flex;
  flex-wrap: wrap;
  .tag-item {
    padding: 2px 20px;
    border-radius: 50px;
    border: 1px solid rgba(255, 255, 255, 0.13);
    font-size: 16px;
    margin-right: 10px;
    margin-bottom: 10px;
  }
}
.left-img-box {
  position: relative;
  margin: 0 auto;
  .left-img {
    position: absolute;
    transform: translate(-50%, -50%);
    left: 50%;
    top: 51%;
    z-index: 2;
    width: 95%;
  }
}
</style>
