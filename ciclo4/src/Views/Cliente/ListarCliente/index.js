import axios from 'axios';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Alert, Container, Table } from 'reactstrap';

import { api } from '../../../Config';

export const ListarCliente = () => {

    const [data, setData] = useState([]);

    const [status, setStatus] = useState({
        type: '',
        message: ''
    })

    const getClientes = async () => {
        await axios.get(api + "/listar-cliente")
            .then((response) => {
                //console.log(response.data.cli);
                setData(response.data.cliente);
            })
            .catch(() => {
                setStatus({
                    type: 'error',
                    message: 'Erro: sem conexão com a API!'
                });
                //console.log("Erro: sem conexão com a API!");
            });
    };

    const delClientes = async (idcliente) => {

        const headers = { 'Content-Type': 'application/jason' };

        await axios.delete(api + "/excluir-cliente/" + idcliente, { headers })
            .then((response) => {
                setStatus({
                    type: 'success',
                    message: 'Cliente excluido com sucesso'
                });
                getClientes();
            })
            .catch(() => {
                setStatus({
                    type: 'error',
                    message: 'Erro: Não foi possível se conectar com a API.'
                })
            })
    }

    useEffect(() => {
        getClientes();
    }, []);

    return (
        <div>
            <Container>
                <div className="d-flex">
                    <div>
                        <h1>Visualizar Clientes</h1>
                    </div>
                    <div className="p-2 m-auto">
                        <Link to="/cadastrar-cliente" className="btn btn-outline-primary btn-sm" >Cadastrar</Link>
                    </div>
                </div>
                {status.type === 'success' ? <Alert color="success"> {status.message} </Alert> : ""}
                {status.type === 'error' ? <Alert color="danger"> {status.message} </Alert> : ""}
                <Table striped>
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Nome</th>
                            <th>Endereço</th>
                            <th>Cidade</th>
                            <th>Uf</th>
                            <th>Nascimento</th>
                            <th>Cliente desde</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((cliente) => (
                            <tr kay={cliente.id}>
                                <td>{cliente.id}</td>
                                <td>{cliente.nome}</td>
                                <td>{cliente.endereco}</td>
                                <td>{cliente.cidade}</td>
                                <td>{cliente.uf}</td>
                                <td>{cliente.nascimento}</td>
                                <td>{cliente.clienteDesde}</td>
                                <td className="text-center/">
                                    <Link to={"/editar-cliente/" + cliente.id}
                                        className="btn btn-outline-primary btn-sm m-1">Editar</Link>
                                    <span className="btn btn-outline-danger btn-sm" onClick={() => delClientes(cliente.id)}>Excluir</span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Container>
        </div>
    );
};