import { Link } from "react-router-dom";
import { useState } from 'react';
import { Alert, Button, Col, Container, Form, FormGroup, Input, Label, Row } from "reactstrap";
import axios from "axios";

import { api } from '../../../Config';

export const InserirItemPedido = () => {

    const [itempedido, setItemPedido] = useState({
        PedidoId: ' ',
        ServicoId: ' ',
        quantidade: ' ',
        valor: ' '
    });

    const [status, setStatus] = useState({
        type: '',
        message: ''
    });

    const valorInput = e => setItemPedido({ ...itempedido, [e.target.name]: e.target.value });

    const cadItemPedido = async e => {
        e.preventDefault();

        const headers = {
            'Content-Type': 'application/json'
        }

        await axios.post(api + "/inserir-itempedido", itempedido, { headers })
            .then((response) => {
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
            });
    };

    return (
        <Container>
            <div className="d-flex">
                <div className="m-auto p-2">
                    <h1>Inserir Itens no Pedido</h1>
                </div>
                <div className="p-2">
                    <Link to="/listar-pedidos" className="btn  btn-outline-primary btn-sm m-1">Pedidos</Link>
                    <Link to="/listar-itempedido" className="btn  btn-outline-primary btn-sm">Itens Pedido</Link>
                </div>
            </div>
            <hr className="m-1" />

            {status.type === 'error' ? <Alert color="danger">{status.message}</Alert> : ""}

            {status.type === 'success' ? <Alert color="success">{status.message}</Alert> : ""}

            <Form className="p-2" onSubmit={cadItemPedido}>
                <Row form>
                    <Col md={2}>
                        <FormGroup className="p-2">
                            <Label >Id do Pedido</Label>
                            <Input type="number" name="PedidoId" placeholder="Id do pedido" onChange={valorInput} />
                        </FormGroup>

                        <FormGroup className="p-2">
                            <Label >Id do Serviço</Label>
                            <Input type="number" name="ServicoId" placeholder="Id do serviço" onChange={valorInput} />
                        </FormGroup>

                        <FormGroup className="p-2">
                            <Label>Quantidade</Label>
                            <Input type="number" name="quantidade" placeholder="Quantidade" onChange={valorInput} />
                        </FormGroup>
                        <FormGroup className="p-2">
                            <Label>Valor</Label>
                            <Input type="number" name="valor" placeholder="Valor" onChange={valorInput} />
                        </FormGroup>
                    </Col>
                </Row>
                <Button type="submit" outline color="warning" >Inserir</Button>
                <Button className="m-2" type="reset" outline color="primary" >Limpar</Button>
            </Form>
        </Container>
    );

};