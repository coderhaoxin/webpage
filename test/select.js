'use strict';

var SQL = require('../index'),
  should = require('should');

describe('## select', function() {
  it('# *', function() {
    var sql = SQL.select('user_table', '*').done();
    sql.should.equal('select * from user_table');
  });

  it('# array', function() {
    var sql = SQL.select('user_table', ['name', 'age', 'point', 'create_time']).done();
    sql.should.equal('select name, age, point, create_time from user_table');
  });

  it('# {}', function() {
    var sql = SQL.select('user_table', {}).done();
    sql.should.equal('select * from user_table');
  });

  it('# object', function() {
    var sql = SQL.select('user_table', {
      name: 'name',
      age: 'age',
      point: 'point',
      create_time: 'createTime'
    }).done();

    sql.should.equal('select name as name, age as age, point as point, create_time as createTime from user_table');
  });

  it('# limit', function() {
    var sql = SQL.select('user_table', ['name', 'age', 'point', 'create_time']).limit('0,30').done();
    sql.should.equal('select name, age, point, create_time from user_table limit 0,30');
  });

  it('# group', function() {
    var sql = SQL.select('user_table', ['name', 'age', 'point', 'create_time']).group('name').done();
    sql.should.equal('select name, age, point, create_time from user_table group by name');
  });

  it('# where', function() {
    var sql = SQL.select('user_table', ['name', 'age', 'point', 'create_time']).where({
      'name': ['=', 'hao'],
      'age': ['<>', 12, 23],
      'point': ['>', 1200]
    }).done();

    sql.should.equal('select name, age, point, create_time from user_table where name = "hao" and age between 12 and 23 and point > 1200');
  });

  it('# where like', function() {
    var sql = SQL.select('user_table', ['name', 'age', 'point', 'create_time']).where({
      'name': ['like', '%hao%']
    }).done();

    sql.should.equal('select name, age, point, create_time from user_table where name like "%hao%"');
  });

  it('# where or', function() {
    var sql = SQL.select('user_table', ['name', 'age', 'point', 'create_time']).where({
      'name': ['=', 'hao'],
      'age': ['<>', 12, 23],
      'point': ['>', 1200]
    }).or({
      'nickname': ['=', 'hx'],
      'money': ['<>', 2345, 3456],
      'phone': ['>', 2345678]
    }).done();

    sql.should.equal(['select name, age, point, create_time from user_table ',
      'where name = "hao" and age between 12 and 23 and point > 1200 ',
      'or nickname = "hx" or money between 2345 and 3456 or phone > 2345678'
    ].join(''));
  });

  it('# order', function() {
    var sql = SQL.select('user_table', ['name', 'age', 'point', 'create_time']).order({
      age: 'asc',
      point: 'desc'
    }).done();

    sql.should.equal('select name, age, point, create_time from user_table order by age asc, point desc');
  });

  it('# where order limit', function() {
    var sql = SQL.select('user_table', {
      'name': 'name',
      'age': 'age',
      'point': 'point',
      'create_time': 'createTime'
    }).where({
      'name': ['=', 'hao'],
      'age': ['<>', 12, 23],
      'point': ['>', 1200]
    }).order({
      'age': 'asc',
      'point': 'desc'
    }).limit('0,30').done();

    sql.should.equal(['select name as name, age as age, point as point, create_time as createTime ',
      'from user_table where name = "hao" and age between 12 and 23 and point > 1200 ',
      'order by age asc, point desc limit 0,30'
    ].join(''));
  });

  it('# multi tables select', function() {
    var sql = SQL.select('user_table, member_table', {
      'user_table.name': 'name',
      'user_table.age': 'age',
      'user_table.point': 'point',
      'user_table.create_time': 'createTime',
      'member_table.id': 'memberId',
      'member_table.nickname': 'nickname'
    }).where({
      'user_table.name': ['=', 'hao'],
      'user_table.age': ['<>', 12, 23],
      'user_table.point': ['>', 1200],
      'member_table.user_id': ['==', 'user_table._id'],
      'member_table.nickname': ['=', 'hello']
    }).order({
      'user_table.age': 'asc',
      'user_table.point': 'desc'
    }).limit('0,30').done();

    sql.should.equal(['select user_table.name as name, user_table.age as age, user_table.point as point, ',
      'user_table.create_time as createTime, member_table.id as memberId, member_table.nickname as nickname ',
      'from user_table, member_table where user_table.name = "hao" and user_table.age between 12 and 23 and ',
      'user_table.point > 1200 and member_table.user_id = user_table._id and member_table.nickname = "hello" ',
      'order by user_table.age asc, user_table.point desc limit 0,30'
    ].join(''));
  });

  it('# multi tables select', function() {
    var sql = SQL.select('user_table u, member_table m', {
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

    sql.should.equal(['select u.name as name, u.age as age, u.point as point, u.create_time as createTime, m.id as memberId, m.nickname as nickname ',
      'from user_table u, member_table m where u.name = "hao" and u.age between 12 and 23 and u.point > 1200 and m.user_id = u._id ',
      'and m.nickname = "hello" order by u.age asc, u.point desc limit 0,30'
    ].join(''));
  });
});
