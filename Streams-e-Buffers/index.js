/* O que são Streams?
Buffers nada mais são que uma forma mais eficiente de guardar e processar informações grande quantidade de volumes de dados binarios,
- Armazena dados em formato binário (bytes)
- Tamanho fixo - alocado uma vez e não muda
- Usado quando precisamos manipular dados antes de processá-los
- Exemplo comum: ler um arquivo inteiro na memória antes de processar
Uma grande caracteristica dos buffers, são que eles ficam alocados na mémoria ram doo pc, exemplo:
 */

const buffer = Buffer.alloc(1024, 'Hello World! Yay', 'utf-8'); //Nesse exemplo estamos alocando 1024 KB de memoria para esse buffer
// console.log(buffer);

/*  O que são Streams?
 - Streams são fluxos de dados que podem ser lidos ou escritos de forma contínua, processando informações em pedaços (chunks) em vez
 de carregar tudo na memória de uma vez.

Tipos de streams no Node.js:

Readable Streams - para leitura de dados
Exemplo: ler um arquivo, receber dados de uma requisição HTTP

Writable Streams - para escrita de dados
Exemplo: escrever em um arquivo, enviar resposta HTTP

Duplex Streams - podem ler e escrever
Exemplo: sockets TCP

Transform Streams - modificam dados enquanto fluem
Exemplo: compressão (zlib), criptografia

Como funcionam juntos?Buffers são os contenedores de dados, enquanto streams são os canais por onde esses dados fluem.
 */
//Exemplo pratico:
const fs = require('node:fs'); //Usando o fs

const streamDeLeitura = fs.createReadStream('test.txt'); //Criando uma stream de leitura desse arquivo

const bufferContainer = []; //Esse sera o nosso buffer de exemplo, onde iremos guarda-lo

//Aqui criamos como se fosse um evento de click para um botão, porem nesse caso e um evento de acionamento da stream, on e para ligar, e data
//são os dados que a stream esta recebendo, como se no caso "ligue o servidor, pois ele esta recebendo dados"...já o chunk são os espaços
//da mémoria, eles são unidades de dados que fluem atravez do chunk, eles são a representativadade de dados grandes divididos em pedaços
//menores, em vez de carregar tudo de uma vez, exemplo visual:
/* 
Arquivo de 10MB
↓ Dividido em chunks de 64KB
[64KB] → [64KB] → [64KB] → ... (156 chunks no total)
Cada seta representa um chunk fluindo */
streamDeLeitura.on('data', (chunk) => {
    bufferContainer.push(chunk); //Enviando os chunks, no caso os pedaços de dados para o buffer
    console.log('Um chunk foi processado!');
});

//Usando o método end encerramos a stream
streamDeLeitura.on('end', () => {
    console.log('Buffer:\n', bufferContainer); //Exibindo o buffer já com os dados
    const dadosCompletos = Buffer.concat(bufferContainer).toString(); //Convertando os dados binarios em string
    console.log('Dados lidos:\n', dadosCompletos); //Em seguida lemos o arquivo
})