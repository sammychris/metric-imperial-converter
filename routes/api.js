/*
*
*
*       Complete the API routing below
*
*
*/

'use strict';

var expect = require('chai').expect;
var ConvertHandler = require('../controllers/convertHandler.js');

function verifyData(converter) { // Note: this is a closure function...
  return (req, res, next) => {  // A Function that returns another anonymous function;
    let input = req.query.input;
    if(!input) return res.json({string: 1});
    let unit = converter.getUnit(input);
    let num = converter.getNum(input);
    let nTrue = num.includes("Invalid"), uTrue = unit.includes('Input');
    if (nTrue && uTrue) return res.json({string: 'Invalid Number And Unit'});
    if (uTrue) return res.json({string: 'Invalid Unit'});
    if (nTrue) return res.json({string: 'Invalid Number'});
    if (unit.includes('No')) return res.json({string: 'No Unit'});
    if (num.includes('No')) return res.json({string: 'No Number'});
    next();
  }
}

module.exports = function (app) {
  
  var convertHandler = new ConvertHandler();

  app.route('/api/convert')
    .get(verifyData(convertHandler), function (req, res){
      var input = req.query.input;
      var initNum = convertHandler.getNum(input);
      var initUnit = convertHandler.getUnit(input);
      var returnNum = convertHandler.convert(initNum, initUnit);
      var returnUnit = convertHandler.getReturnUnit(initUnit);
      var toString = convertHandler.getString(initNum, initUnit, returnNum, returnUnit);
      res.json({initNum, initUnit, returnNum: returnNum+.0000008, returnUnit, string: toString});
    });
    
};
