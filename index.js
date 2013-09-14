'use strict';
/*
* tableName: ''
*
* valueOptions = '*';
* valueOptions = ['name', 'age'];
* valueOptions = {name: 'name', 'age': 'age', 'create_time': 'createTime'};
*
* extraOptions = {
*   where: {name: ['=','hao'], age: ['between', 12, 23]},
*   order: {age: 'asc', create_time: 'desc'},
*   group: 'name',
*   limit: '0,89'
* }
*/
exports.select = function (tableName, valueOptions, extraOptions) {
  var sql = 'select';

  var keys = [];
  var i;
  var subKeys = [];
  var j;


  if (Array.isArray(valueOptions)) {
    for (i = 0; i < valueOptions.length; i++) {
      sql += ' ' + valueOptions[i];
      if ((i + 1) < valueOptions.length) {
        sql += ',';
      }
    }
  } else if (typeof(valueOptions) === 'object') {
    keys = Object.keys(valueOptions);
    if (keys.length) {
      for (i = 0; i < keys.length; i++) {
        sql += ' ' + keys[i] + ' as ' + valueOptions[keys[i]];
        if ((i + 1) < keys.length) {
          sql += ',';
        }
      }
    } else {
      sql += ' *';
    }
  } else {
    sql += ' *';
  }


  sql += ' from ' + tableName;


  if (typeof(extraOptions) === 'object') {
    keys = Object.keys(extraOptions);
    if (keys.length) {
      if (extraOptions['where']) {
        sql += whereParse(extraOptions['where']);
        if (extraOptions['or']) {
          sql += orParse(extraOptions['or']);
        }
      }

      if (extraOptions['order']) {
        var order = extraOptions['order'];
        subKeys = Object.keys(order);
        for (j = 0; j < subKeys.length; j++) {
          if (j === 0) {
            sql += ' order by ' + subKeys[j] + ' ' + order[subKeys[j]];
          } else {
            sql += ', ' + subKeys[j] + ' ' + order[subKeys[j]];
          }
        }
      }

      if (extraOptions['group']) {
        sql += ' group by ' + extraOptions['group'];
      }

      if (extraOptions['limit']) {
        sql += ' limit ' + extraOptions['limit'];
      }
    }
  }


  return sql;
}

/*
* tableName: ''
*
* valueOptions = {name: 'name', 'age': 'age', 'create_time': 'createTime'};
*
* whereOptions = {
*   where: {name: ['=', 'hao'], age: ['', 12, 23]}
* }
*/
exports.update = function (tableName, valueOptions, whereOptions, orOptions) {
  var sql = 'update ' + tableName + ' set';

  var keys = [];
  var i;

  keys = Object.keys(valueOptions);
  if (keys.length) {
    for (i = 0; i < keys.length; i++) {

      if (typeof(valueOptions[keys[i]]) === 'number') {
        sql += ' ' + keys[i] + ' = ' + valueOptions[keys[i]];
      } else if (typeof(valueOptions[keys[i]]) === 'string') {
        sql += ' ' + keys[i] + ' = ' + '"' + valueOptions[keys[i]] + '"';
      }

      if ((i + 1) < keys.length) {
        sql += ',';
      }
    }
  }


  if (typeof(whereOptions) === 'object') {
    keys = Object.keys(whereOptions);
    if (keys.length) {
      sql += whereParse(whereOptions);
      if (orOptions) {
        sql += orParse(orOptions);
      }
    }
  }


  return sql;
}

/*
* insert
*/
exports.insert = function (tableName, valueOptions) {
  var sql = 'insert into ' + tableName;

  var keys = [];
  var i;

  keys = Object.keys(valueOptions);
  if (keys.length) {
    sql += ' set';
    for (i = 0; i < keys.length; i++) {

      if (typeof(valueOptions[keys[i]]) === 'number') {
        sql += ' ' + keys[i] + ' = ' + valueOptions[keys[i]];
      } else if (typeof(valueOptions[keys[i]]) === 'string') {
        sql += ' ' + keys[i] + ' = ' + '"' + valueOptions[keys[i]] + '"';
      }

      if ((i + 1) < keys.length) {
        sql += ',';
      }
    }
  }

  return sql;
}

/*
* delete
*/
exports.del = function (tableName, whereOptions, orOptions) {
  var sql = 'delete from ' + tableName;

  var keys = [];

  if (typeof(whereOptions) === 'object') {
    keys = Object.keys(whereOptions);
    if (keys.length) {
      sql += whereParse(whereOptions);
      if (orOptions) {
        sql += orParse(orOptions);
      }
    }
  }

  return sql;
}

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
  var sql_order = '';

  return sql_order;
}
