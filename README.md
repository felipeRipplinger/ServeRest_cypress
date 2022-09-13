![banner](./bannerF.png)

Challenge da Sprint 6.
## Índice

- [Introdução](#-introdução)
- [Principais Pastas/Arquivos](#-principais-pastasarquivos)
- [Configuração e Uso](#%EF%B8%8F-configuração-e-uso)
- [Dependências](#-dependências)

## 👋 Introdução

Seja bem vindo ao meu repositório da Sprint 6! Antes de prosseguir neste arquivo recomendo ler a documentação dentro da pasta [documentos](#-principais-pastasarquivos), começando pelo plano de testes, assim você terá uma experiencia completa deste projeto. Neste README vou demonstrar como você pode rodar os testes e gerar um report automatizado. 

## 📂 Principais Pastas/Arquivos 

```
-cypress
 ├─ .....
 ├─ fixtures [Schemas,...]
 ├─ integration [Specs]
 ├─ services [Classes]
 └─ reports 
    └─ mochareports 
       └─ report.html [HTML do report automatizado]

-documentos [Contém a documentação do projeto]

package.json [Configurações gerais e comandos]
```
Links para a documentação hospedada pelo google:

[Plano de testes](https://docs.google.com/document/d/1lNjcFGDxfRf6Jp8MMt2CtpT0odsaiIiGPF1GsTxz3nQ/edit?usp=sharing)

[Mapa Mental](https://drive.google.com/file/d/1-4x86P_fc-FBBuJXunLaqFD6wxRg3dJl/view?usp=sharing)

[Suíte de Testes](https://docs.google.com/document/d/1SWrm5gG8iV7oyjZBP9alqYzxQNUSjDWDXOIlbvvcW8c/edit?usp=sharing)

[Relatório de testes](https://docs.google.com/document/d/1yOJWV96tV2QF9BmjZQDE8ifkWWoTHOPe5DiJIu7b_mc/edit?usp=sharing)

## 🛠️ Configuração e Uso

Para rodar os testes é necessário instalar as [dependências](#-dependências), recomendo a instalação de todas elas para garantir o funcionamento dos testes e report automatizado, isso pode ser feito com facilidade já que as dependências já estão configuradas no package, instale o [Node.js](https://nodejs.org/en/) e npm, após isso basta executar o seguinte comando dentro da pasta principal deste projeto:

```
npm install
```
e por padrão todos os módulos citados como dependências serão instalados. 

Os comandos para que os testes sejam realizados são os seguintes:
```
npm run test [Realiza os testes e gera o report (está configurado para ambiente de produção)]
{Remover [--env configFile=prod] de scripts : scripts em package.json 
para realizar em ambiente de desenvolvimento}
```
```
npm run cy:open:prod [Abre a GUI do cypress para realizar os testes em ambiente de produção]

npm run cy:run:prod [Realiza os testes com display pelo console em ambiente de produção]
```
```
npx serverest@latest [Para hostear a ServeRest localmente/ambiente de desenvolvimento]

npm run cy:open [Abre a GUI do cypress para realizar os testes em ambiente de desenvolvimento]

npm run cy:run [Realiza os testes com display pelo console em ambiente de desenvolvimento]
```

Após rodar o comando necessário e escolher a opção desejada você deverá ver os testes em funcionamento, se você escolheu gerar um report automatizado você deve abrir o arquivo HTML gerado ([Local do arquivo](#-principais-pastasarquivos)) com a extensão live server do VSCode ou apenas abrir com o seu navegador.

[Aviso](#aviso): Se você utiliza a função de import automático do VScode, deve tomar cuidado para que ele não importe o cypress em um arquivo assim gerando um erro no process.env.

## 🧪 Dependências

[Node.js](https://nodejs.org/en/) e npm

[@faker-js/faker](https://fakerjs.dev) - v7.3.0

[ajv](https://ajv.js.org) - v8.11.0

[cypress](https://www.cypress.io) - v8.7.0

[cypress-multi-reporters](https://www.npmjs.com/package/cypress-multi-reporters) - v1.6.1

[mocha](https://mochajs.org) - v10.0.0

[mochawesome](https://www.npmjs.com/package/mochawesome) - v7.1.3

[mochawesome-merge](https://www.npmjs.com/package/mochawesome-merge) - v4.2.1

[mochawesome-report-generator](https://www.npmjs.com/package/mochawesome-report-generator) - v6.2.0