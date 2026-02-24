/* ​Crie uma aplicação de linha de comando usando Node.js para criar e gerenciar anotações rápidas pelo terminal. A aplicação deve possuir um menu de diferentes opções, 
permitindo criar anotações, listar todas os arquivos salvos, ler uma anotação específica e excluir uma anotação específica. Todas as anotações devem ser salvas em 
formato .txt dentro de uma pasta “notes” junto com o próprio script principal. */

//Importação do modulo fs para manipulação dos arquivos
const fs = require('node:fs');
//Importando modulo path para trabalhar com os caminhos
const path = require('node:path');
//Importando rl e já definindo a interface de entrada e saída de dados
const readLine = require('node:readline');
const rl = readLine.createInterface({ input: process.stdin, output: process.stdout });

//Encontrando caminho atual da pasta onde ficarão as anotaçõe:
const NOTES_DIR = path.join(__dirname, 'notes');

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
            const response = answer.trim();

            if (!response) {
                console.log('Nome inválido.\n');
                return createNote();
            }

            console.log('O arquivo não existe, criando arquivo...\n');
            console.log(`Arquivo com nome: ${response} criado com sucesso!\n`);

            rl.question(`Qual será o conteúdo presente do arquivo ${answer}?\n`, (data) => {
                console.log('Conteúdo adicionado ao arquivo...\n');

                fs.writeFileSync(getNotePath(response), data, 'utf-8');

                console.log(`Dados adicionado com sucesso ao arquivo ${response}.\n`);
                return showMenu();
            });
        } else {
            console.log(`Arquivo com nome ${answer} já existe.\n`);
            return createNote();
        }
    });
}

function readNote () {
    rl.question('Qual nome do arquivo que deseja ler?\n', (answer) => {
        const archiveName = answer.trim();

        if (!fs.existsSync(getNotePath(archiveName))) {
            console.log('Arquivo com nome digitado incorretamente ou inexixstente.\n');
            return readNote();
        } else {
            const data = fs.readFileSync(getNotePath(archiveName));
            console.log(`Conteudo do arquivo: ${data.toString()}\n\n`);
            return showMenu();
        }
    })
}

function listSavedFiles () {
    ensureFolder();

    const files = fs.readdirSync(NOTES_DIR).filter((f) => f.endsWith('.txt')).sort();

    if (files.length === 0) {
        console.log('Nenhuma anotação salva.\n');
        return showMenu();
    }

    console.log('Anotações salvas:\n');
    files.forEach((archive, index) => {
        const nameWithoutExt  = path.parse(archive).name;
        console.log(`${index + 1}: ${nameWithoutExt}\n`);
    })
    return showMenu();
}

function deleteNote() {
    rl.question("Qual nome do arquivo que deseja excluir?\n", (answer) => {
        const name = answer.trim();
        const filePath = getNotePath(name);

        if (!fs.existsSync(filePath)) {
            console.log("Arquivo com nome digitado incorretamente ou inexistente.\n");
            return deleteNote();
        }

        rl.question(
            `Deseja realmente excluir o arquivo "${name}.txt"? (s/n)\n`,
            (ans) => {
                const response = ans.toLowerCase().trim();

                switch (response) {
                    case "s":
                        fs.unlinkSync(filePath);
                        console.log(`Arquivo "${name}.txt" excluído com sucesso.\n`);
                        showMenu();
                    break;
                    case "n":
                        console.log('Você escolheu "n", voltando ao início...\n');
                        showMenu();
                    break;
                    default:
                        console.log('Opção inválida, por favor digite "s" ou "n"\n');
                        deleteNote();
                    break;
                }
            },
        );
    });
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