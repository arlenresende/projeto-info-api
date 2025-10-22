# Imagem única para build e produção
FROM node:20-slim

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

RUN npm run build
RUN npx prisma generate

ENV NODE_ENV=production
EXPOSE 3333
CMD ["npm", "run", "start"]
