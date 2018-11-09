function JogoDAO(connection) {
	this._connection = connection();
}

JogoDAO.prototype.gerarParametros = function(usuario) {
    this._connection.open(function (erro, mongoClient){
        mongoClient.collection('jogo', function(erro, collection){
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

module.exports = function() {
    return JogoDAO;
}