var helpers = require('../helpers')
 ,	instagram = helpers.instagram
 ,	Models = require('../models')
 ,	Path = Models.Path;


// GET /paths
exports.render = function(req, res){
	
	// get uid and token from session
	var token = req.session.token;
	var uid = req.session.uid;

	// if no token found, redirect to login page
	if(!token || !uid) res.redirect('/login');
	else {

		// get signed in user's paths
		Path
		.where('uid', uid)
		.exec(function(err, paths) {
			if(err) helpers.sendError(res, err);
			else {

				// render paths page
				res.render('paths', { 
					'title': 'paths', 
					'paths': paths,
					'scripts': [ 'js/jquery.js', 'js/paths.js' ]
				});
			}
		});
	}
};


// POST /paths
exports.create = function(req, res) {

	// get uid and token from session
	var token = req.session.token;
	var uid = req.session.uid;

	// if no token found, redirect to login
	if(!token || !uid) res.redirect('/login');
	else {

		// associate path to signed in user
		var newPath = new Path(req.body);
		newPath.uid = uid;

		// save the path
		newPath.save(function(err, saved) {
			if(err) helpers.sendError(res, err);
			else res.send(saved);
		});
	}
};


// GET /paths/:id
exports.get = function(req, res) {

	// get path id from request param, uid and token from session
	var token = req.session.token;
	var uid = req.session.uid;
	var id = req.params.id;

	// verify id
	if(!token || !uid) res.redirect('/login');
	else if(!id) helpers.sendError(res, 'invalid path id');
	else {

		// get the path's details
		Path.findById(id, function(err, path) {
			if(err) helpers.sendError(res, err);
			else if(!path) helpers.sendError(res, 'path not found');
			else {

				// get current user's following
				instagram.getFollowing(token, function(err, users) {
					if(err) helpers.sendError(res, 'instagram api error');
					else {
						res.render('path', {
							'title': 'path',
							'path': path,
							'users': users
						});
					}
				});
			}
		});
	}
};


// POST /paths/:id
exports.update = function(req, res) {

	var uid = req.session.uid;
	var token = req.session.token;

	var pid = req.params.id;
	var collaborators = req.body.collaborators || [];

	if(!uid || !token) res.redirect('/login');
	else if(!pid) helpers.sendError(res, 'invalid pid');
	else {

		// update collaborators
		Path.update(
			{ '_id': pid },
			{ 'collaborators': collaborators },
			{ 'multi': false }, 
			function(err, updated) {
				if(err) helpers.sendError(res, err);
				else if(updated === 0) helpers.sendError(res, 'path not found');
				else res.redirect('/paths/' + pid);
			}
		);
	}
};


// DELETE /paths/:id
exports.destroy = function(req, res) {

	// get path id from request param
	var id = req.params.id
	
	// make sure there's an id
	if(!id) helpers.sendError(res, 'invalid path id');
	else  {

		// delete path
		Path.remove({ '_id': id}, function(err, removed) {
			if(err) helpers.sendError(res, err);
			else res.send('success');
		});
	}
};