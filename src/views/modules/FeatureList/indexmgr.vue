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
          <el-form-item label="企业">
            <el-input
              v-model="myForm.name"
              placeholder="请输入企业"
              clearable
            />
          </el-form-item>
        </el-col>
        <el-col :span="5">
          <el-form-item label="年份">
            <el-date-picker
              v-model="myForm.reportYear"
              type="year"
              placeholder="选择年"
              format="yyyy"
              value-format="yyyy"
              style="width: 100%;"
              clearable
            />
          </el-form-item>
        </el-col>
        <el-col :span="5">
          <el-form-item label="季度">
            <el-select v-model="myForm.quarter" placeholder="请选择" style="width: 100%;" clearable>
              <el-option
                v-for="item in options"
                :key="item.index"
                :value="item"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="5">
          <el-form-item label="销售量">
            <el-input
              v-model="myForm.phone"
              placeholder="请输入销售量"
              clearable
            />
          </el-form-item>
        </el-col>
        <el-col :span="5">
          <el-form-item label="开采量">
            <el-input
              v-model="myForm.area"
              placeholder="请输入开采量"
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
        数据上报
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
        label="公司"
        prop="companyName"
        align="center"
      />
      <el-table-column
        show-overflow-tooltip
        label="年份"
        prop="reportYear"
        align="center"
      />
      <el-table-column
        show-overflow-tooltip
        label="季度/月份"
        prop="quarter"
        align="center"
      />
      <el-table-column
        show-overflow-tooltip
        label="开采量（万吨）"
        prop="minedAmount"
        align="center"
      />
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
import { delCompanyRpt, pageListCompanyRpt } from '@/api/mine'
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
      },
      options: ['第一季度', '第二季度', '第三季度', '第四季度']
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
          const res = await delCompanyRpt(row.id)
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
            const res = await delCompanyRpt(ids)
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
        companyId: this.myForm.companyId || null,
        reportYear: this.myForm.reportYear || null,
        storedAmount: this.myForm.storedAmount || null,
        saledAmount: this.myForm.saledAmount || null,
        quarter: this.myForm.quarter || null,
        page: this.queryForm.pageNo || null,
        limit: this.queryForm.pageSize || null
      }
      const res = await pageListCompanyRpt(params)
      if (res.code === 200) {
        this.list = res.data.datas.map(item => {
          return {
            companyId: item.companyId,
            reportYear: item.reportYear,
            saledAmount: item.saledAmount,
            storedAmount: item.storedAmount,
            quarter: item.quarter,
            type: item.type,
            id: item.id,
            minedAmount: item.minedAmount,
            companyName: item.companyName
          }
        })
        console.log(this.list)
        this.total = res.data.total
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
