import { Link } from "react-router-dom";
import { useState } from 'react';
import { Alert, Button, Container, Form,FormGroup,Input, Label } from "reactstrap";
import axios from "axios";

import { api } from '../../../Config';

export const CadastrarServico = () => {

    const [servico, setServico] = useState({
        nome: ' ',
        descricao: ' '
    });

    const [status, setStatus] = useState({
        type: '',
        message: ''
    });

    const valorInput = e => setServico({
        ...servico,[e.target.name]: e.target.value
    });

    const cadServico = async e => {
        e.preventDefault();
        console.log(servico);

        const headers = {
            'Content-Type': 'application/json'
        }

        await axios.post(api+"/inserir-servico",servico, {headers})
        .then((response) => {
            //console.log(response.data.message);
            if(response.data.error){
                setStatus({
                    type: 'error',
                    message: response.data.message
                });
            }else{
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
                    <h1>Cadastrar Serviço</h1>
                </div>
                <div className="p-2">
                    <Link to="/listar-servico" className="btn  btn-outline-primary btn-sm">Serviços</Link>
                </div>
            </div>
            <hr className="m-1" />

            {status.type === 'error' ? <Alert color="danger">{status.message}</Alert> : ""}

            {status.type === 'success' ? <Alert color="success">{status.message}</Alert> : ""}

            <Form className="p-2" onSubmit={cadServico}>
                <FormGroup className="p-2">
                    <Label >Nome</Label>
                    <Input type="text" name="nome" placeholder="Nome do serviço" onChange={valorInput}/>
                </FormGroup>

                <FormGroup className="p-2">
                    <Label> Descrição</Label>
                    <Input type="text" name="descricao" placeholder="Descrição do serviço" onChange={valorInput}/>
                </FormGroup>
                <Button type="submit" outline color = "warning" >Cadastrar</Button>
                <Button className="m-2" type="reset" outline color="primary" >Limpar</Button>
            </Form>
        </Container>
    );

};