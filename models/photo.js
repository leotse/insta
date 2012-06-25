/////////////////
// Photo Model //
/////////////////
  
var mongoose = require('mongoose')
 ,	config = require('../config')
 ,	Schema = mongoose.Schema;


// schema definition
var PhotoSchema = new Schema({
	id 				: { type: String, unique: true },
	tags			: [{ type: String }],
	location		: { type: Schema.Types.Mixed },
	filter			: { type: String },
	created_time	: { type: Number, required: true },
	link			: { type: String },
	images			: { 
		low_resolution			: { type: Schema.Types.Mixed, required: true },
		thumbnail				: { type: Schema.Types.Mixed, required: true },
		standard_resolution		: { type: Schema.Types.Mixed, required: true }
	},
	user			: { type: Schema.Types.Mixed, required: true }
}, { strict: true });


// statics
PhotoSchema.statics.upsert = function(photo, callback) {

	// first try to retrieve photo
	this.findOne({ 'id': photo.id }, function(err, retrieved) {
		if(err) callback(err);
		else if(retrieved) {

			// photo found in db, update the photo and return
			retrieved.id = photo.id;
			retrieved.tags = photo.tags;
			retrieved.location = photo.location;
			retrieved.filter = photo.filter;
			retrieved.created_time = photo.created_time;
			retrieved.link = photo.link;
			retrieved.images = photo.images;
			retrieved.save(function(err, saved) {
				if(err) callback(err);
				else callback(null, saved);
			});
		}
		else {

			// photo not found in db, create new
			var Photo = mongoose.model('Photo');
			var newPhoto = new Photo(photo);

			newPhoto.save(function(err, saved) {
				if(err) callback(err);
				else callback(null, saved);
			});
		}
	});
};

PhotoSchema.statics.upsertAll = function(photos, callback) {

	// input sanitization
	if(!photos || photos.length === 0) callback('invalid photos collection');
	else {
		var errs = []
		 ,	results = []
		 , 	count = photos.length;

		// upsert all photos in collection
		for(var i = photos.length - 1; i >= 0; i--) {
			this.upsert(photos[i], upsertCompleted);
		}

		// upsert callback
		function upsertCompleted(err, upserted) {
			count--; 

			// keep track of all errors and results
			if(err) errs.push(err);
			else results.push(upserted);

			// when all db calls return, make callback
			if(count === 0) {
				if(errs.length === 0) errs = null;
				callback(errs, results);
			}
		}
	}
};


// register model with mongoose
mongoose.model('Photo', PhotoSchema);