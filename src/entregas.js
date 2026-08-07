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

function calcularPrazo(dataColeta, prazoDias) {
  const data = new Date(`${dataColeta}T00:00:00Z`);
  data.setUTCDate(data.getUTCDate() + Number(prazoDias));
  return data.toISOString().slice(0, 10);
}

function gerarCodigo() {
  const sequencia = String(Math.floor(Date.now() / 1000)).slice(-5);
  return `BRD-2026-${sequencia}`;
}

function criar(dados) {
  const obrigatorios = ['id_transportadora', 'destinatario_nome', 'cidade', 'uf'];
  const faltando = obrigatorios.filter((campo) => dados[campo] === undefined || dados[campo] === '');
  if (faltando.length > 0) {
    return { status: 422, corpo: { erro: `Campos obrigatórios ausentes: ${faltando.join(', ')}` } };
  }

  const transportadora = store.transportadoras.find((t) => t.id === Number(dados.id_transportadora));
  if (!transportadora) {
    return { status: 404, corpo: { erro: 'Transportadora não encontrada' } };
  }
  if (!transportadora.ativa) {
    return { status: 422, corpo: { erro: 'Transportadora inativa' } };
  }

  const dataColeta = dados.data_coleta || new Date().toISOString().slice(0, 10);
  const entrega = {
    id: store.entregas.length + 1,
    codigo: gerarCodigo(),
    id_transportadora: Number(dados.id_transportadora),
    destinatario_nome: dados.destinatario_nome,
    cidade: dados.cidade,
    uf: dados.uf,
    status: 'CRIADA',
    peso_kg: Number(dados.peso_kg),
    volumes: Number(dados.volumes),
    data_coleta: dataColeta,
    data_prazo: calcularPrazo(dataColeta, transportadora.prazo_dias),
    historico: [{ status: 'CRIADA', data: dataColeta, descricao: 'Entrega registrada' }],
  };

  store.entregas.push(entrega);
  return { status: 201, corpo: entrega };
}

module.exports = { listar, buscar, criar, calcularPrazo };
