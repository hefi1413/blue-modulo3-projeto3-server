//  SCRIPT DEFINIÇÃO DB

const mongoose = require('mongoose');

//  DEFINIE CONEXÃO  COM BANCO DE DADOS
mongoose
  .connect(process.env.DB_HOST)
  .then(() => console.log('MongoDB Atlas Conectado!'))
  .catch((error) => console.log(`Erro ao conectar com o MongoDB, erro: ${error}`));
mongoose.Promisse = global.Promisse;

module.exports = mongoose;
