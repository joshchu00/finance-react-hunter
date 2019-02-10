FROM node:11.8.0-alpine
WORKDIR /app
COPY . .
RUN sh generate-config-js.sh > build/config.js
CMD ["node", "-r", "esm", "server.js"]
