import { Link } from "react-router-dom";
import { useState } from 'react';
import { Alert, Button, Col, Container, Form, FormGroup, Input, Label, Row } from "reactstrap";
import axios from "axios";

import { api } from '../../../Config';

export const InserirItemCompra = () => {

    const [itemcompra, setItemCompra] = useState({
        CompraId: ' ',
        ProdutoId: ' ',
        quantidade: ' ',
        valor: ' '
    });

    const [status, setStatus] = useState({
        type: '',
        message: ''
    });

    const valorInput = e => setItemCompra({ ...itemcompra, [e.target.name]: e.target.value });

    const cadItemCompra = async e => {
        e.preventDefault();

        const headers = {
            'Content-Type': 'application/json'
        }

        await axios.post(api + "/inserir-itemcompra", itemcompra, { headers })
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
                    <h1>Inserir Itens na Compra</h1>
                </div>
                <div className="p-2">
                    <Link to="/listar-Compra" className="btn  btn-outline-primary btn-sm m-1">Compras</Link>
                    <Link to="/listar-itemcompra" className="btn  btn-outline-primary btn-sm">Itens Compra</Link>
                </div>
            </div>
            <hr className="m-1" />

            {status.type === 'error' ? <Alert color="danger">{status.message}</Alert> : ""}

            {status.type === 'success' ? <Alert color="success">{status.message}</Alert> : ""}

            <Form className="p-2" onSubmit={cadItemCompra}>
                <Row form>
                    <Col md={2}>
                        <FormGroup className="p-2">
                            <Label >Id da Compra</Label>
                            <Input type="number" name="CompraId" placeholder="Id da compra" onChange={valorInput} />
                        </FormGroup>

                        <FormGroup className="p-2">
                            <Label >Id do Produto</Label>
                            <Input type="number" name="ProdutoId" placeholder="Id do produto" onChange={valorInput} />
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