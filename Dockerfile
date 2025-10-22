# Imagem única para build e produção
FROM node:20-slim

WORKDIR /app

# Instala libssl1.1 necessária para o Prisma
RUN apt-get update && apt-get install -y libssl3 && rm -rf /var/lib/apt/lists/*


COPY package*.json ./
RUN npm install

COPY . .

# Gera build da aplicação
RUN npm run build

# Gera Prisma Client
RUN npx prisma generate

ENV NODE_ENV=production
EXPOSE 3333
CMD ["npm", "run", "start"]
