var select = require('./index').select;

var startTime = Date.now();
var times = 1000000;

for (var i = 0; i < times; i++) {
  select('user_table', {
    'name': 'name',
    'age': 'age',
    'point': 'point',
    'create_time': 'createTime'
  }, {
    where: {
      'name': ['=', 'hao'],
      'age': ['<>', 12, 23],
      'point': ['>', 1200]
    },
    order: {
      'age': 'asc',
      'point': 'desc'
    },
    limit: '0,30'
  });
}

console.log('run times:', times);
console.log('consume time:', Date.now() - startTime, ' ms');
