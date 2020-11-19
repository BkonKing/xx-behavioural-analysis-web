import request from '@/utils/request'

const userAnalyseApi = {
  terminalTable: '/terminal/getterminaldata',
  terminalChart: '/terminal/getterminalpic',
  versionTable: '/version/getversion',
  versionChart: '/version/getversionpic',
  visitor: '/visitor/getvisitor'
}

// 终端分析表格
export function getterminaldata (data) {
  return request({
    url: userAnalyseApi.terminalTable,
    method: 'POST',
    data
  })
}

// 终端分析图表
export function getterminalpic (data) {
  return request({
    url: userAnalyseApi.terminalChart,
    method: 'POST',
    data
  })
}

// 版本分析表格
export function getversion (data) {
  return request({
    url: userAnalyseApi.versionTable,
    method: 'POST',
    data
  })
}

// 版本分析图表
export function getversionpic (data) {
  return request({
    url: userAnalyseApi.versionChart,
    method: 'POST',
    data
  })
}

// 实时访客
export function getvisitor (data) {
  return request({
    url: userAnalyseApi.visitor,
    method: 'POST',
    data
  })
}
