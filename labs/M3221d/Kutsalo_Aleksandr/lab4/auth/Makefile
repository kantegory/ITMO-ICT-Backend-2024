default:
	npm start

.PHONY: docker
docker:
	docker build -t auth .
	docker run -d auth

.PHONY: init
init:
	npm i

.PHONY: clean
clean:
	rm -r dist

.PHONY: syntax_check
syntax_check:
	npm run eslint

.PHONY: build
build:
	npm run build