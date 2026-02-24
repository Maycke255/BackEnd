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

function deleteNote () {
    rl.question('Qual nome do arquivo qual deseja excluir?\n', (answer) => {
        const archiveName = getNotePath(answer.trim());

        if (!fs.existsSync(archiveName)) {
            console.log('Arquivo com nome digitado incorretamente ou inexixstente.\n');
            //Chamar a função showMenu para voltar ao menu
            return deleteNote();
        } else {
            rl.question(`Deseja realmente excluir o arquivo ${archiveName}.txt? (s/n)\n`, (answer) => {
                const response = answer.toLowerCase().trim();

                switch (response) {
                    case 's':
                        console.log(`Arquivo ${archiveName} excluido com sucesso.\n`);
                        fs.unlinkSync(archiveName);
                        rl.close();
                        break;
                    case 'n':
                        console.log('Você escolheu "n", voltando ao inicio...\n');
                        showMenu()
                        break;
                    default:
                        console.log('Oção invalida, por favor digite "s" ou "n"\n');
                        return deleteNote();
                }
            })
        }
    })
}

function exitApp() {
    console.log('Fechando menu...\n');
    rl.close();
    process.exit(0);
}

function closeMenu () {
    rl.question('Deseja realmente fechar o menu? (s/n)\n', (answer) => {
        const response = answer.toLowerCase().trim();

        switch (response) {
            case 's':
                exitApp();
                break;
            case 'n':
                console.log('Você escolheu "n", voltando ao inicio...\n');
                showMenu();
                break;
            default:
                console.log('Oção invalida, por favor digite "s" ou "n"\n');
                closeMenu();
                break;
        }
    })
}

function showMenu () {
    rl.question('Bem-vindo, selecione uma das opções para prosseguir com base no númro a sua frente:\n'+
                '1. Criar anotação.\n'+
                '2. Ler anotação.\n' +
                '3. Listar arquivos de anotações na pasta notes.\n' +
                '4. Deletar um arquivo salvo.\n' +
                '5. Fechar menu.\n', 
        (answer) => {
            const option = parseFloat(answer.trim());

            switch (option) {
                case 1:
                    createNote();
                    break;

                case 2:
                    readNote();
                    break;

                case 3:
                    listSavedFiles();
                    break;

                case 4:
                    deleteNote();
                    break;

                case 5:
                    closeMenu();
                    break;
                default:
                    console.log('Opção invalida, escolha algum número dentre 1 a 5 do menu para acessar uma opção\n');
                    showMenu();
                    break;
        }
    })
}

ensureFolder();
// createNote();
// readNote();
// listSavedFiles()
// deleteNote();
showMenu();