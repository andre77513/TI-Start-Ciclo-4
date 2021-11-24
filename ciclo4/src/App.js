import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Home } from './Views/Home';
import { ListarCliente } from './Views/Cliente/ListarCliente';
import { ListarServico } from './Views/Servico/ListarServico';
import { Menu } from './Components/Menu';
import { Item } from './Views/Servico/Item';
import { CadastrarServico } from './Views/Servico/CadastrarServico';
import { CadastrarCliente } from './Views/Cliente/CadastrarCliente';
import { PedidosCliente } from './Views/Cliente/PedidosCliente';
import { EditarPedido } from './Views/Pedido/EditarPedido';
import { InserirPedido } from './Views/Pedido/InserirPedido';
import { ListarPedido } from './Views/Pedido/ListarPedido';
import { InserirCompra } from './Views/Compra/InserirCompra';
import { ListarCompra } from './Views/Compra/ListarCompra';
import { CadastrarProduto } from './Views/Produto/CadastrarProduto';
import { ListarProduto } from './Views/Produto/ListarProduto';
import { EditarServico } from './Views/Servico/EditarServico';
import { EditarCompra } from './Views/Compra/EditarCompra';
import { EditarCliente } from './Views/Cliente/EditarCliente';
import { EditarProduto } from './Views/Produto/EditarProduto';
import { InserirItemCompra } from './Views/ItemCompra/InserirItemCompra';
import { ListarItemCompra } from './Views/ItemCompra/ListarItemCompra';
import { InserirItemPedido } from './Views/ItemPedido/InserirItemPedido';
import { ListarItemPedido } from './Views/ItemPedido/ListarItemPedido';
import { EditarItemPedido } from './Views/ItemPedido/EditarItemPedido';
import { EditarItemCompra } from './Views/ItemCompra/EditarItemCompra';

function App() {
  return (
    <div>
      <Router>
        <Menu />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/cadastrar-cliente" component={CadastrarCliente} />
          <Route path="/listar-cliente" component={ListarCliente} />
          <Route path="/editar-cliente/:id" component={EditarCliente} />
          <Route path="/pedidos-cliente/:id" component={PedidosCliente} />
          <Route path="/inserir-pedido" component={InserirPedido} />
          <Route path="/listar-pedidos" component={ListarPedido} />
          <Route path="/editar-pedido/:id" component={EditarPedido} />
          <Route path="/inserir-compra" component={InserirCompra} />
          <Route path="/listar-compra" component={ListarCompra} />
          <Route path="/editar-compra/:id" component={EditarCompra} />
          <Route path="/listar-item/:id" component={Item} />
          <Route path="/cadastrar-servico" component={CadastrarServico} />
          <Route path="/listar-servico" component={ListarServico} />
          <Route path="/editar-servico/:id" component={EditarServico} />
          <Route path="/cadastrar-produto" component={CadastrarProduto} />
          <Route path="/listar-produto" component={ListarProduto} />
          <Route path="/editar-produto/:id" component={EditarProduto} />
          <Route path="/inserir-itemcompra/" component={InserirItemCompra} />
          <Route path="/listar-itemcompra/" component={ListarItemCompra} />
          <Route path="/editar-itemcompra/:id" component={EditarItemCompra} />
          <Route path="/inserir-itempedido/" component={InserirItemPedido} />
          <Route path="/listar-itempedido/" component={ListarItemPedido} />
          <Route path="/editar-itempedido/:id" component={EditarItemPedido} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;