import request from '@/utils/request'
// 矿物列表保存
export function save(data) {
  return request({
    url: `/declare/api/mineCompany/save`,
    method: 'post',
    data
  })
}
// 矿物列表
export function mcList(data) {
  return request({
    url: `/declare/api/mineCompany/pageList`,
    method: 'post',
    data
  })
}
//
export function exDetailApi(id) {
  return request({
    url: `/declare/api/mineCompany/find/${id}`,
    method: 'get'
  })
}
// 设备列表保存
export function saveDevice(data) {
  return request({
    url: `/declare/api/mineDevice/save`,
    method: 'post',
    data
  })
}
// 设备列表
export function deviceList(data) {
  return request({
    url: `/declare/api/mineDevice/pageList`,
    method: 'post',
    data
  })
}

export function deviceApi(id) {
  return request({
    url: `/declare/api/mineDevice/find/${id}`,
    method: 'get'
  })
}

export function delCompany(id) {
  return request({
    url: `/declare/api/mineCompany/del/${id}`,
    method: 'post'
  })
}

export function delDevice(id) {
  return request({
    url: `/declare/api/mineDevice/del/${id}`,
    method: 'post'
  })
}

export function delCompanyRpt(id) {
  return request({
    url: `/declare/api/mineCompanyRpt/del/${id}`,
    method: 'post'
  })
}

export function saveCompanyRpt(data) {
  return request({
    url: `/declare/api/mineCompanyRpt/save`,
    method: 'post',
    data
  })
}

export function pageListCompanyRpt(data) {
  return request({
    url: `/declare/api/mineCompanyRpt/pageFcqOrder`,
    method: 'post',
    data
  })
}

export function saveMinePerson(data) {
  return request({
    url: `/declare/api/minePerson/save`,
    method: 'post',
    data
  })
}

export function pageListMinePerson(data) {
  return request({
    url: `/declare/api/minePerson/pageList`,
    method: 'post',
    data
  })
}

export function delMinePerson(id) {
  return request({
    url: `/declare/api/minePerson/del/${id}`,
    method: 'post'
  })
}

export function saveMineCar(data) {
  return request({
    url: `/declare/api/mineCar/save`,
    method: 'post',
    data
  })
}

export function delMineCar(id) {
  return request({
    url: `/declare/api/mineCar/del/${id}`,
    method: 'post'
  })
}

export function pageListMineCar(data) {
  return request({
    url: `/declare/api/mineCar/pageList`,
    method: 'post',
    data
  })
}

export function pageListArticle(data) {
  return request({
    url: `/declare/api/cmsArticle/list`,
    method: 'post',
    data
  })
}

export function saveArticle(data) {
  return request({
    url: `/declare/api/cmsArticle/save`,
    method: 'post',
    data
  })
}

export function getArticle(id) {
  return request({
    url: `/declare/api/cmsArticle/getById/${id}`,
    method: 'get'
  })
}

export function delArticle(id) {
  return request({
    url: `/declare/api/cmsArticle/del/${id}`,
    method: 'post'
  })
}

export function summaryData() {
  return request({
    url: `/declare/api/mineCompany/getSummary`,
    method: 'get'
  })
}
export function summaryMineType() {
  return request({
    url: `/declare/api/mineCompany/getSummaryMineType`,
    method: 'get'
  })
}



export function myMine() {
  return request({
    url: `/declare/api/mineCompany/myMine`,
    method: 'get'
  })
}

export function saveMineReserve(data) {
  return request({
    url: `/declare/api/mineReserve/save`,
    method: 'post',
    data
  })
}

export function delMineReserve(id) {
  return request({
    url: `/declare/api/mineReserve/del/${id}`,
    method: 'post'
  })
}

export function pageListMineReserve(data) {
  return request({
    url: `/declare/api/mineReserve/pageList`,
    method: 'post',
    data
  })
}

export function getFeedback(aid, cid) {
  return request({
    url: `/declare/api/mineCmsRel/findEntityByArticleId/${cid}/${aid}`,
    method: 'get'
  })
}

export function feedbackList(data) {
  return request({
    url: `/declare/api/mineCmsRel/pageList`,
    method: 'post',
    data
  })
}

export function saveFeedBack(data) {
  console.log(data)
  return request({
    url: `/declare/api/mineCmsRel/save`,
    method: 'post',
    data
  })
}
