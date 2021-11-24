import axios from 'axios';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Alert, Container, Table } from 'reactstrap';

import { api } from '../../../Config';

export const ListarItemPedido = () => {

    const [data, setData] = useState([]);

    const [status, setStatus] = useState({
        type: '',
        message: ''
    })

    const getItemPedido = async () => {
        await axios.get(api + "/listar-itempedido")
            .then((response) => {
                setData(response.data.item);
            })
            .catch(() => {
                setStatus({
                    type: 'error',
                    message: 'Erro: sem conexão com a API!'
                });
                console.log("Erro: sem conexão com a API!");
            });
    };


    const delItemPedido = async (valor) => {

        const headers = { 'Content-Type': 'application/jason' };

        await axios.delete(api + "/excluir-itempedido/" + valor, {headers})
            .then((response) => {
                setStatus({
                    type: 'success',
                    message: 'Item excluído com sucesso'
                });
                getItemPedido();
            })
            .catch(() => {
                setStatus({
                    type: 'error',
                    message: 'Erro: Não foi possível se conectar com a API.'
                })
            })
    }

    useEffect(() => {
        getItemPedido();
    }, []);

    useEffect(() => {
        getItemPedido();
    }, []);

    return (
        <div>
            <Container>
                <div className="d-flex">
                    <div>
                        <h1>Visualizar Itens do Pedido</h1>
                    </div>
                    <div className="p-2 m-auto">
                        <Link to="/inserir-itempedido" className="btn btn-outline-primary btn-sm m-1" >Inserir</Link>
                        <Link to="/listar-pedidos" className="btn btn-outline-primary btn-sm" >Pedidos</Link>
                    </div>
                </div>
                {status.type === 'success' ? <Alert color="success"> {status.message} </Alert> : ""}
                {status.type === 'error' ? <Alert color="danger"> {status.message} </Alert> : ""}
                <Table striped>
                    <thead>
                        <tr>
                            <th>PedidoId</th>
                            <th>ServicoId</th>
                            <th>Quantidade</th>
                            <th>Valor</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((item) => (
                            <tr>
                                <td>{item.PedidoId}</td>
                                <td>{item.ServicoId}</td>
                                <td>{item.quantidade}</td>
                                <td>{item.valor}</td>
                                <td className="text-center/">
                                    <Link to={"/editar-itempedido/" + item.PedidoId}
                                        className="btn btn-outline-primary btn-sm m-1">Editar</Link>
                                    <span className="btn btn-outline-danger btn-sm" onClick={() => delItemPedido(item.valor)}>Excluir</span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Container>
        </div>
    );
};