const restify = require('restify');

const errors = require('restify-errors');

const server = restify.createServer({
  name: 'myapp',
  version: '1.0.0'
});

const knex = require('knex')({
    client: 'mysql2',
    connection: {
      host : '127.0.0.1',
      user : 'root',
      password : 'matrix1982*',
      database : 'crud'
    }
  });

server.use(restify.plugins.acceptParser(server.acceptable));
server.use(restify.plugins.queryParser());
server.use(restify.plugins.bodyParser());

server.get('/', (req, res, next) => {

    knex('produtos').then((dados) => {
        res.send(dados);
    }, next)

});

server.get('/:id', (req, res, next) => {

    const { id } = req.params;

    knex('produtos')
        .where('id', id)
        .first()
        .then((dados) => {
            if(!dados) {
                return res.send(new errors.BadRequestError('Não existe um cadastro de produto com o id ' + id));
            } else {
                res.send(dados);
            }
    }, next)

});

server.post('/', (req, res, next) => {

    knex('produtos')
        .insert(req.body)
        .then((dados) => {
            res.send(dados);
        }, next)
    
});

server.put('/:id', (req, res, next) => {

    const { id } = req.params;

    knex('produtos')

        .where('id', id)
        .update(req.body)
        .then((dados) => {
            if(!dados) {
                return res.send(new errors.BadRequestError('Não existe um cadastro de produto com o id ' + id));
            } else {
                res.send(200, 'Registro atualizado');
            }
    }, next)

});

server.del('/:id', (req, res, next) => {

    const { id } = req.params;

    knex('produtos')
        .where('id', id)
        .delete()
        .then((dados) => {
            if(!dados) {
                return res.send(new errors.BadRequestError('Não existe um cadastro de produto com o id ' + id));
            } else {
                res.send(204);
            }
    }, next)

});

server.listen(8080, function () {
    console.log('%s listening at %s', server.name, server.url);
});

(async () => {
    const database = require('./db');
    const Produto = require('./produto');

    try {
        const resultado = await database.sync();
        console.log(resultado);
    } catch (error) {
        console.log(error);
    }

    /*INSERT*/
    /*const resultadoCreate = await Produto.create({
        nome: 'monitor',
        preco: 599,
        descricao: 'Um monitor 22 polegadas'
    })
    console.log(resultadoCreate);*/

    /*READ ALL*/
    /*const produtos = await Produto.findAll();
    console.log(produtos);*/

    /*READ ALL WITH WHERE*/
    /*const produtos = await Produto.findAll({
        where: {
            preco: 599
        }
    });
    console.log(produtos);*/

    /*READ ONE REGISTRY*/
    /*const produto = await Produto.findByPk(1);
    console.log(produto);*/

    /*DELETE*/
    /*EXAMPLE 1*/
    //await produto.destroy();

    /*DELETE*/
    /*EXAMPLE 2*/
    /*await Produto.destroy({
        where: {
            id: 3
        }
    });*/

    /*UPDATE*/
    /*produto.descricao = 'Fiz uma alteração';
    await produto.save();*/

})();