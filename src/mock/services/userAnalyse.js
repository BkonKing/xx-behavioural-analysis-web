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
  const {
    pageindex
  } = getBody(option)
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

const getdistribution = () => {
  return builder({
    'list': [{
        'name': '江苏省',
        'starttimes': '8',
        'starttimesdis': '34.8%',
        'newusersdis': '34.8%',
        'startusersdis': 0
      },
      {
        'name': '福建省',
        'starttimes': '15',
        'starttimesdis': '65.2%',
        'newusersdis': '65.2%',
        'startusersdis': '100%'
      }
    ],
    'piclist': [{
        'name': '江苏省',
        'starttimes': '8',
        'starttimesdis': '34.8'
      },
      {
        'name': '福建省',
        'starttimes': '15',
        'starttimesdis': '65.2'
      }
    ]
  }, '', 200)
}

const getusertrend = () => {
  return builder({
    'startusersum': '42',
    'newusersum': 32,
    'starttimes': '32',
    'oldusersum': 10,
    'oldusersumdis': 23.8,
    'newusersumdis': 76.2,
    'list': [{
        'estarttimes': '16',
        'everynewusers': '16',
        'everystartusers': '16',
        'oldusers': 1,
        'oldusersdis': 5.9,
        'newusersdis': 94.1,
        'timesdurationuse': '00:01:18',
        'avgdurationuse': '00:01:13',
        'name': '2020/11/12'
      },
      {
        'estarttimes': '16',
        'everynewusers': '16',
        'everystartusers': '16',
        'oldusers': 0,
        'oldusersdis': 0,
        'newusersdis': 100,
        'timesdurationuse': '00:01:18',
        'avgdurationuse': '00:01:18',
        'name': '2020/11/16'
      }
    ]
  }, '', 200)
}

const getRetentionList = () => {
  return builder({
    'newuserssum': '10',
    'reminduserssum': '1',
    'reminddis': 10,
    'pageindex': 1,
    'pagesize': 10,
    'list': [{
      'eremindusers': '1',
      'enewusers': '10',
      'ereminddis': 10,
      'name': '2020/11/11'
    }]
  }, '', 200)
}

const getActiveuserList = () => {
  return builder({
    'total': 2,
    'pageindex': 1,
    'pagesize': 10,
    'list': [{
        'name': '2020/11/16',
        'daystartusers': '16',
        'weekstatusers': '41',
        'monthstatusers': '49',
        'sumstatusers': '49',
        'dayactive': '32.7',
        'dayormonthactive': '32.7',
        'weekactive': '83.7',
        'monthactive': '100'
      },
      {
        'name': '2020/11/11',
        'daystartusers': '8',
        'weekstatusers': '17',
        'monthstatusers': '17',
        'sumstatusers': '17',
        'dayactive': '47.1',
        'dayormonthactive': '47.1',
        'weekactive': '100',
        'monthactive': '100'
      }
    ]
  }, '', 200)
}

const getActiveuserPic = () => {
  return builder({
    'list': [{
        'name': '2020/11/11',
        'dayormonthactive': 47.1,
        'sumstatusers': 143,
        'startusers': 13
      },
      {
        'name': '2020/11/16',
        'dayormonthactive': 32.7,
        'sumstatusers': 12,
        'startusers': 14
      }
    ]
  }, '', 200)
}

Mock.mock(/\/terminal\/getterminaldata/, 'post', getterminaldata)
Mock.mock(/\/terminal\/getterminalpic/, 'post', getterminalpic)
Mock.mock(/\/version\/getversionpic/, 'post', getversionpic)
Mock.mock(/\/version\/getversion/, 'post', getversion)
Mock.mock(/\/visitor\/getvisitor/, 'post', getvisitor)
Mock.mock(/\/geographical\/getdistribution/, 'post', getdistribution)
Mock.mock(/\/usertrend\/getusertrend/, 'post', getusertrend)
Mock.mock(/\/retention\/getlist/, 'post', getRetentionList)
Mock.mock(/\/activeuser\/getlist/, 'post', getActiveuserList)
Mock.mock(/\/activeuser\/getactivepic/, 'post', getActiveuserPic)
