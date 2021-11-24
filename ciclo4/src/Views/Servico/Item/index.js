import axios from 'axios';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Alert, Container, Table } from 'reactstrap'

import { api } from '../../../Config';

export const Item = (props) => {
    console.log(props.match.params.id);

    const [data, setData] = useState([]);

    const [id, setId] = useState(props.match.params.id);

    const [status, setStatus] = useState({
        type: '',
        message: ''
    })

    const getItens = async () => {
        await axios.get(api+"/servico/"+id+"/pedidos")
            .then((response) => {
                //console.log(response.data.item);
                setData(response.data.item);
            })
            .catch(() => {
                setStatus({
                    type: 'error',
                    message: 'Erro: sem conexão com a API!'
                });
                //console.log("Erro: sem conexão com a API!");
            });
    };

    useEffect(() => {
        getItens('1');
    }, [id]);

    return (
        <div>
            <Container>
                <div>
                    <h1>Pedidos do serviço</h1>
                </div>
                {status.type === 'error' ? <Alert color="danger"> {status.message} </Alert> : ""} 
                <Table striped>
                    <thead>
                        <tr>
                            <th>Pedido</th>
                            <th>Quantidade</th>
                            <th>Valor</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((item) => (
                            <tr kay={item.ServicoId}>
                                <td>{item.PedidoId}</td>
                                <td>{item.quantidade}</td>
                                <td>{item.valor}</td>
                                <td className="text-center/">
                                    <Link to={"/item-pedido/"}
                                    className="btn btn-outline-primary btn-sm">Consultar</Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Container>
        </div>
    );
};