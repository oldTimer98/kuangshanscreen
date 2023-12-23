<template>
  <div class="article">
    <div class="article-header">
      <div class="header-title">{{ data.title }}</div>
      <div class="header-time">{{ data.createDate }}</div>
    </div>
    <div class="fankui">
      <span>通知信息：</span>
    </div>
    <div style="margin-left: 20px;" v-html="data.content" />
    <div class="fankui">
      <span>反馈信息：</span>
      <el-input
        v-model="feedBack"
        type="textarea"
        :autosize="{ minRows: 2, maxRows: 4}"
        placeholder="请输入内容"
      />
    </div>
    <div class="fankui">
      <span>上传附件：</span>
      <Upload :file-id.sync="attaId" style="margin-left: 20px;" />
    </div>
    <div class="form-btns" align="center" style="margin-top: 15px">
      <el-button
        plain
        size="medium"
        type="primary"
        @click="callback"
      >返回</el-button>
    </div>
  </div>
</template>
<script>
import { getArticle, getFeedback, saveFeedBack } from '@/api/mine'
import Upload from '@/components/Upload/upload.vue'
export default {
  components: {
    Upload
  },
  data() {
    return {
      data: {},
      feedBack: '',
      attaId: ''
    }
  },
  created() {
    this.detailRequest()
  },
  methods: {
    async detailRequest() {
      const id = this.$route.query.id
      const res = await getArticle(id)
      if (res.code !== 200) return this.$message.error(res.message)
      this.data = res.data
      const feedback = await getFeedback(this.data.id, localStorage.getItem('companyId'))
      if (feedback.code === 200) {
        this.attaId = JSON.parse(feedback.data.attaId)
        this.feedBack = feedback.data.remarks
      }
    },

    async callback() {
      const params = {
        companyId: localStorage.getItem('companyId'),
        articleId: this.data.id,
        remarks: this.feedBack,
        attaId: JSON.stringify(this.attaId)
      }
      console.log(params)
      const feedback = await saveFeedBack(params)
      if (feedback.code === 200) {
        this.$router.go(-1)
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.article {
  .article-header {
    border-bottom: 1px solid #dee2e6!important;
    width: 95%;
    margin: 0 auto 20px;
    padding: 30px 0px;
    box-sizing: border-box;
    text-align: center;
    border-bottom: 1px solid #f7f7f7;
    .header-title {
      font-weight: bold;
      font-size: 24px;
      color: #000000;
    }
    .header-time {
      font-size: 16px;
      color: #6c757d;
      margin-top: 20px;
    }
  }
  .article-body {
    padding: 24px 50px;
    box-sizing: border-box;
  }
  p {
    width: 95%;
    margin: 0 auto;
    line-height: 30px;
    margin-bottom: 20px;
    font-size: 16px;
    color: #212529!important;
  }
  margin: 10px;
}
.article p {
  width: 95%;
  margin: 0 auto;
  line-height: 30px;
  margin-bottom: 20px;
  font-size: 16px;
  color: #212529!important;
}
.fankui{
  width: 95%;
  margin: 0 auto;
  line-height: 30px;
  margin-bottom: 20px;
  font-size: 16px;
  font-weight: bold;
  color: #212529!important;
}
</style>
