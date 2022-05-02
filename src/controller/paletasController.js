//  SCRIPT CONTROLLER

//const Paletas = require('../models/paletas.js');
const Paletas = require('../mocks/paletas.js');
let _paletas = Paletas.get();

var message = '';
var type = '';

function findPaleta(paletaId) {
  const chosenPaleta = _paletas.find((paleta) => {
    return paleta._id == paletaId;
  });
  return chosenPaleta;
}

var paletasController = {
  // retorna todas paletas cadastradas
  // --------------------------
  findAll: async function (req, res, next) {
    console.log(req.method + ' ' + req.url);

    try {
      //let paletas = await Paletas.find({});
      //let paletas = Paletas.get();

      setTimeout(() => {
        message = '';
      }, 5000);

      //res.send({ paletas: _paletas, message: message });
      res.send(_paletas);
    } catch (err) {
      console.log(`Erro! ${err}`);
      res.status(500).send('Não foi possível exibir os dados.');
    }
  },

  // retorna paleta por id
  // --------------------------
  find: async function (req, res, next) {
    console.log(req.method + ' ' + req.url);

    let paletaId = req.params.id;
    try {
      // localiza paleta no BD
      //let paleta = await Paletas.findOne({ _id: paletaId }).exec();
      let paleta = findPaleta(paletaId);

      if (!paleta) {
        paleta = {};
        paleta._id = paletaId;
        paleta.sabor = 'Não localizado';
        paleta.preco = 0;
        paleta.descrição = 'A paleta não foi localizada';
        paleta.foto = 'notfound-ice.png';
      }

      message = 'Paleta localizada com sucesso!';

      setTimeout(() => {
        message = '';
      }, 5000);

      //res.send({ paletas: [paleta], message: message });
      res.send(paleta);
    } catch (err) {
      message = `Erro! Não foi possível localizar a paleta.`;
      console.log('Erro ! ' + err.message);
      res.send({ message: message, err: true });
    }
  },

  // cria/cadastra uma paleta
  create: async function (req, res, next) {
    console.log(req.method + ' ' + req.url);

    let paleta = req.body;

    // trata campos
    if (!paleta.preco) {
      paleta.preco = 0;
    }

    if (!paleta.descricao) {
      paleta.descricao = `Sorvete sabor de ${paleta.sabor}`;
    }

    message = 'Parabéns! Paleta criada com sucesso.';

    try {
      // adiciona paleta
      Paletas.create(paleta)
        .then(() => {
          res.send({ message: message, err: false });
        })
        .catch((err) => {
          message = `Não foi possível adicionar a paleta!`;

          throw new Error(err.message);
        });
    } catch (err) {
      console.log('Erro ! ' + err.message);
      res.send({ message: message, err: true });
    }
  },

  // altera uma paleta
  update: async function (req, res, next) {
    console.log(req.method + ' ' + req.url);

    //console.log('req.body',  req.body );

    const paletaId = req.params.id;
    let _paleta = req.body;
    try {
      // localiza paleta no BD
      let paleta = await Paletas.findOne({ _id: paletaId }).exec();
      if (!paleta) {
        message = `A paleta ${_paleta.sabor} não foi localizada !`;
        res.send({ message: message, err: true });
        return;
      }

      // peleta localizada
      paleta.sabor = _paleta.sabor;
      paleta.descricao = _paleta.descricao;
      paleta.foto = _paleta.foto;
      paleta.preco = _paleta.preco;

      message = `Paleta alterada com sucesso!`;

      paleta
        .save()
        .then((result) => {
          res.send({ message: message, err: false });
        })
        .catch((err) => {
          message = `Não foi possível aletrar paleta.`;
          throw new Error(err.message);
        });
    } catch (err) {
      console.log('Erro ! ' + err.message);
      res.send({ message: message, err: true });
    }
  },

  // deleta uma paleta
  delete: async function (req, res, next) {
    console.log(req.method + ' ' + req.url);

    let paletaId = req.params.id;
    try {
      // localiza paleta no BD
      let paleta = await Paletas.findOne({ _id: paletaId }).exec();
      if (!paleta) {
        message = `A paleta id:${paletaId} não foi localizada !`;
        res.send({ message: message, err: true });
        return;
      }

      message = `Paleta deleteda com sucesso !`;

      let count = await paleta.deleteOne({ _id: paleta._id });
      if (count.countDocuments == 0) {
        message = `Não foi possível deletar a paleta.`;
        throw new Error(err.message);
      }
      res.send({ message: message, err: false });
    } catch (err) {
      console.log('Erro ! ' + err.message);
      res.send({ message: message, err: true });
    }
  },
};

module.exports = paletasController;
