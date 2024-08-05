const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const { v4: uuidv4 } = require('uuid')
const fs = require('fs')

app.use(bodyParser.json())

const db = require('./db.json')
const { error } = require('console')

// listar todos produtos
app.get('/produtos', function (req,res) {
    var produtos = db.produtos
    res.json(produtos)
})

// listar 1 produto específico
app.get('/produtos/:id', function (req, res){
    const _id = req.params.id
    const listProd = db.produtos
    const produto = listProd.find(
        (produto) => produto.id == _id
        )
    produto ? res.send(produto) : res.status(404).send({error:'not found'})

})

// criar um produto
app.post('/produtos', function (req,res){
    const dados = req.body
    if(!dados.nome || !dados.preco) {
        res.status(406).send({error:'Nome e preço deve ser informado'})
    }
    const _id = uuidv4()
    dados.id = _id

    db.produtos.push(dados)
    fs.writeFile('./db.json', JSON.stringify(db), (err) => {
        if (err){
            res.status(500).send({error:'erro no servidor'})
        }
    })
    res.status(204)
})

// atualizar 1 produto
// app.post('/produtos', function (req,res){

// })

// deletar um produto específico
// app.delete('/produtos', function (req,res){
    
// })

app.listen(5500)