<template>
  <div>环境监测</div>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped></style>
<template>
  <div class="table-container">
    <vab-query-form>
      <vab-query-form-left-panel>
        <el-button icon="el-icon-plus" type="primary" @click="handleAdd">
          添加
        </el-button>
          </el-form-item>
        </el-form>
      </vab-query-form-left-panel>
    </vab-query-form>

    <el-table
      ref="tableSort"
      v-loading="listLoading"
      :data="list"
      border
      background
      :element-loading-text="elementLoadingText"
      :height="height"
      @selection-change="setSelectRows"
      :header-cell-style="{background:'#eef1f6',color:'#606266'}"
    >
      <el-table-column
        show-overflow-tooltip
        type="selection"
        width="55"
        align="center"
      ></el-table-column>
      <el-table-column
        show-overflow-tooltip
        label="序号"
        width="95"
        align="center"
      >
        <template #default="scope">
          {{ scope.$index + 1 }}
        </template>
      </el-table-column>
      <el-table-column
        show-overflow-tooltip
        prop="name"
        label="角色名称"
        align="center"
      ></el-table-column>
     <el-table-column
        show-overflow-tooltip
        label="操作"
        width="180px"
        align="center"
      >
        <template #default="{ row }">
          <el-button type="primary"  icon="el-icon-edit-outline" @click="handleEdit(row)"></el-button>
          <el-button type="primary" icon="el-icon-delete" @click="handleDelete(row)"></el-button>
        </template>
      </el-table-column>
    </el-table>
    <div style="float:right">
      <el-pagination
        :background="background"
        :current-page="queryForm.pageNo"
        :layout="layout"
        :page-size="queryForm.pageSize"
        :total="total"
        @current-change="handleCurrentChange"
        @size-change="handleSizeChange"
      ></el-pagination>
    </div>

    <table-add ref="edit"></table-add>
  </div>
</template>

<script>
  // import { getList, doDelete } from '@/api/table'
  import TableAdd from './components/add'
  export default {
    name: 'ComprehensiveTable',
    components: {
      TableAdd,
    },
    filters: {
      statusFilter(status) {
        const statusMap = {
          published: 'success',
          draft: 'gray',
          deleted: 'danger',
        }
        return statusMap[status]
      },
    },
    data() {
      return {
        imgShow: true,
        list: [
          {
            name: 'mmmm',
            username: '2222',
            role: '管理员',
            phone: '1311111111',
          },
        ],
        imageList: [],
        listLoading: false,
        layout: 'total, sizes, prev, pager, next, jumper',
        total: 0,
        background: true,
        selectRows: '',
        elementLoadingText: '正在加载...',
        queryForm: {
          pageNo: 1,
          pageSize: 20,
          title: '',
        },
      }
    },
    computed: {
      height() {
      
      },
    },
    created() {
      // this.fetchData()
    },
    beforeDestroy() {},
    mounted() {},
    methods: {
      setSelectRows(val) {
        this.selectRows = val
      },
      //新增
      handleAdd() {
        this.$refs['edit'].showEdit()
      },
      //编辑
      handleEdit(row) {
        this.$refs['edit'].showEdit(row)
      },
      //删除
      // handleDelete(row) {
      //   if (row.id) {
      //     this.$baseConfirm('你确定要删除当前项吗', null, async () => {
      //       const { msg } = await doDelete({ ids: row.id })
      //       this.$baseMessage(msg, 'success')
      //       this.fetchData()
      //     })
      //   } else {
      //     if (this.selectRows.length > 0) {
      //       const ids = this.selectRows.map((item) => item.id).join()
      //       this.$baseConfirm('你确定要删除选中项吗', null, async () => {
      //         const { msg } = await doDelete({ ids: ids })
      //         this.$baseMessage(msg, 'success')
      //         // this.fetchData()
      //       })
      //     } else {
      //       this.$baseMessage('未选中任何行', 'error')
      //       return false
      //     }
      //   }
      // },
      handleSizeChange(val) {
        this.queryForm.pageSize = val
        // this.fetchData()
      },
      handleCurrentChange(val) {
        this.queryForm.pageNo = val
        // this.fetchData()
      },
      //查询
      handleQuery() {
        this.queryForm.pageNo = 1
        // this.fetchData()
      },
      // async fetchData() {
      //   this.listLoading = true
      //   const { data, totalCount } = await getList(this.queryForm)
      //   this.list = data
      //   const imageList = []
      //   data.forEach((item, index) => {
      //     imageList.push(item.img)
      //   })
      //   this.imageList = imageList
      //   this.total = totalCount
      //   setTimeout(() => {
      //     this.listLoading = false
      //   }, 500)
      // },
      testMessage() {
        this.$baseMessage('test1', 'success')
      },
      testALert() {
        this.$baseAlert('11')
        this.$baseAlert('11', '自定义标题', () => {
          /* 可以写回调; */
        })
        this.$baseAlert('11', null, () => {
          /* 可以写回调; */
        })
      },
      testConfirm() {
        this.$baseConfirm(
          '你确定要执行该操作?',
          null,
          () => {
            /* 可以写回调; */
          },
          () => {
            /* 可以写回调; */
          }
        )
      },
      testNotify() {
        this.$baseNotify('测试消息提示', 'test', 'success', 'bottom-right')
      },
    },
  }
</script>
<style lang="scss" scoped>
  ::v-deep .el-table th.el-table__cell > .cell {
    font-weight: 600;
  }
</style>
