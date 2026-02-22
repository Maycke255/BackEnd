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
function getNotePath(nome) {
    return path.join(NOTES_DIR, `${nome}.txt`);
}

//Função para verificar se a pasta existe, caso não criar:
function ensureFolder () {
    if (fs.existsSync(NOTES_DIR)) {
        console.log(`A pasta ${NOTES_DIR} existe!`);
    } else {
        fs.mkdirSync(NOTES_DIR, { recursive: true });
        console.log('Pasta criada com sucesso!');
    }
}

function createNote () {
    rl.question("Qual será o nome do arquivo?\n", (answer) => {
        if (!fs.existsSync(getNotePath(answer))) {
            console.log('O arquivo não existe, criando arquivo...');
            console.log(`Arquivo com nome: ${answer} criado com sucesso!\n`);

            rl.question(`Qual será o conteúdo presente do arquivo ${answer}?\n`, (data) => {
                console.log('Conteúdo adicionado ao arquivo...');

                fs.writeFileSync(`./notes/${answer}.txt`, data, 'utf-8');

                rl.close();
                //Chamar a função showMenu para voltar ao menu
            });
        } else {
            console.log(`Arquivo com nome ${answer} já existe.`);
            return createNote();
        }
    });
}

function readNote () {
    rl.question('Qual nome do arquivo que deseja ler?\n', (answer) => {
        const archiveName = answer.trim();

        if (!fs.existsSync(getNotePath(archiveName))) {
            console.log('Arquivo com nome digitado incorretamente ou inexixstente.');
            //Chamar a função showMenu para voltar ao menu
            return readNote();
        } else {
            const data = fs.readFileSync(getNotePath(archiveName));
            console.log(`Conteudo do arquivo: ${data.toString()}`);
            rl.close();
        }
    })
}

function listSavedFiles () {
    console.log('Anotações salvas:\n');
    fs.readdirSync(NOTES_DIR, 'utf-8').forEach((archive, index) => {
        const nameWithoutExt  = path.parse(archive).name;
        console.log(`${index + 1}: ${nameWithoutExt}\n`);
    })
    rl.close();
}

ensureFolder();
// createNote();
// readNote();
listSavedFiles()