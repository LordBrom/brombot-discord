const fs = require('fs');
if (!fs.existsSync('./logs')) {
	fs.mkdirSync('./logs');
}

const errorLog = require('logger').createLogger('./logs/log_error.log');

module.exports = (err, rsp) => {
	errorLog.error("======================")
	errorLog.error(err, rsp)
	errorLog.error("======================")
}
