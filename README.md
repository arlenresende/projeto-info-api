# ResumoIA API

API do projeto ResumoIA, desenvolvida com Node.js, Fastify, Prisma e PostgreSQL.

## Requisitos

- Node.js
- Docker
- Docker Compose

## Configuração

1. Clone o repositório
2. Instale as dependências:
```bash
npm install
```

3. Configure as variáveis de ambiente:
```bash
cp .env.example .env
```

4. Inicie o banco de dados PostgreSQL com Docker:
```bash
docker compose up -d
```

5. Execute as migrations do Prisma:
```bash
npx prisma migrate dev
```

6. Inicie o servidor de desenvolvimento:
```bash
npm run start:dev
```

## Estrutura do Projeto

- `src/` - Código fonte da aplicação
  - `http/` - Controllers e rotas
  - `services/` - Regras de negócio
  - `repositories/` - Camada de acesso ao banco de dados
  - `lib/` - Utilitários e configurações
  - `env/` - Validação de variáveis de ambiente

## Scripts Disponíveis

- `npm run start:dev` - Inicia o servidor em modo de desenvolvimento
- `npm run build` - Compila o projeto
- `npm run start` - Inicia o servidor em produção
- `npm test` - Executa os testes unitários
- `npm run test:e2e` - Executa os testes end-to-end

## Docker

O projeto utiliza Docker Compose para gerenciar o banco de dados PostgreSQL. O arquivo `docker-compose.yml` define:

- Serviço: `api-resumoia`
- Imagem: `postgres:latest`
- Porta: `5432`
- Credenciais:
  - Usuário: `postgres`
  - Senha: `docker`
  - Banco de dados: `resumoiaAPI`

Para reiniciar o container e limpar os volumes:
```bash
docker compose down -v && docker compose up -d
```