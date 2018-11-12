function JogoDAO(connection) {
    this._connection = connection();
}

JogoDAO.prototype.gerarParametros = function (usuario) {
    this._connection.open(function (erro, mongoClient) {
        mongoClient.collection('jogo', function (erro, collection) {
            collection.insert({
                usuario: usuario,
                moeda: 15,
                sudito: 10,
                temor: Math.floor(Math.random() * 1000),
                sabedoria: Math.floor(Math.random() * 1000),
                comercio: Math.floor(Math.random() * 1000),
                magia: Math.floor(Math.random() * 1000)
            });

            mongoClient.close();
        });
    });
}

JogoDAO.prototype.iniciarJogo = function (usuario, casa, res, comando_invalido) {
    this._connection.open(function (erro, mongoClient) {
        mongoClient.collection('jogo', function (erro, collection) {
            collection.find({ usuario: { $eq: usuario } }).toArray(function (erro, result) {
                res.render('jogo', { img_casa: casa, jogo: result[0], comando_invalido: comando_invalido });
            });

            mongoClient.close();
        });
    });
}

JogoDAO.prototype.getAcoes = function (usuario, res) {
    this._connection.open(function (erro, mongoClient) {
        mongoClient.collection('acao', function (erro, collection) {
            var atual = (new Date()).getTime();

            collection.find({ usuario: { $eq: usuario }, acao_termina_em: { $gt: atual } }).toArray(function (erro, result) {
                res.render('pergaminhos', { acoes: result });
            });

            mongoClient.close();
        });
    });
}

JogoDAO.prototype.acao = function (acao) {
    this._connection.open(function (erro, mongoClient) {
        mongoClient.collection('acao', function (erro, collection) {
            let date = undefined;

            switch (parseInt(acao.acao)) {
                case 1:
                    date = (new Date()).getTime() + (1 * 60 * 60000);
                    break;
                case 2:
                    date = (new Date()).getTime() + (2 * 60 * 60000);
                    break;
                case 3:
                    date = (new Date()).getTime() + (5 * 60 * 60000);
                    break;
                case 4:
                    date = (new Date()).getTime() + (5 * 60 * 60000);
                    break;
            }

            acao.acao_termina_em = date;
            collection.insert(acao);
        });

        mongoClient.collection('jogo', function (erro, collection) {
            let moedas = undefined;

            switch (parseInt(acao.acao)) {
                case 1:
                    moedas = -2 * acao.quantidade;
                    break;
                case 2:
                    moedas = -3 * acao.quantidade;
                    break;
                case 3:
                    moedas = -1 * acao.quantidade;
                    break;
                case 4:
                    moedas = -1 * acao.quantidade;
                    break;
            }

            collection.update({usuario: acao.usuario}, {$inc: {moeda: moedas}});
            mongoClient.close();
        });
    });
}

module.exports = function () {
    return JogoDAO;
}