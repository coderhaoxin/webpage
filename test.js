var q = require('./index');

describe('test mongo-sql-select', function () {
  it('1', function () {
    var sql = q('user_table', '*');
    console.log(sql);
  })
  it('2', function () {
    var sql = q('user_table', ['name', 'age', 'point', 'create_time']);
    console.log(sql);
  })
  it('3', function () {
    var sql = q('user_table', {
      name: 'name',
      age: 'age',
      point: 'point',
      create_time: 'createTime'
    });
    console.log(sql);
  })
  it('4', function () {
    var sql = q('user_table', ['name', 'age', 'point', 'create_time'], {
      limit: '0,30'
    });
    console.log(sql);
  })
  it('5', function () {
    var sql = q('user_table', ['name', 'age', 'point', 'create_time'], {
      group: 'name'
    });
    console.log(sql);
  })
  it('6', function () {
    var sql = q('user_table', ['name', 'age', 'point', 'create_time'], {
      where: {
        'name': '="hao"',
        'age': 'between 12 and 23',
        'point': '> 1200'
      }
    });
    console.log(sql);
  })
  it('7', function () {
    var sql = q('user_table', ['name', 'age', 'point', 'create_time'], {
      order: {
        age: 'asc',
        point: 'desc'
      }
    });
    console.log(sql);
  })
})
