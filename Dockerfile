FROM node:11.8.0-alpine
WORKDIR /app
COPY . .
CMD ["sh", "docker-entrypoint.sh"]
