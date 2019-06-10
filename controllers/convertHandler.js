/*
*
*
*       Complete the handler logic below
*       
*       
*/
const units = {
      'gal':'l', 'lbs':'kg', 'mi':'km',
      'l':'gal', 'kg':'lbs', 'km':'mi'
    };

function ConvertHandler() {
  this.getNum = function(input) {
    let num = input.match(/[\d./]+/);
    if(!num) return 'No Numerical Input';
    if(/(.*\/.*\/.*)/.test(num[0])) return 'Invalid Input';
    return num[0];
  };
  
  this.getUnit = function(input) {    
    let unit = input.match(/[a-z]+$/i);
    if(!unit) return 'No Unit';
    unit = unit[0].toLowerCase();
    if(!units[unit]) return 'Unknown Unit Input';
    return unit;
  };
  
  this.getReturnUnit = function(initUnit) {
    return units[initUnit];
  };

  this.spellOutUnit = function(unit) {
    return {
      'gal':'gallons', 'l':'litres', 'lbs':'pounds',
      'kg':'kilograms', 'mi':'miles', 'km':'kilometers',
    }[unit];
  };
  
  this.convert = function(initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    initNum = eval(initNum);
    let resulting = {
      'gal': initNum*galToL, 'lbs':initNum*lbsToKg, 'mi': initNum*miToKm,
      'l': initNum/galToL, 'kg': initNum/lbsToKg, 'km': initNum/miToKm 
    }
    return Math.round(resulting[initUnit]);
  };
  
  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    let oldUnit = this.spellOutUnit(initUnit);
    let newUnit = this.spellOutUnit(returnUnit);
    return `${initNum} ${oldUnit} converts to ${returnNum+.00002} ${newUnit}`;
  };
 
  // this.checkInput = function(input) {
  //   if(!input.trim()) return 1;
  //   if(input.match(/\/{2,}?\.{2,}?/g)) return 'invalid number';
  // } 
}

module.exports = ConvertHandler;
