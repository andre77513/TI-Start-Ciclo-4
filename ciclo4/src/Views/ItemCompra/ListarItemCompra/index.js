import axios from 'axios';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Alert, Container, Table } from 'reactstrap';

import { api } from '../../../Config';

export const ListarItemCompra = () => {

    const [data, setData] = useState([]);

    const [status, setStatus] = useState({
        type: '',
        message: ''
    })

    const getItemCompra = async () => {
        await axios.get(api + "/listar-itemcompra")
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


    const delItemCompra = async (valor) => {

        const headers = { 'Content-Type': 'application/jason' };

        await axios.delete(api + "/excluir-itemcompra/" + valor, {headers})
            .then((response) => {
                setStatus({
                    type: 'success',
                    message: 'Item excluído com sucesso'
                });
                getItemCompra();
            })
            .catch(() => {
                setStatus({
                    type: 'error',
                    message: 'Erro: Não foi possível se conectar com a API.'
                })
            })
    }

    useEffect(() => {
        getItemCompra();
    }, []);

    useEffect(() => {
        getItemCompra();
    }, []);

    return (
        <div>
            <Container>
                <div className="d-flex">
                    <div>
                        <h1>Visualizar Itens da Compra</h1>
                    </div>
                    <div className="p-2 m-auto">
                        <Link to="/inserir-itemcompra" className="btn btn-outline-primary btn-sm m-1" >Inserir</Link>
                        <Link to="/listar-compra" className="btn btn-outline-primary btn-sm" >Compras</Link>
                    </div>
                </div>
                {status.type === 'success' ? <Alert color="success"> {status.message} </Alert> : ""}
                {status.type === 'error' ? <Alert color="danger"> {status.message} </Alert> : ""}
                <Table striped>
                    <thead>
                        <tr>
                            <th>CompraId</th>
                            <th>ProdutoId</th>
                            <th>Quantidade</th>
                            <th>Valor</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((item) => (
                            <tr>
                                <td>{item.CompraId}</td>
                                <td>{item.ProdutoId}</td>
                                <td>{item.quantidade}</td>
                                <td>{item.valor}</td>
                                <td className="text-center/">
                                    <Link to={"/editar-itemcompra/"+item.CompraId}
                                        className="btn btn-outline-primary btn-sm m-1">Editar</Link>
                                    <span className="btn btn-outline-danger btn-sm" onClick={() => delItemCompra(item.valor)}>Excluir</span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Container>
        </div>
    );
};