'use strict';

var SQL = require('../index'),
  startTime = Date.now(),
  times = 100000;

for (var i = 0; i < times; i++) {
  SQL.select('user_table u, member_table m', {
    'u.name': 'name',
    'u.age': 'age',
    'u.point': 'point',
    'u.create_time': 'createTime',
    'm.id': 'memberId',
    'm.nickname': 'nickname'
  }).where({
    'u.name': ['=', 'hao'],
    'u.age': ['<>', 12, 23],
    'u.point': ['>', 1200],
    'm.user_id': ['==', 'u._id'],
    'm.nickname': ['=', 'hello']
  }).order({
    'u.age': 'asc',
    'u.point': 'desc'
  }).limit('0,30').done();
}

console.log('run times:', times);
console.log('consume time:', Date.now() - startTime, ' ms');
