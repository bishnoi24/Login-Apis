var express = require('express');
var router = express.Router();
var Q = require('q');

var passwordHash = require('password-hash');
const crypto = require('crypto');
const async = require('async');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var datetime = require('node-datetime');
var connection = require('../../config');
var service = {};
service.createUser = createUser;
service.createSession = createSession;
service.validateEmail=validateEmail;
service.userLogin=userLogin;

function createUser(postData) {
  var deferred = Q.defer();
  var hashedPassword = passwordHash.generate(postData.password);
  var uData ={"email": postData.email,"phone":postData.phone,"fullname":postData.fullname,"password":hashedPassword};

  connection.query('INSERT INTO users SET ?', uData, function (error, results, fields) {
    if (error){
      deferred.reject(error);
    }else{
      deferred.resolve(results);
    } 
  });

  return deferred.promise;
}


function validateEmail (data){
  var deferred = Q.defer();
  connection.query("SELECT email,phone FROM users WHERE email ='"+ data.email + "'  OR phone ='"+ data.phone + "'", function (error, results, fields) {
    if (error){
      deferred.reject(error);
    } else {
      var _shareData = JSON.stringify(results);
      var obj = JSON.parse(_shareData);
      if(obj){
        if(obj.length>0){
          deferred.resolve(true);
        }else{
          deferred.resolve(false);
        }

      }else{
        deferred.resolve(false);
      }
    }  
  });
  return deferred.promise;
}

function userLogin (postData){
  var deferred = Q.defer();
  /* Check User Authorization  */
  connection.query("SELECT id,fullname,type, email,phone,status,password FROM users WHERE email ='"+ postData.email + "'", function (error, results, fields) {
    var dbpassword = JSON.stringify(results);
    var passwordnew = JSON.parse(dbpassword);
    if (error){
      deferred.reject(error);
    }
    if( passwordHash.verify(postData.password, passwordnew[0].password) ){
      deferred.resolve(JSON.stringify(results));
    }else{
      deferred.resolve(false);
    }

  });
  return deferred.promise;
}


function createSession (res,userData){

  var deferred = Q.defer();
  var obj = JSON.parse(res);   
  var token = jwt.sign({ appuser_id:obj[0].id}, 'supersecret', {});
  var dt = datetime.create();
  var formattedDate = dt.format('y-m-d H:M:S');
 // console.log(formattedDate);
  var sessionData ={"appuser_id":obj[0].id,"sess_token":token, "login_status":'1', "user_type": obj[0].type,
  "last_login":formattedDate}
  
  /* Existing user data update   */
  
  connection.query('UPDATE  user_session SET login_status="0" WHERE login_status = "1" AND appuser_id = ' + obj[0].id + ' AND user_type = "' + obj[0].type +'" ', function (error, results, fields) {
    if (error){
      deferred.reject(error);
    }else{
      deferred.resolve(JSON.stringify(results));
    } 
  });

  /* user session token  create for login   */

  connection.query('INSERT INTO user_session SET ?', sessionData, function (error, results, fields) {
    if (error){
      deferred.reject(error);
    }else{
      deferred.resolve(JSON.stringify(results));
    } 
  });
  
  return deferred.promise;
  
}

module.exports = service;