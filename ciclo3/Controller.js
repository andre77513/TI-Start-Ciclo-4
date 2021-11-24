const express = require('express');
const cors = require('cors');
const { Sequelize } = require('./models');

const models = require('./models');

const app = express();
app.use(cors());
app.use(express.json());


let cliente = models.Cliente;
let itempedido = models.ItemPedido;
let pedido = models.Pedido;
let servico = models.Servico;
let compra = models.Compra;
let itemcompra = models.ItemCompra;
let produto = models.Produto;

app.post('/inserir-cliente', async (req, res) => {
    await cliente.create(
        req.body
    ).then(cli => {
        return res.json({
            error: false,
            message: "Cliente foi inserido com sucesso.",
            cli
        });
    }).catch(erro => {
        return res.status(400).json({
            error: true,
            message: "Não foi possível inserir o cliente."
        });
    });
});

app.get('/listar-cliente', async (req, res) => {
    await cliente.findAll()
        .then(cliente => {
            return res.json({
                error: false,
                cliente
            });
        })
        .catch(erro => {
            return res.status(400).json({
                error: true,
                message: "Erro de conexão"
            });
        });
});

app.put('/atualizar-cliente', async (req, res) => {
    await cliente.update(req.body, {
        where: { id: req.body.id }
    }).then(() => {
        return res.json({
            error: false,
            message: "Os dados do cliente foram atualizados com sucesso."
        });
    }).catch(erro => {
        return res.status(400).json({
            error: true,
            message: "Erro na alteração do cliente."
        });
    });

});

app.get('/cliente/:id', async (req, res) => {
    cliente.findByPk(req.params.id)
        .then(cliente => {
            return res.json({
                error: false,
                cliente
            });
        })
        .catch(erro => {
            return res.status(400).json({
                error: true,
                message: "Erro: Não foi possível se conectar com a API."
            });
        });
});

app.put('/cliente/:id', async (req, res) => {
    const cli = {
        id: req.params.id,
        ClienteId: req.body.cliente,
        data: req.body.data,
        nome: req.body.nome,
        endereco: req.body.endereco,
        cidade: req.body.cidade,
        uf: req.body.uf,
        nascimento: req.body.nascimento,
        clienteDesde: req.body.clienteDesde,

    };
    if (!await cliente.findByPk(req.body.ClienteId)) {
        return res.status(404).json({
            error: true,
            message: "Cliente não existe."
        });
    };
    await cliente.update(cli, {
        where: Sequelize.and({ ClienteId: req.body.ClienteId },
            { id: req.params.id })
    }).then(cliente => {
        return res.json({
            error: false,
            message: "Dados do cliente atualizados com sucesso.",
            cliente
        });
    }).catch(erro => {
        return res.status(400).json({
            error: true,
            message: "Não foi possível fazer a alteração dos dados."
        });
    });
});

app.delete('/excluir-cliente/:id', async (req, res) => {
    await cliente.destroy({
        where: { id: req.params.id }
    }).then(() => {
        return res.json({
            error: false,
            message: "Cliente foi excluido com sucesso."
        });
    }).catch(erro => {
        return res.status(400).json({
            error: true,
            message: "Impossível excluir o cliente."
        });
    });
});

//exibir todos os pedidos de um cliente
app.get('/cliente/:id/pedido', async (req, res) => {
    await pedido.findAll({
        where: { ClienteId: req.params.id }
    }).then(pedidos => {
        return res.json({
            error: false,
            pedidos
        });
    }).catch(erro => {
        return res.status(400).json({
            error: true,
            message: "Erro de conexão."
        });
    });
});

app.post('/inserir-servico', async (req, res) => {
    await servico.create(
        req.body
    ).then(ser => {
        return res.json({
            error: false,
            message: "Serviço criado com sucesso.",
            ser
        });
    }).catch((error) => {
        return res.status(400).json({
            error: true,
            message: "Impossivel conectar."
        });
    });

});

app.get('/listar-servico', async (req, res) => {
    await servico.findAll()
        .then(servicos => {
            return res.json({
                servicos
            });
        })
        .catch(erro => {
            return res.status(400).json({
                error: true,
                message: "Sem conexão."
            });
        });
});

app.put('/atualizar-servico', async (req, res) => {
    await servico.update(req.body, {
        where: { id: req.body.id }
    }).then(() => {
        return res.json({
            error: false,
            message: "O servico foi atualizado com sucesso."
        });
    }).catch(erro => {
        return res.status(400).json({
            error: true,
            message: "Erro na atualização do serviço."
        });
    });

});

//obter servico
app.get('/servico/:id', async (req, res) => {
    servico.findByPk(req.params.id)
        .then(servicos => {
            return res.json({
                error: false,
                servicos
            });
        })
        .catch(erro => {
            return res.status(400).json({
                error: true,
                message: "Erro: Não foi possível se conectar com a API."
            });
        });
});

//editar servico
app.put('/servico/:id', async (req, res) => {
    const ser = {
        id: req.params.id,
        nome: req.body.nome,
        descricao: req.body.descricao
    };
    if (!await servico.findByPk(req.params.id)) {
        return res.status(404).json({
            error: true,
            message: "Servico não existe."
        });
    };
    await servico.update(ser, {
        where: { id: req.params.id }
    }).then(servicos => {
        return res.json({
            error: false,
            message: "Servico alterado com sucesso.",
            servicos
        });
    }).catch(erro => {
        return res.status(400).json({
            error: true,
            message: "Não foi possível alterar o serviço."
        });
    });
});

app.delete('/excluir-servico/:id', async (req, res) => {
    await servico.destroy({
        where: { id: req.params.id }
    }).then(() => {
        return res.json({
            error: false,
            message: "O serviço foi excluido com sucesso."
        });
    }).catch(erro => {
        return res.status(400).json({
            error: true,
            message: "Erro na exclusão do serviço."
        });
    });

});

app.get('/servico/:id/pedidos', async (req, res) => {
    await itempedido.findAll({
        where: { ServicoId: req.params.id }
    })
        .then(item => {
            return res.json({
                error: false,
                item
            });
        }).catch(erro => {
            return res.status(400).json({
                error: true,
                message: "Erro: não foi possível se conectar!"
            });
        });
});

app.post('/inserir-pedido', async (req, res) => {
    await pedido.create(
        req.body
    ).then(pedidos => {
        return res.json({
            error: false,
            message: "Pedido criado com sucesso.",
            pedidos
        });
    }).catch(erro => {
        return res.status(400).json({
            error: true,
            message: "Foi impossível se conectar."
        });
    });
});

app.get('/listar-pedidos', async (req, res) => {
    await pedido.findAll()
        .then(pedidos => {
            return res.json({
                error: false,
                pedidos
            });
        }).catch(erro => {
            return res.status(400).json({
                error: true,
                message: "Erro na conexão."
            });
        });

});

//obter pedido
app.get('/pedido/:id', async (req, res) => {
    pedido.findByPk(req.params.id)
        .then(pedido => {
            return res.json({
                error: false,
                pedido
            });
        })
        .catch(erro => {
            return res.status(400).json({
                error: true,
                message: "Erro: Não foi possível se conectar com a API."
            });
        });
});

//alterar um pedido com base no id do Pedido
app.put('/pedido/:id', async (req, res) => {
    const ped = {
        id: req.params.id,
        ClienteId: req.body.ClienteId,
        data: req.body.data
    };
    if (!await cliente.findByPk(req.body.ClienteId)) {
        return res.status(404).json({
            error: true,
            message: "Pedido não existe."
        });
    };
    await pedido.update(ped, {
        where: Sequelize.and({ ClienteId: req.body.ClienteId },
            { id: req.params.id })
    }).then(pedidos => {
        return res.json({
            error: false,
            message: "Pedido alterado com sucesso.",
            pedidos
        });
    }).catch(erro => {
        return res.status(400).json({
            error: true,
            message: "Não foi possível alterar o pedido."
        });
    });
});

app.put('/atualizar-pedido', async (req, res) => {
    await pedido.update(req.body, {
        where: { id: req.body.id }
    }).then(ped => {
        return res.json({
            error: false,
            message: "O pedido foi atualizado com sucesso.",
            ped
        });
    }).catch(erro => {
        return res.status(400).json({
            error: true,
            message: "Erro na atualização do pedido."
        });
    });

});

app.delete('/excluir-pedido/:id', async (req, res) => {
    await pedido.destroy({
        where: { id: req.params.id }
    }).then(() => {
        return res.json({
            error: false,
            message: "O pedido foi excluido com sucesso."
        });
    }).catch(erro => {
        return res.status(400).json({
            error: true,
            message: "Erro na exclusão do pedido."
        });
    });

});

app.post('/inserir-itempedido', async (req, res) => {
    await itempedido.create(
        req.body
    )
        .then(item => {
            return res.json({
                error: false,
                message: "Item criado com sucesso",
                item
            });
        }).catch(erro => {
            return res.status(400).json({
                error: true,
                message: "Não foi possível criar o Item."
            });
        });
});

app.get('/listar-itempedido', async (req, res) => {
    await itempedido.findAll()
        .then(item => {
            return res.json({
                error: false,
                item
            });
        }).catch(erro => {
            return res.status(400).json({
                error: true,
                message: "Erro de conexão."
            })
        })
});

app.get('/itempedido', async (req, res) => {
    await itempedido.findAll()
        .then(itens => {
            return res.json({
                error: false,
                itens
            });
        }).catch(erro => {
            return res.status(400).json({
                error: true,
                message: "Erro de conexão."
            });
        });
});

app.put('/atualizar-itempedido/:id', async (req, res) => {
    await itempedido.update({
        where: { PedidoId: req.params.PedidoId}
    }).then(item => {
        return res.json({
            error: false,
            message: "O item foi alterado com sucesso.",
            item
        });
    }).catch(erro => {
        return res.status(400).json({
            error: true,
            message: "Erro na alteração do item."
        });
    });

});

app.put('/editar-itempedido/:id', async (req,res)=>{
    const item = {
        quantidade: req.body.quantidade,
        valor: req.body.valor
    };
    if (!await pedido.findByPk(req.params.id)){
        return res.status(400).json({
            error: true,
            message: "Pedido não foi encontrado."
        });
    };
    if (!await servico.findByPk(req.body.ServicoId)){
        return res.status(400).json({
            error: true,
            message: "Serviço não foi encontrado."
        });
    };
    await itempedido.update(item, {
        where: Sequelize.and({ServicoId: req.body.ServicoId},
            {PedidoId: req.params.id})
    }).then((itens)=>{
        return res.json({
            error: false,
            message: "Item alterado com sucesso.",
            itens
        });
    }).catch((erro) => {
        return res.status(400).json({
            error: false,
            message: "Não foi possível alterar.",
        });
    });
});

app.delete('/excluir-itempedido/:valor', async (req, res) => {
    await itempedido.destroy({ where: { valor: req.params.valor } })
        .then(() => {
            return res.json({
                error: false,
                message: "O Item foi excluido com sucesso."
            });
        }).catch(erro => {
            return res.status(400).json({
                error: true,
                message: "Erro na exclusão do item."
            });
        });

});

app.post('/cadastrar-produto', async (req, res) => {
    await produto.create(
        req.body
    ).then(produto => {
        return res.json({
            error: false,
            message: "Produto criado com sucesso.",
            produto
        });
    }).catch((error) => {
        return res.status(400).json({
            error: true,
            message: "Impossivel conectar."
        });
    });

});

app.get('/listar-produto', async (req, res) => {
    await produto.findAll()
        .then(produtos => {
            return res.json({
                error: false,
                produtos
            });
        })
        .catch(error => {
            return res.json({
                error: true,
                message: "Falha na conexão."
            });
        });
});

app.put('/atualizar-produto', async (req, res) => {
    await produto.update(req.body, {
        where: { id: req.body.id }
    }).then(() => {
        return res.json({
            error: false,
            message: "O produto foi atualizado com sucesso."
        });
    }).catch(erro => {
        return res.status(400).json({
            error: true,
            message: "Erro na atualização do produto."
        });
    });

});

//obter produto
app.get('/produto/:id', async (req, res) => {
    produto.findByPk(req.params.id)
        .then(produtos => {
            return res.json({
                error: false,
                produtos
            });
        })
        .catch(erro => {
            return res.status(400).json({
                error: true,
                message: "Erro: Não foi possível se conectar com a API."
            });
        });
});

//editar produto
app.put('/produto/:id', async (req, res) => {
    const pro = {
        id: req.params.id,
        nome: req.body.nome,
        descricao: req.body.descricao
    };
    if (!await produto.findByPk(req.params.id)) {
        return res.status(404).json({
            error: true,
            message: "Servico não existe."
        });
    };
    await produto.update(pro, {
        where: { id: req.params.id }
    }).then(produtos => {
        return res.json({
            error: false,
            message: "Produto alterado com sucesso.",
            produtos
        });
    }).catch(erro => {
        return res.status(400).json({
            error: true,
            message: "Não foi possível alterar o produto."
        });
    });
});

app.delete('/excluir-produto/:id', async (req, res) => {
    await produto.destroy({
        where: { id: req.params.id }
    }).then(() => {
        return res.json({
            error: false,
            message: "O produto foi excluido com sucesso."
        });
    }).catch(erro => {
        return res.status(400).json({
            error: true,
            message: "Erro na exclusão do produto."
        });
    });

});

app.post('/inserir-compra', async (req, res) => {
    await compra.create(
        req.body
    ).then(compra => {
        return res.json({
            error: false,
            message: "Compra criada com sucesso.",
            compra
        });
    }).catch(erro => {
        return res.status(400).json({
            error: true,
            message: "Foi impossível se conectar."
        });
    });
});

app.get('/listar-compra', async (req, res) => {
    await compra.findAll()
        .then(compra => {
            return res.json({
                error: false,
                compra
            });
        }).catch(erro => {
            return res.status(400).json({
                error: true,
                message: "Erro na conexão."
            });
        });

});

//obter compra
app.get('/compra/:id', async (req, res) => {
    compra.findByPk(req.params.id)
        .then(compra => {
            return res.json({
                error: false,
                compra
            });
        })
        .catch(erro => {
            return res.status(400).json({
                error: true,
                message: "Erro: Não foi possível se conectar com a API."
            });
        });
});

app.put('/atualizar-compra', async (req, res) => {
    await compra.update(req.body, {
        where: { id: req.body.id }
    }).then(compra => {
        return res.json({
            error: false,
            message: "A compra foi atualizado com sucesso.",
            compra
        });
    }).catch(erro => {
        return res.status(400).json({
            error: true,
            message: "Erro na atualização da compra."
        });
    });

});

app.put('/compra/:id', async (req, res) => {
    const com = {
        id: req.params.id,
        ClienteId: req.body.Cliente,
        data: req.body.data
    };
    if (!await cliente.findByPk(req.body.ClienteId)) {
        return res.status(404).json({
            error: true,
            message: "Compra não existe."
        });
    };
    await compra.update(com, {
        where: Sequelize.and({ ClienteId: req.body.ClienteId },
            { id: req.params.id })
    }).then(compra => {
        return res.json({
            error: false,
            message: "Compra alterada com sucesso.",
            compra
        });
    }).catch(erro => {
        return res.status(400).json({
            error: true,
            message: "Não foi possível alterar a compra."
        });
    });
});

app.delete('/excluir-compra/:id', async (req, res) => {
    await compra.destroy({
        where: { id: req.params.id }
    }).then(() => {
        return res.json({
            error: false,
            message: "A compra foi excluida com sucesso."
        });
    }).catch(erro => {
        return res.status(400).json({
            error: true,
            message: "Erro na exclusão da compra."
        });
    });

});

app.post('/inserir-itemcompra', async (req, res) => {
    await itemcompra.create(
        req.body
    )
        .then(item => {
            return res.json({
                error: false,
                message: "Item criado com sucesso",
                item
            });
        }).catch(erro => {
            return res.status(400).json({
                error: true,
                message: "Não foi possível criar o Item."
            });
        });
});

app.get('/listar-itemcompra', async (req, res) => {
    await itemcompra.findAll()
        .then(item => {
            return res.json({
                error: false,
                item
            });
        }).catch(erro => {
            return res.status(400).json({
                error: true,
                message: "Erro de conexão."
            });
        });
});

app.get('/itemcompra', async (req, res) => {
    await itemcompra.findAll()
        .then(itens => {
            return res.json({
                error: false,
                itens
            });
        }).catch(erro => {
            return res.status(400).json({
                error: true,
                message: "Erro de conexão."
            });
        });
});

app.put('/editar-itemcompra/:id', async (req,res)=>{
    const item = {
        quantidade: req.body.quantidade,
        valor: req.body.valor
    };
    if (!await produto.findByPk(req.params.id)){
        return res.status(400).json({
            error: true,
            message: "Produto não foi encontrado."
        });
    };
    if (!await produto.findByPk(req.body.ProdutoId)){
        return res.status(400).json({
            error: true,
            message: "Produto não foi encontrado."
        });
    };
    await itemcompra.update(item, {
        where: Sequelize.and({ProdutoId: req.body.ProdutoId},
            {CompraId: req.params.id})
    }).then((itens)=>{
        return res.json({
            error: false,
            message: "Item alterado com sucesso.",
            itens
        });
    }).catch((erro) => {
        return res.status(400).json({
            error: false,
            message: "Não foi possível alterar.",
        });
    });
});

app.put('/atualizar-itemcompra', async (req, res) => {
    await itemcompra.update(req.body, {
        where: { ProdutoId: req.body.ProdutoId },
    }).then(item => {
        return res.json({
            error: false,
            message: "O item foi alterado com sucesso.",
            item
        });
    }).catch(erro => {
        return res.status(400).json({
            error: true,
            message: "Erro na alteração do item."
        });
    });

});

app.delete('/excluir-itemcompra/:valor', async (req, res) => {
    await itemcompra.destroy({ where: { valor: req.params.valor } })
        .then(() => {
            return res.json({
                error: false,
                message: "O Item foi excluido com sucesso."
            });
        }).catch(erro => {
            return res.status(400).json({
                error: true,
                message: "Erro na exclusão do item."
            });
        });

});

let port = process.env.PORT || 3001;

app.listen(port, (req, res) => {
    console.log('Servidor Ativo: http://localhost:3001');
});