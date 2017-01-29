const moment = require('moment');

// var date = moment();
// date.add(100, 'year').subtract(9, 'month');
// console.log(date.format('MMM Do YYYY'));

// 10:35 am

var createdAt = moment().valueOf();
console.log(createdAt);
var date = moment(createdAt);
console.log(date.format('h:mm a'))
