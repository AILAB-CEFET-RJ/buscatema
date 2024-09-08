# BuscaTema
Ferramenta para busca de temas associados a um recurso especial

# Conteúdos
[Contextualização](#contextualização)<br>
[Como funciona?](#como-funciona)<br>
[Como o sistema está organizado?](#como-o-sistema-está-organizado)<br>
[Tecnologias Envolvidas](#tecnologias-envolvidas)<br>
[Manual do Usuário](#manual-do-usuário)<br>
[Manual do Desenvolvedor (1/2) - Instalação e Execução da Interface](#instalação-e-execução-da-interface)<br>
[Manual do Desenvolvedor (2/2) - Instalação e Execução do Back-end](#instalação-e-execução-do-back-end)<br>

## Contextualização
Extremamente relevantes para garantir o justo curso do processo legal e o direito à ampla defesa, os recursos são utilizados para contestar decisões judiciais. No contexto jurídico brasileiro, recursos especiais são uma categoria à parte desses mecanismos expressa na Constituição Federal vigente e regulamentada pelo Código de Processo Civil de 2015. São de competência do Superior Tribunal de Justiça (STJ), cuja função é tornar uniforme a interpretação da lei federal.

Emitir um recurso especial requer que a decisão contestada tenha passado, anteriormente, por todas as instâncias ordinárias, isto é, seja emitida por um tribunal de segunda instância. O tribunal de origem deve verificar – antes de encaminhar ao STJ – se o recurso é válido e atende aos requisitos; para isso, deve consultar os "temas", que representam decisões já estabelecidas pelo STJ.

Os temas são importantes consolidações da jurisprudência; as interpretações estabelecidas que representam facilitam o entendimento das leis e servem de referência para futuras decisões de todos os tribunais do país.

## Como funciona?
O analista judiciário anexa uma lista de temas e um arquivo do caso; o BuscaTema, então, retorna alguns desses temas juntamente com a probabilidade de cada um descrever a situação do caso. Para o profissional, a ferramenta representa agilidade através da automação; uma grande quantidade de tempo que seria despendida nessa tarefa pode ser direcionada a tarefas mais importantes. O recurso não anula a necessidade de avaliação humana, mas agiliza e direciona o profissional.

![Diagrama de Casos de Uso da Aplicação](docs/use_case_diagram.jpg)

Em versões futuras, a ferramenta permitirá o acompanhamento do processo de análise por parte do analista e o envio de imagens do processo para posterior leitura OCR. 
<!-- A aplicação também poderá ser integrada a um sistema de gerenciamento de processos judiciais, como o e-SAJ, para facilitar a busca de temas e automatizar o processo de análise. -->

## Como o sistema está organizado?
Dois servidores são utilizados: o primeiro gerencia os pedidos para análise e o segundo é de fato o responsável pelo processamento computacional.

![Diagrama de Atividades](docs/activity_diagram.png)

## Tecnologias Envolvidas
A aplicação consiste em duas partes: uma Single-Page Application \(SPA\) escrita em [React](https://react.dev/), um framework [javascript](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript), e um servidor intermediário, em [Flask](https://flask.palletsprojects.com/en/3.0.x/), uma biblioteca [python](https://www.python.org/). O processamento referente a casos judiciais acontece em um terceiro módulo, que ainda não faz parte desse repositório.

No momento, o servidor intermediário armazena os arquivos enviados pelo usuário e envia uma resposta _hard-coded_. A aplicação que de fato processa os documentos está sendo refinada e a integração está prevista para acontecer em breve. A ideia, no entanto, é manter as interfaces para que não sejam necessárias modificações adicionais.

Devem ser utilizadas as versões mais recentes do Node.JS e Python que tenham suporte ativo.

A aplicação consiste em duas partes principais: uma Single-Page Application \(SPA\) escrita em [React](https://react.dev/), um framework [javascript](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript) para a construção de interfaces de usuário, e um backend implementado em [Flask](https://flask.palletsprojects.com/en/3.0.x/), uma biblioteca [python](https://www.python.org/). O backend recebe dois arquivos CSV contendo casos judiciais e uma lista de temas, realiza o processamento dos dados e gera sugestões de temas relevantes para cada caso. O frontend, por sua vez, exibe essas sugestões ao usuário.

O backend Flask, neste momento, desempenha as seguintes funções:

1. **Recebimento de Arquivos:** Ele recebe os arquivos CSV enviados pelo usuário através do frontend React, sendo um contendo casos judiciais e outro contendo uma lista de temas.
2. **Validação e Armazenamento:** Realiza a validação dos arquivos recebidos (verificando se são do tipo CSV e se possuem conteúdo) e os armazena no sistema de arquivos local.
3. **Comunicação com o Módulo de Processamento:** Executa o script `sugereTema.py`, passando os arquivos como argumentos.
4. **Resposta ao Frontend:** Após a execução do script de processamento, o backend envia uma resposta ao frontend, indicando sucesso ou falha na operação.

O frontend React é responsável por:

1. **Interface de Upload:** Fornece uma interface para o usuário fazer o upload dos arquivos
2. **Envio dos Arquivos:** Utiliza uma requisição POST para enviar os arquivos para o endpoint do backend Flask.
3. **Exibição de Sugestões:** Após o processamento no backend, recebe e exibe as sugestões de temas na interface do usuário, ordenadas por relevância.
4. **Tratamento de Tempo Limite:** Se o processamento no backend exceder o tempo limite de 80 segundos, exibe um texto pré-definido contendo um exemplo de sugestões de temas.

O script `sugereTema.py`, por sua vez, executa as seguintes etapas principais:

1. **Pré-processamento dos Dados:**
   - Lê os arquivos 1 (casos judiciais) e 2 (lista de temas).
   - Realiza a limpeza e pré-processamento dos textos, removendo pontuações, stop words e outros elementos irrelevantes.
   - Aplica técnicas de processamento de linguagem natural (PLN) para preparar os dados para a próxima etapa.
2. **Geração de Embeddings:**
   - Utiliza um modelo de Sentence-BERT pré-treinado para gerar embeddings (representações vetoriais) dos textos dos casos judiciais e dos temas.
   - Esses embeddings capturam o significado semântico dos textos, permitindo a comparação e identificação de similaridades entre eles.
3. **Criação de Resumos:**
   - Executa o script `createTopics.py` para criar resumos dos casos judiciais, utilizando uma estratégia baseada em LexRank guiada por uma lista de temas e com um limite de 15 sentenças.
4. **Cálculo de Similaridade:**
   - Executa o script `calcSimilarity.py` para calcular a similaridade entre os resumos dos casos judiciais e os temas, utilizando o algoritmo BM25.
   - Gera um arquivo CSV (`CLASSIFIED_TOPICS_X15CLEAN_BM25.csv`) contendo os temas sugeridos para cada caso judicial, classificados por ordem de relevância.

## Manual do Usuário
Com a interface gráfica e o servidor do BuscaTema já em funcionamento, você deve enviar o arquivo do caso e a lista de temas que será utilizada pela aplicação.

A tela inicial estará assim:<br>
![Tela Inicial do BuscaTema antes do envio dos arquivos, existem dois campos com o texto "Arraste o pdf até aqui ou clique para selecionar" e um botão com o texto "Arquivos Inseridos (0 DE 2)"](docs/ui-guide-before-files.png)

Após arrastar os arquivos correspondentes até os campos, ou selecioná-los entre os arquivos de seu computador, a tela ficará assim:<br>
![Tela Inicial do BuscaTema após do envio dos arquivos, existem dois campos, um com o texto "Caso_23153.pdf" e outro com o texto "temas_repetitivos.csv", além de um botão com o texto "ENVIAR" no lugar do anterior](docs/ui-guide-after-files.png)

Clique em ENVIAR e receberá, rapidamente, a lista com alguns temas juntamente com a probabilidade de estarem relacionados ao texto do caso:<br>
![](docs/ui-guide-after-upload.png)

## Instalação e Execução da Interface
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

## Instalação e Execução do Back-end
O desenvolvedor deverá seguir as etapas abaixo para executar o back-end em sua máquina. Os passos foram descritos considerando um sistema baseado em Unix 03:

1. Instalar o [python](https://www.python.org/) caso não possua

2. Acessar a pasta backend:<br>
   `cd backend`

3. Instalar os módulos necessários:<br>
   `pip install -r requirements.txt`

4. Inicializar o back-end:<br>
   `py app.py`

\(Opcional\) Utilize o módulo [venv](https://docs.python.org/3/library/venv.html) para manter o conjunto de dependências desse projeto isoladas de seu ambiente Python local:

5. Criar, antes de instalar os módulos necessários, um ambiente isolado:
   `python -m venv busca-env`

6. Ativar o ambiente:
   `source busca-env/bin/activate`

7. Seguir normalmente do passo 2 ao passo 4

## Próximos Passos (Documento de Trabalho Futuro)
Ainda falta, para os próximos semestres, a implementação de um módulo de autenticação e persistência, garantindo que o processamento de dados aconteça após a requisição e que o usuário não precise aguardar o tempo todo. A autenticação garantiria um acesso posterior aos resultados pelo usuário, que poderia ser notificado por um sistema de mensagens.
