var _ = require('underscore')
 ,	helpers = require('../../helpers')
 ,	instagram = helpers.instagram
 ,	Models = require('../../models')
 ,	User = Models.User
 ,	Path = Models.Path
 ,	Photo = Models.Photo;


// GET /api/paths
exports.list = function(req, res){
	
	// get uid and token from session
	var token = req.session.token;
	var uid = req.session.uid;

	// if no token found, redirect to login page
	if(!token || !uid) res.redirect('/login');
	else {

		// get signed in user's paths
		Path
		.where('uid', uid)
		.select('name start end collaborators photos')
		.populate('photos', [ 'images' ], null, { limit: 5 })
		.exec(function(err, paths) {
			if(err) helpers.sendError(res, err);
			else {
				var data = []
				 ,	pathDoc = null
				 ,	collaborators = null;

				// only return the collaborator count
				_.each(paths, function(path) {
					pathDoc = path._doc;
					collaborators = pathDoc.collaborators;
					pathDoc.collaborators = collaborators ? collaborators.length : 0;
					data.push(pathDoc);
				});

				helpers.sendResponse(res, data);
			}
		});
	}
};


// GET api/paths/:id
exports.details = function(req, res) {

	// get path id from request param, uid and token from session
	var token = req.session.token;
	var uid = req.session.uid;
	var id = req.params.id;

	// verify session and path id
	if(!token || !uid) res.redirect('/login');
	else if(!id) helpers.sendError(res, 'invalid path id');
	else {

		// get the path's details
		Path
		.where('_id', id)
		.select('_id name collaborators start end')
		.findOne(function(err, path) {
			if(err) helpers.sendError(res, err);
			else if(!path) helpers.sendError(res, 'path not found');
			else {

				// now also get the collaborators usernames
				User
				.where('iid').in(path.collaborators)
				.select('username')
				.exec(function(err, collaborators) {
					if(err) helpers.sendError(res, err);
					else {
						var data = path._doc;
						data.collaborators = _.pluck(collaborators, 'username');
						helpers.sendResponse(res, data);
					}
				});
			}
		});
	}
};

