"use strict";
exports.__esModule = true;
var express_1 = require("express");
var usersRouter = (0, express_1.Router)();
var express = require('express');
var app = express();
var port = 3000;
usersRouter.use(express.json());
var produtos = [
    { _id: 1, nome: 'Tijolo', qtdeEstoque: 1000, preco: 0.90 },
    { _id: 2, nome: 'Cimento', qtdeEstoque: 200, preco: 25.00 },
];
var Produto = /** @class */ (function () {
    function Produto(id, nome, qtdeEstoque, preco) {
        this._id = id;
        this.nome = nome;
        this.qtdeEstoque = qtdeEstoque;
        this.preco = preco;
    }
    return Produto;
}());
usersRouter.get('/', function (req, res, next) {
    res.json({ apiName: 'Catálogo de Produtos!', greetingMessage: 'Bem-Vindo!' });
});
exports["default"] = usersRouter;
// app.get('/', (req, res, next) => {
// res.json({ apiName: 'Catálogo de Produtos!', greetingMessage: 'Bem-Vindo!' });
// })
usersRouter.post('/produtos', function (req, res, next) {
    try {
        if (req.body.nome) {
            var _a = req.body, nome = _a.nome, qtdeEstoque = _a.qtdeEstoque, preco = _a.preco; //Desestruturação
            var id = produtos.length > 0 ? produtos[produtos.length - 1]._id + 1 :
                1;
            // Instanciando objeto da classe Produto
            var novoProduto = new Produto(id, nome, qtdeEstoque, preco);
            // Adicionando o objeto instanciado no final do vetor produtos
            produtos.push(novoProduto);
            res.json({ message: 'Produto cadastrado com sucesso!' });
        }
        else {
            res.json({ message: 'Dados incorretos. NÃO FOI POSSÍVEL cadastrar o produto!' });
        }
    }
    catch (error) {
        res.status(400).json({ erro: "".concat(error) });
    }
});
// READ ALL - Consultar/Listar todos os produtos
usersRouter.get('/produtos', function (req, res, next) { res.json(produtos); });
// READ - Consultar detalhe do produto
usersRouter.get('/produtos/:id', function (req, res, next) {
    try {
        if (req.params.id) {
            var id_1 = parseInt(req.params.id);
            // O método find() retorna o primeiro valor do array, se
            // um elemento do array atender à função de teste fornecida.
            // Caso contrário, retorna undefined.
            var produto = produtos.find(function (elemento) { return elemento._id === id_1; });
            if (produto) {
                res.json(produto);
            }
            else {
                res.json({ message: 'Produto não encontrado!' });
            }
        }
    }
    catch (error) {
        res.status(400).json({ erro: "".concat(error) });
    }
});
// UPDATE - Alterar produto
usersRouter.put('/produtos/:id', function (req, res, next) {
    try {
        if (req.params.id) {
            var id_2 = parseInt(req.params.id);
            var _a = req.body, nome = _a.nome, qtdeEstoque = _a.qtdeEstoque, preco = _a.preco; //Desestruturação
            // O método find() retorna o primeiro valor do array, se
            // um elemento do array atender à função de teste fornecida.
            // Caso contrário, retorna undefined.
            var produto = produtos.find(function (elemento) { return elemento._id === id_2; });
            //const novoProduto = {...produto,nome,qtdeEstoque,preco}
            if (produto) {
                produto.nome = nome;
                produto.qtdeEstoque = qtdeEstoque;
                produto.preco = preco;
                res.json({ message: 'Produto alterado com sucesso!' });
            }
            else {
                res.json({ message: 'Produto não encontrado!' });
            }
        }
    }
    catch (error) {
        res.status(400).json({ erro: "".concat(error) });
    }
});
// DELETE - Excluir produto
usersRouter["delete"]('/produtos/:id', function (req, res, next) {
    try {
        if (req.params.id) {
            if (req.params.id) {
                var id_3 = parseInt(req.params.id);
                // O método filter() gera um novo array apenas com os elementos
                // que satisfazem à função de teste fornecida
                // Atualizando o vetor produtos (excluindo no produto solicitado)
                produtos = produtos.filter(function (elemento) { return elemento._id !== id_3; });
                console.log("produtos: ", JSON.stringify(produtos));
                res.json({ message: 'Produto excluído com sucesso!' });
            }
            else {
                res.json({ message: 'Dados incorretos. NÃO FOI POSSÍVEL excluir o produto!' });
            }
        }
    }
    catch (error) {
        res.status(400).json({ erro: "".concat(error) });
    }
});
app.listen(port, function () { return console.log("API \"Cat\u00E1logo de Produtos\" rodando na porta ".concat(port)); });
