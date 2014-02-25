
/*
 * GET home page.
 */


app = require("../app");

app.get("/", function( req, res ){
	res.render('index', { title: 'Express' });
});


app.get("/host", function( req, res ){
	res.render('host', { title: 'Host' });
});


app.get("/multiplayer", function( req, res ){
	res.render('multiplayer', { title: 'Game' });
});

