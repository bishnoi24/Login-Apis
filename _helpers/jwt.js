const expressJwt = require('express-jwt');
const config = require('config.json');
module.exports = jwt;
function jwt(){
	const  secret  = config.appsecret;
	return expressJwt({ secret }).unless({
        path: ['/admin/users/login', '/admin/users/generate-otp', '/admin/users/signup','/admin/users/forgot-password','/admin/users/resend-otp','/admin/users/reset-password','/admin/users/checksession']
    });
}