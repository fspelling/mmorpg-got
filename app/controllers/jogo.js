module.exports.jogo = function (application, req, res) {
	if (req.session.autenticacao)
		res.render('jogo', {img_casa: req.session.casa});
	else
		res.redirect('/');
}

module.exports.sair = function (application, req, res) {
	req.session.destroy();
	res.redirect('/');
}