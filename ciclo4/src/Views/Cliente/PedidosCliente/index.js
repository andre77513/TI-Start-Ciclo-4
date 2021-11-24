import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Alert, Container, Table } from 'reactstrap';
import { api } from '../../../Config';

export const PedidosCliente = (props) => {

    const [data, setData] = useState([]);

    const [status, setStatus] = useState({
        type: '',
        message: ''
    })

    const [id] = useState(props.match.params.id);

    const getPedido = async () => {
        await axios.get(api + "/cliente/" + id + "/pedido")
            .then((response) => {
                setData(response.data.pedidos);
            })
            .catch(() => {
                setStatus({
                    type: 'error',
                    message: 'Erro: sem conexão com a API!'
                });
            });
    };

    const delPedido = async (idpedido) => {
        console.log(idpedido);

        const headers = { 'Content-Type': 'application/jason' };

        await axios.delete(api + "/excluir-pedido/" + idpedido, { headers })
            .then((response) => {
                setStatus({
                    type: 'success',
                    message: 'Pedido excluído com sucesso'
                });
                getPedido();
            })
            .catch(() => {
                setStatus({
                    type: 'error',
                    message: 'Erro: Não foi possível se conectar com a API.'
                });
            });
    };

    useEffect(() => {
        getPedido();
    }, [id]);

    useEffect(() => {
        getPedido();
    }, []);

    return (
        <div>
            <Container>
                <div className="d-flex">
                    <div className="m-auto p-2">
                        <h1>Pedidos do Cliente</h1>
                    </div>
                </div>
                <div className="p-2">
                    <Link to="/listar-cliente" className="m-auto btn btn-outline-primary btn-sm">Clientes</Link>
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
                        {data.map((pedidos) => (
                            <tr kay={pedidos.id}>
                                <td>{pedidos.id}</td>
                                <td>{pedidos.ClienteId}</td>
                                <td>{pedidos.data}</td>
                                <td className="text-center/">
                                    <Link to={"/editar-pedido/" + pedidos.id}
                                        className="btn btn-outline-primary btn-sm">Editar</Link>
                                    <span className="btn btn-outline-danger btn-sm" onClick={() => delPedido(pedidos.id)}>Excluir</span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Container>
        </div>
    );
};