### j-sql
tool for generate sql from js

###examples
```js
var select = require('j-sql').select;
var update = require('j-sql').update;

var sql = select('user_table', '*');
//select * from user_table

var sql = select('user_table', ['name', 'age', 'point', 'create_time']);
//select name, age, point, create_time from user_table

var sql = select('user_table', {
  name: 'name',
  age: 'age',
  point: 'point',
  create_time: 'createTime'
});
//select name as name, age as age, point as point, create_time as createTime from user_table

var sql = select('user_table', ['name', 'age', 'point', 'create_time'], {
  limit: '0,30'
});
//select name, age, point, create_time from user_table limit 0,30

var sql = select('user_table', ['name', 'age', 'point', 'create_time'], {
  group: 'name'
});
//select name, age, point, create_time from user_table group by name

var sql = select('user_table', ['name', 'age', 'point', 'create_time'], {
  where: {
    'name': ['=', 'hao'],
    'age': ['<>', '12', '23'],
    'point': ['>' '1200']
  }
});
//select name, age, point, create_time from user_table where name ="hao" and age between 12 and 23 and point > 1200

var sql = select('user_table', ['name', 'age', 'point', 'create_time'], {
  order: {
    age: 'asc',
    point: 'desc'
  }
});
//select name, age, point, create_time from user_table order by age asc, point desc

var sql = update('user_table', {
  name: 'hao',
  age: 22,
  point: 1200,
  create_time: '2013-8-26'
});
//update user_table set name = "hao", age = 22, point = 1200, create_time = "2013-8-26"

var sql = update('user_table', {
  name: 'xin',
  age: 23,
  point: 1300,
  create_time: '2013-8-27'
}, {
  'name': ['=', 'hao'],
  'age': ['<>', '12', '23'],
  'point': ['>', '1200']
});
//update user_table set name = "xin", age = 23, point = 1300, create_time = "2013-8-27" where name ="hao" and age between 12 and 23 and point > 1200
```
