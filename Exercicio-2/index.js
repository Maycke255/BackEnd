/* ​Crie um monitor de sistema que deverá exibir detalhes do computador e seus componentes a cada 1 segundo. Além disso, 
os detalhes exibidos serão registrados em um arquivo de log chamado "log.txt", localizado na pasta "log" na raiz do sistema de arquivos. 
Este exercício deve ser feito usando apenas os módulos nativos do Node.js.

Requisitos**:**

Crie uma função que:
A cada 1 segundo, exiba detalhes do computador, incluindo:
Nome do sistema operacional.
Arquitetura do sistema.
Modelo do processador.
Tempo de atividade do sistema.
Uso de memória (%).
Crie uma outra função que:
A cada 1 segundo, registre os detalhes exibidos no arquivo "log.txt" localizado na pasta "log" na raiz do sistema de arquivos.
Cada registro deve ser acrescentado ao arquivo, separado por uma linha em branco.
Crie a pasta "log" na raiz do sistema de arquivos se ela não existir. */

//Importação do modulo os 
const os = require('node:os');
//Importação do modulo fs para manipulação dos arquivos
const fs = require('node:fs');
//Importando modulo path para trabalhar com os caminhos
const path = require('node:path');

//======================================================================

//Formatação dos dados:
function getSystemData () {
    //Exibir o nome do sistema operacional:
    const nameSystem = os.type();
    //Arquitetura do sistema:
    const archSystem = os.arch();
    //Modelo do processador:
    const CPUModel = os.cpus();

    //======================================================================

    //Tempo de atividade do sistema:
    const timeSystem = os.uptime();
    //O método retorna em segundos vamos fatorar para exibir em horas:
    const timeInHours = Math.floor(timeSystem / 3600); //-> 1 hora e igual a 3600 segundos
    //Método para exibir os minutos:
    const timeInMinutes = Math.floor((timeSystem % 3600) / 60); //-> O resto da divisão por 3600 são os segundos restantes; divida por 60 para obter os minutos.

    //======================================================================

    //Memoria total do pc:
    const timeMemory = os.totalmem();
    //Memoria emn GB:
    const timeMemoryGB = timeMemory /1024 / 1024 /1024;
    //Memoria disponivel no sistema:
    const availableMemory = os.freemem();
    //Calculo para mostrar a porcentagem da mémoria:
    const calcMemory = ((timeMemory - availableMemory) / timeMemory) * 100;


    let data = [`Nome do sistema operacional: ${nameSystem}`, 
        `Arquitetura do sistema operacional: ${archSystem}.`, 
        `Tempo de atividade do sistema em horas e minutos: ${timeInHours}h:${timeInMinutes}m.`, 
        `Modelo do processador: ${CPUModel[0].model}`, 
        `Memoria total: ${timeMemoryGB.toFixed(2)}GB.`, 
        `Memoria em porcentagem: ${calcMemory.toFixed(2)}%.`
    ];

    return data.join('\n') + '\n\n';
}

//======================================================================

//Exibir detalhes no console:
function showDetails (data) {
    console.log(data);
}

//======================================================================

//Gravar dados no arquivo:
function saveData (data) {
    //Variavel para localização da pasta:
    const logDir = path.join(__dirname, '.', 'log');
    const fileDir = path.join(logDir, 'log.txt');

    if (fs.existsSync(logDir)) {
        //Adicionando conteudo caso não exista:
        if (!fs.existsSync(fileDir)) {
            console.log('O arquivo não existe, criando log.txt');

            //Criando arquivo
            return fs.writeFileSync('./log/log.txt', data, 'utf-8');
        } else {
            console.log('O arquivo existe! Criando pasta e dicionando arquivos...');
            fs.appendFileSync('./log/log.txt', data, 'utf-8');
        }
    } else {
        try {
            //Criando a pasta:
            console.log('A pasta não existe! Criando pasta...');
            fs.mkdirSync(logDir);

            if (!fileDir) {
                console.log('O arquivo não existe, criando log.txt');

                //Criando arquivo
                return fs.writeFileSync('./log/log.txt', data, 'utf-8');
            }

            // Arquivo já existe, adicionando novo conteudo:
            fs.appendFileSync('./log/log.txt', data, 'utf8');

        } catch (error) {
            console.log('Erro ao criar pasta e adicionar arquivos:', error);
        }
    }
}


setInterval(() => {
    console.clear();
    const curretData = getSystemData();

    saveData(curretData);
    showDetails(curretData);
}, 1000);