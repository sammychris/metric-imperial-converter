/*
*
*
*       FILL IN EACH UNIT TEST BELOW COMPLETELY
*       -----[Keep the tests in the same order!]----
*       (if additional are added, keep them at the very end!)
*/

var chai = require('chai');
var assert = chai.assert;
var ConvertHandler = require('../controllers/convertHandler.js');

var convertHandler = new ConvertHandler();

suite('Unit Tests', function(){
  
  suite('Function convertHandler.getNum(input)', function() {
    
    test('Whole number input', function(done) {
      let input = '32L';
      assert.equal(convertHandler.getNum(input), 32);
      done();
    });
    
    test('Decimal Input', function(done) {
      let input = '3.2L';
      assert.equal(convertHandler.getNum(input), 3.2);
      done();
    });
    
    test('Fractional Input', function(done) {
      let input = '3/2km';
      assert.equal(convertHandler.getNum(input), '3/2');
      done();
    });
    
    test('Fractional Input w/ Decimal', function(done) {
      let input = '4/2.25km';
      assert.equal(convertHandler.getNum(input), '4/2.25');
      done();
    });
    
    test('Invalid Input (double fraction)', function(done) {
      let input = '4/2.2/5km';
      assert.equal(convertHandler.getNum(input), 'Invalid Input');
      done();
    });
    
    test('No Numerical Input', function(done) {
      let input = 'gal';
      assert.equal(convertHandler.getNum(input), 'No Numerical Input');
      done();
    }); 
    
  });
  
  suite('Function convertHandler.getUnit(input)', function() {
    
    test('For Each Valid Unit Inputs', function(done) {
      let input = ['1gal','3l','3mi','5.3km','2/1lbs','8/2kg'];
      let expect = ['gal','l','mi','km','lbs','kg'];
      input.forEach(function(ele, i) {
        assert.equal(convertHandler.getUnit(ele), expect[i]);
      });
      done();
    });
    
    test('Unknown Unit Input', function(done) {
      let input = 'people';
      assert.equal(convertHandler.getUnit(input), 'Unknown Unit Input');
      done();
    });  
    
  });
  
  suite('Function convertHandler.getReturnUnit(initUnit)', function() {
    
    test('For Each Valid Unit Inputs', function(done) {
      let input = ['gal','l','mi','km','lbs','kg'];
      let expect = ['l','gal','km','mi','kg','lbs'];
      input.forEach(function(ele, i) {
        assert.equal(convertHandler.getReturnUnit(ele), expect[i]);
      });
      done();
    });
    
  });  
  
  suite('Function convertHandler.spellOutUnit(unit)', function() {
    
    test('For Each Valid Unit Inputs', function(done) {
      //see above example for hint
      let input = ['gal', 'l', 'lbs', 'kg', 'mi', 'km'];
      let expect = ['gallons', 'litres','pounds', 'kilograms', 'miles', 'kilometers'];
      input.forEach((ele, i) => {
        assert.equal(convertHandler.spellOutUnit(ele), expect[i]);
      });
      done();
    });
    
  });
  
  suite('Function convertHandler.convert(num, unit)', function() {
    
    test('Gal to L', function(done) {
      var input = [5, 'gal'];
      var expected = 18.9271;
      assert.approximately(convertHandler.convert(input[0], input[1]), expected, 0.1); //0.1 tolerance
      done();
    });
    
    test('L to Gal', function(done) {
      var input = [10, 'l'];
      var expected = 2.64172;
      assert.approximately(convertHandler.convert(input[0], input[1]), expected, 0.4); //0.4 tolerance
      done();
    });
    
    test('Mi to Km', function(done) {
      var input = [3.1, 'mi'];
      var expected = 4.98895;
      assert.approximately(convertHandler.convert(input[0], input[1]), expected, 0.1); //0.1 tolerance
      done();
    });
    
    test('Km to Mi', function(done) {
      var input = [9, 'km'];
      var expected = 5.59235;
      assert.approximately(convertHandler.convert(input[0], input[1]), expected, 0.5); //0.5 tolerance
      done();
    });

    test('Lbs to Kg', function(done) {
      var input = [20, 'lbs'];
      var expected = 9.07184;
      assert.approximately(convertHandler.convert(input[0], input[1]), expected, 0.1); //0.1 tolerance
      done();
    });
    
    test('Kg to Lbs', function(done) {
      var input = [6, 'kg'];
      var expected = 13.2277;
      assert.approximately(convertHandler.convert(input[0], input[1]), expected, 0.5); //0.5 tolerance
      done();
    });
    
  });

});