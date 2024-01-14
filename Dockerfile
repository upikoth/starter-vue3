# Stage 1. Build.

FROM node:20-alpine as build

ARG VITE_API_URL
ARG VITE_SENTRY_DNS

WORKDIR /starter-vue3

COPY package.json package-lock.json .npmrc ./

RUN --mount=type=secret,id=UPIKOTH_PACKAGES_READ \
	UPIKOTH_PACKAGES_READ=$(cat /run/secrets/UPIKOTH_PACKAGES_READ) \
	&& export UPIKOTH_PACKAGES_READ=${UPIKOTH_PACKAGES_READ} \
	&& export VITE_API_URL=${VITE_API_URL} \
	&& export VITE_SENTRY_DNS=${VITE_SENTRY_DNS} \
	&& npm ci

COPY . ./

RUN npm run build

# Stage 2.

FROM nginx:1.25-alpine-slim

COPY --from=build /starter-vue3/dist/ /usr/share/nginx/html/

EXPOSE 80
