<template>
  <div class="upload-img">
    <el-upload
      class="avatar-uploader"
      :headers="imgHeader"
      :action="$uploadUrl"
      accept=".jpg,.png"
      list-type="picture"
      :show-file-list="false"
      :on-success="handleAvatarSuccess"
      :before-upload="beforeAvatarUpload"
      :limit="1"
      :on-remove="handleRemove"
      :on-change="handleChange"
      :file-list="fileList"
    >
      <img v-if="imageUrl" :src="imageUrl" class="avatar">
      <template v-else>
        <i class="el-icon-plus avatar-uploader-icon" />
        <!-- <p>{{ tips }}</p> -->
      </template>
    </el-upload>
  </div>
</template>

<script>
import { getToken } from '@/utils/auth'
export default {
  name: 'UploadImg',
  props: ['imgData', 'imgId'],
  data() {
    return {
      imageUrl: '',
      imgHeader: {
        'Access-Token': getToken()
      },
      fileList: []
    }
  },
  watch: {
    imgData(nl, ol) {
      console.log('val', nl, ol)
      if (ol) {
        this.imageUrl = ol[0].name
      }
      this.imageUrl = nl
    }
  },
  mounted() {},
  methods: {
    handleChange(file) {
      if (file.size > 20 * 1024 * 1024) {
        console.log('上传文件过大', file.size)
        return false // 必须返回false
      }
    },
    handleRemove(file, fileList) {
      console.log('handleRemove', file, fileList, this.imageUrl)
      this.imageUrl = ''
      this.$emit('update:imgData', [])
      this.$emit('update:imgId', null)
    },
    handleAvatarSuccess(res, file) {
      console.log('handleAvatarSuccess', res, file)
      this.imageUrl = URL.createObjectURL(file.raw)
      this.$emit('update:imgData', res.data.url)
      this.$emit('update:imgId', res.data.fileId)
    },
    beforeAvatarUpload(file) {
      debugger
      const isLt1M = file.size / 1024 / 1024 < 20
      if (!isLt1M) {
        this.$message.error('上传头像图片大小不能超过 20MB!')
      }
      return isLt1M
    }
  }
}
</script>

<style lang="scss" scoped>
.upload-img {
  ::v-deep .avatar-uploader {
    .el-upload {
      border: 1px dashed #ccc;
      border-radius: 6px;
      cursor: pointer;
      position: relative;
      overflow: hidden;
      background-color: #fcfdfe;
      margin-left: -40px;
    }
    .el-upload:hover {
      border-color: #409eff;
    }
    .avatar-uploader-icon {
      flex: 1;
      font-size: 30px;
      color: #8c939d;
      width: 120px;
      height: 90px;
      line-height: 90px;
      text-align: center;
    }
    .avatar {
      width: 100px;
      height: 100px;
      display: block;
    }
  }
}
::v-deep .el-upload-list--picture .el-upload-list__item {
  margin-left: -38px;
}
</style>
