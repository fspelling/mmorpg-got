module.exports.index = function (application, req, res) {
	res.render('index', { validacao: {}, dadosForm: {} });
}

module.exports.autenticar = function (application, req, res) {
	var dadosForm = req.body;

	req.assert('usuario', 'usuario é obrigatoório').notEmpty();
	req.assert('senha', 'senha é obrigatoório').notEmpty();

	var erros = req.validationErrors();

	if (erros) {
		res.render('index', { validacao: erros, dadosForm: dadosForm });
		return;
	}

	res.send('podemos logar');
}
