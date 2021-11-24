'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ItemPedido extends Model {




    
    static associate(models){
      //define association here
      ItemPedido.belongsTo(models.Pedido, {foreignKey: 'PedidoId', as: 'pedido'});
      ItemPedido.belongsTo(models.Servico, {foreignKey: 'ServicoId', as: 'servico'});
    }
  };
  ItemPedido.init({
    quantidade: DataTypes.INTEGER,
    valor: DataTypes.FLOAT
  }, {
    sequelize,
    modelName: 'ItemPedido',
  });
  return ItemPedido;
};  