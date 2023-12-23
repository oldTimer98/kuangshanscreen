<template>
  <div class="upload-box">
    <el-upload
      class="upload-demo"
      :action="$uploadUrl"
      :headers="imgHeader"
      accept=".pdf, .jpg, .jpeg, .png"
      show-file-list
      :on-remove="handleRemove"
      :on-preview="handlePreview"
      :on-change="handleChange"
      :before-remove="beforeRemove"
      :on-success="handleAvatarSuccess.bind(this, 4)"
      :before-upload="beforeUploadFile"
      multiple
      :limit="3"
      :on-exceed="handleExceed"
      :file-list="fileList"
    >
      <el-button class="upload" size="small" type="primary">点击上传</el-button>
      <div class="el-upload__tip">支持pdf、jpg、jpeg、png格式，文件大小不超过20M</div>
    </el-upload>
  </div>
</template>

<script>
import { getToken } from '@/utils/auth'
export default {
  name: 'Upload',
  props: ['uploadValue', 'fileId'],
  data() {
    return {
      // uploadUrl: '/declare/api/upload',
      imgHeader: {
        'Access-Token': getToken()
      },
      fileList: [],
      fileIds: []
    }
  },
  watch: {
    fileList() {
      this.$emit('update:fileId', this.fileList)
    },
    fileId(nv, ov) {
      if (nv != null && Array.isArray(nv)) {
        this.fileList = nv
      }
    }
  },
  methods: {
    handleChange(file) {
      if (file.size > 20 * 1024 * 1024) {
        console.log('上传文件过大', file.size)
        return false // 必须返回false
      }
    },
    handleRemove(file, fileList) {
      console.log('handleRemove', file, this.fileList)
      this.fileList = this.fileList.filter(item => {
        return file.attaId !== item.attaId
      })
      this.fileIds = this.fileIds.filter(item => {
        return file !== item
      })
      this.$emit('update:uploadValue', [])
      this.$emit('update:fileId', this.fileList)
    },
    beforeRemove() {},
    handleExceed() {},
    handlePreview(file) {
      console.log(file)
      window.open(file.url)
    },
    handleAvatarSuccess(type, response, file, fileList) {
      console.log('handleAvatarSuccess', type, response, file, fileList)
      const res = file.response
      if (res.code === 200) {
        this.$emit('update:uploadValue', res.data.url)
        this.fileList.push({
          attaId: res.data.fileId,
          attaUrl: res.data.url,
          url: res.data.url,
          name: '附件' + (this.fileList.length + 1)
        })
        this.$emit('update:uploadValue', this.fileList)
        this.$emit('update:fileId', this.fileList)
      }
    },
    beforeUploadFile(file) {
      const testmsg = file.name.substring(file.name.lastIndexOf('.') + 1).toLowerCase()
      const extension = testmsg === 'png'
      const extension2 = testmsg === 'jpg'
      const extension3 = testmsg === 'pdf'
      const size = file.size / 1024 / 1024 < 20

      if (!extension && !extension2 && !extension3 && !extension3) {
        return this.$message({
          message: '上传文件只能是JPG,PNG,PDF格式!',
          type: 'danger'
        })
      }
      if (size > 20) {
        this.$message({
          type: 'danger',
          message: `文件大小不得超过20M!`
        })
      }

      return (extension || extension2 || extension3) && size
    }
  }
}
</script>

<style scoped lang="scss">
.upload-box {
  position: relative;
}
.upload {
  background-color: #56baff;
  color: #f6fbff;
  position: absolute;
  left: 0;
  top: 3px;
}
.el-upload__tip {
  margin-top: -33px;
  margin-left: 100px;
}
::v-deep .el-upload-list {
  margin-top: 20px;
}
.el-button {
  border-color: #56baff;
}
</style>
