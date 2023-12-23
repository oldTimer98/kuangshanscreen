<template>
  <div class="table-container" style="margin: 20px">
    <el-form
      ref="form"
      :model="myForm"
      label-width="100px"
      style="background-color: #e5f6ff;"
      @submit.native.prevent
    >
      <el-row :gutter="10" type="flex" justify="space-between">
        <el-col :span="5">
          <el-form-item label="姓名">
            <el-input
              v-model="myForm.name"
              placeholder="请输入姓名"
              clearable
            />
          </el-form-item>
        </el-col>
        <el-col :span="5">
          <el-form-item label="设备编号">
            <el-input
              v-model="myForm.deviceId"
              placeholder="请输入设备编号"
              clearable
            />
          </el-form-item>
        </el-col>
        <el-col :span="5">
          <el-form-item label="身份证">
            <el-input
              v-model="myForm.idCard"
              placeholder="请输入身份证"
              clearable
            />
          </el-form-item>
        </el-col>
        <el-col :span="5">
          <el-form-item label="性别">
            <el-input
              v-model="myForm.sex"
              placeholder="请输入性别"
              clearable
            />
          </el-form-item>
        </el-col>
        <el-col :span="5">
          <el-form-item label="员工编号">
            <el-input
              v-model="myForm.workerNo"
              placeholder="请输入员工编号"
              clearable
            />
          </el-form-item>
        </el-col>
      </el-row>

    </el-form>
    <div style="float: left; margin: 5px 0">
      <el-button
        icon="el-icon-search"
        type="primary"
        native-type="submit"
        @click="handleQuery"
      >
        查询
      </el-button>
    </div>
    <div style="float: right; margin: 5px 0">
      <el-button icon="el-icon-plus" type="primary" @click="handleAdd">
        添加人员
      </el-button>
      <el-button icon="el-icon-delete" type="danger" @click="handleDelete">
        删除
      </el-button>
    </div>
    <el-table
      ref="tableSort"
      v-loading="listLoading"
      :data="list"
      border
      background
      :element-loading-text="elementLoadingText"
      :height="450"
      :header-cell-style="{ background: '#eef1f6', color: '#606266' }"
      @selection-change="setSelectRows"
      @row-dblclick="cellClick"
    >
      <el-table-column
        show-overflow-tooltip
        type="selection"
        width="55"
        align="center"
        fixed
      />
      <el-table-column
        show-overflow-tooltip
        prop="name"
        label="姓名"
        align="center"
        width="120"
      />
      <el-table-column
        show-overflow-tooltip
        label="员工编号"
        prop="workerNo"
        align="center"
      />

      <el-table-column
        show-overflow-tooltip
        label="设备"
        prop="deviceId"
        align="center"
      />

      <el-table-column
        show-overflow-tooltip
        label="身份证"
        prop="idCard"
        align="center"
      />
      <el-table-column
        show-overflow-tooltip
        label="性别"
        prop="sex"
        align="center"
      />

      <el-table-column
        show-overflow-tooltip
        label="操作"
        width="150"
        fixed="right"
        align="center"
      >
        <template #default="{ row }">
          <el-button
            type="primary"
            icon="el-icon-edit-outline"
            @click="handleEdit(row)"
          />
          <el-button
            type="primary"
            icon="el-icon-delete"
            @click="handleDelete(row)"
          />
        </template>
      </el-table-column>
    </el-table>
    <div style="float: right">
      <el-pagination
        :background="background"
        :current-page="queryForm.pageNo"
        :layout="layout"
        :page-size="queryForm.pageSize"
        :total="total"
        @current-change="handleCurrentChange"
        @size-change="handleSizeChange"
      />
    </div>
    <table-edit ref="edit" @getInfo="getInfo" />
  </div>
</template>

<script>
import TableEdit from './components/tableEdit'
import { delMinePerson, pageListMinePerson } from '@/api/mine'
export default {
  name: 'ComprehensiveTable',
  components: {
    TableEdit
  },
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'gray',
        deleted: 'danger'
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      imgShow: true,
      companyId: '',

      list: [],
      listLoading: false,
      layout: 'total, sizes, prev, pager, next, jumper',
      total: 0,
      background: true,
      selectRows: '',
      elementLoadingText: '正在加载...',
      myForm: {},
      queryForm: {
        pageNo: 1,

        pageSize: 10
      },
      QueryOrAddOrEdit: {
        query: '详情',
        add: '新增',
        edit: '编辑'
      }
    }
  },
  computed: {
  },
  created() {
    this.getInfo()
  },
  beforeDestroy() {},
  mounted() {},
  methods: {
    setSelectRows(val) {
      this.selectRows = val
    },
    // 查看详情
    cellClick(row) {
      console.log(row)
      const queryOrrow = {
        query: this.QueryOrAddOrEdit.query,
        row: row
      }
      this.$refs['edit'].showEdit(queryOrrow)
    },
    // 新增
    handleAdd() {
      const addOrrow = {
        add: this.QueryOrAddOrEdit.add
      }
      this.$refs['edit'].showEdit(addOrrow)
    },
    // 编辑
    handleEdit(row) {
      const eidtOrrow = {
        edit: this.QueryOrAddOrEdit.edit,
        row: row
      }
      this.$refs['edit'].showEdit(eidtOrrow)
    },
    // 删除
    handleDelete(row) {
      if (row.id) {
        console.log(row.id)
        this.$confirm('你确定要删除当前项吗', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true
        }).then(async() => {
          console.log(1111)
          const res = await delMinePerson(row.id)
          console.log(res)
          this.getInfo()
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
        }).catch(() => {
          this.$message({
            type: 'error',
            message: '删除失败'
          })
        })
      } else {
        if (this.selectRows.length > 0) {
          const ids = this.selectRows.map((item) => item.id).join()
          this.$confirm('你确定要删除选中项吗', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
            center: true
          }).then(async() => {
            const res = await delMinePerson(ids)
            console.log(res)
            this.getInfo()
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
          }).catch(() => {
            this.$message({
              type: 'error',
              message: '删除失败'
            })
          })
        } else {
          this.$message({
            type: 'error',
            message: '未选中任何行'
          })
          return false
        }
      }
    },
    handleSizeChange(val) {
      console.log(val)
      this.queryForm.pageSize = val

      this.getInfo()
    },
    handleCurrentChange(val) {
      this.queryForm.pageNo = val

      this.getInfo()
    },
    // 查询
    handleQuery() {
      this.queryForm.pageNo = 1

      this.getInfo()
    },

    // 获取列表数据
    async getInfo() {
      const params = {

        name: this.myForm.name || null,
        companyId: this.$store.state.user.companyId || null,
        deviceId: this.myForm.deviceId || null,
        idCard: this.myForm.idCard || null,
        sex: this.myForm.sex || null,
        workerNo: this.myForm.workerNo || null,
        page: this.queryForm.pageNo || null,
        limit: this.queryForm.pageSize || null
      }
      const res = await pageListMinePerson(params)
      if (res.code === 200) {
        if (res.data.datas) {
          this.list = res.data.datas.map(item => {
            return {
              name: item.name,
              companyId: item.companyId,
              deviceId: item.deviceId,
              idCard: item.idCard,
              sex: item.sex,
              workerNo: item.workerNo,
              id: item.id
            }
          })
          this.total = res.data.total
        }
        this.list = res.data.datas
      }
    }
  }
}
</script>
<style lang="scss" scoped>
  ::v-deep .el-table th.el-table__cell > .cell {
    font-weight: 600;
  }
</style>
