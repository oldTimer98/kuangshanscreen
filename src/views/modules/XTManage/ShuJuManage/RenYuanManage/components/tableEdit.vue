<template>
  <el-dialog
    :title="title"
    :visible.sync="dialogFormVisible"
    width="800px"
    @close="close"
  >
    <el-form ref="form" :model="form" :rules="rules" label-width="100px">
      <el-row>
        <el-col :span="12">
          <el-form-item label="姓名" prop="name">
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
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="身份证" prop="idCard">
            <el-input
              v-model.trim="form.idCard"
              autocomplete="off"
              clearable
              :disabled="queryhandle"
            />
          </el-form-item>
        </el-col>

        <el-col :span="12">
          <el-form-item label="性别" prop="sex">
            <el-radio v-model="form.sex" label="男">男</el-radio>
            <el-radio v-model="form.sex" label="女">女</el-radio>
          </el-form-item>
        </el-col>
      </el-row>

      <el-col :span="12">
        <el-form-item label="员工编号" prop="workerNo">
          <el-input
            v-model.trim="form.workerNo"
            autocomplete="off"
            clearable
            :disabled="queryhandle"
          />
        </el-form-item>
      </el-col>

    </el-form>
    <div v-if="!queryhandle" slot="footer" class="dialog-footer">
      <el-button @click="close">取 消</el-button>
      <el-button type="primary" @click="save">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { saveMinePerson } from '@/api/mine'
export default {
  name: 'TableEdit',
  data() {
    return {
      form: {},
      rules: {
        user_id: [{ required: true, trigger: 'blur', message: '请输入用户名' }],
        name: [{ required: true, trigger: 'blur', message: '请输入设备名称' }]
      },
      title: '',
      queryhandle: false,
      dialogFormVisible: false
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
          const res = await saveMinePerson(this.form)
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
