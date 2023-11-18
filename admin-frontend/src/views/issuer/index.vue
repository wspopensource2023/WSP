<template>
    <div class="app-container">
        <div style="margin-bottom: 10px">
            <el-button type="primary" @click="dialogVisible = true"
                >创建发行方</el-button
            >
            <el-dialog :visible.sync="dialogVisible" title="创建发行方">
                <el-form>
                    <el-form-item label="头像上传">
                        <el-upload
                            class="avatar-uploader"
                            action=""
                            :http-request="upload_avatar"
                            :show-file-list="false"
                            :before-upload="beforeAvatarUpload"
                        >
                            <img
                                v-if="imageUrl"
                                :src="imageUrl"
                                class="avatar"
                            />
                            <i
                                v-else
                                class="el-icon-plus avatar-uploader-icon"
                            />
                        </el-upload>
                    </el-form-item>

                    <el-form-item label="banner上传">
                        <el-upload
                            class="avatar-uploader"
                            action=""
                            :http-request="upload_banner"
                            :show-file-list="false"
                            :before-upload="beforeAvatarUpload"
                        >
                            <img
                                v-if="bannerUrl"
                                :src="bannerUrl"
                                class="avatar"
                            />
                            <i
                                v-else
                                class="el-icon-plus avatar-uploader-icon"
                            />
                        </el-upload>
                    </el-form-item>

                    <el-form-item label="手机号">
                        <el-input v-model="form.issuer_phone" />
                    </el-form-item>

                    <el-form-item label="描述">
                        <el-input v-model="form.issuer_desc" type="textarea" />
                    </el-form-item>

                    <el-form-item label="描述">
                        <el-input v-model="form.issuer_desc" />
                    </el-form-item>

                    <el-form-item label="profile_id">
                        <el-input v-model="form.profile_id" />
                    </el-form-item>
                </el-form>
                <div slot="footer">
                    <el-button @click="dialogVisible = false">取 消</el-button>
                    <el-button type="primary" @click="submitForm"
                        >确 定</el-button
                    >
                </div>
            </el-dialog>
        </div>
        <div>
            <el-table
                :data="list"
                border
                fit
                highlight-current-row
                style="width: 100%"
            >
                <el-table-column align="center" label="头像" min-width="15%">
                    <template slot-scope="{ row }">
                        <img
                            :src="row.issuer_avatar"
                            style="max-width: 60px; max-height: 60px"
                        />
                    </template>
                </el-table-column>
                <el-table-column align="center" label="name" min-width="20%">
                    <template slot-scope="{ row }">
                        <span>{{ row.issuer_name }}</span>
                    </template>
                </el-table-column>
                <el-table-column
                    align="center"
                    label="issuer_desc"
                    min-width="20%"
                >
                    <template slot-scope="{ row }">
                        <span>{{ row.issuer_desc }}</span>
                    </template>
                </el-table-column>
                <el-table-column
                    align="center"
                    label="issuer_banner"
                    min-width="15%"
                >
                    <template slot-scope="{ row }">
                        <img
                            :src="row.issuer_banner"
                            style="max-width: 60px; max-height: 60px"
                        />
                    </template>
                </el-table-column>
                <el-table-column
                    align="center"
                    label="profile_id"
                    min-width="20%"
                >
                    <template slot-scope="{ row }">
                        <span>{{ row.profile_id }}</span>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <pagination
            v-show="total > 0"
            :total="total"
            :page.sync="listQuery.skip"
            :limit.sync="listQuery.limit"
            @pagination="getList"
        />
    </div>
</template>
<script>
import { createIssuer, listIssuer } from "@/api/issuer";
import { uploadImage } from "@/api/achievement";
import Pagination from "@/components/Pagination";

export default {
    name: "DragTable",
    components: { Pagination },
    data() {
        return {
            form: {},
            imageUrl: "",
            bannerUrl: "",
            dialogVisible: false,
            list: null,
            total: 0,
            listLoading: true,
            listQuery: {
                skip: 0,
                limit: 10,
            },
        };
    },
    created() {
        this.getList();
    },
    methods: {
        upload_avatar(avatar) {
            uploadImage(avatar.file, avatar.filename).then((response) => {
                this.form.imageUrl = response.image_uri;
                this.imageUrl = response.image_uri;
                this.form.issuer_avatar = response.image_uri;
            });
        },
        beforeAvatarUpload(file) {
            const isAllowed =
                ["image/jpeg", "image/png", "image/jpg", "image/gif"].indexOf(
                    file.type
                ) !== -1;
            if (!isAllowed) {
                this.$message.error("上传头像图片格式异常!");
            }
            return isAllowed;
        },
        upload_banner(banner) {
            uploadImage(banner.file, banner.filename).then((response) => {
                this.form.bannerUrl = response.image_uri;
                this.bannerUrl = response.image_uri;
                this.form.issuer_banner = response.image_uri;
            });
        },
        submitForm() {
            // 提交表单逻辑
            createIssuer(this.form).then((response) => {
                this.dialogVisible = false;
                this.getList();
            });
        },
        getList() {
            listIssuer(this.listQuery).then((response) => {
                this.list = response.data;
                this.total = response.total;
            });
        },
    },
};
</script>
<style>
.sortable-ghost {
    opacity: 0.8;
    color: #fff !important;
    background: #42b983 !important;
}
</style>

<style scoped>
.icon-star {
    margin-right: 2px;
}

.drag-handler {
    width: 20px;
    height: 20px;
    cursor: pointer;
}

.show-d {
    margin-top: 15px;
}
</style>

<style>
.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
}

.avatar-uploader .el-upload:hover {
    border-color: #409eff;
}

.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
}

.avatar {
    width: 178px;
    height: 178px;
    display: block;
}
</style>
