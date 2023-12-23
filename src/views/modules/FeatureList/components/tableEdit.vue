<template>
  <el-dialog
    :title="title"
    :visible.sync="dialogFormVisible"
    width="820px"
    @close="close"
  >
    <el-form ref="form" :model="form" :rules="rules" label-width="130px">

      <el-row :gutter="10" type="flex" justify="space-between">
        <el-col :span="10">
          <el-form-item label="年份" prop="reportYear">
            <el-date-picker
              v-model="form.reportYear"
              type="year"
              placeholder="选择年"
              format="yyyy"
              value-format="yyyy"
              style="width: 100%;"
            />
          </el-form-item>
        </el-col>
        <el-col :span="14">
          <el-form-item label="销售量（万吨）" prop="saledAmount">
            <el-input
              v-model.trim="form.saledAmount"
              autocomplete="off"
              clearable
              :disabled="queryhandle"
            />
          </el-form-item>
        </el-col>

      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item>
            <el-switch
              v-model="form.type"
              active-text="月"
              inactive-text="季度"
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="10" type="flex" justify="space-between">
        <el-col v-if="form.type==0" :span="10">
          <el-form-item label="季度" prop="quarter">
            <el-select v-model="form.quarter" placeholder="请选择" style="width: 100%;" clearable>
              <el-option
                v-for="item in options"
                :key="item.index"
                :value="item"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col v-else :span="10">
          <el-form-item label="月份" prop="quarter">
            <el-select v-model="form.quarter" placeholder="请选择" style="width: 100%;" clearable>
              <el-option
                v-for="item in month"
                :key="item.index"
                :value="item"
              />
            </el-select>
          </el-form-item>

        </el-col>
        <el-col :span="14">
          <el-form-item label="开采量（万吨）" prop="minedAmount">
            <el-input
              v-model.trim="form.minedAmount"
              autocomplete="off"
              clearable
              :disabled="queryhandle"
            />
          </el-form-item>
        </el-col>

      </el-row>
    </el-form>
    <div v-if="!queryhandle" slot="footer" class="dialog-footer">
      <el-button @click="close">取 消</el-button>
      <el-button type="primary" @click="save">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { saveCompanyRpt,myMine } from '@/api/mine'

export default {
  name: 'TableEdit',
  data() {
    return {
      cid:'',
      companyName: '',
      form: {
        type: false
      },
      rules: {
        user_id: [{ required: true, trigger: 'blur', message: '请输入用户名' }],
        name: [{ required: true, trigger: 'blur', message: '请输入设备名称' }]
      },
      title: '',
      queryhandle: false,
      dialogFormVisible: false,
      options: ['第一季度', '第二季度', '第三季度', '第四季度'],
      mining: true,
      month: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月']
    }
  },
  created() {
    this.getInfo()
  },
  methods: {
    showEdit(val) {
      if (val.add === '新增') {
        this.title = val.add
      } else if (val.edit === '编辑') {
        this.title = val.edit
        const newRow = { ...val.row }
        newRow.type = newRow.type === '1'
        console.log(newRow)
        this.form = Object.assign({}, newRow)
      } else if (val.query === '详情') {
        this.title = val.query
        this.queryhandle = true
        const newRow = { ...val.row }
        newRow.type = newRow.type === '1'
        this.form = Object.assign({}, newRow)
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
          this.form.companyId = this.cid
          this.form.type = this.form.type ? '1' : '0'
          const res = await saveCompanyRpt(this.form)
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
    },
    async getInfo(){
      const res = await myMine()
      if(res.code === 200){
        this.cid = res.data.id
        this.companyName = res.data.name
      }
      
    }
    
  }
}
</script>
<style scoped="scoped" lang="scss">

</style>
