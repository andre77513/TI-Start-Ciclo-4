import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Alert, Button, Col, Container, Form, FormGroup, Input, Label, Row } from 'reactstrap';
import { api } from '../../../Config';

export const EditarCliente = (props) => {

    const [id, setId] = useState(props.match.params.id);
    const [nome, setNome] = useState('');
    const [endereco, setEndereco] = useState('');
    const [cidade, setCidade] = useState('');
    const [uf, setUf] = useState('');
    const [nascimento, setNascimento] = useState('');
    const [clienteDesde, setClienteDesde] = useState('');
    const [status, setStatus] = useState({
        type: '',
        message: ''
    });

    const editCliente = async e => {
        e.preventDefault();

        const headers = {
            'Content-Type': 'application/json'
        };

        await axios.put(api + "/cliente/" + id, { id, nome, endereco, cidade, uf, nascimento, clienteDesde }, { headers })
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
        const getCliente = async () => {
            await axios(api + "/cliente/" + id)
                .then((response) => {
                    setId(response.data.cliente.id);
                    setNome(response.data.cliente.nome);
                    setEndereco(response.data.cliente.endereco);
                    setCidade(response.data.cliente.cidade);
                    setUf(response.data.cliente.uf);
                    setNascimento(response.data.cliente.nascimento);
                    setClienteDesde(response.data.cliente.clienteDesde);
                })
                .catch(() => {
                    setStatus({
                        type: 'error',
                        message: 'response.data.message'
                    });
                });
        };
        getCliente();
    }, [id]);

    return (
        <div>
            <Container>
                <div className="d-flex">
                    <div className="m-auto p-2">
                        <h1>Editar Cliente</h1>
                    </div>
                </div>
                <div className="p-2">
                    <Link to="/listar-cliente" className="m-auto btn btn-outline-primary btn-sm">Clientes</Link>
                </div>
                <hr className="m-1" />
                {status.type === 'error' ? <Alert color="danger"> {status.message} </Alert> : ""}
                {status.type === 'success' ? <Alert color="success"> {status.message} </Alert> : ""}
                <Form className="p-2" onSubmit={editCliente}>
                    <FormGroup className="p-2">
                        <Label >Id do Cliente</Label>
                        <Input type="text" name="id" placeholder="Id" defaultValue={id} />
                    </FormGroup>
                    <FormGroup className="p-2">
                        <Label>Nome</Label>
                        <Input type="text" name="nome" placeholder="Nome" value={nome} onChange={e => setNome(e.target.value)} />
                    </FormGroup>
                    <Row form>
                        <div className="d-flex">
                            <Col md={4}>
                                <FormGroup className="p-2">
                                    <Label >Cidade</Label>
                                    <Input type="text" name="cidade" placeholder="Cidade" value={cidade} onChange={e => setCidade(e.target.value)} />
                                </FormGroup>
                            </Col>
                            <Col md={1}>
                                <FormGroup className="p-2">
                                    <Label >UF</Label>
                                    <Input type="text" name="uf" placeholder="UF" value={uf} onChange={e => setUf(e.target.value)} />
                                </FormGroup>
                            </Col>
                        </div>
                        <div className="d-flex">
                            <Col md={2}>
                                <FormGroup className="p-2">
                                    <Label >Nascimento</Label>
                                    <Input type="text" name="nascimento" placeholder="Data de nascimento" value={nascimento} onChange={e => setNascimento(e.target.value)} />
                                </FormGroup>
                            </Col>
                            <Col md={2}>
                                <FormGroup className="p-2">
                                    <Label >Cliente desde</Label>
                                    <Input type="text" name="clienteDesde" placeholder="Data" value={clienteDesde} onChange={e => setClienteDesde(e.target.value)} />
                                </FormGroup>
                            </Col>
                        </div>
                    </Row>
                    <Button type="submit" outline color="warning" >Salvar</Button>
                    <Button className="m-2" type="reset" outline color="primary" >Limpar</Button>
                </Form>
            </Container>
        </div>
    );
};
