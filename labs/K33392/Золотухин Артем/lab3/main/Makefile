.PHONY: install build lint dev

install:
	npm install

build:
	npm run swc ./src --strip-leading-paths --config-file ./.swcrc -d dist

lint:
	npm run eslint -- --ext .ts,tsx --max-warnings=0 ./src

dev:
	npm run dev

.DEFAULT_GOAL := run
