![CI](https://github.com/PRElias/nutri/workflows/CreatingVersion/badge.svg?event=deployment)

# Nutri
Sistema independente e aberto de controle de pacientes e atendimentos.

O sistema, em sua fase atual e embora já utilizável, pode ser considerado um protótipo e foi desenvolvido para ser disponibilizado de forma gratuita a profissionais do ramo, para um controle mais facilitado de suas atividades.

# Índice
* [Introdução](#introducao)
* [Objetivo](#objetivo)
* [Principais funcionalidades](#principais_funcionalidades)
* [Pré-requisitos](#pré-requisitos)
* [Instalação](#instalacão)
* [PWA](#pwa)
* [Tecnologias](#tecnologias)
* [FAQ](#faq)
    * [1. Qual a motivação?](#1)
    * [2. E por que não posso usar online?](#2)
    * [3. E quais cudados eu tenho que tomar com os dados?](#3)
    * [4. Mas então eu não consigo usá-lo no meu celular?](#4)
    * [5. Posso sugerir ou requisitar uma funcionalidade?](#5)

# Introdução

A aplicação não possui qualquer funcionalidade de **segurança sobre os dados** e sequer login, sendo para uso exclusivo de um profissional por instância, ou seja, por instalação, sendo extremamente recomendado seu uso apenas em máquina local (não servir nem disponibilizar na internet uma instancia com dados).

# Objetivo

Prover um sistema simples, que permita emitir documentos (receitas, atestados, etc) de forma descomplicada e rápida e fazer cálculos relevantes e com praticidade durante o atendimento.

Como objetivos meus, eu destaco a experimentação e prática das tecnologias empregadas, divulgação das minhas habilidades e ajuda à profissionais, sejam eles liberais ou não, em tempos de crise extrema, onde são empregadas ações como *home office* e muitos deles não possuem ferramentas e/ou sequer as recebem de seus empregadores por barreiras financeiras.

# Principais funcionalidades

* Cadastro e reaproveitamento dos dados do paciente nos documentos emitidos;
* Criação de assinatura direto na tela para uso nos documentos impressos;
* Emissão de diversos documentos como atendimento nutricional, receitas, etc
* Possibilidade de geração de relatório (em desenvolvimento);
* Contato facilitado através de link para o Whatsapp para cada cliente;
* Exportação de dados para Excel;
* Aplicativo para celular que calcula diversos dados;

![gif](https://github.com/PRElias/images-gifs-readme/raw/master/nutri-funcionalidades.gif?raw=true)

# Pré-requisitos

O sistema não possui pré-requisitos que não sejam disponibilizados junto com o instalador. Ou seja, em qualquer computador com Windows é possível fazer a utilização.

# Instalação

Para instalar, é necessário clicar no botão abaixo e e realizar o download do arquivo zip:

[Download](https://github.com/PRElias/nutri/releases/download/latest/nutri.zip)

Depois de baixado, descompacte o arquivo em uma pasta qualquer do seu computador. Para isso você pode usar o próprio Windows, que consegue abrir arquivos desse tipo, ou baixar o [7-zip](https://www.7-zip.org/a/7z1900.exe), que também é um software gratuito e de código aberto.

![gif](https://github.com/PRElias/images-gifs-readme/raw/master/nutri-conteudo.png?raw=true)

Então, navegue até a pasta onde descompactou e execute o arquivo **nutri.exe**. Uma janela será aberta e não a feche, pois senão não será possível acessar o sistema.

Abra um navegador de internet (preferencialmente o [Google Chrome](https://www.google.com/chrome/browser/desktop/index.html)) e vá até o endereço ```localhost:5000```.

E pronto!

Mas tem mais...se você quiser realmente **instalar** o programa, é só fazer assim:

Execute o arquivo ```certificado-localhost.cer```, aceite a instalação do certificado e mude o endereço no navegador para ```https://localhost:5000``` (nesse caso é preciso digitar o https porque tem um **S**), esse S é para uso do certificado que importamos e esse certificado permite que apareça o botão **Instalar (+)** no Google Chrome, que fica ao fim da barra de endereços ao lado direito.

Ao se clicar nesse botão, uma janela exclusiva é aberta e um ícone para o aplicativo nutri é colocado na área de trabalho, porém ainda será necessário executar o arquivo **nutri.exe** antes de abri-la novamente.

[Voltar ao topo](#introducao)

# PWA

Um [PWA](https://pt.wikipedia.org/wiki/Progressive_web_app) (progressive web app), é um site, que pode ser instalado em celulares e até mesmo em computadores com Windows e com isso se comportar parecido à um aplicativo.

Ele possui diversas vantagens sobre aplicativos, como não necessitar de investimentos para ser publicado em lojas e ser pesquisável no Google diretamente.

[Voltar ao topo](#introducao)

# Tecnologias

1. .NET Core 3.1
2. Progressive Web App
3. Github Continuous Integration

# FAQ

## 1
**Qual a motivação?**

Particularmente, eu acredito que desenvolver projetos pessoais de programação é a melhor maneira de aprender e evoluir seu conhecimento. Sendo assim, possuo diversos projetos livres aqui no [Github](https://github.com/PRElias?tab=repositories), para as mais diversas finalidades.

Com a pandemia, eu comecei a pensar muito em desenvolver conteúdos grátis que pudessem ajudar as pessoas, sejam na forma de posts no meu [blog](https://paulorobertoelias.com.br/) ou aplicações.

E assim, em conversa com algumas amigas nutricionistas, a ideia foi evoluindo e enfim, minha amiga Suellen G. Mignella (obrigado!), me levou a sério e me ajudou com informações e problemas que ela enfrenta para trabalhar longe do ambiente habitual.

As tecnologias usadas foram escolhidas pois eu já tinha um certo domínio e queria disponibilizar o resultado o mais rápido possível.

[Voltar ao topo](#introducao)

## 2
**E por que não posso usar online?**

De forma simples, pode-se dizer que, para processar informações e principalmente salvar, é necessário ter um servidor e apesar de alguns serem gratuitos para algumas linguagens de programação, quase todos custam dinheiro para serem mantidos.

Há algumas outras formas modernas de se salvar e que inclusive estou estudando para uma versão exclusivamente mobile para o futuro, porém, como eu disse acima, eu queria disponibilizar o mais brevemente possível e por isso escolhi a abordagem atual.

Além disso, por se tratarem de dados pessoais e sigilosos dos pacientes, disponibilizá-los online constitui um grande risco à segurança. Esse risco seria muito pesado para um projeto mantido desta forma.

Por tudo isto, escolhi esse formato, mas esse é um projeto OpenSource, então fique a vontade para utilizar as ideias aqui contidas para iniciar outros projetos caso deseje.

Ser opensource, significa também que todo código pode ser conferido por qualquer pessoa e inclusive copiado, e é por isso que esse projeto pode ser confirmado como sem fins lucrativos, já que você poderia copiá-lo e concorrer contra ele.

[Voltar ao topo](#introducao)

## 3
**E quais cuidados eu tenho que tomar com os dados?**

Os dados são armazenados fisicamente no seu computador, em um arquivo chamado *Database.log*. Os cuidados que você deve tomar com esse arquivo e com as planilhas e impressões geradas no sistema, são as mesmos que você tomaria com quaisquer arquivos que você não quer que sejam expostos, então, não envie a ninguém e não salve onde não tenha certeza do que está fazendo.

[Voltar ao topo](#introducao)

## 4
**Mas então eu não consigo usá-lo no meu celular?**

Consegue. Mas não o sistema completo. Conforme dito acima, foi uma opção de design não disponibilizar os dados sensíveis, sendo assim, você só pode manipulá-los executando o sistema no seu PC.

Contudo, para realizar alguns cálculos rápidos, há o [PWA](#pwa). Ele funciona parecido à um app comum, pode ser instalado no seu celular, mas não está disponível nas lojas de aplicativos e com isso, também se evita os custos e o processo de publicação para se participar das lojas.

Mas ainda assim, é possível importar as informações do app para o sistema quando você estiver na sau rede local (o seu WiFi).

[Voltar ao topo](#introducao)

## 5
**Posso sugerir ou requisitar uma funcionalidade?**

A hospedagem de projetos de software em sites como o Github tem seu funcionamento bem conhecido por desenvolvedores, porém, se você é um nutricionista ou não conhece as funcionalidades e práticas do cenário *opensource*, seguem as principais explicações abaixo:

* Você pode acompanhar os bugs ou melhorias previstas, ou até criar uma solicitação para um desenvolvimento, clicando no link de [Issues](https://github.com/PRElias/nutri/issues) do projeto. Por ser um projeto sem fins lucrativos, pode ser que o mesmo já tenha sido abandonado ou o autor esteja sem tempo ou interesse no momento, mas qualquer pessoa que entenda a linguagem, poderá continuar exatamente de onde ele parou, fazendo um [fork](https://help.github.com/pt/github/getting-started-with-github/fork-a-repo) do projeto, que é uma cópia independente, embora ainda permita a incorporação das evoluções caso os autores assim desejem.

* Tenho como acompanhar o que o autor está desenvolvendo?

Normalmente, os itens em que eu trabalho são controlados usando o próprio kanban de issues do Github, que você pode acompanhar [aqui](https://github.com/PRElias/nutri/projects/1), embora não possa garantir que ele estará sempre atualizado.

[Voltar ao topo](#introducao)