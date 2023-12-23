<template>
  <el-dialog
    :title="title"
    :visible.sync="dialogFormVisible"
    width="800px"
    @close="close"
  >
    <el-form ref="form" :model="form" :rules="rules" label-width="100px">

      <el-col :span="12">
        <el-form-item label="车辆名称" prop="name">
          <el-input
            v-model.trim="form.name"
            autocomplete="off"
            clearable
            :disabled="queryhandle"
          />
        </el-form-item>
      </el-col>

      <el-col :span="12">
        <el-form-item label="设备" prop="deviceId">
          <el-input
            v-model.trim="form.deviceId"
            autocomplete="off"
            clearable
            :disabled="queryhandle"
          />
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="车牌号" prop="carNo">
          <el-input
            v-model.trim="form.carNo"
            autocomplete="off"
            clearable
            :disabled="queryhandle"
          />
        </el-form-item>
      </el-col>

      <el-col :span="12">
        <el-form-item label="车辆颜色" prop="color">
          <el-select v-model="form.color " placeholder="请选择" style="width: 100%;">
            <el-option
              v-for="item in colorList"
              :key="item.id"
              :label="item.value"
              :value="item.value"
              :disabled="queryhandle"
            />
          </el-select>
        </el-form-item>

      </el-col></el-form>
    <div v-if="!queryhandle" slot="footer" class="dialog-footer">
      <el-button @click="close">取 消</el-button>
      <el-button type="primary" @click="save">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { saveMineCar } from '@/api/mine'
export default {
  name: 'TableEdit',
  data() {
    return {
      form: {},
      rules: {

      },
      title: '',
      queryhandle: false,
      dialogFormVisible: false,
      colorList: [{ id: 1, value: '黑色' }, { id: 2, value: '白色' }, { id: 3, value: '红色' }, { id: 4, value: '紫色' }, { id: 5, value: '黄色' }, { id: 6, value: '银白色' }]
    }
  },
  created() {},
  methods: {
    showEdit(val) {
      if (val.add === '新增') {
        this.title = val.add
      } else if (val.edit === '编辑') {
        this.title = val.edit
        this.form = Object.assign({}, val.row)
      } else if (val.query === '详情') {
        this.title = val.query
        this.queryhandle = true
        this.form = Object.assign({}, val.row)
      }
      this.dialogFormVisible = true
    },
    close() {
      this.$refs['form'].resetFields()
      this.form = this.$options.data().form
      this.queryhandle = false
      this.dialogFormVisible = false
      this.$emit('getInfo')
    },
    // 编辑保存,新增保存
    save() {
      this.$refs['form'].validate(async(valid) => {
        if (valid) {
          this.form.companyId = this.$store.state.user.companyId
          const res = await saveMineCar(this.form)
          console.log(res)
          if (res.code === 200) {
            this.$message({
              message: res.message,
              type: 'success'
            })
          }
          this.$refs['form'].resetFields()
          this.dialogFormVisible = false
          this.$emit('getInfo')
          this.form = this.$options.data().form
        } else {
          return false
        }
      })
    }
  }
}
</script>
<style scoped="scoped" lang="scss">

</style>
