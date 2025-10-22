FROM node:20-alpine as builder

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build
RUN npx prisma generate

# Imagem de produção
FROM node:20-alpine

WORKDIR /app

COPY --from=builder /app/build ./build
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/prisma ./prisma

ENV NODE_ENV=production

EXPOSE 3333

CMD ["npm", "run", "start"]