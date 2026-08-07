const { seedTransportadoras, seedEntregas } = require('./seed.js');

const store = {
  transportadoras: seedTransportadoras(),
  entregas: seedEntregas(),
};

function reset() {
  store.transportadoras = seedTransportadoras();
  store.entregas = seedEntregas();
}

module.exports = { store, reset };
