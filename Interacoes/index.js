/* A forma mais comum de criar interaões de saída e entrada no terminal e usando o srdin e srdout, e usando
a variavel global process, usamos ele para representar as streams de dados, exemplo: */
const ps = require('node:process');

/* Nesse exemplo usamos o process como stream de leitura e escrita de dados, aqui acessamos a variavel usando o método de entrada de dados
stdin e usamos o parametro data, data seria os dados que o método esta esperando, e buff e o callBack, no caso o que iriamos fazer com esses
dados */
// ps.stdin.on('data', (buff) => {
//     ps.stdout.write(`Você digitou:\n ${buff}`);
//     ps.exit(0);
// })

/* Mas existe uma forma mais facil de criar esse contexto de leitura e escrita, ou pergunta/resposta, com ele podemos criar uma interface que 
possui input e output, e então usá-las para diversas funcionalidades:Obs.: repare que precisamos conectar a stdin e a stdout na hora da 
criação da interface “readline”, mas poderíamos usar outras ReadableStream e WriteableStream.*/

/* Característica   process                     readline
   Complexidade     Baixa - streams brutas      Alta - interface completa
   Leitura          Byte-a-byte ou chunks       Linha completa
   Recursos         Básicos                     Histórico, autocomplete, etc.
   Uso comum        Scripts simples, pipes      CLIs interativas, prompts
   Performance      Muito rápida                Um pouco mais lento */
const readLine = require('node:readline');
const rl = readLine.createInterface({ input: process.stdin, output: process.stdout });

rl.on('line', (input) => {
    console.log(`Você digitou:\n ${input}`);
    rl.close();
});

// Um método muito útil disponível na interface “readline” é o de fazer uma pergunta, o método question():
rl.question("Qual é o seu nome? ", (answer) => {
  console.log(`Olá, ${answer}!\n`);
  rl.close();
});

//Por fim, podemos customizar o comportamento de saída dos nossos programas no terminal através do evento
rl.on("close", () => {
  console.log("Saindo...");
  // repare que ao adicionar um listener para "close" precisaremos
	// encerrar o processo atual manualmente ou ele ficará "pendurado"
	process.exit(0);
})

//E ainda é possível usar outros eventos para criar interações mais avançadas, como o “SIGINT”, o famoso “Ctrl + C”, que interrompe a execução:
rl.on('SIGINT', () => {
  rl.question('Deseja realmente sair? (s/n) ', (resposta) => {
    if (resposta.trim().toLowerCase() === 's') {
        console.log("Saindo...");
        rl.close();
    } else {
        console.log("Você escolheu continuar.");
    }
  });
});