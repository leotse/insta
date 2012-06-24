var helpers = require('../helpers')
 ,	instagram = helpers.instagram
 ,	Models = require('../models')
 ,	Path = Models.Path;


// GET /paths
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
		.exec(function(err, paths) {
			if(err) helpers.sendError(res, err);
			else {

				// render paths page
				res.render('paths', { 
					'title': 'paths', 
					'paths': paths,
					'scripts': [ 'js/paths.js' ]
				});
			}
		});
	}
};


// GET /paths/:id
exports.show = function(req, res) {

	// get path id from request param, uid and token from session
	var token = req.session.token;
	var uid = req.session.uid;
	var id = req.params.id;

	// verify session and path id
	if(!token || !uid) res.redirect('/login');
	else if(!id) helpers.sendError(res, 'invalid path id');
	else {

		// get the path's details
		Path.findById(id, function(err, path) {
			if(err) helpers.sendError(res, err);
			else if(!path) helpers.sendError(res, 'path not found');
			else {

				// render page
				res.render('path', {
					'title': 'path',
					'path': path
				});
			}
		});
	}
};


// GET /paths/:id/edit
exports.edit = function(req, res) {

	// get token, uid and path id
	var uid = req.session.uid;
	var token = req.session.token;
	var pid = req.params.id;

	// verify session and uid
	if(!uid || !token) res.redirect('/login');
	else if(!pid) helpers.sendError(res, 'invalid path id');
	else {

		// get the path's details
		Path.findById(pid, function(err, path) {
			if(err) helpers.sendError(res, err);
			else if(!path) helpers.sendError(res, 'path not found');
			else {

				// get current user's following
				instagram.getFollowing(token, function(err, users) {
					if(err) helpers.sendError(res, 'instagram api error');
					else {
						res.render('path_edit', {
							'title': 'edit path',
							'scripts': [ '/js/path.js' ],
							'path': path,
							'users': users
						});
					}
				});
			}
		});
	}
};


// POST /paths
exports.create = function(req, res) {

	// retrieve session vars
	var uid = req.session.uid;
	var token = req.session.token;
	var username = req.session.username;

	// if no token found, redirect to login
	if(!token || !uid || !username) res.redirect('/login');
	else {

		// associate path to signed in user
		var newPath = new Path(req.body);
		newPath.uid = uid;
		newPath.collaborators.push(username);

		// save the path
		newPath.save(function(err, saved) {
			if(err) helpers.sendError(res, err);
			else res.send(saved);
		});
	}
};


// POST /paths/:id
exports.update = function(req, res) {

	var uid = req.session.uid;
	var token = req.session.token;
	var username = req.session.username;

	var pid = req.params.id;
	var name = req.body.name || '';
	var collaborators = req.body.collaborators || [];
	var start = req.body.start || Date.now();
	var end = req.body.end || Date.now();

	if(!uid || !token || !username) res.redirect('/login');
	else if(!pid) helpers.sendError(res, 'invalid pid');
	else {

		// by default add path owner as collaborator
		collaborators.push(username);

		// update collaborators
		Path.update(
			{ '_id': pid },
			{ 'name': name, 'collaborators': collaborators, 'start': start, 'end': end },
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