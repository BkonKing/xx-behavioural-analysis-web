import Mock from 'mockjs2'
import {
  builder
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

Mock.mock(/\/terminal\/getterminaldata/, 'post', getterminaldata)
Mock.mock(/\/terminal\/getterminalpic/, 'post', getterminalpic)
