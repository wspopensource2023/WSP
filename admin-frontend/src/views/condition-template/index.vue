<template>
  <div class="app-container">
    <div style="margin-bottom: 10px">
      <el-button type="primary" @click="dialogVisible = true">创建条件模版</el-button>
      <el-dialog :visible.sync="dialogVisible" title="创建条件模版">
        <el-form>
          <!-- 表单控件 -->
          <el-form-item label="条件名称">
            <el-input v-model="form.condition_name" />
          </el-form-item>
          <el-form-item label="条件描述">
            <el-input v-model="form.condition_description" />
          </el-form-item>
          <el-form-item label="条件api">
            <el-input v-model="form.detection_condition_api" />
          </el-form-item>
        </el-form>
        <div slot="footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="submitForm">确 定</el-button>
        </div>
      </el-dialog>
    </div>
    <div>
      <el-table :data="list" border fit highlight-current-row style="width: 100%">
        <el-table-column align="center" label="条件名称" min-width="20%">
          <template slot-scope="{row}">
            <span>{{ row.condition_name }}</span>
          </template>
        </el-table-column>

        <el-table-column align="center" label="条件描述" min-width="20%">
          <template slot-scope="{row}">
            <span>{{ row.condition_description }}</span>
          </template>
        </el-table-column>

        <el-table-column align="center" label="条件api" min-width="15%">
          <template slot-scope="{row}">
            <span>{{ row.detection_condition_api }}</span>
          </template>
        </el-table-column>

        <el-table-column align="center" label="condition uuid" min-width="15%">
          <template slot-scope="{row}">
            <span>{{ row.condition_template_id }}</span>
          </template>
        </el-table-column>

        <el-table-column align="center" label="condition_secret" min-width="20%">
          <template slot-scope="{row}">
            <span>{{ row['condition_secret'] }}</span>
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
import { createConditionTemplate, listConditionTemplate } from '@/api/condition-template'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination

export default {
  name: 'DragTable',
  components: { Pagination },
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'info',
        deleted: 'danger'
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      list: null,
      total: 0,
      listLoading: true,
      listQuery: {
        skip: 0,
        limit: 10,
        campaign_type: 'campaign'
      },
      param: null,
      dialogVisible: false,
      imageUrl: '',
      form: {
        condition_name: '',
        condition_description: '',
        detection_condition_api: ''
      }
    }
  },
  created() {
    this.getList()
  },
  methods: {
    submitForm() {
      // 提交表单逻辑
      createConditionTemplate(this.form).then(response => {
        this.dialogVisible = false
        this.getList()
      })
    },
    searchContList() {
      this.getList()
    },
    getList() {
      listConditionTemplate(this.listQuery).then(response => {
        this.list = response.data
        this.total = response.total
      })
    },
    click() {
      handleFeedback(this.param).then(response => {
        this.getList()
      })
    }
  }
}
</script>

<style>
.sortable-ghost {
    opacity: .8;
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
    border-color: #409EFF;
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

