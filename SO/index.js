const os = require('os');

const win = os.platform();
const arch = os.arch();
const cpus = os.cpus();
const winVersion = os.version();
const memory = os.totalmem();

console.log('Plataforma do sistema:', win);
console.log('Arquitetura do sistema:', arch);
console.log('Processador:', cpus[0]);
console.log('Quantidade de nucleos:', cpus.length);
console.log('Memoria atual:', memory / 1024 / 1024 / 1024, 'GB');
console.log(winVersion);