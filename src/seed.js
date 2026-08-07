function seedTransportadoras() {
  return [
    { id: 1, cnpj: '12345678000195', nome_fantasia: 'Trans Sul Logística', prazo_dias: 3, ativa: true },
    { id: 2, cnpj: '98765432000110', nome_fantasia: 'Rodo Expresso', prazo_dias: 5, ativa: true },
    { id: 3, cnpj: '45678912000133', nome_fantasia: 'Norte Cargas', prazo_dias: 7, ativa: true },
    { id: 4, cnpj: '32165498000177', nome_fantasia: 'Via Rápida Transportes', prazo_dias: 2, ativa: true },
    { id: 5, cnpj: '74185296000144', nome_fantasia: 'Logística Norte Ltda', prazo_dias: 4, ativa: false },
  ];
}

const CIDADES = [
  ['São Paulo', 'SP'], ['Rio de Janeiro', 'RJ'], ['Belo Horizonte', 'MG'],
  ['Curitiba', 'PR'], ['Porto Alegre', 'RS'], ['Salvador', 'BA'],
  ['São José dos Campos', 'SP'], ['Florianópolis', 'SC'],
];

const STATUS_CICLO = ['CRIADA', 'COLETADA', 'EM_TRANSITO', 'SAIU_ENTREGA', 'ENTREGUE', 'CANCELADA'];

function seedEntregas() {
  const entregas = [];
  for (let i = 1; i <= 42; i++) {
    const [cidade, uf] = CIDADES[i % CIDADES.length];
    const status = i % 13 === 0 ? 'CANCELADA' : STATUS_CICLO[i % 5];
    const dia = String((i % 28) + 1).padStart(2, '0');
    const dataColeta = `2026-06-${dia}`;
    entregas.push({
      id: i,
      codigo: `BRD-2026-${String(i).padStart(5, '0')}`,
      id_transportadora: (i % 4) + 1,
      destinatario_nome: `Cliente ${i}`,
      cidade, uf, status,
      peso_kg: Number((i * 1.7).toFixed(2)),
      volumes: (i % 4) + 1,
      data_coleta: dataColeta,
      data_prazo: `2026-07-${dia}`,
      historico: [{ status: 'CRIADA', data: dataColeta, descricao: 'Entrega registrada' }],
    });
  }
  return entregas;
}

module.exports = { seedTransportadoras, seedEntregas };
