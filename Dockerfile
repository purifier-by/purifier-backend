FROM node:16-alpine as development

ENV NODE_ENV build

# USER node
WORKDIR /usr/local/app/

COPY package*.json ./
RUN npm ci

EXPOSE ${PORT}

# COPY --chown=node:node . .
COPY . .
RUN npm run build

CMD [ "npm", "run", "start:migrate:prod" ]

# ---

# FROM node:16-alpine

# ENV NODE_ENV production

# USER node
# WORKDIR /home/node

# COPY --from=builder --chown=node:node /home/node/package*.json ./
# COPY --from=builder --chown=node:node /home/node/node_modules/ ./node_modules/
# COPY --from=builder --chown=node:node /home/node/dist/ ./dist/

# CMD ["node", "dist/server.js"]