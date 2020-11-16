// 事件分析
export const EVENT_TIP = {
  reportTip: '事件在应用的统计分析中至关重要，用户在应用内所有交互行为的分析均需要依赖对于事件的埋点与监控。',
  tipName: '指标说明',
  tipList: [
    {
      title: '事件数量(日均)：',
      content: '事件被触发的日均次数，数值向下取整'
    },
    {
      title: '触发用户数(日均)：',
      content: '触发事件的日均独立用户数，数值向下取整'
    },
    {
      title: '事件平均使用时长（单次）：',
      content: '单次事件持续的平均时间长度'
    }
  ]
}
// 事件分析-单个事件
export const EVENTDETAIL_TIP = {
  tipName: '指标说明',
  tipList: [
    {
      title: '触发用户数：',
      content: '一段时间内每日触发自定义事件用户数的累计值'
    },
    {
      title: '事件平均使用时长：',
      content: '单次事件持续的平均时间长度'
    }
  ]
}
// 页面分析
export const PAGE_TIP = {
  reportTip: '页面分析报告展示各个页面的访次、停留时间、退出率等指标，体现页面受欢迎的程度。目前支持原生页面（native）及H5页面统计。',
  tipName: '指标说明',
  tipList: [
    {
      title: '页面访问次数：',
      content: '页面被访问的次数，多次跳转重复访问也会被计入'
    },
    {
      title: '访问次数占比：',
      content: '当前页面访问次数占全部页面访问次数的比例'
    },
    {
      title: '次均停留时间：',
      content: '用户访问当前页面的次均停留时间'
    },
    {
      title: '停留时间占比：',
      content: '用户访问当前页面的停留时长的总和占用户在全部页面的停留时长总和的比例'
    },
    {
      title: '退出率：',
      content: '用户从当前页面离开应用的比例'
    },
    {
      title: '入口页次数：',
      content: '该页面作为启动应用时第一个访问的页面的启动次数'
    },
    {
      title: '退出页次数：',
      content: '该页面作为关闭应用时最后一个访问的页面的启动次数'
    }
  ]
}
// 页面分析-单个页面访问
export const PAGEDETAIL_TIP = {
  tipName: '指标说明',
  tipList: [
    {
      title: '页面访问次数：',
      content: '页面被访问的次数，多次跳转重复访问也会被计入'
    },
    {
      title: '次均停留时间：',
      content: '用户访问当前页面的次均停留时间'
    },
    {
      title: '退出率：',
      content: '用户从当前页面离开应用的比例'
    },
    {
      title: '入口页次数：',
      content: '该页面作为启动应用时第一个访问的页面的启动次数'
    },
    {
      title: '退出页次数：',
      content: '该页面作为关闭应用时最后一个访问的页面的启动次数'
    }
  ]
}

// 使用习惯
export const CHARACTER_TIP = {
  reportTip: '本报告从访问深度、使用频率、使用时长、使用间隔四个维度系统刻画用户使用习惯特征，熟悉并把握用户的产品使用习惯特征，对于有针对性的进行产品优化及运营策略制定具有重要意义。',
  tipName: '指标说明',
  tipList: [
    {
      title: '事件数量(日均)：',
      content: '事件被触发的日均次数，数值向下取整事件被触'
    },
    {
      title: '事件数量(日均)：',
      content: '事件被触发的日均次数，数值向下取整'
    }
  ]
}
