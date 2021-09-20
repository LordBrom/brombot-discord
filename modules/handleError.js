const errorLog = require('logger').createLogger('./logs/log_error.log');

module.exports = (err, rsp) => {
	errorLog.error("======================")
	errorLog.error(err, rsp)
	errorLog.error("======================")
}
