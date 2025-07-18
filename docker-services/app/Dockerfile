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

# Production Stage: build
FROM node:18-alpine AS build
WORKDIR /app
COPY --chown=node:node package*.json ./
COPY --chown=node:node . .
COPY --chown=node:node .built-env-on-render-host .env
RUN npm ci -f
RUN npm cache clean --force
RUN npm run build
RUN npx prisma generate
RUN npx prisma migrate deploy
RUN npx prisma db seed
RUN npm prune --production
USER node

# Production Stage
FROM node:18-alpine AS production
ENV NODE_ENV production
WORKDIR /app
COPY --chown=node:node --from=build /app/dist ./dist
COPY --chown=node:node --from=build /app/node_modules ./node_modules
COPY --chown=node:node --from=build /app/package.json ./package.json
CMD [ "npm", "run", "start:prod" ]