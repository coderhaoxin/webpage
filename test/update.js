var update = require('../index').update;

var should = require('should');

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
    sql.should.equal(['update user_table set name = "xin", age = 23, point = 1300, create_time = "2013-8-27" ',
                      'where name = "hao" and age between 12 and 23 and point > 1200'].join(''));
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
    sql.should.equal(['update user_table set name = "xin", age = 23, point = 1300, create_time = "2013-8-27" ',
                      'where name = "hao" and age between 12 and 23 and point > 1200 or ',
                      'nickname = "hx" or money between 2345 and 3456 or phone > 2345678'].join(''));
  })
})
