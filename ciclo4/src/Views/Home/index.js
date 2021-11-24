import { Link } from 'react-router-dom';
import { Container } from 'reactstrap';

export const Home = () => {
    return (
        <div>
            <Container>
                <div className="d-flex">
                    <div className="m-auto p-2">
                        <h1>Página Inicial</h1>
                    </div>
                </div>
                <div className="p-2">
                    <Link to="/listar-cliente" className="m-1 btn btn-outline-primary btn-sm">Clientes</Link>
                    <a href="/listar-servico"
                        className="m-1 btn btn-outline-primary btn-sm">Serviços</a>
                    <a href="/listar-produto"
                        className="m-1 btn btn-outline-primary btn-sm">Produtos</a>
                    <a href="/listar-pedidos"
                        className="m-1 btn btn-outline-primary btn-sm">Pedidos</a>
                    <a href="/listar-compra"
                        className="m-1 btn btn-outline-primary btn-sm">Compras</a>
                </div>
            </Container>
        </div>
    );
};