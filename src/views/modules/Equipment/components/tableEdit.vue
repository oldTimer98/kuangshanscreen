<template>
  <el-dialog :title="title" :visible.sync="dialogFormVisible" width="900px" @close="close">
    <el-form ref="form" :model="form" :rules="rules" label-width="85px">
      <el-row :gutter="10" type="flex" justify="space-between">
        <el-col :span="12">
          <el-form-item label="用户" prop="userId"><el-input v-model.trim="form.userId" autocomplete="off" clearable :disabled="queryhandle" /></el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="设备名称" prop="name"><el-input v-model.trim="form.name" autocomplete="off" clearable :disabled="queryhandle" /></el-form-item>
        </el-col>
      </el-row>

      <el-col :span="12">
        <el-form-item label="设备类型" prop="deviceType">
          <el-select v-model="form.deviceType" placeholder="请选择" style="width: 100%;"><el-option v-for="item in options" :key="item.index" :value="item" :disabled="queryhandle" /></el-select>
        </el-form-item>
      </el-col>

      <el-col :span="12">
        <el-form-item label="经度" prop="lng"><el-input v-model.trim="form.lng" autocomplete="off" clearable :disabled="queryhandle" /></el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="维度" prop="lat"><el-input v-model.trim="form.lat" autocomplete="off" clearable :disabled="queryhandle" /></el-form-item>
      </el-col>

      <el-col :span="12">
        <el-form-item label="设备状态" prop="status">
          <el-select v-model="form.status" clearable :disabled="queryhandle" style="width: 100%;">
            <el-option label="开启" value="开启" />
            <el-option label="关闭" value="关闭" />
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="设备地址" prop="address"><el-input v-model.trim="form.address" autocomplete="off" clearable :disabled="queryhandle" /></el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="备注信息" prop="remarks"><el-input v-model.trim="form.remarks" autocomplete="off" clearable :disabled="queryhandle" /></el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="设备值1" prop="value"><el-input v-model.trim="form.value" autocomplete="off" clearable :disabled="queryhandle" /></el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="设备值2" prop="value2"><el-input v-model.trim="form.value2" autocomplete="off" clearable :disabled="queryhandle" /></el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="是否在线" prop="online">
          <el-select v-model="form.online" clearable :disabled="queryhandle" style="width: 100%;">
            <el-option label="是" value="是" />
            <el-option label="否" value="否" />
          </el-select>
        </el-form-item>
      </el-col>

      <el-col :span="12">
        <el-form-item label="设备标签1" prop="label1"><el-input v-model.trim="form.label1" autocomplete="off" clearable :disabled="queryhandle" /></el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="设备标签2" prop="label2"><el-input v-model.trim="form.label2" autocomplete="off" clearable :disabled="queryhandle" /></el-form-item>
      </el-col>

      <el-col :span="12">
        <el-form-item label="设备标签3" prop="label3"><el-input v-model.trim="form.label3" autocomplete="off" clearable :disabled="queryhandle" /></el-form-item>
      </el-col>
      <el-col :span="12" />

    </el-form>
    <div v-if="!queryhandle" slot="footer" class="dialog-footer">
      <el-button @click="close">取 消</el-button>
      <el-button type="primary" @click="save">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { saveDevice } from '@/api/mine'

export default {
  name: 'TableEdit',
  data() {
    return {
      form: {},
      rules: {
        userId: [{ required: true, trigger: 'blur', message: '请输入用户名' }],
        name: [{ required: true, trigger: 'blur', message: '请输入设备名称' }],
        deviceType: [{ required: true, trigger: 'blur', message: '请输入设备类型' }],
        status: [{ required: true, trigger: 'blur', message: '请输入设备状态' }],
        online: [{ required: true, trigger: 'blur', message: '不能为空' }]
      },
      title: '',
      dialogFormVisible: false,
      queryhandle: false,
      options: ['风速风向', '温湿度', '气压', '视频监控', '噪音', '细颗粒物', '可吸收颗粒物', '总悬浮颗粒物']
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
      this.$emit('fetch-data')
    },
    save() {
      this.$refs['form'].validate(async valid => {
        if (valid) {
          this.form.companyId = this.$store.state.user.companyId
          const res = await saveDevice(this.form)
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
