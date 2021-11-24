import axios from 'axios';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Alert, Container, Table } from 'reactstrap';

import { api } from '../../../Config';

export const ListarServico = () => {

    const [data, setData] = useState([]);

    const [status, setStatus] = useState({
        type: '',
        message: ''
    })

    const getServicos = async () => {
        await axios.get(api + "/listar-servico")
            .then((response) => {
                setData(response.data.servicos);
            })
            .catch(() => {
                setStatus({
                    type: 'error',
                    message: 'Erro: sem conexão com a API!'
                });
                console.log("Erro: sem conexão com a API!");
            });
    };

    const delServico = async (idservico) => {
        console.log(idservico);

        const headers = { 'Content-Type': 'application/jason' };

        await axios.delete(api + "/excluir-servico/" + idservico, { headers })
            .then((response) => {
                setStatus({
                    type: 'success',
                    message: 'Serviço excluido com sucesso'
                });
                getServicos();
            })
            .catch(() => {
                setStatus({
                    type: 'error',
                    message: 'Erro: Não foi possível se conectar com a API.'
                })
            })
    }

    useEffect(() => {
        getServicos();
    }, []);

    useEffect(() => {
        getServicos();
    }, []);

    return (
        <div>
            <Container>
                <div className="d-flex">
                    <div>
                        <h1>Visualizar informações do serviço </h1>
                    </div>
                    <div className="p-2 m-auto">
                        <Link to="/cadastrar-servico" className="btn btn-outline-primary btn-sm" >Cadastrar</Link>
                    </div>
                </div>
                {status.type === 'success' ? <Alert color="success"> {status.message} </Alert> : ""}
                {status.type === 'error' ? <Alert color="danger"> {status.message} </Alert> : ""}
                <Table striped>
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Nome</th>
                            <th>Descricao</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((servicos) => (
                            <tr kay={servicos.id}>
                                <td>{servicos.id}</td>
                                <td>{servicos.nome}</td>
                                <td>{servicos.descricao}</td>
                                <td className="text-center/">
                                    <Link to={"/editar-servico/" + servicos.id}
                                        className="btn btn-outline-primary btn-sm m-1">Editar</Link>
                                    <span className="btn btn-outline-danger btn-sm" onClick={() => delServico(servicos.id)}>Excluir</span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Container>
        </div>
    );
};