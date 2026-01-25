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

//Impprtação do modulo os 
const os = require('node:os');
//Importação do modulo fs para manipulação dos arquivos
const fs = require('node:fs');

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

console.log(`Nome do sistema operacional: ${nameSystem}\n`);
console.log(`Arquitetura do sistema operacional: ${archSystem}.\n`);
console.log(`Tempo de atividade do sistema em horas e minutos: ${timeInHours}h:${timeInMinutes}m.\n`);
console.log(`Modelo do processador: ${CPUModel[0].model}\n`);
console.log(`Memoria total: ${timeMemoryGB.toFixed(2)}GB.\n`);
console.log(`Memoria em porcentagem: ${calcMemory.toFixed(2)}%.\n`);