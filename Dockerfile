FROM node:24-alpine AS build
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY .eleventy.js ./
COPY src ./src
RUN npm run build

FROM nginxinc/nginx-unprivileged:1.31.7-alpine

ARG GIT_SHA=unknown
LABEL org.opencontainers.image.source="https://github.com/geeanlooca/personal-website" \
      org.opencontainers.image.revision=$GIT_SHA

COPY deploy/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/public /usr/share/nginx/html

EXPOSE 8080

HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget -q --spider http://127.0.0.1:8080/ || exit 1
