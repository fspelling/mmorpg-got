module.exports.jogo = function (application, req, res) {
	if (req.session.autenticacao) {
		let comando_invalido = '';
		var connection = application.config.dbConnection;
		var JogoDAO = new application.app.models.JogoDAO(connection);

		if (req.query.comando_invalido !== undefined)
			comando_invalido = req.query.comando_invalido;

		JogoDAO.iniciarJogo(req.session.usuario, req.session.casa, res, comando_invalido);
	} else {
		res.redirect('/');
	}
}

module.exports.sair = function (application, req, res) {
	req.session.destroy();
	res.redirect('/');
}

module.exports.aldeoes = function (application, req, res) {
	res.render('aldeoes');
}

module.exports.pergaminhos = function (application, req, res) {
	var connection = application.config.dbConnection;
	var JogoDAO = new application.app.models.JogoDAO(connection);

	JogoDAO.getAcoes(req.session.usuario, res);
}

module.exports.ordenarSudito = function (application, req, res) {
	var dadosForm = req.body;

	req.assert('acao', 'Ação não pode ser vazio').notEmpty();
	req.assert('quantidade', 'Quantidade não pode ser vazio').notEmpty();

	var erros = req.validationErrors();

	if (erros) {
		res.redirect('/jogo?comando_invalido=S');
		return;
	}

	var connection = application.config.dbConnection;
	var JogoDAO = new application.app.models.JogoDAO(connection);
	dadosForm.usuario = req.session.usuario;

	JogoDAO.acao(dadosForm);

	res.redirect('/jogo?comando_invalido=N');
}