# README - EXPTRACKER

##  Visão Geral

O **EXPTRACKER** é uma aplicação web para controle de gastos financeiros pessoais, desenvolvida com React no frontend e Node.js/Express no backend, utilizando MongoDB como banco de dados.
Essa aplicação nasceu de uma necessidade real: depois de começar a morar sozinho, percebi como é desafiador organizar as finanças pessoais sem uma ferramenta adequada.

##  Funcionalidades

- Cadastro e autenticação de usuários
- Registro de despesas e receitas
- Categorização de transações
- Dashboard com gráficos e resumos financeiros
- Exportação de dados para planilhas (XLSX)
- Notificações toast (react-hot-toast)
- Responsividade com Tailwind CSS

## Tecnologias Utilizadas

### Frontend
- React 19
- React Router DOM
- Axios (para requisições HTTP)
- Tailwind CSS (estilização)
- Recharts (gráficos)
- Vite (build tool)

### Backend
- Express.js
- MongoDB (com Mongoose ODM)
- JSON Web Tokens (autenticação)
- BcryptJS (hash de senhas)
- Multer (upload de arquivos)
- XLSX (exportação para Excel)
- CORS (gerenciamento de origens)
- Dotenv (variáveis de ambiente)

## Como Executar o Projeto

### Pré-requisitos
- Node.js 
- MongoDB 
- NPM ou Yarn

### Clonar o repositório
```bash
git clone https://github.com/seu-usuario/EXPTRACKER.git
cd EXPTRACKER
```

### Configuração do Backend

1. Navegue até a pasta do backend:
   ```bash
   cd back-end
   ```

2. Instale as dependências:
   ```bash
   npm install
   ```

3. Crie um arquivo `.env` na raiz do backend com as seguintes variáveis:
   ```
   PORT=5000
   MONGODB_URI=sua_string_de_conexao_mongodb
   JWT_SECRET= 5equ3nciad3num3roseletr4sal3ator1asp4raencr1ptação
   ```

4. Inicie o servidor:
   ```bash
   npm run dev
   ```

### Configuração do Frontend

1. Navegue até a pasta do frontend:
   ```bash
   cd front-end
   ```

2. Instale as dependências:
   ```bash
   npm install
   ```
   
3. Inicie o aplicativo:
   ```bash
   npm run dev
   ```

##  Destaques Técnicos

- Autenticação JWT segura
- Upload de comprovantes com Multer
- Exportação de relatórios em Excel
- Gráficos interativos com Recharts
- UI responsiva com Tailwind
- Validação de formulários
- Feedback visual com toast notifications
- Organização por categorias com emojis

## Contribuição

Contribuições são bem-vindas! Siga os passos:

1. Faça um fork do projeto
2. Crie uma branch (`git checkout -b feature/nova-feature`)
3. Commit suas mudanças (`git commit -m 'Adiciona nova feature'`)
4. Push para a branch (`git push origin feature/nova-feature`)
5. Abra um Pull Request