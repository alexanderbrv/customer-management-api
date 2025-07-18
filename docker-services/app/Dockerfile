# Development Stage
FROM node:18 AS development
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npx prisma generate
RUN npm run build
EXPOSE $PORT
CMD [ "npm", "run", "start:dev" ]

# Production Stage
FROM node:18-alpine AS build
WORKDIR /app
COPY package*.json ./
COPY . .
COPY /etc/.env ./.env
RUN npm clean-install
RUN npm cache clean --force
RUN npm run build
RUN npx prisma generate
RUN npx prisma migrate deploy
RUN npx prisma db seed

FROM node:18-alpine AS production
WORKDIR /app
COPY --from=build /app/dist ./dist
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/package.json ./package.json
COPY --from=build /app/prisma ./prisma
CMD ["node", "dist/main"]