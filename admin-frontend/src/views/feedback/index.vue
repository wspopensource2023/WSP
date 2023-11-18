<template>
    <div class="app-container">
      <el-table :data="list" border fit highlight-current-row style="width: 100%">
        <el-table-column align="center" label="创建时间" min-width="20%">
          <template slot-scope="{row}">
            <span>{{ row.create_time }}</span>
          </template>
        </el-table-column>
  
        <el-table-column align="center" label="留言" min-width="70%">
          <template slot-scope="{row}">
            <span>{{ row.message }}</span>
          </template>
        </el-table-column>
  
        <el-table-column align="center" label="操作" min-width="10%">
          <template slot-scope="{row}">
            <!-- <el-button type="danger" @click="black(row.account_id)" v-if="status==0" > -->
              <el-button type="danger" @click="click(row._id)" v-if="row.status!=1">
              未处理
            </el-button>
            <el-button type="primary"  v-if="row.status==1">
              已处理
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <pagination v-show="total>0" :total="total" :page.sync="listQuery.skip" :limit.sync="listQuery.limit" @pagination="getList" />

    </div>
  </template>
  
  <script>
  import { feedBackList, handleFeedback } from '@/api/feedback'
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
        },
        param: null,
        
      }
    },
    created() {
      this.getList()
    },
    methods: {
      searchContList() {
        this.getList()
      },
      getList() {
        feedBackList(this.listQuery).then(response => {
            this.list = response.data
            this.total = response.total
        })
      },
      click(doc_id) {
        this.param = {"doc_id": doc_id}
        handleFeedback(this.param).then(response => {
          this.getList()
        })
      },
    }
  }
  </script>
  
  <style>
  .sortable-ghost{
    opacity: .8;
    color: #fff!important;
    background: #42b983!important;
  }
  </style>
  
  <style scoped>
  .icon-star{
    margin-right:2px;
  }
  .drag-handler{
    width: 20px;
    height: 20px;
    cursor: pointer;
  }
  .show-d{
    margin-top: 15px;
  }
  </style>
  