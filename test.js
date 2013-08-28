var select = require('./index').select;
var update = require('./index').update;

describe('select', function () {
  it('1', function () {
    var sql = select('user_table', '*');
    console.log(sql);
  })
  it('2', function () {
    var sql = select('user_table', ['name', 'age', 'point', 'create_time']);
    console.log(sql);
  })
  it('3', function () {
    var sql = select('user_table', {
      name: 'name',
      age: 'age',
      point: 'point',
      create_time: 'createTime'
    });
    console.log(sql);
  })
  it('4', function () {
    var sql = select('user_table', ['name', 'age', 'point', 'create_time'], {
      limit: '0,30'
    });
    console.log(sql);
  })
  it('5', function () {
    var sql = select('user_table', ['name', 'age', 'point', 'create_time'], {
      group: 'name'
    });
    console.log(sql);
  })
  it('6', function () {
    var sql = select('user_table', ['name', 'age', 'point', 'create_time'], {
      where: {
        'name': '="hao"',
        'age': 'between 12 and 23',
        'point': '> 1200'
      }
    });
    console.log(sql);
  })
  it('7', function () {
    var sql = select('user_table', ['name', 'age', 'point', 'create_time'], {
      order: {
        age: 'asc',
        point: 'desc'
      }
    });
    console.log(sql);
  })
})

describe('update', function () {
  it('1', function () {
    var sql = update('user_table', {
      name: 'hao',
      age: 22,
      point: 1200,
      create_time: '2013-8-26'
    });
    console.log(sql);
  })
  it('2', function () {
    var sql = update('user_table', {
      name: 'xin',
      age: 23,
      point: 1300,
      create_time: '2013-8-27'
    }, {
      where: {
        'name': '="hao"',
        'age': 'between 12 and 23',
        'point': '> 1200'
      }
    });
    console.log(sql);
  })
})
