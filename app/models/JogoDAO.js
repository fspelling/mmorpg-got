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
            collection.find({ usuario: { $eq: usuario } }).toArray(function (erro, result) {
                res.render('pergaminhos', {result: result});
            });

            mongoClient.close();
        });
    });
}

JogoDAO.prototype.acao = function (acao) {
    this._connection.open(function (erro, mongoClient) {
        mongoClient.collection('acao', function (erro, collection) {
            let date = undefined;

            switch (acao.acao) {
                case 1:
                    date = (new Date).getTime() + (1 * 60 * 60000);
                case 2:
                    date = (new Date).getTime() + (2 * 60 * 60000);
                case 3:
                    date = (new Date).getTime() + (5 * 60 * 60000);
                case 4:
                    date = (new Date).getTime() + (5 * 60 * 60000);
            }

            acao.acao_termina_em = date;
            collection.insert(acao);

            mongoClient.close();
        });
    });
}

module.exports = function () {
    return JogoDAO;
}