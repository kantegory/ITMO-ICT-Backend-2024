.PHONY: migrate start install build

migrate:
	@echo "Running migrations..."
	npx sequelize-cli db:migrate

start:
	@echo "Starting the application..."
	npx ts-node src/app.ts

install:
	@echo "Installing dependencies..."
	npm install

build:
	@echo "Building the application..."
	npm run build
