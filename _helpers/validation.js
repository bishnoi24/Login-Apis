var validObj = {};
validObj.isValidDate = isValidDate;
validObj.isValidEmail = isValidEmail;
validObj.isValidTime = isValidTime;
validObj.isPhoneNumber = isPhoneNumber;
module.exports = validObj;
function isValidDate(dateString) {
  var regEx = /^\d{4}-\d{2}-\d{2}$/;
  if(!dateString.match(regEx)) return false;  // Invalid format
  var d = new Date(dateString);
  if(Number.isNaN(d.getTime())) return false; // Invalid date
  return d.toISOString().slice(0,10) === dateString;
}
function isValidEmail(value) {
  var regEx = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
  return value.match(regEx);
  
}
function isValidTime(value) {
  var regEx = /^(1[012]|[1-9]|0[1-9]):[0-5][0-9]\s(AM|PM)$/i;
  return value.match(regEx);
  
}

function isPhoneNumber(value) {
  var regEx = /^(?:(?:\+|0{0,2})91(\s*[\ -]\s*)?|[0]?)?[789]\d{9}|(\d[ -]?){10}\d$/;
  return value.match(regEx);
  
}

