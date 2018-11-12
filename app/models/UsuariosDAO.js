var crypto = require('crypto');

function UsuariosDAO(connection) {
	this._connection = connection();
}

UsuariosDAO.prototype.inserirUsuario = function (usuario) {
	this._connection.open(function (err, mongoclient) {
		mongoclient.collection("usuarios", function (err, collection) {
			usuario.senha = crypto.createHash('md5').update(usuario.senha).digest('hex');

			collection.insert(usuario);
			mongoclient.close();
		});
	});
}

UsuariosDAO.prototype.autenticar = function (usuario, req, res) {
	this._connection.open(function (err, mongoclient) {
		mongoclient.collection("usuarios", function (err, collection) {
			usuario.senha = crypto.createHash('md5').update(usuario.senha).digest('hex');

			collection.find(usuario).toArray(function (erro, result) {
				req.session.autenticacao = result.length > 0;

				if (req.session.autenticacao) {
					req.session.usuario = result[0].usuario;
					req.session.casa = result[0].casa;

					res.redirect('/jogo');
				} else {
					let erroAuth = [{ msg: 'usuario inexistente' }];
					res.render('index', { validacao: erroAuth, dadosForm: usuario });
				}
			});

			mongoclient.close();
		});
	});
}

module.exports = function () {
	return UsuariosDAO;
}