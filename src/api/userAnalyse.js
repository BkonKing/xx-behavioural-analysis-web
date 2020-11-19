import request from '@/utils/request'

const userAnalyseApi = {
  terminalTable: '/terminal/getterminaldata',
  terminalChart: '/terminal/getterminalpic'
}

export function getterminaldata (data) {
  return request({
    url: userAnalyseApi.terminalTable,
    method: 'POST',
    data
  })
}

export function getterminalpic (data) {
  return request({
    url: userAnalyseApi.terminalChart,
    method: 'POST',
    data
  })
}
