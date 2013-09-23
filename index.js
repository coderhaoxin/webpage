'use strict';

/*
* util function
*/

function sqlFilter(value) {
  if (value.indexOf(' ') !== '-1') {
    value = value.split(' ').join();
  }

  return value;
}

function whereOptionParse(optionArray) {
  var sqlWhereOption = '';

  if (optionArray[0] === '<>') {
    sqlWhereOption = 'between ' + optionArray[1] + ' and ' + optionArray[2];
  } else if (optionArray[0] === '==') {
    sqlWhereOption = '= ' + optionArray[1].toString();
  } else {
    // =, <, >, <=, >=
    if (typeof(optionArray[1]) === 'string') {
      optionArray[1] = '"' + optionArray[1] + '"';
    }
    sqlWhereOption = optionArray[0] + ' ' + optionArray[1];
  }
  return sqlWhereOption;
}

function whereParse(whereObject) {
  var subSql = '';
  var subKeys = Object.keys(whereObject);

  var sql_where;
  for (var i = 0; i < subKeys.length; i++) {
    if (i === 0) {
      subSql += ' where ' + subKeys[i] + ' ' + whereOptionParse(whereObject[subKeys[i]]);
    } else {
      subSql += ' and ' + subKeys[i] + ' ' + whereOptionParse(whereObject[subKeys[i]]);
    }
  }

  return subSql;
}

function orParse(orObject) {
  var subSql = '';

  var sql_or;
  for (var i in orObject) {
    subSql += ' or ' + i + ' ' + whereOptionParse(orObject[i]);
  }

  return subSql;
}

function orderParse(orderObject) {
  var subSql = '';
  var keys = Object.keys(orderObject);

  for (var i = 0; i < keys.length; i++) {
    if (i === 0) {
      subSql += ' order by ' + keys[i] + ' ' + orderObject[keys[i]];
    } else {
      subSql += ', ' + keys[i] + ' ' + orderObject[keys[i]];
    }
  }

  return subSql;
}

function setParse(setObject) {
  var subSql = ' set';

  var keys = Object.keys(setObject);
  var i;

  for (i = 0; i < keys.length; i++) {
    if (typeof(setObject[keys[i]]) === 'number') {
      subSql += ' ' + keys[i] + ' = ' + setObject[keys[i]];
    } else if (typeof(setObject[keys[i]]) === 'string') {
      subSql += ' ' + keys[i] + ' = ' + '"' + setObject[keys[i]] + '"';
    }

    if ((i + 1) < keys.length) {
      subSql += ',';
    }
  }

  return subSql;
}

/*
* jSql
*/
function jSql() {
  this.sql = '';
}

jSql.prototype.select = function (tableName, valueOptions) {
  var self = this;

  var keys = [];
  var i;

  self.sql += 'select';

  if (Array.isArray(valueOptions)) {
    for (i = 0; i < valueOptions.length; i++) {
      self.sql += ' ' + valueOptions[i];
      if ((i + 1) < valueOptions.length) {
        self.sql += ',';
      }
    }
  } else if (typeof(valueOptions) === 'object') {
    keys = Object.keys(valueOptions);
    if (keys.length) {
      for (i = 0; i < keys.length; i++) {
        self.sql += ' ' + keys[i] + ' as ' + valueOptions[keys[i]];
        if ((i + 1) < keys.length) {
          self.sql += ',';
        }
      }
    } else {
      self.sql += ' *';
    }
  } else {
    self.sql += ' *';
  }

  self.sql += ' from ' + tableName;

  return self;
}

jSql.prototype.update = function (tableName) {
  this.sql += 'update ' + tableName;
  return this;
}

jSql.prototype.insert = function (tableName) {
  this.sql += 'insert into ' + tableName;
  return this;
}

jSql.prototype.del = function (tableName) {
  this.sql += 'delete from ' + tableName;
  return this;
}

jSql.prototype.set = function (options) {
  this.sql += setParse(options);
  return this;
}

jSql.prototype.where = function (options) {
  this.sql += whereParse(options);
  return this;
}

jSql.prototype.or = function (options) {
  this.sql += orParse(options);
  return this;
}

jSql.prototype.order = function (options) {
  this.sql += orderParse(options);
  return this;
}

jSql.prototype.group = function (option) {
  this.sql += ' group by ' + option;
  return this;
}

jSql.prototype.limit = function (option) {
  this.sql += ' limit ' + option;
  return this;
}

jSql.prototype.done = function () {
  var sql = this.sql;
  this.sql = '';
  return sql;
}

module.exports = new jSql();
