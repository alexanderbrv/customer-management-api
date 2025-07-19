# Development Stage
FROM node:22-alpine AS development
WORKDIR /app
COPY --chown=node:node package*.json ./
RUN npm install -g npm@11.4.2
RUN npm install
COPY --chown=node:node . .
RUN chown node:node ./
RUN npx prisma generate
EXPOSE $PORT
USER node
CMD [ "npm", "run", "start:dev" ]

# Build Stage
FROM node:22-alpine AS build
WORKDIR /app
COPY --chown=node:node package*.json ./
COPY --chown=node:node . .
COPY --chown=node:node .build-env-on-render-host .env
RUN npm install -g npm@11.4.2
RUN npm ci
RUN npx prisma generate
RUN npm run build
RUN npx prisma migrate deploy
RUN #npx prisma db seed
RUN npm prune --omit=dev && npm cache clean --force
USER node

# Production Stage
FROM node:22-alpine AS production
ENV NODE_ENV=production
COPY --chown=node:node --from=build /app/dist ./dist
COPY --chown=node:node --from=build /app/node_modules ./node_modules
COPY --chown=node:node --from=build /app/package.json ./package.json
USER node
CMD [ "npm", "run", "start:prod" ]