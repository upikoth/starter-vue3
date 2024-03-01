# Stage 1. Build.

FROM node:20-alpine as build

WORKDIR /starter-vue3

COPY package.json package-lock.json .npmrc ./

RUN --mount=type=secret,id=UPIKOTH_PACKAGES_READ \
	UPIKOTH_PACKAGES_READ=$(cat /run/secrets/UPIKOTH_PACKAGES_READ) \
	&& export UPIKOTH_PACKAGES_READ=${UPIKOTH_PACKAGES_READ} \
	&& npm ci

COPY . ./

RUN npm run build

# Stage 2.

FROM nginx:1.25-alpine-slim

COPY --from=build /starter-vue3/dist/ /usr/share/nginx/html/

CMD echo "{\
	\"API_URL\":\"$API_URL\",\
	\"SENTRY_DNS\":\"$SENTRY_DNS\",\
	\"S3_DOMAIN_NAME\":\"$S3_DOMAIN_NAME\"\
	}" > /usr/share/nginx/html/environment.json;\
	nginx;\
	while true; do sleep infinity; done

EXPOSE 80
