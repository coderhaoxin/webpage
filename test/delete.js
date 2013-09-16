var del = require('../index').del;

var should = require('should');

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
