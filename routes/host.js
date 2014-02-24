
/*
 * GET host page.
 */

exports.game = function(req, res){
  res.render('host', { title: 'Host a Game' });
};


