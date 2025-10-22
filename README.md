# 🚗 ResumoIA API

API REST completa desenvolvida com Node.js, Fastify, Prisma e PostgreSQL. O projeto oferece funcionalidades de autenticação de usuários, gerenciamento de veículos e integração com IA para geração de conteúdo.

## 🚀 Funcionalidades

### 👤 Autenticação e Usuários
- Registro e login de usuários
- Autenticação JWT com refresh tokens
- Gerenciamento de perfil de usuário
- Reset de senha via email
- Middleware de autenticação

### 🚙 Gerenciamento de Veículos
- Cadastro de veículos com validação de dados únicos
- Listagem paginada de veículos
- Busca de veículo por ID
- Atualização de informações do veículo
- Exclusão de veículos
- Validação de placa, chassi e RENAVAM

### 🤖 Integração com IA
- Geração de conteúdo usando OpenAI
- Busca e resumo de artigos
- Processamento de texto inteligente

## 🛠️ Tecnologias Utilizadas

### Backend
- **Node.js** - Runtime JavaScript
- **Fastify** - Framework web rápido e eficiente
- **TypeScript** - Tipagem estática
- **Prisma** - ORM moderno para banco de dados
- **PostgreSQL** - Banco de dados relacional

### Autenticação e Segurança
- **@fastify/jwt** - JSON Web Tokens
- **@fastify/cookie** - Gerenciamento de cookies
- **bcryptjs** - Hash de senhas
- **Zod** - Validação de esquemas

### Integrações
- **OpenAI** - API de inteligência artificial
- **Axios** - Cliente HTTP
- **Resend** - Envio de emails
- **Google Auth Library** - Autenticação Google

### Desenvolvimento
- **Vitest** - Framework de testes
- **ESLint** - Linter de código
- **TSX** - Execução TypeScript
- **TSUP** - Bundler TypeScript

## 📋 Pré-requisitos

- Node.js (versão 18 ou superior)
- Docker e Docker Compose
- npm ou yarn

## ⚙️ Configuração e Instalação

### 1. Clone o repositório
```bash
git clone <url-do-repositorio>
cd resumoia-api
```

### 2. Instale as dependências
```bash
npm install
```

### 3. Configure as variáveis de ambiente
```bash
cp .env.example .env
```

Edite o arquivo `.env` com suas configurações:
```env
# Database
DATABASE_URL="postgresql://postgres:docker@localhost:5432/resumoiaAPI"

# JWT
JWT_SECRET="your-jwt-secret-key"

# OpenAI
OPENAI_API_KEY="your-openai-api-key"

# Email (Resend)
RESEND_API_KEY="your-resend-api-key"
```

### 4. Inicie o banco de dados
```bash
docker compose up -d
```

### 5. Execute as migrações
```bash
npx prisma migrate dev
```

### 6. Inicie o servidor
```bash
npm run start:dev
```

A API estará disponível em `http://localhost:3333`

## 📁 Estrutura do Projeto

```
src/
├── @types/           # Definições de tipos TypeScript
├── env/              # Validação de variáveis de ambiente
├── http/             # Camada HTTP
│   ├── controllers/  # Controladores das rotas
│   │   ├── users/    # Controladores de usuários
│   │   └── vehicles/ # Controladores de veículos
│   ├── middlewares/  # Middlewares (autenticação, etc.)
│   └── routes.ts     # Definição das rotas
├── lib/              # Utilitários e configurações
├── repositories/     # Camada de acesso aos dados
│   ├── prisma/       # Implementações Prisma
│   └── in-memory/    # Implementações para testes
├── services/         # Regras de negócio
│   ├── factories/    # Factories dos services
│   └── errors/       # Classes de erro customizadas
├── app.ts            # Configuração do Fastify
└── server.ts         # Inicialização do servidor
```

## 🔗 Endpoints da API

### Autenticação
- `POST /register` - Registro de usuário
- `POST /login` - Login de usuário
- `POST /refresh` - Renovar token
- `POST /logout` - Logout

### Usuários (Autenticado)
- `GET /me` - Perfil do usuário
- `PUT /users` - Atualizar usuário
- `DELETE /users` - Deletar usuário
- `POST /reset-password` - Reset de senha

### Veículos (Autenticado)
- `POST /vehicles` - Cadastrar veículo
- `GET /vehicles` - Listar veículos (paginado)
- `GET /vehicles/:id` - Buscar veículo por ID
- `PUT /vehicles/:id` - Atualizar veículo
- `DELETE /vehicles/:id` - Deletar veículo

## 📝 Exemplo de Uso - Veículos

### Cadastrar um veículo
```bash
curl -X POST http://localhost:3333/vehicles \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <seu-token>" \
  -d '{
    "placa": "ABC1234",
    "chassi": "1234567890ABCDEFG",
    "renavam": "12345678901",
    "modelo": "Gol",
    "marca": "Volkswagen",
    "ano": 2022,
    "descricao": "Veículo em ótimo estado",
    "photo": "http://example.com/photo.jpg"
  }'
```

### Listar veículos
```bash
curl -X GET "http://localhost:3333/vehicles?page=1&limit=10" \
  -H "Authorization: Bearer <seu-token>"
```

## 🧪 Scripts Disponíveis

```bash
# Desenvolvimento
npm run start:dev      # Servidor com hot reload
npm run build          # Build para produção
npm run start          # Servidor de produção

# Testes
npm test               # Testes unitários
npm run test:watch     # Testes em modo watch
npm run test:e2e       # Testes end-to-end
npm run test:coverage  # Cobertura de testes
npm run test:ui        # Interface visual dos testes

# Banco de dados
npx prisma migrate dev # Executar migrações
npx prisma studio      # Interface visual do banco
npx prisma db push     # Sincronizar schema
```

## 🐳 Docker

### Desenvolvimento
```bash
# Iniciar apenas o banco de dados
docker compose up -d

# Parar e limpar volumes
docker compose down -v
```

### Produção
```bash
# Build e execução completa
docker compose -f docker-compose.prod.yml up -d
```

## 🔒 Configuração CORS

A API está configurada para aceitar requisições das seguintes origens:
- `http://localhost:5173` (Vite/React)
- `http://localhost:4200` (Angular)

Métodos HTTP permitidos: `GET`, `POST`, `PUT`, `DELETE`, `PATCH`, `OPTIONS`

## 🤝 Contribuição

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença ISC.

## 👨‍💻 Autor

Desenvolvido com ❤️ por [Seu Nome]

---

**Nota**: Certifique-se de configurar todas as variáveis de ambiente necessárias antes de executar o projeto em produção.