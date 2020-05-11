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
* Aplicativo para celular que calcula diversos dados e exporta para o sistema;

![gif](https://github.com/PRElias/images-gifs-readme/raw/master/nutri-funcionalidades.gif?raw=true)

# Pré-requisitos

1. .NET Core 3.1

# Instalação

Para executar, é necessário ter instalado o .NET Core SDK 3.1, que você pode baixar clicando [aqui](https://dotnet.microsoft.com/download/dotnet-core/thank-you/sdk-3.1.201-windows-x64-installer).

# PWA

Um [PWA](https://pt.wikipedia.org/wiki/Progressive_web_app) (progressive web app), é um site, que pode ser instalado em celulares e até mesmo em computadores com Windows e com isso se comportar parecido à um aplicativo.

Ele possui diversar vantagens sobre aplicativos, como não necessitar de investimentos para ser publicado em lojas e ser pesquisável no Google diretamente.

# FAQ

## 1
**Qual a motivação?**

Particularmente, eu acredito que desenvolver projetos pessoais de programação é a melhor maneira de aprender e evoluir seu conhecimento. Sendo assim, possuo diversos projetos livres aqui no [Github](https://github.com/PRElias?tab=repositories), para as mais diversas finalidade.

Com a pandemia, eu comecei a pensar muito em desenvolver conteúdos grátis que pudessem ajudar as pessoas, sejam na forma de posts no meu [blog](https://paulorobertoelias.com.br/) ou aplicações.

E assim, em conversa com algumas amigas nutricionistas, a ideia foi evoluindo e enfim, minha amiga Suellen G. Mignella (obrigado!), me levou a sério e me ajudou com informações e problemas que ela enfrenta para trabalhar longe do ambiente habitual.

## 2
**E por que não posso usar online?**

Para processar informações e principalmente salvar, é necessário ter um servidor e apesar de alguns serem gratuitos para algumas linguagens de programação, quase todos custam dinheiro para serem mantidos. Além disso, por se tratarem de dados pessoais e sigilosos dos pacientes, disponibilizá-los online constitui um grande risco à segurança.

Esse risco seria muito pesado para um projeto mantido desta forma.

Por tudo isto, escolhi esse formato, mas esse é um projeto OpenSource, então fique a vontade para utilizar as ideias aqui contidas para iniciar outros projetos caso deseje.

Ser opensource, signifca também que todo código pode ser conferido por qualquer pessoa e inclusive copiado, e é por isso que esse projeto pode ser confirmado como sem fins lucrativos, já que você poderia copiá-lo e concorrer contra ele.

## 3
**E quais cuidados eu tenho que tomar com os dados?**

Os dados são armazenados fisicamente no seu computador, em um arquivo chamado *Database.log*. Os cuidados que você deve tomar com esse arquivo e com as planilhas e impressões geradas no sistema, são as mesmos que você tomaria com quaisquer arquivos que você não quer que sejam expostos, então, não envie a ninguém e não salve onde não tenha certeza do que está fazendo.

## 4
**Mas então eu não consigo usá-lo no meu celular?**

Consegue. Mas não o sistema completo. Conforme dito acima, foi uma opção de design não disponibilizar os dados sensíveis, sendo assim, você só pode manipulá-los executando o sistema no seu PC.

Contudo, para realizar alguns cálculos rápidos, há o [PWA](#pwa). Ele funciona parecido à um app comum, pode ser instalado no seu celular, mas não está disponível nas lojas de aplicativos e com isso, também se evita os custos e o processo de publicação para se participar das lojas.

Mas ainda assim, é possível importar as informações do app para o sistema quando você estiver na sau rede local (o seu WiFi).

## 5
**Posso sugerir ou requisitar uma funcionalidade?**

A hospedagem de projetos de software em sites como o Github tem seu funcionamento bem conhecido por desenvolvedores, porém, se você é um nutricionista ou não conhece as funcionalidades e práticas do cenário *opensource*, seguem as principais explicações abaixo:

* Você pode acompanhar os bugs ou melhorias previstas, ou até criar uma solicitação para um desenvolvimento, clicando no link de [Issues](https://github.com/PRElias/nutri/issues) do projeto. Por ser um projeto sem fins lucrativos, pode ser que o mesmo já tenha sido abandonado ou o autor esteja sem tempo ou interesse no momento, mas qualquer pessoa que entenda a linguagem, poderá continuar exatamente de onde ele parou, fazendo um [fork](https://help.github.com/pt/github/getting-started-with-github/fork-a-repo) do projeto, que é uma cópia independente, embora ainda permita a incorporação das evoluções caso os autores assim desejem.

* Tenho como acompanhar o que o autor está desenvolvendo?

Normalmente, os itens em que eu trabalho são controlados usando o próprio kanban de issues do Github, que você pode acompanhar [aqui](https://github.com/PRElias/nutri/projects/1), embora não possa garantir que ele estará sempre atualizado.