DIST_DIR=dist

clean:
	@rm -rf $(DIST_DIR)
	
install:
	@npm install

build:
	@mkdir -p $(DIST_DIR)
	@npx tsc

run: 
	@npx nodemon --exec ts-node src/app.ts

migrate:
	@npx sequelize db:migrate

.PHONY: install build run clean migrate