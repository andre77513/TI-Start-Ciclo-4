import axios from 'axios';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Alert, Container, Table } from 'reactstrap';

import { api } from '../../../Config';

export const ListarProduto = () => {

    const [data, setData] = useState([]);

    const [status, setStatus] = useState({
        type: '',
        message: ''
    })

    const getProdutos = async () => {
        await axios.get(api + "/listar-produto")
            .then((response) => {
                setData(response.data.produtos);
            })
            .catch(() => {
                setStatus({
                    type: 'error',
                    message: 'Erro: sem conexão com a API!'
                });
                console.log("Erro: sem conexão com a API!");
            });
    };

    const delProduto = async (idproduto) => {
        console.log(idproduto);

        const headers = { 'Content-Type': 'application/jason' };

        await axios.delete(api + "/excluir-produto/" + idproduto, { headers })
            .then((response) => {
                setStatus({
                    type: 'success',
                    message: 'Produto excluído com sucesso'
                });
                getProdutos();
            })
            .catch(() => {
                setStatus({
                    type: 'error',
                    message: 'Erro: Não foi possível se conectar com a API.'
                })
            })
    }

    useEffect(() => {
        getProdutos();
    }, []);

    useEffect(() => {
        getProdutos();
    }, []);

    return (
        <div>
            <Container>
                <div className="d-flex">
                    <div>
                        <h1>Visualizar Produtos</h1>
                    </div>
                    <div className="p-2 m-auto">
                        <Link to="/cadastrar-produto" className="btn btn-outline-primary btn-sm" >Cadastrar</Link>
                    </div>
                </div>
                {status.type === 'success' ? <Alert color="success"> {status.message} </Alert> : ""}
                {status.type === 'error' ? <Alert color="danger"> {status.message} </Alert> : ""}
                <Table striped>
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Nome</th>
                            <th>Descrição</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((produtos) => (
                            <tr kay={produtos.id}>
                                <td>{produtos.id}</td>
                                <td>{produtos.nome}</td>
                                <td>{produtos.descricao}</td>
                                <td className="text-center/">
                                    <Link to={"/editar-produto/" + produtos.id}
                                        className="btn btn-outline-primary btn-sm m-1">Editar</Link>
                                    <span className="btn btn-outline-danger btn-sm" onClick={() => delProduto(produtos.id)}>Excluir</span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Container>
        </div>
    );
};