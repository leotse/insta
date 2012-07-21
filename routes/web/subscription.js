var helpers = require('../../helpers')
 ,	instagram = helpers.instagram
 ,	Models = require('../../models')
 ,	User = Models.User;


// GET /subscription
exports.verify = function(req, res) {
	var query = req.query;
	res.send(query['hub.challenge']);
};


// POST /subscription
exports.callback = function(req, res) {
	// respond to instagram api immediately
	res.send('success');


	// based on instagram docs
	// though most of the time notification service will make callback with a single item array
	// there is still a posibility of multiple notifications in one call
	// hence the loop

	var i, body;
	for(i = req.body.length - 1; i >= 0; i--) {
		body = req.body[i];

		// handle user upload notification
		if(body.object === 'user') {
			var iid = body.object_id
			 ,	time = body.time
			 ,	minTime = time - 5
			 ,	maxTime = time + 5; 
			 // ^^^^^^^^^^^^^^^^^^
			 // minTime maxTime 5 seconds tolerance
			 // for some reason the timestamp of the photo doesn't match the timestamp of the notification
			 // instagram api fail

			// first we need to retrieve the user's token
			User.findByInstagramId(iid, function(err, user) {
				if(err) console.log(err);
				else if(!user) console.log('user: ' + iid + ' not found');
				else {

					// now we can call the instagram api to retrieve the user's latest photo
					instagram.getRecent(user.token, user.iid, { 'minTime': minTime, 'maxTime': maxTime }, function(err, photos) {
						if(err) console.log(err)
						else {
							console.log(photos);

							// TODO: process the new photo and add to appropriate path
						}
					});
				}
			});
		}
		else if(body.object === 'tag') {
			// TODO
		}
		else if(body.object === 'location') {
			// TODO
		}
		else if(body.object === 'geography') {
			// TODO
		}
	}
};