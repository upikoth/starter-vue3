# Stage 1. Build.

FROM node:16-alpine as build

ENV UPIKOTH_PACKAGES_READ=${UPIKOTH_PACKAGES_READ}

WORKDIR /starter-vue3

COPY package.json package-lock.json .npmrc ./

RUN npm ci

COPY . ./

RUN npm run build

# Stage 2.

FROM nginx:1.25-alpine-slim

COPY --from=build /starter-vue3/dist/ /usr/share/nginx/html/

EXPOSE 80
