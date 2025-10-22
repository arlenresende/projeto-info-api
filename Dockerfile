# Etapa de build
FROM node:20-slim as builder

WORKDIR /app

# Instalar dependências do sistema necessárias pro Prisma
RUN apt-get update && apt-get install -y \
  openssl \
  libssl-dev \
  ca-certificates \
  && rm -rf /var/lib/apt/lists/*

# Copiar arquivos de dependências
COPY package*.json ./

# Instalar dependências
RUN npm install

# Copiar o schema do Prisma ANTES de gerar o client
COPY prisma ./prisma

# Gerar Prisma Client com binários compatíveis
RUN npx prisma generate --binary-targets native,debian-openssl-3.0.x

# Copiar o restante do código
COPY . .

# Build do código com tsup
RUN npm run build

# Etapa final: imagem de produção leve
FROM node:20-slim

WORKDIR /app

# Instalar apenas libs mínimas para runtime
RUN apt-get update && apt-get install -y \
  openssl \
  ca-certificates \
  && rm -rf /var/lib/apt/lists/*

# Copiar arquivos necessários do builder
COPY --from=builder /app/build ./build
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/prisma ./prisma

ENV NODE_ENV=production
EXPOSE 3333

CMD ["node", "build/server.js"]