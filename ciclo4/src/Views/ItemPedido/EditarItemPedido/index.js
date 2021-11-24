import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Alert, Button, Col, Container, Form, FormGroup, Input, Label, Row } from 'reactstrap';
import { api } from '../../../Config';

export const EditarItemPedido = (props) => {
    const [id,] = useState(props.match.params.id);
    const [PedidoId, setPedidoId] = useState('');
    const [ServicoId, setServicoId] = useState('');
    const [quantidade, setQuantidade] = useState('');
    const [valor, setValor] = useState('');
    const [status, setStatus] = useState({
        type: '',
        message: ''
    });
    const editItemPedido = async e => {
        e.preventDefault();

        const headers = {
            'Content-Type': 'application/json'
        };

        await axios.put(api + "/editar-itempedido/" + id, { PedidoId, ServicoId, quantidade, valor }, { headers })
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
        const getItemPedido = async () => {
            await axios(api + "/itempedido")
                .then((response) => {
                    setServicoId(response.data.itens.ServicoId);
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
        getItemPedido();
    },[id]);

    return (
        <div>
            <Container>
                <div className="d-flex">
                    <div className="m-auto p-2">
                        <h1>Editar Itens do Pedido</h1>
                    </div>
                </div>
                <div className="p-2">
                    <Link to="/listar-itempedido" className="m-auto btn btn-outline-primary btn-sm">Itens Pedido</Link>
                </div>
                <hr className="m-1" />
                {status.type === 'error' ? <Alert color="danger"> {status.message} </Alert> : ""}
                {status.type === 'success' ? <Alert color="success"> {status.message} </Alert> : ""}
                <Form className="p-2" onSubmit={editItemPedido}>
                    <Row form>
                        <Col md={2}>
                            <FormGroup className="p-2">
                                <Label >Id do Pedido</Label>
                                <Input type="number" name="PedidoId" placeholder="Id do pedido" defaultValue={id}/>
                            </FormGroup>
                            <FormGroup className="p-2">
                                <Label>Id do Serviço</Label>
                                <Input type="number" name="ServicoId" placeholder="Id do serviço" defaultValue={ServicoId} onChange={e => setServicoId(e.target.value)} />
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
