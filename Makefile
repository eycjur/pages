
all: lint test dev
.phony: dev build

dev:
	yarn dev
build:
	yarn build
lint:
	yarn eslint:fix
test:
	yarn test
