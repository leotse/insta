/////////////
// Helpers //
/////////////

// helpers to send a response to client with the proper wrapper
exports.sendResponse = function(res, data) {
	res.send({
		'meta': 200,
		'data': data
	});
}

// helper to send error message to client
exports.sendError = function(res, err) {
	res.send(err, 500);
};

// more helpers
exports.instagram = require('./instagram');