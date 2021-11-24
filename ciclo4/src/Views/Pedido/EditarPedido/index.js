import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Alert, Button, Container, Form, FormGroup, Input, Label } from 'reactstrap';
import { api } from '../../../Config';

export const EditarPedido = (props) => {

    const [id, setId] = useState(props.match.params.id);
    const [data, setData] = useState('');
    const [ClienteId, setClienteId] = useState('');
    const [status, setStatus] = useState({
        type: '',
        message: ''
    });

    const editPedido = async e => {
        e.preventDefault();

        const headers = {
            'Content-Type': 'application/json'
        };

        await axios.put(api + "/pedido/" + id, { id, data, ClienteId }, { headers })
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
        const getPedido = async () => {
            await axios(api + "/pedido/" + id)
                .then((response) => {
                    setId(response.data.pedido.id);
                    setData(response.data.pedido.data);
                    setClienteId(response.data.pedido.ClienteId);
                })
                .catch(() => {
                    setStatus({
                        type: 'error',
                        message: 'response.data.message'
                    });
                });
        };
        getPedido();
    }, [id]);

    return (
        <div>
            <Container>
                <div className="d-flex">
                    <div className="m-auto p-2">
                        <h1>Editar Pedido</h1>
                    </div>
                </div>
                <div className="p-2">
                    <Link to="/listar-pedidos" className="m-auto btn btn-outline-primary btn-sm">Pedidos</Link>
                </div>
                <hr className="m-1"/>
                {status.type === 'error' ? <Alert color="danger"> {status.message} </Alert> : ""}
                {status.type === 'success' ? <Alert color="success"> {status.message} </Alert> : ""}
                <Form className="p-2" onSubmit={editPedido}>
                    <FormGroup className="p-2">
                        <Label >Id do Pedido</Label>
                        <Input type="number" name="id" placeholder="Id do pedido" defaultValue={id}/>
                    </FormGroup>
                    <FormGroup className="p-2">
                        <Label>Data do Pedido</Label>
                        <Input type="text" name="data" placeholder="Data do pedido" value={data} onChange={e => setData(e.target.value)} />
                    </FormGroup>
                    <FormGroup className="p-2">
                        <Label >Id do Cliente</Label>
                        <Input type="text" name="clienteId" placeholder="Id do cliente" defaultValue={ClienteId}/>
                    </FormGroup>
                    <Button type="submit" outline color="warning" >Salvar</Button>
                    <Button type="reset" outline color="primary" >Limpar</Button>
                </Form>
            </Container>
        </div>
    );
};
