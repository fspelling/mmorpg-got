module.exports.cadastro = function(app, req, res) {
    res.render('cadastro', {validacao: {}});
}

module.exports.cadastrar = function(app, req, res) {
    var dadosForm = req.body;

    req.assert('nome', 'nome é obrigatório').notEmpty();
    req.assert('usuario', 'usuario é obrigatório').notEmpty();
    req.assert('senha', 'senha é obrigatório').notEmpty();
    req.assert('casa', 'casa é obrigatório').notEmpty();

    var erros = req.validationErrors();

    if(erros) {
        res.render('cadastro', {validacao: erros});
        return;
    }

    res.render('cadastro');
}
