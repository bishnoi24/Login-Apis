/**
 * @description  Users  Controllers used for user Registration,Login And Logout
 * @author Mona Bishnoi
 */
var express = require('express');
var router = express.Router();
var userModel = require('../model/user.model');
var bodyParser = require('body-parser');
var validationObj = require('../../_helpers/validation');

/* User Apis */

var connection = require('../../config');
router.post('/signup', signup);
router.get('/getuser', getuser);
router.post('/login', login);
module.exports = router;

function getuser (req, res) {
  connection.query('select * from users' , function (error, results, fields) {
    if (error);
    console.log();
    res.send(JSON.stringify(results));
    
  });
}

/* Create users */

function signup (req, res) {

  /* Create users fields Validation  */

  if(!req.body.fullname)
  {
    res.status(200).send({"status":"0","message":"Name should not be empty"});
  }	
  else if(!req.body.email)
  {
    res.status(200).send({"status":"0","message":"Email should not be empty"});
  }
  if(!validationObj.isValidEmail(req.body.email))
  {
    res.status(200).send({"status":"0","message":"Email is not valid"});
  }
  else if(!req.body.phone)
  {
    res.status(200).send({"status":"0","message":"Mobile should not be empty"});
  }
  if(!validationObj.isPhoneNumber(req.body.phone))
  {
    res.status(200).send({"status":"0","message":"Phone number is not valid"});
  }else{

    /* Login users  validation and verification */

    userModel.validateEmail(req.body).then(function(validateEmail){
      
      if(validateEmail===false)
      {
        /* Login users  create User */

        userModel.createUser(req.body).then(function (user) {
            
          //userModel.createSession(user,req.body).then(function (user) {
                
          res.send({"status":"1","message":"User Created Successfully"});
          

        }).catch(function (err) {
          res.status(200).send({"status":"0","message":err});
        });
        //   }).catch(function (err) {
        //     console.log(err);
        //     res.status(200).send({"data":{"status":"0","message":err}});
        // });

      }else{
        res.status(200).send({"status":"0","message":"Email/mobile is already registered."});
      }

      }).catch(function (err) {
        res.status(200).send({"status":"0","message":err});
    });
  }
}

/* Login users */

function login (req, res) {

  /* Login users  Validation  */

  if(!req.body.email)
  {
    res.status(200).send({"status":"0","message":"Email should not be empty"});
 
  } else if(!req.body.password){

    res.status(200).send({"status":"0","message":"Password should not be empty"});

  } else if(!req.body.device_id){

    res.status(200).send({"status":"0","message":"DeviceId should not be empty"});

  } else if(!req.body.device_token){

    res.status(200).send({"status":"0","message":"Device Token should not be empty"});

  } else if(!req.body.device_type){

    res.status(200).send({"status":"0","message":"Device Type should not be empty"});

  } else if(!req.body.debug_mode){

    res.status(200).send({"status":"0","message":"Debug Mode should not be empty"});

  } else if(!req.body.user_type){

    res.status(200).send({"status":"0","message":" User Type should not be empty"});

  } else {
    /* Login users  validation and verification */
    userModel.userLogin(req.body).then(function(validateUser){
        
      if(validateUser!=false){

        /* Login users  Session  create */

        userModel.createSession(validateUser,req.body).then(function (validateUser) {

        }).catch(function (err) {
          res.status(200).send({"status":"0","message":err});
        });

        res.status(200).send({"status":"1","message":"User logged in Successfully"});
      
      }else{

        res.status(200).send({"status":"0","message":"Email/password is Invalid"});

      }
    }).catch(function (err) {

      res.status(200).send({"status":"0","message":err});

    });
  }
}