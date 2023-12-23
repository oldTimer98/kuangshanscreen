<template>
  <el-dialog
    :title="title"
    :visible.sync="dialogFormVisible"
    width="800px"
    @close="close"
  >
    <el-form ref="form" :model="form" :rules="rules" label-width="85px">
      <el-row :gutter="10" type="flex" justify="space-between">
        <el-col :span="12">
          <el-form-item label="主标题" prop="title">
            <el-input
              v-model.trim="form.title"
              autocomplete="off"
              clearable
              :disabled="queryhandle"
            />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="副标题" prop="subTitle">
            <el-input
              v-model.trim="form.subTitle"
              autocomplete="off"
              clearable
              :disabled="queryhandle"
            />
          </el-form-item>
        </el-col>

      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="文章简介" prop="info">
            <el-input
              v-model="form.info"
              autocomplete="off"
              type="textarea"
              :autosize="{ minRows: 2, maxRows: 4}"
              clearable
              :disabled="queryhandle"
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="标题图" prop="picurl">
            <el-upload
              class="upload-demo"
              :action="$uploadUrl"
              :on-preview="handlePictureCardPreview"
              :on-remove="handleRemove"
              :on-success="handleAvatarSuccess"
              :headers="imgHeader"
              :limit="1"
              list-type="picture-card"
            >
              <i class="el-icon-plus" />
            </el-upload>
            <div v-if="dialogVisible">
              <img height="50px" :src="dialogImageUrl" alt="">
            </div>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="文章内容" prop="content">
            <tinymce v-model="form.content" v-if="openDetail" :height="250" />
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="24">
          <el-form-item label="备注" prop="remarks">
            <el-input
              v-model.trim="form.remarks"
              autocomplete="off"
              type="textarea"
              :autosize="{ minRows: 2, maxRows: 4}"
              clearable
              :disabled="queryhandle"
            />
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="8">
          <el-form-item label="发布方式" prop="publishType">
            <el-select v-model="form.publishType" :disabled="queryhandle" placeholder="请选择发布方式">
              <el-option label="草稿" value="0" />
              <el-option label="发布" value="1" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="是否要反馈" prop="feedback">
            <el-switch v-model="form.feedback" />
          </el-form-item>
        </el-col>


      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="是否推荐" prop="commended">
            <el-switch v-model="form.commended" />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="是否置顶" prop="topped">
            <el-switch v-model="form.topped" />
          </el-form-item>
        </el-col>
      </el-row>
      <!-- <el-row>
        <el-col :span="8">
          <el-form-item label="外链" prop="outLink">
            <el-switch v-model="form.outLink" />
          </el-form-item>
        </el-col>
        <el-col :span="4" />
        <el-col :span="4" />
      </el-row> -->

    </el-form>
    <div v-if="!queryhandle" slot="footer" class="dialog-footer">
      <el-button @click="close">取 消</el-button>
      <el-button type="primary" @click="save">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { saveArticle } from '@/api/mine'
import { getToken } from '@/utils/auth'
import Tinymce from '../../../../components/Tinymce/index.vue'
export default {
  name: 'TableEdit',
  components: {
    Tinymce
  },
  data() {
    return {
      openDetail:false,
      form: {
        picurl: null
      },
      rules: {
        title: [{ required: true, trigger: 'blur', message: '请输入主标题' }]
      },
      title: '',
      dialogFormVisible: false,
      queryhandle: false,
      dialogImageUrl: '',
      dialogVisible: false,
      fileList: [],
      imgHeader: {
        'Access-Token': getToken()
      }
    }
  },
  created() {},
  methods: {
    showEdit(val) {
      this.openDetail = true
      if (val.add === '新增') {
        this.title = val.add
      } else if (val.edit === '编辑') {
        this.title = val.edit
        const newRow = { ...val.row }
        if(newRow.picurlAttaUrl){
          this.dialogVisible = true
          this.dialogImageUrl= newRow.picurlAttaUrl
        }
        delete newRow.picurlAttaUrl
        // val.row.published = val.row.published === '是' ? 1 : 0
        newRow.topped = (newRow.topped === '是')
        newRow.commended = (newRow.commended === '是')
        newRow.disabled = (newRow.disabled === '是')
        this.form = Object.assign({}, newRow)
      } else if (val.query === '详情') {
        this.title = val.query
        this.queryhandle = true
        const newRow = { ...val.row }
        // val.row.published = val.row.published === '是' ? 1 : 0
        newRow.topped = (newRow.topped === '是')
        newRow.commended = (newRow.commended === '是')
        newRow.feedback = (newRow.feedback === '是')
        console.log(newRow)
        this.form = Object.assign({}, newRow)
      }
      this.dialogFormVisible = true
    },
    close() {
      this.$refs['form'].resetFields()
      this.form = this.$options.data().form
      this.queryhandle = false
      this.dialogFormVisible = false
      this.$emit('fetch-data')
      this.openDetail = false
    },
    save() {
      this.$refs['form'].validate(async(valid) => {
        if (valid) {
          this.form.feedback = this.form.feedback === true ? 1 : 0
          this.form.disabled = this.form.disabled === true ? 1 : 0
          this.form.topped = this.form.topped === true ? 1 : 0
          this.form.commended = this.form.commended === true ? 1 : 0
          // this.form.outLink = this.form.outLink === true ? 1 : 0
          this.form.publishType = this.form.publishType === '1' ? 1 : 0
          const res = await saveArticle(this.form)
          console.log(res)
          this.openDetail = false
          if (res.code === 200) {
            this.$message({
              message: res.message,
              type: 'success'
            })
          }
          this.$refs['form'].resetFields()
          this.form.picurl = null
          this.dialogFormVisible = false
          this.$emit('getInfo')
          this.form = this.$options.data().form
        } else {
          return false
        }
      })
    },
    handleRemove(file, fileList) {
      console.log(file, fileList)
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    handleAvatarSuccess(res, file) {
      console.log(res, file)
      if (res.code === 200) {
        // this.fileList.push(res.data)
        this.form.picurl = res.data.fileId
      }
      console.log(this.fileList)
    }
  }
}
</script>
<style scoped="scoped" lang="scss">
 ::v-deep .el-upload--picture-card{
   width: 80px;
   height: 80px;
   line-height: 80px;
 }
  ::v-deep .el-upload-list--picture-card .el-upload-list__item{
   width: 80px;
   height: 80px;
 }

</style>
