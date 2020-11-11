module.exports = (msg) => {
	setTimeout(function () {
		msg.delete();
	}, 5 * 1000)
};
