import config from '@/config/defaultSettings'

export const setDocumentTitle = function (title) {
  document.title = title
  const ua = navigator.userAgent
  // eslint-disable-next-line
  const regex = /\bMicroMessenger\/([\d\.]+)/
  if (regex.test(ua) && /ip(hone|od|ad)/i.test(ua)) {
    const i = document.createElement('iframe')
    i.src = '/favicon.ico'
    i.style.display = 'none'
    i.onload = function () {
      setTimeout(function () {
        i.remove()
      }, 9)
    }
    document.body.appendChild(i)
  }
}

export const setToolTipContent = function ({
  title,
  color = '#1890ff',
  label,
  values,
  suffix = '',
  hasContainer = true
}) {
  var listDom = '<ul class="g2-tooltip-list">'
  var itemDom =
    '<li>' +
    title +
    '</li>' +
    '<li>' +
    '<span style="background-color:' +
    color +
    ';width:8px;height:8px;border-radius:50%;display:inline-block;margin-right:8px;"></span>' +
    label
  if (Array.isArray(values)) {
    values.forEach(function (value, index) {
      itemDom += '<span class="g2-tooltip-value">' +
        value + (Array.isArray(suffix) ? suffix[index] : suffix) + '</span>'
    })
  } else {
    itemDom += '<span class="g2-tooltip-value">' + values + suffix + '</span>'
  }
  listDom += itemDom + '</li>'
  listDom += '</ul>'
  return hasContainer ? ('<div class="g2-tooltip">' + listDom + '</div>') : listDom
}

export const setToolTipTable = function ({
  title,
  items,
  key,
  suffix = ''
}) {
  var html = '<div class="g2-tooltip">'
  var listDom = '<table class="g2-tooltip-list"><tbody>'
  listDom += '<tr>'
  for (var index = 0; index < title.length; index++) {
    listDom +=
      '<td style="text-align:' + (index === 0 ? 'left' : 'right') + '">' +
      title[index] +
      '</td>'
  }
  listDom += '</tr>'
  for (var i = 0; i < items.length; i++) {
    var item = items[i]
    var itemDom =
      '<tr>' +
      '<td><span style="background-color:' +
      item.color +
      ';width:8px;height:8px;border-radius:50%;display:inline-block;margin-right:8px;"></span>' +
      item.name +
      '</td>' +
      '<td><span class="g2-tooltip-value">' +
      item.value +
      '</span></td>' +
      '<td><span class="g2-tooltip-value">' +
      item.point._origin[key] +
      (Array.isArray(suffix) ? suffix[index] : suffix) +
      '</span></td>' +
      '</tr>'
    listDom += itemDom
  }
  listDom += '</tbody></table>'
  return html + listDom + '</div>'
}

export const domTitle = config.title
