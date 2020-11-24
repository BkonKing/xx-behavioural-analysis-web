import Mock from 'mockjs2'
import { builder, getBody } from '../util'
const getEventList = (options) => {
  const { pageindex } = getBody(options)
  return builder({
    'pageindex': pageindex,
    'pagesize': 10,
    'total': 156,
    'list': [
      {
        'numberevents': 1,
        'userevents': 1,
        'name': 3,
        'eventname': '全部应用编辑'
      },
      {
        'numberevents': 1,
        'userevents': 1,
        'name': 5,
        'eventname': '签到'
      },
      {
        'numberevents': 1,
        'userevents': 1,
        'name': 6,
        'eventname': '搜索'
      },
      {
        'numberevents': 1,
        'userevents': 1,
        'name': 8,
        'eventname': '扫一扫'
      },
      {
        'numberevents': 1,
        'userevents': 1,
        'name': 11,
        'eventname': '消息'
      }
    ]
  }, '', 200, { 'Custom-Header': Mock.mock('@guid') })
}

const getEventDetail = (options) => {
  return builder({
    'list': [
      {
        'name': '2020/11/11',
        'date': '2020/11/11',
        'numberevents': '2',
        'userevents': '1'
      },
      {
        'name': '2020/11/12',
        'date': '2020/11/12',
        'numberevents': '4',
        'userevents': '5'
      }
    ]
  }, '', 200, { 'Custom-Header': Mock.mock('@guid') })
}

const getEventContans = (options) => {
  return builder({
    'list': [
      {
          'id': '1',
          'event_name': '登录'
      },
      {
          'id': '2',
          'event_name': '注册'
      },
      {
          'id': '3',
          'event_name': '全部应用编辑'
      },
      {
          'id': '4',
          'event_name': '签到'
      },
      {
          'id': '5',
          'event_name': '搜索'
      },
      {
          'id': '6',
          'event_name': '扫一扫'
      },
      {
          'id': '7',
          'event_name': '消息'
      },
      {
          'id': '8',
          'event_name': '活动报名'
      },
      {
          'id': '9',
          'event_name': '商品分类查看'
      },
      {
          'id': '10',
          'event_name': '加入购物车'
      },
      {
          'id': '11',
          'event_name': '立即购买'
      },
      {
          'id': '12',
          'event_name': '立即兑换'
      },
      {
          'id': '13',
          'event_name': '购物车移除商品'
      },
      {
          'id': '14',
          'event_name': '购物车'
      },
      {
          'id': '15',
          'event_name': '结算'
      },
      {
          'id': '16',
          'event_name': '付款'
      },
      {
          'id': '17',
          'event_name': '商品详情'
      },
      {
          'id': '18',
          'event_name': '商品分享'
      },
      {
          'id': '19',
          'event_name': '闪购开抢提醒'
      },
      {
          'id': '20',
          'event_name': '闪购邀请好友'
      },
      {
          'id': '21',
          'event_name': '闪购一起拼单'
      },
      {
          'id': '22',
          'event_name': '热门搜索点击'
      },
      {
          'id': '23',
          'event_name': '去认证房间'
      },
      {
          'id': '24',
          'event_name': '房间认证提交'
      },
      {
          'id': '25',
          'event_name': '云门禁-二维码开门'
      },
      {
          'id': '26',
          'event_name': '云门禁-一键开门'
      },
      {
          'id': '27',
          'event_name': '公告通知轮播'
      },
      {
          'id': '28',
          'event_name': '公告通知详情'
      },
      {
          'id': '29',
          'event_name': '报事报修提交'
      },
      {
          'id': '30',
          'event_name': '免费服务查看'
      },
      {
          'id': '31',
          'event_name': '访客邀约发起'
      },
      {
          'id': '32',
          'event_name': '访客添加'
      },
      {
          'id': '33',
          'event_name': '访客通行证分享'
      },
      {
          'id': '34',
          'event_name': '投诉提交'
      },
      {
          'id': '35',
          'event_name': '表扬提交'
      },
      {
          'id': '36',
          'event_name': '问卷参与'
      },
      {
          'id': '37',
          'event_name': '投票参与'
      },
      {
          'id': '38',
          'event_name': '呼叫物业'
      },
      {
          'id': '39',
          'event_name': '呼叫便民电话'
      },
      {
          'id': '40',
          'event_name': '点赞'
      },
      {
          'id': '41',
          'event_name': '评论'
      },
      {
          'id': '42',
          'event_name': '发帖'
      },
      {
          'id': '43',
          'event_name': '动态投诉'
      },
      {
          'id': '44',
          'event_name': '帖子删除'
      },
      {
          'id': '45',
          'event_name': '活动分享'
      },
      {
          'id': '46',
          'event_name': '付款码使用'
      },
      {
          'id': '47',
          'event_name': '收款码使用'
      },
      {
          'id': '48',
          'event_name': '任务去完成'
      },
      {
          'id': '49',
          'event_name': '优惠券查看'
      },
      {
          'id': '50',
          'event_name': '幸福币查看'
      },
      {
          'id': '51',
          'event_name': '订单取消'
      },
      {
          'id': '52',
          'event_name': '查看物流'
      },
      {
          'id': '53',
          'event_name': '联系订单客服'
      },
      {
          'id': '54',
          'event_name': '联系商品客服'
      },
      {
          'id': '55',
          'event_name': '申请换货'
      },
      {
          'id': '56',
          'event_name': '申请退换退款'
      },
      {
          'id': '57',
          'event_name': '申请退款'
      },
      {
          'id': '58',
          'event_name': '我的互动查看'
      },
      {
          'id': '59',
          'event_name': '常见问题查看'
      },
      {
          'id': '60',
          'event_name': '意见反馈提交'
      },
      {
          'id': '61',
          'event_name': '幸福基金提交'
      },
      {
          'id': '62',
          'event_name': '事务处理查看'
      },
      {
          'id': '63',
          'event_name': '事务-确定受理'
      },
      {
          'id': '64',
          'event_name': '事务-分派人员'
      },
      {
          'id': '65',
          'event_name': '事务-接受任务'
      },
      {
          'id': '66',
          'event_name': '事务-添加进度'
      },
      {
          'id': '67',
          'event_name': '事务-确定结案'
      },
      {
          'id': '68',
          'event_name': '事务-取消任务'
      },
      {
          'id': '69',
          'event_name': '事务-上传照片'
      },
      {
          'id': '70',
          'event_name': '事务-撤销提报'
      },
      {
          'id': '71',
          'event_name': '我的资料查看'
      },
      {
          'id': '72',
          'event_name': '成员添加'
      },
      {
          'id': '73',
          'event_name': '当前房产切换'
      },
      {
          'id': '74',
          'event_name': '进行人脸采集'
      },
      {
          'id': '75',
          'event_name': '修改支付密码'
      },
      {
          'id': '76',
          'event_name': '修改登录密码'
      },
      {
          'id': '77',
          'event_name': '字体大小修改'
      },
      {
          'id': '78',
          'event_name': '清除缓存'
      },
      {
          'id': '79',
          'event_name': '切换账号'
      },
      {
          'id': '80',
          'event_name': '退出登录'
      },
      {
          'id': '81',
          'event_name': '更新版本'
      }
    ]
  }, '', 200, { 'Custom-Header': Mock.mock('@guid') })
}
Mock.mock(/\/event\/geteventlist/, 'post', getEventList)
Mock.mock(/\/event\/getsinglelist/, 'post', getEventDetail)
Mock.mock(/\/event\/geteventcontanslist/, 'post', getEventContans)

const getPagesList = (options) => {
  const { pageindex } = getBody(options)
  return builder({
    'pageindex': pageindex,
    'pagesize': 10,
    'total': 156,
    'list': [
      {
          'path': 'addressEdit',
          'remark': '添加/修改地址',
          'epagecount': '1',
          'eusetime': '01:17:26',
          'eentrycount': '0',
          'epagecountdis': '8.3%',
          'eusetimedis': '8.2%',
          'eleavecount': '0',
          'eleavecountdis': '0',
          'name': '26'
      },
      {
          'path': 'logisticsBusiness',
          'remark': '物流-商家',
          'epagecount': '1',
          'eusetime': '01:23:42',
          'eentrycount': '0',
          'epagecountdis': '8.3%',
          'eusetimedis': '8.9%',
          'eleavecount': '0',
          'eleavecountdis': '0',
          'name': '24'
      },
      {
          'path': 'logisticsSelf',
          'remark': '物流-自提',
          'epagecount': '1',
          'eusetime': '01:24:09',
          'eentrycount': '0',
          'epagecountdis': '8.3%',
          'eusetimedis': '8.9%',
          'eleavecount': '0',
          'eleavecountdis': '0',
          'name': '22'
      }
    ]
  }, '', 200, { 'Custom-Header': Mock.mock('@guid') })
}
const getPagesContans = (options) => {
  return builder({
    'list': [
      {
          'id': '1',
          'remark': '生活首页'
      },
      {
          'id': '2',
          'remark': '全部商品页'
      },
      {
          'id': '3',
          'remark': '闪购页'
      },
      {
          'id': '4',
          'remark': '特卖页'
      },
      {
          'id': '5',
          'remark': '专区页'
      },
      {
          'id': '6',
          'remark': '商品详情'
      },
      {
          'id': '7',
          'remark': '搜索'
      },
      {
          'id': '8',
          'remark': '购物车'
      },
      {
          'id': '9',
          'remark': '结算'
      },
      {
          'id': '10',
          'remark': '优惠券'
      },
      {
          'id': '11',
          'remark': '优惠券选择'
      },
      {
          'id': '12',
          'remark': '我的订单'
      },
      {
          'id': '13',
          'remark': '订单详情'
      },
      {
          'id': '14',
          'remark': '闪购订单详情'
      },
      {
          'id': '15',
          'remark': '申请退换'
      },
      {
          'id': '16',
          'remark': '申请换货'
      },
      {
          'id': '17',
          'remark': '换货详情'
      },
      {
          'id': '18',
          'remark': '申请退款'
      },
      {
          'id': '19',
          'remark': '退款详情'
      },
      {
          'id': '20',
          'remark': '填写退换货物流'
      },
      {
          'id': '21',
          'remark': '物流列表'
      },
      {
          'id': '22',
          'remark': '物流-自提'
      },
      {
          'id': '23',
          'remark': '物流-配送'
      },
      {
          'id': '24',
          'remark': '物流-商家'
      },
      {
          'id': '25',
          'remark': '收货地址'
      },
      {
          'id': '26',
          'remark': '添加/修改地址'
      },
      {
          'id': '27',
          'remark': '地址-地图'
      },
      {
          'id': '28',
          'remark': '首页'
      },
      {
          'id': '29',
          'remark': '管家'
      },
      {
          'id': '30',
          'remark': '邻里'
      },
      {
          'id': '31',
          'remark': '我的'
      },
      {
          'id': '32',
          'remark': '登录'
      },
      {
          'id': '33',
          'remark': '全部应用'
      },
      {
          'id': '34',
          'remark': '用户协议'
      },
      {
          'id': '35',
          'remark': '云门禁'
      },
      {
          'id': '36',
          'remark': '我的开门记录'
      },
      {
          'id': '37',
          'remark': '公告通知'
      },
      {
          'id': '38',
          'remark': '公告通知详情'
      },
      {
          'id': '39',
          'remark': '报事报修'
      },
      {
          'id': '40',
          'remark': '报事报修详情'
      },
      {
          'id': '41',
          'remark': '报事报修列表'
      },
      {
          'id': '42',
          'remark': '评价'
      },
      {
          'id': '43',
          'remark': '免费服务'
      },
      {
          'id': '44',
          'remark': '我的免费服务列表'
      },
      {
          'id': '45',
          'remark': '确认免费服务'
      },
      {
          'id': '46',
          'remark': '访客邀约'
      },
      {
          'id': '47',
          'remark': '邀约页面'
      },
      {
          'id': '48',
          'remark': '我的访客列表'
      },
      {
          'id': '49',
          'remark': '我的邀约记录'
      },
      {
          'id': '50',
          'remark': '我的访客编辑'
      },
      {
          'id': '51',
          'remark': '投诉表扬'
      },
      {
          'id': '52',
          'remark': '投诉表扬列表'
      },
      {
          'id': '53',
          'remark': '投诉表扬详情'
      },
      {
          'id': '54',
          'remark': '问卷投票'
      },
      {
          'id': '55',
          'remark': '问卷投票详情'
      },
      {
          'id': '56',
          'remark': '我的问卷投票列表'
      },
      {
          'id': '57',
          'remark': '呼叫物业'
      },
      {
          'id': '58',
          'remark': '便民电话'
      },
      {
          'id': '59',
          'remark': '发布帖子'
      },
      {
          'id': '60',
          'remark': '帖子详情'
      },
      {
          'id': '61',
          'remark': '小组列表'
      },
      {
          'id': '62',
          'remark': '回复页面'
      },
      {
          'id': '63',
          'remark': '设置'
      },
      {
          'id': '64',
          'remark': '切换账号'
      },
      {
          'id': '65',
          'remark': '个人资料'
      },
      {
          'id': '66',
          'remark': '新增房产'
      },
      {
          'id': '67',
          'remark': '选择小区'
      },
      {
          'id': '68',
          'remark': '选择房产'
      },
      {
          'id': '69',
          'remark': '手机验证'
      },
      {
          'id': '70',
          'remark': '支付密码'
      },
      {
          'id': '71',
          'remark': '忘记支付密码'
      },
      {
          'id': '72',
          'remark': '登录密码'
      },
      {
          'id': '73',
          'remark': '意见反馈'
      },
      {
          'id': '74',
          'remark': '意见反馈列表'
      },
      {
          'id': '75',
          'remark': '意见反馈详情'
      },
      {
          'id': '76',
          'remark': '事务处理'
      },
      {
          'id': '77',
          'remark': '事务处理详情页'
      },
      {
          'id': '78',
          'remark': '消息'
      },
      {
          'id': '79',
          'remark': '签到'
      },
      {
          'id': '80',
          'remark': '幸福币记录'
      },
      {
          'id': '81',
          'remark': '购买记录'
      },
      {
          'id': '82',
          'remark': '幸福币明细'
      },
      {
          'id': '83',
          'remark': '收付款'
      },
      {
          'id': '84',
          'remark': '我的互动'
      },
      {
          'id': '85',
          'remark': '常见问题'
      },
      {
          'id': '86',
          'remark': '扫码'
      },
      {
          'id': '87',
          'remark': '协议列表'
      },
      {
          'id': '88',
          'remark': '屏蔽设置'
      },
      {
          'id': '89',
          'remark': '开屏页'
      },
      {
          'id': '90',
          'remark': '人脸收集'
      }
    ]
  }, '', 200, { 'Custom-Header': Mock.mock('@guid') })
}
const getPagesChart = (options) => {
  return builder({
    'pagecount': '12',
    'usetimesum': '01:18:46',
    'leavedis': 0,
    'list': [
      {
        'epagecount': '12',
        'eusetime': '01:10:46',
        'eleavecountdis': '12',
        'name': '2020/11/11'
      },
      {
        'epagecount': '16',
        'eusetime': '01:18:46',
        'eleavecountdis': '8',
        'name': '2020/11/12'
      }
    ]
  }, '', 200, { 'Custom-Header': Mock.mock('@guid') })
}
const getPagesDetail = (options) => {
  return builder({
    'pagecount': '1',
    'leavecount': '2',
    'leavedis': 20,
    'stoptime': '00:12:52',
    'entrycount': '3',
    'list': [
      {
        'name': '2020/11/11',
        'epagecount': '1',
        'eusetime': '01:17:11',
        'eentrycount': '3',
        'eleavecount': '2',
        'eleavecountdis': '9'
      },
      {
        'name': '2020/11/12',
        'epagecount': '3',
        'eusetime': '01:19:11',
        'eentrycount': '3',
        'eleavecount': '4',
        'eleavecountdis': '2'
      }
    ]
  }, '', 200, { 'Custom-Header': Mock.mock('@guid') })
}
Mock.mock(/\/page\/getpagelistpic/, 'post', getPagesChart)
Mock.mock(/\/page\/getpagelist/, 'post', getPagesList)
Mock.mock(/\/page\/getpagecontanslist/, 'post', getPagesContans)
Mock.mock(/\/page\/getsinglepage/, 'post', getPagesDetail)

const getDashboardJson = (options) => {
  return builder({
    'newuser': 10,
    'newuserand': 2,
    'newuserios': 8,
    'yestodaynewuser': 5,
    'yestodaynewuserand': 2,
    'yestodaynewuserios': 3,
    'todaystarttimes': '6',
    'todaystarttimesand': '2',
    'todaystarttimesios': '4',
    'yestodaystarttimes': '8',
    'yestodaystarttimesand': '3',
    'yestodaystarttimesios': '5',
    'todaystartusers': '9',
    'todaystartusersand': '5',
    'todaystartusersios': '4',
    'yesdaystartusers': '11',
    'yesdaystartusersand': '7',
    'yesdaystartusersios': '4',
    'todaycumulativestart': '100',
    'todaycumulativestartand': '100',
    'todaycumulativestartios': '0',
    'yesdaycumulativestart': '100',
    'yesdaycumulativestartand': '100',
    'yesdaycumulativestartios': '0'
  }, '', 200, { 'Custom-Header': Mock.mock('@guid') })
}
const getDashboardChart = (options) => {
  return builder({
    'list': [
      {
          'name': '2020/11/11',
          'startusers': '18'
      },
      {
          'name': '2020/11/12',
          'startusers': '17'
      },
      {
          'name': '2020/11/16',
          'startusers': '16'
      },
      {
          'name': '2020/11/13',
          'startusers': '0'
      },
      {
          'name': '2020/11/14',
          'startusers': '0'
      },
      {
          'name': '2020/11/15',
          'startusers': '0'
      }
    ]
  }, '', 200, { 'Custom-Header': Mock.mock('@guid') })
}
Mock.mock(/\/mobilestatistics\/getsum/, 'post', getDashboardJson)
Mock.mock(/\/mobilestatistics\/statisticschart/, 'post', getDashboardChart)
