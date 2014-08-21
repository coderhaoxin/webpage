'use strict';

var SQL = require('../index'),
  should = require('should');

describe('## update', function() {
  it('# set', function() {
    var sql = SQL.update('user_table').set({
      name: 'hao',
      age: 22,
      point: 1200,
      create_time: '2013-8-26'
    }).done();

    sql.should.equal('update user_table set name = "hao", age = 22, point = 1200, create_time = "2013-8-26"');
  });

  it('# where', function() {
    var sql = SQL.update('user_table').set({
      name: 'xin',
      age: 23,
      point: 1300,
      create_time: '2013-8-27'
    }).where({
      'name': ['=', 'hao'],
      'age': ['<>', 12, 23],
      'point': ['>', 1200]
    }).done();

    sql.should.equal(['update user_table set name = "xin", age = 23, point = 1300, create_time = "2013-8-27" ',
      'where name = "hao" and age between 12 and 23 and point > 1200'
    ].join(''));
  });

  it('# where or', function() {
    var sql = SQL.update('user_table').set({
      name: 'xin',
      age: 23,
      point: 1300,
      create_time: '2013-8-27'
    }).where({
      'name': ['=', 'hao'],
      'age': ['<>', 12, 23],
      'point': ['>', 1200]
    }).or({
      'nickname': ['=', 'hx'],
      'money': ['<>', 2345, 3456],
      'phone': ['>', 2345678]
    }).done();

    sql.should.equal(['update user_table set name = "xin", age = 23, point = 1300, create_time = "2013-8-27" ',
      'where name = "hao" and age between 12 and 23 and point > 1200 or ',
      'nickname = "hx" or money between 2345 and 3456 or phone > 2345678'
    ].join(''));
  });
});
