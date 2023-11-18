<template>
  <nav
    style="
      position: sticky;
      top: 0;
      z-index: 1000;
      background: linear-gradient(
        rgb(255 255 255 / 3%) 0%,
        rgb(0 0 0 / 0%) 100%
      );
    "
    class="tw-backdrop-blur-lg tw-group tw-relative tw-flex tw-space-x-4 tw-py-3 tw-px-3 tw-z-30"
  >
    <a href="/">
      <div class="tw-flex tw-items-center">
        <img src="/app/achievement/static/logo.svg" alt="" />
      </div>
    </a>
    <div class="mr-8"></div>
    <div
      class="tw-relative tw-flex tw-w-32 tw-justify-start tw-items-center tw-text-lg"
      style="flex: 1"
    >
        <div
        @click="goPage('Did')"
          :class="{ active: isPage('Did') }"
          class="nav-did tw-flex tw-items-center tw-justify-center tw-mr-8 nav-item"
        >
          <div class="nav-did-icon"></div>
          <span class="tw-ml-1 tw-mb-0.5">数字身份</span>
        </div>
        <div
          @click="goPage('ActivityList')"
          :class="{
            active: isPage('ActivityList'),
          }"
          class="nav-achievement tw-flex tw-items-center tw-justify-center nav-item"
        >
          <div class="nav-achievement-icon"></div>
          <span class="tw-ml-1 tw-mb-0.5">数字成就</span>
        </div>
    </div>

    <div class="tw-flex tw-h-full tw-self-center">
      <div class="tw-flex tw-right-0 custom-box">
        <v-menu open-on-hover>
          <template v-slot:activator="{ props }">
            <div
              icon="mdi-dots-vertical"
              class="user-box tw-cursor-pointer tw-flex tw-items-center tw-px-3 tw-justify-center tw-rounded-xl tw-h-10"
              v-bind="props"
            >
              <div @click="navigateToProfile" v-if="getAccountId()">
                <img
                  :src="user.avatar"
                  class="tw-rounded-full tw-w-6 tw-h-6 tw-shadow tw-align-middle"
                />
                <strong class="tw-pl-1">
                  {{ user.name }}
                </strong>
              </div>
              <div
                @click="navigateToLogin"
                v-if="!getAccountId()"
                class="tw-flex tw-items-center"
              >
                <div>
                  <img
                    src="/app/achievement/static/nav-anonymous.svg"
                    class="tw-rounded-full tw-w-6 tw-h-6 tw-shadow tw-align-middle"
                  />
                  <strong class="tw-pl-1"> 一键登录 </strong>
                </div>
              </div>
            </div>
          </template>
          <v-list v-if="getAccountId()" class="mt-3">
            <v-list-item @click="navigateToProfile">
              <v-list-item-title> 个人中心</v-list-item-title>
            </v-list-item>
            <v-list-item @click="visible = true">
              <v-list-item-title> 资料修改</v-list-item-title>
            </v-list-item>
            <v-list-item @click="logout">
              <v-list-item-title> 退出登陆</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </div>
    </div>
  </nav>
  <v-dialog v-model="visible" width="598">
    <v-card class="form-box">
      <div>
        <div class="upload-box">
          <a-upload
            name="avatar"
            :show-upload-list="false"
            list-type="picture-card"
            @change="handleChange"
            :customRequest="() => {}"
          >
            <div class="avatar-sty">
              <div class="avatar-box" v-if="formState.avatar">
                <img class="avatar" :src="formState.avatar" alt="avatar" />
              </div>
              <div class="ant-upload-text">
                <img src="../../assets/img/zxj.png" alt="" />
              </div>
            </div>
          </a-upload>
        </div>
        <div class="avatar-tip">点击修改头像</div>
        <div class="tw-mt-2.5">
          <v-text-field
            v-model="formState.name"
            prepend-inner-icon=""
            clearable
            variant="outlined"
            label="昵称"
            placeholder="请输入"
          ></v-text-field>
        </div>
        <div class="tw-mt-2.5">
          <v-text-field
            v-model="formState.desc"
            prepend-inner-icon=""
            clearable
            variant="outlined"
            label="简介"
            placeholder="请输入"
          ></v-text-field>
        </div>
        <div class="bg-img">
          <div class="upload-bg-box">
            <a-upload
              name="avatar"
              :show-upload-list="false"
              list-type="picture-card"
              :customRequest="customRequestBanner"
            >
              <div class="bg-sty">
                <img class="bg" :src="formState.banner" alt="avatar" />
              </div>
            </a-upload>
          </div>
          <span class="banner-title">背景图</span>
        </div>
      </div>
      <v-card-actions style="justify-content: space-between; padding: 0">
        <v-btn
          @click="visible = false"
          variant="tonal"
          min-width="245px"
          min-height="50px"
          >取消</v-btn
        >
        <v-btn
          min-width="245px"
          min-height="50px"
          variant="tonal"
          class="btn-bg-color"
          @click="submit"
        >
          保存
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
  <CropperModal
    @ok="handleOK"
    ref="CropperModalRef"
    @cropper-no="handleCropperClose"
  ></CropperModal>
</template>
<script lang="ts">
import { useRouter, useRoute } from "vue-router";
import { useStorage } from "@/stores/storage";
import { apiService } from "@/apis/apis";
import CropperModal from "@/components/Account/CropperModal.vue";
export default {
  data() {
    return {
      searchText: "",
      visible: false,
      formState: {
        avatar: "",
        name: "",
        desc: "",
        banner: "",
      },
      tmpImgName: "",
    };
  },
  computed: {
    user: () => {
      const { state } = useStorage();
      return state.user
    }
  },
  components: {
    CropperModal,
  },
  created() {
  },
  mounted() {
    if (this.getAccountId()) {
      this.getMe();
    }
  },
  methods: {
    goPage(pageName:string) {
      this.$router.push({
        name:pageName
      })
    },
    async submit() {
      await apiService.UpdateAccountProfile(
        this.formState.name,
        this.formState.avatar,
        this.formState.desc,
        this.formState.banner
      );
      this.getMe();
    },
    async handleOK(data: any) {
      let file = this.dataURLtoFile(data, this.tmpImgName);
      const { image_uri } = await apiService.uploadImage(file, this.tmpImgName);
      this.$refs.CropperModalRef.closeHandel();
      this.formState.avatar = image_uri;
    },
    handleCropperClose() {},
    async customRequestBanner(avatar: any) {
      const { image_uri } = await apiService.uploadImage(
        avatar.file,
        avatar.filename
      );
      this.formState.banner = image_uri;
    },
    handleChange(info: any) {
      this.tmpImgName = info.file.name;
      this.getBase64(info.file.originFileObj, (imageUrl: any) => {
        this.$refs.CropperModalRef.edit(imageUrl);
      });
    },
    // 将base64转换为文件
    dataURLtoFile(dataurl: any, filename: string) {
      let arr = dataurl.split(","),
        mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]),
        n = bstr.length,
        u8arr = new Uint8Array(n);
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
      }
      return new File([u8arr], filename, { type: mime });
    },
    getBase64(img: any, callback: any) {
      if (img) {
        const reader = new FileReader();
        reader.addEventListener("load", () => callback(reader.result));
        reader.readAsDataURL(img);
      }
    },
    isPage(name: string) {
      const route = useRoute();
      return  route.name === name;
    },
    logout() {
      const { commitJWT, commitMe } = useStorage();
      commitJWT("");
      commitMe("");
      this.$router.replace({
        name: "login",
      });
    },
    navigateToProfile() {
      const { state } = useStorage();
      this.$router.push({
        name: "AccountProfile",
        params: {
          id: state.accountId,
        },
      });
    },
    getAccountId() {
      const { state } = useStorage();
      return state.accountId;
    },
    navigateToLogin() {
      this.$router.push({
        name: "login",
      });
    },
    async getMe() {
      let res = await apiService.Me();
      if (res) {
        // this.user = res;
        this.formState = JSON.parse(JSON.stringify(res));
      }
    },
  },
};
</script>
<style lang="less" scoped>
.nav-did {
  transition: all 0.6s;
  .nav-did-icon {
    width: 25px;
    height: 25px;
    background: url("/app/achievement/static/logo-did.svg") no-repeat center
      center;
  }
  &:hover .nav-did-icon {
    background: url("/app/achievement/static/logo-did-black.svg") no-repeat
      center center;
  }

  &.active .nav-did-icon {
    background: url("/app/achievement/static/logo-did-black.svg") no-repeat
      center center;
  }

  &.active,
  &:hover {
    color: #000;
    background-color: rgba(255, 255, 255, 0.99);
  }
}

.nav-achievement {
  transition: all 0.6s;
  .nav-achievement-icon {
    width: 25px;
    height: 25px;
    background: url("/app/achievement/static/logo-achievement.svg") no-repeat
      center center;
  }
  &:hover .nav-achievement-icon {
    background: url("/app/achievement/static/logo-achievement-black.svg")
      no-repeat center center;
  }

  &.active .nav-achievement-icon {
    background: url("/app/achievement/static/logo-achievement-black.svg")
      no-repeat center center;
  }
  &.active,
  &:hover {
    color: #000;
    background-color: rgba(255, 255, 255, 0.99);
  }
}

.nav-item {
  padding: 1px 10px;
  text-align: center;
  border-radius: 8px;
}

.user-box {
  background-color: rgba(217, 217, 217, 0.2);
}
.search-box {
  flex: 1;
  height: 46px;
  padding: 5px;
  background-color: rgba(217, 217, 217, 0.2);
  border-radius: 10px;
  display: flex;
  align-items: center;
  .search-img {
    position: absolute;
    top: 50%;
    left: 10px;
    transform: translateY(-50%);
  }
  .input-box {
    margin-left: 30px;
    input {
      width: 100%;
      &:focus {
        outline: none;
      }
    }
  }
}
.form-box {
  padding: 40px 30px;
  .avatar-tip {
    margin-top: 10px;
    margin-bottom: 20px;
    text-align: center;
    color: rgba(255, 255, 255, 0.34);
    font-size: 16px;
  }
  .btn-bg-color {
    background: rgba(67, 53, 230, 1);
  }
}
.upload-box {
  &:deep(.ant-upload-picture-card-wrapper) {
    text-align: center;
  }
  &:deep(.ant-upload-select-picture-card) {
    width: 124px;
    height: 124px;
    border-radius: 50%;
  }
}
.avatar-box {
  width: 124px;
  height: 124px;
  border-radius: 50% !important;
  .avatar {
    width: 100%;
    border-radius: 50%;
  }
}
.avatar-sty {
  position: relative;
  .ant-upload-text {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }
}
.bg-img {
  padding: 20px 15px;
  border: 1.5px solid rgba(255, 255, 255, 0.3);
  border-radius: 4px;
  position: relative;
  margin-bottom: 22px;
  .upload-bg-box {
    &:deep(.ant-upload-select-picture-card) {
      width: 100%;
      border: none;
      background: rgb(var(--v-theme-surface));
      margin: 0;
    }
    .bg-sty {
      width: 100%;
      height: 100%;
      img {
        height: 100%;
      }
    }
  }
  .banner-title {
    --v-field-label-scale: 0.75em;
    position: absolute;
    top: 0;
    background: #000;
    transform: translateY(-50%);
    font-size: var(--v-field-label-scale);
    color: rgba(255, 255, 255, 0.5);
    background: rgb(var(--v-theme-surface));
    z-index: 22;
    padding: 0 4px;
    margin: 0 -4px;
  }
  &:hover {
    border-color: #ffffff;
  }
}
</style>
