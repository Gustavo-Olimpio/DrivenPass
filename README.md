# DrivenPass

![Projeto em Ação](link-para-imagem-ou-gif.gif)

## Descrição
Este é o DrivenPass, uma plataforma projetada para garantir a segurança de suas senhas. Com ele, você pode armazenar suas senhas de forma segura e acessá-las com facilidade quando necessário.

![link]()

## Sobre

### Visão Geral

O **DrivenPass** é uma plataforma projetada para garantir a segurança das suas senhas. Com ele, você pode armazenar suas senhas de forma segura e acessá-las com facilidade quando necessário. Este projeto oferece uma solução confiável para gerenciar suas informações de login, proporcionando tranquilidade e praticidade no seu dia a dia.

**Principais Características:**

- **Segurança Avançada:** O DrivenPass oferece segurança de alto nível para suas informações de login, com um sistema de login e cadastro protegido por bcrypt e tokens JWT com data de expiração. Suas senhas e dados estão protegidos de forma confiável.

- **Armazenamento Criptografado:** Utilizamos a criptografia com Cryptr para armazenar com segurança suas credenciais, notas seguras e até mesmo informações de cartões. Suas informações são mantidas privadas e acessíveis apenas para você.

- **Fácil Gerenciamento:** Você pode salvar e gerenciar suas senhas de forma organizada, facilitando o acesso quando necessário. Além disso, o DrivenPass oferece uma função de deleção de conta automática, permitindo que você apague todos os seus dados de forma segura e autenticada.

### Motivação

Vivemos em um mundo onde a segurança é cada vez mais crucial. Com ameaças digitais e pessoas de má índole em busca de informações pessoais, torna-se essencial proteger nossas senhas e dados confidenciais.

Hoje, a complexidade das senhas é necessária para manter nossas contas seguras. Porém, essa complexidade também torna difícil lembrar todas as senhas importantes para diferentes ambientes online.

O DrivenPass nasceu da necessidade de fornecer um ambiente seguro e prático para armazenar senhas essenciais. Não é mais viável depender de senhas simples ou escrevê-las em papel devido à crescente ameaça à segurança digital.

Nosso objetivo é fornecer uma solução que permita que você armazene e acesse facilmente suas senhas importantes de forma segura, ajudando a simplificar a complexidade da segurança online.

Junte-se a nós no DrivenPass e transforme a maneira como você protege suas informações pessoais. Torne a segurança online mais simples e eficaz, para que você possa navegar na web com confiança.

### Features

- **Autenticação Segura:** Utilizamos um sistema de autenticação seguro com JSON Web Tokens (JWT) e criptografia de senhas utilizando bcrypt, garantindo a segurança das suas credenciais.

- **Armazenamento Criptografado:** Suas senhas, notas seguras e informações de cartões são armazenadas de forma segura com criptografia, garantindo a privacidade dos seus dados.

- **Busca Eficiente:** Nossa plataforma permite uma busca fácil e eficiente por suas credenciais, notas seguras e cartões cadastrados, tornando o acesso às informações rápido e conveniente.

- **Notas Seguras:** Além de senhas, os usuários podem armazenar notas seguras, como informações confidenciais ou lembretes importantes.

- **Cartões de Crédito:** Possibilitamos o armazenamento seguro de informações de cartões de crédito, facilitando o preenchimento de formulários de pagamento online.

- **Exclusão de Conta Autenticada:** Os usuários podem excluir suas contas com autenticação segura, garantindo que todos os dados sejam removidos de forma permanente.

### Próximos Passos

- **Desenvolvimento do Front-end:** Estamos trabalhando no desenvolvimento de um front-end atraente e eficiente para a aplicação, tornando a experiência do usuário ainda melhor.

- **Gestão de Conta:** Trabalhando para que os usuários possam atualizar suas informações de conta, incluindo nome de usuário e senha, para manter suas credenciais seguras.

- **Recuperação de Senha:** Implementando um processo seguro de recuperação de senha, permitindo que os usuários redefinam suas senhas com segurança caso as esqueçam.

- **Geração de Senhas Seguras:** Criar a capacidade de gerar senhas seguras aleatórias, ajudando os usuários a criar senhas fortes para contas online.- 


## Tecnologias
<p>
<img src="https://img.shields.io/badge/-Javascript-F7DF1E?logo=javascript&logoColor=white"  alt="JavaScript" width="100" height="30">
<img src="https://img.shields.io/badge/-Node-339933?logo=nodedotjs&logoColor=white" width="80" height="30">
<img src="https://img.shields.io/badge/-Typescript-3178C6?logo=typescript&logoColor=white" width="100" height="30">
<img src="https://img.shields.io/badge/-PostgreSQL-4169E1?logo=postgresql&logoColor=white" width="100" height="30">
<img src="https://img.shields.io/badge/-Prisma-2D3748?logo=prisma&logoColor=white" width="80" height="30">
<img src="https://img.shields.io/badge/-Nest-E0234E?logo=nestjs&logoColor=white" width="80" height="30">
<img src="https://img.shields.io/badge/-Jest-C21325?logo=jest&logoColor=white" width="80" height="30">
<img src="https://img.shields.io/badge/-JWT-000000?logo=jsonwebtokens&logoColor=white" width="80" height="30">
<img src="https://img.shields.io/badge/-.ENV-000000?logo=dotenv&logoColor=white" width="80" height="30">
</p>

## Como Rodar

Para rodar o DrivenPass em sua máquina local, siga estas etapas:

1. Clone o repositório para sua máquina:

    ```bash
   git clone https://github.com/seu-usuario/DrivenPass.git
    ```
2. Acesse o diretório do projeto:
    ```bash
    cd DrivenPass
    ```
3. Instale as dependências do projeto utilizando o npm:
    ```bash
    npm install
    ```
4. Crie um arquivo .env na raiz do projeto com as seguintes variáveis de ambiente:
  env
    ```bash
    DATABASE_URL="sua-url-do-banco-de-dados"
    JWT_SECRET="sua-chave-secreta-jwt"
    ```
Certifique-se de substituir "sua-url-do-banco-de-dados" pela URL do seu banco de dados e "sua-chave-secreta-jwt" por uma chave secreta para JWT.

5. Execute as migrações do banco de dados para criar as tabelas necessárias:
    ```bash
    npx prisma migrate dev
    ```
6. Inicie o servidor:
    ```bash
    npm start
    ```
O DrivenPass estará rodando em http://localhost:3000. Você pode acessar o aplicativo em seu navegador.

Certifique-se de ter o Node.js, npm e o Prisma instalados em sua máquina antes de prosseguir com essas etapas.

Agora você pode começar a usar o DrivenPass localmente!

## Como Rodar Testes

Para executar os testes do DrivenPass, siga estas etapas:

1. Crie um arquivo `.env.test` na raiz do projeto com as seguintes variáveis de ambiente específicas para o ambiente de teste:

   env
     ```bash
        DATABASE_URL="sua-url-do-banco-de-dados-de-teste"
        JWT_SECRET="sua-chave-secreta-jwt-de-teste"
     ```
Certifique-se de substituir "sua-url-do-banco-de-dados-de-teste" pela URL do seu banco de dados de teste e "sua-chave-secreta-jwt-de-teste" por uma chave secreta específica para o ambiente de teste.

2. Execute as migrações do banco de dados de teste para criar as tabelas necessárias:
    ```bash
        npx prisma migrate dev --env=test
    ```
3. Execute os testes E2E com o seguinte comando:
     ```bash
        npm run test:e2e
     ```
Isso executará os testes de ponta a ponta (E2E) no ambiente de teste, garantindo que as funcionalidades do DrivenPass estejam funcionando conforme o esperado.

Certifique-se de ter o Node.js, npm e o Prisma instalados em sua máquina antes de prosseguir com essas etapas.

Com essas instruções, você poderá rodar e testar o DrivenPass com facilidade no ambiente de desenvolvimento e teste.
