//////////////////////////////
// Instagram Configurations //
//////////////////////////////

exports.clientID = '8ac8b6179c744c33abdc89398091f42c';
exports.secret = 'd9685d8b507c49ef967402863a893a12';
exports.redirectUrl = 'http://localhost:3000/login/callback';
exports.authUrlTemplate = 'https://api.instagram.com/oauth/authorize/?client_id=%s&redirect_uri=%s&response_type=code';