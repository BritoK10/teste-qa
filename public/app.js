let pagina = 1;
const LIMITE = 10;

let transportadoras = [];

async function carregarTransportadoras() {
  const resposta = await fetch('/api/transportadoras');
  transportadoras = await resposta.json();

  const select = document.querySelector('#select-transportadora');
  select.innerHTML = transportadoras
    .map((t) => `<option value="${t.id}">${t.nome_fantasia}</option>`)
    .join('');
}

function transportadoraDe(id) {
  return transportadoras.find((t) => t.id === id);
}

async function carregar() {
  const params = new URLSearchParams({ page: pagina, limit: LIMITE });
  const busca = document.querySelector('#busca').value.trim();
  const status = document.querySelector('#filtro-status').value;
  if (busca) params.set('q', busca);
  if (status) params.set('status', status);
  if (document.querySelector('#incluir-canceladas').checked) params.set('incluir_canceladas', 'true');

  const resposta = await fetch(`/api/entregas?${params}`);
  const dados = await resposta.json();

  document.querySelector('#contador').textContent = `${dados.total} entregas`;
  document.querySelector('#pagina').textContent = `Página ${pagina}`;
  renderizarTabela(dados.itens);
}

function renderizarTabela(itens) {
  const corpo = document.querySelector('#tabela');

  if (itens.length === 0) {
    corpo.innerHTML = '<tr><td colspan="6" class="vazio">Nenhuma entrega encontrada.</td></tr>';
    return;
  }

  corpo.innerHTML = itens.map((e) => {
    const transportadora = transportadoraDe(e.id_transportadora);
    const nome = transportadora ? transportadora.nome_fantasia : '—';
    const cnpj = transportadora ? transportadora.cnpj : '—';
    return `
      <tr data-id="${e.id}">
        <td>${e.codigo}</td>
        <td>${e.destinatario_nome}</td>
        <td>${e.cidade}/${e.uf}</td>
        <td>${nome}<br><small class="cnpj">${cnpj}</small></td>
        <td><span class="badge badge-${e.status}">${e.status}</span></td>
        <td>${e.data_prazo}</td>
      </tr>`;
  }).join('');

  corpo.querySelectorAll('tr[data-id]').forEach((linha) => {
    linha.addEventListener('click', () => abrirDetalhe(linha.dataset.id));
  });
}

async function abrirDetalhe(id) {
  const resposta = await fetch(`/api/entregas/${id}`);
  const entrega = await resposta.json();
  const painel = document.querySelector('#detalhe');

  if (!entrega || !entrega.id) {
    painel.innerHTML = '<p class="vazio">Entrega não localizada.</p>';
    return;
  }

  const historico = (entrega.historico || [])
    .map((h) => `<li><strong>${h.status}</strong> — ${h.data} — ${h.descricao || ''}</li>`)
    .join('');

  const opcoes = ['CRIADA', 'COLETADA', 'EM_TRANSITO', 'SAIU_ENTREGA', 'ENTREGUE', 'DEVOLVIDA', 'CANCELADA']
    .map((s) => `<option value="${s}"${s === entrega.status ? ' selected' : ''}>${s}</option>`)
    .join('');

  painel.innerHTML = `
    <h3>${entrega.codigo}</h3>
    <p>${entrega.destinatario_nome} — ${entrega.cidade}/${entrega.uf}</p>
    <p>Peso: ${entrega.peso_kg} kg · Volumes: ${entrega.volumes}</p>
    <p>Coleta: ${entrega.data_coleta} · Prazo: ${entrega.data_prazo}</p>
    <label>Alterar status
      <select id="novo-status">${opcoes}</select>
    </label>
    <p id="mensagem-status" class="mensagem"></p>
    <h4>Histórico</h4>
    <ul class="historico">${historico}</ul>`;

  painel.querySelector('#novo-status').addEventListener('change', async (evento) => {
    const resultado = await fetch(`/api/entregas/${entrega.id}/status`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: evento.target.value, descricao: 'Atualizado pela tela' }),
    });
    const corpo = await resultado.json();

    if (resultado.status !== 200) {
      painel.querySelector('#mensagem-status').textContent = corpo.erro || 'Não foi possível alterar o status.';
      return;
    }

    await carregar();
    await abrirDetalhe(entrega.id);
  });
}

async function enviarFormulario(evento) {
  evento.preventDefault();
  const mensagem = document.querySelector('#mensagem-form');
  const dados = Object.fromEntries(new FormData(evento.target).entries());

  const resposta = await fetch('/api/entregas', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(dados),
  });
  const corpo = await resposta.json();

  if (resposta.status !== 201) {
    mensagem.className = 'mensagem erro';
    mensagem.textContent = corpo.erro || 'Não foi possível cadastrar a entrega.';
    return;
  }

  mensagem.className = 'mensagem sucesso';
  mensagem.textContent = `Entrega ${corpo.codigo} cadastrada.`;
  evento.target.reset();
  pagina = 1;
  await carregar();
}

function ligarEventos() {
  document.querySelector('#busca').addEventListener('input', () => { pagina = 1; carregar(); });
  document.querySelector('#filtro-status').addEventListener('change', () => { pagina = 1; carregar(); });
  document.querySelector('#incluir-canceladas').addEventListener('change', () => { pagina = 1; carregar(); });
  document.querySelector('#anterior').addEventListener('click', () => {
    if (pagina > 1) { pagina -= 1; carregar(); }
  });
  document.querySelector('#proxima').addEventListener('click', () => { pagina += 1; carregar(); });
  document.querySelector('#form-entrega').addEventListener('submit', enviarFormulario);
  document.querySelector('#resetar').addEventListener('click', async () => {
    await fetch('/_reset', { method: 'POST' });
    pagina = 1;
    document.querySelector('#detalhe').innerHTML = '<p class="vazio">Selecione uma entrega na tabela.</p>';
    await carregar();
  });
}

async function iniciar() {
  ligarEventos();
  await carregarTransportadoras();
  await carregar();
}

iniciar();
