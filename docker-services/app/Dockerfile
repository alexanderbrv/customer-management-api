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

# Build Stage
FROM node:18-alpine AS build
WORKDIR /app
COPY package*.json ./
COPY . .
COPY .built-env-on-render-host .env
RUN npm ci
RUN npm run build
RUN npx prisma generate
RUN npx prisma migrate deploy
RUN npx prisma db seed
RUN npm ci -f --omit=dev && npm cache clean --force

# Production Stage
FROM node:18-alpine AS production
ENV NODE_ENV production
WORKDIR /app
COPY --from=build /app/dist ./dist
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/package.json ./package.json
CMD [ "npm", "run", "start:prod" ]