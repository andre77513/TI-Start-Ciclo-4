import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Alert, Button, Col, Container, Form, FormGroup, Input, Label, Row } from 'reactstrap';
import { api } from '../../../Config';

export const EditarItemCompra = (props) => {
    const [id,] = useState(props.match.params.id);
    const [CompraId, setCopraId] = useState('');
    const [ProdutoId, setProdutoId] = useState('');
    const [quantidade, setQuantidade] = useState('');
    const [valor, setValor] = useState('');
    const [status, setStatus] = useState({
        type: '',
        message: ''
    });
    const editItemCompra = async e => {
        e.preventDefault();

        const headers = {
            'Content-Type': 'application/json'
        };

        await axios.put(api + "/editar-itemcompra/" + id, { CompraId, ProdutoId, quantidade, valor }, { headers })
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
        const getItemCompra = async () => {
            await axios(api + "/itemcompra")
                .then((response) => {
                    setProdutoId(response.data.itens.ProdutoId);
                    setQuantidade(response.data.itens.quantidade);
                    setValor(response.data.itens.valor);
                })
                .catch(() => {
                    setStatus({
                        type: 'error',
                        message: 'response.data.message'
                    });
                });
        };
        getItemCompra();
    },[id]);

    return (
        <div>
            <Container>
                <div className="d-flex">
                    <div className="m-auto p-2">
                        <h1>Editar Itens da Compra</h1>
                    </div>
                </div>
                <div className="p-2">
                    <Link to="/listar-itemcompra" className="m-auto btn btn-outline-primary btn-sm">Itens Compra</Link>
                </div>
                <hr className="m-1" />
                {status.type === 'error' ? <Alert color="danger"> {status.message} </Alert> : ""}
                {status.type === 'success' ? <Alert color="success"> {status.message} </Alert> : ""}
                <Form className="p-2" onSubmit={editItemCompra}>
                    <Row form>
                        <Col md={2}>
                            <FormGroup className="p-2">
                                <Label >Id do Compra</Label>
                                <Input type="number" name="CompraId" placeholder="Id da Compra" defaultValue={id}/>
                            </FormGroup>
                            <FormGroup className="p-2">
                                <Label>Id do Produto</Label>
                                <Input type="number" name="ServicoId" placeholder="Id do serviço" defaultValue={ProdutoId} onChange={e => setProdutoId(e.target.value)} />
                            </FormGroup>
                            <FormGroup className="p-2">
                                <Label >Quantidade</Label>
                                <Input type="number" name="quantidade" placeholder="Quantidade" value={quantidade} onChange={e => setQuantidade(e.target.value)} />
                            </FormGroup>
                            <FormGroup className="p-2">
                                <Label >Valor</Label>
                                <Input type="number" name="valor" placeholder="Valor" value={valor} onChange={e => setValor(e.target.value)} />
                            </FormGroup>
                        </Col>
                    </Row>
                    <Button className="m-1" type="submit" outline color="warning" >Salvar</Button>
                    <Button type="reset" outline color="primary" >Limpar</Button>
                </Form>
            </Container>
        </div>
    );
};
