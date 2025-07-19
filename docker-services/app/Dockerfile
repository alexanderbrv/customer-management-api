# Development Stage
FROM node:18 AS development
WORKDIR /app
COPY --chown=node:node package*.json ./
RUN npm install
COPY --chown=node:node . .
RUN npx prisma generate
RUN npm run build
EXPOSE $PORT
USER node
CMD [ "npm", "run", "start:dev" ]

# Build Stage
FROM node:18-alpine AS build
WORKDIR /app
COPY --chown=node:node package*.json ./
COPY --chown=node:node . .
COPY --chown=node:node .build-env-on-render-host .env
RUN npm ci
RUN npm cache clean --force
RUN npx prisma generate
RUN npm run build
RUN npx prisma migrate deploy
RUN npx prisma db seed
RUN npm prune --production && npm cache clean --force
USER node

# Production Stage
FROM node:18-alpine AS production
ENV NODE_ENV production
COPY --chown=node:node --from=build /app/dist ./dist
COPY --chown=node:node --from=build /app/node_modules ./node_modules
COPY --chown=node:node --from=build /app/package.json ./package.json
CMD [ "npm", "run", "start:prod" ]