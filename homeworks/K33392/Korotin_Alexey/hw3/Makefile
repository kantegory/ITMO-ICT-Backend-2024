.PHONY: build run install lint

EXT = .ts
INDEX = build/index.js
ENV = ./.env
TSC = npx tsc
ESLINT = npx eslint ${CURDIR} --ext $(EXT)
RUN = node --env-file=$(ENV) $(INDEX)

install:
	npm i
build:
	$(TSC)
lint:
	$(ESLINT)
run:
	make install && make lint && make build && $(RUN)
.DEFAULT_GOAL := run
