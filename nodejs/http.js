/**
 * Created by naijun at 2022/03/02
 * Copyright (c) naijun
 *
 * PLEASE CHECK LICENSE THE LICENSE OF THE PROJECT REPOSITORY
 */

 const util = require('util');
 const events = require('events');
 
 function request(options, callback) {
     if (!util.isFunction(callback)) {
         throw new TypeError('The "listener" argument must be of type function. Received type ' + typeof callback + ' (' + callback + ')');
     }
 
     return new ClientRequest(options, callback, "http");
 }
 
 function hasOwn(object, name) {
     return Object.prototype.hasOwnProperty.call(object, name);
 }
 
 //maxRedirects
 //maxBodyLength
 //insecureHTTPParser
 //path
 //hostname
 //host
 //port
 //path
 //headers
 
 exports.request = request;
 
 exports.METHODS = [
     'ACL',         'BIND',       'CHECKOUT',
     'CONNECT',     'COPY',       'DELETE',
     'GET',         'HEAD',       'LINK',
     'LOCK',        'M-SEARCH',   'MERGE',
     'MKACTIVITY',  'MKCALENDAR', 'MKCOL',
     'MOVE',        'NOTIFY',     'OPTIONS',
     'PATCH',       'POST',       'PROPFIND',
     'PROPPATCH',   'PURGE',      'PUT',
     'REBIND',      'REPORT',     'SEARCH',
     'SOURCE',      'SUBSCRIBE',  'TRACE',
     'UNBIND',      'UNLINK',     'UNLOCK',
     'UNSUBSCRIBE'
 ]
 
 exports.STATUS_CODES = {
     '100': 'Continue',
     '101': 'Switching Protocols',
     '102': 'Processing',
     '103': 'Early Hints',
     '200': 'OK',
     '201': 'Created',
     '202': 'Accepted',
     '203': 'Non-Authoritative Information',
     '204': 'No Content',
     '205': 'Reset Content',
     '206': 'Partial Content',
     '207': 'Multi-Status',
     '208': 'Already Reported',
     '226': 'IM Used',
     '300': 'Multiple Choices',
     '301': 'Moved Permanently',
     '302': 'Found',
     '303': 'See Other',
     '304': 'Not Modified',
     '305': 'Use Proxy',
     '307': 'Temporary Redirect',
     '308': 'Permanent Redirect',
     '400': 'Bad Request',
     '401': 'Unauthorized',
     '402': 'Payment Required',
     '403': 'Forbidden',
     '404': 'Not Found',
     '405': 'Method Not Allowed',
     '406': 'Not Acceptable',
     '407': 'Proxy Authentication Required',
     '408': 'Request Timeout',
     '409': 'Conflict',
     '410': 'Gone',
     '411': 'Length Required',
     '412': 'Precondition Failed',
     '413': 'Payload Too Large',
     '414': 'URI Too Long',
     '415': 'Unsupported Media Type',
     '416': 'Range Not Satisfiable',
     '417': 'Expectation Failed',
     '418': "I'm a Teapot",
     '421': 'Misdirected Request',
     '422': 'Unprocessable Entity',
     '423': 'Locked',
     '424': 'Failed Dependency',
     '425': 'Too Early',
     '426': 'Upgrade Required',
     '428': 'Precondition Required',
     '429': 'Too Many Requests',
     '431': 'Request Header Fields Too Large',
     '451': 'Unavailable For Legal Reasons',
     '500': 'Internal Server Error',
     '501': 'Not Implemented',
     '502': 'Bad Gateway',
     '503': 'Service Unavailable',
     '504': 'Gateway Timeout',
     '505': 'HTTP Version Not Supported',
     '506': 'Variant Also Negotiates',
     '507': 'Insufficient Storage',
     '508': 'Loop Detected',
     '509': 'Bandwidth Limit Exceeded',
     '510': 'Not Extended',
     '511': 'Network Authentication Required'
 }
 
 /**
  *
  * @param options
  * @param callback
  * @param scheme
  * @constructor
  * @extends {events.EventEmitter}
  */
 function ClientRequest(options, callback, scheme = "http") {
     events.EventEmitter.call(this);
     const hostname = options['hostname'];
     const path = options['path'] || '/'
     const url = new java.net.URL(`${scheme}://${hostname}${path}`)
     this.req = url.openConnection()
     this.cb = callback
     this.data = {}
     this.options = options;
     this.statusCode = 200;
 }
 
 ClientRequest.prototype = Object.create(events.EventEmitter.prototype);
 ClientRequest.prototype.constructor = ClientRequest;
 
 ClientRequest.prototype.write = function (data) {
     this.data = data;
 }
 
 ClientRequest.prototype.abort = function () {
     this.emit('aborted')
 }
 
 ClientRequest.prototype.end = function () {
     const method = this.options['method'] || 'GET';
     this.req.setRequestMethod(method)
     for (const [key, data] of Object.entries(this.options['headers'] || {})) {
         this.req.setRequestProperty(key, data);
     }
     if (method === 'POST') {
         this.req.setDoOutput(true)
 
         const outputStreamn = new java.io.DataOutputStream(this.req.getOutputStream())
         outputStreamn.writeBytes(JSON.stringify(this.data));
         outputStreamn.flush();
         outputStreamn.close();
     }
 
     this.statusCode = this.req.getResponseCode();
 
     if (this.statusCode !== 0 || this.statusCode !== 200) {
         this.cb.call(this, this);
         this.emit('aborted')
         this.emit('error', new Error('HTTP Connection ERROR with status = ' + this.statusCode))
     }
 
     const bufferedReader = new java.io.BufferedReader(new java.io.InputStreamReader(this.req.getInputStream()))
     let buffer = new java.lang.StringBuffer();
     let inputLine;
     while ((inputLine = bufferedReader.readLine()) != null) {
         buffer.append(inputLine);
     }
     bufferedReader.close();
 
     let responseBuffer = Buffer.from(buffer.toString());
     this.cb.call(this, this)
     this.emit('data', responseBuffer);
     this.emit('end')
 }
 
 exports.ClientRequest = ClientRequest;