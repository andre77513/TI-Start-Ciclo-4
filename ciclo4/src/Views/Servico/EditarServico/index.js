import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Alert, Button, Container, Form, FormGroup, Input, Label } from 'reactstrap';
import { api } from '../../../Config';

export const EditarServico = (props) => {

    const [id, setId] = useState(props.match.params.id);
    const [nome, setNome] = useState('');
    const [descricao, setDescricao] = useState('');
    const [status, setStatus] = useState({
        type: '',
        message: ''
    });

    const editServico = async e => {
        e.preventDefault();

        const headers = {
            'Content-Type': 'application/json'
        };

        await axios.put(api + "/servico/" + id, { nome, descricao},  {headers} )
            .then((response) => {
                setStatus({
                    type: 'success',
                    message: 'Alteração feita com sucesso'
                });
            })
            .catch(() => {
                setStatus({
                    type: 'error',
                    message: 'Não foi possível fazer a alteração'
                });
            });
    };

    useEffect(() => {
        const getServico = async () => {
            await axios(api + "/servico/" + id)
                .then((response) => {
                    setId(response.data.servicos.id);
                    setNome(response.data.servicos.nome);
                    setDescricao(response.data.servicos.descricao);
                })
                .catch(() => {
                    setStatus({
                        type: 'error',
                        message: 'response.data.message'
                    });
                });
        };
        getServico();
    }, [id]);

    return (
        <div>
            <Container>
                <div className="d-flex">
                    <div className="m-auto p-2">
                        <h1>Editar Servico</h1>
                    </div>
                </div>
                <div className="p-2">
                    <Link to="/listar-servico" className="m-auto btn btn-outline-primary btn-sm">Serviços</Link>
                </div>
                <hr className="m-1"/>
                {status.type === 'error' ? <Alert color="danger"> {status.message} </Alert> : ""}
                {status.type === 'success' ? <Alert color="success"> {status.message} </Alert> : ""}
                <Form className="p-2" onSubmit={editServico}>
                    <FormGroup className="p-2">
                        <Label >Id do Serviço</Label>
                        <Input type="text" name="id" placeholder="Id do serviço" defaultValue={id} />
                    </FormGroup>
                    <FormGroup className="p-2">
                        <Label>Nome</Label>
                        <Input type="text" name="nome" placeholder="Nome" value={nome} onChange={e => setNome(e.target.value)} />
                    </FormGroup>
                    <FormGroup className="p-2">
                        <Label >Descrição </Label>
                        <Input type="text" name="descricao" placeholder="Descrição" value={descricao} onChange={e => setDescricao(e.target.value)}/>
                    </FormGroup>
                    <Button className="m-1" type="submit" outline color="warning" >Salvar</Button>
                    <Button type="reset" outline color="primary" >Limpar</Button>
                </Form>
            </Container>
        </div>
    );
};
