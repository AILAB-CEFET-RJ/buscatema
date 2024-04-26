# BuscaTema
Ferramenta para busca de temas associados a um recurso especial

## Contextualização
Extremamente relevantes para garantir o justo curso do processo legal e o direito à ampla defesa, os recursos são utilizados para contestar decisões judiciais. No contexto jurídico brasileiro, recursos especiais são uma categoria à parte desses mecânismos expressa na Constituição Federal vigente e regulamentada pelo Código de Processo Civil de 2015. São de competência do Superior Tribunal de Justiça (STJ), cuja função é tornar uniforme a interpretação da lei federal.

Emitir um recurso especial requer que a decisão contestada tenha passado, anteriormente, por todas as instâncias ordinárias, isto é, seja emitida por um tribunal de segunda instância. O tribunal de origem deve verificar – antes de encaminhar ao STJ – se o recurso é válido e atende aos requisitos; para isso, deve consultar os "temas", que representam decisões já estabelecidas pelo STJ.

Os temas são importantes consolidações da jurisprudência; as interpretações estabelecidas que representam facilitam o entendimento das leis e servem de referência para futuras decisões de todos os tribunais do país.

## Como funciona?
O analista judiciário anexa uma lista de temas e um arquivo do caso; o BuscaTema, então, retorna alguns desses temas juntamente com a probabilidade de cada um descrever a situação do caso. Para o profissional, a ferramenta representa agilidade através da automação; uma grande quantidade de tempo que seria despendida nessa tarefa pode ser direcionada a tarefas mais importantes. O recurso não anula a necessidade de avaliação humana, mas agiliza e direciona o profissional.

![Diagrama de Casos de Uso da Aplicação](docs/use_case_diagram.jpg)

Em versões futuras, a ferramenta permitirá o acompanhamento do processo de análise por parte do analista.

## Como o sistema está organizado?
Dois servidores são utilizados: o primeiro gerencia os pedidos para análise e o segundo é de fato o responsável pelo processamento computacional.

![Diagrama de Atividades](docs/activity_diagram.png)

## Tecnologias Envolvidas
A aplicação consiste em duas partes: uma Single-Page Application \(SPA\) escrita em [React](https://react.dev/), um framework [javascript](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript), e um servidor intermediário, em [Flask](https://flask.palletsprojects.com/en/3.0.x/), uma biblioteca [python](https://www.python.org/). O processamento referente a casos judiciais acontece em um terceiro módulo, que ainda não faz parte desse repositório.

No momento, o servidor intermediário armazena os arquivos enviados pelo usuário e envia uma resposta _hard-coded_. A aplicação que de fato processa os documentos está sendo refinada e a integração está prevista para acontecer em breve. A ideia, no entanto, é manter as interfaces para que não sejam necessárias modificações adicionais.

Devem ser utilizadas as versões mais recentes do Node.JS e Python que tenham suporte ativo.

## Instalação e Execução da Interface (para o Manual de Desenvolvedor)

O desenvolvedor deverá seguir as etapas abaixo para executar o front-end em sua máquina. Os passos foram descritos considerando um sistema baseado em Unix 03:

1. Clonar e acessar este repositório:<br>
   `git clone https://github.com/MLRG-CEFET-RJ/buscatema`<br>
   `cd buscatema`

2. Instalar o [Node.js](https://nodejs.org/en) caso não o possua. **Recomenda-se a última versão LTS**

2. Acessar a pasta ui:<br>
   `cd ui`

3. Instalar os módulos necessários:<br>
   `npm i`

4. Inicializar a interface:<br>
   `npm start`

É importante que o back-end esteja em execução na porta 5000 para que a resposta da requisição seja corretamente recebida. 

## Instalação e Execução do Back-end (para o Manual de Desenvolvedor)

O desenvolvedor deverá seguir as etapas abaixo para executar o back-end em sua máquina. Os passos foram descritos considerando um sistema baseado em Unix 03:

1. Instalar o [python](https://www.python.org/) caso não possua

2. Acessar a pasta backend:<br>
   `cd backend`

3. Instalar os módulos necessários:<br>
   `pip install -r requirements.txt`

4. Inicializar o backend:<br>
   `py app.py`
