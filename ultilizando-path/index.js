const path = require('node:path');

/*  Métodos comuns: */
/* O join e um método que junta todos os caminhos em um unico diretorio, exemplo:

const fullpath = path.join("src", "db", "database.js");
saída no console: /src/db/database.js */
const src = "src";
const index = "index.html";
const pdf = "arquivo.pdf"

//Usando o __dirname, ele ira mostrar somente o caminho ate a pasta
const fullPathDir = path.join(__dirname, src, index, pdf);

//Usando o filName, nesse caso o fileName ira exibir as pastas e os arquivos que nela contem
const fullPathFile = path.join(__filename, src, index, pdf);

//O resolve e o méto mais comum e usado, ele serve para resolver e simplificar os caminhos, a diferença entre o join e ele são quase minima, porem
//ele sempre devolve um resultado de um caminho absoluto ate chegar em um lugar, ele sempre vai devolver a pasta raiz inteira ate chegar na atual
const resolveFile = path.resolve(__filename, src, index, pdf);

//O basename vai sempre mostrar o arquivo base dentro daquela pasta, ou seja o ultimo arquivo presente na pasta
const base = path.basename(fullPathDir);

//O extname serve para descobrir qual a extensão do ultimo arquivo presente na pasta
const ext = path.extname(fullPathDir);

console.log('base:', base);
console.log('-------------------');
console.log('ext:', ext);
console.log('-------------------');
console.log('resolve:', resolveFile);
console.log('-------------------');
console.log('dirname:', fullPathDir);
console.log('-------------------');
console.log('filename:', fullPathFile);

/*DIFERENÇAS ENTRE JOIN E RESOLVE --->S
Caracteristicas  -> path.join()                                                     path.resolve()
Objetivo         -> Juntar pedaços de caminhos.                                     Resolver um caminho absoluto.
Caminho Absoluto -> Retorna absoluto apenas se um dos argumentos for absoluto.      Sempre retorna um caminho absoluto.
Diretório Atual  -> Ignora o diretório onde o script roda.                          Usa o diretório atual como base se necessário.
Comportamento    -> Concatenação simples e limpeza.                                 Simula navegação de terminal (cd). */