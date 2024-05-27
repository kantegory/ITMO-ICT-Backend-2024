default:
	docker run -d store
	docker run -d auth

.PHONY: build
build:
	docker build -t store store/
	docker build -t auth auth/

