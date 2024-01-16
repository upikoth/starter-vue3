# starter-vue3

[![Lint, Build and Deploy](https://github.com/upikoth/starter-vue3/actions/workflows/lint-build-and-deploy.yml/badge.svg)](https://github.com/upikoth/starter-vue3/actions/workflows/lint-build-and-deploy.yml)

## Переменные окружения

Переменные окружения задаются через файл /public/environment.json при локальной разработке и /dist/environment.json при деплое.

Это сделано, чтобы образ приложения не содержал переменных окружения. Таким образом один образ можно запустить на разных окружениях, поменяв переменные окружения контейнера.
