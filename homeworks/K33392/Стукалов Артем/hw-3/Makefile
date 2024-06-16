.PHONY: install build lint dev

install:
	yarn
build:
	yarn swc ./src --strip-leading-paths --config-file ./.swcrc -d dist
lint:
	yarn eslint --ext .ts,tsx --max-warnings=0 ./src
dev:
	yarn dev

.DEFAULT_GOAL := run