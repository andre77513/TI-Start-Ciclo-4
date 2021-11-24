import { Link } from "react-router-dom";
import { useState } from 'react';
import { Alert, Button, Col, Container, Form, FormGroup, Input, Label, Row } from "reactstrap";
import axios from "axios";

import { api } from '../../../Config';

export const CadastrarCliente = () => {

    const [cliente, setCliente] = useState({
        nome: ' ',
        nascimento: ' '
    });

    const [status, setStatus] = useState({
        type: '',
        message: ''
    });

    const valorInput = e => setCliente({ ...cliente, [e.target.name]: e.target.value });

    const cadCliente = async e => {
        e.preventDefault();
        console.log(cliente);

        const headers = {
            'Content-Type': 'application/json'
        }

        await axios.post(api + "/inserir-cliente", cliente, { headers })
            .then((response) => {
                //console.log(response.data.message);
                if (response.data.error) {
                    setStatus({
                        type: 'error',
                        message: response.data.message
                    });
                } else {
                    setStatus({
                        type: 'success',
                        message: response.data.message
                    });
                }
            })
            .catch(() => {
                console.log("Erro: Sem conexão com a API.");
            });
    };

    return (
        <Container>
            <div className="d-flex">
                <div className="m-auto p-2">
                    <h1>Cadastrar Cliente</h1>
                </div>
                <div className="p-2">
                    <Link to="/listar-cliente" className="btn  btn-outline-primary btn-sm">Clientes</Link>
                </div>
            </div>
            <hr className="m-1" />

            {status.type === 'error' ? <Alert color="danger">{status.message}</Alert> : ""}

            {status.type === 'success' ? <Alert color="success">{status.message}</Alert> : ""}

            <Form className="p-2" onSubmit={cadCliente}>
                <FormGroup className="p-2">
                    <Label >Nome</Label>
                    <Input type="text" name="nome" placeholder="Nome" onChange={valorInput} />
                </FormGroup>

                <FormGroup className="p-2">
                    <Label>Endereco</Label>
                    <Input type="text" name="endereco" placeholder="Endereço" onChange={valorInput} />
                </FormGroup>
                <Row form>
                    <div className="d-flex">
                        <Col md={4}>
                            <FormGroup className="p-2">
                                <Label >Cidade</Label>
                                <Input type="text" name="cidade" placeholder="Cidade" onChange={valorInput} />
                            </FormGroup>
                        </Col>
                        <Col md={1}>
                            <FormGroup className="p-2">
                                <Label >UF</Label>
                                <Input type="text" name="uf" placeholder="UF" onChange={valorInput} />
                            </FormGroup>
                        </Col>
                    </div>
                    <div className="d-flex">
                        <Col md={2}>
                            <FormGroup className="p-2">
                                <Label >Nascimento</Label>
                                <Input type="text" name="nascimento" placeholder="Data de nascimento" onChange={valorInput} />
                            </FormGroup>
                        </Col>
                        <Col md={2}>
                            <FormGroup className="p-2">
                                <Label >Cliente desde</Label>
                                <Input type="text" name="clienteDesde" placeholder="Data" onChange={valorInput} />
                            </FormGroup>
                        </Col>
                    </div>
                </Row>
                <Button type="submit" outline color="warning" >Cadastrar</Button>
                <Button className="m-2" type="reset" outline color="primary" >Limpar</Button>
            </Form>
        </Container>
    );

};