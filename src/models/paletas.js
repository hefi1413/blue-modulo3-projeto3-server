const mongoose = require('./database/db.js');

//
//  DEFINIE MODELO PALETAS
//
const paletas = new mongoose.Schema({
  titulo: {
    type: String,
    required: true,
  },
  sabor: {
    type: String,
    required: false,
  },
  descricao: {
    type: String,
    required: false,
  },
  preco: {
    type: Number,
    required: false,
  },
  foto: {
    type: String,
    required: true,
  },
  recheio: {
    type: String,
    required: true,
  },
  possuirecheio: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Paletas = mongoose.model('Paleta', paletas, 'paletas');

module.exports = Paletas;
