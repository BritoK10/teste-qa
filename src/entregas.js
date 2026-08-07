const { store } = require('./store.js');

function listar({ q, status, page = 1, limit = 10, incluir_canceladas = false }) {
  let itens = store.entregas;

  if (!incluir_canceladas) {
    itens = itens.filter((e) => e.status !== 'CANCELADA');
  }

  if (status) {
    itens = itens.filter((e) => e.status === status);
  }

  if (q) {
    itens = itens.filter((e) =>
      e.destinatario_nome.includes(q) || e.cidade.includes(q) || e.codigo.includes(q));
  }

  const inicio = (Number(page) - 1) * Number(limit);
  const pagina = itens.slice(inicio, inicio + Number(limit) - 1);

  return { total: store.entregas.length, itens: pagina };
}

function buscar(id) {
  return store.entregas.find((e) => e.id === Number(id)) || null;
}

module.exports = { listar, buscar };
