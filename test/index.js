var select = require('../index').select;
var update = require('../index').update;
var insert = require('../index').insert;
var del    = require('../index').del;

var should = require('should');

describe('select', function () {
  it('1', function () {
    var sql = select('user_table', '*');
    sql.should.equal('select * from user_table');
  })
  it('2', function () {
    var sql = select('user_table', ['name', 'age', 'point', 'create_time']);
    sql.should.equal('select name, age, point, create_time from user_table');
  })
  it('3', function () {
    var sql = select('user_table', {
      name: 'name',
      age: 'age',
      point: 'point',
      create_time: 'createTime'
    });
    sql.should.equal('select name as name, age as age, point as point, create_time as createTime from user_table');
  })
  it('4', function () {
    var sql = select('user_table', ['name', 'age', 'point', 'create_time'], {
      limit: '0,30'
    });
    sql.should.equal('select name, age, point, create_time from user_table limit 0,30');
  })
  it('5', function () {
    var sql = select('user_table', ['name', 'age', 'point', 'create_time'], {
      group: 'name'
    });
    sql.should.equal('select name, age, point, create_time from user_table group by name');
  })
  it('6', function () {
    var sql = select('user_table', ['name', 'age', 'point', 'create_time'], {
      where: {
        'name': ['=', 'hao'],
        'age': ['<>', 12, 23],
        'point': ['>', 1200]
      }
    });
    sql.should.equal('select name, age, point, create_time from user_table where name = "hao" and age between 12 and 23 and point > 1200');
  })
  it('7', function () {
    var sql = select('user_table', ['name', 'age', 'point', 'create_time'], {
      where: {
        'name': ['=', 'hao'],
        'age': ['<>', 12, 23],
        'point': ['>', 1200]
      },
      or: {
        'nickname': ['=', 'hx'],
        'money': ['<>', 2345, 3456],
        'phone': ['>', 2345678]
      }
    });
    sql.should.equal('select name, age, point, create_time from user_table where name = "hao" and age between 12 and 23 and point > 1200 or nickname = "hx" or money between 2345 and 3456 or phone > 2345678');
  })
  it('8', function () {
    var sql = select('user_table', ['name', 'age', 'point', 'create_time'], {
      order: {
        age: 'asc',
        point: 'desc'
      }
    });
    sql.should.equal('select name, age, point, create_time from user_table order by age asc, point desc');
  })
  it('9', function () {
    var sql = select('user_table',{
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
    sql.should.equal('select name as name, age as age, point as point, create_time as createTime from user_table where name = "hao" and age between 12 and 23 and point > 1200 order by age asc, point desc limit 0,30');
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
    sql.should.equal('update user_table set name = "hao", age = 22, point = 1200, create_time = "2013-8-26"');
  })
  it('2', function () {
    var sql = update('user_table', {
      name: 'xin',
      age: 23,
      point: 1300,
      create_time: '2013-8-27'
    }, {
      'name': ['=', 'hao'],
      'age': ['<>', 12, 23],
      'point': ['>', 1200]
    });
    sql.should.equal('update user_table set name = "xin", age = 23, point = 1300, create_time = "2013-8-27" where name = "hao" and age between 12 and 23 and point > 1200');
  })
  it('3', function () {
    var sql = update('user_table', {
      name: 'xin',
      age: 23,
      point: 1300,
      create_time: '2013-8-27'
    }, {
      'name': ['=', 'hao'],
      'age': ['<>', 12, 23],
      'point': ['>', 1200]
    }, {
        'nickname': ['=', 'hx'],
        'money': ['<>', 2345, 3456],
        'phone': ['>', 2345678]
      });
    sql.should.equal('update user_table set name = "xin", age = 23, point = 1300, create_time = "2013-8-27" where name = "hao" and age between 12 and 23 and point > 1200 or nickname = "hx" or money between 2345 and 3456 or phone > 2345678');
  })
})

describe('insert', function () {
  it('1', function () {
    var sql = insert('user_table', {
      name: 'hao',
      age: 12,
      point: 3333,
      create_time: '2013-09-14'
    });
    sql.should.equal('insert into user_table set name = "hao", age = 12, point = 3333, create_time = "2013-09-14"');
  })
})

describe('delete', function () {
  it('1', function () {
    var sql = del('user_table', {
      'name': ['=', 'hao'],
      'age': ['<>', 12, 23],
      'point': ['>', 1200]
    })
    sql.should.equal('delete from user_table where name = "hao" and age between 12 and 23 and point > 1200')
  })
  it('2', function () {
    var sql = del('user_table', {
      'name': ['=', 'hao'],
      'age': ['<>', 12, 23],
      'point': ['>', 1200]
    }, {
      'nickname': ['=', 'hx'],
      'money': ['<>', 2345, 3456],
      'phone': ['>', 2345678]
    })
    sql.should.equal('delete from user_table where name = "hao" and age between 12 and 23 and point > 1200 or nickname = "hx" or money between 2345 and 3456 or phone > 2345678')
  })
})
