<template>
  <div class="tw-bg-black tw-flex tw-w-full tw-h-full  tw-flex-col">
    <div>
      <Nav></Nav>
    </div>
    <div
      class="tw-relative tw-bg-black tw-mx-auto   tw-w-full tw-max-w-container tw-px-4 tw-py-4 sm:tw-px-6 lg:tw-px-8"
    >
      <div
        class="tw-mx-auto tw-max-w-7xl tw-px-4 tw-py-14 sm:tw-px-6  tw-border tw-rounded tw-border-solid tw-border-white"
      >
        <div class="from-box tw-mx-auto">
          <a-form
            ref="formRef"
            name="basic"
            layout="vertical"
            :hideRequiredMark="true"
            :model="formState"
            :label-col="{ span: 8 }"
            :wrapper-col="{ span: 16 }"
            @finish="handleFinish"
            @finishFailed="handleFinishFailed"
          >
            <a-form-item label="用户名" name="name">
              <input
                class="tw-w-1/2 tw-block tw-w-full tw-rounded-md tw-border-0 tw-p-1.5 tw-text-white tw-shadow-sm tw-ring-1 tw-ring-inset tw-ring-gray-300 placeholder:tw-text-gray-400 focus:tw-ring-2 focus:tw-ring-inset "
                v-model="formState.name"
              />
            </a-form-item>
            
            <a-form-item label="用户头像" name="avater">
              <div class="upload-box">
                <div class="avatar-box" v-if="formState.avatar">
                  <img
                    class="avatar"
                    @click="previewImage(formState.avatar)"
                    :src="formState.avatar"
                    alt="avatar"
                  />
                </div>
                <a-upload
                  name="avatar"
                  :show-upload-list="false"
                  :list-type="formState.avatar ? '' : 'picture-card'"
                  @change="handleChange"
                  :customRequest="() => {}"
                >
                  <div>
                    <plus-outlined v-if="!formState.avatar"></plus-outlined>
                    <div class="ant-upload-text">
                      {{ formState.avatar ? "重新上传" : "头像上传" }}
                    </div>
                  </div>
                </a-upload>
              </div>
            </a-form-item>
            <a-form-item label="用户描述" name="desc">
              <textarea
                class="tw-block tw-w-full tw-rounded-md tw-border-0 tw-p-1.5 tw-text-white tw-shadow-sm tw-ring-1 tw-ring-inset tw-ring-gray-300 placeholder:tw-text-gray-400 focus:tw-ring-2 focus:tw-ring-inset "
                rows="8"
                v-model="formState.desc"
              ></textarea>
            </a-form-item>
            <a-form-item label="用户背景" name="banner">
              <div class="upload-box">
                <div class="banner-box" v-if="formState.banner">
                  <img class="banner" :src="formState.banner" alt="avatar" />
                </div>
                <a-upload
                  name="avatar"
                  :show-upload-list="false"
                  :list-type="formState.banner ? '' : 'picture-card'"
                  :customRequest="customRequestBanner"
                >
                  <div>
                    <plus-outlined v-if="!formState.banner"></plus-outlined>
                    <div class="ant-upload-text">
                      {{ formState.banner ? "重新上传" : "banner" }}
                    </div>
                  </div>
                </a-upload>
              </div>
            </a-form-item>
            <div class="tw-my-2.5 tw-h-px tw-bg-white"></div>
            <div class="tw-text-end">
              <v-btn  class="tw-w-20 tw-p-1.5 tw-mr-10 tw-text-white tw-shadow-sm tw-ring-1 tw-border tw-rounded tw-border-solid tw-border-white"  type="submit" min-width="100px" @click="goBack">取消</v-btn>
              <v-btn  class="tw-w-20 tw-p-1.5 tw-text-white tw-shadow-sm tw-ring-1 tw-border tw-rounded tw-border-solid tw-border-white"  type="submit" min-width="100px">提交</v-btn>
            </div>
          </a-form>
        </div>
      </div>
    </div>
  </div>
  <v-dialog v-model="previewVisible" class="tw-w-1/4">
    <img alt="example" style="width: 100%" :src="previewImageUrl" />
  </v-dialog>
  <CropperModal @ok="handleOK" ref="CropperModalRef" @cropper-no="handleCropperClose"></CropperModal>
</template>
<script lang="ts" setup>
import CropperModal from "@/components/Account/CropperModal.vue";
import { apiService } from "@/apis/apis";
import Nav from "@/components/Nav/Nav.vue";
import { reactive, ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { PlusOutlined } from "@ant-design/icons-vue";
const route = useRoute();
const router = useRouter()
interface FormState {
  name: string;
  desc: string;
  avatar: string;
  banner: string;
}
let formState = reactive<FormState>({
  name: "",
  desc: "",
  avatar: "",
  banner: "",
});


const CropperModalRef = ref<any>(null);

const handleFinish = async (values: FormState) => {
  await apiService.UpdateAccountProfile(
    formState.name,
    formState.avatar,
    formState.desc,
    formState.banner,
  );
};
const handleFinishFailed = (errors: any) => {
  console.log(errors);
};

const customRequestAvatar = async (avatar: any) => {
  const { image_uri } = await apiService.uploadImage(
    avatar.file,
    avatar.filename
  );
  formState.avatar = image_uri;
};

const customRequestBanner = async (avatar: any) => {
  const { image_uri } = await apiService.uploadImage(
    avatar.file,
    avatar.filename
  );
  formState.banner = image_uri;
};


let tmpImgName = ref<string>("")


const handleChange = (info: any) => {
  tmpImgName.value = info.file.name
  getBase64(info.file.originFileObj, (imageUrl: any) => {
    CropperModalRef.value.edit(imageUrl);
  });
};

const handleOK = async (data:any) => {
   let file = dataURLtoFile(data, tmpImgName.value)
    const { image_uri } = await apiService.uploadImage(
    file,
    tmpImgName.value
  );
  CropperModalRef.value.closeHandel()
  formState.avatar = image_uri;
}

const handleCropperClose = () => {
     tmpImgName.value = ""
}

// 将base64转换为文件
const dataURLtoFile = (dataurl:any, filename:string) => {
  let arr = dataurl.split(','),
    mime = arr[0].match(/:(.*?);/)[1],
    bstr = atob(arr[1]),
    n = bstr.length,
    u8arr = new Uint8Array(n)
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n)
  }
  return new File([u8arr], filename, { type: mime })
}

const previewVisible = ref<boolean>(false);
const previewTitle = ref<string>("");
const previewImageUrl = ref<string>("");


const previewImage = (url: string) => {
  previewImageUrl.value = url;
  previewVisible.value = true;
  previewTitle.value = "用户头像";
};
// 获取信息
const getAccountProfile = async (id: any) => {
  const res = await apiService.GetAccountProfile(id);
  if (res) {
    formState.avatar = res.account_avatar;
    formState.name = res.account_name;
    formState.banner = res.account_banner;
    formState.desc = res.account_desc;
  }
};

const getBase64 = (img: any, callback: any) => {
  if (img) {
    const reader = new FileReader();
    reader.addEventListener("load", () => callback(reader.result));
    reader.readAsDataURL(img);
  }
};
const goBack = () => {
  router.back()
}
onMounted(() => {
  getAccountProfile(route.query.id);
});
</script>

<style scoped>
.from-box {
  max-width: 700px;
}

.upload-box {
  display: flex;
}
.avatar-box {
  margin-right: 10px;
  width: 102px;
  height: 102px;
  position: relative;
}
.avatar {
  width: 102px;
  height: 102px;
  border-radius: 50%;
}
.banner-box {
  width: 200px;
}
.banner {
  width: 100%;
}
.upload-box >>> .ant-upload-select-picture-card {
  margin-bottom: 0px;
}
.input-sty {
  width: 50%;
}
</style>
