import axios from 'axios';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Alert, Container, Table } from 'reactstrap';

import { api } from '../../../Config';

export const ListarCompra = () => {

    const [data, setData] = useState([]);

    const [status, setStatus] = useState({
        type: '',
        message: ''
    })

    const getCompra = async () => {
        await axios.get(api + "/listar-compra")
            .then((response) => {
                //console.log(response.data.pedidos);
                setData(response.data.compra);
            })
            .catch(() => {
                setStatus({
                    type: 'error',
                    message: 'Erro: sem conexão com a API!'
                });
                console.log("Erro: sem conexão com a API!");
            });
    };


    const delCompra = async (idcompra) => {


        const headers = { 'Content-Type': 'application/jason' };

        await axios.delete(api + "/excluir-compra/" + idcompra, { headers })
            .then((response) => {
                setStatus({
                    type: 'success',
                    message: 'Compra excluída com sucesso'
                });
                getCompra();
            })
            .catch(() => {
                setStatus({
                    type: 'error',
                    message: 'Erro: Não foi possível se conectar com a API.'
                })
            })
    }

    useEffect(() => {
        getCompra();
    }, []);

    useEffect(() => {
        getCompra();
    }, []);

    return (
        <div>
            <Container>
                <div className="d-flex">
                    <div>
                        <h1>Visualizar Compras</h1>
                    </div>
                    <div className="p-2 m-auto">
                        <Link to="/inserir-compra" className="btn btn-outline-primary btn-sm" >Inserir</Link>
                    </div>
                </div>
                {status.type === 'success' ? <Alert color="success"> {status.message} </Alert> : ""}
                {status.type === 'error' ? <Alert color="danger"> {status.message} </Alert> : ""}
                <Table striped>
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>ClienteId</th>
                            <th>Data</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((compra) => (
                            <tr kay={compra.id}>
                                <td>{compra.id}</td>
                                <td>{compra.ClienteId}</td>
                                <td>{compra.data}</td>
                                <td className="text-center/">
                                    <Link to={"/inserir-itemcompra/" + compra.id}
                                        className="btn btn-outline-primary btn-sm">Itens</Link>
                                    <Link to={"/editar-compra/" + compra.id}
                                        className="btn btn-outline-primary btn-sm m-1">Editar</Link>
                                    <span className="btn btn-outline-danger btn-sm" onClick={() => delCompra(compra.id)}>Excluir</span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Container>
        </div>
    );
};