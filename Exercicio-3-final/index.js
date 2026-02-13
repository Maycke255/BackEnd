/* ​Crie uma aplicação de linha de comando usando Node.js para criar e gerenciar anotações rápidas pelo terminal. A aplicação deve possuir um menu de diferentes opções, 
permitindo criar anotações, listar todas os arquivos salvos, ler uma anotação específica e excluir uma anotação específica. Todas as anotações devem ser salvas em 
formato .txt dentro de uma pasta “notes” junto com o próprio script principal. */

//Importação do modulo os TALVEZ USE
const os = require('node:os');
//Importação do modulo fs para manipulação dos arquivos
const fs = require('node:fs');
//Importando modulo path para trabalhar com os caminhos
const path = require('node:path');
//Importando rl e já definindo a interface de entrada e saída de dados
const readLine = require('node:readline');
const rl = readLine.createInterface({ input: process.stdin, output: process.stdout });

//Encontrando caminho atual da pasta onde ficarão as anotaçõe:
const NOTES_DIR = path.join(__dirname, 'notes');
// console.log(NOTES_DIR);
//Exemplo de exibição de um arquivo:
path.join(NOTES_DIR, `${nome}.txt`);

//Função para verificar se a pasta existe, caso não criar:
export function ensureFolder () {
    if (fs.existsSync(NOTES_DIR)) {
        console.log(`A pasta ${NOTES_DIR} existe!`);
    } else {
        fs.mkdirSync(NOTES_DIR, { recursive: true });
    }
}

ensureFolder();