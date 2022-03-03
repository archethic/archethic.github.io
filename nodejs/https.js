/**
 * Created by naijun at 2022/03/03
 * Copyright (c) naijun
 *
 * PLEASE CHECK LICENSE THE LICENSE OF THE PROJECT REPOSITORY
 */

 const util = require('util');
 const http = require('http');
 
 function request(options, callback) {
     if (!util.isFunction(callback)) {
         throw new TypeError('The "listener" argument must be of type function. Received type ' + typeof callback + ' (' + callback + ')');
     }
 
     return new http.ClientRequest(options, callback, "http");
 }
 exports.request = request;