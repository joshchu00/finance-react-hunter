ARG NODE_IMAGE=node:11.8.0-alpine
FROM $NODE_IMAGE
WORKDIR /app
COPY . ./
CMD ["node", "-r", "esm", "server.js"]