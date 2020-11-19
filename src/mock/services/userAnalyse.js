import Mock from 'mockjs2'
import {
  builder,
  getBody
} from '../util'

const getterminaldata = () => {
  return builder({
    'list': [{
        'estarttimes': '16',
        'estarttimedis': '41%',
        'enewusersdis': '44.4%',
        'estartusersdis': '100%',
        'avgusetime': '00:00:16',
        'name': '华为'
      },
      {
        'estarttimes': '23',
        'estarttimedis': '59%',
        'enewusersdis': '55.6%',
        'estartusersdis': 0,
        'avgusetime': '00:05:00',
        'name': '联想'
      }
    ]
  }, '', 200)
}

const getterminalpic = () => {
  return builder({
    'list': [{
        'estarttimes': '16',
        'estarttimedis': '41%',
        'enewusersdis': '44.4%',
        'estartusersdis': '100%',
        'avgusetime': '00:00:16',
        'name': '华为'
      },
      {
        'estarttimes': '23',
        'estarttimedis': '59%',
        'enewusersdis': '55.6%',
        'estartusersdis': 0,
        'avgusetime': '00:05:00',
        'name': '联想'
      }
    ]
  }, '', 200)
}

const getversion = () => {
  return builder({
    'list': [{
      'eupgradeusers': '0',
      'enewusers': '16',
      'estarttimes': '16',
      'estartusersdis': '100%',
      'avgusetime': '100%',
      'name': '2.0.3'
    }]
  }, '', 200)
}

const getversionpic = () => {
  return builder({
    'list': [{
        'eupgradeusers': '0',
        'enewusers': '16',
        'estartusers': '16',
        'estarttimes': '16',
        'estarttimedis': '100%',
        'estartusersdis': '100%',
        'enewuserdis': '100%',
        'name': '2020-11-16'
      },
      {
        'eupgradeusers': '0',
        'enewusers': '18',
        'estartusers': '18',
        'estarttimes': '18',
        'estarttimedis': '100%',
        'estartusersdis': '100%',
        'enewuserdis': '100%',
        'name': '2020-11-17'
      }
    ]
  }, '', 200)
}

const getvisitor = (option) => {
  const { pageindex } = getBody(option)
  return builder({
    'pageindex': pageindex,
    'pagesize': 10,
    'total': 156,
    'list': [{
        'name': '189',
        'channel': 'androidchannel',
        'os': 'Android6.1',
        'startup_province': '福建省',
        'equipment_number': '荣耀9X',
        'resolving_power': '1080*2159',
        'networking_mode': '其它',
        'startup_time': '1605497667',
        'version': '2.0.3'
      },
      {
        'name': '188',
        'channel': 'androidchannel',
        'os': 'Android6.0',
        'startup_province': '福建省',
        'equipment_number': '华为麦芒5',
        'resolving_power': '1080*2110',
        'networking_mode': '3G',
        'startup_time': '1605497667',
        'version': '2.0.3'
      }
    ]
  }, '', 200)
}

Mock.mock(/\/terminal\/getterminaldata/, 'post', getterminaldata)
Mock.mock(/\/terminal\/getterminalpic/, 'post', getterminalpic)
Mock.mock(/\/version\/getversionpic/, 'post', getversionpic)
Mock.mock(/\/version\/getversion/, 'post', getversion)
Mock.mock(/\/visitor\/getvisitor/, 'post', getvisitor)
