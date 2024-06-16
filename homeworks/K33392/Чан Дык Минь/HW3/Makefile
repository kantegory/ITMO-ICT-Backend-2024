.PHONY: build lint start

install:
	npm install

build:
	npx tsc

lint:
	npx eslint . --ext .ts

start:
	make install && make lint && make build && nodemon dist/index.js

.DEFAULT_GOAL := run