import { Link } from "react-router-dom";
import { useState } from 'react';
import { Alert, Button, Col, Container, Form, FormGroup, Input, Label, Row } from "reactstrap";
import axios from "axios";

import { api } from '../../../Config';

export const InserirPedido = () => {

    const [pedido, setPedido] = useState({
        ClienteId: ' ',
        data: ' '
    });

    const [status, setStatus] = useState({
        type: '',
        message: ''
    });

    const valorInput = e => setPedido({ ...pedido, [e.target.name]: e.target.value });

    const cadPedido = async e => {
        e.preventDefault();
        console.log(pedido);

        const headers = {
            'Content-Type': 'application/json'
        }

        await axios.post(api + "/inserir-pedido", pedido, { headers })
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
                    <h1>Inserir Pedido</h1>
                </div>
                <div className="p-2">
                    <Link to="/listar-pedidos" className="btn  btn-outline-primary btn-sm">Pedidos</Link>
                </div>
            </div>
            <hr className="m-1" />

            {status.type === 'error' ? <Alert color="danger">{status.message}</Alert> : ""}

            {status.type === 'success' ? <Alert color="success">{status.message}</Alert> : ""}

            <Form className="p-2" onSubmit={cadPedido}>
                <Row form>
                    <Col md={2}>
                        <FormGroup className="p-2">
                            <Label >ClienteId</Label>
                            <Input type="number" name="ClienteId" placeholder="Id do cliente" onChange={valorInput} />
                        </FormGroup>

                        <FormGroup className="p-2">
                            <Label>Data</Label>
                            <Input type="text" name="data" placeholder="Data do pedido" onChange={valorInput} />
                        </FormGroup>
                    </Col>
                </Row>
                <Button type="submit" outline color="warning" >Inserir</Button>
                <Button className="m-2" type="reset" outline color="primary" >Limpar</Button>
            </Form>
        </Container>
    );

};