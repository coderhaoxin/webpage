var insert = require('../index').insert;

var should = require('should');

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
