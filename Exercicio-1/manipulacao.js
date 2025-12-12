/* - ​Crie um arquivo JavaScript que exporte, usando a sintaxe de ESModules, as 4 funções abaixo:

- uma função que deve criar um arquivo de texto chamado "meuarquivo.txt" no diretório atual contendo o texto informado como argumento.

- uma função que deve reescrever o texto no arquivo "meuarquivo.txt" substituindo o conteúdo pelo texto informado no argumento.

 - uma função que deve ler o conteúdo do arquivo "meuarquivo.txt" e exibi-lo no console.

- uma função que deve excluir o arquivo "meuarquivo.txt" do sistema de arquivos.

- Depois de criar as funções você deve importá-las em um outro arquivo e executá-las para fins de teste de acordo com o exemplo abaixo:

createFile("Conteúdo inicial do arquivo.\nCriado com o módulo fs do Node.js.");showFile();
updateFile("Conteúdo modificado!");
showFile();
deleteFile(); */

//Para usar metodos do proprio node, podemos colocar um "node" na frente da chamada do arquivo na importação
const fs = require('node:fs');

//===== Função criar arquivo =====

function createFile (text) {
    try {
        fs.writeFileSync('./meuarquivo.txt', text, 'utf-8');
        console.log('Arquivo criado com sucesso!');
    } catch (error) {
        console.log(`Erro ao criar arquivo: ${error}`);
    }
}

createFile('Hello World!');