exports.renderIndex = function(req, res, next) {
  res.render('index');
};

exports.redirect = function(req, res, next) {
  res.redirect('/');
};
