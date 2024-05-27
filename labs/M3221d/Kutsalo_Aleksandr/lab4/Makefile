.PHONY: build
build:
	docker build -t store store/
	docker build -t auth auth/

default:
	docker run -d store
	docker run -d auth