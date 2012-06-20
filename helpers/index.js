/////////////
// Helpers //
/////////////

// helper to send error message to client
exports.sendError = function(res, err) {
	res.send(err);
};


// more helpers
exports.instagram = require('./instagram');