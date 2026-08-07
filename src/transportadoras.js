const { store } = require('./store.js');

function listar({ incluir_inativas = false } = {}) {
  return incluir_inativas ? store.transportadoras : store.transportadoras.filter((t) => t.ativa);
}

function buscar(id) {
  return store.transportadoras.find((t) => t.id === Number(id)) || null;
}

module.exports = { listar, buscar };
