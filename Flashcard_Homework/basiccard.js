var fs = require('fs');

var BasicCard = function(front, back) {
	this.close = front;
	this.back = back;
	this.type = 'basic';
};

module.exports = BasicCard;