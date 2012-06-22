var helpers = require('../helpers')
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
					'paths': paths 
				});
			}
		});
	}
};


// GET /paths/:id
exports.get = function(req, res) {

	// get path id from request param
	var id = req.params.id;

	// verify id
	if(!id) helper.sendError(res, 'invalid path id');
	else {

		// get the path's details
		Path.findById(id, function(err, path) {
			if(err) helper.sendError(res, err);
			else if(!path) helper.sendError(res, 'path not found');
			else res.render('path', {
				'title': 'path',
				'path': path
			});
		});
	}
};


// DELETE /paths/:id
exports.destroy = function(req, res) {

	// get path id from request param
	var id = req.params.id
	
	// make sure there's an id
	if(!id) helper.sendError(res, 'invalid path id');
	else  {

		// delete path
		Path.remove({ '_id': id}, function(err, removed) {
			if(err) helper.sendError(res, err);
			else res.send('success');
		});
	}
}


// POST /paths
exports.create = function(req, res) {

	// get uid and token from session
	var token = req.session.token;
	var uid = req.session.uid;

	// if no token found, redirect to 
	if(!token || !uid) res.redirect('/login');
	else {

		// associate path to signed in user
		var newPath = new Path(req.body);
		newPath.uid = uid;

		// save the path
		newPath.save(function(err, saved) {
			if(err) helpers.sendError(res, err);
			else res.redirect('/paths');
		});
	}
};