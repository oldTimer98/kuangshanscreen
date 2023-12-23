<template>
  <div class="table-container" style="margin: 20px">
    <el-form
      ref="form"
      :model="myForm"
      label-width="80px"
      style="background-color: #e5f6ff;"
      @submit.native.prevent
    >
      <el-row :gutter="10" type="flex" justify="space-between">
        <el-col :span="10">
          <el-form-item label="设备名称">
            <el-input
              v-model="myForm.name"
              placeholder="请输入设备名称"
              clearable
            />
          </el-form-item>
        </el-col>
        <el-col :span="10">
          <el-form-item label="设备类型">
            <el-input
              v-model="myForm.deviceType"
              placeholder="请输入设备类型"
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
        添加设备
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
      :height="400"
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
        prop="userId"
        label="用户"
        align="center"
        width="120"
      />
      <el-table-column
        show-overflow-tooltip
        label="设备名称"
        prop="name"
        align="center"
        width="120"
      />

      <el-table-column
        show-overflow-tooltip
        label="设备类型"
        prop="deviceType"
        align="center"
        width="120"
      />
      <el-table-column
        show-overflow-tooltip
        label="经度"
        prop="lng"
        align="center"
        width="120"
      />

      <el-table-column
        show-overflow-tooltip
        label="维度"
        prop="lat"
        align="center"
        width="120"
      />
      <el-table-column
        show-overflow-tooltip
        label="设备值1"
        prop="value"
        align="center"
        width="120"
      />
      <el-table-column
        show-overflow-tooltip
        label="设备值2"
        prop="value2"
        width="120"
        align="center"
      />
      <el-table-column
        show-overflow-tooltip
        label="设备状态"
        prop="status"
        align="center"
        width="120"
      />
      <el-table-column
        show-overflow-tooltip
        label="设备地址"
        prop="address"
        width="120"
        align="center"
      />

      <el-table-column
        show-overflow-tooltip
        label="备注信息"
        prop="remarks"
        width="120"
        align="center"
      />
      <el-table-column
        show-overflow-tooltip
        label="是否在线"
        prop="online"
        width="120"
        align="center"
      />
      <el-table-column
        show-overflow-tooltip
        label="设备标签"
        prop="label1"
        width="120"
        align="center"
      />
      <el-table-column
        show-overflow-tooltip
        label="设备标签2"
        prop="label2"
        width="120"
        align="center"
      />
      <el-table-column
        show-overflow-tooltip
        label="设备标签3"
        prop="label3"
        width="120"
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
import { deviceList, delDevice } from '@/api/mine'
import TableEdit from './components/tableEdit'
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
      }
    }
  },
  computed: {},
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
      console.log(row)
      if (row.id) {
        console.log(row.id)
        this.$confirm('你确定要删除当前项吗', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true
        }).then(async() => {
          console.log(1111)
          const res = await delDevice(row.id)
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
          const ids = this.selectRows.map((item) => item.id)
          console.log(ids)
          this.$confirm('你确定要删除选中项吗', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
            center: true
          }).then(() => {
            ids.forEach(async(item) => {
              const res = await delDevice(item)
              console.log(res)
            })
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
    // 获取数据
    async getInfo() {
      const params = {
        userId: this.myForm.userId || null,
        name: this.myForm.name || null,
        companyId: this.$store.state.user.companyId || null,
        deviceType: this.myForm.deviceType || null,
        lng: this.myForm.lng || null,
        lat: this.myForm.lat || null,
        value: this.myForm.value || null,
        status: this.myForm.status || null,
        address: this.myForm.address || null,
        remarks: this.myForm.remarks || null,
        value2: this.myForm.value2 || null,
        online: this.myForm.online || null,
        label1: this.myForm.label1 || null,
        label2: this.myForm.label2 || null,
        label3: this.myForm.label3 || null,
        page: this.queryForm.pageNo || null,
        limit: this.queryForm.pageSize || null
      }
      const res = await deviceList(params)
      if (res.code === 200) {
        this.list = res.data.datas.map(item => {
          return {
            id: item.id,
            userId: item.userId,
            name: item.name,
            companyId: item.companyId,
            deviceType: item.deviceType,
            lng: item.lng,
            lat: item.lat,
            value: item.value,
            status: item.status,
            address: item.address,
            remarks: item.remarks,
            value2: item.value2,
            online: item.online,
            label1: item.label1,
            label2: item.label2,
            label3: item.label3
          }
        })
        this.total = res.data.total
      }
    }
  }
}
</script>
<style lang="scss" scoped>

</style>
