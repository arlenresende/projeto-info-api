# 1️⃣ Base para build e produção (Debian slim)
FROM node:20-slim

# Diretório de trabalho
WORKDIR /app

# Copiar package.json e package-lock.json
COPY package*.json ./

# Instalar dependências
RUN npm install

# Copiar todo o restante do código
COPY . .

# Build do projeto com tsup
RUN npm run build

# Gerar Prisma Client com binário compatível com Debian/OpenSSL
RUN npx prisma generate --binary-targets native,debian-openssl-3.0.x

# Variável de ambiente para produção
ENV NODE_ENV=production

# Expor porta usada pela aplicação
EXPOSE 3333

# Garantir permissões corretas
RUN chmod -R 755 /app

# Comando para iniciar a aplicação
CMD ["node", "build/server.js"]
