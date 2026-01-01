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

/* ----------- NOTA ------------
A partir do Node.js 10, a API fs ganhou uma versão baseada em Promise através de fs.promises. Isso significa que, em vez de usar callbacks ou os métodos síncronos
 (que terminam com Sync), podemos usar async/await para lidar com operações de arquivo de forma mais moderna e não bloqueante.
*/

import { promises as fs } from 'fs';

//===== Função criar arquivo =====

export async function createFile (text) {
    try {
        await fs.writeFile('./meuarquivo.txt', text, 'utf-8');
        console.log('Arquivo criado com sucesso!');
    } catch (error) {
        console.log(`Erro ao criar arquivo: ${error}`);
    }
}

export async function updateFile (text) {
    try {
        await fs.writeFile('./meuarquivo.txt', text, 'utf-8');
        console.log('Arquivo alterado com sucesso.')
    } catch (error) {
        console.log(`Erro ao editar o arquivo: ${error}`);
    }
}

export async function showFile () {
    try {
        const data = await fs.readFile('./meuarquivo.txt');
        console.log(`Conteudo do arquivo: ${data.toString()}`);
    } catch (err) {
        console.log('Erro ao ler o arquivo:', err);
    }
}

export async function deleteFile () {
    try {
        await fs.unlink('./meuarquivo.txt');
        console.log('Arquivo deletado com sucesso.');
    } catch (err) {
        console.log('Erro ao deletar arquivo:', err);
    }
}

export async function main () {
    console.log('Iniciando operações...');

    try {
        await createFile('Hello World!');
        await showFile();
        await updateFile('Maycke Alexandre Araujo Dias');
        await showFile();
        // await deleteFile();

        console.log('Todas as operações lançadas com sucesso.');
    } catch (error) {
        console.log(`Alguma operação falhou: ${error}`);
    }
}