<template>
  <el-dialog
    :title="title"
    :visible.sync="dialogFormVisible"
    width="400px"
    @close="close"
  >
    <el-form ref="form" :model="form" :rules="rules" label-width="80px">
      <el-form-item label="设备" prop="author">
        <el-select
          v-model="value"
          placeholder="请选择设备"
          clearable
          style="width: 250px"
        >
          <el-option
            v-for="item in equipments"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="指标" prop="author">
        <el-select
          v-model="value"
          placeholder="请选择角色"
          clearable
          style="width: 250px"
        >
          <el-option
            v-for="item in optionLabels"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="规则" prop="author">
        <el-select
          v-model="value"
          placeholder="请选择角色"
          clearable
          style="width: 250px"
        >
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="阈值" prop="author" clearable>
        <el-input v-model.trim="form.author" autocomplete="off" placeholder="当大于等于150Ug/cm³时，报警"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="close">取 消</el-button>
      <el-button type="primary" @click="save">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
  // import { doEdit } from '@/api/table'

  export default {
    name: 'TableEdit',
    data() {
      return {
        form: {
          title: '',
          author: '',
        },
        rules: {
          title: [{ required: true, trigger: 'blur', message: '请输入标题' }],
          author: [{ required: true, trigger: 'blur', message: '请输入作者' }],
        },
        title: '',
        dialogFormVisible: false,
        equipments:[],
        optionLabels: [],
        options: [
          {
            value: '1',
            label: '等于',
          },
          {
            value: '2',
            label: '大于',
          },
          {
            value: '3',
            label: '小于',
          },
          {
            value: '4',
            label: '大于等于',
          },
          {
            value: '5',
            label: '小于等于',
          },
        ],
        value: '',
      }
    },
    created() {},
    methods: {
      showEdit(row) {
        if (!row) {
          this.title = '添加'
        } else {
          this.title = '编辑'
          this.form = Object.assign({}, row)
        }
        this.dialogFormVisible = true
      },
      close() {
        this.$refs['form'].resetFields()
        this.form = this.$options.data().form
        this.dialogFormVisible = false
        this.$emit('fetch-data')
      },
      // save() {
      //   this.$refs['form'].validate(async (valid) => {
      //     if (valid) {
      //       const { msg } = await doEdit(this.form)
      //       this.$baseMessage(msg, 'success')
      //       this.$refs['form'].resetFields()
      //       this.dialogFormVisible = false
      //       this.$emit('fetch-data')
      //       this.form = this.$options.data().form
      //     } else {
      //       return false
      //     }
      //   })
      // },
    },
  }
</script>
