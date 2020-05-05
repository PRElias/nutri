# Nutri
Sistema independente de controle de pacientes e atendimentos

O sistema, em sua fase atual, pode ser considerado um protótipo e foi desenvolvido para ser disponibilizado de forma gratuita a profissionais do ramo, para um controle mais facilitado de suas atividades.

# Índice
* [Introdução](#introducao)
* [Pré-requisitos](#pre-requisitos)
* [Instalação](#instalacao)
* [FAQ](#faq)
* [PWA](#pwa)

# Introdução

A aplicação não possui qualquer funcionalidade de segurança sobre os dados e sequer login, sendo para uso exclusivo de um profissional por instância, sendo extremamente recomendado seu uso apenas em máquina local (não servir nem disponibilizar na internet uma instancia com dados).

# Pré-requisitos

1. .NET Core 3.1

# Instalação

Para executar, é necessário ter instalado o .NET Core SDK 3.1, que você pode baixar clicando [aqui](https://dotnet.microsoft.com/download/dotnet-core/thank-you/sdk-3.1.201-windows-x64-installer).

# FAQ

1. Qual a motivação?

Particularmente, eu acredito que desenvolver projetos pessoais de programação é a melhor maneira de aprender e evoluir seu conhecimento. Sendo assim, possuo diversos projetos livres aqui no [Github](https://github.com/PRElias?tab=repositories), para as mais diversas finalidade.

Com a pandemia, eu comecei a pensar muito em desenvolver conteúdos grátis que pudessem ajudar as pessoas, sejam na forma de posts no meu [blog](https://paulorobertoelias.com.br/) ou aplicações.

E assim, em conversa com algumas amigas nutricionistas, a ideia foi evoluindo e enfim, minha amiga Suellen G. Mignella (obrigado!), me levou a sério e me ajudou com informações e problemas que ela enfrenta para trabalhar longe do ambiente habitual.

2. E por que não posso usar online?

Para processar informações e principalmente salvar, é necessário ter um servidor e apesar de alguns serem gratuitos para algumas linguagens de programação, quase todos custam dinheiro para serem mantidos. Além disso, por se tratarem de dados pessoais e sigilosos dos pacientes, disponibilizá-los online constitui um grande risco à segurança.

Esse risco seria muito pesado para um projeto mantido desta forma.

Por tudo isto, escolhi esse formato, mas esse é um projeto OpenSource, então fique a vontade para utilizar as ideias aqui contidas para iniciar outros projetos caso deseje.

3. Mas então eu não consigo usá-lo no meu celular?

Consegue. Mas não o sistema completo. Conforme dito acima, foi uma opção de design não disponibilizar os dados sensíveis, sendo assim, você só pode manipulá-los executando o sistema no seu PC.

Contudo, para realizar alguns cálculos rápidos, há também no projeto um [PWA](https://pt.wikipedia.org/wiki/Progressive_web_app) (progressive web app). Ele funciona parecido à um app comum, pode ser instalado no seu celular, mas não está disponível nas lojas de aplicativos e com isso, também se evita os custos e o processo de publicação para se participar das lojas.
